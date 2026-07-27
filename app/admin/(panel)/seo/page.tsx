import { requireUser } from "@/lib/supabase/auth"
import { PageHeader, Card, Field, TextareaField, SubmitButton } from "@/components/admin/ui"
import { updateSeo } from "@/app/admin/actions"
import type { PageSeo } from "@/lib/types"

export const dynamic = "force-dynamic"

const PAGES = [
  { path: "/", label: "Español", hint: "dosnodos.com.co" },
  { path: "/en", label: "Inglés", hint: "dosnodos.com.co/en" },
  { path: "/pt", label: "Portugués", hint: "dosnodos.com.co/pt" },
] as const

export default async function SeoAdmin() {
  const { supabase } = await requireUser()
  const { data } = await supabase.from("page_seo").select("*").in("path", ["/", "/en", "/pt"])
  const rows = (data as PageSeo[]) ?? []
  const byPath = new Map(rows.map((r) => [r.path, r]))

  return (
    <>
      <PageHeader
        title="SEO por idioma"
        subtitle="Metadatos de las tres páginas de inicio. Cada idioma tiene su propia URL indexable."
      />

      <div className="mb-5 max-w-3xl rounded-[14px] border border-[#E4E1F0] bg-[#F6F5FC] p-4 text-[13px] leading-[1.55] text-[#5A5570]">
        <b className="text-ink">Sobre la imagen de Open Graph.</b> Si dejas el campo vacío, el sitio
        genera automáticamente una tarjeta de 1200×630 con el título de la página y los colores de
        la marca. Solo llénalo si quieres subir una imagen propia; en ese caso usa esa misma medida,
        porque WhatsApp, LinkedIn y X recortan cualquier otra proporción. Las páginas de servicio
        también generan la suya y no requieren configuración.
      </div>

      <div className="flex flex-col gap-5">
        {PAGES.map(({ path, label, hint }) => {
          const seo = byPath.get(path) ?? null
          return (
            <Card key={path} className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-baseline gap-2.5">
                <h2 className="font-semibold">{label}</h2>
                <span className="font-mono text-[12px] text-[#6A667E]">{hint}</span>
              </div>
              <form action={updateSeo} className="flex flex-col gap-4">
                <input type="hidden" name="path" value={path} />
                <Field
                  label="Title"
                  name="title"
                  defaultValue={seo?.title}
                  hint="Ideal ≤ 60 caracteres. Es el titular azul del resultado de Google."
                />
                <TextareaField
                  label="Meta description"
                  name="description"
                  defaultValue={seo?.description}
                  rows={3}
                  hint="Ideal 150–160 caracteres."
                />
                <Field
                  label="Keywords"
                  name="keywords"
                  defaultValue={seo?.keywords}
                  placeholder="separadas por comas"
                />
                <Field
                  label="Imagen Open Graph (URL) — opcional"
                  name="og_image"
                  defaultValue={seo?.og_image}
                  placeholder="Vacío = se genera automáticamente"
                  hint="1200×630. Déjalo vacío para usar la tarjeta generada."
                />
                <div>
                  <SubmitButton>Guardar {label.toLowerCase()}</SubmitButton>
                </div>
              </form>
            </Card>
          )
        })}
      </div>
    </>
  )
}
