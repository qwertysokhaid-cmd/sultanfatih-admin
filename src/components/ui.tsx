import type { ReactNode } from 'react'
import { site } from '../config/site.ts'
import { MosqueIcon, WhatsAppIcon } from './icons.tsx'
import { DEFAULT_WA_MESSAGE, waUrl } from '../lib/whatsapp.ts'

/** Per-page SEO. React 19 hoists <title>/<meta> into <head>. */
export function Seo({ title, description }: { title: string; description: string }) {
  return (
    <>
      <title>{`${title} | ${site.name}`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | ${site.name}`} />
      <meta property="og:description" content={description} />
    </>
  )
}

/** Shows the image, or a tidy branded placeholder when no licensed/local photo is available yet. */
export function Img({ src, alt, className = '', eager }: { src?: string; alt: string; className?: string; eager?: boolean }) {
  if (src) return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" className={`object-cover ${className}`} />
  return (
    <div role="img" aria-label={`${alt} (foto belum tersedia)`} className={`bg-pattern flex flex-col items-center justify-center gap-2 bg-deep text-white/70 ${className}`}>
      <MosqueIcon width={32} height={32} />
      <span className="text-xs">Foto akan ditambahkan</span>
    </div>
  )
}

/** Marks a value the business still has to fill in. */
export const Placeholder = ({ children }: { children: ReactNode }) => (
  <span className="rounded border border-dashed border-primary/50 bg-lavender px-1.5 py-0.5 text-sm text-primary">[{children}]</span>
)

export function SectionHeading({ eyebrow, title, desc, center = true, as: H = 'h2' }: { eyebrow?: string; title: string; desc?: string; center?: boolean; as?: 'h1' | 'h2' }) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <H className="text-3xl leading-tight sm:text-4xl">{title}</H>
      {desc && <p className="mt-4 text-muted">{desc}</p>}
    </div>
  )
}

/**
 * Every WhatsApp CTA goes through here. Without a configured number it renders a non-interactive
 * notice instead of a fake link.
 */
export function WaButton({ message = DEFAULT_WA_MESSAGE, label = 'Konsultasi via WhatsApp', className = 'btn-primary' }: { message?: string; label?: string; className?: string }) {
  const url = waUrl(message)
  if (!url)
    return (
      <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-current px-4 py-3 text-sm opacity-80" title="Isi site.whatsapp di src/config/site.ts">
        <WhatsAppIcon /> Nomor WhatsApp belum dikonfigurasi
      </span>
    )
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      <WhatsAppIcon /> {label}
      <span className="sr-only">(membuka WhatsApp di tab baru)</span>
    </a>
  )
}

