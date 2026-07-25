import Link from "next/link"
import { type Language, translations } from "@/lib/i18n"
import { SERVICES, homePath, servicePath, shortDescription } from "@/lib/services-content"

const CATEGORY_ORDER = ["web", "software", "growth"] as const

export function ServicesIndex({ lang }: { lang: Language }) {
  const t = translations[lang]
  const sp = t.servicePage

  return (
    <>
      <section
        className="border-b border-[#EDEAF6]"
        style={{
          background:
            "radial-gradient(620px 300px at 12% 0%, rgba(147,51,234,.12), transparent 66%), radial-gradient(660px 320px at 88% 8%, rgba(37,99,235,.12), transparent 68%)",
        }}
      >
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-[clamp(20px,5vw,40px)] py-[clamp(48px,7vw,84px)]">
          <nav aria-label="breadcrumb" className="font-mono text-[12px] text-[#6A667E]">
            <Link href={homePath(lang)} className="transition-colors hover:text-brand-cta">
              {sp.breadcrumbHome}
            </Link>
            <span className="mx-2">/</span>
            <span>{sp.breadcrumbServices}</span>
          </nav>
          <h1 className="max-w-[24ch] text-[clamp(30px,5vw,50px)] font-semibold leading-[1.06] tracking-[-0.03em]">
            {sp.servicesTitle}
          </h1>
          <p className="max-w-[62ch] text-[17.5px] leading-[1.6] text-[#5A5570]">{sp.servicesSubtitle}</p>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1180px] flex-col gap-[clamp(32px,5vw,56px)] px-[clamp(20px,5vw,40px)] py-[clamp(48px,7vw,80px)]">
        {CATEGORY_ORDER.map((cat, catIndex) => {
          const category = t.services.categories[catIndex]
          const items = SERVICES.filter((s) => s.category === cat)
          return (
            <div key={cat} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3.5">
                  <span className="inline-flex items-center gap-2.5 whitespace-nowrap font-mono text-[12px] uppercase tracking-[.14em] text-brand-cta">
                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue" />
                    {category.eyebrow}
                  </span>
                  <span className="h-px min-w-[24px] flex-1 bg-[#EDEAF6]" />
                </div>
                <h2 className="text-[clamp(21px,2.6vw,26px)] font-semibold tracking-[-0.02em]">
                  {category.title}
                </h2>
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(258px,1fr))] gap-4">
                {items.map((s) => (
                  <Link
                    key={s.id}
                    href={servicePath(lang, s)}
                    className="group flex flex-col gap-2.5 rounded-[20px] border border-[#E4E1F0] bg-white p-6 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[#CDB8EA] hover:shadow-[0_18px_38px_-30px_rgba(124,34,206,.5)]"
                  >
                    <h3 className="text-[18px] font-semibold leading-snug">{s.h1[lang]}</h3>
                    <p className="text-[14px] leading-[1.5] text-[#5A5570]">{shortDescription(s, lang)}</p>
                    <span className="mt-auto pt-2 font-mono text-[12px] text-brand-cta">
                      {sp.seeService} →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      <section className="relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(480px 240px at 14% 0%, rgba(147,51,234,.22), transparent 62%), radial-gradient(500px 260px at 88% 100%, rgba(37,99,235,.2), transparent 64%)",
          }}
        />
        <div className="relative mx-auto flex max-w-[860px] flex-col items-center gap-4 px-[clamp(20px,5vw,40px)] py-[clamp(48px,7vw,80px)] text-center">
          <h2 className="text-[clamp(26px,4vw,40px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#ECEAF7]">
            {sp.ctaTitle}
          </h2>
          <p className="max-w-[48ch] text-[16.5px] leading-[1.55] text-[#A29FBE]">{sp.ctaSubtitle}</p>
          <Link
            href={`${homePath(lang)}#contacto`}
            className="mt-1 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-cta to-brand-blue px-[26px] py-[14px] text-[16px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(124,34,206,.65)] transition-transform hover:-translate-y-px"
          >
            {sp.ctaButton} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
