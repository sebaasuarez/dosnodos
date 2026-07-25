import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ServiceDetail } from "@/components/service-detail"
import { PageShell } from "@/components/page-shell"
import { SERVICES, findServiceBySlug } from "@/lib/services-content"
import { serviceAlternates, serviceMetadata } from "@/lib/seo"
import { getSiteSettings } from "@/lib/data"

const LANG = "es" as const

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug[LANG] }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = findServiceBySlug(LANG, slug)
  if (!service) return {}
  return serviceMetadata(LANG, service)
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = findServiceBySlug(LANG, slug)
  if (!service) notFound()
  const settings = await getSiteSettings()

  return (
    <PageShell
      lang={LANG}
      alternates={serviceAlternates(service)}
      whatsapp={settings.whatsapp_number || undefined}
    >
      <ServiceDetail service={service} lang={LANG} />
    </PageShell>
  )
}
