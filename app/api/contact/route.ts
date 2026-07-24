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
  try {
    const raw: ContactFormData = await request.json()

    // El sitio pide solo Nombre, Correo y Mensaje; empresa/teléfono son opcionales.
    if (!raw.name?.trim() || !raw.email?.trim() || !raw.message?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    const formData: ContactFormData = {
      ...raw,
      company: raw.company?.trim() ? raw.company : "—",
      phone: raw.phone?.trim() ? raw.phone : "—",
    }

    // 0. CRM — guardar el lead en la base de datos (best-effort).
    // Usa service role si existe; si no, cae al cliente anónimo (política de
    // inserción pública en la tabla leads).
    try {
      const supabase = createAdminSupabase() ?? createReadSupabase()
      if (supabase) {
        await supabase.from("leads").insert({
          name: raw.name,
          email: raw.email,
          message: raw.message,
          company: raw.company?.trim() || null,
          phone: raw.phone?.trim() || null,
          language: raw.language || "es",
          source: "landing",
          status: "nuevo",
        })
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
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 503 },
      )
    }

    // 2 y 3. Resend debe aceptar tanto la confirmación como el aviso interno.
    const adminEmail = process.env.ADMIN_EMAIL || "hola@dosnodos.com.co"
    try {
      await Promise.all([
        sendEmail({
          from: FROM,
          to: [formData.email],
          subject: getEmailSubject(formData.language),
          html: getEmailTemplate(formData),
        }),
        sendEmail({
          from: FROM,
          to: [adminEmail],
          reply_to: formData.email,
          subject: `🚀 Nuevo Lead: ${formData.company !== "—" ? formData.company : formData.name}`,
          html: getInternalNotificationTemplate(formData),
        }),
      ])
    } catch (error) {
      console.error("Resend notification error:", error)
      return NextResponse.json(
        { error: "Email notifications could not be delivered" },
        { status: 502 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}
