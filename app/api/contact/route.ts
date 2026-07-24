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

export async function POST(request: NextRequest) {
  try {
    const raw: ContactFormData = await request.json()

    // El sitio pide solo Nombre, Correo y Mensaje; empresa/teléfono son opcionales.
    if (!raw.name || !raw.email || !raw.message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
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

    // Email/Sheets requieren configuración; si falta, igual guardamos el lead arriba.
    if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL || !process.env.RESEND_API_KEY) {
      return NextResponse.json({ success: true, note: "lead stored; notifications skipped" })
    }

    // 1. Google Sheets
    try {
      await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          ...formData,
          source: "Landing Page DosNodos",
        }),
      })
    } catch (e) {
      console.error("Sheets Error:", e)
    }

    // 2. Email to Client
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM,
          to: [formData.email],
          subject: getEmailSubject(formData.language),
          html: getEmailTemplate(formData),
        }),
      })
    } catch (e) {
      console.error("Resend Client Error:", e)
    }

    // 3. Internal Notification
    try {
      const adminEmail = process.env.ADMIN_EMAIL || "hola@dosnodos.com.co"
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: FROM,
          to: [adminEmail],
          subject: `🚀 Nuevo Lead: ${formData.company !== "—" ? formData.company : formData.name}`,
          html: getInternalNotificationTemplate(formData),
        }),
      })
    } catch (e) {
      console.error("Resend Internal Error:", e)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal Error" }, { status: 500 })
  }
}

