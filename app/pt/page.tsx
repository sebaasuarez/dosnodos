import type { Metadata } from "next"
import { getPageSeo, getProjects, getReviews, getSiteSettings } from "@/lib/data"
import { whatsappConfig } from "@/lib/whatsapp"
import { SiteClient } from "@/components/site-client"
import { homeAlternates, homeMetadata } from "@/lib/seo"
import { translations } from "@/lib/i18n"

const LANG = "pt" as const

/** El SEO de esta ruta es editable desde /admin/seo. */
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("/pt")
  return homeMetadata(LANG, "Dos Nodos — Tecnologia com propósito", translations[LANG].hero.subtitle, seo)
}

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
      whatsappButton={whatsappConfig(settings)}
      contactEmail={settings.contact_email || "hola@dosnodos.com.co"}
    />
  )
}
