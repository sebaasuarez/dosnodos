import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import {
  SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_URL,
  isServiceConfigured,
  isSupabaseConfigured,
} from "./config"

/**
 * Cliente con service role (solo servidor). Usar únicamente en rutas/acciones
 * de servidor confiables (p. ej. insertar un lead). Nunca exponer al cliente.
 */
export function createAdminSupabase(): SupabaseClient | null {
  if (!isServiceConfigured) return null
  return createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/**
 * Cliente anónimo de solo lectura (sin cookies). Para lecturas públicas del
 * sitio bajo RLS (contenido publicado + configuración).
 */
export function createReadSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null
  return createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
