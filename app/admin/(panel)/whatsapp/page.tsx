import { requireUser } from "@/lib/supabase/auth"
import {
  PageHeader,
  Card,
  Field,
  TextareaField,
  SelectField,
  CheckboxField,
  SubmitButton,
} from "@/components/admin/ui"
import { updateWhatsApp } from "@/app/admin/actions"
import { WhatsAppPreview } from "@/components/admin/whatsapp-preview"
import {
  WHATSAPP_ICONS,
  WHATSAPP_ICON_LABEL,
  WHATSAPP_POSITIONS,
  WHATSAPP_POSITION_LABEL,
  type SiteSettings,
} from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function WhatsAppAdmin() {
  const { supabase } = await requireUser()
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle()
  const s = (data as SiteSettings) ?? null

  const msg = s?.whatsapp_message ?? {}
  const label = s?.whatsapp_label ?? {}

  return (
    <>
      <PageHeader
        title="Botón de WhatsApp"
        subtitle="El botón flotante que aparece en todas las páginas del sitio público."
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <form action={updateWhatsApp} className="flex flex-col gap-4">
          <Card>
            <h2 className="mb-4 font-semibold">Activación</h2>
            <div className="grid gap-4">
              <CheckboxField
                label="Mostrar el botón en el sitio"
                name="whatsapp_enabled"
                defaultChecked={s?.whatsapp_enabled ?? true}
              />
              <Field
                label="Retardo antes de aparecer (milisegundos)"
                name="whatsapp_delay_ms"
                type="number"
                defaultValue={String(s?.whatsapp_delay_ms ?? 0)}
                placeholder="0"
                hint="0 = aparece de inmediato. 3000 = a los 3 segundos. Máximo 60000."
              />
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 font-semibold">Destino</h2>
            <div className="grid gap-4">
              <Field
                label="Número de WhatsApp (solo dígitos, con país)"
                name="whatsapp_number"
                defaultValue={s?.whatsapp_number}
                placeholder="573127344026"
                hint="Sin +, sin espacios ni guiones. Colombia es 57."
              />
              <Field
                label="Enlace alterno (opcional)"
                name="whatsapp_link"
                defaultValue={s?.whatsapp_link}
                placeholder="https://calendly.com/dosnodos"
                hint="Si lo llenas, el botón apunta acá y se ignoran el número y el mensaje. Sirve para Telegram, Calendly o un enlace con seguimiento propio."
              />
            </div>
          </Card>

          <Card>
            <h2 className="mb-1 font-semibold">Mensaje precargado</h2>
            <p className="mb-4 text-[13px] text-[#5A5570]">
              Es el texto que aparece ya escrito en el chat cuando la persona abre WhatsApp. Cada
              idioma usa el suyo según la página desde la que se hace clic.
            </p>
            <div className="grid gap-4">
              <TextareaField
                label="Español"
                name="whatsapp_message_es"
                defaultValue={msg.es}
                rows={2}
                placeholder="Hola Dos Nodos, quiero agendar una reunión de diagnóstico."
              />
              <TextareaField
                label="Inglés"
                name="whatsapp_message_en"
                defaultValue={msg.en}
                rows={2}
                placeholder="Hi Dos Nodos, I'd like to book a discovery call."
              />
              <TextareaField
                label="Portugués"
                name="whatsapp_message_pt"
                defaultValue={msg.pt}
                rows={2}
                placeholder="Olá Dos Nodos, quero agendar uma reunião de diagnóstico."
              />
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 font-semibold">Apariencia</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                label="Posición"
                name="whatsapp_position"
                defaultValue={s?.whatsapp_position ?? "right"}
                options={WHATSAPP_POSITIONS.map((p) => ({
                  value: p,
                  label: WHATSAPP_POSITION_LABEL[p],
                }))}
              />
              <SelectField
                label="Icono"
                name="whatsapp_icon"
                defaultValue={s?.whatsapp_icon ?? "whatsapp"}
                options={WHATSAPP_ICONS.map((i) => ({ value: i, label: WHATSAPP_ICON_LABEL[i] }))}
              />
            </div>
            <p className="mb-3 mt-5 text-[13px] text-[#5A5570]">
              Etiqueta opcional al lado del icono. Si la dejas vacía se muestra solo el icono
              redondo. Con texto ocupa más espacio pero suele recibir más clics.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Etiqueta ES" name="whatsapp_label_es" defaultValue={label.es} placeholder="Escríbenos" />
              <Field label="Etiqueta EN" name="whatsapp_label_en" defaultValue={label.en} placeholder="Chat with us" />
              <Field label="Etiqueta PT" name="whatsapp_label_pt" defaultValue={label.pt} placeholder="Fale conosco" />
            </div>
          </Card>

          <div>
            <SubmitButton>Guardar botón</SubmitButton>
          </div>
        </form>

        <WhatsAppPreview
          position={s?.whatsapp_position ?? "right"}
          icon={s?.whatsapp_icon ?? "whatsapp"}
          label={label.es ?? ""}
          enabled={s?.whatsapp_enabled ?? true}
        />
      </div>
    </>
  )
}
