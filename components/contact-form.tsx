"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import PhoneInput from "@/components/phone-input"
import { type Language, translations } from "@/lib/i18n"
import { trackFormSubmit } from "@/lib/gtm"

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  company?: string
  phone?: string
  message?: string
}

interface ContactFormProps {
  language: Language
}

export default function ContactForm({ language }: ContactFormProps) {
  const t = translations[language]

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "+57 ", // Inicializar con Colombia
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitError, setSubmitError] = useState<string>("")

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return t.cta.form.validation.nameRequired
        if (value.trim().length < 2) return t.cta.form.validation.nameMin
        return undefined

      case "email":
        if (!value.trim()) return t.cta.form.validation.emailRequired
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return t.cta.form.validation.emailInvalid
        return undefined

      case "company":
        if (!value.trim()) return t.cta.form.validation.companyRequired
        return undefined

      case "phone":
        if (!value.trim()) return t.cta.form.validation.phoneRequired
        // Validación mejorada para teléfonos internacionales
        const phoneRegex = /^\+[1-9]\d{1,14}$/
        const cleanPhone = value.replace(/\s/g, "")
        if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 8) {
          return t.cta.form.validation.phoneInvalid
        }
        return undefined

      case "message":
        if (!value.trim()) return t.cta.form.validation.messageRequired
        if (value.trim().length < 10) return t.cta.form.validation.messageMin
        return undefined

      default:
        return undefined
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSubmitError("") // Limpiar error de envío

    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, formData[name as keyof FormData])
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof FormData])
      if (error) {
        newErrors[key as keyof FormErrors] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    const allTouched = Object.keys(formData).reduce(
      (acc, key) => {
        acc[key] = true
        return acc
      },
      {} as Record<string, boolean>,
    )
    setTouched(allTouched)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          language: language,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || t.cta.form.errors.submitError)
      }

      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "+57 ",
        message: "",
      })
      setTouched({})
      setErrors({})

      // Track form submission
      trackFormSubmit(language, formData.company)
    } catch (error) {
      console.error("Error al enviar formulario:", error)
      setSubmitError(t.cta.form.errors.submitError)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">{t.cta.form.success.title}</h3>
          <p className="text-blue-100">{t.cta.form.success.message}</p>
          <div className="bg-white/10 rounded-lg p-4 text-sm text-blue-100">
            <p>{t.cta.form.confirmationNote}</p>
          </div>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            {t.cta.form.success.button}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitError && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 text-red-200 text-sm">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4" />
                <span>{submitError}</span>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                placeholder={t.cta.form.name}
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                disabled={isSubmitting}
                className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 transition-all duration-200 ${
                  errors.name
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                    : touched.name && !errors.name
                      ? "border-green-400 focus:border-green-400 focus:ring-green-400/20"
                      : "focus:border-white/50 focus:ring-white/20"
                }`}
              />
              {errors.name && (
                <div className="flex items-center space-x-1 text-red-300 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.name}</span>
                </div>
              )}
              {touched.name && !errors.name && formData.name && (
                <div className="flex items-center space-x-1 text-green-300 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t.cta.form.validation.perfect}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Input
                placeholder={t.cta.form.email}
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                disabled={isSubmitting}
                className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 transition-all duration-200 ${
                  errors.email
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                    : touched.email && !errors.email
                      ? "border-green-400 focus:border-green-400 focus:ring-green-400/20"
                      : "focus:border-white/50 focus:ring-white/20"
                }`}
              />
              {errors.email && (
                <div className="flex items-center space-x-1 text-red-300 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.email}</span>
                </div>
              )}
              {touched.email && !errors.email && formData.email && (
                <div className="flex items-center space-x-1 text-green-300 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t.cta.form.validation.validEmail}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                placeholder={t.cta.form.company}
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                onBlur={() => handleBlur("company")}
                disabled={isSubmitting}
                className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 transition-all duration-200 ${
                  errors.company
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                    : touched.company && !errors.company
                      ? "border-green-400 focus:border-green-400 focus:ring-green-400/20"
                      : "focus:border-white/50 focus:ring-white/20"
                }`}
              />
              {errors.company && (
                <div className="flex items-center space-x-1 text-red-300 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.company}</span>
                </div>
              )}
              {touched.company && !errors.company && formData.company && (
                <div className="flex items-center space-x-1 text-green-300 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t.cta.form.validation.excellent}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <PhoneInput
                value={formData.phone}
                onChange={(value) => handleInputChange("phone", value)}
                onBlur={() => handleBlur("phone")}
                placeholder={
                  language === "es" ? "Número de teléfono" : language === "en" ? "Phone number" : "Número de telefone"
                }
                disabled={isSubmitting}
                error={!!errors.phone}
                className="w-full"
              />
              {errors.phone && (
                <div className="flex items-center space-x-1 text-red-300 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.phone}</span>
                </div>
              )}
              {touched.phone && !errors.phone && formData.phone && (
                <div className="flex items-center space-x-1 text-green-300 text-sm">
                  <CheckCircle className="h-4 w-4" />
                  <span>{t.cta.form.validation.validPhone}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder={t.cta.form.message}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              onBlur={() => handleBlur("message")}
              disabled={isSubmitting}
              className={`bg-white/20 border-white/30 text-white placeholder:text-white/70 min-h-[100px] transition-all duration-200 resize-none ${
                errors.message
                  ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                  : touched.message && !errors.message
                    ? "border-green-400 focus:border-green-400 focus:ring-green-400/20"
                    : "focus:border-white/50 focus:ring-white/20"
              }`}
            />
            <div className="flex justify-between items-center">
              <div>
                {errors.message && (
                  <div className="flex items-center space-x-1 text-red-300 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.message}</span>
                  </div>
                )}
                {touched.message && !errors.message && formData.message && (
                  <div className="flex items-center space-x-1 text-green-300 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>{t.cta.form.validation.complete}</span>
                  </div>
                )}
              </div>
              <span className={`text-sm ${formData.message.length < 10 ? "text-white/50" : "text-green-300"}`}>
                {formData.message.length}/10 min
              </span>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || Object.keys(errors).some((key) => errors[key as keyof FormErrors])}
            className={`w-full text-lg py-3 transition-all duration-200 ${
              isSubmitting
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-white text-blue-600 hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin mr-2" />
                {t.cta.form.submitting}
              </>
            ) : (
              <>
                {t.cta.form.submit}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-blue-100">
              <span>{t.cta.form.progress}</span>
              <span>
                {Math.round(
                  (Object.keys(formData).filter((key) => {
                    const value = formData[key as keyof FormData].trim()
                    return key === "phone" ? value.length > 4 : value !== "" // Para teléfono, considerar válido si tiene más de 4 caracteres
                  }).length /
                    Object.keys(formData).length) *
                    100,
                )}
                %
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: `${
                    (Object.keys(formData).filter((key) => {
                      const value = formData[key as keyof FormData].trim()
                      return key === "phone" ? value.length > 4 : value !== ""
                    }).length /
                      Object.keys(formData).length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
