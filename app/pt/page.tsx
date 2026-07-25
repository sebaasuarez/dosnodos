import type { Metadata } from "next"
import { getProjects, getReviews, getSiteSettings } from "@/lib/data"
import { SiteClient } from "@/components/site-client"
import { homeAlternates, homeMetadata } from "@/lib/seo"
import { translations } from "@/lib/i18n"

const LANG = "pt" as const

export const metadata: Metadata = homeMetadata(
  LANG,
  "Dos Nodos — Tecnologia com propósito",
  translations[LANG].hero.subtitle,
)

export default async function Page() {
  const [projects, reviews, settings] = await Promise.all([
    getProjects(),
    getReviews(),
    getSiteSettings(),
  ])

  return (
    <SiteClient
      lang={LANG}
      alternates={homeAlternates()}
      projects={projects}
      reviews={reviews}
      whatsapp={settings.whatsapp_number || "573127344026"}
      contactEmail={settings.contact_email || "hola@dosnodos.com.co"}
    />
  )
}
