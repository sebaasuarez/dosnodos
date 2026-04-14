// Google Tag Manager utility functions
declare global {
  interface Window {
    dataLayer: any[]
  }
}

export const GTM_ID = "GTM-W9BTLNH8"

// Initialize dataLayer
export const initGTM = () => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || []
  }
}

// Push events to dataLayer
export const gtmEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    })
  }
}

// Predefined events for DosNodos
export const trackFormSubmit = (language: string, company: string) => {
  gtmEvent("form_submit", {
    event_category: "engagement",
    event_label: "contact_form_dosnodos",
    form_name: "contact_demo_request",
    user_language: language,
    company_name: company,
    lead_source: "landing_page",
    conversion_value: 1,
  })
}

export const trackCTAClick = (ctaType: "primary" | "secondary", section: string) => {
  gtmEvent("cta_click", {
    event_category: "engagement",
    event_label: `cta_${ctaType}`,
    cta_text: ctaType === "primary" ? "Solicita tu Demo" : "Habla con nuestro bot",
    section: section,
    click_location: "landing_page",
  })
}

export const trackLanguageChange = (fromLanguage: string, toLanguage: string) => {
  gtmEvent("language_change", {
    event_category: "user_preference",
    event_label: "language_selector",
    from_language: fromLanguage,
    to_language: toLanguage,
  })
}

export const trackWhatsAppClick = () => {
  gtmEvent("whatsapp_click", {
    event_category: "engagement",
    event_label: "whatsapp_contact",
    contact_method: "whatsapp",
    phone_number: "+573127344026",
  })
}

export const trackEmailClick = () => {
  gtmEvent("email_click", {
    event_category: "engagement",
    event_label: "email_contact",
    contact_method: "email",
    email_address: "hola@dosnodos.com.co",
  })
}
