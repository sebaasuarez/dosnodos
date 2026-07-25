import Link from "next/link"
import { type Language, translations } from "@/lib/i18n"
import {
  SERVICES,
  homePath,
  servicePath,
  servicesIndexPath,
  shortDescription,
  type ServiceContent,
} from "@/lib/services-content"

const SITE = "https://dosnodos.com.co"

function Check() {
  return (
    <span
      aria-hidden
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-brand-purple to-brand-blue"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

export function ServiceDetail({
  service,
  lang,
}: {
  service: ServiceContent
  lang: Language
}) {
  const t = translations[lang]
  const sp = t.servicePage
  const others = SERVICES.filter((s) => s.id !== service.id).slice(0, 3)
  const url = `${SITE}${servicePath(lang, service)}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.h1[lang],
        description: service.metaDescription[lang],
        serviceType: service.h1[lang],
        url,
        inLanguage: lang,
        provider: { "@type": "Organization", name: "Dos Nodos", url: SITE },
        areaServed: [
          { "@type": "Country", name: "Colombia" },
          { "@type": "Place", name: "Latinoamérica" },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        mainEntity: service.faq[lang].map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: { "@type": "Answer", text: q.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: sp.breadcrumbHome, item: `${SITE}${homePath(lang)}` },
          {
            "@type": "ListItem",
            position: 2,
            name: sp.breadcrumbServices,
            item: `${SITE}${servicesIndexPath(lang)}`,
          },
          { "@type": "ListItem", position: 3, name: service.h1[lang], item: url },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Encabezado */}
      <section
        className="relative border-b border-[#EDEAF6]"
        style={{
          background:
            "radial-gradient(620px 300px at 12% 0%, rgba(147,51,234,.12), transparent 66%), radial-gradient(660px 320px at 88% 8%, rgba(37,99,235,.12), transparent 68%)",
        }}
      >
        <div className="mx-auto flex max-w-[860px] flex-col gap-5 px-[clamp(20px,5vw,40px)] py-[clamp(48px,7vw,84px)]">
          <nav aria-label="breadcrumb" className="font-mono text-[12px] text-[#6A667E]">
            <Link href={homePath(lang)} className="transition-colors hover:text-brand-cta">
              {sp.breadcrumbHome}
            </Link>
            <span className="mx-2">/</span>
            <Link href={servicesIndexPath(lang)} className="transition-colors hover:text-brand-cta">
              {sp.breadcrumbServices}
            </Link>
          </nav>

          <h1 className="text-[clamp(30px,5vw,50px)] font-semibold leading-[1.06] tracking-[-0.03em]">
            {service.h1[lang]}
          </h1>
          <p className="max-w-[62ch] text-[17.5px] leading-[1.6] text-[#5A5570]">{service.intro[lang]}</p>

          <div className="flex flex-wrap gap-1.5">
            {service.chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-[#E4E1F0] bg-white px-2.5 py-1 font-mono text-[11px] text-[#6A667E]"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-1 flex flex-wrap gap-3">
            <Link
              href={`${homePath(lang)}#contacto`}
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-brand-cta to-brand-blue px-[24px] py-[13px] text-[15.5px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(124,34,206,.65)] transition-transform hover:-translate-y-px"
            >
              {sp.ctaButton} <span aria-hidden>→</span>
            </Link>
            <Link
              href={servicesIndexPath(lang)}
              className="inline-flex items-center rounded-full border border-[#E4E1F0] bg-white px-[24px] py-[13px] text-[15.5px] font-semibold text-ink transition-colors hover:bg-surface-2"
            >
              {sp.breadcrumbServices}
            </Link>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="mx-auto max-w-[860px] px-[clamp(20px,5vw,40px)] py-[clamp(44px,6vw,72px)]">
        <h2 className="mb-6 text-[clamp(24px,3.4vw,32px)] font-semibold tracking-[-0.02em]">
          {sp.benefitsTitle}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {service.bullets[lang].map((b) => (
            <li
              key={b.title}
              className="flex gap-3 rounded-[16px] border border-[#E4E1F0] bg-white p-5"
            >
              <Check />
              <div>
                <h3 className="text-[16px] font-semibold leading-snug">{b.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-[1.5] text-[#5A5570]">{b.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="border-y border-[#EDEAF6] bg-surface-2">
        <div className="mx-auto max-w-[860px] px-[clamp(20px,5vw,40px)] py-[clamp(44px,6vw,72px)]">
          <h2 className="mb-6 text-[clamp(24px,3.4vw,32px)] font-semibold tracking-[-0.02em]">
            {sp.faqTitle}
          </h2>
          <div className="overflow-hidden rounded-[20px] border border-[#E4E1F0] bg-white">
            {service.faq[lang].map((q, i) => (
              <details
                key={q.question}
                className="group border-b border-[#EDEAF6] last:border-b-0 [&_summary::-webkit-details-marker]:hidden"
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[clamp(18px,3vw,26px)] py-5 transition-colors hover:text-brand-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/50">
                  <h3 className="text-[16px] font-semibold leading-snug">{q.question}</h3>
                  <span
                    aria-hidden
                    className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E4E1F0] text-brand-cta transition-transform duration-200 group-open:rotate-45"
                  >
                    <span className="absolute h-[1.5px] w-[11px] rounded bg-current" />
                    <span className="absolute h-[11px] w-[1.5px] rounded bg-current" />
                  </span>
                </summary>
                <p className="px-[clamp(18px,3vw,26px)] pb-5 text-[15px] leading-[1.6] text-[#5A5570]">
                  {q.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Otros servicios */}
      <section className="mx-auto max-w-[1180px] px-[clamp(20px,5vw,40px)] py-[clamp(44px,6vw,72px)]">
        <h2 className="mb-6 text-[clamp(22px,3vw,28px)] font-semibold tracking-[-0.02em]">
          {sp.otherServices}
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(258px,1fr))] gap-4">
          {others.map((s) => (
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
      </section>

      {/* CTA final */}
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
