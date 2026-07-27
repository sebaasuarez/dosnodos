"use client"

import { useEffect, useState } from "react"
import type { WhatsAppIcon, WhatsAppPosition } from "@/lib/types"

/**
 * Maqueta del botón sobre una página simulada. Lee los campos del formulario
 * mientras se editan, así se ve el resultado antes de guardar.
 */
export function WhatsAppPreview({
  position,
  icon,
  label,
  enabled,
}: {
  position: WhatsAppPosition
  icon: WhatsAppIcon
  label: string
  enabled: boolean
}) {
  const [state, setState] = useState({ position, icon, label, enabled })

  useEffect(() => {
    const form = document.querySelector("form")
    if (!form) return

    const read = () => {
      const fd = new FormData(form)
      setState({
        position: (fd.get("whatsapp_position") as WhatsAppPosition) || "right",
        icon: (fd.get("whatsapp_icon") as WhatsAppIcon) || "whatsapp",
        label: String(fd.get("whatsapp_label_es") || ""),
        enabled: fd.get("whatsapp_enabled") === "on",
      })
    }

    read()
    form.addEventListener("input", read)
    form.addEventListener("change", read)
    return () => {
      form.removeEventListener("input", read)
      form.removeEventListener("change", read)
    }
  }, [])

  const paths: Record<WhatsAppIcon, string[]> = {
    whatsapp: [
      "M12 2a10 10 0 00-8.6 15l-1 3.6 3.7-1A10 10 0 1012 2zm0 2a8 8 0 11-4.3 14.7l-.3-.2-2.2.6.6-2.1-.2-.3A8 8 0 0112 4z",
      "M8.5 7.5c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4l.7 1.6c.1.2 0 .4 0 .5l-.4.5c-.1.1-.2.3-.1.5.2.4.6 1 1.2 1.5.7.6 1.3.8 1.6.9.2.1.4 0 .5-.1l.5-.6c.2-.2.4-.2.5-.1l1.5.7c.2.1.3.2.4.3 0 .3 0 .9-.3 1.3-.3.4-1.1.8-1.6.8-.8.1-1.4 0-3-.7-2.4-1-3.9-3.5-4-3.7-.1-.2-1-1.3-1-2.5 0-1.2.6-1.8.9-2z",
    ],
    chat: [
      "M12 3c-4.97 0-9 3.36-9 7.5 0 2.3 1.24 4.36 3.2 5.73L5.5 20a.5.5 0 00.74.55l3.9-2.2c.6.1 1.22.15 1.86.15 4.97 0 9-3.36 9-7.5S16.97 3 12 3z",
    ],
    phone: [
      "M6.6 3h2.1c.4 0 .8.3.9.7l1 3.1c.1.4 0 .8-.3 1L8.8 9.2a12 12 0 006 6l1.4-1.5c.3-.3.7-.4 1-.3l3.1 1c.4.1.7.5.7.9v2.1c0 1-.8 1.9-1.9 1.8A16.9 16.9 0 013.2 4.9C3.1 3.8 4 3 5 3h1.6z",
    ],
  }

  return (
    <div className="lg:sticky lg:top-6 lg:self-start">
      <span className="mb-2 block text-[13px] font-semibold text-ink">Vista previa</span>
      <div className="relative h-[300px] overflow-hidden rounded-[16px] border border-[#E4E1F0] bg-white">
        {/* Página simulada, solo para dar contexto de dónde cae el botón. */}
        <div className="border-b border-[#EDEAF6] px-4 py-3">
          <div className="h-3 w-20 rounded bg-[#E9E6FB]" />
        </div>
        <div className="flex flex-col gap-2.5 p-4">
          <div className="h-3 w-3/4 rounded bg-[#F1EFFA]" />
          <div className="h-3 w-full rounded bg-[#F1EFFA]" />
          <div className="h-3 w-2/3 rounded bg-[#F1EFFA]" />
          <div className="mt-3 h-16 w-full rounded-lg bg-[#F6F5FC]" />
        </div>

        {state.enabled ? (
          <div
            className={`absolute bottom-4 flex h-[46px] items-center justify-center gap-2 rounded-full bg-whatsapp shadow-[0_10px_22px_-10px_rgba(37,211,102,.8)] ${
              state.position === "left" ? "left-4" : "right-4"
            } ${state.label ? "px-4" : "w-[46px]"}`}
          >
            <svg width="25" height="25" viewBox="0 0 24 24" fill="#fff" aria-hidden className="shrink-0">
              {(paths[state.icon] ?? paths.whatsapp).map((d) => (
                <path key={d.slice(0, 12)} d={d} />
              ))}
            </svg>
            {state.label && (
              <span className="pr-0.5 text-[13px] font-semibold text-white">{state.label}</span>
            )}
          </div>
        ) : (
          <div className="absolute inset-x-0 bottom-4 text-center text-[12.5px] text-[#6A667E]">
            El botón está desactivado
          </div>
        )}
      </div>
      <p className="mt-2 text-[12px] text-[#6A667E]">
        La etiqueta mostrada es la de español. El retardo no se simula acá.
      </p>
    </div>
  )
}
