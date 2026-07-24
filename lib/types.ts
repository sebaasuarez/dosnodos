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
