import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { type Language, translations } from "@/lib/i18n"
import { homePath, servicesIndexPath } from "@/lib/services-content"
import { WhatsAppButton } from "@/components/whatsapp-button"

const LANGS: Language[] = ["es", "en", "pt"]

/**
 * Marco de las páginas internas (servicios). A diferencia del home, el
 * selector de idioma son enlaces reales a la URL equivalente, no estado.
 */
export function PageShell({
  lang,
  alternates,
  whatsapp = "573127344026",
  children,
}: {
  lang: Language
  /** Ruta equivalente por idioma, para el selector y el hreflang. */
  alternates: Record<Language, string>
  whatsapp?: string
  children: React.ReactNode
}) {
  const t = translations[lang]

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-ink">
      <header className="sticky top-0 z-50 border-b border-[#EDEAF6] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-[clamp(20px,5vw,40px)] py-[13px]">
          <Link href={homePath(lang)} className="flex items-center" aria-label="Dos Nodos">
            <Image
              src="/dosnodos-logo.png"
              alt="Dos Nodos"
              width={170}
              height={86}
              priority
              className="h-auto w-[132px] object-contain sm:w-[150px]"
            />
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-x-[clamp(10px,2.4vw,28px)] gap-y-2 text-[15px] text-[#3A3550]">
            <Link
              href={servicesIndexPath(lang)}
              className="hidden text-[#3A3550] transition-colors hover:text-ink sm:inline"
            >
              {t.nav.services}
            </Link>
            <Link
              href={`${homePath(lang)}#casos`}
              className="hidden text-[#3A3550] transition-colors hover:text-ink md:inline"
            >
              {t.nav.projects}
            </Link>
            <Link
              href={`${homePath(lang)}#faq`}
              className="hidden text-[#3A3550] transition-colors hover:text-ink md:inline"
            >
              {t.nav.faq}
            </Link>

            <div className="flex items-center gap-1.5" role="group" aria-label="Idioma / Language">
              {LANGS.map((l) => (
                <Link
                  key={l}
                  href={alternates[l]}
                  hrefLang={l}
                  aria-current={l === lang ? "true" : undefined}
                  className={
                    l === lang
                      ? "rounded-full bg-ink px-2.5 py-1 font-mono text-[11px] uppercase leading-none text-white"
                      : "rounded-full px-2.5 py-1 font-mono text-[11px] uppercase leading-none text-[#9c98b4] transition-colors hover:text-ink"
                  }
                >
                  {l}
                </Link>
              ))}
            </div>

            <Link
              href={`${homePath(lang)}#contacto`}
              className="whitespace-nowrap rounded-full bg-gradient-to-r from-brand-cta to-brand-blue px-[17px] py-[9px] text-[14px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(124,34,206,.6)] transition-transform hover:-translate-y-px"
            >
              {t.nav.cta}
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

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
                <Link href={servicesIndexPath(lang)} className="text-[#C9C6DE] transition-colors hover:text-white">
                  {t.nav.services}
                </Link>
                <Link href={`${homePath(lang)}#casos`} className="text-[#C9C6DE] transition-colors hover:text-white">
                  {t.nav.projects}
                </Link>
                <Link href={`${homePath(lang)}#faq`} className="text-[#C9C6DE] transition-colors hover:text-white">
                  {t.nav.faq}
                </Link>
              </div>
              <div className="flex flex-col gap-2.5 text-[14px]">
                <span className="mb-0.5 font-mono text-[11px] uppercase tracking-[.1em] text-[#726E90]">
                  {t.footer.contactLabel}
                </span>
                <Link href={`${homePath(lang)}#contacto`} className="text-[#C9C6DE] transition-colors hover:text-white">
                  {t.footer.scheduleCta}
                </Link>
                <a href={`mailto:${t.footer.email}`} className="text-[#C9C6DE] transition-colors hover:text-white">
                  {t.footer.email}
                </a>
                <span className="text-[#C9C6DE]">{t.footer.location}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3.5 border-t border-[#1A1630] pt-5">
            <span className="font-mono text-[11.5px] text-[#726E90]">{t.footer.copyright}</span>
          </div>
        </div>
      </footer>

      <WhatsAppButton number={whatsapp} />
    </div>
  )
}
