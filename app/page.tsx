import { getProjects, getReviews, getSiteSettings } from "@/lib/data"
import { whatsappConfig } from "@/lib/whatsapp"
import { SiteClient } from "@/components/site-client"
import { homeAlternates } from "@/lib/seo"

export default async function LandingPage() {
  const [projects, reviews, settings] = await Promise.all([
    getProjects(),
    getReviews(),
    getSiteSettings(),
  ])

  return (
    <SiteClient
      lang="es"
      alternates={homeAlternates()}
      projects={projects}
      reviews={reviews}
      whatsapp={settings.whatsapp_number || "573127344026"}
      whatsappButton={whatsappConfig(settings)}
      contactEmail={settings.contact_email || "hola@dosnodos.com.co"}
    />
  )
}
