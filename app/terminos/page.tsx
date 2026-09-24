import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SITE } from "@/lib/seo"
import { POLITICA_VIGENCIA, RESPONSABLE } from "@/lib/legal"

const TITULO = "Términos y condiciones | Dos Nodos"
const DESCRIPCION =
  "Condiciones que regulan la contratación de los servicios de Dos Nodos: alcance, pagos, propiedad intelectual, garantía y responsabilidad."

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  alternates: { canonical: `${SITE}/terminos` },
  openGraph: { title: TITULO, description: DESCRIPCION, url: `${SITE}/terminos`, locale: "es_CO" },
}

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

export default function TerminosPage() {
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
          Legal · Colombia
        </p>
        <h1 className="mt-3 text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-.02em] text-ink">
          Términos y condiciones
        </h1>
        <p className="mt-3 text-[13.5px] text-[#6A667E]">
          Vigente desde el {POLITICA_VIGENCIA} · Aplica a los servicios de {RESPONSABLE.nombre}.
        </p>

        <H n="01">Qué regula este documento</H>
        <P>
          Estas condiciones regulan la relación entre {RESPONSABLE.nombre} y quien contrata sus
          servicios. Al aprobar una propuesta o iniciar un proyecto, aceptas estos términos. Si
          firmamos un contrato específico, ese contrato prevalece sobre lo que aquí se dice.
        </P>

        <H n="02">Nuestros servicios</H>
        <P>
          Dos Nodos ofrece diseño y desarrollo de sitios web, tiendas en línea, aplicaciones,
          automatización, asistentes con inteligencia artificial, integraciones, analítica,
          implementación de infraestructura y acompañamiento técnico. No incluimos, salvo acuerdo
          escrito, pauta publicitaria pagada, gestión de redes sociales, producción audiovisual ni
          servicios fuera de nuestro portafolio.
        </P>

        <H n="03">El alcance lo define la propuesta</H>
        <P>
          Antes de empezar, te enviamos una propuesta con el alcance, los entregables y el precio de
          tu proyecto. Ese documento es el que manda. Lo que quede por fuera de él —funciones
          nuevas, cambios de rumbo o solicitudes posteriores— se cotiza aparte y por escrito.
        </P>

        <H n="04">Precios y forma de pago</H>
        <P>
          Cada proyecto se cotiza según su alcance; los valores y las condiciones van en la
          propuesta, no en esta página, porque cambian de un caso a otro. Salvo acuerdo distinto,
          pedimos un anticipo del cincuenta por ciento (50%) para reservar el inicio y el saldo
          contra la entrega. Los pagos son por los medios que acordemos contigo.
        </P>

        <H n="05">Plazos de entrega</H>
        <P>
          Los tiempos dependen del alcance y se acuerdan en la propuesta. El plazo empieza cuando
          apruebas la propuesta y nos entregas la información, los accesos y los contenidos que
          necesitamos. Si esa entrega se demora, el plazo se corre en la misma medida.
        </P>

        <H n="06">Revisiones</H>
        <P>
          Cada proyecto incluye las rondas de revisión que indique su propuesta. Los ajustes que
          queden fuera del alcance acordado, o las solicitudes posteriores a la entrega, se cotizan
          por separado.
        </P>

        <H n="07">Propiedad intelectual</H>
        <P>
          Una vez recibido el pago total, los derechos sobre el contenido específico que
          desarrollamos para ti —textos, diseño y código a la medida— quedan a tu nombre para el uso
          comercial del proyecto entregado. Dos Nodos conserva sus componentes propios, librerías y
          conocimiento reutilizable, y el derecho de mostrar el trabajo en su portafolio, salvo que
          acordemos lo contrario. Tú garantizas tener los derechos sobre los materiales que nos
          entregas (logos, fotos, textos); cualquier reclamo de terceros por ellos es tu
          responsabilidad.
        </P>

        <H n="08">Productos de terceros (incluido Hostinger)</H>
        <P>
          Cuando un proyecto usa productos de terceros —hosting, dominios, correo, pasarelas de pago
          o herramientas como las de Hostinger— esos productos se contratan y se pagan directamente
          con el proveedor y quedan a tu nombre. Sus precios, renovaciones y condiciones los define
          el proveedor, no Dos Nodos. Nuestro servicio es la orientación, la configuración y la
          implementación sobre esos productos, y se cotiza aparte.
        </P>

        <H n="09">Hosting y dominio</H>
        <P>
          Podemos orientarte para contratar dominio y hosting, o publicar una primera versión en
          infraestructura de pruebas. Los costos de dominio y hosting en producción son tuyos, y la
          infraestructura queda a tu nombre al finalizar el proyecto.
        </P>

        <H n="10">Garantía y soporte</H>
        <P>
          Corregimos sin costo los errores propios de lo que entregamos durante los treinta (30)
          días siguientes a la publicación. Pasado ese plazo, o para cambios y mejoras nuevas,
          puedes contratar mantenimiento o acompañamiento con su propia tarifa.
        </P>

        <H n="11">Limitación de responsabilidad</H>
        <P>
          No garantizamos un volumen de ventas, visitas o conversiones, porque esos resultados
          dependen de factores fuera de nuestro servicio (tu producto, tu atención, tu inversión en
          publicidad). En la medida en que la ley lo permita, nuestra responsabilidad se limita al
          valor del proyecto contratado y no cubre daños indirectos ni lucro cesante.
        </P>

        <H n="12">Cancelación</H>
        <P>
          Puedes cancelar antes de la entrega. En ese caso, el anticipo no se reembolsa porque cubre
          el trabajo de diseño y planeación ya realizado. Dos Nodos puede terminar la relación si
          hay incumplimiento, maltrato al equipo o uso del servicio para fines ilegales.
        </P>

        <H n="13">Cambios a estos términos</H>
        <P>
          Podemos actualizar estos términos. La versión vigente al momento de contratar es la que
          aplica a tu proyecto, salvo que acordemos algo distinto por escrito.
        </P>

        <H n="14">Ley aplicable</H>
        <P>
          Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia
          se resolverá ante los jueces competentes de Medellín, Antioquia.
        </P>

        <H n="15">Contacto</H>
        <P>
          Escríbenos a{" "}
          <a href={`mailto:${RESPONSABLE.email}`} className="text-brand-cta underline">
            {RESPONSABLE.email}
          </a>{" "}
          o por WhatsApp al {RESPONSABLE.telefono}.
        </P>

        <div className="mt-12 rounded-[14px] border border-[#E4E1F0] bg-[#F9F8FD] p-5 text-[13.5px] leading-[1.6] text-[#5A5570]">
          Ver también nuestra{" "}
          <Link href="/privacidad" className="text-brand-cta underline">
            política de tratamiento de datos
          </Link>
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
