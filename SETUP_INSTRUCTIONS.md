# 📋 Configuración del Formulario de Contacto

## 🔧 Variables de Entorno Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

\`\`\`env
# Google Sheets Webhook URL (ver instrucciones abajo)
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Resend API Key para envío de emails
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# Remitente de Resend
RESEND_FROM_EMAIL="DosNodos <onboarding@resend.dev>"
\`\`\`

## 📊 Configuración de Google Sheets

### Paso 1: Crear Google Sheet
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja llamada "DosNodos Leads"
3. En la primera fila, agrega estos encabezados:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Company`
   - E1: `Phone`
   - F1: `Message`
   - G1: `Language`
   - H1: `Source`

### Paso 2: Crear Google Apps Script
1. En tu Google Sheet, ve a `Extensions > Apps Script`
2. Reemplaza el código por defecto con este:

\`\`\`javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Agregar nueva fila con los datos
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.company,
      data.phone,
      data.message,
      data.language,
      data.source
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
\`\`\`

3. Guarda el script (Ctrl+S)
4. Ve a `Deploy > New Deployment`
5. Selecciona tipo: `Web app`
6. Configuración:
   - Execute as: `Me`
   - Who has access: `Anyone`
7. Copia la URL del webhook y úsala en `GOOGLE_SHEETS_WEBHOOK_URL`

## 📧 Configuración de Resend

### Paso 1: Crear cuenta en Resend
1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta gratuita
3. Verifica tu dominio o usa el dominio de prueba

### Paso 2: Obtener API Key
1. Ve a `API Keys` en el dashboard
2. Crea una nueva API Key
3. Copia la key y úsala en `RESEND_API_KEY`

### Paso 3: Configurar dominio (Opcional pero recomendado)
1. Ve a `Domains` en Resend
2. Agrega tu dominio `dosnodos.com.co`
3. Configura los registros DNS según las instrucciones
4. Una vez verificado, podrás enviar desde `noreply@dosnodos.com.co`

### Paso 4: Configurar remitente de Resend
1. Si tu dominio **NO** está verificado todavía, usa la dirección de prueba que ya funciona:
   \`\`\`
   RESEND_FROM_EMAIL="DosNodos <onboarding@resend.dev>"
   \`\`\`

2. Cuando verifiques **dosnodos.com.co** en Resend, cámbiala por algo como:
   \`\`\`
   RESEND_FROM_EMAIL="DosNodos <noreply@dosnodos.com.co>"
   \`\`\`

Añade esta variable junto a las anteriores en tu entorno (local y Vercel).

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Agrega las variables de entorno en el dashboard de Vercel
3. Despliega el proyecto

### Variables de entorno en Vercel:
- `GOOGLE_SHEETS_WEBHOOK_URL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

## ✅ Pruebas

1. Completa el formulario en tu landing page
2. Verifica que:
   - Los datos aparezcan en Google Sheets
   - El usuario reciba email de confirmación
   - Tu equipo reciba notificación interna

## 🔍 Monitoreo

- **Google Sheets**: Todos los leads se guardan automáticamente
- **Resend Dashboard**: Monitorea entregas de email
- **Vercel Functions**: Revisa logs de la API en Vercel

## 🛠️ Personalización

### Cambiar emails de notificación:
Edita la línea en `app/api/contact/route.ts`:
\`\`\`typescript
to: ['hola@dosnodos.com.co'], // Cambia por tu email
\`\`\`

### Personalizar templates de email:
Modifica las funciones `getEmailTemplate()` y `getInternalNotificationTemplate()` en el mismo archivo.

## 📞 Soporte

Si tienes problemas con la configuración:
1. Revisa los logs en Vercel Functions
2. Verifica que las variables de entorno estén correctas
3. Prueba el webhook de Google Sheets directamente

---

# 🛠️ Panel de administración + CRM (Supabase)

El sitio incluye un panel en **`/admin`** para gestionar contenido, leads, SEO y
tags de medición. Está construido sobre **Supabase** (Postgres + Auth).

> El sitio público funciona **sin** Supabase (usa el contenido por defecto).
> El panel y el CRM se activan al configurar las variables de entorno.

## 1. Variables de entorno

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...   # solo servidor, no exponer
```

## 2. Base de datos

Aplica la migración incluida en `supabase/migrations/` (crea tablas `leads`,
`projects`, `reviews`, `site_settings`, `page_seo`, con RLS y datos semilla):

- **Supabase Studio** → SQL Editor → pega el contenido del archivo `.sql` y ejecútalo, o
- **CLI:** `supabase db push` (con el proyecto enlazado).

## 3. Usuario administrador

En Supabase → **Authentication → Users → Add user** crea la cuenta del equipo
(email + contraseña). Cualquier usuario autenticado puede entrar al panel, así
que crea cuentas solo para el equipo.

## 4. Qué hay en el panel

- **Leads · CRM** — cada envío del formulario de contacto se guarda como lead.
  Lista con filtros por estado, detalle con gestión (estado, notas) y acceso
  rápido a WhatsApp/correo. Así se va construyendo la base de clientes.
- **Proyectos** — CRUD del portafolio (incluye proyectos en curso como borrador),
  con traducciones EN/PT opcionales.
- **Reseñas** — CRUD de testimonios con calificación y traducciones.
- **SEO** — title, description, keywords y OG image de la home.
- **Tracking & Config** — IDs de **Google Tag Manager, Google Analytics 4,
  Google Ads, Meta Pixel y TikTok Pixel**, más número de WhatsApp y correo.
  Se inyectan automáticamente en el sitio. Incluye un campo de scripts extra
  para el `<head>`.

## 5. Flujo de datos del formulario

`Formulario → /api/contact →`
1. **CRM (Supabase `leads`)** — siempre, si Supabase está configurado.
2. **Google Sheets** — si `GOOGLE_SHEETS_WEBHOOK_URL` está definido.
3. **Emails (Resend)** — confirmación al cliente + aviso interno, si `RESEND_API_KEY`.

Si faltan Sheets/Resend, el lead igual queda en el CRM.
