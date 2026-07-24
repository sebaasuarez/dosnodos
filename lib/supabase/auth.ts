import "server-only"
import { redirect } from "next/navigation"
import { createServerSupabase } from "./server"

/**
 * Devuelve el usuario autenticado o redirige a login.
 * Usar al inicio de las páginas y acciones del admin.
 */
export async function requireUser() {
  const supabase = await createServerSupabase()
  if (!supabase) redirect("/admin/login")

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/admin/login")
  return { supabase, user }
}
