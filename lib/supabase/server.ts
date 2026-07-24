import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config"

/**
 * Cliente Supabase para Server Components / Server Actions / Route Handlers.
 * Usa cookies para mantener la sesión del admin. Devuelve null si no está
 * configurado (el sitio sigue funcionando con contenido estático).
 */
export async function createServerSupabase() {
  if (!isSupabaseConfigured) return null

  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // Llamado desde un Server Component: se ignora (el middleware refresca la sesión).
        }
      },
    },
  })
}
