"use client"

import { type Language, translations } from "@/lib/i18n"
import type { Project, Review } from "@/lib/types"

import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { Metrics } from "@/components/sections/metrics"
import { Services } from "@/components/sections/services"
import { Projects } from "@/components/sections/projects"
import { Reviews } from "@/components/sections/reviews"
import { Faq } from "@/components/sections/faq"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import type { WhatsAppConfig } from "@/lib/whatsapp"
import { StructuredData } from "@/components/structured-data"

interface SiteClientProps {
  /** Idioma resuelto por la ruta (/ es, /en, /pt). */
  lang: Language
  /** Ruta equivalente del home por idioma. */
  alternates: Record<Language, string>
  projects: Project[] | null
  reviews: Review[] | null
  /** Número para los enlaces de la sección de contacto. */
  whatsapp: string
  /** Configuración del botón flotante, editable desde /admin. */
  whatsappButton: WhatsAppConfig
  contactEmail: string
}

export function SiteClient({
  lang,
  alternates,
  projects,
  reviews,
  whatsapp,
  whatsappButton,
  contactEmail,
}: SiteClientProps) {
  const t = translations[lang]

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-ink">
      <StructuredData language={lang} />
      <Navbar t={t} currentLanguage={lang} alternates={alternates} />
      <main>
        <Hero t={t} />
        <Metrics t={t} />
        <Services t={t} lang={lang} />
        <Projects t={t} rows={projects} lang={lang} />
        <Reviews t={t} rows={reviews} lang={lang} />
        <Faq t={t} />
        <Contact t={t} currentLanguage={lang} whatsapp={whatsapp} contactEmail={contactEmail} />
      </main>
      <Footer t={t} currentLanguage={lang} alternates={alternates} />
      <WhatsAppButton config={whatsappButton} lang={lang} />
    </div>
  )
}
