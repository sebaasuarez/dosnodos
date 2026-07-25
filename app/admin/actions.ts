"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { requireUser } from "@/lib/supabase/auth"
import { createServerSupabase } from "@/lib/supabase/server"
import type { Illustration, LeadStatus } from "@/lib/types"

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

export async function deleteLead(fd: FormData) {
  const { supabase } = await requireUser()
  await supabase.from("leads").delete().eq("id", str(fd, "id"))
  revalidatePath("/admin/leads")
  revalidatePath("/admin")
  redirect("/admin/leads")
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
