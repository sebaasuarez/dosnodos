"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { lanzarProspeccion } from "@/app/admin/actions"

const CATEGORIAS = [
  "barbería",
  "café",
  "spa",
  "restaurante",
  "hostal",
  "lavandería",
  "odontología",
  "gimnasio",
]

/**
 * El estado de envío se lee con `useFormStatus`, que solo funciona dentro del
 * formulario. Por eso el botón es un componente aparte: envolverlo con
 * useTransition desde el padre dejaba la acción sin ejecutarse.
 */
function Boton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="self-end rounded-[10px] bg-gradient-to-r from-brand-cta to-brand-blue px-5 py-2.5 text-[14px] font-semibold text-white transition-transform hover:-translate-y-px disabled:opacity-60"
    >
      {pending ? "Buscando…" : "Buscar"}
    </button>
  )
}

/** Lanza una búsqueda puntual sin esperar al cron. */
export function RunProspecting() {
  const [resultado, setResultado] = useState<string | null>(null)

  return (
    <form
      action={async (fd) => {
        setResultado(null)
        const r = await lanzarProspeccion(fd)
        setResultado(r.mensaje)
      }}
      className="flex flex-col gap-3"
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold text-ink">Categoría</span>
          <select
            name="consulta"
            defaultValue="barbería"
            className="rounded-[10px] border border-[#E4E1F0] bg-white px-3 py-2.5 text-[14px] outline-none focus:border-brand-purple"
          >
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[13px] font-semibold text-ink">Ciudad</span>
          <input
            name="ciudad"
            defaultValue="Medellín, Colombia"
            className="rounded-[10px] border border-[#E4E1F0] bg-white px-3 py-2.5 text-[14px] outline-none focus:border-brand-purple"
          />
        </label>

        <Boton />
      </div>

      {resultado && (
        <p aria-live="polite" className="text-[13px] text-[#5A5570]">
          {resultado}
        </p>
      )}
    </form>
  )
}
