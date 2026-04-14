interface ContactFormData {
  name: string
  email: string
  company: string
  phone: string
  message: string
  language: string
}

export function getEmailSubject(language: string): string {
  const subjects = {
    es: "¡Gracias por tu interés en DosNodos! 🚀",
    en: "Thank you for your interest in DosNodos! 🚀",
    pt: "Obrigado pelo seu interesse na DosNodos! 🚀",
  }
  return subjects[language as keyof typeof subjects] || subjects.es
}

export function getEmailTemplate(formData: ContactFormData): string {
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
          .highlight { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .cta-button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .logo-img { max-width: 150px; height: auto; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://dosnodos.com.co/logo-dosnodos.png" alt="DosNodos Logo" class="logo-img" style="filter: brightness(0) invert(1);">
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
          </div>
          <div class="footer">
            <p><strong>DosNodos - Conectamos tecnología con personas</strong></p>
            <p>📧 hola@dosnodos.com.co | 📱 +57 3127344026</p>
            <p>🌐 dosnodos.com.co | Medellín, Colombia</p>
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
          .highlight { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .cta-button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
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
          </div>
          <div class="footer">
            <p><strong>DosNodos - Connecting technology with people</strong></p>
            <p>📧 hola@dosnodos.com.co | 📱 +57 3127344026</p>
            <p>🌐 dosnodos.com.co | Medellín, Colombia</p>
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
          .highlight { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .cta-button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Olá ${formData.name}!</h1>
            <p>Obrigado por entrar em contato. Conectamos tecnologia com pessoas.</p>
          </div>
          <div class="content">
            <h2>Sua solicitación foi recebida ✅</h2>
            <div class="highlight">
              <strong>📋 Resumo da solicitação:</strong><br>
              <strong>Empresa:</strong> ${formData.company}<br>
              <strong>Email:</strong> ${formData.email}<br>
              <strong>Telefone:</strong> ${formData.phone}<br>
              <strong>Mensagem:</strong> ${formData.message}
            </div>
            <h3>O que acontece agora?</h3>
            <ul>
              <li>Entraremos em contato em até 24 horas</li>
            </ul>
            <a href="https://dosnodos.com.co" class="cta-button">Visitar nosso site</a>
          </div>
        </div>
      </body>
      </html>
    `,
  }
  return templates[formData.language as keyof typeof templates] || templates.es
}

export function getInternalNotificationTemplate(formData: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; }
        .field { margin: 10px 0; padding: 10px; background: #f4f4f4; border-left: 4px solid #3B82F6; }
      </style>
    </head>
    <body>
      <h2>🚀 Nuevo Lead - DosNodos</h2>
      <div class="field"><strong>Nombre:</strong> ${formData.name}</div>
      <div class="field"><strong>Empresa:</strong> ${formData.company}</div>
      <div class="field"><strong>Email:</strong> ${formData.email}</div>
      <div class="field"><strong>Teléfono:</strong> ${formData.phone}</div>
      <div class="field"><strong>Idioma:</strong> ${formData.language}</div>
      <div class="field"><strong>Mensaje:</strong><br>${formData.message}</div>
    </body>
    </html>
  `
}
