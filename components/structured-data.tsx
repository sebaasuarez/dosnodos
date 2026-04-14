import { type Language, translations } from "@/lib/i18n"

interface StructuredDataProps {
  language: Language
}

export function StructuredData({ language }: StructuredDataProps) {
  const t = translations[language]

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://dosnodos.com.co/#organization",
    "name": "Dos Nodos",
    "alternateName": "Agencia Dos Nodos",
    "url": "https://dosnodos.com.co",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dosnodos.com.co/logo-dosnodos.png",
      "width": "512",
      "height": "512"
    },
    "image": "https://dosnodos.com.co/og-image.png",
    "description": "Agencia de desarrollo y transformación digital fundada por desarrolladores. Conectamos tecnología con personas a través de software robusto, IA y performance media.",
    "founder": [
      {
        "@type": "Person",
        "name": "Sebastian Suarez"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "El Poblado",
      "addressLocality": "Medellín",
      "addressRegion": "Antioquia",
      "postalCode": "050021",
      "addressCountry": "CO"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+573127344026",
      "contactType": "sales",
      "areaServed": "Worldwide",
      "availableLanguage": ["Spanish", "English", "Portuguese"]
    },
    "sameAs": [
      "https://wa.me/573127344026",
      "https://linkedin.com/company/dosnodos",
      "https://github.com/dosnodos"
    ]
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://dosnodos.com.co/#service",
    "name": "Dos Nodos - Desarrollo & Transformación Digital",
    "image": "https://dosnodos.com.co/og-image.png",
    "priceRange": "$$",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.2442,
      "longitude": -75.5812
    },
    "url": "https://dosnodos.com.co",
    "telephone": "+573127344026",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    }
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://dosnodos.com.co/#website",
    "url": "https://dosnodos.com.co",
    "name": "Dos Nodos",
    "publisher": { "@id": "https://dosnodos.com.co/#organization" },
    "inLanguage": language
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  )
}

