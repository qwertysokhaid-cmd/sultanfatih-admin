import { useState, type FormEvent } from 'react'
import { INDONESIA_PATH, MAP_H, MAP_PINS, MAP_W } from '../data/indonesiaMap.ts'
import { waUrl } from '../lib/whatsapp.ts'
import { WhatsAppIcon } from './icons.tsx'
import { WaButton } from './ui.tsx'

const HQ = MAP_PINS[0]

// Each pin links to its two nearest neighbours, like a network.
const links = (() => {
  const seen = new Set<string>()
  return MAP_PINS.flatMap((a, i) =>
    MAP_PINS.map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) }))
      .filter((o) => o.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2)
      .flatMap(({ j }) => {
        const key = [i, j].sort().join('-')
        if (seen.has(key)) return []
        seen.add(key)
        return [[a, MAP_PINS[j]] as const]
      }),
  )
})()

/** Sultan Fatih logo drop, flipped to point down like a map pin. */
function Pin({ x, y, size }: { x: number; y: number; size: number }) {
  const w = size, h = size * 1.2
  return (
    <svg x={x - w / 2} y={y - h} width={w} height={h} viewBox="0 0 24 29" overflow="visible">
      <path d="M12 25C12 25 3 15.8 3 10a9 9 0 0 1 18 0c0 5.8-9 15-9 15z" fill="url(#pin-fill)" />
      <circle cx="12" cy="10" r="3.6" fill="none" stroke="#fff" strokeWidth="2.2" />
      <circle cx="12" cy="27.6" r="1.6" fill="#4b0356" />
    </svg>
  )
}

export default function AgentMap() {
  const [city, setCity] = useState('')
  const message = (c: string) =>
    `Assalamualaikum, saya${c.trim() ? ` dari ${c.trim()}` : ''}. Apakah ada agen Sultan Fatih di dekat kota saya?`

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const url = waUrl(message(city))
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="overflow-hidden bg-gradient-to-b from-bg via-lavender/50 to-bg py-20">
      <div className="container-x grid items-center gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="eyebrow mb-3">Jaringan Agen</p>
          <h2 className="text-3xl leading-tight sm:text-4xl">Agen Sultan Fatih Hadir di Berbagai Daerah</h2>
          <p className="mt-5 text-muted">
            Perwakilan dan agen kami tersebar di seluruh Indonesia dan Timur Tengah, sehingga calon jamaah bisa berkonsultasi lebih dekat dari kota masing-masing.
          </p>
          <p className="mt-3 text-muted">Untuk memastikan ketersediaan agen di kota Anda, hubungi WhatsApp resmi Sultan Fatih.</p>

          {waUrl() ? (
            <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="agent-city">Kota Anda</label>
              <input
                id="agent-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Kota Anda, mis. Surabaya"
                maxLength={60}
                autoComplete="address-level2"
                className="min-w-0 flex-1 rounded-lg border border-primary/25 bg-white px-4 py-3 text-sm focus:border-primary"
              />
              <button type="submit" className="btn-primary shrink-0"><WhatsAppIcon /> Cek Agen Terdekat</button>
            </form>
          ) : (
            <div className="mt-7"><WaButton message={message('')} /></div>
          )}
        </div>

        <figure className="lg:col-span-3">
          <svg viewBox={`-20 -45 ${MAP_W + 40} ${MAP_H + 75}`} className="h-auto w-full" role="img" aria-label="Peta Indonesia dengan titik sebaran agen Sultan Fatih">
            <defs>
              <linearGradient id="land-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9b4fd1" />
                <stop offset="55%" stopColor="#7e1cba" />
                <stop offset="100%" stopColor="#4b0356" />
              </linearGradient>
              <linearGradient id="pin-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9b4fd1" />
                <stop offset="100%" stopColor="#4b0356" />
              </linearGradient>
              <filter id="land-glow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#4b0356" floodOpacity="0.25" />
              </filter>
            </defs>
            <path d={INDONESIA_PATH} fill="url(#land-fill)" stroke="#f4eafb" strokeWidth="0.8" strokeLinejoin="round" filter="url(#land-glow)" />
            <g stroke="#7e1cba" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="3 4">
              {links.map(([a, b]) => <line key={`${a.n}-${b.n}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />)}
            </g>
            {MAP_PINS.slice(1).map((p) => <Pin key={p.n} x={p.x} y={p.y} size={26} />)}
            <circle cx={HQ.x} cy={HQ.y} r="18" fill="#7e1cba" opacity="0.25" className="origin-center animate-ping [transform-box:fill-box]" />
            <Pin x={HQ.x} y={HQ.y} size={42} />
            <g transform={`translate(${HQ.x + 24} ${HQ.y + 30})`}>
              <rect x="0" y="-19" width="170" height="32" rx="16" fill="#fff" stroke="#7e1cba" strokeOpacity="0.3" />
              <text x="85" y="3" textAnchor="middle" fontSize="17" fontWeight="600" fill="#4b0356" fontFamily="Plus Jakarta Sans, sans-serif">Kantor Pusat Bogor</text>
            </g>
          </svg>
          <figcaption className="mt-3 text-center text-xs text-muted">
            *Titik pada peta merupakan ilustrasi sebaran. Ketersediaan agen di kota Anda dikonfirmasi melalui WhatsApp.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
