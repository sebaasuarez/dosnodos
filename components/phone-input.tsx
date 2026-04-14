"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Country {
  code: string
  name: string
  flag: string
  dialCode: string
}

const countries: Country[] = [
  { code: "CO", name: "Colombia", flag: "🇨🇴", dialCode: "+57" },
  { code: "US", name: "United States", flag: "🇺🇸", dialCode: "+1" },
  { code: "ES", name: "España", flag: "🇪🇸", dialCode: "+34" },
  { code: "MX", name: "México", flag: "🇲🇽", dialCode: "+52" },
  { code: "BR", name: "Brasil", flag: "🇧🇷", dialCode: "+55" },
  { code: "AR", name: "Argentina", flag: "🇦🇷", dialCode: "+54" },
  { code: "PE", name: "Perú", flag: "🇵🇪", dialCode: "+51" },
  { code: "CL", name: "Chile", flag: "🇨🇱", dialCode: "+56" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨", dialCode: "+593" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪", dialCode: "+58" },
  { code: "PA", name: "Panamá", flag: "🇵🇦", dialCode: "+507" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷", dialCode: "+506" },
  { code: "GT", name: "Guatemala", flag: "🇬🇹", dialCode: "+502" },
  { code: "DO", name: "República Dominicana", flag: "🇩🇴", dialCode: "+1" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾", dialCode: "+598" },
  { code: "PY", name: "Paraguay", flag: "🇵🇾", dialCode: "+595" },
  { code: "BO", name: "Bolivia", flag: "🇧🇴", dialCode: "+591" },
  { code: "CA", name: "Canada", flag: "🇨🇦", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "+44" },
  { code: "FR", name: "France", flag: "🇫🇷", dialCode: "+33" },
  { code: "DE", name: "Germany", flag: "🇩🇪", dialCode: "+49" },
  { code: "IT", name: "Italy", flag: "🇮🇹", dialCode: "+39" },
  { code: "PT", name: "Portugal", flag: "🇵🇹", dialCode: "+351" },
]

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  placeholder: string
  disabled?: boolean
  error?: boolean
  className?: string
}

export default function PhoneInput({
  value,
  onChange,
  onBlur,
  placeholder,
  disabled = false,
  error = false,
  className = "",
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]) // Colombia por defecto
  const [isOpen, setIsOpen] = useState(false)

  // Extraer el número sin el código de país
  const getPhoneNumber = (fullValue: string) => {
    if (fullValue.startsWith(selectedCountry.dialCode)) {
      return fullValue.substring(selectedCountry.dialCode.length).trim()
    }
    return fullValue
  }

  // Manejar cambio de país
  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country)
    const phoneNumber = getPhoneNumber(value)
    const newValue = phoneNumber ? `${country.dialCode} ${phoneNumber}` : country.dialCode
    onChange(newValue)
    setIsOpen(false)
  }

  // Manejar cambio en el input del teléfono
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value
    const fullValue = phoneNumber ? `${selectedCountry.dialCode} ${phoneNumber}` : selectedCountry.dialCode
    onChange(fullValue)
  }

  return (
    <div className={`flex ${className}`}>
      {/* Selector de País */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={`flex items-center space-x-2 px-3 rounded-r-none border-r-0 bg-white/20 border-white/30 text-white hover:bg-white/30 min-w-[100px] ${
              error ? "border-red-400" : "focus:border-white/50"
            }`}
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-sm font-mono">{selectedCountry.dialCode}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 max-h-64 overflow-y-auto bg-white/95 backdrop-blur-sm">
          {countries.map((country) => (
            <DropdownMenuItem
              key={country.code}
              onClick={() => handleCountryChange(country)}
              className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-100 ${
                selectedCountry.code === country.code ? "bg-blue-50 text-blue-600" : ""
              }`}
            >
              <span className="text-lg">{country.flag}</span>
              <span className="flex-1 text-sm">{country.name}</span>
              <span className="text-sm font-mono text-gray-500">{country.dialCode}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Input del Teléfono */}
      <div className="flex-1 relative">
        <Input
          type="tel"
          placeholder={placeholder}
          value={getPhoneNumber(value)}
          onChange={handlePhoneChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`rounded-l-none bg-white/20 border-white/30 text-white placeholder:text-white/70 transition-all duration-200 ${
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
              : "focus:border-white/50 focus:ring-white/20"
          }`}
        />
        <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
      </div>
    </div>
  )
}
