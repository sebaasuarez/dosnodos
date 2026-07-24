"use client"

import { useState } from "react"
import { type Language, translations } from "@/lib/i18n"

import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { Metrics } from "@/components/sections/metrics"
import { Services } from "@/components/sections/services"
import { Projects } from "@/components/sections/projects"
import { Reviews } from "@/components/sections/reviews"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { StructuredData } from "@/components/structured-data"

export default function LandingPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("es")
  const t = translations[currentLanguage]

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-ink">
      <StructuredData language={currentLanguage} />
      <Navbar t={t} currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <main>
        <Hero t={t} />
        <Metrics t={t} />
        <Services t={t} />
        <Projects t={t} />
        <Reviews t={t} />
        <Contact t={t} currentLanguage={currentLanguage} />
      </main>
      <Footer t={t} currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <WhatsAppButton />
    </div>
  )
}
