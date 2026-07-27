"use client"

import AnimatedSection from "@/components/animated-section"
import { AutoCarousel } from "@/components/ui/auto-carousel"
import { type Language, type Translation } from "@/lib/i18n"
import type { Review } from "@/lib/types"

interface ReviewsProps {
  t: Translation
  rows?: Review[] | null
  lang?: Language
}

interface CardData {
  quote: string
  name: string
  role: string
  initials: string
}

function ReviewCard({ item }: { item: CardData }) {
  return (
    <figure className="flex h-full min-h-[230px] flex-col gap-3.5 rounded-[18px] border border-[#E4E1F0] bg-white p-[26px]">
      <div className="text-[14px] tracking-[1px] text-star" aria-label="5 de 5 estrellas">
        ★★★★★
      </div>
      <blockquote className="text-[16px] leading-[1.55]">“{item.quote}”</blockquote>
      <figcaption className="mt-auto flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-brand-purple to-brand-blue text-[14px] font-semibold text-white">
          {item.initials}
        </span>
        <span>
          <b className="block text-[14px]">{item.name}</b>
          <span className="text-[12.5px] text-[#6A667E]">{item.role}</span>
        </span>
      </figcaption>
    </figure>
  )
}

function tr(row: Review, lang: string, field: "quote" | "role"): string {
  return row.i18n?.[lang]?.[field] ?? (row[field] as string | null) ?? ""
}

export function Reviews({ t, rows, lang = "es" }: ReviewsProps) {
  const items: CardData[] =
    rows && rows.length
      ? rows.map((r) => ({
          quote: tr(r, lang, "quote"),
          name: r.name,
          role: tr(r, lang, "role"),
          initials: r.initials || r.name.slice(0, 2).toUpperCase(),
        }))
      : [t.reviews.items.diana, t.reviews.items.mateo, t.reviews.items.laura]

  return (
    <section id="resenas">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-[clamp(24px,4vw,40px)] px-[clamp(20px,5vw,40px)] py-[clamp(56px,8vw,96px)]">
        <AnimatedSection animation="fadeInUp">
          <div className="flex flex-wrap items-center gap-3.5">
            <span className="font-mono text-[12px] uppercase tracking-[.14em] text-brand-cta">
              {t.reviews.eyebrow}
            </span>
            <span className="h-px min-w-[40px] flex-1 bg-[#EDEAF6]" />
            <span className="text-[15px] tracking-[1px] text-star" aria-hidden>
              ★★★★★
            </span>
            <span className="text-[14px] text-[#6A667E]">{t.reviews.average}</span>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeInUp" delay={60}>
          <AutoCarousel label={t.reviews.eyebrow} lang={lang} interval={3000}>
            {items.map((item, i) => (
              <ReviewCard key={item.name + i} item={item} />
            ))}
          </AutoCarousel>
        </AnimatedSection>
      </div>
    </section>
  )
}
