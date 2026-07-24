import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Serif } from "next/font/google"
import "./globals.css"

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
})

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-plex-serif",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://dosnodos.com.co"),
  title: "Dos Nodos — Tecnología con propósito",
  description:
    "Conectamos tecnología con personas. Automatización, asistentes con IA y plataformas a la medida para que tu empresa venda más, responda más rápido y trabaje mejor.",
  keywords:
    "Dos Nodos, automatización, inteligencia artificial, asistentes virtuales, WhatsApp, Shopify, e-commerce, desarrollo web, aplicaciones, marketing digital, SEO, Colombia, Medellín",
  authors: [{ name: "Dos Nodos" }],
  creator: "Dos Nodos",
  publisher: "Dos Nodos",
  robots: "index, follow",
  openGraph: {
    title: "Dos Nodos — Tecnología con propósito",
    description:
      "Automatización, asistentes con IA y plataformas a la medida. Conectamos tecnología con personas.",
    url: "https://dosnodos.com.co",
    siteName: "Dos Nodos",
    locale: "es_CO",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/dosnodos-mark.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/dosnodos-mark.png",
    apple: "/dosnodos-mark.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable} ${plexSerif.variable}`}
    >
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W9BTLNH8');`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W9BTLNH8"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
