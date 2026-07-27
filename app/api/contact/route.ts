import { type NextRequest, NextResponse } from "next/server"
import { getEmailSubject, getEmailTemplate, getInternalNotificationTemplate } from "@/lib/email-templates"
import { createAdminSupabase, createReadSupabase } from "@/lib/supabase/admin"

interface ContactFormData {
  name: string
  email: string
  company: string
  phone: string
  message: string
  language: string
}

const FROM = process.env.RESEND_FROM_EMAIL ?? "DosNodos <onboarding@resend.dev>"
const RESEND_URL = "https://api.resend.com/emails"

/**
 * Landings que pueden enviar leads. Es lista blanca y no texto libre: `source`
 * llega del cliente y sin esto cualquiera podría ensuciar el CRM con orígenes
 * inventados.
 */
const SOURCES = new Set(["landing", "ventas"])

/**
 * Orígenes autorizados a llamar este endpoint desde otro dominio. La landing
 * de ventas es un sitio estático aparte, así que su envío es cross-origin.
 */
const ALLOWED_ORIGINS = new Set([
  "https://ventas.dosnodos.com.co",
  "https://dosnodos.com.co",
])

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return {}
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  }
}

/** Preflight del navegador antes del POST cross-origin. */
export function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request.headers.get("origin")) })
}

async function sendEmail(payload: Record<string, unknown>) {
  const response = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Resend rejected the email (${response.status}): ${detail}`)
  }

  return response.json()
}

export async function POST(request: NextRequest) {
  const cors = corsHeaders(request.headers.get("origin"))
  const fail = (error: string, status: number) =>
    NextResponse.json({ error }, { status, headers: cors })

  try {
    const raw: ContactFormData & { source?: string } = await request.json()

    const source = raw.source && SOURCES.has(raw.source) ? raw.source : "landing"
    const email = raw.email?.trim() ?? ""
    const phone = raw.phone?.trim() ?? ""

    if (!raw.name?.trim()) return fail("Missing fields", 400)

    // Tiene que haber al menos una forma de responder. El sitio principal pide
    // correo; la landing de ventas es de WhatsApp y pide número.
    if (!email && !phone) return fail("Missing contact", 400)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Invalid email", 400)

    // El mensaje solo es obligatorio cuando no hay teléfono: en un formulario
    // de WhatsApp el contacto en sí ya es la intención.
    if (!phone && !raw.message?.trim()) return fail("Missing fields", 400)

    const formData: ContactFormData = {
      ...raw,
      company: raw.company?.trim() ? raw.company : "—",
      phone: raw.phone?.trim() ? raw.phone : "—",
    }

    // 0. CRM — guardar el lead en la base de datos.
    // Usa service role si existe; si no, cae al cliente anónimo (política de
    // inserción pública en la tabla leads).
    let saved = false
    try {
      const supabase = createAdminSupabase() ?? createReadSupabase()
      if (supabase) {
        const { error } = await supabase.from("leads").insert({
          name: raw.name.trim(),
          email: email || null,
          message: raw.message?.trim() || null,
          company: raw.company?.trim() || null,
          phone: phone || null,
          language: raw.language || "es",
          source,
          status: "nuevo",
        })
        saved = !error
        if (error) console.error("CRM Lead Error:", error.message)
      }
    } catch (e) {
      console.error("CRM Lead Error:", e)
    }


    // 1. Google Sheets es opcional e independiente de las notificaciones.
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        const sheetsResponse = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            ...formData,
            source: "Landing Page DosNodos",
          }),
        })
        if (!sheetsResponse.ok) {
          console.error("Sheets Error:", sheetsResponse.status, await sheetsResponse.text())
        }
      } catch (e) {
        console.error("Sheets Error:", e)
      }
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Email notifications skipped: RESEND_API_KEY is not configured")
      // Sin correo del lead no hay confirmación que enviar, así que el lead ya
      // está completo con solo haberse guardado en el CRM.
      if (!email) return NextResponse.json({ success: saved }, { status: saved ? 200 : 502, headers: cors })
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 503, headers: cors },
      )
    }

    // 2 y 3. Resend debe aceptar tanto la confirmación como el aviso interno.
    const adminEmail = process.env.ADMIN_EMAIL || "hola@dosnodos.com.co"
    const origen = source === "ventas" ? "ventas.dosnodos.com.co" : "dosnodos.com.co"
    try {
      await Promise.all([
        // La confirmación solo aplica si dejó correo. Los leads de la landing
        // de ventas llegan por WhatsApp y no tienen a dónde confirmarles.
        ...(email
          ? [
              sendEmail({
                from: FROM,
                to: [email],
                subject: getEmailSubject(formData.language),
                html: getEmailTemplate(formData),
              }),
            ]
          : []),
        sendEmail({
          from: FROM,
          to: [adminEmail],
          // Sin correo no hay reply-to: se responde por WhatsApp.
          ...(email ? { reply_to: email } : {}),
          subject: `🚀 Nuevo Lead (${origen}): ${formData.company !== "—" ? formData.company : formData.name}`,
          html: getInternalNotificationTemplate(formData),
        }),
      ])
    } catch (error) {
      console.error("Resend notification error:", error)
      // El lead ya quedó en el CRM: que falle el correo no debería hacer que
      // la persona vea un error y vuelva a enviar el formulario.
      if (saved) return NextResponse.json({ success: true, emailFailed: true }, { headers: cors })
      return fail("Email notifications could not be delivered", 502)
    }

    return NextResponse.json({ success: true }, { headers: cors })
  } catch (error) {
    console.error("Error:", error)
    return fail("Internal Error", 500)
  }
}
