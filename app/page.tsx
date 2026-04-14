"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowRight,
  Bot,
  Clock,
  DollarSign,
  Globe,
  MessageSquare,
  Scale,
  Zap,
  Building2,
  GraduationCap,
  Briefcase,
  Users,
  Heart,
  MapPin,
  Palette,
  BarChart3,
  Settings,
  Code,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ContactForm from "@/components/contact-form"
import LanguageSelector from "@/components/language-selector"
import { type Language, translations } from "@/lib/i18n"
import AnimatedSection from "@/components/animated-section"
import { trackCTAClick, trackWhatsAppClick, trackEmailClick } from "@/lib/gtm"

export default function LandingPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("es")
  const t = translations[currentLanguage]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo-dosnodos.png"
                alt="DosNodos Logo"
                width={160}
                height={64}
                className="h-10 sm:h-12 md:h-16 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-none"
                priority
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#servicios" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t.nav.services}
              </a>
              <a href="#beneficios" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t.nav.benefits}
              </a>
              <a href="#sectores" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t.nav.sectors}
              </a>
              <a href="#contacto" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t.nav.contact}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  trackCTAClick("primary", "navigation")
                  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {t.nav.demo}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <AnimatedSection animation="fadeInUp">
        <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-fadeInUp">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{t.hero.badge}</Badge>
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                    {t.hero.title}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      {t.hero.titleHighlight}
                    </span>{" "}
                    inteligentes
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">{t.hero.subtitle}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                    onClick={() => {
                      trackCTAClick("primary", "hero")
                      document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    {t.hero.ctaPrimary}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-3 bg-transparent"
                    onClick={() => {
                      trackCTAClick("secondary", "hero")
                      document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    {t.hero.ctaSecondary}
                  </Button>
                </div>

                <div className="flex items-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{t.hero.features.support}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{t.hero.features.founded}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>{t.hero.features.results}</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
                  <div className="bg-white rounded-xl p-6 space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Bot className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{t.chat.assistant}</p>
                        <p className="text-sm text-gray-500">{t.chat.online}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm text-gray-700">{t.chat.greeting}</p>
                      </div>
                      <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs ml-auto">
                        <p className="text-sm">{t.chat.userMessage}</p>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                        <p className="text-sm text-gray-700">{t.chat.response}</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection animation="fadeInUp" delay={100}>
        <section id="servicios" className="py-20 bg-white animate-fadeInUp">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.services.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.services.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300 bg-gradient-to-br from-blue-50 to-white hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-blue-900">{t.services.items.ai.title}</CardTitle>
                  <CardDescription className="text-gray-700">{t.services.items.ai.description}</CardDescription>
                </CardHeader>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <Globe className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">{t.services.items.web.title}</CardTitle>
                  <CardDescription>{t.services.items.web.description}</CardDescription>
                </CardHeader>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                    <Settings className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl">{t.services.items.automation.title}</CardTitle>
                  <CardDescription>{t.services.items.automation.description}</CardDescription>
                </CardHeader>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">{t.services.items.marketing.title}</CardTitle>
                  <CardDescription>{t.services.items.marketing.description}</CardDescription>
                </CardHeader>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                    <Palette className="h-6 w-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-xl">{t.services.items.branding.title}</CardTitle>
                  <CardDescription>{t.services.items.branding.description}</CardDescription>
                </CardHeader>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover-lift">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                    <MessageSquare className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl">{t.services.items.integration.title}</CardTitle>
                  <CardDescription>{t.services.items.integration.description}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection animation="scaleIn" delay={200}>
        <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.team.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.team.subtitle}</p>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto">{t.team.description}</p>

              <div className="grid md:grid-cols-4 gap-8 mt-12">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <Code className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {currentLanguage === "es"
                      ? "Desarrolladores"
                      : currentLanguage === "en"
                        ? "Developers"
                        : "Desenvolvedores"}
                  </h3>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <Palette className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {currentLanguage === "es" ? "Diseñadores" : currentLanguage === "en" ? "Designers" : "Designers"}
                  </h3>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Bot className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {currentLanguage === "es"
                      ? "Especialistas IA"
                      : currentLanguage === "en"
                        ? "AI Specialists"
                        : "Especialistas IA"}
                  </h3>
                </div>

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                    <Target className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    {currentLanguage === "es"
                      ? "Consultores"
                      : currentLanguage === "en"
                        ? "Consultants"
                        : "Consultores"}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection animation="fadeInLeft" delay={100}>
        <section id="beneficios" className="py-20 bg-gray-50 animate-fadeInUp">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.benefits.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.benefits.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t.benefits.items.immediate.title}</h3>
                <p className="text-gray-600">{t.benefits.items.immediate.description}</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t.benefits.items.cost.title}</h3>
                <p className="text-gray-600">{t.benefits.items.cost.description}</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Scale className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t.benefits.items.scalability.title}</h3>
                <p className="text-gray-600">{t.benefits.items.scalability.description}</p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{t.benefits.items.integration.title}</h3>
                <p className="text-gray-600">{t.benefits.items.integration.description}</p>
              </div>
            </div>

            {/* Integration Channels */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">{t.benefits.channels.title}</h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="font-semibold text-gray-900">{t.benefits.channels.whatsapp}</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="font-semibold text-gray-900">{t.benefits.channels.website}</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                    <Building2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="font-semibold text-gray-900">{t.benefits.channels.ecommerce}</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                    <BarChart3 className="h-6 w-6 text-orange-600" />
                  </div>
                  <p className="font-semibold text-gray-900">{t.benefits.channels.crm}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Use Cases Section */}
      <AnimatedSection animation="fadeInRight" delay={200}>
        <section id="sectores" className="py-20 bg-white animate-fadeInUp">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.sectors.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.sectors.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-lift">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{t.sectors.items.ecommerce.title}</h3>
                  <p className="text-gray-600">{t.sectors.items.ecommerce.description}</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-lift">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <GraduationCap className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{t.sectors.items.education.title}</h3>
                  <p className="text-gray-600">{t.sectors.items.education.description}</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-lift">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Briefcase className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{t.sectors.items.startups.title}</h3>
                  <p className="text-gray-600">{t.sectors.items.startups.description}</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-lift">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                    <Heart className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{t.sectors.items.health.title}</h3>
                  <p className="text-gray-600">{t.sectors.items.health.description}</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-lift">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{t.sectors.items.sales.title}</h3>
                  <p className="text-gray-600">{t.sectors.items.sales.description}</p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-lift">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                    <MapPin className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{t.sectors.items.realestate.title}</h3>
                  <p className="text-gray-600">{t.sectors.items.realestate.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection animation="fadeInUp" delay={100}>
        <section className="py-20 bg-gray-50 animate-fadeInUp">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.testimonials.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.testimonials.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic">{t.testimonials.items.laura.text}</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">LM</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t.testimonials.items.laura.name}</p>
                      <p className="text-sm text-gray-500">{t.testimonials.items.laura.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic">{t.testimonials.items.roberto.text}</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">DR</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t.testimonials.items.roberto.name}</p>
                      <p className="text-sm text-gray-500">{t.testimonials.items.roberto.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic">{t.testimonials.items.camila.text}</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">CP</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t.testimonials.items.camila.name}</p>
                      <p className="text-sm text-gray-500">{t.testimonials.items.camila.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="mt-16 grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <p className="text-4xl font-bold text-blue-600">98%</p>
                <p className="text-gray-600">{t.testimonials.stats.satisfaction}</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-green-600">75%</p>
                <p className="text-gray-600">{t.testimonials.stats.reduction}</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-purple-600">24/7</p>
                <p className="text-gray-600">{t.testimonials.stats.availability}</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-orange-600">5x</p>
                <p className="text-gray-600">{t.testimonials.stats.leads}</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <section id="contacto" className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white">{t.cta.title}</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">{t.cta.subtitle}</p>
            </div>

            <ContactForm language={currentLanguage} />

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
                <span className="text-white font-semibold">{t.cta.chatbot.title}</span>
              </div>
              <p className="text-blue-100 text-sm">{t.cta.chatbot.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Image
                src="/logo-dosnodos.png"
                alt="DosNodos Logo"
                width={120}
                height={40}
                className="h-8 w-auto brightness-0 invert"
              />
              <p className="text-gray-400">{t.footer.description}</p>
              <p className="text-sm text-blue-400">dosnodos.com.co</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">{t.footer.services}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{t.services.items.ai.title}</li>
                <li>{t.services.items.web.title}</li>
                <li>{t.services.items.marketing.title}</li>
                <li>{t.services.items.automation.title}</li>
                <li>{t.services.items.branding.title}</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">{t.footer.sectors}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{t.sectors.items.ecommerce.title}</li>
                <li>{t.sectors.items.education.title}</li>
                <li>{t.sectors.items.health.title}</li>
                <li>{t.sectors.items.realestate.title}</li>
                <li>{t.sectors.items.startups.title}</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">{t.footer.contact}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="mailto:hola@dosnodos.com.co"
                    className="hover:text-white transition-colors"
                    onClick={trackEmailClick}
                  >
                    hola@dosnodos.com.co
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/573505260427?text=Hola,%20vengo%20desde%20su%20sitio%20Dos%20Nodos."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                    onClick={trackWhatsAppClick}
                  >
                    +57 3505260427
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/573505260427?text=Hola,%20vengo%20desde%20su%20sitio%20Dos%20Nodos."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                    onClick={trackWhatsAppClick}
                  >
                    WhatsApp: +57 3505260427
                  </a>
                </li>
                <li>Medellín, Colombia</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DosNodos. {t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
