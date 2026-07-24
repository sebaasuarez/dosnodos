import { type Translation } from "@/lib/i18n"

interface FlowDiagramProps {
  d: Translation["hero"]["diagram"]
}

/**
 * Diagrama de flujo del hero: 3 canales de PERSONAS → dos nodos → 3 RESULTADOS.
 * Rutas animadas con .dn-flow (respetan prefers-reduced-motion desde globals.css).
 */
export function FlowDiagram({ d }: FlowDiagramProps) {
  const mono = "'IBM Plex Mono', var(--font-plex-mono), monospace"
  return (
    <svg viewBox="0 0 820 210" width="100%" fill="none" role="img" aria-label={d.aria}>
      <text x="90" y="18" textAnchor="middle" style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".12em" }} fill="#8A87A0">
        {d.people}
      </text>
      <text x="730" y="18" textAnchor="middle" style={{ fontFamily: mono, fontSize: 11, letterSpacing: ".12em" }} fill="#8A87A0">
        {d.results}
      </text>

      {/* Inputs */}
      <rect x="14" y="40" width="150" height="38" rx="9" fill="#fff" stroke="#241F3A" strokeWidth="1.4" />
      <circle cx="38" cy="59" r="9" fill="#25D366" />
      <text x="58" y="63" style={{ fontFamily: mono, fontSize: 12 }} fill="#241F3A">{d.whatsapp}</text>

      <rect x="14" y="95" width="150" height="38" rx="9" fill="#fff" stroke="#241F3A" strokeWidth="1.4" />
      <rect x="30" y="107" width="18" height="14" rx="3" fill="#2563EB" />
      <text x="58" y="118" style={{ fontFamily: mono, fontSize: 12 }} fill="#241F3A">{d.email}</text>

      <rect x="14" y="150" width="150" height="38" rx="9" fill="#fff" stroke="#241F3A" strokeWidth="1.4" />
      <rect x="32" y="160" width="16" height="20" rx="3" fill="#fff" stroke="#241F3A" strokeWidth="1.4" />
      <text x="58" y="173" style={{ fontFamily: mono, fontSize: 12 }} fill="#241F3A">{d.site}</text>

      {/* Flows in */}
      <path className="dn-flow" stroke="#9333EA" strokeWidth="1.8" d="M164 59 C 280 59 300 105 380 105" />
      <path className="dn-flow" stroke="#9333EA" strokeWidth="1.8" d="M164 114 L 380 108" />
      <path className="dn-flow" stroke="#9333EA" strokeWidth="1.8" d="M164 169 C 280 169 300 111 380 108" />

      {/* Dos nodos */}
      <circle cx="392" cy="106" r="26" fill="#9333EA" />
      <circle cx="446" cy="106" r="26" fill="#2563EB" />
      <line x1="418" y1="106" x2="420" y2="106" stroke="#fff" strokeWidth="3.4" />
      <text x="419" y="152" textAnchor="middle" style={{ fontFamily: mono, fontSize: 12 }} fill="#241F3A">{d.node}</text>

      {/* Flows out */}
      <path className="dn-flow" stroke="#2563EB" strokeWidth="1.8" d="M472 105 C 560 105 580 59 656 59" />
      <path className="dn-flow" stroke="#2563EB" strokeWidth="1.8" d="M474 108 L 656 114" />
      <path className="dn-flow" stroke="#2563EB" strokeWidth="1.8" d="M472 108 C 560 108 580 169 656 169" />

      {/* Results */}
      <rect x="656" y="40" width="150" height="38" rx="9" fill="#1B1730" />
      <text x="672" y="63" style={{ fontFamily: mono, fontSize: 11 }} fill="#F3F1FC">{d.result1}</text>
      <rect x="656" y="95" width="150" height="38" rx="9" fill="#1B1730" />
      <text x="672" y="118" style={{ fontFamily: mono, fontSize: 11 }} fill="#F3F1FC">{d.result2}</text>
      <rect x="656" y="150" width="150" height="38" rx="9" fill="#9333EA" />
      <text x="672" y="173" style={{ fontFamily: mono, fontSize: 11 }} fill="#fff">{d.result3}</text>
    </svg>
  )
}
