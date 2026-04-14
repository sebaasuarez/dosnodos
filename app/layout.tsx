import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://dosnodos.com.co"),
  title: {
    default: "Dos Nodos - Agencia de Desarrollo y Transformación Digital | Fundada por desarrolladores",
    template: "%s | Dos Nodos"
  },
  description:
    "Dos Nodos es una agencia de desarrollo y transformación digital creada por desarrolladores para empresas que buscan soluciones tecnológicas robustas. Conectamos tecnología con personas para generar impacto real en Medellín, Colombia.",
  keywords: [
    "Dos Nodos",
    "desarrollo de software",
    "transformación digital",
    "agencia digital",
    "creada por desarrolladores",
    "Medellín",
    "Colombia",
    "inteligencia artificial",
    "Media Buyer",
    "performance marketing"
  ],
  authors: [{ name: "Dos Nodos", url: "https://dosnodos.com.co" }],
  creator: "Dos Nodos",
  publisher: "Dos Nodos",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "es-CO": "/es",
      "en-US": "/en",
      "pt-BR": "/pt",
    },
  },
  openGraph: {
    title: "Dos Nodos - Transformación Digital con Propósito",
    description: "Agencia de desarrollo y transformación digital. Conectamos tecnología con personas.",
    url: "https://dosnodos.com.co",
    siteName: "Dos Nodos",
    locale: "es_CO",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dos Nodos - Agencia de Desarrollo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dos Nodos - Agencia de Desarrollo y Transformación Digital",
    description: "Conectamos tecnología con personas. Soluciones tecnológicas robustas.",
    images: ["/og-image.png"],
    creator: "@dosnodos",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  verification: {
    google: "google-site-verification-token",
  },
  other: {
    "geo.region": "CO-ANT",
    "geo.placename": "Medellín",
    "geo.position": "6.2442;-75.5812",
    "ICBM": "6.2442, -75.5812",
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
