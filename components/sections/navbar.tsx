"use client";

import Image from "next/image";
import Link from "next/link";
import { type Language, type Translation } from "@/lib/i18n";
import LanguageSelector from "@/components/language-selector";
import { servicesIndexPath } from "@/lib/services-content";

interface NavbarProps {
  t: Translation;
  currentLanguage: Language;
  alternates: Record<Language, string>;
}

export function Navbar({ t, currentLanguage, alternates }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#EDEAF6] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-[clamp(20px,5vw,40px)] py-[13px]">
        <a
          href="#top"
          className="flex items-center"
          aria-label="Dos Nodos — inicio"
        >
          <Image
            src="/dosnodos-logo.png"
            alt="Dos Nodos"
            width={170}
            height={86}
            quality={65}
            priority
            // En móvil el logo es el elemento LCP. `priority` genera el
            // preload pero no le pone fetchpriority, que es justo lo que
            // Lighthouse reclama.
            fetchPriority="high"
            className="h-auto w-[132px] object-contain sm:w-[150px]"
          />
        </a>
        <nav className="flex flex-wrap items-center justify-end gap-x-[clamp(10px,2.4vw,28px)] gap-y-2 text-[15px] text-[#3A3550]">
          <Link
            href={servicesIndexPath(currentLanguage)}
            className="hidden text-[#3A3550] transition-colors hover:text-ink sm:inline"
          >
            {t.nav.services}
          </Link>
          <a
            href="#casos"
            className="hidden text-[#3A3550] transition-colors hover:text-ink sm:inline"
          >
            {t.nav.projects}
          </a>
          <a
            href="#resenas"
            className="hidden text-[#3A3550] transition-colors hover:text-ink sm:inline"
          >
            {t.nav.reviews}
          </a>
          <a
            href="#faq"
            className="hidden text-[#3A3550] transition-colors hover:text-ink md:inline"
          >
            {t.nav.faq}
          </a>
          <LanguageSelector
            currentLanguage={currentLanguage}
            alternates={alternates}
          />
          <a
            href="#contacto"
            className="whitespace-nowrap rounded-full bg-gradient-to-r from-brand-cta to-brand-blue px-[17px] py-[9px] text-[14px] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(124,34,206,.6)] transition-transform hover:-translate-y-px"
          >
            {t.nav.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}
