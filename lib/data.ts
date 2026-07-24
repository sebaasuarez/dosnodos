import "server-only"
import { cache } from "react"
import { createReadSupabase } from "@/lib/supabase/admin"
import type { PageSeo, Project, Review, SiteSettings } from "@/lib/types"

const DEFAULT_SETTINGS: SiteSettings = {
  id: 1,
  gtm_id: "GTM-W9BTLNH8",
  ga4_id: null,
  meta_pixel_id: null,
  tiktok_pixel_id: null,
  google_ads_id: null,
  whatsapp_number: "573127344026",
  contact_email: "hola@dosnodos.com.co",
  extra_head_html: null,
  updated_at: "",
}

/** Configuración global del sitio (tracking + contacto). Siempre devuelve algo. */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const supabase = createReadSupabase()
  if (!supabase) return DEFAULT_SETTINGS
  try {
    const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle()
    return (data as SiteSettings) ?? DEFAULT_SETTINGS
  } catch {
    return DEFAULT_SETTINGS
  }
})

/** SEO por ruta (null → se usan los valores estáticos del layout). */
export const getPageSeo = cache(async (path: string): Promise<PageSeo | null> => {
  const supabase = createReadSupabase()
  if (!supabase) return null
  try {
    const { data } = await supabase.from("page_seo").select("*").eq("path", path).maybeSingle()
    return (data as PageSeo) ?? null
  } catch {
    return null
  }
})

/** Proyectos publicados (null → las secciones usan el contenido i18n). */
export const getProjects = cache(async (): Promise<Project[] | null> => {
  const supabase = createReadSupabase()
  if (!supabase) return null
  try {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })
    return data && data.length ? (data as Project[]) : null
  } catch {
    return null
  }
})

/** Reseñas publicadas (null → contenido i18n). */
export const getReviews = cache(async (): Promise<Review[] | null> => {
  const supabase = createReadSupabase()
  if (!supabase) return null
  try {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })
    return data && data.length ? (data as Review[]) : null
  } catch {
    return null
  }
})

/** Localiza un campo de un registro con columna i18n JSON. */
export function localize<T extends { i18n: Record<string, Partial<Record<string, string>>> }>(
  row: T,
  lang: string,
  field: keyof T & string,
): string {
  const translated = row.i18n?.[lang]?.[field]
  if (translated) return translated
  return (row[field] as unknown as string) ?? ""
}
