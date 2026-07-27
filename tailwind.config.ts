import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
        serif: ["var(--font-plex-serif)", "Georgia", "serif"],
      },
      colors: {
        // Dos Nodos brand tokens
        brand: {
          purple: "#9333EA",
          blue: "#2563EB",
          cta: "#7C22CE",
        },
        ink: {
          DEFAULT: "#0C0A18",
          2: "#141127",
          3: "#08060F",
        },
        surface: {
          2: "#F5F3FC",
          3: "#F1EFFA",
        },
        star: "#F5B301",
        // El #25D366 de la marca WhatsApp da 1.98 con contenido blanco encima
        // y 1.98 contra el fondo blanco de la página: falla WCAG 1.4.3 y
        // 1.4.11 en las dos direcciones. Este tono da 5.22 en ambas y sigue
        // leyéndose como WhatsApp.
        whatsapp: "#0F7A6C",
        // El brillante queda solo para ilustraciones decorativas (el diagrama
        // de flujo), donde no transporta información.
        "whatsapp-bright": "#25D366",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "dn-dash": {
          to: { strokeDashoffset: "-22" },
        },
        "dn-reveal": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "dn-dash": "dn-dash 1.4s linear infinite",
        "dn-reveal": "dn-reveal .55s cubic-bezier(.2,.7,.3,1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
