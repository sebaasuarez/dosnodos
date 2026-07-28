import "server-only"
import { createAdminSupabase, createReadSupabase } from "@/lib/supabase/admin"

/**
 * Guard de consentimiento — Ley 1581 de 2012 (Habeas Data) y política de
 * WhatsApp Business.
 *
 * TODO envío saliente por WhatsApp debe pasar por acá. Es un punto único a
 * propósito: si el permiso se comprueba en cada lugar donde se manda un
 * mensaje, tarde o temprano alguien se salta uno.
 *
 * Un prospecto sacado de Google Maps nace en `sin_consentimiento` y NO se le
 * puede escribir. La conversación se abre cuando él escribe primero —por un
 * anuncio Click-to-WhatsApp o por la landing— y ahí queda registrado el
 * `escribio_primero`, que es lo que habilita responder.
 */

export type EstadoConsentimiento = "sin_consentimiento" | "pendiente" | "opt_in" | "opt_out"

export type MotivoBloqueo = "OPT_OUT" | "SIN_CONSENTIMIENTO" | "SIN_TELEFONO" | "FUERA_DE_HORARIO"

export type Veredicto =
  | { permitido: true; razon: "OPT_IN" | "ESCRIBIO_PRIMERO" }
  | { permitido: false; motivo: MotivoBloqueo; detalle: string }

/** Dos Nodos atiende de lunes a sábado; el domingo no se escribe. */
function dentroDeHorario(fecha = new Date()): boolean {
  const bogota = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bogota",
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(fecha)

  const dia = bogota.find((p) => p.type === "weekday")?.value ?? ""
  const hora = Number(bogota.find((p) => p.type === "hour")?.value ?? "0")

  if (dia === "Sun") return false
  return hora >= 8 && hora < 20
}

export interface LeadParaGuard {
  id: string
  phone: string | null
  consent: EstadoConsentimiento
  last_interaction: string | null
}

/**
 * ¿Se le puede escribir a este lead ahora mismo?
 *
 * La ventana de 24 h es la regla de WhatsApp: si el prospecto escribió en las
 * últimas 24 horas, se le puede responder libremente. Pasado ese plazo hace
 * falta una plantilla aprobada y consentimiento explícito.
 */
export function puedeRecibirWhatsapp(lead: LeadParaGuard, ahora = new Date()): Veredicto {
  if (!lead.phone?.trim()) {
    return { permitido: false, motivo: "SIN_TELEFONO", detalle: "El lead no tiene número." }
  }

  if (lead.consent === "opt_out") {
    return {
      permitido: false,
      motivo: "OPT_OUT",
      detalle: "Pidió no ser contactado. El bloqueo es permanente.",
    }
  }

  const escribioReciente =
    lead.last_interaction != null &&
    ahora.getTime() - new Date(lead.last_interaction).getTime() < 24 * 60 * 60 * 1000

  if (lead.consent !== "opt_in" && !escribioReciente) {
    return {
      permitido: false,
      motivo: "SIN_CONSENTIMIENTO",
      detalle:
        "Prospecto de fuente pública sin autorización. Debe escribir primero (anuncio Click-to-WhatsApp o landing) para poder responderle.",
    }
  }

  if (!dentroDeHorario(ahora)) {
    return {
      permitido: false,
      motivo: "FUERA_DE_HORARIO",
      detalle: "Fuera del horario de atención (lunes a sábado, 8:00–20:00 Bogotá).",
    }
  }

  return { permitido: true, razon: escribioReciente ? "ESCRIBIO_PRIMERO" : "OPT_IN" }
}

type EventoConsentimiento = "otorgado" | "revocado" | "solicitado" | "escribio_primero"

/**
 * Deja constancia del cambio de consentimiento y actualiza el lead.
 * Es la prueba que exige la ley si alguien reclama por qué se le escribió.
 */
export async function registrarConsentimiento(
  leadId: string,
  evento: EventoConsentimiento,
  opciones: { canal?: string; detalle?: string; ip?: string; userAgent?: string } = {},
): Promise<void> {
  const supabase = createAdminSupabase() ?? createReadSupabase()
  if (!supabase) return

  await supabase.from("consent_events").insert({
    lead_id: leadId,
    event: evento,
    channel: opciones.canal ?? null,
    detail: opciones.detalle ?? null,
    ip: opciones.ip ?? null,
    user_agent: opciones.userAgent ?? null,
  })

  const ahora = new Date().toISOString()
  if (evento === "otorgado") {
    await supabase
      .from("leads")
      .update({ consent: "opt_in", opt_in_at: ahora, consent_source: opciones.canal ?? null })
      .eq("id", leadId)
  } else if (evento === "revocado") {
    await supabase.from("leads").update({ consent: "opt_out", opt_out_at: ahora }).eq("id", leadId)
  } else if (evento === "escribio_primero") {
    // Escribir primero habilita la ventana de 24 h, pero NO equivale a un
    // opt-in permanente: si no autoriza explícitamente, pasada la ventana
    // vuelve a estar bloqueado.
    await supabase.from("leads").update({ last_interaction: ahora }).eq("id", leadId)
  } else if (evento === "solicitado") {
    await supabase.from("leads").update({ consent: "pendiente" }).eq("id", leadId)
  }
}
