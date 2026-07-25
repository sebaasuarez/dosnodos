import type { Language, ServiceId } from "./i18n"

type L<T> = Record<Language, T>

export interface Bullet {
  title: string
  description: string
}

export interface Qa {
  question: string
  answer: string
}

export interface ServiceContent {
  id: ServiceId
  /** Categoría a la que pertenece en el home. */
  category: "web" | "software" | "growth"
  slug: L<string>
  metaTitle: L<string>
  metaDescription: L<string>
  h1: L<string>
  intro: L<string>
  bullets: L<Bullet[]>
  faq: L<Qa[]>
  /** Tecnologías; no se traducen. */
  chips: string[]
}

/** Segmento de ruta por idioma: /servicios, /en/services, /pt/servicos. */
export const SERVICES_SEGMENT: Record<Language, string> = {
  es: "servicios",
  en: "services",
  pt: "servicos",
}

/** Prefijo de idioma: el español vive en la raíz para no romper el SEO actual. */
export function langPrefix(lang: Language): string {
  return lang === "es" ? "" : `/${lang}`
}

export function homePath(lang: Language): string {
  return lang === "es" ? "/" : `/${lang}`
}

export function servicesIndexPath(lang: Language): string {
  return `${langPrefix(lang)}/${SERVICES_SEGMENT[lang]}`
}

export function servicePath(lang: Language, service: ServiceContent): string {
  return `${servicesIndexPath(lang)}/${service.slug[lang]}`
}

export const SERVICES: ServiceContent[] = [
  // ────────────────────────── Sitios web & e-Commerce ──────────────────────────
  {
    id: "web-design",
    category: "web",
    chips: ["Next.js", "Responsive", "Core Web Vitals"],
    slug: {
      es: "diseno-de-paginas-web",
      en: "website-design",
      pt: "design-de-sites",
    },
    metaTitle: {
      es: "Diseño de Páginas Web en Colombia | Dos Nodos",
      en: "Website Design Agency | Dos Nodos",
      pt: "Design de Sites | Dos Nodos",
    },
    metaDescription: {
      es: "Diseñamos páginas web de alto impacto visual, rápidas y pensadas para convertir visitas en clientes. Agenda una reunión de 30 minutos sin costo.",
      en: "We design high-impact, fast websites built to turn visits into customers. Book a free 30-minute call with Dos Nodos.",
      pt: "Criamos sites de alto impacto visual, rápidos e pensados para converter visitas em clientes. Agende 30 minutos sem custo.",
    },
    h1: {
      es: "Diseño de páginas web de alto impacto visual",
      en: "High-impact website design",
      pt: "Design de sites de alto impacto visual",
    },
    intro: {
      es: "Tu sitio es la primera reunión con un cliente que aún no te conoce. Diseñamos páginas que se ven excelentes, cargan en menos de dos segundos y guían al visitante hacia una acción concreta: escribirte, cotizar o agendar.",
      en: "Your site is the first meeting with a client who doesn't know you yet. We design pages that look excellent, load in under two seconds and guide visitors toward one concrete action: contacting you, requesting a quote or booking a call.",
      pt: "Seu site é a primeira reunião com um cliente que ainda não te conhece. Criamos páginas que ficam excelentes, carregam em menos de dois segundos e levam o visitante a uma ação concreta: falar com você, pedir um orçamento ou agendar.",
    },
    bullets: {
      es: [
        { title: "Diseño propio, no plantillas", description: "Cada sitio parte de tu marca y tu mensaje, no de un tema comprado que ya usan otros cien negocios." },
        { title: "Velocidad medida", description: "Optimizamos Core Web Vitals: imágenes, fuentes y JavaScript. Un sitio lento pierde clientes y posiciones en Google." },
        { title: "Pensado para convertir", description: "Jerarquía clara, una acción principal por pantalla y formularios que la gente sí completa." },
        { title: "Administrable", description: "Entregamos un panel para que edites textos, imágenes y SEO sin depender de nosotros." },
      ],
      en: [
        { title: "Custom design, not templates", description: "Every site starts from your brand and message, not a purchased theme a hundred other businesses already use." },
        { title: "Measured speed", description: "We optimize Core Web Vitals: images, fonts and JavaScript. A slow site loses customers and rankings." },
        { title: "Built to convert", description: "Clear hierarchy, one primary action per screen and forms people actually complete." },
        { title: "Easy to manage", description: "We hand over an admin panel so you can edit text, images and SEO without depending on us." },
      ],
      pt: [
        { title: "Design próprio, não modelos", description: "Cada site parte da sua marca e da sua mensagem, não de um tema comprado que outros cem negócios já usam." },
        { title: "Velocidade medida", description: "Otimizamos Core Web Vitals: imagens, fontes e JavaScript. Um site lento perde clientes e posições." },
        { title: "Pensado para converter", description: "Hierarquia clara, uma ação principal por tela e formulários que as pessoas realmente preenchem." },
        { title: "Fácil de administrar", description: "Entregamos um painel para editar textos, imagens e SEO sem depender de nós." },
      ],
    },
    faq: {
      es: [
        { question: "¿Cuánto tarda el diseño de una página web?", answer: "Un sitio corporativo toma entre 6 y 12 semanas según el número de páginas y si hay que producir contenido. Entregamos por etapas: primero la estructura y el home, luego el resto." },
        { question: "¿Puedo editar el sitio después?", answer: "Sí. Todos nuestros sitios incluyen un panel de administración para cambiar textos, imágenes, proyectos y metadatos de SEO sin escribir código." },
        { question: "¿El sitio funciona bien en celular?", answer: "Se diseña primero para celular, que es donde llega la mayoría del tráfico en Colombia, y luego se adapta a pantallas grandes." },
      ],
      en: [
        { question: "How long does a website take?", answer: "A corporate site takes 6 to 12 weeks depending on page count and whether content needs to be produced. We deliver in stages: structure and homepage first, then the rest." },
        { question: "Can I edit the site afterwards?", answer: "Yes. Every site includes an admin panel to change text, images, projects and SEO metadata without writing code." },
        { question: "Does it work well on mobile?", answer: "We design mobile-first, since that's where most traffic comes from, then adapt to larger screens." },
      ],
      pt: [
        { question: "Quanto tempo leva um site?", answer: "Um site corporativo leva de 6 a 12 semanas conforme o número de páginas e se é preciso produzir conteúdo. Entregamos por etapas: estrutura e home primeiro, depois o resto." },
        { question: "Posso editar o site depois?", answer: "Sim. Todos os sites incluem um painel para alterar textos, imagens, projetos e metadados de SEO sem escrever código." },
        { question: "Funciona bem no celular?", answer: "Projetamos primeiro para celular, de onde vem a maior parte do tráfego, e depois adaptamos para telas grandes." },
      ],
    },
  },
  {
    id: "ecommerce",
    category: "web",
    chips: ["Checkout", "Wompi", "Mercado Pago", "Analítica"],
    slug: {
      es: "desarrollo-de-ecommerce",
      en: "ecommerce-development",
      pt: "desenvolvimento-de-ecommerce",
    },
    metaTitle: {
      es: "Desarrollo de e-Commerce en Colombia | Dos Nodos",
      en: "e-Commerce Development Agency | Dos Nodos",
      pt: "Desenvolvimento de e-Commerce | Dos Nodos",
    },
    metaDescription: {
      es: "Creamos tiendas en línea con checkout optimizado, pagos locales y post-venta automatizada. Nuestro servicio más solicitado. Reunión sin costo.",
      en: "We build online stores with optimized checkout, local payments and automated post-sale. Our most requested service. Free consultation.",
      pt: "Criamos lojas online com checkout otimizado, pagamentos locais e pós-venda automatizado. Nosso serviço mais procurado. Reunião sem custo.",
    },
    h1: {
      es: "Desarrollo de e-Commerce que vende de verdad",
      en: "e-Commerce development that actually sells",
      pt: "Desenvolvimento de e-Commerce que realmente vende",
    },
    intro: {
      es: "Una tienda en línea no es un catálogo: es un vendedor que trabaja de noche. Construimos el flujo completo, desde la ficha de producto hasta el mensaje de post-venta, y medimos dónde se caen las ventas para corregirlo.",
      en: "An online store isn't a catalog: it's a salesperson working overnight. We build the full flow, from product page to post-sale message, and measure where sales drop off so we can fix it.",
      pt: "Uma loja online não é um catálogo: é um vendedor que trabalha de madrugada. Construímos o fluxo completo, da página do produto à mensagem de pós-venda, e medimos onde as vendas caem para corrigir.",
    },
    bullets: {
      es: [
        { title: "Checkout sin fricción", description: "Menos pasos, menos campos y métodos de pago locales. Cada campo que sobra es una venta que se cae." },
        { title: "Pagos para Colombia", description: "Integramos Wompi, Mercado Pago, PSE y tarjetas, con la contabilidad conectada a tu facturación." },
        { title: "Post-venta automática", description: "Confirmación, guía de envío y seguimiento salen solos por WhatsApp o correo, sin que alguien los escriba." },
        { title: "Datos para decidir", description: "Analítica de embudo configurada desde el día uno: sabes qué producto se ve, se agrega y se compra." },
      ],
      en: [
        { title: "Frictionless checkout", description: "Fewer steps, fewer fields and local payment methods. Every unnecessary field is a lost sale." },
        { title: "Local payments", description: "We integrate the payment providers your market actually uses, connected to your invoicing." },
        { title: "Automated post-sale", description: "Confirmation, tracking and follow-up go out by themselves over WhatsApp or email." },
        { title: "Data to decide", description: "Funnel analytics from day one: you know which product is viewed, added and bought." },
      ],
      pt: [
        { title: "Checkout sem atrito", description: "Menos etapas, menos campos e métodos de pagamento locais. Cada campo desnecessário é uma venda perdida." },
        { title: "Pagamentos locais", description: "Integramos os meios de pagamento que seu mercado realmente usa, conectados ao seu faturamento." },
        { title: "Pós-venda automático", description: "Confirmação, rastreio e acompanhamento saem sozinhos por WhatsApp ou e-mail." },
        { title: "Dados para decidir", description: "Analytics de funil desde o primeiro dia: você sabe qual produto é visto, adicionado e comprado." },
      ],
    },
    faq: {
      es: [
        { question: "¿Shopify o tienda a la medida?", answer: "Si vendes productos estándar y quieres salir rápido, Shopify. Si tienes precios por cliente, combos, inventario en un ERP o un flujo particular, conviene una tienda a la medida. En la reunión de diagnóstico te decimos cuál te sirve, incluso si es la opción más económica." },
        { question: "¿Se conecta con mi inventario?", answer: "Sí. Conectamos la tienda con tu ERP o sistema de inventario para que el stock y los precios estén siempre al día y no vendas lo que no tienes." },
        { question: "¿Cuánto cuesta una tienda en línea?", answer: "Depende del catálogo, las integraciones y los métodos de pago. Cotizamos con precio cerrado después de una reunión de 30 minutos sin costo." },
      ],
      en: [
        { question: "Shopify or custom store?", answer: "If you sell standard products and want to launch fast, Shopify. If you have per-client pricing, bundles, ERP inventory or a particular flow, a custom store makes more sense. We'll tell you which fits in the diagnosis call." },
        { question: "Does it connect to my inventory?", answer: "Yes. We connect the store to your ERP or inventory system so stock and prices stay current and you never sell what you don't have." },
        { question: "How much does an online store cost?", answer: "It depends on catalog size, integrations and payment methods. We quote a fixed price after a free 30-minute call." },
      ],
      pt: [
        { question: "Shopify ou loja sob medida?", answer: "Se você vende produtos padrão e quer lançar rápido, Shopify. Se tem preços por cliente, combos, estoque em ERP ou um fluxo particular, uma loja sob medida faz mais sentido. Dizemos qual serve na reunião de diagnóstico." },
        { question: "Conecta com meu estoque?", answer: "Sim. Conectamos a loja ao seu ERP ou sistema de estoque para que quantidades e preços estejam sempre atualizados." },
        { question: "Quanto custa uma loja online?", answer: "Depende do catálogo, das integrações e dos meios de pagamento. Orçamos com preço fechado após uma reunião de 30 minutos sem custo." },
      ],
    },
  },
  {
    id: "shopify",
    category: "web",
    chips: ["Shopify", "Liquid", "Apps", "Migración"],
    slug: {
      es: "desarrollo-shopify",
      en: "shopify-development",
      pt: "desenvolvimento-shopify",
    },
    metaTitle: {
      es: "Desarrollo Shopify en Colombia | Dos Nodos",
      en: "Shopify Development Agency | Dos Nodos",
      pt: "Desenvolvimento Shopify | Dos Nodos",
    },
    metaDescription: {
      es: "Tiendas Shopify con tema a la medida, integraciones y automatización. Migramos tu tienda actual sin perder ventas ni posicionamiento.",
      en: "Shopify stores with custom themes, integrations and automation. We migrate your current store without losing sales or rankings.",
      pt: "Lojas Shopify com tema sob medida, integrações e automação. Migramos sua loja atual sem perder vendas nem posicionamento.",
    },
    h1: {
      es: "Desarrollo de tiendas Shopify",
      en: "Shopify store development",
      pt: "Desenvolvimento de lojas Shopify",
    },
    intro: {
      es: "Shopify resuelve el 80% de una tienda; el 20% restante es lo que la hace tuya y rentable. Trabajamos ese 20%: tema a la medida, integraciones con tu operación y automatizaciones que evitan trabajo manual.",
      en: "Shopify solves 80% of a store; the remaining 20% is what makes it yours and profitable. We work on that 20%: custom theme, integrations with your operation and automations that remove manual work.",
      pt: "O Shopify resolve 80% de uma loja; os 20% restantes são o que a torna sua e rentável. Trabalhamos esses 20%: tema sob medida, integrações e automações que eliminam trabalho manual.",
    },
    bullets: {
      es: [
        { title: "Tema a la medida", description: "Partimos de tu marca, no de una plantilla. Rápido en móvil y fácil de administrar por tu equipo." },
        { title: "Integraciones reales", description: "Conectamos Shopify con tu ERP, facturación electrónica, WhatsApp y transportadoras." },
        { title: "Migración sin perder SEO", description: "Si ya vendes en otra plataforma, migramos productos y URLs con redirecciones para no perder posiciones." },
        { title: "Menos apps, menos costo fijo", description: "Muchas apps mensuales se reemplazan con desarrollo propio: pagas una vez en lugar de todos los meses." },
      ],
      en: [
        { title: "Custom theme", description: "We start from your brand, not a template. Fast on mobile and easy for your team to manage." },
        { title: "Real integrations", description: "We connect Shopify with your ERP, invoicing, WhatsApp and shipping providers." },
        { title: "Migration without losing SEO", description: "If you already sell elsewhere, we migrate products and URLs with redirects so you keep your rankings." },
        { title: "Fewer apps, lower fixed cost", description: "Many monthly apps can be replaced with custom development: you pay once instead of every month." },
      ],
      pt: [
        { title: "Tema sob medida", description: "Partimos da sua marca, não de um modelo. Rápido no celular e fácil de administrar." },
        { title: "Integrações reais", description: "Conectamos o Shopify ao seu ERP, faturamento, WhatsApp e transportadoras." },
        { title: "Migração sem perder SEO", description: "Se você já vende em outra plataforma, migramos produtos e URLs com redirecionamentos." },
        { title: "Menos apps, menos custo fixo", description: "Muitas apps mensais podem ser substituídas por desenvolvimento próprio: paga uma vez, não todo mês." },
      ],
    },
    faq: {
      es: [
        { question: "¿Trabajan sobre una tienda Shopify que ya existe?", answer: "Sí. Auditamos la tienda, te decimos qué está frenando las ventas y trabajamos sobre lo que ya tienes en vez de empezar de cero." },
        { question: "¿Pueden migrar mi tienda a Shopify?", answer: "Sí. Migramos productos, clientes y contenido, y mantenemos las URLs con redirecciones 301 para no perder el posicionamiento que ya ganaste." },
        { question: "¿Shopify sirve para vender en Colombia?", answer: "Sí. Se integra con pasarelas locales y transportadoras del país, y se puede conectar con facturación electrónica." },
      ],
      en: [
        { question: "Do you work on an existing Shopify store?", answer: "Yes. We audit the store, tell you what's holding back sales and work on what you already have instead of starting over." },
        { question: "Can you migrate my store to Shopify?", answer: "Yes. We migrate products, customers and content, keeping URLs with 301 redirects so you don't lose existing rankings." },
        { question: "Is Shopify a good fit for my market?", answer: "In most cases yes — it integrates with local payment gateways and shipping providers, and connects to invoicing systems." },
      ],
      pt: [
        { question: "Vocês trabalham em uma loja Shopify existente?", answer: "Sim. Auditamos a loja, dizemos o que está travando as vendas e trabalhamos sobre o que você já tem." },
        { question: "Podem migrar minha loja para o Shopify?", answer: "Sim. Migramos produtos, clientes e conteúdo, mantendo as URLs com redirecionamentos 301 para não perder posicionamento." },
        { question: "O Shopify serve para o meu mercado?", answer: "Na maioria dos casos sim — integra com gateways locais, transportadoras e sistemas de faturamento." },
      ],
    },
  },

  // ────────────────────────── Apps & Software a la medida ──────────────────────────
  {
    id: "web-app",
    category: "software",
    chips: ["Next.js", "PostgreSQL", "Dashboards", "APIs"],
    slug: {
      es: "desarrollo-de-aplicaciones-web",
      en: "web-application-development",
      pt: "desenvolvimento-de-aplicacoes-web",
    },
    metaTitle: {
      es: "Desarrollo de Aplicaciones Web | Dos Nodos",
      en: "Web Application Development | Dos Nodos",
      pt: "Desenvolvimento de Aplicações Web | Dos Nodos",
    },
    metaDescription: {
      es: "Aplicaciones web y dashboards a la medida: rápidos, seguros y accesibles desde cualquier lugar. Reemplaza hojas de cálculo por un sistema real.",
      en: "Custom web applications and dashboards: fast, secure and accessible anywhere. Replace spreadsheets with a real system.",
      pt: "Aplicações web e dashboards sob medida: rápidos, seguros e acessíveis de qualquer lugar. Substitua planilhas por um sistema real.",
    },
    h1: {
      es: "Desarrollo de aplicaciones web",
      en: "Web application development",
      pt: "Desenvolvimento de aplicações web",
    },
    intro: {
      es: "Cuando la operación ya no cabe en hojas de cálculo, es hora de una aplicación. Construimos portales, paneles y sistemas internos que tu equipo abre desde el navegador, con permisos por rol y datos en tiempo real.",
      en: "When your operation outgrows spreadsheets, it's time for an application. We build portals, dashboards and internal systems your team opens in the browser, with role-based permissions and real-time data.",
      pt: "Quando a operação não cabe mais em planilhas, é hora de uma aplicação. Construímos portais, painéis e sistemas internos que sua equipe abre no navegador, com permissões por papel e dados em tempo real.",
    },
    bullets: {
      es: [
        { title: "Reemplaza el Excel compartido", description: "Un solo lugar con la información al día, sin versiones paralelas ni datos que se pisan." },
        { title: "Permisos por rol", description: "Cada persona ve y edita lo que le corresponde. Auditoría de quién cambió qué y cuándo." },
        { title: "Dashboards que se leen", description: "Indicadores que responden preguntas de negocio, no gráficas decorativas." },
        { title: "Se conecta con lo que ya tienes", description: "APIs hacia tu ERP, CRM, facturación o WhatsApp para que no haya que digitar dos veces." },
      ],
      en: [
        { title: "Replaces the shared spreadsheet", description: "One place with current information, no parallel versions or overwritten data." },
        { title: "Role-based permissions", description: "Each person sees and edits what's theirs, with an audit trail of who changed what." },
        { title: "Dashboards you can read", description: "Indicators that answer business questions, not decorative charts." },
        { title: "Connects to what you have", description: "APIs to your ERP, CRM, invoicing or WhatsApp so nothing is typed twice." },
      ],
      pt: [
        { title: "Substitui a planilha compartilhada", description: "Um só lugar com a informação atualizada, sem versões paralelas nem dados sobrescritos." },
        { title: "Permissões por papel", description: "Cada pessoa vê e edita o que lhe cabe, com auditoria de quem alterou o quê." },
        { title: "Dashboards que se leem", description: "Indicadores que respondem perguntas de negócio, não gráficos decorativos." },
        { title: "Conecta com o que você já tem", description: "APIs para seu ERP, CRM, faturamento ou WhatsApp para não digitar duas vezes." },
      ],
    },
    faq: {
      es: [
        { question: "¿Cuánto tarda una aplicación web?", answer: "Una primera versión útil sale en 6 a 10 semanas. Priorizamos el flujo que más duele y lo ponemos en producción antes de seguir con el resto." },
        { question: "¿Quién es dueño del código?", answer: "Tú. Entregamos el repositorio y la documentación; no quedas amarrado a nosotros para seguir evolucionando el sistema." },
        { question: "¿Dan soporte después de entregar?", answer: "Sí. Dejamos monitoreo y alertas, y acordamos un plan de acompañamiento según qué tan crítica sea la aplicación." },
      ],
      en: [
        { question: "How long does a web app take?", answer: "A useful first version ships in 6 to 10 weeks. We prioritize the most painful flow and put it in production before continuing." },
        { question: "Who owns the code?", answer: "You do. We hand over the repository and documentation; you're not locked in to us to keep evolving the system." },
        { question: "Do you support it after delivery?", answer: "Yes. We set up monitoring and alerts, and agree on a support plan based on how critical the app is." },
      ],
      pt: [
        { question: "Quanto tempo leva uma aplicação web?", answer: "Uma primeira versão útil sai em 6 a 10 semanas. Priorizamos o fluxo que mais dói e colocamos em produção antes de seguir." },
        { question: "Quem é dono do código?", answer: "Você. Entregamos o repositório e a documentação; você não fica preso a nós para evoluir o sistema." },
        { question: "Dão suporte depois da entrega?", answer: "Sim. Deixamos monitoramento e alertas, e combinamos um plano de acompanhamento conforme a criticidade." },
      ],
    },
  },
  {
    id: "mobile-app",
    category: "software",
    chips: ["iOS", "Android", "React Native", "Push"],
    slug: {
      es: "desarrollo-de-aplicaciones-moviles",
      en: "mobile-app-development",
      pt: "desenvolvimento-de-aplicativos-moveis",
    },
    metaTitle: {
      es: "Desarrollo de Aplicaciones Móviles | Dos Nodos",
      en: "Mobile App Development | Dos Nodos",
      pt: "Desenvolvimento de Aplicativos Móveis | Dos Nodos",
    },
    metaDescription: {
      es: "Apps para iOS y Android hechas a la medida de tu operación: pedidos, seguimiento en vivo, notificaciones y trabajo sin conexión.",
      en: "Custom iOS and Android apps built around your operation: orders, live tracking, notifications and offline work.",
      pt: "Apps para iOS e Android sob medida: pedidos, rastreio ao vivo, notificações e trabalho sem conexão.",
    },
    h1: {
      es: "Desarrollo de aplicaciones móviles",
      en: "Mobile app development",
      pt: "Desenvolvimento de aplicativos móveis",
    },
    intro: {
      es: "Una app se justifica cuando el trabajo ocurre en la calle: domicilios, visitas, inventarios, servicio técnico. Construimos aplicaciones que funcionan aunque se caiga la señal y que tu equipo entiende sin capacitación larga.",
      en: "An app makes sense when work happens in the field: deliveries, visits, inventory, technical service. We build apps that work even when the signal drops and that your team understands without long training.",
      pt: "Um app se justifica quando o trabalho acontece na rua: entregas, visitas, inventários, assistência técnica. Construímos apps que funcionam mesmo sem sinal e que sua equipe entende sem treinamento longo.",
    },
    bullets: {
      es: [
        { title: "iOS y Android a la vez", description: "Una sola base de código para las dos tiendas: menos costo de construcción y de mantenimiento." },
        { title: "Funciona sin señal", description: "El trabajo se guarda en el dispositivo y se sincroniza cuando vuelve la conexión." },
        { title: "Notificaciones útiles", description: "Avisos que mueven la operación —un pedido nuevo, una visita asignada—, no ruido publicitario." },
        { title: "Publicación incluida", description: "Nos encargamos del proceso en App Store y Google Play, incluidas las políticas y los rechazos." },
      ],
      en: [
        { title: "iOS and Android at once", description: "A single codebase for both stores: lower build and maintenance cost." },
        { title: "Works offline", description: "Work is saved on the device and syncs when the connection returns." },
        { title: "Useful notifications", description: "Alerts that move the operation — a new order, an assigned visit — not promotional noise." },
        { title: "Publishing included", description: "We handle the App Store and Google Play process, policies and rejections included." },
      ],
      pt: [
        { title: "iOS e Android ao mesmo tempo", description: "Uma única base de código para as duas lojas: menor custo de construção e manutenção." },
        { title: "Funciona sem sinal", description: "O trabalho é salvo no dispositivo e sincroniza quando a conexão volta." },
        { title: "Notificações úteis", description: "Avisos que movem a operação — um pedido novo, uma visita atribuída —, não ruído." },
        { title: "Publicação incluída", description: "Cuidamos do processo na App Store e Google Play, incluindo políticas e recusas." },
      ],
    },
    faq: {
      es: [
        { question: "¿Necesito una app o me sirve una web?", answer: "Si no requieres cámara, GPS en segundo plano, trabajo sin conexión ni notificaciones push, una web bien hecha suele ser más barata y rápida. Te lo decimos con franqueza en el diagnóstico." },
        { question: "¿Cuánto cuesta mantener una app?", answer: "Hay que contar las cuentas de desarrollador de Apple y Google, y actualizaciones un par de veces al año para seguir el ritmo de los sistemas operativos. Lo dejamos claro en la cotización." },
        { question: "¿Cuánto tarda?", answer: "Entre 8 y 16 semanas según el alcance, más el tiempo de revisión de las tiendas." },
      ],
      en: [
        { question: "Do I need an app or is a website enough?", answer: "If you don't need camera, background GPS, offline work or push notifications, a well-built website is usually cheaper and faster. We'll say so plainly in the diagnosis." },
        { question: "What does maintaining an app cost?", answer: "Budget for Apple and Google developer accounts plus updates a couple of times a year to keep up with OS changes. We make that explicit in the quote." },
        { question: "How long does it take?", answer: "8 to 16 weeks depending on scope, plus store review time." },
      ],
      pt: [
        { question: "Preciso de um app ou um site basta?", answer: "Se você não precisa de câmera, GPS em segundo plano, trabalho offline ou push, um site bem feito costuma ser mais barato e rápido. Dizemos isso com franqueza." },
        { question: "Quanto custa manter um app?", answer: "Considere as contas de desenvolvedor da Apple e do Google, além de atualizações algumas vezes por ano. Deixamos isso explícito no orçamento." },
        { question: "Quanto tempo leva?", answer: "De 8 a 16 semanas conforme o escopo, mais o tempo de revisão das lojas." },
      ],
    },
  },
  {
    id: "custom-dev",
    category: "software",
    chips: ["Integraciones", "Portales", "ERP", "APIs"],
    slug: {
      es: "desarrollo-a-la-medida",
      en: "custom-software-development",
      pt: "desenvolvimento-sob-medida",
    },
    metaTitle: {
      es: "Desarrollo de Software a la Medida | Dos Nodos",
      en: "Custom Software Development | Dos Nodos",
      pt: "Desenvolvimento de Software Sob Medida | Dos Nodos",
    },
    metaDescription: {
      es: "Software diseñado alrededor de tus procesos, no al contrario. Portales, integraciones y sistemas internos para operaciones que no caben en un producto genérico.",
      en: "Software designed around your processes, not the other way around. Portals, integrations and internal systems for operations no generic product fits.",
      pt: "Software desenhado em torno dos seus processos. Portais, integrações e sistemas internos para operações que não cabem em um produto genérico.",
    },
    h1: {
      es: "Desarrollo de software a la medida",
      en: "Custom software development",
      pt: "Desenvolvimento de software sob medida",
    },
    intro: {
      es: "Hay operaciones que ningún producto de estantería resuelve sin obligarte a cambiar cómo trabajas. Cuando ese es el caso, construimos exactamente lo que hace falta —y nada más— alrededor de tu proceso real.",
      en: "Some operations no off-the-shelf product solves without forcing you to change how you work. When that's the case, we build exactly what's needed — and nothing more — around your real process.",
      pt: "Há operações que nenhum produto de prateleira resolve sem forçar você a mudar como trabalha. Nesse caso, construímos exatamente o necessário — e nada mais — em torno do seu processo real.",
    },
    bullets: {
      es: [
        { title: "Alcance honesto", description: "Si un producto existente te sirve, te lo decimos y te ayudamos a configurarlo. Construir a la medida cuesta más y solo se justifica cuando de verdad hace falta." },
        { title: "Integraciones entre sistemas", description: "Hacemos que tu ERP, CRM, facturación y canales hablen entre sí, incluso si son antiguos." },
        { title: "Entregas por etapas", description: "Cada dos o tres semanas ves algo funcionando en producción, no una demo." },
        { title: "Documentado y transferible", description: "Código y documentación son tuyos, con la operación explicada para que otro equipo pueda continuar." },
      ],
      en: [
        { title: "Honest scope", description: "If an existing product fits, we'll say so and help you configure it. Custom costs more and is only justified when it's truly needed." },
        { title: "System integrations", description: "We make your ERP, CRM, invoicing and channels talk to each other, even legacy ones." },
        { title: "Staged delivery", description: "Every two or three weeks you see something running in production, not a demo." },
        { title: "Documented and transferable", description: "Code and documentation are yours, with the operation explained so another team could continue." },
      ],
      pt: [
        { title: "Escopo honesto", description: "Se um produto existente serve, dizemos e ajudamos a configurá-lo. Sob medida custa mais e só se justifica quando é realmente necessário." },
        { title: "Integrações entre sistemas", description: "Fazemos seu ERP, CRM, faturamento e canais conversarem, mesmo os antigos." },
        { title: "Entregas por etapas", description: "A cada duas ou três semanas você vê algo rodando em produção, não uma demo." },
        { title: "Documentado e transferível", description: "Código e documentação são seus, com a operação explicada para outra equipe continuar." },
      ],
    },
    faq: {
      es: [
        { question: "¿Cómo sé si necesito software a la medida?", answer: "Si tu equipo mantiene hojas de cálculo paralelas al sistema, si digita lo mismo en dos lugares o si el proveedor te dice que 'así funciona el producto' y eso te cuesta dinero, probablemente sí. En el diagnóstico lo revisamos con números." },
        { question: "¿Puedo empezar pequeño?", answer: "Es lo que recomendamos. Se elige un proceso, se automatiza y se mide. Con ese resultado se decide si vale la pena seguir." },
        { question: "¿Y si necesitamos cambios después?", answer: "El código queda tuyo y documentado. Podemos seguir acompañándote o entregarlo a tu equipo interno." },
      ],
      en: [
        { question: "How do I know if I need custom software?", answer: "If your team keeps spreadsheets parallel to the system, types the same data twice, or the vendor says 'that's how the product works' and it costs you money — probably yes. We review it with numbers in the diagnosis." },
        { question: "Can I start small?", answer: "That's what we recommend. Pick one process, automate it, measure it. That result tells you whether to continue." },
        { question: "What if we need changes later?", answer: "The code is yours and documented. We can keep supporting you or hand it to your internal team." },
      ],
      pt: [
        { question: "Como sei se preciso de software sob medida?", answer: "Se sua equipe mantém planilhas paralelas ao sistema, digita o mesmo dado duas vezes, ou o fornecedor diz 'o produto funciona assim' e isso custa dinheiro — provavelmente sim." },
        { question: "Posso começar pequeno?", answer: "É o que recomendamos. Escolha um processo, automatize e meça. Esse resultado diz se vale continuar." },
        { question: "E se precisarmos de mudanças depois?", answer: "O código é seu e documentado. Podemos continuar acompanhando ou entregar à sua equipe interna." },
      ],
    },
  },

  // ────────────────────────── IA, Automatización & Crecimiento ──────────────────────────
  {
    id: "ai-assistant",
    category: "growth",
    chips: ["WhatsApp Business API", "24/7", "CRM", "Cotizaciones"],
    slug: {
      es: "asistentes-virtuales-inteligentes",
      en: "intelligent-virtual-assistants",
      pt: "assistentes-virtuais-inteligentes",
    },
    metaTitle: {
      es: "Asistentes Virtuales Inteligentes con IA | Dos Nodos",
      en: "Intelligent Virtual Assistants with AI | Dos Nodos",
      pt: "Assistentes Virtuais Inteligentes com IA | Dos Nodos",
    },
    metaDescription: {
      es: "Asistentes con IA entrenados con tu negocio: atienden, cotizan y agendan por WhatsApp 24/7 y registran cada contacto en tu CRM.",
      en: "AI assistants trained on your business: they answer, quote and schedule over WhatsApp 24/7 and log every contact in your CRM.",
      pt: "Assistentes com IA treinados com seu negócio: atendem, cotam e agendam por WhatsApp 24/7 e registram cada contato no seu CRM.",
    },
    h1: {
      es: "Asistentes virtuales inteligentes para tu negocio",
      en: "Intelligent virtual assistants for your business",
      pt: "Assistentes virtuais inteligentes para o seu negócio",
    },
    intro: {
      es: "La mayoría de los clientes escribe fuera del horario laboral y se va con quien responda primero. Un asistente entrenado con tu catálogo, precios y políticas responde en segundos, cotiza, agenda y deja el registro en tu CRM.",
      en: "Most customers write outside business hours and go with whoever answers first. An assistant trained on your catalog, prices and policies replies in seconds, quotes, books and logs everything in your CRM.",
      pt: "A maioria dos clientes escreve fora do horário comercial e fica com quem responde primeiro. Um assistente treinado com seu catálogo, preços e políticas responde em segundos, cota, agenda e registra no seu CRM.",
    },
    bullets: {
      es: [
        { title: "Entrenado con tu negocio", description: "No es un bot genérico: responde con tu catálogo, tus precios y tus políticas reales." },
        { title: "Cotiza de verdad", description: "Consulta inventario y precios en tu sistema y envía la cotización en PDF, no una respuesta vaga." },
        { title: "Agenda y hace seguimiento", description: "Reserva la cita en el calendario del equipo y retoma la conversación si el cliente no responde." },
        { title: "Sabe cuándo pasar a un humano", description: "Cuando el caso se sale del guion, transfiere con todo el contexto en vez de dar vueltas." },
      ],
      en: [
        { title: "Trained on your business", description: "Not a generic bot: it answers with your catalog, your prices and your real policies." },
        { title: "Quotes for real", description: "It checks inventory and prices in your system and sends a PDF quote, not a vague reply." },
        { title: "Books and follows up", description: "It reserves the appointment in the team calendar and re-engages if the customer goes quiet." },
        { title: "Knows when to hand off", description: "When a case leaves the script, it transfers with full context instead of stalling." },
      ],
      pt: [
        { title: "Treinado com seu negócio", description: "Não é um bot genérico: responde com seu catálogo, seus preços e suas políticas reais." },
        { title: "Cota de verdade", description: "Consulta estoque e preços no seu sistema e envia a cotação em PDF, não uma resposta vaga." },
        { title: "Agenda e faz follow-up", description: "Reserva o compromisso na agenda da equipe e retoma a conversa se o cliente não responder." },
        { title: "Sabe quando passar para um humano", description: "Quando o caso sai do roteiro, transfere com todo o contexto." },
      ],
    },
    faq: {
      es: [
        { question: "¿En cuánto tiempo queda funcionando?", answer: "Entre 2 y 4 semanas. La primera semana se usa en recopilar la información del negocio y definir qué debe y qué no debe responder." },
        { question: "¿Va a inventar respuestas?", answer: "El asistente se limita a la información que le cargamos y, cuando no sabe, lo dice y pasa a una persona. Definimos juntos esos límites antes de salir a producción." },
        { question: "¿Se conecta con WhatsApp oficial?", answer: "Sí, usamos WhatsApp Business API, que es la vía oficial. Evitamos soluciones no oficiales que exponen tu número a bloqueos." },
      ],
      en: [
        { question: "How long until it's running?", answer: "Between 2 and 4 weeks. The first week goes into gathering business information and defining what it should and shouldn't answer." },
        { question: "Will it make up answers?", answer: "The assistant is limited to the information we load, and when it doesn't know it says so and hands off to a person. We define those limits together before going live." },
        { question: "Does it use official WhatsApp?", answer: "Yes, we use the WhatsApp Business API, the official route. We avoid unofficial solutions that expose your number to bans." },
      ],
      pt: [
        { question: "Em quanto tempo fica funcionando?", answer: "Entre 2 e 4 semanas. A primeira semana é para reunir a informação do negócio e definir o que deve e o que não deve responder." },
        { question: "Ele vai inventar respostas?", answer: "O assistente se limita à informação carregada e, quando não sabe, avisa e passa para uma pessoa. Definimos esses limites antes de ir ao ar." },
        { question: "Conecta com o WhatsApp oficial?", answer: "Sim, usamos a WhatsApp Business API, a via oficial. Evitamos soluções não oficiais que expõem seu número a bloqueios." },
      ],
    },
  },
  {
    id: "automation",
    category: "growth",
    chips: ["n8n", "APIs", "ERP · CRM", "Google Workspace"],
    slug: {
      es: "automatizacion-de-procesos",
      en: "process-automation",
      pt: "automacao-de-processos",
    },
    metaTitle: {
      es: "Automatización de Procesos Empresariales | Dos Nodos",
      en: "Business Process Automation | Dos Nodos",
      pt: "Automação de Processos Empresariais | Dos Nodos",
    },
    metaDescription: {
      es: "Conectamos tus plataformas para que el trabajo repetitivo corra solo: del pedido a la factura, del lead al seguimiento. Sin cambiar tus herramientas.",
      en: "We connect your platforms so repetitive work runs itself: from order to invoice, from lead to follow-up. Without changing your tools.",
      pt: "Conectamos suas plataformas para o trabalho repetitivo rodar sozinho: do pedido à nota, do lead ao follow-up. Sem trocar suas ferramentas.",
    },
    h1: {
      es: "Automatización de procesos empresariales",
      en: "Business process automation",
      pt: "Automação de processos empresariais",
    },
    intro: {
      es: "Casi toda empresa tiene a alguien copiando datos de un sistema a otro. Ese trabajo no necesita una persona: necesita una integración. Mapeamos el proceso, lo automatizamos y medimos las horas que se recuperan.",
      en: "Almost every company has someone copying data from one system to another. That work doesn't need a person: it needs an integration. We map the process, automate it and measure the hours recovered.",
      pt: "Quase toda empresa tem alguém copiando dados de um sistema para outro. Esse trabalho não precisa de uma pessoa: precisa de uma integração. Mapeamos o processo, automatizamos e medimos as horas recuperadas.",
    },
    bullets: {
      es: [
        { title: "Del pedido a la factura", description: "El pedido entra por WhatsApp o web y sale facturado en el ERP, sin que nadie lo digite." },
        { title: "Sobre tus herramientas actuales", description: "Trabajamos con tu ERP, CRM, Siigo, Google Workspace o Microsoft 365. No hay que migrar nada." },
        { title: "Reportes que llegan solos", description: "El informe que alguien armaba los lunes queda listo a las 7:00 a.m. en el correo del equipo." },
        { title: "Con alertas si algo falla", description: "Cada flujo queda monitoreado: si se detiene, lo sabemos antes que tú." },
      ],
      en: [
        { title: "From order to invoice", description: "The order arrives by WhatsApp or web and comes out invoiced in the ERP, with nobody typing it." },
        { title: "On your current tools", description: "We work with your ERP, CRM, Google Workspace or Microsoft 365. Nothing to migrate." },
        { title: "Reports that arrive on their own", description: "The report someone built on Mondays is ready at 7:00 a.m. in the team's inbox." },
        { title: "With alerts if something breaks", description: "Every flow is monitored: if it stops, we know before you do." },
      ],
      pt: [
        { title: "Do pedido à nota fiscal", description: "O pedido entra por WhatsApp ou web e sai faturado no ERP, sem ninguém digitar." },
        { title: "Sobre suas ferramentas atuais", description: "Trabalhamos com seu ERP, CRM, Google Workspace ou Microsoft 365. Nada para migrar." },
        { title: "Relatórios que chegam sozinhos", description: "O relatório que alguém montava às segundas fica pronto às 7h no e-mail da equipe." },
        { title: "Com alertas se algo falhar", description: "Cada fluxo é monitorado: se parar, sabemos antes de você." },
      ],
    },
    faq: {
      es: [
        { question: "¿Qué proceso conviene automatizar primero?", answer: "El que más se repite y más errores genera. En el diagnóstico contamos cuántas horas al mes consume cada uno y empezamos por el de mejor retorno." },
        { question: "¿Tengo que cambiar de sistema?", answer: "No. La automatización se construye encima de lo que ya usas; cambiar de sistema es un proyecto aparte que solo recomendamos si el actual es el problema." },
        { question: "¿Qué pasa si el flujo se rompe?", answer: "Queda con monitoreo y alertas. Si una plataforma cambia su API o falla, recibimos el aviso y lo corregimos; el acompañamiento está incluido." },
      ],
      en: [
        { question: "Which process should I automate first?", answer: "The one that repeats most and generates the most errors. In the diagnosis we count how many hours a month each consumes and start with the best return." },
        { question: "Do I have to change systems?", answer: "No. Automation is built on top of what you already use; switching systems is a separate project we only recommend if the current one is the problem." },
        { question: "What if a flow breaks?", answer: "It ships with monitoring and alerts. If a platform changes its API or fails, we get notified and fix it; support is included." },
      ],
      pt: [
        { question: "Qual processo automatizar primeiro?", answer: "O que mais se repete e gera mais erros. No diagnóstico contamos quantas horas por mês cada um consome e começamos pelo de melhor retorno." },
        { question: "Preciso trocar de sistema?", answer: "Não. A automação é construída sobre o que você já usa; trocar de sistema é um projeto separado." },
        { question: "E se o fluxo quebrar?", answer: "Fica com monitoramento e alertas. Se uma plataforma muda a API ou falha, somos avisados e corrigimos; o acompanhamento está incluído." },
      ],
    },
  },
  {
    id: "seo",
    category: "growth",
    chips: ["SEO", "GEO", "Google Ads", "Meta Ads"],
    slug: {
      es: "marketing-digital-y-seo",
      en: "digital-marketing-and-seo",
      pt: "marketing-digital-e-seo",
    },
    metaTitle: {
      es: "Marketing Digital y SEO en Colombia | Dos Nodos",
      en: "Digital Marketing and SEO | Dos Nodos",
      pt: "Marketing Digital e SEO | Dos Nodos",
    },
    metaDescription: {
      es: "Posicionamiento en Google y en las respuestas de la IA (GEO), más pauta digital medida por costo de adquisición, no por likes.",
      en: "Rankings on Google and inside AI answers (GEO), plus paid media measured by acquisition cost, not likes.",
      pt: "Posicionamento no Google e nas respostas da IA (GEO), além de mídia paga medida por custo de aquisição, não por likes.",
    },
    h1: {
      es: "Marketing digital, SEO y visibilidad en la IA",
      en: "Digital marketing, SEO and AI visibility",
      pt: "Marketing digital, SEO e visibilidade na IA",
    },
    intro: {
      es: "Ya no basta con aparecer en Google: cada vez más clientes preguntan primero a ChatGPT, Perplexity o Gemini. Trabajamos las dos cosas —SEO clásico y GEO— para que te encuentren y te citen, y medimos todo por cuánto cuesta conseguir un cliente.",
      en: "Showing up on Google is no longer enough: more clients now ask ChatGPT, Perplexity or Gemini first. We work both — classic SEO and GEO — so you get found and cited, and measure everything by what it costs to acquire a client.",
      pt: "Já não basta aparecer no Google: cada vez mais clientes perguntam primeiro ao ChatGPT, Perplexity ou Gemini. Trabalhamos os dois — SEO clássico e GEO — para que te encontrem e te citem, medindo tudo pelo custo de aquisição.",
    },
    bullets: {
      es: [
        { title: "SEO técnico y de contenido", description: "Velocidad, indexación, datos estructurados y páginas por servicio para las búsquedas que sí traen clientes." },
        { title: "GEO: aparecer en las respuestas de IA", description: "Contenido y marcado para que ChatGPT, Perplexity y Gemini puedan citarte cuando alguien pregunta por tu servicio." },
        { title: "SEO local", description: "Google Business Profile y búsquedas 'cerca de mí' para que te encuentren en tu ciudad." },
        { title: "Pauta con números", description: "Google y Meta Ads medidos por costo por lead y por venta, con la conversión bien instrumentada." },
      ],
      en: [
        { title: "Technical and content SEO", description: "Speed, indexing, structured data and service pages for the searches that actually bring clients." },
        { title: "GEO: showing up in AI answers", description: "Content and markup so ChatGPT, Perplexity and Gemini can cite you when someone asks about your service." },
        { title: "Local SEO", description: "Google Business Profile and 'near me' searches so you're found in your city." },
        { title: "Paid media with numbers", description: "Google and Meta Ads measured by cost per lead and per sale, with conversion properly instrumented." },
      ],
      pt: [
        { title: "SEO técnico e de conteúdo", description: "Velocidade, indexação, dados estruturados e páginas por serviço para as buscas que trazem clientes." },
        { title: "GEO: aparecer nas respostas da IA", description: "Conteúdo e marcação para que ChatGPT, Perplexity e Gemini possam citar você." },
        { title: "SEO local", description: "Google Business Profile e buscas 'perto de mim' para ser encontrado na sua cidade." },
        { title: "Mídia paga com números", description: "Google e Meta Ads medidos por custo por lead e por venda, com conversão bem instrumentada." },
      ],
    },
    faq: {
      es: [
        { question: "¿En cuánto tiempo se ven resultados de SEO?", answer: "El SEO técnico se nota en semanas; el posicionamiento por contenido toma de 3 a 6 meses. Si necesitas clientes este mes, la pauta es el camino y lo decimos sin rodeos." },
        { question: "¿Qué es GEO y por qué importa?", answer: "GEO es optimizar para que los motores de IA te citen en sus respuestas. Importa porque una parte creciente de las búsquedas termina en una respuesta de IA que nunca muestra diez resultados azules." },
        { question: "¿Manejan el presupuesto de pauta?", answer: "Sí, y reportamos costo por lead y por venta. El presupuesto de medios lo pagas directo a la plataforma para que veas cada peso." },
      ],
      en: [
        { question: "How long until SEO shows results?", answer: "Technical SEO shows in weeks; content rankings take 3 to 6 months. If you need clients this month, paid media is the path and we'll say so plainly." },
        { question: "What is GEO and why does it matter?", answer: "GEO is optimizing so AI engines cite you in their answers. It matters because a growing share of searches ends in an AI answer that never shows ten blue links." },
        { question: "Do you manage ad budget?", answer: "Yes, and we report cost per lead and per sale. You pay media spend directly to the platform so you see every peso." },
      ],
      pt: [
        { question: "Em quanto tempo o SEO mostra resultados?", answer: "O SEO técnico aparece em semanas; posicionamento por conteúdo leva de 3 a 6 meses. Se você precisa de clientes este mês, mídia paga é o caminho." },
        { question: "O que é GEO e por que importa?", answer: "GEO é otimizar para que os motores de IA citem você nas respostas. Importa porque uma parte crescente das buscas termina em uma resposta de IA." },
        { question: "Vocês gerenciam a verba de mídia?", answer: "Sim, e reportamos custo por lead e por venda. A verba é paga direto à plataforma para você ver cada centavo." },
      ],
    },
  },
  {
    id: "branding",
    category: "growth",
    chips: ["Identidad", "Logo", "Manual de marca"],
    slug: {
      es: "diseno-de-marca",
      en: "brand-design",
      pt: "design-de-marca",
    },
    metaTitle: {
      es: "Diseño de Marca e Identidad Visual | Dos Nodos",
      en: "Brand Design and Visual Identity | Dos Nodos",
      pt: "Design de Marca e Identidade Visual | Dos Nodos",
    },
    metaDescription: {
      es: "Identidad visual coherente en cada punto de contacto: logo, colores, tipografía y un manual para que tu marca se vea igual en todas partes.",
      en: "Consistent visual identity at every touchpoint: logo, colors, typography and a brand manual so you look the same everywhere.",
      pt: "Identidade visual coerente em cada ponto de contato: logo, cores, tipografia e um manual de marca.",
    },
    h1: {
      es: "Diseño de marca e identidad visual",
      en: "Brand design and visual identity",
      pt: "Design de marca e identidade visual",
    },
    intro: {
      es: "Una marca no es un logo: es que tu propuesta se vea igual de sólida en el sitio, en la cotización y en el WhatsApp. Construimos el sistema visual y lo documentamos para que cualquiera lo aplique sin desarmarlo.",
      en: "A brand isn't a logo: it's your proposition looking equally solid on the site, in the quote and over WhatsApp. We build the visual system and document it so anyone can apply it without breaking it.",
      pt: "Uma marca não é um logo: é sua proposta parecer igualmente sólida no site, no orçamento e no WhatsApp. Construímos o sistema visual e documentamos para qualquer um aplicar sem desmontar.",
    },
    bullets: {
      es: [
        { title: "Identidad completa", description: "Logo en sus versiones, paleta, tipografía y criterios de uso — no un archivo suelto." },
        { title: "Manual de marca", description: "Un documento corto y práctico para que tu equipo y tus proveedores apliquen la marca igual." },
        { title: "Pensada para pantalla", description: "Se prueba en el sitio, en redes y en documentos antes de cerrarla, no solo en una presentación." },
        { title: "Aplicada de una vez", description: "Si además hacemos tu sitio o tu tienda, la marca llega aplicada y no queda en un PDF." },
      ],
      en: [
        { title: "Complete identity", description: "Logo variants, palette, typography and usage criteria — not a loose file." },
        { title: "Brand manual", description: "A short, practical document so your team and vendors apply the brand consistently." },
        { title: "Screen-first", description: "Tested on the site, social and documents before it's final, not just in a slide." },
        { title: "Applied right away", description: "If we also build your site or store, the brand arrives applied instead of sitting in a PDF." },
      ],
      pt: [
        { title: "Identidade completa", description: "Variações de logo, paleta, tipografia e critérios de uso — não um arquivo solto." },
        { title: "Manual de marca", description: "Um documento curto e prático para equipe e fornecedores aplicarem a marca igual." },
        { title: "Pensada para tela", description: "Testada no site, nas redes e em documentos antes de fechar." },
        { title: "Aplicada de imediato", description: "Se também fizermos seu site ou loja, a marca chega aplicada e não fica num PDF." },
      ],
    },
    faq: {
      es: [
        { question: "¿Solo hacen el logo?", answer: "Podemos, pero rara vez es lo que resuelve el problema. Un logo sin sistema visual termina aplicado de diez formas distintas. Recomendamos identidad completa con manual." },
        { question: "¿Cuánto tarda?", answer: "Entre 3 y 5 semanas, con dos rondas de revisión y presentación de propuestas antes de cerrar la dirección." },
        { question: "¿Puedo rediseñar mi marca sin perder reconocimiento?", answer: "Sí. Se hace una evolución en lugar de un cambio total: se conserva lo que la gente ya reconoce y se corrige lo que no funciona en pantalla." },
      ],
      en: [
        { question: "Do you only design the logo?", answer: "We can, but it rarely solves the problem. A logo without a visual system ends up applied ten different ways. We recommend a complete identity with a manual." },
        { question: "How long does it take?", answer: "3 to 5 weeks, with two revision rounds and proposal presentations before locking the direction." },
        { question: "Can I redesign without losing recognition?", answer: "Yes. We evolve rather than replace: keep what people already recognize and fix what doesn't work on screen." },
      ],
      pt: [
        { question: "Vocês fazem só o logo?", answer: "Podemos, mas raramente resolve o problema. Um logo sem sistema visual acaba aplicado de dez formas diferentes." },
        { question: "Quanto tempo leva?", answer: "De 3 a 5 semanas, com duas rodadas de revisão antes de fechar a direção." },
        { question: "Posso redesenhar sem perder reconhecimento?", answer: "Sim. Fazemos uma evolução em vez de troca total: mantemos o que as pessoas reconhecem e corrigimos o que não funciona na tela." },
      ],
    },
  },
]

/** Primera frase del intro: descripción corta y limpia para las cards. */
export function shortDescription(service: ServiceContent, lang: Language): string {
  const intro = service.intro[lang]
  const match = intro.match(/^[^.:]+[.:]/)
  return (match ? match[0] : intro).replace(/:$/, ".")
}

export function findServiceBySlug(lang: Language, slug: string): ServiceContent | undefined {
  return SERVICES.find((s) => s.slug[lang] === slug)
}

export function findServiceById(id: ServiceId): ServiceContent | undefined {
  return SERVICES.find((s) => s.id === id)
}
