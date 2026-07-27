-- ------------------------------------------------------------
-- Botón flotante de WhatsApp configurable desde el panel
-- ------------------------------------------------------------
-- Antes el botón estaba escrito a mano en el componente: siempre visible,
-- siempre a la derecha, sin mensaje previo y con el número como única variable.

alter table public.site_settings
  add column if not exists whatsapp_enabled  boolean not null default true,
  -- Si se llena, el botón apunta acá en vez de a wa.me (Telegram, Calendly,
  -- un enlace corto con seguimiento propio, lo que sea).
  add column if not exists whatsapp_link     text,
  -- Mensaje precargado en el chat, por idioma: {"es": "...", "en": "..."}
  add column if not exists whatsapp_message  jsonb   not null default '{}'::jsonb,
  -- Etiqueta opcional al lado del icono, por idioma. Vacía = solo el icono.
  add column if not exists whatsapp_label    jsonb   not null default '{}'::jsonb,
  add column if not exists whatsapp_position text    not null default 'right',
  add column if not exists whatsapp_icon     text    not null default 'whatsapp',
  -- Milisegundos antes de que aparezca. 0 = de una.
  add column if not exists whatsapp_delay_ms integer not null default 0;

comment on column public.site_settings.whatsapp_enabled is
  'Muestra u oculta el botón flotante en todo el sitio.';
comment on column public.site_settings.whatsapp_link is
  'URL alterna. Si está vacía se arma https://wa.me/<numero> con el mensaje.';
comment on column public.site_settings.whatsapp_delay_ms is
  'Retardo antes de mostrar el botón, en milisegundos.';

-- Los checks se recrean para que la migración se pueda correr más de una vez:
-- Postgres no tiene "add constraint if not exists".
alter table public.site_settings drop constraint if exists site_settings_whatsapp_position_check;
alter table public.site_settings add constraint site_settings_whatsapp_position_check
  check (whatsapp_position in ('right', 'left'));

alter table public.site_settings drop constraint if exists site_settings_whatsapp_icon_check;
alter table public.site_settings add constraint site_settings_whatsapp_icon_check
  check (whatsapp_icon in ('whatsapp', 'chat', 'phone'));

alter table public.site_settings drop constraint if exists site_settings_whatsapp_delay_check;
alter table public.site_settings add constraint site_settings_whatsapp_delay_check
  check (whatsapp_delay_ms >= 0 and whatsapp_delay_ms <= 60000);

-- Mensaje inicial en los tres idiomas del sitio.
update public.site_settings
set whatsapp_message = jsonb_build_object(
      'es', 'Hola Dos Nodos, quiero agendar una reunión de diagnóstico.',
      'en', 'Hi Dos Nodos, I''d like to book a discovery call.',
      'pt', 'Olá Dos Nodos, quero agendar uma reunião de diagnóstico.'
    )
where id = 1 and whatsapp_message = '{}'::jsonb;

-- ------------------------------------------------------------
-- SEO por idioma
-- ------------------------------------------------------------
-- page_seo solo tenía la fila de la raíz, así que /en y /pt heredaban los
-- metadatos escritos en el código y no se podían editar desde el panel.

insert into public.page_seo (path, title, description)
values
  ('/en', 'Dos Nodos — Technology with purpose',
   'We help companies sell more, respond faster and work better with automation, AI assistants and custom platforms.'),
  ('/pt', 'Dos Nodos — Tecnologia com propósito',
   'Ajudamos empresas a vender mais, responder mais rápido e trabalhar melhor com automação, assistentes de IA e plataformas sob medida.')
on conflict (path) do nothing;
