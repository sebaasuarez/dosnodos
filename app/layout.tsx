import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dos Nodos - Asistentes Virtuales Inteligentes para tu Empresa",
  description:
    "Potencia tu negocio con asistentes virtuales inteligentes. En Dos Nodos conectamos tecnología con personas, automatizamos tu atención al cliente 24/7 y generamos valor real y medible.",
  keywords:
    "Dos Nodos, asistentes virtuales, chatbots, inteligencia artificial, automatización, atención al cliente, desarrollo web, marketing digital, Colombia, Medellín",
  authors: [{ name: "Dos Nodos" }],
  creator: "Dos Nodos",
  publisher: "Dos Nodos",
  robots: "index, follow",
  openGraph: {
    title: "Dos Nodos - Asistentes Virtuales Inteligentes",
    description: "Conectamos tecnología con personas. Automatiza tu negocio con IA.",
    url: "https://dosnodos.com.co",
    siteName: "Dos Nodos",
    locale: "es_CO",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
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
      <body className={inter.className}>
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
