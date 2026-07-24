import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Panel · Dos Nodos",
  robots: "noindex, nofollow",
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
