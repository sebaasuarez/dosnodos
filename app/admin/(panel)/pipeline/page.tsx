import Link from "next/link"
import { requireUser } from "@/lib/supabase/auth"
import { PageHeader } from "@/components/admin/ui"
import { MoveLeadStage } from "@/components/admin/move-lead-stage"
import {
  LEAD_SOURCE_LABEL,
  LEAD_STATUSES,
  LEAD_STATUS_LABEL,
  type Lead,
  type LeadStatus,
} from "@/lib/types"

export const dynamic = "force-dynamic"

/**
 * Tablero por etapa, portado del CRM de Dos Nodos.
 *
 * Allá el pipeline corre sobre Prisma con diecisiete estados; acá se apoya en
 * los seis de la tabla `leads` de Supabase. Es de lo poco del CRM que se puede
 * traer tal cual porque es interfaz sobre el estado del lead y no depende de
 * Kapso, Apify ni del modelo de consentimiento.
 */
export default async function PipelinePage() {
  const { supabase } = await requireUser()
  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })

  const leads = (data ?? []) as Lead[]

  const porEtapa = new Map<LeadStatus, Lead[]>(LEAD_STATUSES.map((s) => [s, []]))
  for (const lead of leads) {
    porEtapa.get(lead.status as LeadStatus)?.push(lead)
  }

  const ganados = porEtapa.get("ganado")?.length ?? 0
  const cerrados = ganados + (porEtapa.get("perdido")?.length ?? 0)
  const conversion = cerrados > 0 ? Math.round((ganados / cerrados) * 100) : null

  return (
    <>
      <PageHeader
        title="Pipeline"
        subtitle={`${leads.length} leads en total${
          conversion !== null ? ` · ${conversion}% de cierre sobre los ${cerrados} resueltos` : ""
        }`}
      />

      <div className="overflow-x-auto pb-3">
        <div className="flex min-h-[420px] gap-3">
          {LEAD_STATUSES.map((etapa) => {
            const items = porEtapa.get(etapa) ?? []
            return (
              <section key={etapa} className="w-[248px] shrink-0" aria-label={LEAD_STATUS_LABEL[etapa]}>
                <header className="mb-2 flex items-center justify-between rounded-lg bg-[#EDEAF6] px-3 py-2">
                  <h2 className="text-[12px] font-semibold uppercase tracking-[.06em] text-[#3A3550]">
                    {LEAD_STATUS_LABEL[etapa]}
                  </h2>
                  <span className="font-mono text-[12px] text-[#6A667E]">{items.length}</span>
                </header>

                <div className="flex flex-col gap-2">
                  {items.length === 0 && (
                    <p className="rounded-xl border border-dashed border-[#E4E1F0] px-3 py-6 text-center text-[12.5px] text-[#8B84A8]">
                      Vacío
                    </p>
                  )}
                  {items.map((lead) => (
                    <article
                      key={lead.id}
                      className="rounded-xl border border-[#E4E1F0] bg-white p-3 transition-shadow hover:shadow-[0_10px_24px_-18px_rgba(20,12,40,.35)]"
                    >
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="text-[14px] font-semibold text-brand-cta hover:underline"
                      >
                        {lead.name}
                      </Link>
                      {lead.company && (
                        <p className="mt-0.5 text-[12.5px] text-[#5A5570]">{lead.company}</p>
                      )}
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span
                          className={
                            lead.source === "ventas"
                              ? "rounded-full bg-[#E9E6FB] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[.06em] text-brand-cta"
                              : "rounded-full bg-[#F1EFFA] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[.06em] text-[#5A5570]"
                          }
                        >
                          {lead.source === "ventas" ? "ventas" : "principal"}
                        </span>
                        <MoveLeadStage id={lead.id} status={lead.status as LeadStatus} />
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>

      <p className="mt-4 text-[12.5px] text-[#6A667E]">
        Los orígenes son {LEAD_SOURCE_LABEL.landing} y {LEAD_SOURCE_LABEL.ventas}.
      </p>
    </>
  )
}
