-- Pantallazo del proyecto: reemplaza la ilustración genérica en la tarjeta.
-- Acepta una URL absoluta (Supabase Storage, CDN) o una ruta del sitio (/proyectos/x.png).
alter table public.projects
  add column if not exists image_url text,
  add column if not exists image_alt text;

comment on column public.projects.image_url is
  'Pantallazo del proyecto. Si está vacío se usa la ilustración de respaldo.';
comment on column public.projects.image_alt is
  'Texto alternativo del pantallazo. Si está vacío se usa el título del proyecto.';
