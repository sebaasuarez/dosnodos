export type LeadStatus =
  | "nuevo"
  | "contactado"
  | "calificado"
  | "propuesta"
  | "ganado"
  | "perdido"

export interface Lead {
  id: string
  created_at: string
  updated_at: string
  name: string
  email: string
  message: string | null
  company: string | null
  phone: string | null
  language: string | null
  source: string | null
  status: LeadStatus
  notes: string | null
}

export type Illustration = "quote" | "store" | "schedule"

export interface Project {
  id: string
  created_at: string
  updated_at: string
  slug: string | null
  tag: string | null
  title: string
  description: string | null
  result_label: string | null
  result: string | null
  illustration: Illustration
  /** Pantallazo del proyecto; si está vacío se usa la ilustración. */
  image_url: string | null
  image_alt: string | null
  published: boolean
  sort_order: number
  i18n: Record<string, Partial<Record<string, string>>>
}

export interface Review {
  id: string
  created_at: string
  updated_at: string
  quote: string
  name: string
  role: string | null
  initials: string | null
  rating: number
  published: boolean
  sort_order: number
  i18n: Record<string, Partial<Record<string, string>>>
}

export type WhatsAppPosition = "right" | "left"
export type WhatsAppIcon = "whatsapp" | "chat" | "phone"

export const WHATSAPP_POSITIONS: WhatsAppPosition[] = ["right", "left"]
export const WHATSAPP_ICONS: WhatsAppIcon[] = ["whatsapp", "chat", "phone"]

export const WHATSAPP_POSITION_LABEL: Record<WhatsAppPosition, string> = {
  right: "Abajo a la derecha",
  left: "Abajo a la izquierda",
}

export const WHATSAPP_ICON_LABEL: Record<WhatsAppIcon, string> = {
  whatsapp: "Logo de WhatsApp",
  chat: "Burbuja de chat",
  phone: "Teléfono",
}

/** Texto por idioma. Las claves son los códigos de `Language`. */
export type LocalizedText = Partial<Record<string, string>>

export interface SiteSettings {
  id: number
  gtm_id: string | null
  ga4_id: string | null
  meta_pixel_id: string | null
  tiktok_pixel_id: string | null
  google_ads_id: string | null
  whatsapp_number: string | null
  contact_email: string | null
  extra_head_html: string | null
  updated_at: string
  /** Botón flotante de WhatsApp. */
  whatsapp_enabled: boolean
  /** URL alterna; si está vacía se arma wa.me con el número y el mensaje. */
  whatsapp_link: string | null
  whatsapp_message: LocalizedText
  whatsapp_label: LocalizedText
  whatsapp_position: WhatsAppPosition
  whatsapp_icon: WhatsAppIcon
  whatsapp_delay_ms: number
}

export interface PageSeo {
  id: string
  path: string
  title: string | null
  description: string | null
  keywords: string | null
  og_image: string | null
  updated_at: string
}

export const LEAD_STATUSES: LeadStatus[] = [
  "nuevo",
  "contactado",
  "calificado",
  "propuesta",
  "ganado",
  "perdido",
]

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  calificado: "Calificado",
  propuesta: "Propuesta",
  ganado: "Ganado",
  perdido: "Perdido",
}
