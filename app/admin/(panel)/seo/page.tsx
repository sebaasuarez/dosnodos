import { requireUser } from "@/lib/supabase/auth"
import { PageHeader, Card, Field, TextareaField, SubmitButton } from "@/components/admin/ui"
import { updateSeo } from "@/app/admin/actions"
import type { PageSeo } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function SeoAdmin() {
  const { supabase } = await requireUser()
  const { data } = await supabase.from("page_seo").select("*").eq("path", "/").maybeSingle()
  const seo = (data as PageSeo) ?? null

  return (
    <>
      <PageHeader title="SEO — Home" subtitle="Metadatos de la página principal (title, description, Open Graph)." />
      <Card className="max-w-2xl">
        <form action={updateSeo} className="flex flex-col gap-4">
          <input type="hidden" name="path" value="/" />
          <Field label="Title" name="title" defaultValue={seo?.title} hint="Ideal ≤ 60 caracteres" />
          <TextareaField label="Meta description" name="description" defaultValue={seo?.description} rows={3} hint="Ideal 150–160 caracteres" />
          <Field label="Keywords" name="keywords" defaultValue={seo?.keywords} placeholder="separadas por comas" />
          <Field label="OG image (URL)" name="og_image" defaultValue={seo?.og_image} placeholder="https://dosnodos.com.co/og.png" hint="1200×630 recomendado" />
          <div>
            <SubmitButton>Guardar SEO</SubmitButton>
          </div>
        </form>
      </Card>
    </>
  )
}
