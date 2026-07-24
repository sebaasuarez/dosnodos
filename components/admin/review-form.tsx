import Link from "next/link"
import { Card, Field, TextareaField, CheckboxField, SubmitButton } from "@/components/admin/ui"
import { upsertReview, deleteReview } from "@/app/admin/actions"
import type { Review } from "@/lib/types"

export function ReviewForm({ review }: { review?: Review }) {
  const i18n = review?.i18n ?? {}
  const en = i18n.en ?? {}
  const pt = i18n.pt ?? {}

  return (
    <div className="grid gap-4">
      <Card>
        <form action={upsertReview} className="flex flex-col gap-4">
          {review && <input type="hidden" name="id" value={review.id} />}

          <TextareaField label="Reseña" name="quote" defaultValue={review?.quote} required rows={3} hint="" />
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Nombre" name="name" defaultValue={review?.name} required />
            <Field label="Cargo · empresa" name="role" defaultValue={review?.role} placeholder="Gerente · Distribuidora" />
            <Field label="Iniciales" name="initials" defaultValue={review?.initials} placeholder="DR" hint="Vacío = se calculan del nombre" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Calificación (1-5)" name="rating" type="number" defaultValue={review?.rating ?? 5} />
            <Field label="Orden" name="sort_order" type="number" defaultValue={review?.sort_order ?? 0} />
            <div className="flex items-end">
              <CheckboxField label="Publicada" name="published" defaultChecked={review?.published ?? true} />
            </div>
          </div>

          <details className="rounded-xl border border-[#EDEAF6] bg-[#FAF9FE] p-4">
            <summary className="cursor-pointer text-[13px] font-semibold text-ink">Traducciones (EN / PT) — opcional</summary>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[11px] uppercase tracking-wide text-brand-cta">English</span>
                <TextareaField label="Quote" name="quote_en" defaultValue={en.quote} rows={2} />
                <Field label="Role" name="role_en" defaultValue={en.role} />
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[11px] uppercase tracking-wide text-brand-cta">Português</span>
                <TextareaField label="Citação" name="quote_pt" defaultValue={pt.quote} rows={2} />
                <Field label="Cargo" name="role_pt" defaultValue={pt.role} />
              </div>
            </div>
          </details>

          <div className="flex items-center gap-3">
            <SubmitButton>{review ? "Guardar cambios" : "Crear reseña"}</SubmitButton>
            <Link href="/admin/reviews" className="text-[13px] text-[#6A667E] hover:underline">
              Cancelar
            </Link>
          </div>
        </form>
      </Card>

      {review && (
        <form action={deleteReview}>
          <input type="hidden" name="id" value={review.id} />
          <button type="submit" className="text-[13px] text-[#C24A3A] hover:underline">
            Eliminar reseña
          </button>
        </form>
      )}
    </div>
  )
}
