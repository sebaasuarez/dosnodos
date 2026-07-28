import { requireUser } from "@/lib/supabase/auth"
import { PageHeader, Card } from "@/components/admin/ui"
import {
  LEAD_SOURCES,
  LEAD_SOURCE_LABEL,
  LEAD_STATUSES,
  LEAD_STATUS_LABEL,
  type Lead,
  type LeadSource,
  type LeadStatus,
} from "@/lib/types"

export const dynamic = "force-dynamic"

/** Barras horizontales simples. Sin librería de gráficos: son cuatro barras. */
function Barras({ filas }: { filas: { label: string; valor: number }[] }) {
  const max = Math.max(1, ...filas.map((f) => f.valor))
  if (filas.every((f) => f.valor === 0)) {
    return <p className="py-4 text-[13px] text-[#6A667E]">Sin datos todavía.</p>
  }
  return (
    <ul className="flex flex-col gap-2.5">
      {filas.map((f) => (
        <li key={f.label} className="flex items-center gap-3">
          <span className="w-[38%] shrink-0 text-[13px] text-[#5A5570]">{f.label}</span>
          <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#F1EFFA]">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-blue"
              style={{ width: `${(f.valor / max) * 100}%` }}
            />
          </span>
          <span className="w-8 shrink-0 text-right font-mono text-[12.5px] text-[#3A3550]">{f.valor}</span>
        </li>
      ))}
    </ul>
  )
}

function Metrica({ label, valor, nota }: { label: string; valor: string; nota?: string }) {
  return (
    <div>
      <span className="block font-mono text-[11px] uppercase tracking-[.1em] text-[#6A667E]">{label}</span>
      <strong className="mt-1 block text-[30px] font-semibold leading-none tracking-[-0.02em]">{valor}</strong>
      {nota && <span className="mt-1 block text-[12.5px] text-[#6A667E]">{nota}</span>}
    </div>
  )
}

/**
 * Reportes portados del CRM de Dos Nodos.
 *
 * Allá los agregados salen de Prisma con `groupBy`; acá se calculan en memoria
 * porque el volumen de leads del sitio lo permite de sobra y evita meter SQL
 * a medida. Si algún día son decenas de miles, esto pasa a una vista de
 * Postgres.
 */
export default async function ReportsPage() {
  const { supabase } = await requireUser()
  const { data } = await supabase.from("leads").select("*")
  const leads = (data ?? []) as Lead[]

  const ahora = Date.now()
  const dia = 24 * 60 * 60 * 1000
  const desde = (dias: number) => leads.filter((l) => ahora - new Date(l.created_at).getTime() <= dias * dia)

  const semana = desde(7)
  const mes = desde(30)

  const contar = <T extends string>(items: Lead[], campo: (l: Lead) => T | null, claves: readonly T[]) => {
    const m = new Map<T, number>(claves.map((k) => [k, 0]))
    for (const l of items) {
      const k = campo(l)
      if (k !== null && m.has(k)) m.set(k, (m.get(k) ?? 0) + 1)
    }
    return m
  }

  const origenDe = (l: Lead): LeadSource => (l.source === "ventas" ? "ventas" : "landing")

  const porOrigenMes = contar(mes, origenDe, LEAD_SOURCES)
  const porEstado = contar(leads, (l) => l.status as LeadStatus, LEAD_STATUSES)

  const ganados = porEstado.get("ganado") ?? 0
  const perdidos = porEstado.get("perdido") ?? 0
  const cerrados = ganados + perdidos
  const conversion = cerrados > 0 ? Math.round((ganados / cerrados) * 100) : null

  // Últimas ocho semanas, de la más antigua a la más reciente.
  const semanas = Array.from({ length: 8 }, (_, i) => {
    const fin = ahora - i * 7 * dia
    const ini = fin - 7 * dia
    const n = leads.filter((l) => {
      const t = new Date(l.created_at).getTime()
      return t > ini && t <= fin
    }).length
    return { label: i === 0 ? "Esta semana" : `Hace ${i}`, valor: n }
  }).reverse()

  return (
    <>
      <PageHeader
        title="Reportes"
        subtitle="Desempeño comercial sobre los leads de las dos landings."
      />

      <div className="mb-5 grid gap-4 md:grid-cols-4">
        <Card>
          <Metrica label="Leads totales" valor={String(leads.length)} />
        </Card>
        <Card>
          <Metrica label="Últimos 7 días" valor={String(semana.length)} />
        </Card>
        <Card>
          <Metrica label="Últimos 30 días" valor={String(mes.length)} />
        </Card>
        <Card>
          <Metrica
            label="Cierre"
            valor={conversion !== null ? `${conversion}%` : "—"}
            nota={cerrados > 0 ? `${ganados} de ${cerrados} resueltos` : "Aún sin leads resueltos"}
          />
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-4 font-semibold">Por origen · últimos 30 días</h2>
          <Barras
            filas={LEAD_SOURCES.map((s) => ({
              label: LEAD_SOURCE_LABEL[s],
              valor: porOrigenMes.get(s) ?? 0,
            }))}
          />
        </Card>

        <Card>
          <h2 className="mb-4 font-semibold">Por etapa · histórico</h2>
          <Barras
            filas={LEAD_STATUSES.map((s) => ({
              label: LEAD_STATUS_LABEL[s],
              valor: porEstado.get(s) ?? 0,
            }))}
          />
        </Card>

        <Card className="lg:col-span-2">
          <h2 className="mb-4 font-semibold">Leads por semana · últimas 8</h2>
          <Barras filas={semanas} />
        </Card>
      </div>
    </>
  )
}
