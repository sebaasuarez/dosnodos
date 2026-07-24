import Link from "next/link"
import { Card, Field, TextareaField, SelectField, CheckboxField, SubmitButton } from "@/components/admin/ui"
import { upsertProject, deleteProject } from "@/app/admin/actions"
import type { Project } from "@/lib/types"

export function ProjectForm({ project }: { project?: Project }) {
  const i18n = project?.i18n ?? {}
  const en = i18n.en ?? {}
  const pt = i18n.pt ?? {}

  return (
    <div className="grid gap-4">
      <Card>
        <form action={upsertProject} className="flex flex-col gap-4">
          {project && <input type="hidden" name="id" value={project.id} />}

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Título" name="title" defaultValue={project?.title} required />
            <Field label="Etiqueta / categoría" name="tag" defaultValue={project?.tag} placeholder="Ej: Shopify + e-Commerce" />
          </div>
          <TextareaField label="Descripción" name="description" defaultValue={project?.description} />
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Etiqueta de resultado" name="result_label" defaultValue={project?.result_label ?? "Resultado"} />
            <Field label="Resultado" name="result" defaultValue={project?.result} placeholder="Ej: +38% conversión" />
            <SelectField
              label="Ilustración"
              name="illustration"
              defaultValue={project?.illustration ?? "quote"}
              options={[
                { value: "quote", label: "Cotización / documento" },
                { value: "store", label: "Tienda / e-Commerce" },
                { value: "schedule", label: "Agenda / check" },
              ]}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Slug (URL, opcional)" name="slug" defaultValue={project?.slug} placeholder="marca-cosmetica" />
            <Field label="Orden" name="sort_order" type="number" defaultValue={project?.sort_order ?? 0} />
          </div>
          <CheckboxField label="Publicado (visible en el sitio)" name="published" defaultChecked={project?.published ?? true} />

          <details className="rounded-xl border border-[#EDEAF6] bg-[#FAF9FE] p-4">
            <summary className="cursor-pointer text-[13px] font-semibold text-ink">Traducciones (EN / PT) — opcional</summary>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[11px] uppercase tracking-wide text-brand-cta">English</span>
                <Field label="Title" name="title_en" defaultValue={en.title} />
                <Field label="Tag" name="tag_en" defaultValue={en.tag} />
                <TextareaField label="Description" name="description_en" defaultValue={en.description} rows={2} />
                <Field label="Result" name="result_en" defaultValue={en.result} />
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[11px] uppercase tracking-wide text-brand-cta">Português</span>
                <Field label="Título" name="title_pt" defaultValue={pt.title} />
                <Field label="Tag" name="tag_pt" defaultValue={pt.tag} />
                <TextareaField label="Descrição" name="description_pt" defaultValue={pt.description} rows={2} />
                <Field label="Resultado" name="result_pt" defaultValue={pt.result} />
              </div>
            </div>
          </details>

          <div className="flex items-center gap-3">
            <SubmitButton>{project ? "Guardar cambios" : "Crear proyecto"}</SubmitButton>
            <Link href="/admin/projects" className="text-[13px] text-[#6A667E] hover:underline">
              Cancelar
            </Link>
          </div>
        </form>
      </Card>

      {project && (
        <form action={deleteProject}>
          <input type="hidden" name="id" value={project.id} />
          <button type="submit" className="text-[13px] text-[#C24A3A] hover:underline">
            Eliminar proyecto
          </button>
        </form>
      )}
    </div>
  )
}
