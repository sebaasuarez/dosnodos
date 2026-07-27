"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { trackWhatsAppClick } from "@/lib/gtm"
import type { Language } from "@/lib/i18n"
import type { LocalizedText, WhatsAppIcon } from "@/lib/types"
import type { WhatsAppConfig } from "@/lib/whatsapp"

const ICONS: Record<WhatsAppIcon, React.ReactNode> = {
  whatsapp: (
    <>
      <path d="M12 2a10 10 0 00-8.6 15l-1 3.6 3.7-1A10 10 0 1012 2zm0 2a8 8 0 11-4.3 14.7l-.3-.2-2.2.6.6-2.1-.2-.3A8 8 0 0112 4z" />
      <path d="M8.5 7.5c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4l.7 1.6c.1.2 0 .4 0 .5l-.4.5c-.1.1-.2.3-.1.5.2.4.6 1 1.2 1.5.7.6 1.3.8 1.6.9.2.1.4 0 .5-.1l.5-.6c.2-.2.4-.2.5-.1l1.5.7c.2.1.3.2.4.3 0 .3 0 .9-.3 1.3-.3.4-1.1.8-1.6.8-.8.1-1.4 0-3-.7-2.4-1-3.9-3.5-4-3.7-.1-.2-1-1.3-1-2.5 0-1.2.6-1.8.9-2z" />
    </>
  ),
  chat: (
    <path d="M12 3c-4.97 0-9 3.36-9 7.5 0 2.3 1.24 4.36 3.2 5.73L5.5 20a.5.5 0 00.74.55l3.9-2.2c.6.1 1.22.15 1.86.15 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" />
  ),
  phone: (
    <path d="M6.6 3h2.1c.4 0 .8.3.9.7l1 3.1c.1.4 0 .8-.3 1L8.8 9.2a12 12 0 006 6l1.4-1.5c.3-.3.7-.4 1-.3l3.1 1c.4.1.7.5.7.9v2.1c0 1-.8 1.9-1.9 1.8A16.9 16.9 0 013.2 4.9C3.1 3.8 4 3 5 3h1.6z" />
  ),
}

/** Texto del idioma actual, con respaldo en español y luego en el primero que haya. */
function pick(text: LocalizedText | null | undefined, lang: Language): string {
  if (!text) return ""
  return text[lang] || text.es || Object.values(text).find(Boolean) || ""
}

const DEFAULT_ARIA: Record<Language, string> = {
  es: "Escríbenos por WhatsApp",
  en: "Message us on WhatsApp",
  pt: "Fale conosco pelo WhatsApp",
}

export type { WhatsAppConfig }

export function WhatsAppButton({
  config,
  lang = "es",
}: {
  config: WhatsAppConfig
  lang?: Language
}) {
  const delay = config.delayMs ?? 0
  // Sin retardo el botón se pinta de una y no hay trabajo extra en el cliente;
  // con retardo entra después.
  const [visible, setVisible] = useState(delay === 0)

  useEffect(() => {
    if (delay === 0) return
    const t = window.setTimeout(() => setVisible(true), delay)
    return () => window.clearTimeout(t)
  }, [delay])

  if (!config.enabled || !visible) return null

  const message = pick(config.message, lang)
  const label = pick(config.label, lang)
  const aria = label || DEFAULT_ARIA[lang]

  const href =
    config.link?.trim() ||
    `https://wa.me/${config.number}${message ? `?text=${encodeURIComponent(message)}` : ""}`

  const icon = config.icon ?? "whatsapp"
  const side = config.position === "left" ? "left-[22px]" : "right-[22px]"

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("floating_button")}
      aria-label={aria}
      className={`fixed bottom-[22px] ${side} z-[60] flex h-[58px] items-center justify-center gap-2.5 rounded-full bg-whatsapp shadow-[0_12px_28px_-10px_rgba(37,211,102,.7)] transition-transform hover:scale-105 ${
        label ? "px-[18px]" : "w-[58px]"
      }`}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" aria-hidden className="shrink-0">
        {ICONS[icon] ?? ICONS.whatsapp}
      </svg>
      {label && <span className="pr-1 text-[15px] font-semibold text-white">{label}</span>}
    </a>
  )
}
