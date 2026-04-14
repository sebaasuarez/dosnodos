import { type NextRequest, NextResponse } from "next/server"
import { getOutreachTemplate, type OutreachData } from "@/lib/email-templates"

export async function POST(request: NextRequest) {
  try {
    const data: OutreachData = await request.json()

    if (!data.clientName || !data.clientEmail || !data.company || !data.subject || !data.message) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY missing in environment variables" },
        { status: 500 }
      )
    }

    // Log masked info for debugging invalid key error
    console.log("Attempting outreach send. API Key length:", apiKey.length)
    console.log("API Key start:", apiKey.substring(0, 5), "... end:", apiKey.substring(apiKey.length - 3))

    const FROM = process.env.RESEND_FROM_EMAIL || "Dos Nodos <onboarding@resend.dev>"

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [data.clientEmail],
        subject: data.subject,
        html: getOutreachTemplate(data),
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.error("Resend API Error details:", JSON.stringify(errorData, null, 2))
      return NextResponse.json({ 
        error: "Error de Resend", 
        details: errorData.message || "Key inválida o error de validación"
      }, { status: res.status })
    }

    return NextResponse.json({ success: true, message: "Correo enviado" })
  } catch (error) {
    console.error("Critical Outreach API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
