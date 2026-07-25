import type { MetadataRoute } from "next"

const SITE = "https://dosnodos.com.co"

/**
 * El sitio es de una sola página; los buscadores ignoran los fragmentos (#),
 * así que solo se declara la raíz. Al agregar rutas reales (blog, servicios
 * individuales) se añaden aquí.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ]
}
