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

/** Etiqueta superior de la tarjeta OG, por idioma. */
const OG_KICKER: Record<Language, string> = {
  es: "Tecnología con propósito",
  en: "Technology with purpose",
  pt: "Tecnologia com propósito",
}

/**
 * URL de la imagen Open Graph. Se genera en /api/og con la proporción correcta
 * (1200×630) y el contenido de cada página; antes se compartía el logo, de
 * 850×430, que las redes recortaban.
 */
export function ogImageUrl(lang: Language, title: string, subtitle?: string): string {
  const p = new URLSearchParams({ t: title, k: OG_KICKER[lang] })
  if (subtitle) p.set("s", subtitle)
  return `${SITE}/api/og?${p.toString()}`
}

/** Metadatos editables desde /admin, si existe la fila en page_seo. */
export interface SeoOverride {
  title?: string | null
  description?: string | null
  keywords?: string | null
  og_image?: string | null
}

function base(
  lang: Language,
  title: string,
  description: string,
  path: string,
  alternates: Record<Language, string>,
  override?: SeoOverride | null,
): Metadata {
  const finalTitle = override?.title?.trim() || title
  const finalDescription = override?.description?.trim() || description
  // La imagen cargada a mano en el panel manda; si no hay, se genera.
  const image = override?.og_image?.trim() || ogImageUrl(lang, finalTitle, finalDescription)

  return {
    metadataBase: new URL(SITE),
    title: finalTitle,
    description: finalDescription,
    ...(override?.keywords?.trim() ? { keywords: override.keywords } : {}),
    alternates: { canonical: path, languages: buildLanguages(alternates) },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE}${path}`,
      siteName: "Dos Nodos",
      locale: OG_LOCALE[lang],
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: finalTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  }
}

export function serviceMetadata(
  lang: Language,
  service: ServiceContent,
  override?: SeoOverride | null,
): Metadata {
  return base(
    lang,
    service.metaTitle[lang],
    service.metaDescription[lang],
    servicePath(lang, service),
    serviceAlternates(service),
    override,
  )
}

export function servicesIndexMetadata(lang: Language, override?: SeoOverride | null): Metadata {
  const sp = translations[lang].servicePage
  return base(
    lang,
    `${sp.servicesTitle} | Dos Nodos`,
    sp.servicesSubtitle,
    servicesIndexPath(lang),
    servicesIndexAlternates(),
    override,
  )
}

export function homeMetadata(
  lang: Language,
  title: string,
  description: string,
  override?: SeoOverride | null,
): Metadata {
  return base(lang, title, description, homePath(lang), homeAlternates(), override)
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
