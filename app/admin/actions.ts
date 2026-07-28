"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { requireUser } from "@/lib/supabase/auth"
import { createServerSupabase } from "@/lib/supabase/server"
import { LEAD_STATUSES, type Illustration, type LeadStatus } from "@/lib/types"

function str(fd: FormData, key: string): string {
  return (fd.get(key) as string | null)?.trim() ?? ""
}
function num(fd: FormData, key: string, def = 0): number {
  const v = Number(fd.get(key))
  return Number.isFinite(v) ? v : def
}
function bool(fd: FormData, key: string): boolean {
  return fd.get(key) === "on" || fd.get(key) === "true"
}

/** Construye la columna i18n {en:{...}, pt:{...}} descartando vacíos. */
function buildI18n(fd: FormData, fields: string[]) {
  const out: Record<string, Record<string, string>> = {}
  for (const lang of ["en", "pt"]) {
    const obj: Record<string, string> = {}
    for (const f of fields) {
      const v = str(fd, `${f}_${lang}`)
      if (v) obj[f] = v
    }
    if (Object.keys(obj).length) out[lang] = obj
  }
  return out
}

export async function signOut() {
  const supabase = await createServerSupabase()
  await supabase?.auth.signOut()
  redirect("/admin/login")
}

// ---------------- Leads (CRM) ----------------
export async function updateLead(fd: FormData) {
  const { supabase } = await requireUser()
  const id = str(fd, "id")
  await supabase
    .from("leads")
    .update({ status: str(fd, "status") as LeadStatus, notes: str(fd, "notes") || null })
    .eq("id", id)
  revalidatePath("/admin/leads")
  revalidatePath(`/admin/leads/${id}`)
  revalidatePath("/admin")
}

/** Cambia solo la etapa. Se usa desde las tarjetas del pipeline. */
export async function moveLeadStage(fd: FormData) {
  const { supabase } = await requireUser()
  const id = str(fd, "id")
  const status = str(fd, "status")
  if (!id || !LEAD_STATUSES.includes(status as LeadStatus)) return

  await supabase.from("leads").update({ status }).eq("id", id)
  revalidatePath("/admin/pipeline")
  revalidatePath("/admin/leads")
  revalidatePath("/admin")
}

export async function deleteLead(fd: FormData) {
  const { supabase } = await requireUser()
  await supabase.from("leads").delete().eq("id", str(fd, "id"))
  revalidatePath("/admin/leads")
  revalidatePath("/admin")
  redirect("/admin/leads")
}

// ---------------- Prospección ----------------

/** Lanza una búsqueda puntual desde el panel. */
export async function lanzarProspeccion(fd: FormData): Promise<{ mensaje: string }> {
  await requireUser()
  const consulta = str(fd, "consulta") || "barbería"
  const ciudad = str(fd, "ciudad") || "Medellín, Colombia"

  try {
    const { correrProspeccion } = await import("@/lib/prospecting/engine")
    const r = await correrProspeccion({ consulta, ciudad, limite: 20, trigger: "manual" })
    revalidatePath("/admin/prospeccion")
    revalidatePath("/admin/leads")
    return {
      mensaje:
        `${r.encontrados} encontrados · ${r.insertados} nuevos · ${r.duplicados} repetidos` +
        (r.descartados > 0 ? ` · ${r.descartados} rechazados por la base` : "") +
        (r.modo === "simulado" ? " · modo simulado, falta APIFY_TOKEN" : ""),
    }
  } catch (e) {
    return { mensaje: `No se pudo completar: ${e instanceof Error ? e.message : String(e)}` }
  }
}

// ---------------- Proyectos ----------------
export async function upsertProject(fd: FormData) {
  const { supabase } = await requireUser()
  const id = str(fd, "id")
  const payload = {
    slug: str(fd, "slug") || null,
    tag: str(fd, "tag") || null,
    title: str(fd, "title"),
    description: str(fd, "description") || null,
    result_label: str(fd, "result_label") || "Resultado",
    result: str(fd, "result") || null,
    illustration: (str(fd, "illustration") || "quote") as Illustration,
    image_url: str(fd, "image_url") || null,
    image_alt: str(fd, "image_alt") || null,
    published: bool(fd, "published"),
    sort_order: num(fd, "sort_order"),
    i18n: buildI18n(fd, ["tag", "title", "description", "result"]),
  }
  if (id) {
    await supabase.from("projects").update(payload).eq("id", id)
  } else {
    await supabase.from("projects").insert(payload)
  }
  revalidatePath("/admin/projects")
  revalidatePath("/")
  redirect("/admin/projects")
}

export async function deleteProject(fd: FormData) {
  const { supabase } = await requireUser()
  await supabase.from("projects").delete().eq("id", str(fd, "id"))
  revalidatePath("/admin/projects")
  revalidatePath("/")
  redirect("/admin/projects")
}

// ---------------- Reseñas ----------------
export async function upsertReview(fd: FormData) {
  const { supabase } = await requireUser()
  const id = str(fd, "id")
  const payload = {
    quote: str(fd, "quote"),
    name: str(fd, "name"),
    role: str(fd, "role") || null,
    initials: str(fd, "initials") || null,
    rating: num(fd, "rating", 5),
    published: bool(fd, "published"),
    sort_order: num(fd, "sort_order"),
    i18n: buildI18n(fd, ["quote", "role"]),
  }
  if (id) {
    await supabase.from("reviews").update(payload).eq("id", id)
  } else {
    await supabase.from("reviews").insert(payload)
  }
  revalidatePath("/admin/reviews")
  revalidatePath("/")
  redirect("/admin/reviews")
}

export async function deleteReview(fd: FormData) {
  const { supabase } = await requireUser()
  await supabase.from("reviews").delete().eq("id", str(fd, "id"))
  revalidatePath("/admin/reviews")
  revalidatePath("/")
  redirect("/admin/reviews")
}

// ---------------- SEO ----------------
export async function updateSeo(fd: FormData) {
  const { supabase } = await requireUser()
  const path = str(fd, "path") || "/"
  await supabase.from("page_seo").upsert(
    {
      path,
      title: str(fd, "title") || null,
      description: str(fd, "description") || null,
      keywords: str(fd, "keywords") || null,
      og_image: str(fd, "og_image") || null,
    },
    { onConflict: "path" },
  )
  revalidatePath("/admin/seo")
  revalidatePath("/", "layout")
}

// ---------------- Tracking / Configuración ----------------
export async function updateSettings(fd: FormData) {
  const { supabase } = await requireUser()
  await supabase.from("site_settings").upsert({
    id: 1,
    gtm_id: str(fd, "gtm_id") || null,
    ga4_id: str(fd, "ga4_id") || null,
    google_ads_id: str(fd, "google_ads_id") || null,
    meta_pixel_id: str(fd, "meta_pixel_id") || null,
    tiktok_pixel_id: str(fd, "tiktok_pixel_id") || null,
    whatsapp_number: str(fd, "whatsapp_number") || null,
    contact_email: str(fd, "contact_email") || null,
    extra_head_html: str(fd, "extra_head_html") || null,
  })
  revalidatePath("/admin/tracking")
  revalidatePath("/", "layout")
}

// ---------------- Botón flotante de WhatsApp ----------------

/** Junta los tres campos de un texto traducible en el jsonb que guarda la tabla. */
function localized(fd: FormData, prefix: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const lang of ["es", "en", "pt"]) {
    const v = str(fd, `${prefix}_${lang}`)
    if (v) out[lang] = v
  }
  return out
}

export async function updateWhatsApp(fd: FormData) {
  const { supabase } = await requireUser()

  const position = str(fd, "whatsapp_position")
  const icon = str(fd, "whatsapp_icon")
  // El retardo se acota al mismo rango que valida la base, para que un valor
  // raro escrito a mano no reviente el guardado con un error de constraint.
  const delay = Math.min(Math.max(Number(str(fd, "whatsapp_delay_ms")) || 0, 0), 60000)

  await supabase.from("site_settings").upsert({
    id: 1,
    whatsapp_enabled: fd.get("whatsapp_enabled") === "on",
    whatsapp_number: str(fd, "whatsapp_number") || null,
    whatsapp_link: str(fd, "whatsapp_link") || null,
    whatsapp_message: localized(fd, "whatsapp_message"),
    whatsapp_label: localized(fd, "whatsapp_label"),
    whatsapp_position: position === "left" ? "left" : "right",
    whatsapp_icon: icon === "chat" || icon === "phone" ? icon : "whatsapp",
    whatsapp_delay_ms: delay,
  })

  revalidatePath("/admin/whatsapp")
  revalidatePath("/", "layout")
}
