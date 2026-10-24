import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../config/site.ts'
import { formatDate, formatPrice } from '../lib/format.ts'
import type { Article, Faq, GalleryItem, Testimonial, UmrahPackage } from '../types/index.ts'
import { ArrowIcon, CalendarIcon, ChevronIcon, CloseIcon, MosqueIcon, PlaneIcon, PlayIcon } from './icons.tsx'
import { Img, WaButton } from './ui.tsx'

export function PackageCard({ pkg }: { pkg: UmrahPackage }) {
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(75,3,86,0.14)]">
      <div className="relative overflow-hidden">
        <Img src={pkg.images[0]} alt={pkg.name} className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-deep/85 to-transparent" aria-hidden />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-primary shadow-sm">{pkg.category}</span>
        {pkg.durationDays && <span className="absolute right-4 top-4 rounded-full bg-deep/85 px-3 py-1 text-xs font-semibold text-white">{pkg.durationDays} Hari</span>}
        {pkg.departureDate && (
          <p className="absolute bottom-3 left-4 flex items-center gap-1.5 text-sm font-semibold text-white">
            <CalendarIcon width={16} height={16} />
            {formatDate(pkg.departureDate)}
          </p>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-2xl leading-snug">{pkg.name}</h3>
        {pkg.airline && <p className="flex items-center gap-2 text-sm text-muted"><PlaneIcon width={16} height={16} />{pkg.airline}</p>}
        {pkg.highlights && pkg.highlights.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {pkg.highlights.slice(0, 2).map((x) => <li key={x} className="rounded-full bg-lavender px-2.5 py-1 text-xs font-medium text-primary">{x}</li>)}
          </ul>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-lavender pt-4">
          {pkg.price !== undefined ? (
            <div>
              <p className="text-xs text-muted">Mulai dari</p>
              <p className="font-serif text-2xl font-bold leading-tight text-primary">{formatPrice(pkg.price)}</p>
            </div>
          ) : (
            <p className="text-sm text-muted">Harga melalui konsultasi</p>
          )}
          <Link to={`/paket-umrah/${pkg.slug}`} className="btn-primary shrink-0 px-4 py-2">
            Detail<span className="sr-only"> {pkg.name}</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

/** Horizontal scroll-snap carousel: swipe on touch, arrow buttons elsewhere. */
export function PackageSlider({ items, label }: { items: UmrahPackage[]; label: string }) {
  const ref = useRef<HTMLUListElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  const onScroll = () => {
    const el = ref.current
    if (el) setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
  }
  const slide = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.9, behavior: 'smooth' })
  const arrow = 'flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-white text-primary shadow-sm transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-primary'

  return (
    <div>
      <ul
        ref={ref}
        onScroll={onScroll}
        aria-label={label}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-6 pt-1 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((p) => (
          <li key={p.slug} className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc((100%-40px)/3)]">
            <PackageCard pkg={p} />
          </li>
        ))}
      </ul>
      <div className="mt-2 flex items-center justify-center gap-3">
        <button type="button" className={arrow} onClick={() => slide(-1)} disabled={edge.start} aria-label="Paket sebelumnya"><ChevronIcon className="rotate-90" /></button>
        <button type="button" className={arrow} onClick={() => slide(1)} disabled={edge.end} aria-label="Paket berikutnya"><ChevronIcon className="-rotate-90" /></button>
      </div>
    </div>
  )
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="card flex flex-col overflow-hidden">
      <Img src={article.thumbnail} alt={article.title} className="aspect-[16/9] w-full" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="font-semibold text-primary">{article.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </div>
        <h3 className="text-xl leading-snug">
          <Link to={`/artikel/${article.slug}`} className="hover:text-primary">{article.title}</Link>
        </h3>
        <p className="text-sm text-muted">{article.excerpt}</p>
        <Link to={`/artikel/${article.slug}`} className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary" aria-hidden tabIndex={-1}>
          Baca selengkapnya <ArrowIcon width={16} height={16} />
        </Link>
      </div>
    </article>
  )
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-lavender rounded-xl bg-white shadow-[0_2px_16px_rgba(75,3,86,0.07)]">
      {items.map((f) => (
        <details key={f.q} className="group px-6 py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-deep [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronIcon className="shrink-0 text-primary transition-transform group-open:rotate-180" />
          </summary>
          <p className="pb-5 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

/** Responsive grid with a <dialog>-based lightbox (native Esc and focus handling). */
export function GalleryGrid({ items, tall }: { items: GalleryItem[]; tall?: boolean }) {
  const [index, setIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDialogElement>(null)
  const current = index === null ? null : items[index]

  useEffect(() => {
    if (index !== null && !ref.current?.open) ref.current?.showModal()
  }, [index])

  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length))

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.src}>
            <button type="button" onClick={() => setIndex(i)} className="block w-full overflow-hidden rounded-xl" aria-label={`Perbesar foto: ${item.alt}`}>
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className={`${tall ? 'aspect-[4/5]' : 'aspect-square'} w-full object-cover transition-transform duration-300 hover:scale-105`} />
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={ref}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === ref.current && ref.current.close()}
        onKeyDown={(e) => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1) }}
        className="m-auto max-h-[92vh] max-w-5xl bg-transparent p-0 backdrop:bg-deep/85"
        aria-label="Pratinjau foto"
      >
        {current && (
          <figure className="relative">
            <img src={current.src} alt={current.alt} className="max-h-[80vh] w-auto rounded-lg" />
            <figcaption className="mt-3 text-center text-sm text-white">{current.caption ?? current.alt}</figcaption>
            <button type="button" onClick={() => ref.current?.close()} className="absolute right-2 top-2 rounded-full bg-white/90 p-2 text-deep" aria-label="Tutup pratinjau"><CloseIcon /></button>
            {items.length > 1 && (
              <div className="mt-3 flex justify-center gap-3">
                <button type="button" className="btn-light py-2" onClick={() => step(-1)}>Sebelumnya</button>
                <button type="button" className="btn-light py-2" onClick={() => step(1)}>Berikutnya</button>
              </div>
            )}
          </figure>
        )}
      </dialog>
    </>
  )
}

export function VideoProfile() {
  const [playing, setPlaying] = useState(false)
  if (!site.profileVideo)
    return (
      <div className="bg-pattern flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl bg-deep p-6 text-center text-white/80">
        <MosqueIcon width={40} height={40} />
        <p className="font-serif text-xl text-white">Video company profile akan segera tersedia</p>
      </div>
    )
  return (
    <div className="overflow-hidden rounded-2xl bg-deep shadow-[0_16px_40px_rgba(75,3,86,0.22)] ring-1 ring-primary/15">
      {playing ? (
        // Started by the visitor's click, so browsers allow playback with sound (no muted autoplay).
        <video src={site.profileVideo} poster={site.profileVideoPoster} controls autoPlay playsInline preload="auto" className="aspect-video w-full bg-black" aria-label={`Video company profile ${site.name}`} />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group relative block w-full" aria-label="Putar video company profile dengan suara">
          <Img src={site.profileVideoPoster} alt={`Cuplikan video company profile ${site.name}`} className="aspect-video w-full transition-transform duration-500 group-hover:scale-[1.03]" />
          <span className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-transparent" aria-hidden />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-primary shadow-xl transition-transform group-hover:scale-110">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/40" aria-hidden />
              <PlayIcon width={32} height={32} className="relative ml-1" />
            </span>
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-left text-white">
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-white/75">Company Profile</span>
              <span className="block font-serif text-xl font-semibold sm:text-2xl">Mengenal Sultan Fatih</span>
            </span>
            <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">4:41</span>
          </span>
        </button>
      )}
    </div>
  )
}

const avatarTones = ['bg-primary', 'bg-deep', 'bg-[#9b4fd1]', 'bg-[#5e2a86]']
const Stars = ({ n }: { n: number }) => (
  <span className="flex gap-0.5 text-primary" role="img" aria-label={`Rating ${n} dari 5`}>
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} width={14} height={14} viewBox="0 0 20 20" fill={i < n ? 'currentColor' : 'none'} stroke="currentColor" aria-hidden>
        <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
      </svg>
    ))}
  </span>
)

function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
  const [open, setOpen] = useState(false)
  const long = t.text.length > 260
  return (
    <figure className="card mb-5 break-inside-avoid overflow-hidden">
      {t.photo && <img src={t.photo} alt={`Foto dari ulasan ${t.name}`} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />}
      <div className="p-6">
        <span aria-hidden className="block font-serif text-5xl leading-none text-primary/25">“</span>
        <blockquote className={`-mt-3 leading-relaxed text-ink/90 ${long && !open ? 'line-clamp-6' : ''}`}>{t.text}</blockquote>
        {long && (
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="mt-2 text-sm font-semibold text-primary hover:underline">
            {open ? 'Tutup' : 'Baca selengkapnya'}
          </button>
        )}
        <figcaption className="mt-5 flex items-center gap-3 border-t border-lavender pt-4">
          <span aria-hidden className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold uppercase text-white ${avatarTones[i % avatarTones.length]}`}>{t.name[0]}</span>
          <span className="min-w-0">
            <span className="block truncate font-semibold capitalize text-deep">{t.name}</span>
            <span className="flex items-center gap-2 text-xs text-muted">
              {t.rating ? <Stars n={t.rating} /> : null}
              <span>{t.localGuide ? 'Local Guide · ' : ''}Google</span>
            </span>
          </span>
        </figcaption>
      </div>
    </figure>
  )
}

/** Masonry wall of Google reviews; shows `initial` cards, then expands in place. */
export function Testimonials({ items, initial = 6 }: { items: Testimonial[]; initial?: number }) {
  const [all, setAll] = useState(false)
  const fiveStar = items.filter((t) => t.rating === 5).length
  const shown = all ? items : items.slice(0, initial)
  return (
    <div>
      <div className="mx-auto mb-10 flex w-fit flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full bg-white px-6 py-3 shadow-[0_2px_16px_rgba(75,3,86,0.07)]">
        <Stars n={5} />
        <p className="text-sm text-ink">
          <strong className="text-deep">{fiveStar} ulasan bintang 5</strong> dari jamaah di Google
        </p>
        {site.mapsUrl && (
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary hover:underline">Lihat di Google Maps</a>
        )}
      </div>
      <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
        {shown.map((t, i) => <TestimonialCard key={t.name} t={t} i={i} />)}
      </div>
      {items.length > initial && (
        <div className="mt-6 text-center">
          <button type="button" className="btn-outline bg-white" onClick={() => setAll((a) => !a)} aria-expanded={all}>
            {all ? 'Tampilkan lebih sedikit' : `Lihat semua ${items.length} ulasan`}
          </button>
        </div>
      )}
    </div>
  )
}

export function CtaBanner({ title = 'Sedang Merencanakan Perjalanan Umrah?', text = 'Ceritakan rencana Anda kepada tim Sultan Fatih. Kami bantu menjelaskan pilihan paket, jadwal, dan persiapannya.', message }: { title?: string; text?: string; message?: string }) {
  return (
    <section className="container-x py-16">
      <div className="bg-pattern rounded-2xl bg-deep px-6 py-14 text-center sm:px-12">
        <h2 className="text-3xl text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-white">
          <WaButton message={message} className="btn-light" />
          <Link to="/paket-umrah" className="btn-ghost-light">Lihat Paket Umrah</Link>
        </div>
      </div>
    </section>
  )
}

/** Small page hero used by inner pages. */
export function PageHero({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <section className="bg-pattern bg-deep py-16 text-center sm:py-20">
      <div className="container-x">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">{eyebrow}</p>
        <h1 className="text-4xl text-white sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">{desc}</p>
      </div>
    </section>
  )
}

// Only airlines named in Sultan Fatih's brochures and company profile.
const airlines = [
  { file: 'saudia', name: 'Saudia' },
  { file: 'garuda', name: 'Garuda Indonesia' },
  { file: 'qatar', name: 'Qatar Airways' },
  { file: 'oman-air', name: 'Oman Air' },
  { file: 'emirates', name: 'Emirates' },
  { file: 'turkish', name: 'Turkish Airlines' },
]

export function AirlineMarquee() {
  const row = (hidden: boolean) =>
    airlines.map((a) => (
      <li key={a.file + hidden} aria-hidden={hidden || undefined} className="shrink-0 px-7 sm:px-10">
        <img src={`/images/maskapai/${a.file}.png`} alt={hidden ? '' : a.name} loading="lazy" className="h-7 w-auto opacity-55 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-8" />
      </li>
    ))
  return (
    <section aria-label="Maskapai penerbangan" className="border-b border-lavender bg-white py-7">
      <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-muted">Terbang bersama maskapai pilihan</p>
      <div className="marquee overflow-hidden">
        <ul className="marquee-track flex w-max items-center">
          {row(false)}
          {row(true)}
        </ul>
      </div>
    </section>
  )
}
