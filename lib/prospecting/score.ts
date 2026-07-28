import type { NegocioCrudo, Puntaje, Senales } from "./types"

/**
 * Puntaje de oportunidad comercial, de 0 a 100.
 *
 * La lógica está invertida respecto a lo intuitivo: **mientras peor esté el
 * negocio digitalmente, más alto puntúa**, porque más tiene para venderle Dos
 * Nodos. Un restaurante con 400 reseñas y sin página web es el mejor prospecto
 * posible: le sobra demanda y le falta justo lo que vendemos.
 */

/** Un teléfono colombiano que empieza en 3 es celular, o sea WhatsApp probable. */
export function pareceWhatsapp(telefono?: string | null): boolean {
  if (!telefono) return false
  const d = telefono.replace(/\D/g, "")
  return /^(57)?3\d{9}$/.test(d)
}

export function detectarSenales(n: NegocioCrudo): Senales {
  return {
    tieneSitioWeb: Boolean(n.sitioWeb?.trim()),
    tieneWhatsapp: pareceWhatsapp(n.telefono),
    tieneRedes: (n.redes?.length ?? 0) > 0,
  }
}

export function puntuar(n: NegocioCrudo, s: Senales): Puntaje {
  const d: Record<string, number> = {}

  // La carencia principal: sin web es todo lo que vendemos.
  d["Sin sitio web"] = s.tieneSitioWeb ? 0 : 35

  // Sin poder contactarlo no hay negocio, por más oportunidad que tenga.
  d["Contactable por WhatsApp"] = s.tieneWhatsapp ? 20 : 0

  // Ya invierte en presencia digital: entiende el valor y tiene con qué pagar.
  d["Presencia en redes"] = s.tieneRedes ? 10 : 0

  // Demanda comprobada: las reseñas son la prueba de que el negocio vende.
  const r = n.resenas ?? 0
  d["Volumen de reseñas"] = r >= 200 ? 20 : r >= 80 ? 15 : r >= 25 ? 10 : r >= 5 ? 5 : 0

  // Un negocio bien calificado tiene producto; el problema es de alcance, no
  // de calidad. Ese es el que convierte.
  const c = n.calificacion ?? 0
  d["Buena calificación"] = c >= 4.5 ? 15 : c >= 4.0 ? 10 : c >= 3.5 ? 5 : 0

  const total = Math.min(
    100,
    Math.max(
      0,
      Object.values(d).reduce((a, b) => a + b, 0),
    ),
  )
  return { total, desglose: d }
}

/** Etiqueta de prioridad para el panel. */
export function prioridad(score: number): { label: string; tono: "alta" | "media" | "baja" } {
  if (score >= 70) return { label: "Alta", tono: "alta" }
  if (score >= 45) return { label: "Media", tono: "media" }
  return { label: "Baja", tono: "baja" }
}
