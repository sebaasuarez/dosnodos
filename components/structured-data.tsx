import { type Language, translations } from "@/lib/i18n"

interface StructuredDataProps {
  language: Language
}

export function StructuredData({ language }: StructuredDataProps) {
  const t = translations[language]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Dos Nodos",
    image: "https://dosnodos.com.co/dosnodos-logo.png",
    "@id": "https://dosnodos.com.co",
    url: "https://dosnodos.com.co",
    telephone: "+57 3127344026",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Medellín",
      addressLocality: "Antioquia",
      addressCountry: "CO",
    },
    description: t.hero.subtitle,
    slogan: t.footer.tagline,
    serviceType: [t.services.platforms.title, t.services.apps.title, t.services.ai.title],
    provider: {
      "@type": "Organization",
      name: "Dos Nodos",
      sameAs: ["https://wa.me/573127344026"],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
