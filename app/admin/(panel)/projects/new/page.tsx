import { requireUser } from "@/lib/supabase/auth"
import { PageHeader } from "@/components/admin/ui"
import { ProjectForm } from "@/components/admin/project-form"

export const dynamic = "force-dynamic"

export default async function NewProject() {
  await requireUser()
  return (
    <>
      <PageHeader title="Nuevo proyecto" subtitle="Se mostrará en la sección Proyectos del sitio." />
      <ProjectForm />
    </>
  )
}
