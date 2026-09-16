import { PREGUNTAS } from "@/lib/hostinger"
import { SITE } from "@/lib/seo"

/**
 * Datos estructurados de la landing.
 *
 * Service describe qué se ofrece, FAQPage deja que buscadores y motores de IA
 * citen respuestas concretas, y BreadcrumbList sitúa la página dentro del
 * sitio. No se incluye AggregateRating: no hay reseñas verificables asociadas
 * a esta landing y marcar una inventada es motivo de penalización.
 */
export function DatosHostinger() {
  const grafo = [
    {
      "@type": "Service",
      "@id": `${SITE}/hostinger#servicio`,
      name: "Implementación y acompañamiento sobre Hostinger",
      serviceType: "Implementación de infraestructura web",
      description:
        "Orientación para elegir el producto de Hostinger adecuado, y configuración, desarrollo, migración e integración sobre esa infraestructura.",
      provider: { "@id": `${SITE}/#organization` },
      areaServed: [{ "@type": "Country", name: "Colombia" }],
      availableLanguage: ["es", "en", "pt"],
      url: `${SITE}/hostinger`,
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/hostinger#faq`,
      mainEntity: PREGUNTAS.map((p) => ({
        "@type": "Question",
        name: p.q,
        acceptedAnswer: { "@type": "Answer", text: p.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE}/hostinger#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE },
        {
          "@type": "ListItem",
          position: 2,
          name: "Soluciones Hostinger",
          item: `${SITE}/hostinger`,
        },
      ],
    },
  ]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": grafo }),
      }}
    />
  )
}
