"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { signOut } from "@/app/admin/actions"

const NAV = [
  { href: "/admin", label: "Inicio", exact: true },
  { href: "/admin/leads", label: "Leads · CRM" },
  { href: "/admin/projects", label: "Proyectos" },
  { href: "/admin/reviews", label: "Reseñas" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/tracking", label: "Tracking & Config" },
]

export function AdminShell({ email, children }: { email?: string; children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#F6F5FC] text-ink md:grid md:grid-cols-[240px_1fr]">
      <aside className="flex flex-col gap-4 border-b border-[#E4E1F0] bg-ink px-4 py-5 md:border-b-0 md:border-r">
        <Link href="/admin" className="flex items-center gap-2">
          <Image src="/dosnodos-logo.png" alt="Dos Nodos" width={130} height={26} className="dn-logo-white h-[26px] w-auto" />
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-[.14em] text-[#807CA0]">Panel</span>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-[14px] transition-colors",
                  active
                    ? "bg-white/[0.08] font-semibold text-white [border-left:3px_solid_#9333EA] pl-[9px]"
                    : "text-[#A29FBE] hover:bg-white/[0.05] hover:text-white",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto flex flex-col gap-2 border-t border-[#2A2542] pt-4">
          {email && <span className="truncate text-[12px] text-[#A29FBE]">{email}</span>}
          <form action={signOut}>
            <button
              type="submit"
              className="w-full rounded-lg border border-[#2A2542] px-3 py-2 text-[13px] text-[#ECEAF7] transition-colors hover:bg-white/[0.06]"
            >
              Cerrar sesión
            </button>
          </form>
          <Link href="/" className="text-[12px] text-[#807CA0] hover:text-[#A29FBE]">
            ← Ver sitio público
          </Link>
        </div>
      </aside>

      <main className="p-5 md:p-8">{children}</main>
    </div>
  )
}
