import "server-only"

/**
 * Catálogo de la landing de soluciones Hostinger.
 *
 * Una sola fuente para las necesidades, el producto que les corresponde y lo
 * que hace Dos Nodos encima. El selector, las tarjetas de solución y el
 * mensaje de WhatsApp leen de aquí, así que la recomendación que ve el
 * visitante y la que llega al CRM no pueden contradecirse.
 */

/** Slugs verificados contra el storefront colombiano en septiembre de 2026. */
export const HOSTINGER_BASE = "https://www.hostinger.com/co"

export type ProductoId =
  | "hosting-web"
  | "cloud-hosting"
  | "vps-servidor-web"
  | "correo-corporativo"
  | "email-marketing"
  | "ai-builder"
  | "hostinger-agent"
  | "comprar-dominio"

export interface Producto {
  id: ProductoId
  nombre: string
  /** Qué entrega Hostinger. Sin precios: cambian por país, promoción y renovación. */
  aporta: string
}

export const PRODUCTOS: Record<ProductoId, Producto> = {
  "hosting-web": {
    id: "hosting-web",
    nombre: "Hosting web",
    aporta: "El servidor donde vive el sitio, con SSL y respaldos.",
  },
  "cloud-hosting": {
    id: "cloud-hosting",
    nombre: "Cloud hosting",
    aporta: "Recursos dedicados para aguantar más tráfico sin ponerse lento.",
  },
  "vps-servidor-web": {
    id: "vps-servidor-web",
    nombre: "VPS",
    aporta: "Un servidor propio con acceso completo para correr lo que necesites.",
  },
  "correo-corporativo": {
    id: "correo-corporativo",
    nombre: "Correo empresarial",
    aporta: "Buzones con tu propio dominio, sin publicidad.",
  },
  "email-marketing": {
    id: "email-marketing",
    nombre: "Email marketing",
    aporta: "Envíos masivos y listas desde el mismo panel.",
  },
  "ai-builder": {
    id: "ai-builder",
    nombre: "AI Website Builder",
    aporta: "Un constructor asistido para publicar rápido una primera versión.",
  },
  "hostinger-agent": {
    id: "hostinger-agent",
    nombre: "Agentes de IA",
    aporta: "Agentes que responden y ejecutan tareas sobre tu información.",
  },
  "comprar-dominio": {
    id: "comprar-dominio",
    nombre: "Dominios",
    aporta: "El nombre de tu negocio en internet, con DNS administrable.",
  },
}

export type NecesidadId =
  | "primera-pagina"
  | "tienda"
  | "migrar"
  | "rendimiento"
  | "correo"
  | "vps"
  | "automatizar"
  | "varios-sitios"
  | "ya-compre"

export interface Necesidad {
  id: NecesidadId
  /** Cómo lo diría el visitante, no cómo lo diría un técnico. */
  titulo: string
  producto: ProductoId
  /** Lo que Dos Nodos hace encima del producto. Es la venta. */
  implementamos: string[]
}

export const NECESIDADES: Necesidad[] = [
  {
    id: "primera-pagina",
    titulo: "Crear mi primera página",
    producto: "hosting-web",
    implementamos: [
      "Organizamos qué decir y en qué orden",
      "Diseñamos y desarrollamos el sitio",
      "Conectamos dominio, SSL y WhatsApp",
      "Dejamos la medición andando",
    ],
  },
  {
    id: "tienda",
    titulo: "Crear una tienda virtual",
    producto: "hosting-web",
    implementamos: [
      "Montamos la tienda y el catálogo",
      "Configuramos pagos y checkout",
      "Medimos qué se vende y qué se abandona",
      "Automatizamos la post-venta inicial",
    ],
  },
  {
    id: "migrar",
    titulo: "Migrar un sitio que ya tengo",
    producto: "hosting-web",
    implementamos: [
      "Movemos archivos y base de datos",
      "Trasladamos DNS, SSL y correos sin perder mensajes",
      "Validamos que el SEO no se caiga",
      "Probamos antes de apuntar el dominio",
    ],
  },
  {
    id: "rendimiento",
    titulo: "Mejorar velocidad y capacidad",
    producto: "cloud-hosting",
    implementamos: [
      "Diagnosticamos qué está frenando el sitio",
      "Migramos a la capacidad adecuada",
      "Optimizamos caché, imágenes y consultas",
      "Dejamos monitoreo para saber si vuelve a pasar",
    ],
  },
  {
    id: "correo",
    titulo: "Configurar correo empresarial",
    producto: "correo-corporativo",
    implementamos: [
      "Configuramos el dominio y los registros DNS",
      "Creamos las cuentas del equipo",
      "Migramos el correo viejo sin perder historial",
      "Lo dejamos andando en celulares y computadores",
    ],
  },
  {
    id: "vps",
    titulo: "Implementar un VPS",
    producto: "vps-servidor-web",
    implementamos: [
      "Configuramos el servidor y lo aseguramos",
      "Montamos Docker, Nginx y SSL",
      "Dejamos el despliegue documentado",
      "Configuramos respaldos y monitoreo",
    ],
  },
  {
    id: "automatizar",
    titulo: "Automatizar procesos o usar IA",
    producto: "hostinger-agent",
    implementamos: [
      "Definimos qué tarea se automatiza y con qué datos",
      "Montamos n8n y los flujos",
      "Conectamos formularios, CRM y WhatsApp",
      "Probamos y ajustamos con uso real",
    ],
  },
  {
    id: "varios-sitios",
    titulo: "Administro varios sitios de clientes",
    // Hostinger no publica un producto de agencias en el storefront
    // colombiano; lo que de verdad usa una agencia es capacidad, así que la
    // recomendación honesta es cloud en vez de un enlace roto.
    producto: "cloud-hosting",
    implementamos: [
      "Ordenamos accesos y entornos por cliente",
      "Migramos los sitios que haga falta",
      "Estandarizamos respaldos y actualizaciones",
      "Damos soporte técnico continuo",
    ],
  },
  {
    id: "ya-compre",
    titulo: "Ya compré Hostinger y necesito ayuda",
    producto: "hosting-web",
    implementamos: [
      "Revisamos qué quedó a medias",
      "Terminamos dominio, SSL y correo",
      "Publicamos lo que falte",
      "Te explicamos cómo administrarlo",
    ],
  },
]

export function necesidadPorId(id: string): Necesidad | undefined {
  return NECESIDADES.find((n) => n.id === id)
}

/**
 * Arma el enlace a un producto conservando el código de referido.
 *
 * El código viaja como parámetro y sobrevive las redirecciones de Hostinger,
 * que fue verificado producto por producto. No se añaden parámetros propios:
 * el programa no documenta sub-ids y meter parámetros de más arriesga la
 * atribución. El clic se mide de este lado, en el dataLayer.
 */
export function enlaceProducto(referralUrl: string | null, producto?: ProductoId): string | null {
  if (!referralUrl?.trim()) return null
  let url: URL
  try {
    url = new URL(referralUrl)
  } catch {
    return null
  }
  if (!producto) return url.toString()

  const base = new URL(`${HOSTINGER_BASE}/${producto}`)
  // Se conservan los parámetros del enlace del socio, que es donde vive el
  // REFERRALCODE.
  url.searchParams.forEach((valor, clave) => base.searchParams.set(clave, valor))
  return base.toString()
}
