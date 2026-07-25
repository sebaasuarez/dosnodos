// ─────────────────────────────────────────────────────────────────────────────
// Capa de medición: empuja eventos personalizados al dataLayer de GTM.
//
// Convención: el nombre del evento en el dataLayer va prefijado con `dn_`
// (dos nodos) para no chocar con los eventos automáticos de GA4. En GTM cada
// `dn_*` dispara una etiqueta que envía el evento con su nombre GA4 real
// (por ejemplo dn_generate_lead → generate_lead).
//
// El contenedor importable está en docs/gtm/dosnodos-gtm-container.json
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

export const GTM_ID = "GTM-W9BTLNH8"

/** Nombres de evento del dataLayer (los activadores de GTM escuchan estos). */
export const DL_EVENTS = {
  ctaClick: "dn_cta_click",
  whatsappClick: "dn_whatsapp_click",
  emailClick: "dn_email_click",
  languageChange: "dn_language_change",
  serviceCardClick: "dn_service_card_click",
  viewService: "dn_view_service",
  faqOpen: "dn_faq_open",
  formStart: "dn_form_start",
  generateLead: "dn_generate_lead",
} as const

/**
 * Todos los parámetros personalizados. Se reinician en cada push para que un
 * valor de un evento anterior no se filtre al siguiente (problema clásico de
 * las variables de capa de datos en GTM).
 */
const RESET: Record<string, undefined> = {
  cta_id: undefined,
  cta_text: undefined,
  cta_location: undefined,
  link_location: undefined,
  from_language: undefined,
  to_language: undefined,
  page_language: undefined,
  user_language: undefined,
  service_id: undefined,
  service_name: undefined,
  service_category: undefined,
  form_location: undefined,
  company_name: undefined,
  faq_question: undefined,
  faq_location: undefined,
  value: undefined,
  currency: undefined,
}

export function gtmEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...RESET, ...params })
}

// ───────────────────────────── Eventos del sitio ─────────────────────────────

/** Clic en cualquier CTA. `location` identifica dónde está (hero, nav, footer…). */
export function trackCtaClick(params: {
  id: string
  text: string
  location: string
  language?: string
}) {
  gtmEvent(DL_EVENTS.ctaClick, {
    cta_id: params.id,
    cta_text: params.text,
    cta_location: params.location,
    page_language: params.language,
  })
}

export function trackWhatsAppClick(location: string, language?: string) {
  gtmEvent(DL_EVENTS.whatsappClick, { link_location: location, page_language: language })
}

export function trackEmailClick(location: string, language?: string) {
  gtmEvent(DL_EVENTS.emailClick, { link_location: location, page_language: language })
}

export function trackLanguageChange(from: string, to: string) {
  gtmEvent(DL_EVENTS.languageChange, { from_language: from, to_language: to })
}

/** Clic en una tarjeta de servicio del home o del índice. */
export function trackServiceCardClick(params: {
  id: string
  name: string
  category: string
  language: string
}) {
  gtmEvent(DL_EVENTS.serviceCardClick, {
    service_id: params.id,
    service_name: params.name,
    service_category: params.category,
    page_language: params.language,
  })
}

/** Vista de una página de servicio (se dispara al montar). */
export function trackViewService(params: {
  id: string
  name: string
  category: string
  language: string
}) {
  gtmEvent(DL_EVENTS.viewService, {
    service_id: params.id,
    service_name: params.name,
    service_category: params.category,
    page_language: params.language,
  })
}

/** Apertura de una pregunta frecuente. */
export function trackFaqOpen(question: string, location: string, language?: string) {
  gtmEvent(DL_EVENTS.faqOpen, {
    faq_question: question,
    faq_location: location,
    page_language: language,
  })
}

/** Primera interacción con el formulario (mide abandono). */
export function trackFormStart(location: string, language?: string) {
  gtmEvent(DL_EVENTS.formStart, { form_location: location, page_language: language })
}

/** Envío exitoso del formulario: es la conversión principal del sitio. */
export function trackGenerateLead(params: {
  location: string
  language: string
  company?: string
  value?: number
  currency?: string
}) {
  gtmEvent(DL_EVENTS.generateLead, {
    form_location: params.location,
    user_language: params.language,
    company_name: params.company || "(no aplica)",
    value: params.value ?? 1,
    currency: params.currency ?? "COP",
  })
}
