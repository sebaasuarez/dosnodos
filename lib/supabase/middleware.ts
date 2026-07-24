import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config"

/**
 * Refresca la sesión del admin y protege /admin.
 * - Sin Supabase configurado: deja pasar (el admin mostrará instrucciones).
 * - /admin sin sesión: redirige a /admin/login.
 * - /admin/login con sesión: redirige al dashboard.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const path = request.nextUrl.pathname
  const isLogin = path === "/admin/login"

  if (!isSupabaseConfigured) {
    // Sin configurar: solo permitimos ver /admin (que renderiza el setup) y /admin/login.
    return response
  }

  const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        )
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && !isLogin) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    url.searchParams.set("redirect", path)
    return NextResponse.redirect(url)
  }

  if (user && isLogin) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin"
    url.searchParams.delete("redirect")
    return NextResponse.redirect(url)
  }

  return response
}
