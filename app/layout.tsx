import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Serif } from "next/font/google"
import "./globals.css"
import { getPageSeo, getSiteSettings } from "@/lib/data"
import { TrackingHead, TrackingNoscript } from "@/components/tracking-scripts"

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

const FALLBACK_TITLE = "Dos Nodos — Tecnología con propósito"
const FALLBACK_DESC =
  "Conectamos tecnología con personas. Automatización, asistentes con IA y plataformas a la medida para que tu empresa venda más, responda más rápido y trabaje mejor."

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeo("/")
  const title = seo?.title || FALLBACK_TITLE
  const description = seo?.description || FALLBACK_DESC

  return {
    metadataBase: new URL("https://dosnodos.com.co"),
    title,
    description,
    keywords:
      seo?.keywords ||
      "Dos Nodos, automatización, inteligencia artificial, asistentes virtuales, WhatsApp, Shopify, e-commerce, desarrollo web, aplicaciones, marketing digital, SEO, Colombia, Medellín",
    authors: [{ name: "Dos Nodos" }],
    creator: "Dos Nodos",
    publisher: "Dos Nodos",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    alternates: {
      canonical: "/",
      languages: { es: "/", en: "/en", pt: "/pt", "x-default": "/" },
    },
    openGraph: {
      title,
      description,
      url: "https://dosnodos.com.co",
      siteName: "Dos Nodos",
      locale: "es_CO",
      type: "website",
      images: [{ url: seo?.og_image || "/dosnodos-logo.png", width: 850, height: 430, alt: "Dos Nodos" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [seo?.og_image || "/dosnodos-logo.png"],
    },
    icons: {
      icon: [
        { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon.ico", sizes: "256x256" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable} ${plexSerif.variable}`}
    >
      <head>
        <TrackingHead settings={settings} />
      </head>
      <body className="font-sans antialiased">
        <TrackingNoscript settings={settings} />
        {children}
      </body>
    </html>
  )
}
