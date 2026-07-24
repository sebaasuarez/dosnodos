"use client"

import Image from "next/image"
import { type Language, type Translation } from "@/lib/i18n"
import LanguageSelector from "@/components/language-selector"

interface NavbarProps {
  t: Translation
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

export function Navbar({ t, currentLanguage, onLanguageChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#EDEAF6] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-[clamp(20px,5vw,40px)] py-[13px]">
        <a href="#top" className="flex items-center" aria-label="Dos Nodos — inicio">
          <Image
            src="/dosnodos-logo.png"
            alt="Dos Nodos"
            width={170}
            height={86}
            priority
            className="h-auto w-[132px] object-contain sm:w-[150px]"
          />
        </a>
        <nav className="flex flex-wrap items-center justify-end gap-x-[clamp(10px,2.4vw,28px)] gap-y-2 text-[15px] text-[#3A3550]">
          <a href="#servicios" className="hidden text-[#3A3550] transition-colors hover:text-ink sm:inline">
            {t.nav.services}
          </a>
          <a href="#casos" className="hidden text-[#3A3550] transition-colors hover:text-ink sm:inline">
            {t.nav.projects}
          </a>
          <a href="#resenas" className="hidden text-[#3A3550] transition-colors hover:text-ink sm:inline">
            {t.nav.reviews}
          </a>
          <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
          <a
            href="#contacto"
            className="whitespace-nowrap rounded-full bg-gradient-to-r from-brand-cta to-brand-blue px-[17px] py-[9px] text-[14px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(124,34,206,.6)] transition-transform hover:-translate-y-px"
          >
            {t.nav.cta}
          </a>
        </nav>
      </div>
    </header>
  )
}
