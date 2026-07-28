export type Language = "es" | "en" | "pt"

interface DiagramCopy {
  people: string
  results: string
  whatsapp: string
  email: string
  site: string
  node: string
  result1: string
  result2: string
  result3: string
  aria: string
}

interface Metric {
  value: string
  label: string
}

/** Claves estables de icono/servicio (no se traducen). */
export type ServiceId =
  | "web-design"
  | "ecommerce"
  | "shopify"
  | "web-app"
  | "mobile-app"
  | "custom-dev"
  | "ai-assistant"
  | "automation"
  | "seo"
  | "branding"
  // No tiene página de servicio propia: la card enlaza a la landing de
  // ventas.dosnodos.com.co, que es un sitio aparte.
  | "landing-express"

interface ServiceItem {
  id: ServiceId
  title: string
  description: string
  chips: string[]
  /** Si viene, la card se muestra destacada. */
  badge?: string
  /**
   * URL externa. Si viene, la card enlaza ahí en una pestaña nueva en vez de
   * a su página de servicio. Se usa para la landing de ventas, que vive en
   * otro dominio.
   */
  externalHref?: string
}

interface ServiceCategory {
  eyebrow: string
  title: string
  description: string
  items: ServiceItem[]
}

interface ProjectItem {
  tag: string
  title: string
  description: string
  resultLabel: string
  result: string
}

interface ReviewItem {
  quote: string
  name: string
  role: string
  initials: string
}

export interface Translation {
  nav: {
    services: string
    projects: string
    reviews: string
    faq: string
    cta: string
  }
  hero: {
    eyebrow: string
    titleLead: string
    tech: string
    connector: string
    people: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    note: string
    diagram: DiagramCopy
  }
  metrics: {
    responseTime: Metric
    availability: Metric
    quotes: Metric
    speed: Metric
  }
  services: {
    eyebrow: string
    title: string
    titleAccent: string
    subtitle: string
    categories: ServiceCategory[]
  }
  projects: {
    eyebrow: string
    title: string
    items: {
      distribuidora: ProjectItem
      cosmetica: ProjectItem
      clinica: ProjectItem
    }
  }
  reviews: {
    eyebrow: string
    average: string
    items: {
      diana: ReviewItem
      mateo: ReviewItem
      laura: ReviewItem
    }
  }
  faq: {
    eyebrow: string
    title: string
    titleAccent: string
    items: { question: string; answer: string }[]
  }
  servicePage: {
    breadcrumbHome: string
    breadcrumbServices: string
    servicesTitle: string
    servicesSubtitle: string
    benefitsTitle: string
    faqTitle: string
    ctaTitle: string
    ctaSubtitle: string
    ctaButton: string
    otherServices: string
    seeService: string
  }
  contact: {
    eyebrow: string
    titleLead: string
    titleAccent: string
    subtitle: string
    whatsapp: string
    email: string
    form: {
      name: string
      email: string
      company: string
      phone: string
      message: string
      submit: string
      submitting: string
      success: {
        title: string
        message: string
        button: string
      }
      progress: string
      validation: {
        nameRequired: string
        nameMin: string
        emailRequired: string
        emailInvalid: string
        companyRequired: string
        phoneRequired: string
        phoneInvalid: string
        messageRequired: string
        messageMin: string
        perfect: string
        excellent: string
        validEmail: string
        validPhone: string
        complete: string
      }
      errors: {
        submitError: string
        tryAgain: string
      }
      confirmationNote: string
    }
  }
  footer: {
    tagline: string
    exploreLabel: string
    contactLabel: string
    scheduleCta: string
    email: string
    location: string
    copyright: string
  }
}

export const translations: Record<Language, Translation> = {
  es: {
    nav: {
      services: "Servicios",
      projects: "Proyectos",
      reviews: "Reseñas",
      faq: "Preguntas",
      cta: "Agendar reunión",
    },
    hero: {
      eyebrow: "IA · Automatización · Desarrollo",
      titleLead: "Conectamos",
      tech: "tecnología",
      connector: "con",
      people: "personas",
      subtitle:
        "Ayudamos a empresas a vender más, responder más rápido y trabajar mejor — con automatización, asistentes con IA y plataformas a la medida.",
      ctaPrimary: "Agendar reunión",
      ctaSecondary: "Ver servicios",
      note: "30 min · sin costo · con diagnóstico",
      diagram: {
        people: "PERSONAS",
        results: "RESULTADOS",
        whatsapp: "WhatsApp",
        email: "Correo",
        site: "Sitio web",
        node: "dos nodos",
        result1: "✓ Cotización · 40s",
        result2: "✓ CRM actualizado",
        result3: "★ Reunión agendada",
        aria: "Diagrama: canales de personas (WhatsApp, correo, sitio web) conectados por Dos Nodos hacia resultados: cotización en 40 segundos, CRM actualizado y reunión agendada",
      },
    },
    metrics: {
      responseTime: { value: "−80%", label: "en tiempo de respuesta a clientes" },
      availability: { value: "24/7", label: "atención y ventas, sin turnos" },
      quotes: { value: "3×", label: "cotizaciones procesadas por día" },
      speed: { value: "40s", label: "de una pregunta a una cotización" },
    },
    services: {
      eyebrow: "Servicios",
      title: "Todo lo que tu operación necesita,",
      titleAccent: "en un solo lugar.",
      subtitle:
        "Desde el sitio que te representa hasta el asistente que responde por ti. Elegimos la tecnología según el resultado, no al revés.",
      categories: [
        {
          eyebrow: "Sitios web & e‑Commerce",
          title: "Presencia digital que vende",
          description: "Sitios de alto impacto visual y tiendas listas para facturar desde el primer día.",
          items: [
            {
              id: "web-design",
              title: "Diseño de Páginas Web",
              description: "Sitios de alto impacto visual, memorables y construidos para convertir visitas en clientes.",
              chips: ["Alto impacto visual", "Responsive"],
            },
            {
              id: "ecommerce",
              title: "Desarrollo de e‑Commerce",
              description: "Tiendas completas con checkout optimizado, pagos y post‑venta automatizada.",
              chips: ["Checkout", "Pagos", "Wompi"],
              badge: "MÁS SOLICITADO",
            },
            {
              id: "shopify",
              title: "Desarrollo de Shopify",
              description: "Tiendas Shopify sólidas, fáciles de operar y listas para crecer sin rehacerlas.",
              chips: ["Shopify", "Temas a medida"],
            },
            {
              id: "landing-express",
              title: "Landing Express para negocios locales",
              description: "Una página lista en 3 a 5 días, conectada a WhatsApp, pensada para negocios de barrio que venden por chat.",
              chips: ["3–5 días", "WhatsApp", "Desde $700k"],
              badge: "SITIO APARTE",
              externalHref: "https://ventas.dosnodos.com.co",
            },
          ],
        },
        {
          eyebrow: "Apps & Software a la medida",
          title: "Cuando lo genérico no alcanza",
          description: "Construimos exactamente lo que tu proceso necesita, sin plantillas.",
          items: [
            {
              id: "web-app",
              title: "Aplicaciones Web",
              description: "Productos digitales veloces y seguros, accesibles desde cualquier lugar.",
              chips: ["Next.js", "Dashboards"],
            },
            {
              id: "mobile-app",
              title: "Aplicaciones Móviles",
              description: "Apps intuitivas para iOS, Android y entornos multiplataforma.",
              chips: ["iOS", "Android"],
            },
            {
              id: "custom-dev",
              title: "Desarrollo a la Medida",
              description: "Software diseñado alrededor de los procesos únicos de tu negocio.",
              chips: ["Portales", "Integraciones"],
            },
          ],
        },
        {
          eyebrow: "IA, Automatización & Crecimiento",
          title: "Tecnología que trabaja sola",
          description: "Vender y operar sin fricción, también fuera del horario laboral.",
          items: [
            {
              id: "ai-assistant",
              title: "Asistentes Virtuales Inteligentes",
              description: "Atienden, cotizan y agendan por WhatsApp y correo, 24/7, con la información de tu negocio.",
              chips: ["WhatsApp API", "24/7"],
              badge: "ESTRELLA",
            },
            {
              id: "automation",
              title: "Automatización de Procesos",
              description: "Integramos tus plataformas para que el trabajo repetitivo corra solo.",
              chips: ["n8n", "APIs", "ERP · CRM"],
            },
            {
              id: "seo",
              title: "Marketing Digital & SEO",
              description: "Que te encuentren en Google y también en las respuestas de la IA.",
              chips: ["SEO", "GEO", "Ads"],
            },
            {
              id: "branding",
              title: "Diseño de Marca",
              description: "Identidad visual coherente en cada punto de contacto con tu cliente.",
              chips: ["Identidad", "Diseño"],
            },
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Proyectos",
      title: "Resultados que se miden.",
      items: {
        distribuidora: {
          tag: "Asistente IA + ERP",
          title: "Distribuidora de repuestos",
          description: "Cotizaciones por WhatsApp en menos de un minuto, con inventario en tiempo real.",
          resultLabel: "Resultado",
          result: "3× cotizaciones/día",
        },
        cosmetica: {
          tag: "Shopify + e‑Commerce",
          title: "Marca de cosmética",
          description: "Tienda rediseñada y ventas nocturnas respondidas por un asistente.",
          resultLabel: "Resultado",
          result: "+38% conversión",
        },
        clinica: {
          tag: "Automatización",
          title: "Clínica odontológica",
          description: "Agenda automática con recordatorios; menos citas perdidas.",
          resultLabel: "Resultado",
          result: "−45% inasistencia",
        },
      },
    },
    reviews: {
      eyebrow: "Reseñas",
      average: "4.9 promedio",
      items: {
        diana: {
          quote: "Antes el equipo pasaba las tardes digitando pedidos. Hoy ese tiempo es para los clientes.",
          name: "Diana R.",
          role: "Gerente general · Distribuidora",
          initials: "DR",
        },
        mateo: {
          quote: "La tienda quedó impecable y las ventas nocturnas ahora se responden solas.",
          name: "Mateo P.",
          role: "Fundador · Cosmética",
          initials: "MP",
        },
        laura: {
          quote: "Entendieron el problema real y no nos vendieron humo. El agendamiento cambió la clínica.",
          name: "Laura C.",
          role: "Directora · Clínica",
          initials: "LC",
        },
      },
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Lo que suelen",
      titleAccent: "preguntarnos.",
      items: [
        {
          question: "¿Qué hace Dos Nodos?",
          answer:
            "Dos Nodos es una empresa colombiana de tecnología que ayuda a empresas a vender más y trabajar mejor con tres frentes: sitios web y tiendas e‑Commerce, aplicaciones y software a la medida, e inteligencia artificial con automatización de procesos.",
        },
        {
          question: "¿Cuánto cuesta un sitio web o una tienda en línea?",
          answer:
            "Depende del alcance. Un sitio corporativo suele ir de 6 a 12 semanas de trabajo y una tienda e‑Commerce depende del catálogo y las integraciones. Entregamos por etapas y cotizamos con precio cerrado después de una reunión de diagnóstico de 30 minutos, sin costo.",
        },
        {
          question: "¿Cuánto tarda un proyecto?",
          answer:
            "Las primeras automatizaciones o un asistente con IA quedan operando en 2 a 4 semanas. Sitios web, tiendas y plataformas completas toman entre 6 y 12 semanas según el alcance. Siempre entregamos por etapas para que veas resultados desde el primer mes.",
        },
        {
          question: "¿Tengo que cambiar las herramientas que ya uso?",
          answer:
            "No. Trabajamos sobre lo que ya tienes: tu ERP, tu CRM, WhatsApp, Shopify, Siigo, Google Workspace o Microsoft 365, y los conectamos para que funcionen como un solo sistema.",
        },
        {
          question: "¿Qué es un asistente virtual inteligente y para qué sirve?",
          answer:
            "Es un asistente entrenado con la información de tu negocio que responde por WhatsApp o correo las 24 horas: atiende preguntas, cotiza, agenda citas y registra cada contacto en tu CRM. Nuestros clientes pasan de horas a menos de un minuto en enviar una cotización.",
        },
        {
          question: "¿Trabajan con empresas fuera de Colombia?",
          answer:
            "Sí. Estamos en Medellín, Colombia, y trabajamos de forma remota con empresas de toda Latinoamérica y Estados Unidos, en español, inglés y portugués.",
        },
        {
          question: "¿Cómo empiezo a trabajar con Dos Nodos?",
          answer:
            "Agenda una reunión de 30 minutos sin costo en dosnodos.com.co o escríbenos por WhatsApp. En esa sesión revisamos tu operación y sales con un diagnóstico concreto de qué se puede automatizar o construir primero.",
        },
      ],
    },
    servicePage: {
      breadcrumbHome: "Inicio",
      breadcrumbServices: "Servicios",
      servicesTitle: "Servicios de tecnología para tu empresa",
      servicesSubtitle:
        "Sitios web y tiendas, aplicaciones a la medida, e inteligencia artificial con automatización. Todo con un mismo equipo.",
      benefitsTitle: "Qué incluye",
      faqTitle: "Preguntas frecuentes",
      ctaTitle: "¿Hablamos de tu proyecto?",
      ctaSubtitle:
        "30 minutos, sin costo. Sales con un diagnóstico concreto y un siguiente paso claro.",
      ctaButton: "Agendar reunión",
      otherServices: "Otros servicios",
      seeService: "Ver servicio",
    },
    contact: {
      eyebrow: "Hablemos",
      titleLead: "Hablemos de",
      titleAccent: "tu operación.",
      subtitle:
        "En 30 minutos encontramos al menos un proceso que puedes dejar de hacer a mano. Sin costo, sin compromiso.",
      whatsapp: "WhatsApp +57 312 734 4026",
      email: "hola@dosnodos.com.co",
      form: {
        name: "Nombre",
        email: "Correo de trabajo",
        company: "Empresa",
        phone: "Teléfono",
        message: "¿Qué quieres mejorar? Ej: responder más rápido por WhatsApp",
        submit: "Agendar una reunión",
        submitting: "Enviando...",
        success: {
          title: "¡Listo! Te escribimos hoy.",
          message: "Recibimos tu solicitud. Coordinamos los 30 minutos por WhatsApp o correo.",
          button: "Enviar otra solicitud",
        },
        progress: "Progreso",
        validation: {
          nameRequired: "El nombre es requerido",
          nameMin: "El nombre debe tener al menos 2 caracteres",
          emailRequired: "El correo es requerido",
          emailInvalid: "Ingresa un correo válido",
          companyRequired: "El nombre de la empresa es requerido",
          phoneRequired: "El teléfono es requerido",
          phoneInvalid: "Ingresa un teléfono válido",
          messageRequired: "El mensaje es requerido",
          messageMin: "El mensaje debe tener al menos 10 caracteres",
          perfect: "Perfecto",
          excellent: "Excelente",
          validEmail: "Correo válido",
          validPhone: "Teléfono válido",
          complete: "Mensaje completo",
        },
        errors: {
          submitError: "Error al enviar. Por favor intenta nuevamente.",
          tryAgain: "Inténtalo de nuevo",
        },
        confirmationNote: "Sin compromiso · Tus datos no se comparten",
      },
    },
    footer: {
      tagline: "Conectamos tecnología con personas.",
      exploreLabel: "Explora",
      contactLabel: "Contacto",
      scheduleCta: "Agendar reunión",
      email: "hola@dosnodos.com.co",
      location: "Medellín, Colombia",
      copyright: "© 2026 Dos Nodos · dosnodos.com.co",
    },
  },

  en: {
    nav: {
      services: "Services",
      projects: "Projects",
      reviews: "Reviews",
      faq: "FAQ",
      cta: "Book a meeting",
    },
    hero: {
      eyebrow: "AI · Automation · Development",
      titleLead: "We connect",
      tech: "technology",
      connector: "with",
      people: "people",
      subtitle:
        "We help companies sell more, respond faster and work better — with automation, AI assistants and custom-built platforms.",
      ctaPrimary: "Book a meeting",
      ctaSecondary: "See services",
      note: "30 min · free · with a diagnosis",
      diagram: {
        people: "PEOPLE",
        results: "RESULTS",
        whatsapp: "WhatsApp",
        email: "Email",
        site: "Website",
        node: "dos nodos",
        result1: "✓ Quote · 40s",
        result2: "✓ CRM updated",
        result3: "★ Meeting booked",
        aria: "Diagram: people channels (WhatsApp, email, website) connected by Dos Nodos to results: a quote in 40 seconds, updated CRM and a booked meeting",
      },
    },
    metrics: {
      responseTime: { value: "−80%", label: "in customer response time" },
      availability: { value: "24/7", label: "service and sales, no shifts" },
      quotes: { value: "3×", label: "quotes processed per day" },
      speed: { value: "40s", label: "from a question to a quote" },
    },
    services: {
      eyebrow: "Services",
      title: "Everything your operation needs,",
      titleAccent: "in one place.",
      subtitle:
        "From the site that represents you to the assistant that answers for you. We choose technology based on the result, not the other way around.",
      categories: [
        {
          eyebrow: "Websites & e‑Commerce",
          title: "A digital presence that sells",
          description: "High-impact websites and stores ready to sell from day one.",
          items: [
            {
              id: "web-design",
              title: "Website Design",
              description: "Visually striking, memorable sites built to turn visits into customers.",
              chips: ["High visual impact", "Responsive"],
            },
            {
              id: "ecommerce",
              title: "e‑Commerce Development",
              description: "Complete stores with optimized checkout, payments and automated post-sale.",
              chips: ["Checkout", "Payments"],
              badge: "MOST REQUESTED",
            },
            {
              id: "shopify",
              title: "Shopify Development",
              description: "Robust Shopify stores that are easy to run and ready to grow.",
              chips: ["Shopify", "Custom themes"],
            },
            {
              id: "landing-express",
              title: "Express landing for local businesses",
              description: "A page live in 3 to 5 days, wired to WhatsApp, built for neighbourhood businesses that sell over chat.",
              chips: ["3–5 days", "WhatsApp", "From $700k COP"],
              badge: "SEPARATE SITE",
              externalHref: "https://ventas.dosnodos.com.co",
            },
          ],
        },
        {
          eyebrow: "Apps & Custom software",
          title: "When generic isn't enough",
          description: "We build exactly what your process needs — no templates.",
          items: [
            {
              id: "web-app",
              title: "Web Applications",
              description: "Fast, secure digital products accessible from anywhere.",
              chips: ["Next.js", "Dashboards"],
            },
            {
              id: "mobile-app",
              title: "Mobile Applications",
              description: "Intuitive apps for iOS, Android and cross-platform environments.",
              chips: ["iOS", "Android"],
            },
            {
              id: "custom-dev",
              title: "Custom Development",
              description: "Software designed around your business's unique processes.",
              chips: ["Portals", "Integrations"],
            },
          ],
        },
        {
          eyebrow: "AI, Automation & Growth",
          title: "Technology that works on its own",
          description: "Sell and operate without friction, also outside business hours.",
          items: [
            {
              id: "ai-assistant",
              title: "Intelligent Virtual Assistants",
              description: "They answer, quote and schedule over WhatsApp and email, 24/7, trained on your business.",
              chips: ["WhatsApp API", "24/7"],
              badge: "FLAGSHIP",
            },
            {
              id: "automation",
              title: "Process Automation",
              description: "We connect your platforms so repetitive work runs by itself.",
              chips: ["n8n", "APIs", "ERP · CRM"],
            },
            {
              id: "seo",
              title: "Digital Marketing & SEO",
              description: "Get found on Google — and inside AI answers too.",
              chips: ["SEO", "GEO", "Ads"],
            },
            {
              id: "branding",
              title: "Brand Design",
              description: "Consistent visual identity across every customer touchpoint.",
              chips: ["Identity", "Design"],
            },
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Projects",
      title: "Results you can measure.",
      items: {
        distribuidora: {
          tag: "AI Assistant + ERP",
          title: "Auto-parts distributor",
          description: "Quotes over WhatsApp in under a minute, with real-time inventory.",
          resultLabel: "Result",
          result: "3× quotes/day",
        },
        cosmetica: {
          tag: "Shopify + e‑Commerce",
          title: "Cosmetics brand",
          description: "Redesigned store with night sales answered by an assistant.",
          resultLabel: "Result",
          result: "+38% conversion",
        },
        clinica: {
          tag: "Automation",
          title: "Dental clinic",
          description: "Automatic scheduling with reminders; fewer missed appointments.",
          resultLabel: "Result",
          result: "−45% no-shows",
        },
      },
    },
    reviews: {
      eyebrow: "Reviews",
      average: "4.9 average",
      items: {
        diana: {
          quote: "Our team used to spend afternoons keying in orders. Now that time goes to customers.",
          name: "Diana R.",
          role: "General Manager · Distributor",
          initials: "DR",
        },
        mateo: {
          quote: "The store looks flawless and night sales now answer themselves.",
          name: "Mateo P.",
          role: "Founder · Cosmetics",
          initials: "MP",
        },
        laura: {
          quote: "They understood the real problem and didn't sell us smoke. Scheduling changed the clinic.",
          name: "Laura C.",
          role: "Director · Clinic",
          initials: "LC",
        },
      },
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "What people usually",
      titleAccent: "ask us.",
      items: [
        {
          question: "What does Dos Nodos do?",
          answer:
            "Dos Nodos is a Colombian technology company that helps businesses sell more and work better across three areas: websites and e‑Commerce stores, custom apps and software, and artificial intelligence with process automation.",
        },
        {
          question: "How much does a website or online store cost?",
          answer:
            "It depends on scope. A corporate site usually takes 6 to 12 weeks, and an e‑Commerce store depends on catalog size and integrations. We deliver in stages and quote a fixed price after a free 30-minute diagnosis call.",
        },
        {
          question: "How long does a project take?",
          answer:
            "First automations or an AI assistant go live in 2 to 4 weeks. Full websites, stores and platforms take 6 to 12 weeks depending on scope. We always deliver in stages so you see results within the first month.",
        },
        {
          question: "Do I have to change the tools I already use?",
          answer:
            "No. We work with what you already have — your ERP, CRM, WhatsApp, Shopify, Google Workspace or Microsoft 365 — and connect them so they behave like one system.",
        },
        {
          question: "What is an intelligent virtual assistant and what is it for?",
          answer:
            "It's an assistant trained on your business information that answers over WhatsApp or email 24/7: it handles questions, sends quotes, books appointments and logs every contact in your CRM. Our clients go from hours to under a minute to send a quote.",
        },
        {
          question: "Do you work with companies outside Colombia?",
          answer:
            "Yes. We're based in Medellín, Colombia, and work remotely with companies across Latin America and the United States, in Spanish, English and Portuguese.",
        },
        {
          question: "How do I start working with Dos Nodos?",
          answer:
            "Book a free 30-minute call at dosnodos.com.co or message us on WhatsApp. In that session we review your operation and you leave with a concrete diagnosis of what to automate or build first.",
        },
      ],
    },
    servicePage: {
      breadcrumbHome: "Home",
      breadcrumbServices: "Services",
      servicesTitle: "Technology services for your company",
      servicesSubtitle:
        "Websites and stores, custom applications, and artificial intelligence with automation. All from one team.",
      benefitsTitle: "What's included",
      faqTitle: "Frequently asked questions",
      ctaTitle: "Shall we talk about your project?",
      ctaSubtitle: "30 minutes, free. You leave with a concrete diagnosis and a clear next step.",
      ctaButton: "Book a meeting",
      otherServices: "Other services",
      seeService: "View service",
    },
    contact: {
      eyebrow: "Let's talk",
      titleLead: "Let's talk about",
      titleAccent: "your operation.",
      subtitle:
        "In 30 minutes we'll find at least one process you can stop doing by hand. Free, no commitment.",
      whatsapp: "WhatsApp +57 312 734 4026",
      email: "hola@dosnodos.com.co",
      form: {
        name: "Name",
        email: "Work email",
        company: "Company",
        phone: "Phone",
        message: "What do you want to improve? E.g.: respond faster on WhatsApp",
        submit: "Book a meeting",
        submitting: "Sending...",
        success: {
          title: "Done! We'll write to you today.",
          message: "We received your request. We'll set up the 30 minutes over WhatsApp or email.",
          button: "Send another request",
        },
        progress: "Progress",
        validation: {
          nameRequired: "Name is required",
          nameMin: "Name must be at least 2 characters",
          emailRequired: "Email is required",
          emailInvalid: "Enter a valid email",
          companyRequired: "Company name is required",
          phoneRequired: "Phone is required",
          phoneInvalid: "Enter a valid phone",
          messageRequired: "Message is required",
          messageMin: "Message must be at least 10 characters",
          perfect: "Perfect",
          excellent: "Excellent",
          validEmail: "Valid email",
          validPhone: "Valid phone",
          complete: "Complete message",
        },
        errors: {
          submitError: "Error sending. Please try again.",
          tryAgain: "Try again",
        },
        confirmationNote: "No commitment · Your data isn't shared",
      },
    },
    footer: {
      tagline: "We connect technology with people.",
      exploreLabel: "Explore",
      contactLabel: "Contact",
      scheduleCta: "Book a meeting",
      email: "hola@dosnodos.com.co",
      location: "Medellín, Colombia",
      copyright: "© 2026 Dos Nodos · dosnodos.com.co",
    },
  },

  pt: {
    nav: {
      services: "Serviços",
      projects: "Projetos",
      reviews: "Avaliações",
      faq: "Perguntas",
      cta: "Agendar reunião",
    },
    hero: {
      eyebrow: "IA · Automação · Desenvolvimento",
      titleLead: "Conectamos",
      tech: "tecnologia",
      connector: "com",
      people: "pessoas",
      subtitle:
        "Ajudamos empresas a vender mais, responder mais rápido e trabalhar melhor — com automação, assistentes com IA e plataformas sob medida.",
      ctaPrimary: "Agendar reunião",
      ctaSecondary: "Ver serviços",
      note: "30 min · sem custo · com diagnóstico",
      diagram: {
        people: "PESSOAS",
        results: "RESULTADOS",
        whatsapp: "WhatsApp",
        email: "E-mail",
        site: "Site",
        node: "dos nodos",
        result1: "✓ Cotação · 40s",
        result2: "✓ CRM atualizado",
        result3: "★ Reunião agendada",
        aria: "Diagrama: canais de pessoas (WhatsApp, e-mail, site) conectados pela Dos Nodos a resultados: cotação em 40 segundos, CRM atualizado e reunião agendada",
      },
    },
    metrics: {
      responseTime: { value: "−80%", label: "no tempo de resposta ao cliente" },
      availability: { value: "24/7", label: "atendimento e vendas, sem turnos" },
      quotes: { value: "3×", label: "cotações processadas por dia" },
      speed: { value: "40s", label: "de uma pergunta a uma cotação" },
    },
    services: {
      eyebrow: "Serviços",
      title: "Tudo o que sua operação precisa,",
      titleAccent: "em um só lugar.",
      subtitle:
        "Do site que te representa ao assistente que responde por você. Escolhemos a tecnologia pelo resultado, não o contrário.",
      categories: [
        {
          eyebrow: "Sites & e‑Commerce",
          title: "Presença digital que vende",
          description: "Sites de alto impacto visual e lojas prontas para vender desde o primeiro dia.",
          items: [
            {
              id: "web-design",
              title: "Design de Sites",
              description: "Sites de alto impacto visual, memoráveis e construídos para converter visitas em clientes.",
              chips: ["Alto impacto visual", "Responsivo"],
            },
            {
              id: "ecommerce",
              title: "Desenvolvimento de e‑Commerce",
              description: "Lojas completas com checkout otimizado, pagamentos e pós‑venda automatizado.",
              chips: ["Checkout", "Pagamentos"],
              badge: "MAIS PROCURADO",
            },
            {
              id: "shopify",
              title: "Desenvolvimento Shopify",
              description: "Lojas Shopify robustas, fáceis de operar e prontas para crescer.",
              chips: ["Shopify", "Temas sob medida"],
            },
            {
              id: "landing-express",
              title: "Landing Express para negócios locais",
              description: "Uma página pronta em 3 a 5 dias, conectada ao WhatsApp, pensada para negócios de bairro que vendem por chat.",
              chips: ["3–5 dias", "WhatsApp", "A partir de $700k COP"],
              badge: "SITE À PARTE",
              externalHref: "https://ventas.dosnodos.com.co",
            },
          ],
        },
        {
          eyebrow: "Apps & Software sob medida",
          title: "Quando o genérico não basta",
          description: "Construímos exatamente o que seu processo precisa, sem modelos prontos.",
          items: [
            {
              id: "web-app",
              title: "Aplicações Web",
              description: "Produtos digitais rápidos e seguros, acessíveis de qualquer lugar.",
              chips: ["Next.js", "Dashboards"],
            },
            {
              id: "mobile-app",
              title: "Aplicativos Móveis",
              description: "Aplicativos intuitivos para iOS, Android e ambientes multiplataforma.",
              chips: ["iOS", "Android"],
            },
            {
              id: "custom-dev",
              title: "Desenvolvimento Sob Medida",
              description: "Software projetado para os processos únicos do seu negócio.",
              chips: ["Portais", "Integrações"],
            },
          ],
        },
        {
          eyebrow: "IA, Automação & Crescimento",
          title: "Tecnologia que trabalha sozinha",
          description: "Vender e operar sem atrito, também fora do horário comercial.",
          items: [
            {
              id: "ai-assistant",
              title: "Assistentes Virtuais Inteligentes",
              description: "Atendem, cotam e agendam por WhatsApp e e-mail, 24/7, treinados com seu negócio.",
              chips: ["WhatsApp API", "24/7"],
              badge: "DESTAQUE",
            },
            {
              id: "automation",
              title: "Automação de Processos",
              description: "Conectamos suas plataformas para que o trabalho repetitivo rode sozinho.",
              chips: ["n8n", "APIs", "ERP · CRM"],
            },
            {
              id: "seo",
              title: "Marketing Digital & SEO",
              description: "Ser encontrado no Google e também nas respostas da IA.",
              chips: ["SEO", "GEO", "Ads"],
            },
            {
              id: "branding",
              title: "Design de Marca",
              description: "Identidade visual coerente em cada ponto de contato com seu cliente.",
              chips: ["Identidade", "Design"],
            },
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Projetos",
      title: "Resultados que se medem.",
      items: {
        distribuidora: {
          tag: "Assistente IA + ERP",
          title: "Distribuidora de peças",
          description: "Cotações por WhatsApp em menos de um minuto, com estoque em tempo real.",
          resultLabel: "Resultado",
          result: "3× cotações/dia",
        },
        cosmetica: {
          tag: "Shopify + e‑Commerce",
          title: "Marca de cosméticos",
          description: "Loja redesenhada e vendas noturnas respondidas por um assistente.",
          resultLabel: "Resultado",
          result: "+38% conversão",
        },
        clinica: {
          tag: "Automação",
          title: "Clínica odontológica",
          description: "Agenda automática com lembretes; menos consultas perdidas.",
          resultLabel: "Resultado",
          result: "−45% faltas",
        },
      },
    },
    reviews: {
      eyebrow: "Avaliações",
      average: "4.9 média",
      items: {
        diana: {
          quote: "Antes a equipe passava as tardes digitando pedidos. Hoje esse tempo é para os clientes.",
          name: "Diana R.",
          role: "Gerente geral · Distribuidora",
          initials: "DR",
        },
        mateo: {
          quote: "A loja ficou impecável e as vendas noturnas agora se respondem sozinhas.",
          name: "Mateo P.",
          role: "Fundador · Cosméticos",
          initials: "MP",
        },
        laura: {
          quote: "Entenderam o problema real e não venderam ilusão. O agendamento mudou a clínica.",
          name: "Laura C.",
          role: "Diretora · Clínica",
          initials: "LC",
        },
      },
    },
    faq: {
      eyebrow: "Perguntas frequentes",
      title: "O que costumam",
      titleAccent: "nos perguntar.",
      items: [
        {
          question: "O que a Dos Nodos faz?",
          answer:
            "A Dos Nodos é uma empresa colombiana de tecnologia que ajuda empresas a vender mais e trabalhar melhor em três frentes: sites e lojas e‑Commerce, aplicativos e software sob medida, e inteligência artificial com automação de processos.",
        },
        {
          question: "Quanto custa um site ou uma loja online?",
          answer:
            "Depende do escopo. Um site corporativo leva de 6 a 12 semanas e uma loja e‑Commerce depende do catálogo e das integrações. Entregamos por etapas e orçamos com preço fechado após uma reunião de diagnóstico de 30 minutos, sem custo.",
        },
        {
          question: "Quanto tempo leva um projeto?",
          answer:
            "As primeiras automações ou um assistente com IA entram em operação em 2 a 4 semanas. Sites, lojas e plataformas completas levam de 6 a 12 semanas conforme o escopo. Sempre entregamos por etapas para que você veja resultados no primeiro mês.",
        },
        {
          question: "Preciso trocar as ferramentas que já uso?",
          answer:
            "Não. Trabalhamos com o que você já tem — seu ERP, CRM, WhatsApp, Shopify, Google Workspace ou Microsoft 365 — e conectamos tudo para funcionar como um só sistema.",
        },
        {
          question: "O que é um assistente virtual inteligente e para que serve?",
          answer:
            "É um assistente treinado com as informações do seu negócio que responde por WhatsApp ou e-mail 24 horas: atende perguntas, envia cotações, agenda compromissos e registra cada contato no seu CRM. Nossos clientes passam de horas para menos de um minuto para enviar uma cotação.",
        },
        {
          question: "Vocês trabalham com empresas fora da Colômbia?",
          answer:
            "Sim. Estamos em Medellín, Colômbia, e trabalhamos remotamente com empresas de toda a América Latina e dos Estados Unidos, em espanhol, inglês e português.",
        },
        {
          question: "Como começo a trabalhar com a Dos Nodos?",
          answer:
            "Agende uma reunião de 30 minutos sem custo em dosnodos.com.co ou fale com a gente no WhatsApp. Nessa conversa revisamos sua operação e você sai com um diagnóstico concreto do que automatizar ou construir primeiro.",
        },
      ],
    },
    servicePage: {
      breadcrumbHome: "Início",
      breadcrumbServices: "Serviços",
      servicesTitle: "Serviços de tecnologia para sua empresa",
      servicesSubtitle:
        "Sites e lojas, aplicações sob medida e inteligência artificial com automação. Tudo com uma única equipe.",
      benefitsTitle: "O que inclui",
      faqTitle: "Perguntas frequentes",
      ctaTitle: "Vamos falar do seu projeto?",
      ctaSubtitle: "30 minutos, sem custo. Você sai com um diagnóstico concreto e um próximo passo claro.",
      ctaButton: "Agendar reunião",
      otherServices: "Outros serviços",
      seeService: "Ver serviço",
    },
    contact: {
      eyebrow: "Vamos conversar",
      titleLead: "Vamos falar da",
      titleAccent: "sua operação.",
      subtitle:
        "Em 30 minutos encontramos ao menos um processo que você pode deixar de fazer à mão. Sem custo, sem compromisso.",
      whatsapp: "WhatsApp +57 312 734 4026",
      email: "hola@dosnodos.com.co",
      form: {
        name: "Nome",
        email: "E-mail de trabalho",
        company: "Empresa",
        phone: "Telefone",
        message: "O que você quer melhorar? Ex: responder mais rápido no WhatsApp",
        submit: "Agendar uma reunião",
        submitting: "Enviando...",
        success: {
          title: "Pronto! Escrevemos hoje.",
          message: "Recebemos sua solicitação. Combinamos os 30 minutos por WhatsApp ou e-mail.",
          button: "Enviar outra solicitação",
        },
        progress: "Progresso",
        validation: {
          nameRequired: "O nome é obrigatório",
          nameMin: "O nome deve ter pelo menos 2 caracteres",
          emailRequired: "O e-mail é obrigatório",
          emailInvalid: "Digite um e-mail válido",
          companyRequired: "O nome da empresa é obrigatório",
          phoneRequired: "O telefone é obrigatório",
          phoneInvalid: "Digite um telefone válido",
          messageRequired: "A mensagem é obrigatória",
          messageMin: "A mensagem deve ter pelo menos 10 caracteres",
          perfect: "Perfeito",
          excellent: "Excelente",
          validEmail: "E-mail válido",
          validPhone: "Telefone válido",
          complete: "Mensagem completa",
        },
        errors: {
          submitError: "Erro ao enviar. Por favor tente novamente.",
          tryAgain: "Tente novamente",
        },
        confirmationNote: "Sem compromisso · Seus dados não são compartilhados",
      },
    },
    footer: {
      tagline: "Conectamos tecnologia com pessoas.",
      exploreLabel: "Explore",
      contactLabel: "Contato",
      scheduleCta: "Agendar reunião",
      email: "hola@dosnodos.com.co",
      location: "Medellín, Colômbia",
      copyright: "© 2026 Dos Nodos · dosnodos.com.co",
    },
  },
}

export const languageNames: Record<Language, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
}
