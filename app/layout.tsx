import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Serif } from "next/font/google"
import "./globals.css"
import { getPageSeo, getSiteSettings } from "@/lib/data"
import { ogImageUrl } from "@/lib/seo"
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
  // La imagen cargada desde el panel manda; si no hay, se genera una tarjeta
  // 1200×630 en /api/og. Antes se compartía el logo, de 850×430, que las redes
  // recortaban por no ser proporción de Open Graph.
  const ogImage = seo?.og_image?.trim() || ogImageUrl("es", title, description)

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
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    icons: {
      // El SVG lo prefieren los navegadores modernos (nítido a cualquier tamaño);
      // los PNG y el .ico son el respaldo.
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
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
        {/* Las secciones bajo la línea de flotación arrancan ocultas y las
            revela un IntersectionObserver. Sin JavaScript nunca se revelarían,
            así que se muestran de una. */}
        <noscript>
          <style>{`.dn-reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans antialiased">
        <TrackingNoscript settings={settings} />
        {children}
      </body>
    </html>
  )
}
