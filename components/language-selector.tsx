"use client"

import { type Language } from "@/lib/i18n"
import { trackLanguageChange } from "@/lib/gtm"
import { cn } from "@/lib/utils"

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
  variant?: "light" | "dark"
}

const LANGS: Language[] = ["es", "en", "pt"]

export default function LanguageSelector({
  currentLanguage,
  onLanguageChange,
  variant = "light",
}: LanguageSelectorProps) {
  const handle = (lang: Language) => {
    if (lang === currentLanguage) return
    trackLanguageChange(currentLanguage, lang)
    onLanguageChange(lang)
  }

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Idioma / Language">
      {LANGS.map((lang) => {
        const active = lang === currentLanguage
        return (
          <button
            key={lang}
            type="button"
            onClick={() => handle(lang)}
            aria-pressed={active}
            className={cn(
              "font-mono text-[11px] uppercase rounded-full px-2.5 py-1 leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/50",
              active
                ? variant === "dark"
                  ? "bg-gradient-to-r from-brand-cta to-brand-blue text-white"
                  : "bg-ink text-white"
                : variant === "dark"
                  ? "border border-[#2A2542] text-[#A29FBE] hover:text-white"
                  : "text-[#9c98b4] hover:text-ink",
            )}
          >
            {lang}
          </button>
        )
      })}
    </div>
  )
}
