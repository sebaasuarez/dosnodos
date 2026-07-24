import { getProjects, getReviews, getSiteSettings } from "@/lib/data"
import { SiteClient } from "@/components/site-client"

export default async function LandingPage() {
  const [projects, reviews, settings] = await Promise.all([
    getProjects(),
    getReviews(),
    getSiteSettings(),
  ])

  return (
    <SiteClient
      projects={projects}
      reviews={reviews}
      whatsapp={settings.whatsapp_number || "573127344026"}
      contactEmail={settings.contact_email || "hola@dosnodos.com.co"}
    />
  )
}
