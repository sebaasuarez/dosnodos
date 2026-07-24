"use client"

import { trackWhatsAppClick } from "@/lib/gtm"

export function WhatsAppButton({ number = "573127344026" }: { number?: string }) {
  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick()}
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-[22px] right-[22px] z-[60] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-whatsapp shadow-[0_12px_28px_-10px_rgba(37,211,102,.7)] transition-transform hover:scale-105"
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" aria-hidden>
        <path d="M12 2a10 10 0 00-8.6 15l-1 3.6 3.7-1A10 10 0 1012 2zm0 2a8 8 0 11-4.3 14.7l-.3-.2-2.2.6.6-2.1-.2-.3A8 8 0 0112 4z" />
        <path d="M8.5 7.5c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4l.7 1.6c.1.2 0 .4 0 .5l-.4.5c-.1.1-.2.3-.1.5.2.4.6 1 1.2 1.5.7.6 1.3.8 1.6.9.2.1.4 0 .5-.1l.5-.6c.2-.2.4-.2.5-.1l1.5.7c.2.1.3.2.4.3 0 .3 0 .9-.3 1.3-.3.4-1.1.8-1.6.8-.8.1-1.4 0-3-.7-2.4-1-3.9-3.5-4-3.7-.1-.2-1-1.3-1-2.5 0-1.2.6-1.8.9-2z" />
      </svg>
    </a>
  )
}
