import type { MetadataRoute } from "next"
import { SITE, allUrls } from "@/lib/seo"

/** Home + índice de servicios + 10 servicios, en los tres idiomas. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return allUrls().map(({ path, priority }) => ({
    url: `${SITE}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: priority >= 0.9 ? "weekly" : "monthly",
    priority,
  }))
}
