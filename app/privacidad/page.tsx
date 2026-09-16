import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SITE } from "@/lib/seo"
import { POLITICA_VIGENCIA, RESPONSABLE, ENCARGADOS } from "@/lib/legal"

const TITULO = "Política de Tratamiento de Datos Personales | Dos Nodos"
const DESCRIPCION =
  "Cómo Dos Nodos recolecta, usa y protege tus datos personales, y cómo ejercer tus derechos conforme a la Ley 1581 de 2012 (Habeas Data)."

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: `${SITE}/privacidad` },
  openGraph: {
    title: TITULO,
    description: DESCRIPCION,
    url: `${SITE}/privacidad`,
    locale: "es_CO",
  },
}

/** Título de sección con su numeral, en el estilo editorial del sitio. */
function H({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <h2 className="mt-10 flex scroll-mt-24 items-baseline gap-3 text-[19px] font-semibold text-ink">
      <span className="font-mono text-[13px] text-brand-cta">{n}</span>
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 max-w-[70ch] text-[15px] leading-[1.65] text-[#3A3550]">{children}</p>
}

function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 flex max-w-[70ch] list-disc flex-col gap-1.5 pl-5 text-[15px] leading-[1.6] text-[#3A3550]">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  )
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#EDEAF6] bg-[#F9F8FD]">
        <div className="mx-auto max-w-[1180px] px-6 py-6">
          <Link href="/" className="inline-flex items-center" aria-label="Dos Nodos — inicio">
            <Image
              src="/dosnodos-logo.png"
              alt="Dos Nodos"
              width={150}
              height={30}
              priority
              className="h-[26px] w-auto object-contain"
            />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[820px] px-6 py-12 md:py-16">
        <p className="font-mono text-[11.5px] uppercase tracking-[.14em] text-[#6A667E]">
          Ley 1581 de 2012 · Habeas Data
        </p>
        <h1 className="mt-3 text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-.02em] text-ink">
          Política de Tratamiento de Datos Personales
        </h1>
        <p className="mt-3 text-[13.5px] text-[#6A667E]">
          Vigente desde el {POLITICA_VIGENCIA} · Aplica a {new URL(SITE).host},
          ventas.dosnodos.com.co y {new URL(SITE).host}/hostinger.
        </p>

        <H n="01">Quién es responsable de tus datos</H>
        <P>
          El responsable del tratamiento es {RESPONSABLE.nombre}, con domicilio en{" "}
          {RESPONSABLE.domicilio}. Puedes contactarnos en{" "}
          <a href={`mailto:${RESPONSABLE.email}`} className="text-brand-cta underline">
            {RESPONSABLE.email}
          </a>{" "}
          o por WhatsApp al {RESPONSABLE.telefono}.
        </P>

        <H n="02">Con qué base legal</H>
        <P>
          Tratamos tus datos conforme a la Ley 1581 de 2012, su Decreto reglamentario 1074 de 2015 y
          las demás normas colombianas sobre protección de datos personales. La autoridad de control
          es la Superintendencia de Industria y Comercio (SIC).
        </P>
        <P>
          Nuestro tratamiento se rige por los principios de la ley: legalidad, finalidad, libertad,
          veracidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad.
        </P>

        <H n="03">Qué datos recolectamos</H>
        <P>
          Solo los que necesitamos para atenderte. Cuando escribes por un formulario o por WhatsApp,
          recolectamos:
        </P>
        <UL
          items={[
            "Datos de contacto: nombre, empresa, correo, WhatsApp o teléfono.",
            "El contenido de tu mensaje y lo que nos cuentes de tu necesidad.",
            "Datos técnicos de navegación (páginas vistas, origen de la visita), a través de herramientas de analítica.",
          ]}
        />
        <P>
          No pedimos datos sensibles (salud, orientación, creencias, datos biométricos) ni datos de
          menores de edad. Si nos los envías por tu cuenta, los eliminaremos.
        </P>

        <H n="04">Para qué los usamos</H>
        <UL
          items={[
            "Responder tu solicitud y darte orientación o una cotización.",
            "Hacer seguimiento comercial mientras exista tu interés.",
            "Enviarte información relacionada con lo que nos pediste.",
            "Cumplir obligaciones legales y contables.",
            "Mejorar nuestros sitios con base en datos de navegación agregados.",
          ]}
        />
        <P>
          No vendemos tus datos ni los usamos para finalidades distintas a las que aquí declaramos.
        </P>

        <H n="05">Tu autorización</H>
        <P>
          Recogemos tu autorización cuando envías un formulario o nos escribes: en ese momento se te
          informa esta política y aceptas el tratamiento con las finalidades del punto 04. La
          autorización es libre y puedes revocarla cuando quieras (punto 07).
        </P>

        <H n="06">Tus derechos como titular</H>
        <P>Como titular de tus datos, la ley te reconoce el derecho a:</P>
        <UL
          items={[
            "Conocer, actualizar y rectificar tus datos.",
            "Solicitar prueba de la autorización que otorgaste.",
            "Ser informado del uso que les hemos dado.",
            "Presentar quejas ante la SIC por incumplimientos.",
            "Revocar la autorización y solicitar la supresión de tus datos.",
            "Acceder de forma gratuita a tus datos.",
          ]}
        />

        <H n="07">Cómo ejercer tus derechos</H>
        <P>
          Escríbenos a{" "}
          <a href={`mailto:${RESPONSABLE.email}`} className="text-brand-cta underline">
            {RESPONSABLE.email}
          </a>{" "}
          indicando qué quieres (conocer, actualizar, corregir, revocar o eliminar) y un dato que
          nos permita identificarte. Los plazos que fija la ley son:
        </P>
        <UL
          items={[
            "Consultas: respondemos en máximo 10 días hábiles. Si no alcanzamos, te avisamos antes de que se cumpla el plazo y resolvemos dentro de los 5 días hábiles siguientes.",
            "Reclamos: los resolvemos en máximo 15 días hábiles desde el día siguiente a su recibo. Si no alcanzamos, te explicamos por qué y no pasamos de 8 días hábiles más.",
          ]}
        />

        <H n="08">Con quién compartimos tus datos</H>
        <P>
          Para funcionar, algunos proveedores tratan tus datos por encargo nuestro y bajo nuestras
          instrucciones. Varios operan fuera de Colombia, así que al autorizar esta política aceptas
          esa transferencia internacional. No los usan para fines propios:
        </P>
        <UL items={ENCARGADOS.map((e) => `${e.nombre} (${e.pais}) — ${e.proposito}.`)} />

        <H n="09">Si te contactamos primero</H>
        <P>
          A veces identificamos negocios que podrían necesitar nuestros servicios a partir de
          información de fuentes públicas. Si es tu caso, tienes exactamente los mismos derechos de
          esta política: puedes pedir en cualquier momento que dejemos de contactarte y que
          eliminemos tus datos, y lo hacemos.
        </P>

        <H n="10">Cuánto tiempo los guardamos</H>
        <P>
          Conservamos tus datos mientras exista una relación o un interés comercial vigente, y
          después por el tiempo que exijan las obligaciones legales. Cuando ya no hay finalidad que
          los justifique, los eliminamos.
        </P>

        <H n="11">Cómo los protegemos</H>
        <P>
          Aplicamos medidas técnicas y administrativas razonables para proteger tus datos contra
          acceso no autorizado, pérdida o alteración. Ningún sistema es infalible; si ocurriera un
          incidente de seguridad que te afecte, actuaremos conforme a la ley y, cuando corresponda,
          informaremos a la SIC y a los titulares.
        </P>

        <H n="12">Cambios a esta política</H>
        <P>
          Si actualizamos esta política, publicaremos la nueva versión en esta página con su fecha
          de vigencia. Los cambios sustanciales se comunicarán por los medios disponibles antes de
          aplicarlos.
        </P>

        <div className="mt-12 rounded-[14px] border border-[#E4E1F0] bg-[#F9F8FD] p-5 text-[13.5px] leading-[1.6] text-[#5A5570]">
          ¿Dudas sobre tus datos? Escríbenos a{" "}
          <a href={`mailto:${RESPONSABLE.email}`} className="text-brand-cta underline">
            {RESPONSABLE.email}
          </a>
          . Volver al{" "}
          <Link href="/" className="text-brand-cta underline">
            inicio
          </Link>
          .
        </div>
      </main>
    </div>
  )
}
