import type { Metadata } from "next"
import { ServicesIndex } from "@/components/services-index"
import { PageShell } from "@/components/page-shell"
import { servicesIndexAlternates, servicesIndexMetadata } from "@/lib/seo"
import { getSiteSettings } from "@/lib/data"
import { whatsappConfig } from "@/lib/whatsapp"

export const metadata: Metadata = servicesIndexMetadata("en")

export default async function Page() {
  const settings = await getSiteSettings()
  return (
    <PageShell lang="en" alternates={servicesIndexAlternates()} whatsappButton={whatsappConfig(settings)}>
      <ServicesIndex lang="en" />
    </PageShell>
  )
}
