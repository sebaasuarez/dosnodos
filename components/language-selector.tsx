"use client"

import Link from "next/link"
import { type Language } from "@/lib/i18n"
import { trackLanguageChange } from "@/lib/gtm"
import { cn } from "@/lib/utils"

interface LanguageSelectorProps {
  currentLanguage: Language
  /** Ruta equivalente por idioma. El cambio de idioma navega, no es estado. */
  alternates: Record<Language, string>
  variant?: "light" | "dark"
}

const LANGS: Language[] = ["es", "en", "pt"]

export default function LanguageSelector({
  currentLanguage,
  alternates,
  variant = "light",
}: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Idioma / Language">
      {LANGS.map((lang) => {
        const active = lang === currentLanguage
        return (
          <Link
            key={lang}
            href={alternates[lang]}
            hrefLang={lang}
            aria-current={active ? "true" : undefined}
            onClick={() => {
              if (!active) trackLanguageChange(currentLanguage, lang)
            }}
            className={cn(
              "rounded-full px-2.5 py-1 font-mono text-[11px] uppercase leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/50",
              active
                ? variant === "dark"
                  ? "bg-gradient-to-r from-brand-cta to-brand-blue text-white"
                  : "bg-ink text-white"
                : variant === "dark"
                  ? "border border-[#2A2542] text-[#A29FBE] hover:text-white"
                  : "text-[#6F6B8A] hover:text-ink",
            )}
          >
            {lang}
          </Link>
        )
      })}
    </div>
  )
}
