import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

/**
 * Open Graph 1200×630 generada al vuelo.
 *
 * Antes la etiqueta og:image apuntaba al logo (850×430), que no es proporción
 * de Open Graph: al compartir el enlace WhatsApp, LinkedIn y X lo recortaban.
 * Acá se arma una tarjeta con la proporción correcta, el título de la página y
 * el idioma que corresponda.
 *
 * Parámetros: ?t=título &s=bajada &k=etiqueta superior
 */

const BG = "#0C0A18"
const PURPLE = "#9333EA"
const BLUE = "#2563EB"

function clamp(value: string | null, max: number, fallback = ""): string {
  const v = (value ?? "").trim() || fallback
  return v.length > max ? `${v.slice(0, max - 1).trimEnd()}…` : v
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const title = clamp(searchParams.get("t"), 90, "Conectamos tecnología con personas")
  const subtitle = clamp(searchParams.get("s"), 130)
  const kicker = clamp(searchParams.get("k"), 40, "dosnodos.com.co")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Halos de marca, los mismos del hero. */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -140,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: PURPLE,
            opacity: 0.22,
            filter: "blur(90px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -160,
            width: 640,
            height: 640,
            borderRadius: 999,
            background: BLUE,
            opacity: 0.22,
            filter: "blur(90px)",
            display: "flex",
          }}
        />

        {/* Marca: los dos nodos unidos, igual que el favicon. */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="60" height="60" viewBox="0 0 64 64">
            <path d="M42 22 L22 42" stroke={PURPLE} strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="44" cy="20" r="11" fill={PURPLE} />
            <circle cx="20" cy="44" r="11" fill={BLUE} />
          </svg>
          <span style={{ color: "#fff", fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>
            Dos Nodos
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span
            style={{
              color: "#C4A6F5",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {kicker}
          </span>
          <span
            style={{
              color: "#fff",
              fontSize: title.length > 55 ? 58 : 70,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2,
              display: "flex",
            }}
          >
            {title}
          </span>
          {subtitle ? (
            <span style={{ color: "#B9B4D4", fontSize: 28, lineHeight: 1.4, display: "flex" }}>
              {subtitle}
            </span>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 120,
              height: 6,
              borderRadius: 999,
              background: `linear-gradient(90deg, ${PURPLE}, ${BLUE})`,
              display: "flex",
            }}
          />
          <span style={{ color: "#807CA0", fontSize: 24, display: "flex" }}>dosnodos.com.co</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
