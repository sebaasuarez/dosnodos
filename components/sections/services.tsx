"use client"

import Link from "next/link"
import AnimatedSection from "@/components/animated-section"
import { type Language, type ServiceId, type Translation } from "@/lib/i18n"
import { findServiceById, servicePath } from "@/lib/services-content"
import { trackServiceCardClick } from "@/lib/gtm"
import {
  AppWindow,
  CodeXml,
  LayoutTemplate,
  Palette,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Sparkles,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react"

interface ServicesProps {
  t: Translation
  lang: Language
}

/** Un icono por servicio, mapeado por id estable (no por índice). */
const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  "web-design": LayoutTemplate,
  ecommerce: ShoppingCart,
  shopify: ShoppingBag,
  "web-app": AppWindow,
  "mobile-app": Smartphone,
  "custom-dev": CodeXml,
  "ai-assistant": Sparkles,
  automation: Workflow,
  seo: TrendingUp,
  branding: Palette,
}

function Chip({ children, featured = false }: { children: React.ReactNode; featured?: boolean }) {
  return (
    <span
      className={
        featured
          ? "rounded-full border border-[#E4D4F7] bg-white px-2.5 py-1 font-mono text-[11px] text-brand-cta"
          : "rounded-full border border-[#E4E1F0] px-2.5 py-1 font-mono text-[11px] text-[#6A667E]"
      }
    >
      {children}
    </span>
  )
}

type ServiceItemT = Translation["services"]["categories"][number]["items"][number]

function ServiceCard({ item, delay, lang }: { item: ServiceItemT; delay: number; lang: Language }) {
  const Icon = SERVICE_ICONS[item.id]
  const featured = Boolean(item.badge)
  const content = findServiceById(item.id)
  const href = content ? servicePath(lang, content) : undefined

  const card = (
      <article
        className={`relative flex h-full flex-col gap-3.5 rounded-[20px] p-7 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 ${
          featured
            ? "border border-brand-purple shadow-[0_20px_44px_-30px_rgba(147,51,234,.6)]"
            : "border border-[#E4E1F0] bg-white hover:border-[#CDB8EA] hover:shadow-[0_18px_38px_-30px_rgba(124,34,206,.5)]"
        }`}
        style={featured ? { background: "linear-gradient(160deg,#fff,#F6F1FE)" } : undefined}
      >
        {item.badge && (
          <span className="absolute right-[18px] top-[18px] rounded-full bg-brand-purple px-2.5 py-1 font-mono text-[10px] tracking-[.1em] text-white">
            {item.badge}
          </span>
        )}
        <div
          className={`flex h-[46px] w-[46px] items-center justify-center rounded-xl ${
            featured ? "border border-[#E4D4F7] bg-white" : "border border-[#E4E1F0] bg-surface-3"
          }`}
        >
          <Icon className="h-6 w-6 text-brand-cta" strokeWidth={1.8} aria-hidden />
        </div>
        <h4 className="max-w-[22ch] text-[19px] font-semibold leading-snug tracking-[-0.01em]">{item.title}</h4>
        <p className={`text-[14.5px] leading-[1.5] ${featured ? "text-[#3A3550]" : "text-[#5A5570]"}`}>
          {item.description}
        </p>
        {item.chips.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {item.chips.map((chip) => (
              <Chip key={chip} featured={featured}>
                {chip}
              </Chip>
            ))}
          </div>
        )}
      </article>
  )

  return (
    <AnimatedSection animation="fadeInUp" delay={delay} className="h-full">
      {href ? (
        <Link
          href={href}
          onClick={() =>
            trackServiceCardClick({
              id: item.id,
              name: item.title,
              category: content?.category ?? "",
              language: lang,
            })
          }
          className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/50 focus-visible:ring-offset-2 rounded-[20px]">
          {card}
        </Link>
      ) : (
        card
      )}
    </AnimatedSection>
  )
}

export function Services({ t, lang }: ServicesProps) {
  return (
    <section id="servicios">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-[clamp(28px,4vw,44px)] px-[clamp(20px,5vw,40px)] py-[clamp(56px,8vw,96px)]">
        <AnimatedSection animation="fadeInUp">
          <div className="flex max-w-[60ch] flex-col gap-3">
            <span className="font-mono text-[12px] uppercase tracking-[.14em] text-brand-cta">
              {t.services.eyebrow}
            </span>
            <h2 className="text-[clamp(28px,4.4vw,42px)] font-semibold leading-[1.08] tracking-[-0.03em]">
              {t.services.title}{" "}
              <span className="font-serif italic font-normal">{t.services.titleAccent}</span>
            </h2>
            <p className="text-[17px] leading-[1.55] text-[#5A5570]">{t.services.subtitle}</p>
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-[clamp(32px,5vw,56px)]">
          {t.services.categories.map((category, catIndex) => (
            <div key={category.eyebrow} className="flex flex-col gap-5">
              <AnimatedSection animation="fadeInUp">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3.5">
                    <span className="inline-flex items-center gap-2.5 whitespace-nowrap font-mono text-[12px] uppercase tracking-[.14em] text-brand-cta">
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-blue" />
                      {category.eyebrow}
                    </span>
                    <span className="h-px min-w-[24px] flex-1 bg-[#EDEAF6]" />
                  </div>
                  <h3 className="text-[clamp(21px,2.6vw,26px)] font-semibold tracking-[-0.02em]">
                    {category.title}
                  </h3>
                  <p className="max-w-[62ch] text-[15px] leading-[1.55] text-[#5A5570]">
                    {category.description}
                  </p>
                </div>
              </AnimatedSection>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(258px,1fr))] gap-4">
                {category.items.map((item, i) => (
                  <ServiceCard key={item.id} item={item} lang={lang} delay={Math.min(catIndex * 30 + i * 60, 240)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
