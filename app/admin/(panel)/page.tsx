import Link from "next/link"
import { requireUser } from "@/lib/supabase/auth"
import { PageHeader, Card, StatusBadge } from "@/components/admin/ui"
import { LEAD_STATUSES, LEAD_STATUS_LABEL, type Lead, type LeadStatus } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const { supabase } = await requireUser()

  const [{ data: leads }, { count: projectsCount }, { count: reviewsCount }] = await Promise.all([
    supabase.from("leads").select("id,name,email,status,created_at,company").order("created_at", { ascending: false }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
  ])

  const all = (leads ?? []) as Pick<Lead, "id" | "name" | "email" | "status" | "created_at" | "company">[]
  const byStatus = LEAD_STATUSES.reduce(
    (acc, s) => ({ ...acc, [s]: all.filter((l) => l.status === s).length }),
    {} as Record<LeadStatus, number>,
  )
  const recent = all.slice(0, 6)

  return (
    <>
      <PageHeader title="Inicio" subtitle="Resumen del CRM y del contenido del sitio." />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card>
          <div className="text-[13px] text-[#6A667E]">Leads totales</div>
          <div className="mt-1 text-3xl font-semibold tabular-nums">{all.length}</div>
        </Card>
        <Card>
          <div className="text-[13px] text-[#6A667E]">Nuevos sin gestionar</div>
          <div className="mt-1 text-3xl font-semibold tabular-nums text-brand-cta">{byStatus.nuevo}</div>
        </Card>
        <Card>
          <div className="text-[13px] text-[#6A667E]">Proyectos</div>
          <div className="mt-1 text-3xl font-semibold tabular-nums">{projectsCount ?? 0}</div>
        </Card>
        <Card>
          <div className="text-[13px] text-[#6A667E]">Reseñas</div>
          <div className="mt-1 text-3xl font-semibold tabular-nums">{reviewsCount ?? 0}</div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Leads recientes</h2>
            <Link href="/admin/leads" className="text-[13px] font-semibold text-brand-cta hover:underline">
              Ver todos →
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="py-8 text-center text-[14px] text-[#6A667E]">Aún no hay leads. Cuando alguien complete el formulario aparecerá aquí.</p>
          ) : (
            <div className="flex flex-col divide-y divide-[#EDEAF6]">
              {recent.map((l) => (
                <Link
                  key={l.id}
                  href={`/admin/leads/${l.id}`}
                  className="flex items-center justify-between gap-3 py-2.5 hover:opacity-80"
                >
                  <div className="min-w-0">
                    <div className="truncate text-[14px] font-medium">{l.name}</div>
                    <div className="truncate text-[12px] text-[#6A667E]">{l.company || l.email}</div>
                  </div>
                  <StatusBadge status={l.status} />
                </Link>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="mb-3 font-semibold">Embudo</h2>
          <div className="flex flex-col gap-2">
            {LEAD_STATUSES.map((s) => (
              <div key={s} className="flex items-center justify-between text-[14px]">
                <span className="text-[#5A5570]">{LEAD_STATUS_LABEL[s]}</span>
                <span className="font-semibold tabular-nums">{byStatus[s]}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
