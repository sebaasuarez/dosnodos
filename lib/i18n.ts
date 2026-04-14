export type Language = "es" | "en" | "pt"

export interface Translation {
  // Navigation
  nav: {
    services: string
    benefits: string
    sectors: string
    contact: string
    demo: string
  }

  // Hero Section
  hero: {
    badge: string
    title: string
    titleHighlight: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    features: {
      support: string
      founded: string
      results: string
    }
  }

  // Services Section
  services: {
    title: string
    subtitle: string
    items: {
      ai: {
        title: string
        description: string
      }
      web: {
        title: string
        description: string
      }
      automation: {
        title: string
        description: string
      }
      marketing: {
        title: string
        description: string
      }
      branding: {
        title: string
        description: string
      }
      integration: {
        title: string
        description: string
      }
    }
  }

  // Benefits Section
  benefits: {
    title: string
    subtitle: string
    items: {
      immediate: {
        title: string
        description: string
      }
      cost: {
        title: string
        description: string
      }
      scalability: {
        title: string
        description: string
      }
      integration: {
        title: string
        description: string
      }
    }
    channels: {
      title: string
      whatsapp: string
      website: string
      ecommerce: string
      crm: string
    }
  }

  // Sectors Section
  sectors: {
    title: string
    subtitle: string
    items: {
      ecommerce: {
        title: string
        description: string
      }
      education: {
        title: string
        description: string
      }
      startups: {
        title: string
        description: string
      }
      health: {
        title: string
        description: string
      }
      sales: {
        title: string
        description: string
      }
      realestate: {
        title: string
        description: string
      }
    }
  }

  // Team Section
  team: {
    title: string
    subtitle: string
    description: string
  }

  // Testimonials Section
  testimonials: {
    title: string
    subtitle: string
    items: {
      laura: {
        text: string
        name: string
        position: string
      }
      roberto: {
        text: string
        name: string
        position: string
      }
      camila: {
        text: string
        name: string
        position: string
      }
    }
    stats: {
      satisfaction: string
      reduction: string
      availability: string
      leads: string
    }
  }

  // CTA Section
  cta: {
    title: string
    subtitle: string
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
    chatbot: {
      title: string
      description: string
    }
  }

  // Footer
  footer: {
    description: string
    services: string
    sectors: string
    contact: string
    rights: string
  }

  // Chat Demo
  chat: {
    assistant: string
    online: string
    greeting: string
    userMessage: string
    response: string
  }
}

export const translations: Record<Language, Translation> = {
  es: {
    nav: {
      services: "Servicios",
      benefits: "Beneficios",
      sectors: "Sectores",
      contact: "Contacto",
      demo: "Solicita tu Demo",
    },
    hero: {
      badge: "🚀 Conectamos tecnología con personas",
      title: "Potencia tu negocio con",
      titleHighlight: "asistentes virtuales",
      subtitle:
        "En DosNodos automatizamos tu atención al cliente con IA, conectamos tu marca con tecnología funcional y generamos valor real y medible para tu empresa.",
      ctaPrimary: "Solicita tu Demo",
      ctaSecondary: "Habla con nuestro bot ahora",
      features: {
        support: "Atención 24/7",
        founded: "Fundada por desarrolladores",
        results: "Resultados medibles",
      },
    },
    services: {
      title: "¿Qué hacemos en DosNodos?",
      subtitle:
        "Ofrecemos soluciones digitales integrales para empresas de todos los sectores, conectando marcas con tecnología funcional e inteligente.",
      items: {
        ai: {
          title: "Asistentes Virtuales Inteligentes",
          description:
            "Chatbots con IA que atienden a tus clientes 24/7. Integración con WhatsApp, web, e-commerce y CRMs. Nuestro servicio estrella.",
        },
        web: {
          title: "Desarrollo Web Moderno",
          description:
            "Páginas web responsivas, rápidas y optimizadas para conversión. Tecnología de vanguardia para tu presencia digital.",
        },
        automation: {
          title: "Automatización de Procesos",
          description:
            "Optimizamos tus operaciones empresariales con automatización inteligente que ahorra tiempo y recursos.",
        },
        marketing: {
          title: "Marketing Digital & SEO",
          description:
            "Estrategias de posicionamiento SEO/SEM para aumentar tu visibilidad y generar más leads calificados.",
        },
        branding: {
          title: "Diseño de Marca",
          description:
            "Branding, identidad visual y logos que conectan emocionalmente con tu audiencia y fortalecen tu marca.",
        },
        integration: {
          title: "Integración Omnicanal",
          description:
            "Conectamos todos tus canales de comunicación en una sola plataforma para una experiencia unificada.",
        },
      },
    },
    benefits: {
      title: "Asistentes virtuales que trabajan por ti 24/7",
      subtitle: "Automatiza tu atención al cliente y libera tiempo para enfocarte en hacer crecer tu negocio",
      items: {
        immediate: {
          title: "Atención Inmediata",
          description: "Respuestas instantáneas a tus clientes, sin esperas ni horarios limitados. Disponible 24/7.",
        },
        cost: {
          title: "Reducción de Costos",
          description: "Ahorra hasta 80% en costos de atención al cliente mientras mejoras la experiencia de usuario.",
        },
        scalability: {
          title: "Escalabilidad",
          description: "Maneja miles de conversaciones simultáneas sin perder calidad ni personalización.",
        },
        integration: {
          title: "Integración Multiplataforma",
          description: "Conecta con WhatsApp, tu sitio web, e-commerce, CRM y todas tus herramientas.",
        },
      },
      channels: {
        title: "Canales de Implementación",
        whatsapp: "WhatsApp Business",
        website: "Sitio Web",
        ecommerce: "E-commerce",
        crm: "CRM Systems",
      },
    },
    sectors: {
      title: "Casos de uso por industria",
      subtitle: "Nuestros asistentes virtuales se adaptan a las necesidades específicas de cada sector",
      items: {
        ecommerce: {
          title: "Negocios Locales & E-commerce",
          description:
            "Soporte de ventas, seguimiento de pedidos, recomendaciones personalizadas y atención post-venta automatizada.",
        },
        education: {
          title: "Universidades & Educación",
          description:
            "Información académica, proceso de inscripciones, soporte estudiantil 24/7 y resolución de consultas frecuentes.",
        },
        startups: {
          title: "Startups & Asesorías",
          description:
            "Consultas especializadas, agendamiento de citas, calificación de leads y soporte técnico automatizado.",
        },
        health: {
          title: "Clínicas & Sector Salud",
          description:
            "Agendamiento de citas médicas, recordatorios de tratamientos, información básica y triaje inicial.",
        },
        sales: {
          title: "Equipos de Ventas",
          description:
            "Calificación automática de leads, seguimiento de prospectos, agendamiento de reuniones y nurturing.",
        },
        realestate: {
          title: "Inmobiliarias & Turismo",
          description:
            "Información de propiedades, reservas de hoteles, tours virtuales y recomendaciones personalizadas.",
        },
      },
    },
    team: {
      title: "Equipo Completo a tu Servicio",
      subtitle:
        "Contamos con un equipo multidisciplinario para apoyarte en cada etapa de la construcción de tu solución",
      description:
        "Desarrolladores, diseñadores, especialistas en IA y consultores estratégicos trabajando juntos para hacer realidad tu proyecto.",
    },
    testimonials: {
      title: "Resultados que generan impacto",
      subtitle: "Empresas que ya transformaron su atención al cliente con DosNodos",
      items: {
        laura: {
          text: "El equipo de DosNodos transformó completamente nuestra atención al cliente. Nuestro asistente virtual responde al instante y los clientes están más satisfechos que nunca.",
          name: "Laura Martínez",
          position: "Gerente, TiendaOnline.co",
        },
        roberto: {
          text: "Implementamos su chatbot en nuestra universidad y ahora atendemos consultas estudiantiles 24/7. La cercanía y profesionalismo de DosNodos fue clave para el éxito.",
          name: "Dr. Roberto Sánchez",
          position: "Director, Universidad Innovación",
        },
        camila: {
          text: "La automatización que desarrolló DosNodos nos permitió escalar sin aumentar personal. Su enfoque tecnológico pero humano marca la diferencia.",
          name: "Camila Pérez",
          position: "CEO, HealthTech Solutions",
        },
      },
      stats: {
        satisfaction: "Satisfacción del cliente",
        reduction: "Reducción en tiempo de respuesta",
        availability: "Disponibilidad garantizada",
        leads: "Más leads calificados",
      },
    },
    cta: {
      title: "Tu negocio está a un clic de volverse inteligente",
      subtitle:
        "Únete a las empresas que ya están transformando su atención al cliente con DosNodos. Agenda tu demo gratuita y descubre cómo podemos potenciar tu negocio.",
      form: {
        name: "Nombre completo",
        email: "Email empresarial",
        company: "Empresa",
        phone: "Teléfono",
        message: "Cuéntanos sobre tu proyecto y cómo podemos ayudarte...",
        submit: "Solicitar Demo Gratuita",
        submitting: "Enviando...",
        success: {
          title: "¡Mensaje enviado con éxito!",
          message:
            "Gracias por tu interés en DosNodos. Nos pondremos en contacto contigo muy pronto para agendar tu demo gratuita.",
          button: "Enviar otro mensaje",
        },
        progress: "Progreso del formulario",
        validation: {
          nameRequired: "El nombre es requerido",
          nameMin: "El nombre debe tener al menos 2 caracteres",
          emailRequired: "El email es requerido",
          emailInvalid: "Ingresa un email válido",
          companyRequired: "El nombre de la empresa es requerido",
          phoneRequired: "El teléfono es requerido",
          phoneInvalid: "Ingresa un teléfono válido",
          messageRequired: "El mensaje es requerido",
          messageMin: "El mensaje debe tener al menos 10 caracteres",
          perfect: "Perfecto",
          excellent: "Excelente",
          validEmail: "Email válido",
          validPhone: "Teléfono válido",
          complete: "Mensaje completo",
        },
        errors: {
          submitError: "Error al enviar el formulario. Por favor intenta nuevamente.",
          tryAgain: "Inténtalo de nuevo",
        },
        confirmationNote: "📧 Revisa tu email (incluyendo spam) para la confirmación",
      },
      chatbot: {
        title: "Próximamente: Nuestro Asistente Virtual",
        description:
          "Aquí podrás hablar directamente con nuestro asistente virtual para resolver dudas y obtener información personalizada sobre nuestros servicios.",
      },
    },
    footer: {
      description:
        "Conectamos tecnología con personas. Agencia de desarrollo y transformación digital fundada por desarrolladores.",
      services: "Servicios",
      sectors: "Sectores",
      contact: "Contacto",
      rights: "Todos los derechos reservados. Conectamos tecnología con personas.",
    },
    chat: {
      assistant: "Asistente DosNodos",
      online: "Siempre disponible",
      greeting: "¡Hola! Soy el asistente de DosNodos. ¿Cómo puedo ayudarte?",
      userMessage: "Necesito automatizar mi atención al cliente",
      response: "Perfecto! Nuestros asistentes virtuales pueden integrarse con WhatsApp, tu web, CRM y más...",
    },
  },
  en: {
    nav: {
      services: "Services",
      benefits: "Benefits",
      sectors: "Sectors",
      contact: "Contact",
      demo: "Request Demo",
    },
    hero: {
      badge: "🚀 Connecting technology with people",
      title: "Power your business with",
      titleHighlight: "intelligent virtual assistants",
      subtitle:
        "At DosNodos we automate your customer service with AI, connect your brand with functional technology and generate real, measurable value for your company.",
      ctaPrimary: "Request Demo",
      ctaSecondary: "Talk to our bot now",
      features: {
        support: "24/7 Support",
        founded: "Founded by developers",
        results: "Measurable results",
      },
    },
    services: {
      title: "What do we do at DosNodos?",
      subtitle:
        "We offer comprehensive digital solutions for companies in all sectors, connecting brands with functional and intelligent technology.",
      items: {
        ai: {
          title: "Intelligent Virtual Assistants",
          description:
            "AI chatbots that serve your customers 24/7. Integration with WhatsApp, web, e-commerce and CRMs. Our flagship service.",
        },
        web: {
          title: "Modern Web Development",
          description:
            "Responsive, fast and conversion-optimized websites. Cutting-edge technology for your digital presence.",
        },
        automation: {
          title: "Process Automation",
          description:
            "We optimize your business operations with intelligent automation that saves time and resources.",
        },
        marketing: {
          title: "Digital Marketing & SEO",
          description: "SEO/SEM positioning strategies to increase your visibility and generate more qualified leads.",
        },
        branding: {
          title: "Brand Design",
          description:
            "Branding, visual identity and logos that emotionally connect with your audience and strengthen your brand.",
        },
        integration: {
          title: "Omnichannel Integration",
          description: "We connect all your communication channels in a single platform for a unified experience.",
        },
      },
    },
    benefits: {
      title: "Virtual assistants that work for you 24/7",
      subtitle: "Automate your customer service and free up time to focus on growing your business",
      items: {
        immediate: {
          title: "Immediate Attention",
          description: "Instant responses to your customers, without waiting or limited hours. Available 24/7.",
        },
        cost: {
          title: "Cost Reduction",
          description: "Save up to 80% on customer service costs while improving user experience.",
        },
        scalability: {
          title: "Scalability",
          description: "Handle thousands of simultaneous conversations without losing quality or personalization.",
        },
        integration: {
          title: "Multi-platform Integration",
          description: "Connect with WhatsApp, your website, e-commerce, CRM and all your tools.",
        },
      },
      channels: {
        title: "Implementation Channels",
        whatsapp: "WhatsApp Business",
        website: "Website",
        ecommerce: "E-commerce",
        crm: "CRM Systems",
      },
    },
    sectors: {
      title: "Use cases by industry",
      subtitle: "Our virtual assistants adapt to the specific needs of each sector",
      items: {
        ecommerce: {
          title: "Local Business & E-commerce",
          description: "Sales support, order tracking, personalized recommendations and automated after-sales service.",
        },
        education: {
          title: "Universities & Education",
          description:
            "Academic information, enrollment process, 24/7 student support and resolution of frequent queries.",
        },
        startups: {
          title: "Startups & Consulting",
          description:
            "Specialized consultations, appointment scheduling, lead qualification and automated technical support.",
        },
        health: {
          title: "Clinics & Health Sector",
          description: "Medical appointment scheduling, treatment reminders, basic information and initial triage.",
        },
        sales: {
          title: "Sales Teams",
          description: "Automatic lead qualification, prospect follow-up, meeting scheduling and nurturing.",
        },
        realestate: {
          title: "Real Estate & Tourism",
          description: "Property information, hotel reservations, virtual tours and personalized recommendations.",
        },
      },
    },
    team: {
      title: "Complete Team at Your Service",
      subtitle: "We have a multidisciplinary team to support you at every stage of building your solution",
      description:
        "Developers, designers, AI specialists and strategic consultants working together to make your project a reality.",
    },
    testimonials: {
      title: "Results that generate impact",
      subtitle: "Companies that have already transformed their customer service with DosNodos",
      items: {
        laura: {
          text: "The DosNodos team completely transformed our customer service. Our virtual assistant responds instantly and customers are more satisfied than ever.",
          name: "Laura Martinez",
          position: "Manager, TiendaOnline.co",
        },
        roberto: {
          text: "We implemented their chatbot at our university and now we handle student queries 24/7. DosNodos' closeness and professionalism was key to success.",
          name: "Dr. Roberto Sanchez",
          position: "Director, Innovation University",
        },
        camila: {
          text: "The automation developed by DosNodos allowed us to scale without increasing staff. Their technological but human approach makes the difference.",
          name: "Camila Perez",
          position: "CEO, HealthTech Solutions",
        },
      },
      stats: {
        satisfaction: "Customer satisfaction",
        reduction: "Reduction in response time",
        availability: "Guaranteed availability",
        leads: "More qualified leads",
      },
    },
    cta: {
      title: "Your business is one click away from becoming intelligent",
      subtitle:
        "Join the companies that are already transforming their customer service with DosNodos. Schedule your free demo and discover how we can boost your business.",
      form: {
        name: "Full name",
        email: "Business email",
        company: "Company",
        phone: "Phone",
        message: "Tell us about your project and how we can help you...",
        submit: "Request Free Demo",
        submitting: "Sending...",
        success: {
          title: "Message sent successfully!",
          message: "Thank you for your interest in DosNodos. We will contact you very soon to schedule your free demo.",
          button: "Send another message",
        },
        progress: "Form progress",
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
          submitError: "Error sending form. Please try again.",
          tryAgain: "Try again",
        },
        confirmationNote: "📧 Check your email (including spam) for confirmation",
      },
      chatbot: {
        title: "Coming Soon: Our Virtual Assistant",
        description:
          "Here you can talk directly with our virtual assistant to resolve doubts and get personalized information about our services.",
      },
    },
    footer: {
      description:
        "Connecting technology with people. Digital development and transformation agency founded by developers.",
      services: "Services",
      sectors: "Sectors",
      contact: "Contact",
      rights: "All rights reserved. Connecting technology with people.",
    },
    chat: {
      assistant: "DosNodos Assistant",
      online: "Always available",
      greeting: "Hello! I'm the DosNodos assistant. How can I help you?",
      userMessage: "I need to automate my customer service",
      response: "Perfect! Our virtual assistants can integrate with WhatsApp, your website, CRM and more...",
    },
  },
  pt: {
    nav: {
      services: "Serviços",
      benefits: "Benefícios",
      sectors: "Setores",
      contact: "Contato",
      demo: "Solicitar Demo",
    },
    hero: {
      badge: "🚀 Conectamos tecnologia com pessoas",
      title: "Potencialize seu negócio com",
      titleHighlight: "assistentes virtuais",
      subtitle:
        "Na DosNodos automatizamos seu atendimento ao cliente com IA, conectamos sua marca com tecnologia funcional e geramos valor real e mensurável para sua empresa.",
      ctaPrimary: "Solicitar Demo",
      ctaSecondary: "Fale com nosso bot agora",
      features: {
        support: "Suporte 24/7",
        founded: "Fundada por desenvolvedores",
        results: "Resultados mensuráveis",
      },
    },
    services: {
      title: "O que fazemos na DosNodos?",
      subtitle:
        "Oferecemos soluções digitais integrais para empresas de todos os setores, conectando marcas com tecnologia funcional e inteligente.",
      items: {
        ai: {
          title: "Assistentes Virtuais Inteligentes",
          description:
            "Chatbots com IA que atendem seus clientes 24/7. Integração com WhatsApp, web, e-commerce e CRMs. Nosso serviço principal.",
        },
        web: {
          title: "Desenvolvimento Web Moderno",
          description:
            "Sites responsivos, rápidos e otimizados para conversão. Tecnologia de ponta para sua presença digital.",
        },
        automation: {
          title: "Automação de Processos",
          description:
            "Otimizamos suas operações empresariais com automação inteligente que economiza tempo e recursos.",
        },
        marketing: {
          title: "Marketing Digital & SEO",
          description:
            "Estratégias de posicionamento SEO/SEM para aumentar sua visibilidade e gerar mais leads qualificados.",
        },
        branding: {
          title: "Design de Marca",
          description:
            "Branding, identidade visual e logos que conectam emocionalmente com seu público e fortalecem sua marca.",
        },
        integration: {
          title: "Integração Omnicanal",
          description:
            "Conectamos todos seus canais de comunicação em uma única plataforma para uma experiência unificada.",
        },
      },
    },
    benefits: {
      title: "Assistentes virtuais que trabalham para você 24/7",
      subtitle: "Automatize seu atendimento ao cliente e libere tempo para focar no crescimento do seu negócio",
      items: {
        immediate: {
          title: "Atendimento Imediato",
          description: "Respostas instantâneas aos seus clientes, sem esperas ou horários limitados. Disponível 24/7.",
        },
        cost: {
          title: "Redução de Custos",
          description:
            "Economize até 80% nos custos de atendimento ao cliente enquanto melhora a experiência do usuário.",
        },
        scalability: {
          title: "Escalabilidade",
          description: "Gerencie milhares de conversas simultâneas sem perder qualidade ou personalização.",
        },
        integration: {
          title: "Integração Multiplataforma",
          description: "Conecte com WhatsApp, seu site, e-commerce, CRM e todas suas ferramentas.",
        },
      },
      channels: {
        title: "Canais de Implementação",
        whatsapp: "WhatsApp Business",
        website: "Site",
        ecommerce: "E-commerce",
        crm: "Sistemas CRM",
      },
    },
    sectors: {
      title: "Casos de uso por indústria",
      subtitle: "Nossos assistentes virtuais se adaptam às necessidades específicas de cada setor",
      items: {
        ecommerce: {
          title: "Negócios Locais & E-commerce",
          description:
            "Suporte de vendas, rastreamento de pedidos, recomendações personalizadas e atendimento pós-venda automatizado.",
        },
        education: {
          title: "Universidades & Educação",
          description:
            "Informações acadêmicas, processo de inscrições, suporte estudantil 24/7 e resolução de consultas frequentes.",
        },
        startups: {
          title: "Startups & Consultorias",
          description:
            "Consultas especializadas, agendamento de reuniões, qualificação de leads e suporte técnico automatizado.",
        },
        health: {
          title: "Clínicas & Setor Saúde",
          description:
            "Agendamento de consultas médicas, lembretes de tratamentos, informações básicas e triagem inicial.",
        },
        sales: {
          title: "Equipes de Vendas",
          description:
            "Qualificação automática de leads, acompanhamento de prospects, agendamento de reuniões e nutrição.",
        },
        realestate: {
          title: "Imobiliárias & Turismo",
          description:
            "Informações de propriedades, reservas de hotéis, tours virtuais e recomendações personalizadas.",
        },
      },
    },
    team: {
      title: "Equipe Completa ao Seu Serviço",
      subtitle: "Temos uma equipe multidisciplinar para apoiá-lo em cada etapa da construção de sua solução",
      description:
        "Desenvolvedores, designers, especialistas em IA e consultores estratégicos trabalhando juntos para tornar seu projeto realidade.",
    },
    testimonials: {
      title: "Resultados que geram impacto",
      subtitle: "Empresas que já transformaram seu atendimento ao cliente com DosNodos",
      items: {
        laura: {
          text: "A equipe da DosNodos transformou completamente nosso atendimento ao cliente. Nosso assistente virtual responde instantaneamente e os clientes estão mais satisfeitos que nunca.",
          name: "Laura Martinez",
          position: "Gerente, TiendaOnline.co",
        },
        roberto: {
          text: "Implementamos seu chatbot em nossa universidade e agora atendemos consultas estudantis 24/7. A proximidade e profissionalismo da DosNodos foi chave para o sucesso.",
          name: "Dr. Roberto Sanchez",
          position: "Diretor, Universidade Inovação",
        },
        camila: {
          text: "A automação desenvolvida pela DosNodos nos permitiu escalar sem aumentar pessoal. Sua abordagem tecnológica mas humana faz a diferença.",
          name: "Camila Perez",
          position: "CEO, HealthTech Solutions",
        },
      },
      stats: {
        satisfaction: "Satisfação do cliente",
        reduction: "Redução no tempo de resposta",
        availability: "Disponibilidade garantida",
        leads: "Mais leads qualificados",
      },
    },
    cta: {
      title: "Seu negócio está a um clique de se tornar inteligente",
      subtitle:
        "Junte-se às empresas que já estão transformando seu atendimento ao cliente com DosNodos. Agende sua demo gratuita e descubra como podemos potencializar seu negócio.",
      form: {
        name: "Nome completo",
        email: "Email empresarial",
        company: "Empresa",
        phone: "Telefone",
        message: "Conte-nos sobre seu projeto e como podemos ajudá-lo...",
        submit: "Solicitar Demo Gratuita",
        submitting: "Enviando...",
        success: {
          title: "Mensagem enviada com sucesso!",
          message:
            "Obrigado pelo seu interesse na DosNodos. Entraremos em contato muito em breve para agendar sua demo gratuita.",
          button: "Enviar outra mensagem",
        },
        progress: "Progresso do formulário",
        validation: {
          nameRequired: "Nome é obrigatório",
          nameMin: "Nome deve ter pelo menos 2 caracteres",
          emailRequired: "Email é obrigatório",
          emailInvalid: "Digite um email válido",
          companyRequired: "Nome da empresa é obrigatório",
          phoneRequired: "Telefone é obrigatório",
          phoneInvalid: "Digite um telefone válido",
          messageRequired: "Mensagem é obrigatória",
          messageMin: "Mensagem deve ter pelo menos 10 caracteres",
          perfect: "Perfeito",
          excellent: "Excelente",
          validEmail: "Email válido",
          validPhone: "Telefone válido",
          complete: "Mensagem completa",
        },
        errors: {
          submitError: "Erro ao enviar formulário. Tente novamente.",
          tryAgain: "Tente novamente",
        },
        confirmationNote: "📧 Verifique seu email (incluindo spam) para confirmação",
      },
      chatbot: {
        title: "Em Breve: Nosso Assistente Virtual",
        description:
          "Aqui você poderá falar diretamente com nosso assistente virtual para resolver dúvidas e obter informações personalizadas sobre nossos serviços.",
      },
    },
    footer: {
      description:
        "Conectamos tecnologia com pessoas. Agência de desenvolvimento e transformação digital fundada por desenvolvedores.",
      services: "Serviços",
      sectors: "Setores",
      contact: "Contato",
      rights: "Todos os direitos reservados. Conectamos tecnologia com pessoas.",
    },
    chat: {
      assistant: "Assistente DosNodos",
      online: "Sempre disponível",
      greeting: "Olá! Sou o assistente da DosNodos. Como posso ajudá-lo?",
      userMessage: "Preciso automatizar meu atendimento ao cliente",
      response: "Perfeito! Nossos assistentes virtuais podem se integrar com WhatsApp, seu site, CRM e mais...",
    },
  },
}

export const languageNames: Record<Language, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
}

export const languageFlags: Record<Language, string> = {
  es: "🇪🇸",
  en: "🇺🇸",
  pt: "🇧🇷",
}
