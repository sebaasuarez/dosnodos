export function SetupNotice() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-5 bg-[#F6F5FC] px-6 py-16 text-ink">
      <span className="font-mono text-[12px] uppercase tracking-[.14em] text-brand-cta">Panel · Configuración</span>
      <h1 className="text-3xl font-semibold tracking-[-0.02em]">Conecta Supabase para activar el panel</h1>
      <p className="text-[15px] leading-relaxed text-[#5A5570]">
        El sitio público funciona sin base de datos, pero el panel de administración y el CRM
        necesitan Supabase. Configura estas variables de entorno y aplica la migración incluida
        en <code className="rounded bg-white px-1.5 py-0.5 text-[13px]">supabase/migrations/</code>:
      </p>
      <pre className="overflow-x-auto rounded-xl border border-[#E4E1F0] bg-white p-4 text-[13px] leading-relaxed text-ink">
{`NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...`}
      </pre>
      <ol className="flex list-decimal flex-col gap-2 pl-5 text-[14px] text-[#5A5570]">
        <li>Crea un proyecto en Supabase y copia URL + anon key + service role key.</li>
        <li>Aplica la migración SQL (Supabase Studio → SQL, o la CLI).</li>
        <li>Crea un usuario admin en Authentication → Users.</li>
        <li>Define las variables de entorno y vuelve a desplegar.</li>
      </ol>
      <p className="text-[13px] text-[#6A667E]">
        Los detalles están en <code className="rounded bg-white px-1.5 py-0.5 text-[13px]">SETUP_INSTRUCTIONS.md</code>.
      </p>
    </div>
  )
}
