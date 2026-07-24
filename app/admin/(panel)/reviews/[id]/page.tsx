import { notFound } from "next/navigation"
import { requireUser } from "@/lib/supabase/auth"
import { PageHeader } from "@/components/admin/ui"
import { ReviewForm } from "@/components/admin/review-form"
import type { Review } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function EditReview({ params }: { params: Promise<{ id: string }> }) {
  const { supabase } = await requireUser()
  const { id } = await params
  const { data } = await supabase.from("reviews").select("*").eq("id", id).maybeSingle()
  if (!data) notFound()

  return (
    <>
      <PageHeader title="Editar reseña" subtitle="Cambios visibles en el sitio al guardar." />
      <ReviewForm review={data as Review} />
    </>
  )
}
