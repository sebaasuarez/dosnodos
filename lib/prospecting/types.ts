/** Un negocio tal como sale de la fuente, antes de puntuarlo. */
export interface NegocioCrudo {
  nombre: string
  telefono?: string | null
  sitioWeb?: string | null
  direccion?: string | null
  ciudad?: string | null
  categoria?: string | null
  placeId?: string | null
  mapsUrl?: string | null
  calificacion?: number | null
  resenas?: number | null
  /** Perfiles sociales detectados en la ficha. */
  redes?: string[]
}

/** Señales que abren o cierran la oportunidad comercial. */
export interface Senales {
  tieneSitioWeb: boolean
  tieneWhatsapp: boolean
  tieneRedes: boolean
}

export interface Puntaje {
  total: number
  /** Aporte de cada criterio, para poder explicar el número en el panel. */
  desglose: Record<string, number>
}

export interface Diagnostico {
  resumen: string
  servicioRecomendado: string
  /** true si lo escribió un modelo; false si salió del motor de reglas. */
  porIa: boolean
}

export interface ResultadoCorrida {
  modo: "apify" | "simulado"
  consulta: string
  ciudad: string
  encontrados: number
  insertados: number
  duplicados: number
  enriquecidos: number
  /** Rechazados por la base. Debería ser 0. */
  descartados: number
}
