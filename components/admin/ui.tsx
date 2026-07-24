import type React from "react"
import { LEAD_STATUS_LABEL, type LeadStatus } from "@/lib/types"

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-[#5A5570]">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-[#E4E1F0] bg-white p-5 ${className}`}>{children}</div>
  )
}

export function Field({
  label,
  name,
  defaultValue = "",
  placeholder = "",
  type = "text",
  required = false,
  hint,
}: {
  label: string
  name: string
  defaultValue?: string | number | null
  placeholder?: string
  type?: string
  required?: boolean
  hint?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-semibold text-ink">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="rounded-[10px] border border-[#E4E1F0] bg-white px-3 py-2.5 text-[14px] text-ink outline-none transition-colors focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(147,51,234,.18)]"
      />
      {hint && <span className="text-[12px] text-[#6A667E]">{hint}</span>}
    </label>
  )
}

export function TextareaField({
  label,
  name,
  defaultValue = "",
  placeholder = "",
  rows = 3,
  required = false,
  hint,
}: {
  label: string
  name: string
  defaultValue?: string | null
  placeholder?: string
  rows?: number
  required?: boolean
  hint?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-semibold text-ink">{label}</span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="resize-y rounded-[10px] border border-[#E4E1F0] bg-white px-3 py-2.5 text-[14px] text-ink outline-none transition-colors focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(147,51,234,.18)]"
      />
      {hint && <span className="text-[12px] text-[#6A667E]">{hint}</span>}
    </label>
  )
}

export function SelectField({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string
  name: string
  options: { value: string; label: string }[]
  defaultValue?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-semibold text-ink">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className="rounded-[10px] border border-[#E4E1F0] bg-white px-3 py-2.5 text-[14px] text-ink outline-none transition-colors focus:border-brand-purple focus:shadow-[0_0_0_3px_rgba(147,51,234,.18)]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function CheckboxField({
  label,
  name,
  defaultChecked = false,
}: {
  label: string
  name: string
  defaultChecked?: boolean
}) {
  return (
    <label className="flex items-center gap-2.5 text-[14px] text-ink">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 accent-[#7C22CE]"
      />
      {label}
    </label>
  )
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-cta to-brand-blue px-5 py-2.5 text-[14px] font-semibold text-white transition-transform hover:-translate-y-px"
    >
      {children}
    </button>
  )
}

const STATUS_STYLES: Record<LeadStatus, string> = {
  nuevo: "bg-[#F1E9FB] text-[#7C22CE]",
  contactado: "bg-[#E7F0FE] text-[#2563EB]",
  calificado: "bg-[#FFF4E0] text-[#B8791B]",
  propuesta: "bg-[#EDE9FE] text-[#5B4CC7]",
  ganado: "bg-[#E4F4EA] text-[#2F8F5B]",
  perdido: "bg-[#FBEEE9] text-[#C24A3A]",
}

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 font-mono text-[11px] ${STATUS_STYLES[status]}`}
    >
      {LEAD_STATUS_LABEL[status]}
    </span>
  )
}
