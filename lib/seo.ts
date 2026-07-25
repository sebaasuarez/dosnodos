import type { Metadata } from "next"
import { type Language, translations } from "./i18n"
import {
  SERVICES,
  homePath,
  servicePath,
  servicesIndexPath,
  type ServiceContent,
} from "./services-content"

export const SITE = "https://dosnodos.com.co"

const OG_LOCALE: Record<Language, string> = {
  es: "es_CO",
  en: "en_US",
  pt: "pt_BR",
}

const LANGS: Language[] = ["es", "en", "pt"]

/** Rutas equivalentes por idioma para un servicio. */
export function serviceAlternates(service: ServiceContent): Record<Language, string> {
  return {
    es: servicePath("es", service),
    en: servicePath("en", service),
    pt: servicePath("pt", service),
  }
}

export function servicesIndexAlternates(): Record<Language, string> {
  return { es: servicesIndexPath("es"), en: servicesIndexPath("en"), pt: servicesIndexPath("pt") }
}

export function homeAlternates(): Record<Language, string> {
  return { es: homePath("es"), en: homePath("en"), pt: homePath("pt") }
}

function buildLanguages(alternates: Record<Language, string>) {
  const languages: Record<string, string> = {}
  for (const l of LANGS) languages[l] = alternates[l]
  languages["x-default"] = alternates.es
  return languages
}

function base(
  lang: Language,
  title: string,
  description: string,
  path: string,
  alternates: Record<Language, string>,
): Metadata {
  return {
    metadataBase: new URL(SITE),
    title,
    description,
    alternates: { canonical: path, languages: buildLanguages(alternates) },
    openGraph: {
      title,
      description,
      url: `${SITE}${path}`,
      siteName: "Dos Nodos",
      locale: OG_LOCALE[lang],
      type: "website",
      images: [{ url: "/dosnodos-logo.png", width: 850, height: 430, alt: "Dos Nodos" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/dosnodos-logo.png"] },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  }
}

export function serviceMetadata(lang: Language, service: ServiceContent): Metadata {
  return base(
    lang,
    service.metaTitle[lang],
    service.metaDescription[lang],
    servicePath(lang, service),
    serviceAlternates(service),
  )
}

export function servicesIndexMetadata(lang: Language): Metadata {
  const sp = translations[lang].servicePage
  return base(
    lang,
    `${sp.servicesTitle} | Dos Nodos`,
    sp.servicesSubtitle,
    servicesIndexPath(lang),
    servicesIndexAlternates(),
  )
}

export function homeMetadata(lang: Language, title: string, description: string): Metadata {
  return base(lang, title, description, homePath(lang), homeAlternates())
}

/** Todas las URLs indexables del sitio, para el sitemap. */
export function allUrls(): { path: string; priority: number }[] {
  const urls: { path: string; priority: number }[] = []
  for (const l of LANGS) {
    urls.push({ path: homePath(l), priority: l === "es" ? 1 : 0.8 })
    urls.push({ path: servicesIndexPath(l), priority: 0.8 })
    for (const s of SERVICES) urls.push({ path: servicePath(l, s), priority: 0.7 })
  }
  return urls
}
