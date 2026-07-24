import { requireUser } from "@/lib/supabase/auth"
import { PageHeader } from "@/components/admin/ui"
import { ReviewForm } from "@/components/admin/review-form"

export const dynamic = "force-dynamic"

export default async function NewReview() {
  await requireUser()
  return (
    <>
      <PageHeader title="Nueva reseña" subtitle="Se mostrará en la sección Reseñas del sitio." />
      <ReviewForm />
    </>
  )
}
