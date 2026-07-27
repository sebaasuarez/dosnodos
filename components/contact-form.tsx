"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { type Language, translations } from "@/lib/i18n"
import { trackFormStart, trackGenerateLead } from "@/lib/gtm"

interface ContactFormProps {
  language: Language
}

const inputBase =
  "w-full rounded-[11px] border-[1.5px] bg-white/[0.04] px-3.5 py-3 text-[15px] text-[#ECEAF7] placeholder:text-[#807CA0] outline-none transition-colors focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(147,51,234,.28)]"

export default function ContactForm({ language }: ContactFormProps) {
  const t = translations[language]
  const f = t.contact.form

  const formSchema = z.object({
    name: z.string().min(2, { message: f.validation.nameMin }),
    email: z
      .string()
      .min(1, { message: f.validation.emailRequired })
      .email({ message: f.validation.emailInvalid }),
    message: z.string().min(10, { message: f.validation.messageMin }),
  })

  type FormData = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, touchedFields, isSubmitting, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", message: "" },
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [started, setStarted] = useState(false)

  /** Primera interacción con el formulario: permite medir abandono. */
  function handleFirstInteraction() {
    if (started) return
    setStarted(true)
    trackFormStart("contact_section", language)
  }

  const values = watch()

  const calculateProgress = () => {
    let filled = 0
    if (values.name?.length >= 2 && !errors.name) filled++
    if (values.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) && !errors.email) filled++
    if (values.message?.length >= 10 && !errors.message) filled++
    return Math.round((filled / 3) * 100)
  }
  const progress = calculateProgress()

  const onSubmit = async (data: FormData) => {
    setSubmitError("")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company: "", phone: "", language }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || f.errors.submitError)

      setIsSubmitted(true)
      reset()
      trackGenerateLead({ location: "contact_section", language })
    } catch (error) {
      console.error("Error al enviar formulario:", error)
      setSubmitError(f.errors.submitError)
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-[22px] border border-[#2A2542] bg-ink-2 p-[clamp(22px,3vw,30px)]">
        <div className="flex flex-col items-center gap-4 px-2 py-[26px] text-center">
          <span className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-gradient-to-r from-brand-purple to-brand-blue">
            <CheckCircle className="h-8 w-8 text-white" strokeWidth={2.4} />
          </span>
          <h3 className="text-[23px] font-semibold text-[#ECEAF7]">{f.success.title}</h3>
          <p className="text-[14.5px] leading-[1.5] text-[#A29FBE]">{f.success.message}</p>
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="mt-1 rounded-full border border-[#2A2542] px-5 py-2.5 text-[14px] font-semibold text-[#ECEAF7] transition-colors hover:bg-white/[0.04]"
          >
            {f.success.button}
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={handleFirstInteraction}
      className="flex flex-col gap-[15px] rounded-[22px] border border-[#2A2542] bg-ink-2 p-[clamp(22px,3vw,30px)]"
    >
      {submitError && (
        <div className="flex items-center gap-2 rounded-[11px] border border-red-400/30 bg-red-500/15 p-3 text-[13.5px] text-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-name" className="text-[13px] font-semibold text-[#ECEAF7]">
          {f.name}
        </label>
        <input
          id="cf-name"
          type="text"
          placeholder={language === "es" ? "Tu nombre" : language === "en" ? "Your name" : "Seu nome"}
          autoComplete="name"
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
          className={`${inputBase} ${errors.name ? "border-[#C24A3A]" : "border-[#2A2542]"}`}
          {...register("name")}
        />
        {errors.name && (
          <span className="flex items-center gap-1.5 text-[12.5px] text-[#F0A090]">
            <AlertCircle className="h-3.5 w-3.5" />
            {errors.name.message as string}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-email" className="text-[13px] font-semibold text-[#ECEAF7]">
          {f.email}
        </label>
        <input
          id="cf-email"
          type="email"
          placeholder="tu@empresa.com"
          autoComplete="email"
          disabled={isSubmitting}
          aria-invalid={!!errors.email}
          className={`${inputBase} ${errors.email ? "border-[#C24A3A]" : "border-[#2A2542]"}`}
          {...register("email")}
        />
        {errors.email && (
          <span className="flex items-center gap-1.5 text-[12.5px] text-[#F0A090]">
            <AlertCircle className="h-3.5 w-3.5" />
            {errors.email.message as string}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className="text-[13px] font-semibold text-[#ECEAF7]">
          {f.message}
        </label>
        <textarea
          id="cf-message"
          rows={3}
          placeholder={
            language === "es"
              ? "Ej: responder más rápido por WhatsApp"
              : language === "en"
                ? "E.g.: respond faster on WhatsApp"
                : "Ex: responder mais rápido no WhatsApp"
          }
          disabled={isSubmitting}
          aria-invalid={!!errors.message}
          className={`${inputBase} resize-none ${errors.message ? "border-[#C24A3A]" : "border-[#2A2542]"}`}
          {...register("message")}
        />
        <div className="flex items-center justify-between">
          <span>
            {errors.message ? (
              <span className="flex items-center gap-1.5 text-[12.5px] text-[#F0A090]">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.message.message as string}
              </span>
            ) : touchedFields.message && values.message ? (
              <span className="flex items-center gap-1.5 text-[12.5px] text-[#8FD3AC]">
                <CheckCircle className="h-3.5 w-3.5" />
                {f.validation.complete}
              </span>
            ) : null}
          </span>
          <span
            className={`font-mono text-[11px] ${
              (values.message?.length || 0) < 10 ? "text-[#807CA0]" : "text-[#8FD3AC]"
            }`}
          >
            {values.message?.length || 0}/10
          </span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-cta to-brand-blue py-3.5 text-[16px] font-semibold text-white transition-transform hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
      >
        {isSubmitting ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            {f.submitting}
          </>
        ) : (
          <>
            {f.submit} <span aria-hidden>→</span>
          </>
        )}
      </button>

      {/* Progreso sutil */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between font-mono text-[11px] text-[#807CA0]">
          <span>{f.progress}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-blue transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <span className="text-center font-mono text-[11px] text-[#807CA0]">{f.confirmationNote}</span>
    </form>
  )
}
