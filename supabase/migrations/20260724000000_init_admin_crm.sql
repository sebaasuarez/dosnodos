-- ============================================================
-- Dos Nodos — Panel de administración + CRM
-- Tablas: leads (CRM), projects, reviews, site_settings, page_seo
-- Seguridad: RLS. Lectura pública solo de contenido publicado y
-- configuración; escritura y CRM solo para usuarios autenticados.
-- ============================================================

create extension if not exists pgcrypto;

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ------------------------------------------------------------
-- CRM: leads del formulario de contacto
-- ------------------------------------------------------------
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  message     text,
  company     text,
  phone       text,
  language    text default 'es',
  source      text default 'landing',
  status      text not null default 'nuevo'
              check (status in ('nuevo','contactado','calificado','propuesta','ganado','perdido')),
  notes       text
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at before update on public.leads
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Proyectos (portafolio)
-- ------------------------------------------------------------
create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  slug          text unique,
  tag           text,
  title         text not null,
  description   text,
  result_label  text default 'Resultado',
  result        text,
  illustration  text default 'quote' check (illustration in ('quote','store','schedule')),
  published     boolean not null default true,
  sort_order    int not null default 0,
  i18n          jsonb not null default '{}'::jsonb
);
create index if not exists projects_order_idx on public.projects (sort_order, created_at);
drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at before update on public.projects
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Reseñas
-- ------------------------------------------------------------
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  quote       text not null,
  name        text not null,
  role        text,
  initials    text,
  rating      int not null default 5 check (rating between 1 and 5),
  published   boolean not null default true,
  sort_order  int not null default 0,
  i18n        jsonb not null default '{}'::jsonb
);
create index if not exists reviews_order_idx on public.reviews (sort_order, created_at);
drop trigger if exists reviews_set_updated_at on public.reviews;
create trigger reviews_set_updated_at before update on public.reviews
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Configuración del sitio (singleton) — tracking y datos globales
-- ------------------------------------------------------------
create table if not exists public.site_settings (
  id                 int primary key default 1 check (id = 1),
  gtm_id             text,
  ga4_id             text,
  meta_pixel_id      text,
  tiktok_pixel_id    text,
  google_ads_id      text,
  whatsapp_number    text,
  contact_email      text,
  extra_head_html    text,
  updated_at         timestamptz not null default now()
);
drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- SEO por página
-- ------------------------------------------------------------
create table if not exists public.page_seo (
  id          uuid primary key default gen_random_uuid(),
  path        text unique not null,
  title       text,
  description text,
  keywords    text,
  og_image    text,
  updated_at  timestamptz not null default now()
);
drop trigger if exists page_seo_set_updated_at on public.page_seo;
create trigger page_seo_set_updated_at before update on public.page_seo
  for each row execute function public.set_updated_at();

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.leads          enable row level security;
alter table public.projects       enable row level security;
alter table public.reviews        enable row level security;
alter table public.site_settings  enable row level security;
alter table public.page_seo       enable row level security;

-- Leads: cualquiera puede crear (formulario público); solo autenticados leen/gestionan
drop policy if exists leads_insert_public on public.leads;
create policy leads_insert_public on public.leads
  for insert to anon, authenticated with check (true);
drop policy if exists leads_rw_auth on public.leads;
create policy leads_rw_auth on public.leads
  for all to authenticated using (true) with check (true);

-- Proyectos: público lee publicados; autenticados gestionan todo
drop policy if exists projects_select_public on public.projects;
create policy projects_select_public on public.projects
  for select to anon using (published = true);
drop policy if exists projects_all_auth on public.projects;
create policy projects_all_auth on public.projects
  for all to authenticated using (true) with check (true);

-- Reseñas: idem
drop policy if exists reviews_select_public on public.reviews;
create policy reviews_select_public on public.reviews
  for select to anon using (published = true);
drop policy if exists reviews_all_auth on public.reviews;
create policy reviews_all_auth on public.reviews
  for all to authenticated using (true) with check (true);

-- Configuración: lectura pública (se inyecta en el sitio); escritura autenticada
drop policy if exists settings_select_public on public.site_settings;
create policy settings_select_public on public.site_settings
  for select to anon, authenticated using (true);
drop policy if exists settings_write_auth on public.site_settings;
create policy settings_write_auth on public.site_settings
  for all to authenticated using (true) with check (true);

-- SEO: idem
drop policy if exists seo_select_public on public.page_seo;
create policy seo_select_public on public.page_seo
  for select to anon, authenticated using (true);
drop policy if exists seo_write_auth on public.page_seo;
create policy seo_write_auth on public.page_seo
  for all to authenticated using (true) with check (true);

-- ============================================================
-- Semillas (valores por defecto que reflejan el sitio actual)
-- ============================================================
insert into public.site_settings (id, gtm_id, whatsapp_number, contact_email)
values (1, 'GTM-W9BTLNH8', '573127344026', 'hola@dosnodos.com.co')
on conflict (id) do nothing;

insert into public.page_seo (path, title, description, keywords)
values (
  '/',
  'Dos Nodos — Tecnología con propósito',
  'Conectamos tecnología con personas. Automatización, asistentes con IA y plataformas a la medida para que tu empresa venda más, responda más rápido y trabaje mejor.',
  'Dos Nodos, automatización, inteligencia artificial, asistentes virtuales, WhatsApp, Shopify, desarrollo web, Colombia, Medellín'
)
on conflict (path) do nothing;

insert into public.projects (slug, tag, title, description, result_label, result, illustration, sort_order)
values
  ('distribuidora-repuestos','Asistente IA + ERP','Distribuidora de repuestos','Cotizaciones por WhatsApp en menos de un minuto, con inventario en tiempo real.','Resultado','3× cotizaciones/día','quote',1),
  ('marca-cosmetica','Shopify + e-Commerce','Marca de cosmética','Tienda rediseñada y ventas nocturnas respondidas por un asistente.','Resultado','+38% conversión','store',2),
  ('clinica-odontologica','Automatización','Clínica odontológica','Agenda automática con recordatorios; menos citas perdidas.','Resultado','−45% inasistencia','schedule',3)
on conflict (slug) do nothing;

insert into public.reviews (quote, name, role, initials, rating, sort_order)
values
  ('Antes el equipo pasaba las tardes digitando pedidos. Hoy ese tiempo es para los clientes.','Diana R.','Gerente general · Distribuidora','DR',5,1),
  ('La tienda quedó impecable y las ventas nocturnas ahora se responden solas.','Mateo P.','Fundador · Cosmética','MP',5,2),
  ('Entendieron el problema real y no nos vendieron humo. El agendamiento cambió la clínica.','Laura C.','Directora · Clínica','LC',5,3)
on conflict do nothing;
