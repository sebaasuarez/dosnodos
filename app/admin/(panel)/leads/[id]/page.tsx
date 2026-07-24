import Link from "next/link"
import { notFound } from "next/navigation"
import { requireUser } from "@/lib/supabase/auth"
import { PageHeader, Card, SelectField, TextareaField, SubmitButton, StatusBadge } from "@/components/admin/ui"
import { updateLead, deleteLead } from "@/app/admin/actions"
import { LEAD_STATUSES, LEAD_STATUS_LABEL, type Lead } from "@/lib/types"

export const dynamic = "force-dynamic"

function fmt(iso: string) {
  return new Date(iso).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" })
}

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  const { supabase } = await requireUser()
  const { id } = await params

  const { data } = await supabase.from("leads").select("*").eq("id", id).maybeSingle()
  if (!data) notFound()
  const lead = data as Lead

  const waNumber = (lead.phone || "").replace(/[^\d]/g, "")

  return (
    <>
      <PageHeader
        title={lead.name}
        subtitle={`Lead recibido el ${fmt(lead.created_at)}`}
        action={
          <Link href="/admin/leads" className="text-[13px] font-semibold text-brand-cta hover:underline">
            ← Volver
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Datos</h2>
            <StatusBadge status={lead.status} />
          </div>
          <dl className="flex flex-col gap-3 text-[14px]">
            <div>
              <dt className="text-[12px] uppercase tracking-wide text-[#6A667E]">Correo</dt>
              <dd>
                <a className="text-brand-cta hover:underline" href={`mailto:${lead.email}`}>
                  {lead.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[12px] uppercase tracking-wide text-[#6A667E]">Empresa</dt>
              <dd>{lead.company || "—"}</dd>
            </div>
            <div>
              <dt className="text-[12px] uppercase tracking-wide text-[#6A667E]">Teléfono</dt>
              <dd>
                {lead.phone ? (
                  <a className="text-brand-cta hover:underline" href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer">
                    {lead.phone}
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-[12px] uppercase tracking-wide text-[#6A667E]">Idioma / Origen</dt>
              <dd className="font-mono text-[13px]">{lead.language} · {lead.source}</dd>
            </div>
            <div>
              <dt className="text-[12px] uppercase tracking-wide text-[#6A667E]">Mensaje</dt>
              <dd className="whitespace-pre-wrap rounded-lg bg-[#F6F5FC] p-3">{lead.message || "—"}</dd>
            </div>
          </dl>
        </Card>

        <Card>
          <h2 className="mb-3 font-semibold">Gestión</h2>
          <form action={updateLead} className="flex flex-col gap-4">
            <input type="hidden" name="id" value={lead.id} />
            <SelectField
              label="Estado"
              name="status"
              defaultValue={lead.status}
              options={LEAD_STATUSES.map((s) => ({ value: s, label: LEAD_STATUS_LABEL[s] }))}
            />
            <TextareaField label="Notas internas" name="notes" defaultValue={lead.notes} rows={5} placeholder="Seguimiento, próximos pasos…" />
            <div className="flex items-center gap-3">
              <SubmitButton>Guardar cambios</SubmitButton>
            </div>
          </form>

          <form action={deleteLead} className="mt-5 border-t border-[#EDEAF6] pt-4">
            <input type="hidden" name="id" value={lead.id} />
            <button
              type="submit"
              className="text-[13px] text-[#C24A3A] hover:underline"
            >
              Eliminar lead
            </button>
          </form>
        </Card>
      </div>
    </>
  )
}
