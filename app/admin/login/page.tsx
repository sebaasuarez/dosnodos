"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { createBrowserSupabase } from "@/lib/supabase/client"

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}

function LoginForm() {
  const router = useRouter()
  const search = useSearchParams()
  const redirectTo = search.get("redirect") || "/admin"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const supabase = createBrowserSupabase()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!supabase) {
      setError("Supabase no está configurado. Revisa las variables de entorno.")
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError("Credenciales incorrectas.")
      return
    }
    router.replace(redirectTo)
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm rounded-2xl border border-[#2A2542] bg-ink-2 p-8">
        <Image
          src="/dosnodos-logo.png"
          alt="Dos Nodos"
          width={150}
          height={30}
          className="dn-logo-white mb-6 h-[30px] w-auto"
        />
        <h1 className="text-xl font-semibold text-[#ECEAF7]">Panel de administración</h1>
        <p className="mt-1 text-[13px] text-[#A29FBE]">Ingresa con tu cuenta del equipo.</p>

        <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
          {error && (
            <div className="rounded-[10px] border border-red-400/30 bg-red-500/15 px-3 py-2 text-[13px] text-red-200">
              {error}
            </div>
          )}
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-semibold text-[#ECEAF7]">Correo</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="rounded-[10px] border border-[#2A2542] bg-white/[0.04] px-3 py-2.5 text-[14px] text-[#ECEAF7] outline-none focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(147,51,234,.28)]"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-semibold text-[#ECEAF7]">Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="rounded-[10px] border border-[#2A2542] bg-white/[0.04] px-3 py-2.5 text-[14px] text-[#ECEAF7] outline-none focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(147,51,234,.28)]"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-gradient-to-r from-brand-cta to-brand-blue py-3 text-[15px] font-semibold text-white transition-transform hover:-translate-y-px disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  )
}
