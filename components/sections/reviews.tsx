"use client"

import AnimatedSection from "@/components/animated-section"
import { type Translation } from "@/lib/i18n"

interface ReviewsProps {
  t: Translation
}

function ReviewCard({
  item,
  delay,
}: {
  item: Translation["reviews"]["items"]["diana"]
  delay: number
}) {
  return (
    <AnimatedSection animation="fadeInUp" delay={delay} className="h-full">
      <figure className="flex h-full flex-col gap-3.5 rounded-[18px] border border-[#E4E1F0] bg-white p-[26px]">
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
    </AnimatedSection>
  )
}

export function Reviews({ t }: ReviewsProps) {
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

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          <ReviewCard item={t.reviews.items.diana} delay={60} />
          <ReviewCard item={t.reviews.items.mateo} delay={120} />
          <ReviewCard item={t.reviews.items.laura} delay={180} />
        </div>
      </div>
    </section>
  )
}
