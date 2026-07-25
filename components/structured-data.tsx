import { type Language, translations } from "@/lib/i18n"

interface StructuredDataProps {
  language: Language
}

const SITE = "https://dosnodos.com.co"
const PHONE = "+57 312 734 4026"

/**
 * Datos estructurados para buscadores y motores de IA (GEO).
 * Un solo bloque @graph con Organization, WebSite, los servicios ofrecidos
 * y las preguntas frecuentes — así las IA pueden citar respuestas concretas.
 */
export function StructuredData({ language }: StructuredDataProps) {
  const t = translations[language]

  const allServices = t.services.categories.flatMap((c) => c.items)

  const graph = [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE}/#organization`,
      name: "Dos Nodos",
      alternateName: "DosNodos",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/dosnodos-logo.png`,
        width: 850,
        height: 430,
      },
      image: `${SITE}/dosnodos-logo.png`,
      slogan: t.footer.tagline,
      description: t.hero.subtitle,
      email: "hola@dosnodos.com.co",
      telephone: PHONE,
      foundingLocation: "Medellín, Colombia",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Medellín",
        addressRegion: "Antioquia",
        addressCountry: "CO",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 6.2442,
        longitude: -75.5812,
      },
      // Atención 24 horas de lunes a sábado.
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "https://schema.org/Monday",
            "https://schema.org/Tuesday",
            "https://schema.org/Wednesday",
            "https://schema.org/Thursday",
            "https://schema.org/Friday",
            "https://schema.org/Saturday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
      areaServed: [
        { "@type": "City", name: "Medellín" },
        { "@type": "Country", name: "Colombia" },
        { "@type": "Place", name: "Latinoamérica" },
      ],
      knowsLanguage: ["es", "en", "pt"],
      sameAs: ["https://wa.me/573127344026"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: PHONE,
          email: "hola@dosnodos.com.co",
          availableLanguage: ["Spanish", "English", "Portuguese"],
        },
      ],
      makesOffer: allServices.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
          serviceType: s.title,
          provider: { "@id": `${SITE}/#organization` },
          areaServed: { "@type": "Country", name: "Colombia" },
        },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Dos Nodos",
      description: t.hero.subtitle,
      inLanguage: language,
      publisher: { "@id": `${SITE}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      inLanguage: language,
      mainEntity: t.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ]

  const structuredData = { "@context": "https://schema.org", "@graph": graph }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
