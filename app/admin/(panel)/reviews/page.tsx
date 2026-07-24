import Link from "next/link"
import { requireUser } from "@/lib/supabase/auth"
import { PageHeader, Card } from "@/components/admin/ui"
import type { Review } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function ReviewsAdmin() {
  const { supabase } = await requireUser()
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })
  const reviews = (data ?? []) as Review[]

  return (
    <>
      <PageHeader
        title="Reseñas"
        subtitle="Testimonios de clientes mostrados en el sitio."
        action={
          <Link
            href="/admin/reviews/new"
            className="rounded-full bg-gradient-to-r from-brand-cta to-brand-blue px-4 py-2 text-[14px] font-semibold text-white"
          >
            + Nueva reseña
          </Link>
        }
      />

      <Card className="p-0">
        {reviews.length === 0 ? (
          <p className="py-12 text-center text-[14px] text-[#6A667E]">Aún no hay reseñas.</p>
        ) : (
          <div className="flex flex-col divide-y divide-[#EDEAF6]">
            {reviews.map((r) => (
              <Link
                key={r.id}
                href={`/admin/reviews/${r.id}`}
                className="flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-[#FAF9FE]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium">{r.name}</span>
                    <span className="text-star text-[12px]">{"★".repeat(r.rating)}</span>
                    {!r.published && (
                      <span className="rounded-full bg-[#F1E9FB] px-2 py-0.5 font-mono text-[10px] text-[#7C22CE]">Oculta</span>
                    )}
                  </div>
                  <div className="truncate text-[12px] text-[#6A667E]">“{r.quote}”</div>
                </div>
                <span className="font-mono text-[12px] text-[#6A667E]">#{r.sort_order}</span>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </>
  )
}
