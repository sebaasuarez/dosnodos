"use client"

import AnimatedSection from "@/components/animated-section"
import { type Language, type Translation } from "@/lib/i18n"
import type { Illustration, Project } from "@/lib/types"

interface ProjectsProps {
  t: Translation
  rows?: Project[] | null
  lang?: Language
}

const mono = "'IBM Plex Mono', var(--font-plex-mono), monospace"

const IllustrationQuote = (
  <svg viewBox="0 0 200 92" width="180" fill="none" aria-hidden>
    <rect x="24" y="14" width="104" height="66" rx="9" fill="#fff" stroke="#241F3A" strokeWidth="1.6" />
    <line x1="38" y1="34" x2="104" y2="34" stroke="#241F3A" strokeWidth="1.6" />
    <line x1="38" y1="48" x2="116" y2="48" stroke="#241F3A" strokeWidth="1.6" />
    <line x1="38" y1="62" x2="86" y2="62" stroke="#9333EA" strokeWidth="2.2" />
    <circle cx="156" cy="47" r="20" fill="#9333EA" />
    <text x="156" y="52" textAnchor="middle" style={{ fontFamily: mono, fontSize: 11, fontWeight: 600 }} fill="#fff">
      40s
    </text>
  </svg>
)

const IllustrationStore = (
  <svg viewBox="0 0 200 92" width="180" fill="none" aria-hidden>
    <rect x="46" y="8" width="72" height="76" rx="10" fill="#fff" stroke="#241F3A" strokeWidth="1.6" />
    <rect x="58" y="20" width="48" height="30" rx="5" fill="#2563EB" />
    <rect x="140" y="18" width="38" height="56" rx="8" fill="#E9E6FB" stroke="#241F3A" strokeWidth="1.6" />
    <text x="159" y="52" textAnchor="middle" style={{ fontFamily: mono, fontSize: 14, fontWeight: 600 }} fill="#7C22CE">
      $
    </text>
  </svg>
)

const IllustrationSchedule = (
  <svg viewBox="0 0 200 92" width="180" fill="none" aria-hidden>
    <rect x="30" y="16" width="90" height="62" rx="9" fill="#fff" stroke="#241F3A" strokeWidth="1.6" />
    <line x1="44" y1="34" x2="106" y2="34" stroke="#241F3A" strokeWidth="1.6" />
    <rect x="44" y="46" width="16" height="16" rx="3" fill="#2563EB" />
    <rect x="66" y="46" width="16" height="16" rx="3" fill="#E9E6FB" stroke="#241F3A" strokeWidth="1.4" />
    <circle cx="158" cy="47" r="20" fill="#2563EB" />
    <path d="M150 47l5 5 10-11" stroke="#fff" strokeWidth="2.6" fill="none" />
  </svg>
)

const ILLUSTRATIONS: Record<Illustration, React.ReactNode> = {
  quote: IllustrationQuote,
  store: IllustrationStore,
  schedule: IllustrationSchedule,
}

interface CardData {
  illustration: Illustration
  tag: string
  title: string
  description: string
  resultLabel: string
  result: string
}

function ProjectCard({ item, delay }: { item: CardData; delay: number }) {
  return (
    <AnimatedSection animation="fadeInUp" delay={delay} className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[#E4E1F0] bg-white">
        <div className="flex justify-center border-b border-[#E4E1F0] bg-surface-3 p-[26px]">
          {ILLUSTRATIONS[item.illustration] ?? IllustrationQuote}
        </div>
        <div className="flex flex-1 flex-col gap-2.5 p-[22px]">
          <span className="font-mono text-[11px] uppercase tracking-[.1em] text-brand-cta">{item.tag}</span>
          <h3 className="text-[19px] font-semibold">{item.title}</h3>
          <p className="flex-1 text-[14px] leading-[1.5] text-[#5A5570]">{item.description}</p>
          <div className="flex items-center justify-between border-t border-dashed border-[#E4E1F0] pt-3 font-mono text-[13px]">
            <span className="text-[#6A667E]">{item.resultLabel}</span>
            <b className="text-brand-cta">{item.result}</b>
          </div>
        </div>
      </article>
    </AnimatedSection>
  )
}

function tr(row: Project, lang: string, field: "tag" | "title" | "description" | "result_label" | "result"): string {
  return row.i18n?.[lang]?.[field] ?? (row[field] as string | null) ?? ""
}

export function Projects({ t, rows, lang = "es" }: ProjectsProps) {
  const items: CardData[] =
    rows && rows.length
      ? rows.map((r) => ({
          illustration: r.illustration,
          tag: tr(r, lang, "tag"),
          title: tr(r, lang, "title"),
          description: tr(r, lang, "description"),
          resultLabel: tr(r, lang, "result_label") || t.projects.items.distribuidora.resultLabel,
          result: tr(r, lang, "result"),
        }))
      : [
          { illustration: "quote", ...t.projects.items.distribuidora },
          { illustration: "store", ...t.projects.items.cosmetica },
          { illustration: "schedule", ...t.projects.items.clinica },
        ]

  return (
    <section id="casos" className="border-y border-[#EDEAF6] bg-surface-2">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-[clamp(24px,4vw,40px)] px-[clamp(20px,5vw,40px)] py-[clamp(56px,8vw,96px)]">
        <AnimatedSection animation="fadeInUp">
          <div className="flex max-w-[60ch] flex-col gap-3">
            <span className="font-mono text-[12px] uppercase tracking-[.14em] text-brand-cta">
              {t.projects.eyebrow}
            </span>
            <h2 className="text-[clamp(28px,4.4vw,42px)] font-semibold leading-[1.08] tracking-[-0.03em]">
              {t.projects.title}
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {items.map((item, i) => (
            <ProjectCard key={item.title + i} item={item} delay={60 + i * 60} />
          ))}
        </div>
      </div>
    </section>
  )
}
