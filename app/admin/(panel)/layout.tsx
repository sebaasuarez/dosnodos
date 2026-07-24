import type React from "react"
import { isSupabaseConfigured } from "@/lib/supabase/config"
import { requireUser } from "@/lib/supabase/auth"
import { AdminShell } from "@/components/admin/shell"
import { SetupNotice } from "@/components/admin/setup-notice"

export const dynamic = "force-dynamic"

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured) {
    return <SetupNotice />
  }
  const { user } = await requireUser()
  return <AdminShell email={user.email ?? undefined}>{children}</AdminShell>
}
