-- ------------------------------------------------------------
-- Leads desde varias landings
-- ------------------------------------------------------------
-- La landing de ventas.dosnodos.com.co vende a negocios locales que contactan
-- por WhatsApp: su formulario pide nombre, negocio y número, no correo. Con
-- email obligatorio esos leads no se podían guardar.
--
-- Un lead al que se puede responder por WhatsApp es un lead válido, así que la
-- regla real no es "tiene correo" sino "hay al menos una forma de contactarlo".

alter table public.leads alter column email drop not null;

alter table public.leads drop constraint if exists leads_contacto_check;
alter table public.leads add constraint leads_contacto_check
  check (
    (email is not null and length(btrim(email)) > 0)
    or (phone is not null and length(btrim(phone)) > 0)
  );

comment on column public.leads.email is
  'Correo. Puede ser null si el lead llegó por un formulario de WhatsApp; en ese caso phone es obligatorio.';
comment on column public.leads.source is
  'Landing de origen: landing (dosnodos.com.co), ventas (ventas.dosnodos.com.co).';

create index if not exists leads_source_idx on public.leads (source);
