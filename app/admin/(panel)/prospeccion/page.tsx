import Link from "next/link"
import { requireUser } from "@/lib/supabase/auth"
import { PageHeader, Card } from "@/components/admin/ui"
import { RunProspecting } from "@/components/admin/run-prospecting"
import { prioridad } from "@/lib/prospecting/score"
import { SIMULADO } from "@/lib/prospecting/apify"
import { CONSENT_LABEL, type ConsentStatus, type Lead, type ProspectRun } from "@/lib/types"

export const dynamic = "force-dynamic"

function fecha(iso: string) {
  return new Date(iso).toLocaleString("es-CO", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const TONO: Record<"alta" | "media" | "baja", string> = {
  alta: "bg-[#E9E6FB] text-brand-cta",
  media: "bg-[#F1EFFA] text-[#5A5570]",
  baja: "bg-[#F6F5FC] text-[#6A667E]",
}

export default async function ProspeccionPage() {
  const { supabase } = await requireUser()

  const [{ data: prospectosRaw }, { data: corridasRaw }] = await Promise.all([
    supabase
      .from("leads")
      .select("*")
      .eq("source", "prospeccion")
      .order("score", { ascending: false })
      .limit(60),
    supabase.from("prospect_runs").select("*").order("created_at", { ascending: false }).limit(8),
  ])

  const prospectos = (prospectosRaw ?? []) as Lead[]
  const corridas = (corridasRaw ?? []) as ProspectRun[]

  const altos = prospectos.filter((p) => p.score >= 70).length
  const contactables = prospectos.filter((p) => p.has_whatsapp).length
  // La audiencia de Meta cruza por teléfono. Un prospecto sin número es válido
  // —de hecho suele ser el más desatendido— pero no entra en el CSV, y eso
  // tiene que verse antes de exportar y no después. La misma regla que aplica
  // la ruta de exportación, para que el número no engañe.
  const esSimulado = (p: Lead) => Boolean(p.google_place_id?.startsWith(SIMULADO))
  const exportables = prospectos.filter((p) => p.phone && !esSimulado(p)).length

  return (
    <>
      <PageHeader
        title="Prospección"
        subtitle="Negocios encontrados automáticamente, con su diagnóstico y prioridad."
      />

      {/* Habeas Data: la advertencia va donde se ven los datos, no escondida en
          la documentación. */}
      <div className="mb-5 rounded-[14px] border border-[#E4D4F7] bg-[#F9F5FE] p-4 text-[13px] leading-[1.55] text-[#3A3550]">
        <b>Estos prospectos vienen de fuentes públicas y no han autorizado nada.</b> No se les puede
        escribir por WhatsApp: eso viola la política de Meta y la Ley 1581, y el riesgo real es que
        bloqueen el número de Dos Nodos, que es el mismo de las dos webs.
        <br />
        El camino es al revés: usa esta lista para segmentar anuncios <i>Click-to-WhatsApp</i> o
        correo, y cuando el negocio escriba primero, ahí sí la conversación queda habilitada y el
        asistente puede vender sin límites.
      </div>

      <div className="mb-5 grid gap-4 md:grid-cols-4">
        <Card>
          <span className="block font-mono text-[11px] uppercase tracking-[.1em] text-[#6A667E]">
            Prospectos
          </span>
          <strong className="mt-1 block text-[30px] font-semibold leading-none">
            {prospectos.length}
          </strong>
        </Card>
        <Card>
          <span className="block font-mono text-[11px] uppercase tracking-[.1em] text-[#6A667E]">
            Prioridad alta
          </span>
          <strong className="mt-1 block text-[30px] font-semibold leading-none text-brand-cta">
            {altos}
          </strong>
        </Card>
        <Card>
          <span className="block font-mono text-[11px] uppercase tracking-[.1em] text-[#6A667E]">
            Con WhatsApp
          </span>
          <strong className="mt-1 block text-[30px] font-semibold leading-none">
            {contactables}
          </strong>
        </Card>
        <Card>
          <span className="block font-mono text-[11px] uppercase tracking-[.1em] text-[#6A667E]">
            Audiencia
          </span>
          <a
            href="/api/admin/prospect-export"
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand-cta to-brand-blue px-3 py-2 text-[13px] font-semibold text-white"
          >
            Exportar CSV
          </a>
          <span className="mt-1.5 block text-[11.5px] text-[#6A667E]">
            {exportables} con teléfono · formato Meta Ads
          </span>
        </Card>
      </div>

      <Card className="mb-5">
        <h2 className="mb-1 font-semibold">Buscar ahora</h2>
        <p className="mb-4 text-[13px] text-[#5A5570]">
          El cron corre solo de lunes a sábado a las 9:00 y rota entre categorías. Acá puedes lanzar
          una búsqueda puntual.
        </p>
        <RunProspecting />
      </Card>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <Card className="p-0">
          <h2 className="border-b border-[#EDEAF6] px-5 py-4 font-semibold">
            Priorizados ({prospectos.length})
          </h2>
          {prospectos.length === 0 ? (
            <p className="py-12 text-center text-[14px] text-[#6A667E]">
              Aún no hay prospectos. Lanza una búsqueda arriba.
            </p>
          ) : (
            <ul className="divide-y divide-[#F1EFFA]">
              {prospectos.map((p) => {
                const pr = prioridad(p.score)
                return (
                  <li key={p.id} className="px-5 py-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/admin/leads/${p.id}`}
                          className="text-[15px] font-semibold text-brand-cta hover:underline"
                        >
                          {p.name}
                        </Link>
                        <p className="mt-0.5 text-[12.5px] text-[#6A667E]">
                          {[p.category, p.city].filter(Boolean).join(" · ")}
                          {p.reviews_count != null && ` · ${p.reviews_count} reseñas`}
                          {p.rating != null && ` · ${p.rating}★`}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-[.06em] ${TONO[pr.tono]}`}
                        >
                          {pr.label} · {p.score}
                        </span>
                      </div>
                    </div>

                    {p.diagnosis && (
                      <p className="mt-2 max-w-[70ch] text-[13.5px] leading-[1.5] text-[#5A5570]">
                        {p.diagnosis}
                      </p>
                    )}

                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      {p.recommended_service && (
                        <span className="rounded-full border border-[#E4D4F7] bg-white px-2.5 py-1 text-[11.5px] text-brand-cta">
                          {p.recommended_service}
                        </span>
                      )}
                      {!p.has_website && (
                        <span className="rounded-full bg-[#F1EFFA] px-2.5 py-1 text-[11.5px] text-[#5A5570]">
                          Sin web
                        </span>
                      )}
                      {p.has_whatsapp && (
                        <span className="rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[11.5px] text-[#0B6154]">
                          WhatsApp
                        </span>
                      )}
                      <span className="rounded-full bg-[#F6F5FC] px-2.5 py-1 font-mono text-[11px] text-[#6A667E]">
                        {CONSENT_LABEL[p.consent as ConsentStatus] ?? p.consent}
                      </span>
                      {esSimulado(p) && (
                        <span className="rounded-full bg-[#FEF3C7] px-2.5 py-1 font-mono text-[11px] text-[#92400E]">
                          Simulado
                        </span>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </Card>

        <Card className="h-fit">
          <h2 className="mb-3 font-semibold">Últimas corridas</h2>
          {corridas.length === 0 ? (
            <p className="text-[13px] text-[#6A667E]">Sin corridas todavía.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {corridas.map((c) => (
                <li key={c.id} className="border-b border-[#F1EFFA] pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13px] font-medium">{c.query || "—"}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase ${
                        c.status === "ok"
                          ? "bg-[#DCFCE7] text-[#0B6154]"
                          : c.status === "error"
                            ? "bg-[#FEE2E2] text-[#B91C1C]"
                            : "bg-[#F1EFFA] text-[#5A5570]"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[11.5px] text-[#6A667E]">
                    {fecha(c.created_at)} · {c.trigger} · {c.mode}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#5A5570]">
                    {c.found} encontrados · {c.inserted} nuevos · {c.duplicated} repetidos
                    {c.discarded > 0 && ` · ${c.discarded} rechazados`}
                  </p>
                  {c.error && (
                    <p className="mt-1 text-[11.5px] text-[#B91C1C]">{c.error.slice(0, 120)}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  )
}
