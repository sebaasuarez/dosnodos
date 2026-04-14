import { type NextRequest, NextResponse } from "next/server"
import { getEmailSubject, getEmailTemplate, getInternalNotificationTemplate } from "@/lib/email-templates"

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
    if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL || !process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Configuration missing" },
        { status: 500 },
      )
    }

    const formData: ContactFormData = await request.json()

    if (!formData.name || !formData.email || !formData.company || !formData.phone || !formData.message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
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
          subject: `🚀 Nuevo Lead: ${formData.company}`,
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

