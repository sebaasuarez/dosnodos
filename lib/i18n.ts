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

interface ServiceCard {
  title: string
  description: string
  chips: string[]
  badge?: string
}

interface WebDevelopmentService {
  title: string
  description: string
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
    platforms: ServiceCard
    apps: ServiceCard
    ai: ServiceCard
    webDevelopment: {
      eyebrow: string
      title: string
      subtitle: string
      items: WebDevelopmentService[]
    }
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
      platforms: {
        title: "Plataformas & e‑Commerce",
        description: "Sitios y tiendas que cargan rápido, convierten y son fáciles de administrar.",
        chips: ["Shopify", "Web", "e‑Commerce"],
      },
      apps: {
        title: "Apps & Software a medida",
        description: "Cuando lo genérico no alcanza, construimos exactamente lo que tu proceso necesita.",
        chips: ["Web app", "Móvil", "A la medida"],
      },
      ai: {
        title: "IA & Automatización",
        description: "Asistentes que atienden, cotizan y agendan. Procesos que corren solos, 24/7.",
        chips: ["WhatsApp API", "n8n"],
        badge: "ESTRELLA",
      },
      webDevelopment: {
        eyebrow: "Desarrollo web",
        title: "Visibiliza en línea tu marca con el desarrollo de páginas web",
        subtitle:
          "Diseñamos y construimos experiencias digitales rápidas, escalables y enfocadas en convertir visitas en oportunidades.",
        items: [
          { title: "Desarrollo de Shopify", description: "Tiendas sólidas, fáciles de operar y listas para crecer." },
          { title: "Diseño de Páginas Web", description: "Sitios memorables que comunican el valor real de tu marca." },
          { title: "Desarrollo de e-Commerce", description: "Experiencias de compra optimizadas de principio a fin." },
          { title: "Desarrollo de Aplicaciones Móviles", description: "Aplicaciones intuitivas para iOS, Android y entornos multiplataforma." },
          { title: "Desarrollo de Aplicaciones Web", description: "Productos digitales veloces, seguros y accesibles desde cualquier lugar." },
          { title: "Desarrollo a la Medida", description: "Software diseñado alrededor de los procesos únicos de tu negocio." },
        ],
      },
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
      platforms: {
        title: "Platforms & e‑Commerce",
        description: "Sites and stores that load fast, convert and are easy to manage.",
        chips: ["Shopify", "Web", "e‑Commerce"],
      },
      apps: {
        title: "Apps & Custom software",
        description: "When generic isn't enough, we build exactly what your process needs.",
        chips: ["Web app", "Mobile", "Custom"],
      },
      ai: {
        title: "AI & Automation",
        description: "Assistants that answer, quote and schedule. Processes that run on their own, 24/7.",
        chips: ["WhatsApp API", "n8n"],
        badge: "FLAGSHIP",
      },
      webDevelopment: {
        eyebrow: "Web development",
        title: "Make your brand visible online with web development",
        subtitle:
          "We design and build fast, scalable digital experiences focused on turning visits into opportunities.",
        items: [
          { title: "Shopify Development", description: "Robust stores that are easy to run and ready to grow." },
          { title: "Website Design", description: "Memorable sites that communicate your brand's true value." },
          { title: "e-Commerce Development", description: "End-to-end optimized shopping experiences." },
          { title: "Mobile App Development", description: "Intuitive apps for iOS, Android and cross-platform environments." },
          { title: "Web Application Development", description: "Fast, secure digital products accessible from anywhere." },
          { title: "Custom Development", description: "Software designed around your business's unique processes." },
        ],
      },
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
      platforms: {
        title: "Plataformas & e‑Commerce",
        description: "Sites e lojas que carregam rápido, convertem e são fáceis de administrar.",
        chips: ["Shopify", "Web", "e‑Commerce"],
      },
      apps: {
        title: "Apps & Software sob medida",
        description: "Quando o genérico não basta, construímos exatamente o que seu processo precisa.",
        chips: ["Web app", "Mobile", "Sob medida"],
      },
      ai: {
        title: "IA & Automação",
        description: "Assistentes que atendem, cotam e agendam. Processos que rodam sozinhos, 24/7.",
        chips: ["WhatsApp API", "n8n"],
        badge: "DESTAQUE",
      },
      webDevelopment: {
        eyebrow: "Desenvolvimento web",
        title: "Dê visibilidade online à sua marca com desenvolvimento de sites",
        subtitle:
          "Projetamos e construímos experiências digitais rápidas, escaláveis e focadas em transformar visitas em oportunidades.",
        items: [
          { title: "Desenvolvimento Shopify", description: "Lojas robustas, fáceis de operar e prontas para crescer." },
          { title: "Design de Sites", description: "Sites memoráveis que comunicam o valor real da sua marca." },
          { title: "Desenvolvimento de e-Commerce", description: "Experiências de compra otimizadas do início ao fim." },
          { title: "Desenvolvimento de Aplicativos Móveis", description: "Aplicativos intuitivos para iOS, Android e ambientes multiplataforma." },
          { title: "Desenvolvimento de Aplicações Web", description: "Produtos digitais rápidos, seguros e acessíveis de qualquer lugar." },
          { title: "Desenvolvimento Sob Medida", description: "Software projetado para os processos únicos do seu negócio." },
        ],
      },
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
