-- ============================================================
-- Landing de soluciones Hostinger
-- ============================================================
-- La configuración vive en la base y no en variables de entorno porque quien
-- la cambia es comercial, no quien despliega: el enlace de referido, el cupón
-- de una campaña y el estado del programa cambian sin que nadie toque código.

alter table public.site_settings
  -- Enlace de la "Página de recomendación de socios". Lleva el REFERRALCODE y
  -- aterriza en una página de Hostinger que confirma la alianza; esa
  -- verificación por un tercero vale más que afirmarla nosotros.
  add column if not exists hostinger_referral_url text,
  -- Código de cupón del programa. Vacío = no se muestra en ninguna parte.
  add column if not exists hostinger_coupon_code  text,
  -- Habilita el lenguaje de socio ("Socio de Hostinger") y la insignia. En
  -- false la página usa fórmulas descriptivas que no afirman la relación.
  add column if not exists hostinger_partner_approved boolean not null default false;

comment on column public.site_settings.hostinger_referral_url is
  'Enlace de referido de socio. Si está vacío, los CTA hacia Hostinger no se muestran.';
comment on column public.site_settings.hostinger_partner_approved is
  'Solo en true se puede usar la insignia y el término "Socio de Hostinger".';

-- Valores iniciales. El programa ya está activo y la insignia autorizada.
update public.site_settings
   set hostinger_referral_url = coalesce(nullif(btrim(hostinger_referral_url), ''),
                                         'https://www.hostinger.com/co?REFERRALCODE=sebaassuarez'),
       hostinger_partner_approved = true
 where id = 1;
