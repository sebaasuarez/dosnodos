import { type NextRequest, NextResponse } from "next/server"

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
  console.log("=== INICIO API CONTACT ===")

  try {
    // Verificar variables de entorno
    console.log("Verificando variables de entorno...")
    console.log("GOOGLE_SHEETS_WEBHOOK_URL:", process.env.GOOGLE_SHEETS_WEBHOOK_URL ? "✅ Configurada" : "❌ Faltante")
    console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY ? "✅ Configurada" : "❌ Faltante")
    console.log("RESEND_FROM_EMAIL:", process.env.RESEND_FROM_EMAIL ? "✅ Configurada" : "❌ Faltante")

    if (!process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      console.error("❌ GOOGLE_SHEETS_WEBHOOK_URL no está configurada")
      return NextResponse.json(
        {
          error: "Configuración del servidor incompleta - Google Sheets",
        },
        { status: 500 },
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("❌ RESEND_API_KEY no está configurada")
      return NextResponse.json(
        {
          error: "Configuración del servidor incompleta - Resend",
        },
        { status: 500 },
      )
    }

    // Parsear datos del formulario
    console.log("Parseando datos del formulario...")
    const formData: ContactFormData = await request.json()
    console.log("Datos recibidos:", {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      messageLength: formData.message?.length || 0,
      language: formData.language,
    })

    // Validar datos requeridos
    if (!formData.name || !formData.email || !formData.company || !formData.phone || !formData.message) {
      console.error("❌ Datos faltantes en el formulario")
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    console.log("✅ Validación de datos completada")

    // 1. Enviar a Google Sheets
    console.log("📊 Enviando a Google Sheets...")
    try {
      const sheetsPayload = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: formData.message,
        language: formData.language,
        source: "Landing Page DosNodos",
      }

      console.log("Payload para Google Sheets:", sheetsPayload)

      const sheetsResponse = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sheetsPayload),
      })

      console.log("Respuesta de Google Sheets - Status:", sheetsResponse.status)

      if (!sheetsResponse.ok) {
        const errorText = await sheetsResponse.text()
        console.error("❌ Error en Google Sheets:", errorText)
      } else {
        console.log("✅ Google Sheets - Éxito")
      }
    } catch (sheetsError) {
      console.error("❌ Error enviando a Google Sheets:", sheetsError)
      // No retornamos error aquí, continuamos con el email
    }

    // 2. Enviar email de confirmación al cliente
    console.log("📧 Enviando email de confirmación...")
    try {
      const emailPayload = {
        from: FROM,
        to: [formData.email],
        subject: getEmailSubject(formData.language),
        html: getEmailTemplate(formData),
      }

      console.log("Email payload:", {
        from: emailPayload.from,
        to: emailPayload.to,
        subject: emailPayload.subject,
      })

      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      })

      console.log("Respuesta de Resend - Status:", emailResponse.status)

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text()
        console.error("❌ Error en Resend:", errorText)
      } else {
        console.log("✅ Email de confirmación - Éxito")
      }
    } catch (emailError) {
      console.error("❌ Error enviando email:", emailError)
    }

    // 3. Enviar notificación interna
    console.log("🔔 Enviando notificación interna...")
    try {
      const notificationResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM,
          to: ["hola@dosnodos.com.co"],
          subject: `🚀 Nuevo Lead: ${formData.company} - ${formData.name}`,
          html: getInternalNotificationTemplate(formData),
        }),
      })

      console.log("Respuesta notificación interna - Status:", notificationResponse.status)

      if (!notificationResponse.ok) {
        const errorText = await notificationResponse.text()
        console.error("❌ Error en notificación interna:", errorText)
      } else {
        console.log("✅ Notificación interna - Éxito")
      }
    } catch (notificationError) {
      console.error("❌ Error enviando notificación:", notificationError)
    }

    console.log("✅ Proceso completado exitosamente")
    return NextResponse.json({
      success: true,
      message: "Formulario enviado exitosamente",
    })
  } catch (error) {
    console.error("❌ ERROR GENERAL:", error)
    console.error("Stack trace:", error instanceof Error ? error.stack : "No stack trace")

    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}

function getEmailSubject(language: string): string {
  const subjects = {
    es: "¡Gracias por tu interés en DosNodos! 🚀",
    en: "Thank you for your interest in DosNodos! 🚀",
    pt: "Obrigado pelo seu interesse na DosNodos! 🚀",
  }
  return subjects[language as keyof typeof subjects] || subjects.es
}

function getEmailTemplate(formData: ContactFormData): string {
  const templates = {
    es: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .highlight { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .cta-button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .logo-img { max-width: 150px; height: auto; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2021%20jul%202025%2C%2012_05_15-ZNFUpAApppPOwr9Ag4eh3L2zpilX0q.png" alt="DosNodos Logo" class="logo-img" style="filter: brightness(0) invert(1);">
            <h1>¡Hola ${formData.name}!</h1>
            <p>Gracias por contactarnos. Conectamos tecnología con personas.</p>
          </div>
          
          <div class="content">
            <h2>Tu solicitud ha sido recibida ✅</h2>
            
            <div class="highlight">
              <strong>📋 Resumen de tu solicitud:</strong><br>
              <strong>Empresa:</strong> ${formData.company}<br>
              <strong>Email:</strong> ${formData.email}<br>
              <strong>Teléfono:</strong> ${formData.phone}<br>
              <strong>Mensaje:</strong> ${formData.message}
            </div>
            
            <h3>¿Qué sigue ahora?</h3>
            <ul>
              <li>📞 Te contactaremos en las próximas 24 horas</li>
              <li>🎯 Analizaremos tus necesidades específicas</li>
              <li>💡 Te prepararemos una propuesta personalizada</li>
              <li>🚀 Agendaremos tu demo gratuita</li>
            </ul>
            
            <a href="https://dosnodos.com.co" class="cta-button">Visitar nuestro sitio web</a>
            
            <div class="highlight">
              <strong>🤖 ¿Sabías que?</strong><br>
              Nuestros asistentes virtuales pueden automatizar hasta el 80% de las consultas de tus clientes, 
              funcionando 24/7 y integrándose con WhatsApp, tu web y CRM.
            </div>
          </div>
          
          <div class="footer">
            <p><strong>DosNodos - Conectamos tecnología con personas</strong></p>
            <p>📧 hola@dosnodos.com.co | 📱 +57 3505260427</p>
            <p>🌐 dosnodos.com.co | 📍 Medellín, Colombia</p>
          </div>
        </div>
      </body>
      </html>
    `,
    en: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .highlight { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .cta-button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .logo-img { max-width: 150px; height: auto; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2021%20jul%202025%2C%2012_05_15-ZNFUpAApppPOwr9Ag4eh3L2zpilX0q.png" alt="DosNodos Logo" class="logo-img" style="filter: brightness(0) invert(1);">
            <h1>Hello ${formData.name}!</h1>
            <p>Thank you for contacting us. We connect technology with people.</p>
          </div>
          
          <div class="content">
            <h2>Your request has been received ✅</h2>
            
            <div class="highlight">
              <strong>📋 Request summary:</strong><br>
              <strong>Company:</strong> ${formData.company}<br>
              <strong>Email:</strong> ${formData.email}<br>
              <strong>Phone:</strong> ${formData.phone}<br>
              <strong>Message:</strong> ${formData.message}
            </div>
            
            <h3>What's next?</h3>
            <ul>
              <li>📞 We'll contact you within 24 hours</li>
              <li>🎯 We'll analyze your specific needs</li>
              <li>💡 We'll prepare a personalized proposal</li>
              <li>🚀 We'll schedule your free demo</li>
            </ul>
            
            <a href="https://dosnodos.com.co" class="cta-button">Visit our website</a>
            
            <div class="highlight">
              <strong>🤖 Did you know?</strong><br>
              Our virtual assistants can automate up to 80% of your customer queries, 
              working 24/7 and integrating with WhatsApp, your website and CRM.
            </div>
          </div>
          
          <div class="footer">
            <p><strong>DosNodos - Connecting technology with people</strong></p>
            <p>📧 hola@dosnodos.com.co | 📱 +57 3505260427</p>
            <p>🌐 dosnodos.com.co | 📍 Medellín, Colombia</p>
          </div>
        </div>
      </body>
      </html>
    `,
    pt: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .highlight { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .cta-button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .logo-img { max-width: 150px; height: auto; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2021%20jul%202025%2C%2012_05_15-ZNFUpAApppPOwr9Ag4eh3L2zpilX0q.png" alt="DosNodos Logo" class="logo-img" style="filter: brightness(0) invert(1);">
            <h1>Olá ${formData.name}!</h1>
            <p>Obrigado por entrar em contato. Conectamos tecnologia com pessoas.</p>
          </div>
          
          <div class="content">
            <h2>Sua solicitação foi recebida ✅</h2>
            
            <div class="highlight">
              <strong>📋 Resumo da solicitação:</strong><br>
              <strong>Empresa:</strong> ${formData.company}<br>
              <strong>Email:</strong> ${formData.email}<br>
              <strong>Telefone:</strong> ${formData.phone}<br>
              <strong>Mensagem:</strong> ${formData.message}
            </div>
            
            <h3>O que acontece agora?</h3>
            <ul>
              <li>📞 Entraremos em contato em até 24 horas</li>
              <li>🎯 Analisaremos suas necessidades específicas</li>
              <li>💡 Prepararemos uma proposta personalizada</li>
              <li>🚀 Agendaremos sua demo gratuita</li>
            </ul>
            
            <a href="https://dosnodos.com.co" class="cta-button">Visitar nosso site</a>
            
            <div class="highlight">
              <strong>🤖 Você sabia?</strong><br>
              Nossos assistentes virtuais podem automatizar até 80% das consultas dos seus clientes, 
              funcionando 24/7 e integrando com WhatsApp, seu site e CRM.
            </div>
          </div>
          
          <div class="footer">
            <p><strong>DosNodos - Conectamos tecnologia com pessoas</strong></p>
            <p>📧 hola@dosnodos.com.co | 📱 +57 3505260427</p>
            <p>🌐 dosnodos.com.co | 📍 Medellín, Colombia</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }

  return templates[formData.language as keyof typeof templates] || templates.es
}

function getInternalNotificationTemplate(formData: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
        .field { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #3B82F6; }
        .urgent { background: #fef2f2; border-left-color: #ef4444; }
        .logo-img { max-width: 120px; height: auto; filter: brightness(0) invert(1); }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%2021%20jul%202025%2C%2012_05_15-ZNFUpAApppPOwr9Ag4eh3L2zpilX0q.png" alt="DosNodos Logo" class="logo-img">
          <h1>🚀 Nuevo Lead - DosNodos</h1>
          <p>Formulario de contacto completado</p>
        </div>
        
        <div class="content">
          <div class="field urgent">
            <strong>⏰ Fecha:</strong> ${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })}
          </div>
          
          <div class="field">
            <strong>👤 Nombre:</strong> ${formData.name}
          </div>
          
          <div class="field">
            <strong>🏢 Empresa:</strong> ${formData.company}
          </div>
          
          <div class="field">
            <strong>📧 Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a>
          </div>
          
          <div class="field">
            <strong>📱 Teléfono:</strong> <a href="tel:${formData.phone}">${formData.phone}</a>
          </div>
          
          <div class="field">
            <strong>🌍 Idioma:</strong> ${formData.language.toUpperCase()}
          </div>
          
          <div class="field">
            <strong>💬 Mensaje:</strong><br>
            ${formData.message}
          </div>
          
          <div class="field urgent">
            <strong>🎯 Acciones recomendadas:</strong>
            <ul>
              <li>Responder en las próximas 2 horas</li>
              <li>Agendar llamada de descubrimiento</li>
              <li>Preparar demo personalizada</li>
              <li>Enviar propuesta comercial</li>
            </ul>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}
