# 🚀 DosNodos - Asistentes Virtuales Inteligentes

DosNodos es una plataforma web moderna, interactiva y optimizada para la conversión, construida para ofrecer servicios de asistentes virtuales con IA, desarrollo web moderno y automatización de procesos empresariales. La plataforma conecta tecnología de vanguardia con las necesidades comunicativas de personas y negocios.

## 📖 Descripción del Proyecto

DosNodos provee soluciones digitales integrales para ayudar a empresas de distintos sectores a automatizar la atención al cliente 24/7 y mejorar sus procesos operativos. Esta Landing Page actúa como el principal y primer punto de captación (front-door), proporcionando casos de uso interactivos por verticales, exposición de beneficios clave y un **formulario de contacto avanzado y de alta conversión**, directamente interconectado con bases de datos en tiempo real y notificaciones automatizadas al CRM del equipo comercial.

---

## ✨ Funcionalidades

- **Diseño Premium y Glassmorphism**: Interfaz moderna rica en estéticas "Glass" y gradientes, con animaciones fluidas (Fade-in, scale-in) enfocada en máximo enganche y credibilidad.
- **Formulario Inteligente y Dinámico**: Formulario de contacto impulsado por validaciones en tiempo real (Zod + React Hook Form), barra de progreso dinámica para evitar el abandono y detección de formato de teléfono (códigos de país ajustados por detección de lenguaje).
- **Soporte Multilenguaje Completo (i18n)**: Internacionalización lista para usar en Español (`es`), Inglés (`en`) y Portugués (`pt`), adaptando tanto el contenido como las validaciones y los emails.
- **Backend Integrado Omnicanal**: 
  - Captura e inyección automática hacia Google Sheets de nuevos leads (webhook).
  - Envío automático de notificaciones de confirmación para el cliente y de aviso para el equipo vía **Resend**.
- **Arquitectura Modularizada**: Código limpio y escalable con segmentación estricta por `components/sections` (Hero, Services, Benefits, Team, Sectors, CTA).

---

## 🛠️ Tecnologías

- **Framework Central**: [Next.js 15](https://nextjs.org/) (App Router), React 19.
- **Estilos y Componentes**: Tailwind CSS v3, [Shadcn UI](https://ui.shadcn.com/) (Radix), Lucide React para iconografía.
- **Formularios y Validaciones**: `react-hook-form` + `zod` (`@hookform/resolvers`).
- **Integraciones Integradas en Backend (Ruta `/api/contact`)**:
  - API nativa de **Resend** para notificaciones por email.
  - **Google Apps Script** para puente hacia Google Sheets.
- **Lenguaje Primitivo**: TypeScript.

---

## 📦 Versión
- **Versión Estable**: `1.0.0`
- **Estado Técnico**: Producción (Stable)

---

## 💻 Paso a paso para ejecutar localmente

### 1. Clonar el repositorio
Clona el proyecto en la carpeta preferida de tu computador y accede a su directorio:
```bash
git clone <URL_DEL_REPOSITORIO>
cd dosnodos-1
```

### 2. Instalar las dependencias
Asegúrate de contar con Node.js (v18+) instalado.
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto. Para que las validaciones del formulario funcionen debes asignar los parámetros de Resend y Google Sheets. 

*Para detalles profundos sobre cómo obtener estas configuraciones mediante Google Apps Script y Resend, verifica el archivo `SETUP_INSTRUCTIONS.md` incluido en el proyecto.*

```env
# Webhook generador a través de Google Apps Script 
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# API key provista por el dashboard de Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# Remitente de correo (Debe estar verificado en Resend)
RESEND_FROM_EMAIL="DosNodos <onboarding@resend.dev>"
```

### 4. Lanzar el servidor de desarrollo local
```bash
npm run dev
```
Luego, accede de forma segura en tu navegador habitual al entorno local: [http://localhost:3000](http://localhost:3000).

---

## 🚀 Despliegue

El proyecto se encuentra totalmente optimizado (con variables estáticas y Server Functions compatibles con plataformas Edge) para plataformas de entorno Serverless como Vercel o Netlify. 

### Despliegue recomendado (Vercel)
1. Inicia sesión en [Vercel](https://vercel.com) y enlaza tu cuenta de GitHub/GitLab.
2. Selecciona **"Add New Project"** y elige tu repositorio `dosnodos`.
3. Es crítico que, antes de desplegar, vayas a la pestaña de **"Environment Variables"** y agregues las tres claves de `.env.local`:
   - `GOOGLE_SHEETS_WEBHOOK_URL`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
4. Haz clic en **Deploy**. 

Vercel configurará e inferirá las instrucciones de compilado (`npm install` -> `npm run build`) en cuestión de segundos, dando inmediatamente acceso con un link de producción seguro y estable.
