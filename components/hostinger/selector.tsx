"use client"

import { useState } from "react"
import { gtmEvent } from "@/lib/gtm"

export interface OpcionSelector {
  id: string
  titulo: string
  producto: { id: string; nombre: string; aporta: string }
  implementamos: string[]
  /** null cuando no hay enlace de referido configurado. */
  enlaceProducto: string | null
}

/**
 * Selector de necesidades.
 *
 * Es la pieza que justifica la landing: en vez de leer ocho tarjetas, el
 * visitante dice qué necesita y ve de una qué pone Hostinger y qué ponemos
 * nosotros. La selección viaja al formulario y al mensaje de WhatsApp, así que
 * la conversación empieza con contexto en vez de con "hola, información".
 */
export function SelectorNecesidad({
  opciones,
  onSeleccion,
}: {
  opciones: OpcionSelector[]
  onSeleccion?: (id: string) => void
}) {
  const [activa, setActiva] = useState<string | null>(null)
  const elegida = opciones.find((o) => o.id === activa)

  function elegir(id: string) {
    setActiva(id)
    onSeleccion?.(id)
    gtmEvent("solution_selected", { necesidad: id })
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        role="radiogroup"
        aria-label="¿Qué necesitas?"
        className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {opciones.map((o) => {
          const activo = o.id === activa
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={activo}
              onClick={() => elegir(o.id)}
              className={`rounded-[14px] border px-4 py-3.5 text-left text-[14.5px] leading-[1.35] transition-colors ${
                activo
                  ? "border-brand-cta bg-[#F5F0FE] font-semibold text-brand-cta"
                  : "border-[#E4E1F0] bg-white text-ink hover:border-[#C9BEEA]"
              }`}
            >
              {o.titulo}
            </button>
          )
        })}
      </div>

      {elegida && (
        <div
          aria-live="polite"
          className="grid gap-5 rounded-[18px] border border-[#E4E1F0] bg-white p-6 md:grid-cols-2 md:p-7"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[.12em] text-[#6A667E]">
              Lo pone Hostinger
            </span>
            <p className="mt-2 text-[16px] font-semibold text-ink">{elegida.producto.nombre}</p>
            <p className="mt-1 text-[14px] leading-[1.5] text-[#5A5570]">
              {elegida.producto.aporta}
            </p>
            {elegida.enlaceProducto && (
              <a
                href={elegida.enlaceProducto}
                target="_blank"
                rel="sponsored noopener noreferrer"
                onClick={() =>
                  gtmEvent("hostinger_referral_click", {
                    necesidad: elegida.id,
                    producto: elegida.producto.id,
                    ubicacion: "selector",
                  })
                }
                className="mt-3 inline-flex items-center gap-1.5 rounded-[10px] border border-[#8B84A8] px-3.5 py-2 text-[13.5px] font-semibold text-ink transition-colors hover:border-brand-cta hover:text-brand-cta"
              >
                Ver precio actual en Hostinger
              </a>
            )}
          </div>

          <div className="md:border-l md:border-[#EDEAF6] md:pl-6">
            <span className="font-mono text-[11px] uppercase tracking-[.12em] text-brand-cta">
              Lo hacemos nosotros
            </span>
            <ul className="mt-2 flex flex-col gap-1.5">
              {elegida.implementamos.map((t) => (
                <li key={t} className="text-[14px] leading-[1.45] text-ink">
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              onClick={() =>
                gtmEvent("implementation_cta_click", {
                  necesidad: elegida.id,
                  ubicacion: "selector",
                })
              }
              className="mt-4 inline-flex items-center gap-1.5 rounded-[10px] bg-gradient-to-r from-brand-cta to-brand-blue px-4 py-2.5 text-[14px] font-semibold text-white transition-transform hover:-translate-y-px"
            >
              Quiero que lo implementen
            </a>
          </div>

          <p className="text-[13px] leading-[1.5] text-[#6A667E] md:col-span-2">
            Esta recomendación es orientativa. Antes de que contrates revisamos contigo el alcance,
            el tráfico y lo que necesites integrar.
          </p>
        </div>
      )}
    </div>
  )
}
