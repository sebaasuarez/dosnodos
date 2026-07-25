"use client"

import { useEffect } from "react"
import { trackViewService } from "@/lib/gtm"
import type { Language } from "@/lib/i18n"

/**
 * Dispara `dn_view_service` al abrir una página de servicio.
 * Va en un componente cliente porque la página es un server component.
 */
export function TrackServiceView({
  id,
  name,
  category,
  language,
}: {
  id: string
  name: string
  category: string
  language: Language
}) {
  useEffect(() => {
    trackViewService({ id, name, category, language })
  }, [id, name, category, language])

  return null
}
