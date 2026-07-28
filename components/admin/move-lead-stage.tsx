"use client"

import { useTransition } from "react"
import { moveLeadStage } from "@/app/admin/actions"
import { LEAD_STATUSES, LEAD_STATUS_LABEL, type LeadStatus } from "@/lib/types"

/**
 * Cambia la etapa desde la propia tarjeta del pipeline, sin abrir el lead.
 *
 * Es un `select` y no arrastrar y soltar a propósito: arrastrar necesita una
 * alternativa por teclado para ser accesible, y un desplegable ya la trae de
 * fábrica y funciona igual de bien en móvil.
 */
export function MoveLeadStage({ id, status }: { id: string; status: LeadStatus }) {
  const [pendiente, startTransition] = useTransition()

  return (
    <label className="flex items-center">
      <span className="sr-only">Cambiar etapa</span>
      <select
        defaultValue={status}
        disabled={pendiente}
        onChange={(e) => {
          const fd = new FormData()
          fd.set("id", id)
          fd.set("status", e.target.value)
          startTransition(() => {
            void moveLeadStage(fd)
          })
        }}
        className="rounded-md border border-[#E4E1F0] bg-white px-1.5 py-1 text-[11px] text-[#5A5570] outline-none transition-colors focus:border-brand-purple focus:shadow-[0_0_0_2px_rgba(147,51,234,.18)] disabled:opacity-50"
      >
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>
            {LEAD_STATUS_LABEL[s]}
          </option>
        ))}
      </select>
    </label>
  )
}
