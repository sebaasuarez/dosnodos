import Link from "next/link"
import { requireUser } from "@/lib/supabase/auth"
import { PageHeader, Card, StatusBadge } from "@/components/admin/ui"
import { LEAD_STATUSES, LEAD_STATUS_LABEL, type Lead, type LeadStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { supabase } = await requireUser()
  const { status } = await searchParams

  let query = supabase.from("leads").select("*").order("created_at", { ascending: false })
  if (status && (LEAD_STATUSES as string[]).includes(status)) {
    query = query.eq("status", status)
  }
  const { data } = await query
  const leads = (data ?? []) as Lead[]

  return (
    <>
      <PageHeader title="Leads · CRM" subtitle="Base de clientes potenciales del formulario de contacto." />

      <div className="mb-4 flex flex-wrap gap-2">
        <Link
          href="/admin/leads"
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
            href={`/admin/leads?status=${s}`}
            className={cn(
              "rounded-full px-3 py-1.5 text-[13px] transition-colors",
              status === s ? "bg-ink text-white" : "border border-[#E4E1F0] text-[#5A5570] hover:bg-white",
            )}
          >
            {LEAD_STATUS_LABEL[s]}
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
                    <td className="px-4 py-3 text-[#5A5570]">{l.email}</td>
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
