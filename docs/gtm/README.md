# Medición — GTM + GA4

Este directorio contiene el contenedor de Google Tag Manager listo para importar:
**`dosnodos-gtm-ga4-container.json`** (10 etiquetas, 9 activadores, 18 variables).

El código que empuja los eventos está en [`lib/gtm.ts`](../../lib/gtm.ts).

---

## Cómo importar

1. GTM → contenedor **GTM-W9BTLNH8** → **Administrador** → **Importar contenedor**.
2. Sube el archivo JSON.
3. **Espacio de trabajo:** elige *Crear uno nuevo* y llámalo `GA4 eventos`.
   Así nada se toca en el espacio principal hasta que publiques.
4. **Opción de importación:** **Combinar** → **Cambiar el nombre de las
   etiquetas, los activadores y las variables en conflicto**.
   ⚠️ No uses *Sobrescribir*: borraría lo que ya tengas en el contenedor.
5. Revisa la vista previa de cambios y confirma.

## Después de importar (obligatorio)

1. **Variables → `CONST - GA4 Measurement ID`** → reemplaza `G-XXXXXXXXXX` por
   el ID de medición real de GA4 (GA4 → Administrar → Flujos de datos).
2. **Si ya tenías una etiqueta de Google / configuración de GA4 en el
   contenedor:** borra la etiqueta importada `Google Tag - GA4` y en cada
   etiqueta `GA4 - *` cambia el campo *Measurement ID* para que apunte a la
   tuya. Tener dos configuraciones duplica los page_view.
3. **Vista previa** (botón *Preview*): abre el sitio, haz clic en un CTA, abre
   una pregunta frecuente y envía el formulario. Cada acción debe aparecer en el
   panel de depuración con su etiqueta disparada.
4. **Publicar.**

## En GA4, una sola vez

- **Administrar → Eventos clave** → marca `generate_lead` como evento clave.
  Es la conversión del sitio.
- **Administrar → Definiciones personalizadas** → crea una *dimensión
  personalizada* de ámbito **evento** para cada parámetro que quieras usar en
  informes. Sin esto los parámetros llegan pero no se pueden segmentar:

  | Nombre de dimensión | Parámetro |
  |---|---|
  | Ubicación del CTA | `cta_location` |
  | CTA | `cta_id` |
  | Servicio | `service_name` |
  | Categoría de servicio | `service_category` |
  | Idioma de página | `page_language` |
  | Pregunta frecuente | `faq_question` |
  | Ubicación del enlace | `link_location` |

  (Máximo 50 dimensiones de evento; con estas 7 sobra.)

---

## Eventos

El dataLayer usa el prefijo `dn_` para no chocar con los eventos automáticos de
GA4. GTM traduce cada uno al nombre de evento de GA4.

| dataLayer | Evento GA4 | Cuándo | Parámetros |
|---|---|---|---|
| `dn_generate_lead` | `generate_lead` | Envío exitoso del formulario | `form_location`, `user_language`, `company_name`, `value`, `currency` |
| `dn_form_start` | `form_start` | Primera interacción con el formulario | `form_location`, `page_language` |
| `dn_cta_click` | `cta_click` | Clic en cualquier CTA | `cta_id`, `cta_text`, `cta_location`, `page_language` |
| `dn_whatsapp_click` | `whatsapp_click` | Clic en WhatsApp | `link_location`, `page_language` |
| `dn_email_click` | `email_click` | Clic en el correo | `link_location`, `page_language` |
| `dn_language_change` | `language_change` | Cambio de idioma | `from_language`, `to_language` |
| `dn_service_card_click` | `service_card_click` | Clic en tarjeta de servicio | `service_id`, `service_name`, `service_category`, `page_language` |
| `dn_view_service` | `view_service` | Vista de página de servicio | `service_id`, `service_name`, `service_category`, `page_language` |
| `dn_faq_open` | `faq_open` | Apertura de una pregunta | `faq_question`, `faq_location`, `page_language` |

### Preguntas que responde esta medición

- **¿Cuántos leads y de dónde?** → `generate_lead` por fuente/medio.
- **¿Se abandona el formulario?** → `form_start` contra `generate_lead`.
- **¿Qué CTA funciona?** → `cta_click` segmentado por `cta_location`.
- **¿Qué servicio interesa más?** → `view_service` por `service_name`.
- **¿Qué dudas frenan la compra?** → `faq_open` por `faq_question`.
- **¿Vale la pena el multiidioma?** → `language_change` y `page_language`.

## Cómo agregar un evento nuevo

1. Añade la función en `lib/gtm.ts` (y el parámetro nuevo al objeto `RESET`).
2. En GTM: variable de capa de datos si es un parámetro nuevo, activador de
   evento personalizado con el nombre `dn_*`, y una etiqueta GA4 de evento.
3. Si el parámetro se va a usar en informes, créalo como dimensión
   personalizada en GA4.
