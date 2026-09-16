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

// ---------------------------------------------------------------------------
// Contenido de la landing
// ---------------------------------------------------------------------------

/** Lo que de verdad le pasa a quien contrata hosting sin acompañamiento. */
export const TROPIEZOS = [
  "Contratan un plan sin saber si les queda grande o pequeño",
  "El dominio queda comprado pero nunca apunta al sitio",
  "Publican a medias y el sitio se queda en «próximamente»",
  "Pierden correos durante la migración",
  "Nadie configuró respaldos hasta que hizo falta uno",
  "Compran un VPS y no saben por dónde entrar",
  "Tienen cinco herramientas que no se hablan entre sí",
  "Pagan cada mes por capacidad que no usan",
]

export interface Solucion {
  titulo: string
  /** El problema en las palabras del cliente. */
  problema: string
  resultado: string
  producto: ProductoId
}

export const SOLUCIONES: Solucion[] = [
  {
    titulo: "Sitios web y landing pages",
    problema: "Tienes el hosting pero no hay sitio, o el que hay no convence a nadie.",
    resultado: "Un sitio publicado, medible y que sí lleva a una conversación.",
    producto: "hosting-web",
  },
  {
    titulo: "Tiendas en línea",
    problema: "Quieres vender en línea y no sabes por dónde empezar con catálogo y pagos.",
    resultado: "Una tienda cobrando, con analítica para saber qué se vende.",
    producto: "hosting-web",
  },
  {
    titulo: "Migraciones",
    problema: "Quieres mover tu sitio y te da miedo perder correos o posicionamiento.",
    resultado: "Todo movido y verificado, sin caídas ni mensajes perdidos.",
    producto: "cloud-hosting",
  },
  {
    titulo: "Velocidad y capacidad",
    problema: "El sitio se pone lento justo cuando llega gente.",
    resultado: "Capacidad adecuada, tiempos medidos y monitoreo para no repetirlo.",
    producto: "cloud-hosting",
  },
  {
    titulo: "Correo empresarial",
    problema: "Sigues escribiéndoles a tus clientes desde una cuenta personal.",
    resultado: "Correo con tu dominio, andando en todos los dispositivos del equipo.",
    producto: "correo-corporativo",
  },
  {
    titulo: "VPS y aplicaciones",
    problema: "Necesitas correr algo propio y el servidor está en blanco.",
    resultado: "Servidor configurado, asegurado, documentado y con respaldos.",
    producto: "vps-servidor-web",
  },
  {
    titulo: "Automatización e IA",
    problema: "Tu equipo repite a mano tareas que podría hacer un flujo.",
    resultado: "Procesos que corren solos y te avisan cuando algo necesita a una persona.",
    producto: "hostinger-agent",
  },
  {
    titulo: "Dominios y DNS",
    problema: "Compraste el dominio y no sabes cómo conectarlo con lo demás.",
    resultado: "Dominio, subdominios, SSL y correo apuntando a donde deben.",
    producto: "comprar-dominio",
  },
]

/** El reparto de responsabilidades, que es el argumento central de la página. */
export const REPARTO = {
  hostinger: [
    "La infraestructura y el panel",
    "Hosting, cloud y VPS",
    "El dominio y el correo",
    "Sus propias herramientas",
    "El precio y la renovación",
  ],
  dosnodos: [
    "Entender qué necesitas de verdad",
    "Elegir el plan que corresponde",
    "Configurar, diseñar y desarrollar",
    "Migrar sin perder nada por el camino",
    "Conectar medición y automatizaciones",
    "Acompañarte después de publicar",
  ],
}

export const PASOS = [
  {
    n: "01",
    titulo: "Nos cuentas qué necesitas",
    texto: "Por WhatsApp o por el formulario. Sin costo.",
  },
  { n: "02", titulo: "Revisamos tu situación", texto: "Qué tienes hoy, qué falta y qué sobra." },
  {
    n: "03",
    titulo: "Te recomendamos la solución",
    texto: "Con argumentos, no con el plan más caro.",
  },
  {
    n: "04",
    titulo: "Contratas directamente",
    texto: "El producto queda a tu nombre, no al nuestro.",
  },
  {
    n: "05",
    titulo: "Lo implementamos",
    texto: "Configuración, desarrollo, migración e integraciones.",
  },
  {
    n: "06",
    titulo: "Validamos y acompañamos",
    texto: "Probamos, publicamos y seguimos disponibles.",
  },
]

export const PREGUNTAS: { q: string; a: string }[] = [
  {
    q: "¿Dos Nodos vende los planes de Hostinger?",
    a: "No. El producto lo contratas y lo pagas directamente con Hostinger, y queda a tu nombre. Nosotros somos socios del programa, así que podemos orientarte y llevarte al producto correcto, pero la relación comercial del hosting es tuya con ellos.",
  },
  {
    q: "¿El precio de Hostinger incluye la implementación?",
    a: "No. El precio de Hostinger cubre la infraestructura. El diagnóstico, la configuración, el diseño, el desarrollo, la migración y el acompañamiento son servicios de Dos Nodos y se cotizan aparte.",
  },
  {
    q: "¿Me pueden ayudar a elegir el plan?",
    a: "Es justo para lo que sirve esta página. Revisamos qué vas a publicar, cuánta gente esperas y qué necesitas integrar, y te decimos qué te sirve — incluso si es la opción más barata.",
  },
  {
    q: "Ya compré Hostinger y quedé a medias, ¿sirve igual?",
    a: "Sí, y es de los casos más comunes. Revisamos qué quedó sin terminar, completamos dominio, SSL y correo, publicamos lo que falte y te explicamos cómo administrarlo.",
  },
  {
    q: "¿Pueden migrar mi sitio actual?",
    a: "Sí. Movemos archivos, base de datos, DNS, SSL y correos, y validamos que el posicionamiento no se caiga. Probamos todo antes de apuntar el dominio, para que no haya ventana de caída.",
  },
  {
    q: "¿También configuran los correos?",
    a: "Sí. Dominio, registros DNS, cuentas del equipo y la migración del correo viejo para no perder el historial. Lo dejamos andando en computador y celular.",
  },
  {
    q: "¿Pueden administrar un VPS?",
    a: "Sí. Configuración del servidor, seguridad, Docker, Nginx, SSL, despliegues, respaldos y documentación para que no dependas de nosotros para entender tu propia infraestructura.",
  },
  {
    q: "¿Pueden instalar n8n u otra aplicación?",
    a: "Sí. n8n es de lo que más montamos, junto con los flujos que conectan formularios, CRM y WhatsApp. También desplegamos aplicaciones propias sobre el VPS.",
  },
  {
    q: "¿Trabajan solo con WordPress?",
    a: "No. Trabajamos con WordPress y WooCommerce, pero también con Shopify y con desarrollos a la medida. Elegimos según el caso, no según lo que nos quede más cómodo.",
  },
  {
    q: "¿Y después de publicar?",
    a: "Puedes seguir con acompañamiento mensual: mantenimiento, respaldos, monitoreo, métricas y ajustes. Es opcional y se contrata aparte del proyecto.",
  },
  {
    q: "¿Trabajan con empresas fuera de Colombia?",
    a: "Sí. Atendemos en español, inglés y portugués, y trabajamos de forma remota. Los productos de Hostinger cambian de precio según el país donde contrates.",
  },
  {
    q: "¿Cómo cobran los servicios de Dos Nodos?",
    a: "Por alcance y entregables, con precio cerrado después de una reunión de diagnóstico sin costo. Nada de bolsas de horas abiertas.",
  },
]
