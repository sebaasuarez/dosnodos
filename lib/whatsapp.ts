import type { LocalizedText, WhatsAppIcon, WhatsAppPosition } from "@/lib/types"

/** Configuración del botón flotante que el servidor le pasa al componente. */
export interface WhatsAppConfig {
  enabled: boolean
  number: string
  /** Si viene, manda sobre el número: el botón apunta a esta URL tal cual. */
  link?: string | null
  message?: LocalizedText | null
  label?: LocalizedText | null
  position?: WhatsAppPosition
  icon?: WhatsAppIcon
  delayMs?: number
}

/**
 * Arma la configuración del botón a partir de la fila de site_settings.
 *
 * Vive acá y no junto al componente porque las páginas de servicio son
 * componentes de servidor: no pueden invocar una función exportada desde un
 * archivo marcado con "use client".
 */
export function whatsappConfig(s: {
  whatsapp_enabled?: boolean
  whatsapp_number?: string | null
  whatsapp_link?: string | null
  whatsapp_message?: LocalizedText | null
  whatsapp_label?: LocalizedText | null
  whatsapp_position?: WhatsAppPosition | null
  whatsapp_icon?: WhatsAppIcon | null
  whatsapp_delay_ms?: number | null
}): WhatsAppConfig {
  return {
    enabled: s.whatsapp_enabled ?? true,
    number: s.whatsapp_number || "573127344026",
    link: s.whatsapp_link,
    message: s.whatsapp_message,
    label: s.whatsapp_label,
    position: s.whatsapp_position ?? "right",
    icon: s.whatsapp_icon ?? "whatsapp",
    delayMs: s.whatsapp_delay_ms ?? 0,
  }
}
