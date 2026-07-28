-- ============================================================
-- Motor de prospección: modelo de lead enriquecido + consentimiento
-- ============================================================
-- Trae a Supabase lo que vale del modelo de Prisma del CRM, para que exista
-- una sola fuente de verdad del cliente en vez de dos bases con la misma
-- entidad.

-- ------------------------------------------------------------
-- 1. Datos del negocio (los que devuelve Google Maps vía Apify)
-- ------------------------------------------------------------
alter table public.leads
  add column if not exists city            text,
  add column if not exists address         text,
  add column if not exists category        text,
  add column if not exists website         text,
  add column if not exists google_maps_url text,
  -- Clave de deduplicación: el mismo negocio no se inserta dos veces aunque
  -- aparezca en varias búsquedas.
  add column if not exists google_place_id text,
  add column if not exists rating          numeric(2,1),
  add column if not exists reviews_count   integer;

create unique index if not exists leads_google_place_id_key
  on public.leads (google_place_id) where google_place_id is not null;

-- ------------------------------------------------------------
-- 2. Señales digitales y diagnóstico
-- ------------------------------------------------------------
-- La oportunidad comercial de Dos Nodos es justo lo que al negocio le falta:
-- sin web, sin WhatsApp visible, sin redes.
alter table public.leads
  add column if not exists has_website     boolean not null default false,
  add column if not exists has_whatsapp    boolean not null default false,
  add column if not exists has_social      boolean not null default false,
  add column if not exists score           integer not null default 0,
  add column if not exists score_breakdown jsonb   not null default '{}'::jsonb,
  add column if not exists diagnosis       text,
  add column if not exists recommended_service text,
  add column if not exists enriched_at     timestamptz;

alter table public.leads drop constraint if exists leads_score_check;
alter table public.leads add constraint leads_score_check check (score between 0 and 100);

create index if not exists leads_score_idx on public.leads (score desc);

-- ------------------------------------------------------------
-- 3. Consentimiento — Habeas Data (Ley 1581 de 2012)
-- ------------------------------------------------------------
-- Un lead sacado de una fuente pública NO tiene consentimiento. Queda marcado
-- como tal desde el registro, y de ahí depende si se le puede escribir.
do $$ begin
  create type public.consent_status as enum (
    'sin_consentimiento',  -- fuente pública; contacto por WhatsApp bloqueado
    'pendiente',           -- se le pidió permiso y no ha respondido
    'opt_in',              -- autorizó de forma explícita, o escribió primero
    'opt_out'              -- pidió no ser contactado; bloqueo permanente
  );
exception when duplicate_object then null; end $$;

alter table public.leads
  add column if not exists consent        public.consent_status not null default 'sin_consentimiento',
  add column if not exists consent_source text,
  add column if not exists opt_in_at      timestamptz,
  add column if not exists opt_out_at     timestamptz,
  -- Fecha a partir de la cual el dato debe purgarse si nunca hubo relación
  -- comercial. La finalidad del tratamiento no es indefinida.
  add column if not exists purge_after    date;

create index if not exists leads_consent_idx on public.leads (consent);

comment on column public.leads.consent is
  'Estado de consentimiento. Los leads de fuentes públicas nacen en sin_consentimiento y no pueden recibir WhatsApp saliente.';
comment on column public.leads.purge_after is
  'Fecha de purga si no hubo relación comercial. Ley 1581: el tratamiento tiene finalidad y plazo.';

-- Bitácora de consentimiento: quién autorizó qué, cuándo y por dónde. Es la
-- prueba que exige la ley si alguien reclama.
create table if not exists public.consent_events (
  id         uuid primary key default gen_random_uuid(),
  lead_id    uuid not null references public.leads(id) on delete cascade,
  created_at timestamptz not null default now(),
  event      text not null check (event in ('otorgado', 'revocado', 'solicitado', 'escribio_primero')),
  -- De dónde salió: formulario_landing, formulario_ventas, whatsapp_entrante,
  -- anuncio_click_to_whatsapp, importacion...
  channel    text,
  detail     text,
  -- Se guarda para poder demostrar el origen de la autorización.
  ip         inet,
  user_agent text
);
create index if not exists consent_events_lead_idx on public.consent_events (lead_id, created_at desc);

comment on table public.consent_events is
  'Trazabilidad del consentimiento para Habeas Data. Cada cambio deja registro con canal y fecha.';

-- ------------------------------------------------------------
-- 4. Seguimiento comercial
-- ------------------------------------------------------------
alter table public.leads
  add column if not exists next_follow_up_at timestamptz,
  add column if not exists next_step         text,
  add column if not exists lost_reason       text,
  add column if not exists last_interaction  timestamptz,
  add column if not exists utm_source        text,
  add column if not exists utm_medium        text,
  add column if not exists utm_campaign      text;

create index if not exists leads_next_follow_up_idx on public.leads (next_follow_up_at)
  where next_follow_up_at is not null;

-- ------------------------------------------------------------
-- 5. Ejecuciones de prospección
-- ------------------------------------------------------------
create table if not exists public.prospect_runs (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  finished_at  timestamptz,
  status       text not null default 'corriendo'
               check (status in ('corriendo', 'ok', 'error')),
  -- 'cron' o 'manual'
  trigger      text not null default 'cron',
  query        text,
  city         text,
  found        integer not null default 0,
  inserted     integer not null default 0,
  duplicated   integer not null default 0,
  enriched     integer not null default 0,
  error        text,
  -- 'apify' o 'simulado' cuando no hay token
  mode         text not null default 'simulado'
);
create index if not exists prospect_runs_created_idx on public.prospect_runs (created_at desc);

comment on table public.prospect_runs is
  'Cada corrida del motor de prospección, para saber qué se buscó y qué entró.';

-- ------------------------------------------------------------
-- 6. RLS
-- ------------------------------------------------------------
-- Las dos tablas nuevas solo las lee y escribe el panel autenticado. La
-- inserción pública de leads desde los formularios no cambia.
alter table public.consent_events enable row level security;
alter table public.prospect_runs  enable row level security;

drop policy if exists "consent_events autenticado" on public.consent_events;
create policy "consent_events autenticado" on public.consent_events
  for all to authenticated using (true) with check (true);

drop policy if exists "prospect_runs autenticado" on public.prospect_runs;
create policy "prospect_runs autenticado" on public.prospect_runs
  for all to authenticated using (true) with check (true);
-- El check original nació para el formulario: quien escribe tiene que dejar
-- cómo devolverle la respuesta. Un prospecto raspado es otra cosa. El negocio
-- sin teléfono y sin web es justo el de mayor oportunidad para Dos Nodos, y la
-- versión anterior de esta regla lo rechazaba en silencio: se perdía la mejor
-- parte del embudo. Basta con que el registro identifique un negocio real
-- (google_place_id) para que valga la pena guardarlo; llegarle es un problema
-- de canal, no de validación.
alter table public.leads drop constraint if exists leads_contacto_check;
alter table public.leads add constraint leads_contacto_check
  check (
    (email   is not null and length(btrim(email))   > 0)
    or (phone   is not null and length(btrim(phone))   > 0)
    or (website is not null and length(btrim(website)) > 0)
    or (google_place_id is not null and length(btrim(google_place_id)) > 0)
  );

-- ------------------------------------------------------------
-- 7. Descartes visibles
-- ------------------------------------------------------------
-- Sin esta columna una corrida podía decir "20 encontrados, 18 nuevos, 0
-- repetidos" y nadie notaba los dos que se cayeron. Lo que no se cuenta no se
-- arregla.
alter table public.prospect_runs
  add column if not exists discarded integer not null default 0;

comment on column public.prospect_runs.discarded is
  'Registros que la base rechazó. Debe ser 0; si sube, hay una regla bloqueando prospectos.';
