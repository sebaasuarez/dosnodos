import { requireUser } from "@/lib/supabase/auth"
import { PageHeader, Card, Field, TextareaField, SubmitButton } from "@/components/admin/ui"
import { updateSettings } from "@/app/admin/actions"
import type { SiteSettings } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function TrackingAdmin() {
  const { supabase } = await requireUser()
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle()
  const s = (data as SiteSettings) ?? null

  return (
    <>
      <PageHeader
        title="Tracking & Configuración"
        subtitle="IDs de medición y datos de contacto. Se inyectan automáticamente en el sitio."
      />

      <form action={updateSettings} className="flex max-w-2xl flex-col gap-4">
        <Card>
          <h2 className="mb-4 font-semibold">Medición</h2>
          <div className="grid gap-4">
            <Field label="Google Tag Manager ID" name="gtm_id" defaultValue={s?.gtm_id} placeholder="GTM-XXXXXXX" />
            <Field label="Google Analytics 4 (Measurement ID)" name="ga4_id" defaultValue={s?.ga4_id} placeholder="G-XXXXXXXXXX" />
            <Field label="Google Ads (Conversion ID)" name="google_ads_id" defaultValue={s?.google_ads_id} placeholder="AW-XXXXXXXXX" />
            <Field label="Meta / Facebook Pixel ID" name="meta_pixel_id" defaultValue={s?.meta_pixel_id} placeholder="1234567890" />
            <Field label="TikTok Pixel ID" name="tiktok_pixel_id" defaultValue={s?.tiktok_pixel_id} placeholder="XXXXXXXXXXXX" />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 font-semibold">Contacto</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="WhatsApp (solo dígitos, con país)" name="whatsapp_number" defaultValue={s?.whatsapp_number} placeholder="573127344026" />
            <Field label="Correo de contacto" name="contact_email" defaultValue={s?.contact_email} placeholder="hola@dosnodos.com.co" />
          </div>
        </Card>

        <Card>
          <h2 className="mb-2 font-semibold">Scripts adicionales (avanzado)</h2>
          <p className="mb-3 text-[13px] text-[#6A667E]">
            HTML/JS inyectado en el &lt;head&gt;. Úsalo solo para etiquetas confiables (verificaciones, otros píxeles).
          </p>
          <TextareaField label="HTML del head" name="extra_head_html" defaultValue={s?.extra_head_html} rows={4} />
        </Card>

        <div>
          <SubmitButton>Guardar configuración</SubmitButton>
        </div>
      </form>
    </>
  )
}
