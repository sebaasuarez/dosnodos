"use client"

import Image from "next/image"
import Link from "next/link"
import { type Language, type Translation } from "@/lib/i18n"
import LanguageSelector from "@/components/language-selector"
import { servicesIndexPath } from "@/lib/services-content"
import { trackEmailClick } from "@/lib/gtm"

interface FooterProps {
  t: Translation
  currentLanguage: Language
  alternates: Record<Language, string>
}

export function Footer({ t, currentLanguage, alternates }: FooterProps) {
  return (
    <footer className="bg-ink-3">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-7 px-[clamp(20px,5vw,40px)] py-[clamp(36px,5vw,56px)]">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex max-w-[34ch] flex-col gap-3">
            <Image
              src="/dosnodos-logo.png"
              alt="Dos Nodos"
              width={170}
              height={86}
              className="dn-logo-white h-auto w-[150px] object-contain sm:w-[170px]"
            />
            <span className="font-serif text-[15px] italic text-[#A29FBE]">{t.footer.tagline}</span>
          </div>

          <div className="flex flex-wrap gap-x-[clamp(28px,5vw,64px)] gap-y-6">
            <div className="flex flex-col gap-2.5 text-[14px]">
              <span className="mb-0.5 font-mono text-[11px] uppercase tracking-[.1em] text-[#726E90]">
                {t.footer.exploreLabel}
              </span>
              <Link
                href={servicesIndexPath(currentLanguage)}
                className="text-[#C9C6DE] transition-colors hover:text-white"
              >
                {t.nav.services}
              </Link>
              <a href="#casos" className="text-[#C9C6DE] transition-colors hover:text-white">
                {t.nav.projects}
              </a>
              <a href="#resenas" className="text-[#C9C6DE] transition-colors hover:text-white">
                {t.nav.reviews}
              </a>
              <a href="#faq" className="text-[#C9C6DE] transition-colors hover:text-white">
                {t.nav.faq}
              </a>
            </div>
            <div className="flex flex-col gap-2.5 text-[14px]">
              <span className="mb-0.5 font-mono text-[11px] uppercase tracking-[.1em] text-[#726E90]">
                {t.footer.contactLabel}
              </span>
              <a href="#contacto" className="text-[#C9C6DE] transition-colors hover:text-white">
                {t.footer.scheduleCta}
              </a>
              <a
                href={`mailto:${t.footer.email}`}
                onClick={() => trackEmailClick()}
                className="text-[#C9C6DE] transition-colors hover:text-white"
              >
                {t.footer.email}
              </a>
              <span className="text-[#C9C6DE]">{t.footer.location}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3.5 border-t border-[#1A1630] pt-5">
          <span className="font-mono text-[11.5px] text-[#726E90]">{t.footer.copyright}</span>
          <LanguageSelector currentLanguage={currentLanguage} alternates={alternates} variant="dark" />
        </div>
      </div>
    </footer>
  )
}
