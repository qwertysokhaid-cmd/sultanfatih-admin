import { Fragment, useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../config/site.ts'
import { WaButton } from './ui.tsx'

const HEADLINE = 'Menapaki Perjalanan Ibadah dengan Hati yang Lebih Tenang.'
const TAGLINE = ['Berkah', 'Makkah', 'Jannah'] // tagline from the company profile ("Our Trips")

/**
 * Pinned, scroll-driven hero. Scroll progress (0 → 1) is written to the CSS variable --p on the
 * section, and every effect is a calc() of it, so scrolling never triggers a React re-render.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [still] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const el = ref.current
    if (!el || still) return
    let frame = 0
    const update = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const range = r.height - window.innerHeight
      el.style.setProperty('--p', String(Math.min(1, Math.max(0, -r.top / (range || 1)))))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [still])

  return (
    <section ref={ref} className={`hero relative bg-bg ${still ? '' : 'h-[210svh]'}`} style={{ '--p': 0 } as CSSProperties}>
      <div className="sticky top-[4.5rem] h-[calc(100svh-4.5rem)] overflow-hidden">
        {/* Media frame: full-bleed at first, then shrinks into a rounded card as you scroll */}
        <div className="hero-frame absolute overflow-hidden bg-deep">
          <video
            className="hero-media absolute inset-0 h-full w-full object-cover"
            src="/videos/hero.mp4"
            poster="/images/hero-poster.jpg"
            autoPlay={!still}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/65 to-deep/35" aria-hidden />
          <div className="hero-dim absolute inset-0 bg-deep" aria-hidden />
          <div className="bg-pattern absolute inset-0 opacity-60" aria-hidden />

          {/* Phase 1: headline */}
          <div className="hero-copy container-x relative flex h-full flex-col justify-end pb-20 sm:pb-24 lg:justify-center lg:pb-0">
            <p className="hero-fade mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80" style={{ animationDelay: '150ms' }}>
              <span className="hero-line h-px w-10 bg-white/60" aria-hidden />
              Umroh &amp; Haji Bimbingan Sunnah · Sejak 2017
            </p>
            <h1 className="max-w-4xl font-serif text-[2.6rem] font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              {HEADLINE.split(' ').map((w, i) => (
                <Fragment key={i}>
                  <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <span className="hero-word inline-block" style={{ animationDelay: `${250 + i * 70}ms` }}>{w}</span>
                  </span>{' '}
                </Fragment>
              ))}
            </h1>
            <p className="hero-fade mt-6 max-w-xl text-base text-white/85 sm:text-lg" style={{ animationDelay: '900ms' }}>
              Bersama {site.name}, setiap langkah dibimbing sesuai sunnah oleh pembimbing alumni Universitas Islam Madinah.
            </p>
            <div className="hero-fade mt-9 flex flex-wrap gap-3 text-white" style={{ animationDelay: '1050ms' }}>
              <Link to="/paket-umrah" className="btn-light">Lihat Paket Umrah</Link>
              <WaButton className="btn-ghost-light" />
            </div>
          </div>

          {/* Phase 2: tagline revealed while scrolling */}
          {!still && (
            <div className="hero-tagline pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
              <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 px-6 text-center font-serif text-5xl font-semibold text-white sm:text-7xl lg:text-8xl">
                {TAGLINE.map((t, i) => (
                  <span key={t} className="hero-tag-word" style={{ '--i': i } as CSSProperties}>
                    {t}
                    {i < TAGLINE.length - 1 && <span className="ml-5 text-white/40">·</span>}
                  </span>
                ))}
              </p>
            </div>
          )}

          {!still && (
            <div className="hero-cue absolute bottom-6 left-1/2 hidden sm:flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70" aria-hidden>
              Gulir
              <span className="relative h-10 w-px overflow-hidden bg-white/25"><span className="hero-cue-dot absolute inset-x-0 top-0 h-3 bg-white" /></span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
