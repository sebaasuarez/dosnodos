import Link from "next/link"
import { requireUser } from "@/lib/supabase/auth"
import { PageHeader, Card, StatusBadge } from "@/components/admin/ui"
import {
  LEAD_SOURCES,
  LEAD_SOURCE_LABEL,
  LEAD_STATUSES,
  LEAD_STATUS_LABEL,
  type Lead,
  type LeadStatus,
} from "@/lib/types"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; source?: string }>
}) {
  const { supabase } = await requireUser()
  const { status, source } = await searchParams

  let query = supabase.from("leads").select("*").order("created_at", { ascending: false })
  if (status && (LEAD_STATUSES as string[]).includes(status)) {
    query = query.eq("status", status)
  }
  if (source && (LEAD_SOURCES as string[]).includes(source)) {
    query = query.eq("source", source)
  }
  const { data } = await query
  const leads = (data ?? []) as Lead[]

  // Conteo por origen sobre el total, no sobre lo filtrado: sirve para saber
  // qué landing trae más clientes sin tener que quitar el filtro de estado.
  const { data: todos } = await supabase.from("leads").select("source")
  const porOrigen = new Map<string, number>()
  for (const row of (todos ?? []) as { source: string | null }[]) {
    const key = row.source === "ventas" ? "ventas" : "landing"
    porOrigen.set(key, (porOrigen.get(key) ?? 0) + 1)
  }

  /** Conserva el otro filtro al cambiar uno. */
  const hrefCon = (params: { status?: string; source?: string }) => {
    const sp = new URLSearchParams()
    const st = params.status !== undefined ? params.status : status
    const so = params.source !== undefined ? params.source : source
    if (st) sp.set("status", st)
    if (so) sp.set("source", so)
    const q = sp.toString()
    return q ? `/admin/leads?${q}` : "/admin/leads"
  }

  return (
    <>
      <PageHeader title="Leads · CRM" subtitle="Base de clientes potenciales del formulario de contacto." />

      <div className="mb-4 flex flex-wrap gap-2">
        <Link
          href={hrefCon({ status: "" })}
          className={cn(
            "rounded-full px-3 py-1.5 text-[13px] transition-colors",
            !status ? "bg-ink text-white" : "border border-[#E4E1F0] text-[#5A5570] hover:bg-white",
          )}
        >
          Todos
        </Link>
        {LEAD_STATUSES.map((s) => (
          <Link
            key={s}
            href={hrefCon({ status: s })}
            className={cn(
              "rounded-full px-3 py-1.5 text-[13px] transition-colors",
              status === s ? "bg-ink text-white" : "border border-[#E4E1F0] text-[#5A5570] hover:bg-white",
            )}
          >
            {LEAD_STATUS_LABEL[s]}
          </Link>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-[11px] uppercase tracking-[.1em] text-[#6A667E]">
          Origen
        </span>
        <Link
          href={hrefCon({ source: "" })}
          className={cn(
            "rounded-full px-3 py-1.5 text-[13px] transition-colors",
            !source ? "bg-ink text-white" : "border border-[#E4E1F0] text-[#5A5570] hover:bg-white",
          )}
        >
          Todos
        </Link>
        {LEAD_SOURCES.map((so) => (
          <Link
            key={so}
            href={hrefCon({ source: so })}
            className={cn(
              "rounded-full px-3 py-1.5 text-[13px] transition-colors",
              source === so ? "bg-ink text-white" : "border border-[#E4E1F0] text-[#5A5570] hover:bg-white",
            )}
          >
            {LEAD_SOURCE_LABEL[so]}
            <span className="ml-1.5 font-mono text-[11px] opacity-70">{porOrigen.get(so) ?? 0}</span>
          </Link>
        ))}
      </div>

      <Card className="p-0">
        {leads.length === 0 ? (
          <p className="py-12 text-center text-[14px] text-[#6A667E]">No hay leads con este filtro.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-[#EDEAF6] text-[12px] uppercase tracking-wide text-[#6A667E]">
                  <th className="px-4 py-3 font-medium">Nombre</th>
                  <th className="px-4 py-3 font-medium">Empresa</th>
                  <th className="px-4 py-3 font-medium">Contacto</th>
                  <th className="px-4 py-3 font-medium">Origen</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-b border-[#F1EFFA] last:border-0 hover:bg-[#FAF9FE]">
                    <td className="px-4 py-3">
                      <Link href={`/admin/leads/${l.id}`} className="font-medium text-brand-cta hover:underline">
                        {l.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-[#5A5570]">{l.company || "—"}</td>
                    {/* Los leads de la landing de ventas llegan por WhatsApp y
                        no traen correo: se muestra el número. */}
                    <td className="px-4 py-3 text-[#5A5570]">{l.email || l.phone || "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          l.source === "ventas"
                            ? "rounded-full bg-[#E9E6FB] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[.06em] text-brand-cta"
                            : "rounded-full bg-[#F1EFFA] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[.06em] text-[#5A5570]"
                        }
                      >
                        {l.source === "ventas" ? "ventas" : "principal"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={l.status as LeadStatus} />
                    </td>
                    <td className="px-4 py-3 font-mono text-[12px] text-[#6A667E]">{fmtDate(l.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  )
}
