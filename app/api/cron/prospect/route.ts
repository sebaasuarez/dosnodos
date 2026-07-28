import { type NextRequest, NextResponse } from "next/server"
import {
  BUSQUEDAS_POR_DEFECTO,
  CIUDAD_POR_DEFECTO,
  correrProspeccion,
} from "@/lib/prospecting/engine"

/**
 * Prospección diaria.
 *
 * Vercel Cron la llama con la cabecera `Authorization: Bearer $CRON_SECRET`.
 * Sin ese secreto la ruta responde 401: si quedara abierta, cualquiera podría
 * disparar corridas y quemar la cuota de Apify.
 *
 * El horario vive en vercel.json y está en UTC: `0 14 * * 1-6` son las 9:00 de
 * Bogotá. Escrito como 9 se ejecutaba a las 4 de la madrugada.
 */

export const dynamic = "force-dynamic"
// Cada búsqueda pide diagnósticos a la IA; el máximo de Vercel para funciones
// serverless en el plan Pro son 300 segundos.
export const maxDuration = 300

function autorizado(req: NextRequest): boolean {
  const secreto = process.env.CRON_SECRET
  if (!secreto) return false
  const cabecera = req.headers.get("authorization")
  return cabecera === `Bearer ${secreto}`
}

export async function GET(req: NextRequest) {
  if (!autorizado(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  // Una categoría por día, rotando. Repartir la carga evita agotar el tiempo
  // de la función y reparte también el gasto de Apify a lo largo de la semana.
  const dia = new Date().getUTCDay()
  const consulta = BUSQUEDAS_POR_DEFECTO[dia % BUSQUEDAS_POR_DEFECTO.length]

  try {
    const r = await correrProspeccion({
      consulta,
      ciudad: CIUDAD_POR_DEFECTO,
      limite: 20,
      trigger: "cron",
    })
    return NextResponse.json({ ok: true, ...r })
  } catch (e) {
    const mensaje = e instanceof Error ? e.message : String(e)
    console.error("Prospección:", mensaje)
    return NextResponse.json({ ok: false, error: mensaje }, { status: 500 })
  }
}
