"use client"

import { useState } from "react"
import { type Language, translations } from "@/lib/i18n"

// Sections
import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Team } from "@/components/sections/team"
import { Benefits } from "@/components/sections/benefits"
import { Sectors } from "@/components/sections/sectors"
import { Testimonials } from "@/components/sections/testimonials"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"
import { StructuredData } from "@/components/structured-data"

export default function LandingPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("es")
  const t = translations[currentLanguage]

  return (
    <div className="min-h-screen bg-white">
      <StructuredData language={currentLanguage} />
      <Navbar t={t} currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      <Hero t={t} currentLanguage={currentLanguage} />
      <Services t={t} />
      <Team t={t} currentLanguage={currentLanguage} />
      <Benefits t={t} />
      <Sectors t={t} />
      <Testimonials t={t} />
      <CTA t={t} currentLanguage={currentLanguage} />
      <Footer t={t} />
    </div>
  )
}
