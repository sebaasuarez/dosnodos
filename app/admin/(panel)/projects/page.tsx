import Link from "next/link"
import { requireUser } from "@/lib/supabase/auth"
import { PageHeader, Card } from "@/components/admin/ui"
import type { Project } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function ProjectsAdmin() {
  const { supabase } = await requireUser()
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })
  const projects = (data ?? []) as Project[]

  return (
    <>
      <PageHeader
        title="Proyectos"
        subtitle="Portafolio mostrado en el sitio. Agrega proyectos en curso o entregados."
        action={
          <Link
            href="/admin/projects/new"
            className="rounded-full bg-gradient-to-r from-brand-cta to-brand-blue px-4 py-2 text-[14px] font-semibold text-white"
          >
            + Nuevo proyecto
          </Link>
        }
      />

      <Card className="p-0">
        {projects.length === 0 ? (
          <p className="py-12 text-center text-[14px] text-[#6A667E]">Aún no hay proyectos.</p>
        ) : (
          <div className="flex flex-col divide-y divide-[#EDEAF6]">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/admin/projects/${p.id}`}
                className="flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-[#FAF9FE]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium">{p.title}</span>
                    {!p.published && (
                      <span className="rounded-full bg-[#F1E9FB] px-2 py-0.5 font-mono text-[10px] text-[#7C22CE]">Borrador</span>
                    )}
                  </div>
                  <div className="truncate text-[12px] text-[#6A667E]">
                    {p.tag} {p.result ? `· ${p.result}` : ""}
                  </div>
                </div>
                <span className="font-mono text-[12px] text-[#6A667E]">#{p.sort_order}</span>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </>
  )
}
