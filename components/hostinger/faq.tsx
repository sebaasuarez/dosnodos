"use client"

import { gtmEvent } from "@/lib/gtm"

/**
 * Preguntas frecuentes.
 *
 * Usa `<details>` nativo: abre y cierra sin JavaScript, el teclado ya
 * funciona y los lectores de pantalla anuncian el estado solos. Un acordeón
 * hecho a mano tendría que reimplementar todo eso para quedar igual.
 */
export function Faq({ preguntas }: { preguntas: { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col divide-y divide-[#EDEAF6] border-y border-[#EDEAF6]">
      {preguntas.map((p) => (
        <details
          key={p.q}
          className="group"
          onToggle={(e) => {
            if ((e.currentTarget as HTMLDetailsElement).open) {
              gtmEvent("faq_opened", { pregunta: p.q, ubicacion: "hostinger" })
            }
          }}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] font-semibold text-ink marker:hidden hover:text-brand-cta">
            {p.q}
            <span
              aria-hidden="true"
              className="shrink-0 text-[22px] font-normal leading-none text-[#6A667E] transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-[72ch] pb-5 text-[15px] leading-[1.6] text-[#5A5570]">{p.a}</p>
        </details>
      ))}
    </div>
  )
}
