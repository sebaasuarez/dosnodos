import { type Language, translations } from "@/lib/i18n"

interface StructuredDataProps {
  language: Language
}

export function StructuredData({ language }: StructuredDataProps) {
  const t = translations[language]

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "DosNodos",
    "image": "https://dosnodos.com.co/logo-dosnodos.png",
    "@id": "https://dosnodos.com.co",
    "url": "https://dosnodos.com.co",
    "telephone": "+57 3127344026",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Medellín",
      "addressLocality": "Antioquia",
      "addressCountry": "CO"
    },
    "description": t.hero.subtitle,
    "serviceType": [
      t.services.items.ai.title,
      t.services.items.web.title,
      t.services.items.automation.title
    ],
    "provider": {
      "@type": "Organization",
      "name": "DosNodos",
      "sameAs": [
        "https://wa.me/573127344026"
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
