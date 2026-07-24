import { notFound } from "next/navigation"
import { requireUser } from "@/lib/supabase/auth"
import { PageHeader } from "@/components/admin/ui"
import { ProjectForm } from "@/components/admin/project-form"
import type { Project } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { supabase } = await requireUser()
  const { id } = await params
  const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle()
  if (!data) notFound()

  return (
    <>
      <PageHeader title="Editar proyecto" subtitle="Cambios visibles en el sitio al guardar." />
      <ProjectForm project={data as Project} />
    </>
  )
}
