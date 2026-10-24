import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router-dom'
import { site, type SocialKey } from '../config/site.ts'
import { ClockIcon, CloseIcon, MailIcon, MenuIcon, PhoneIcon, PinIcon, WhatsAppIcon } from './icons.tsx'

const nav = [
  { to: '/', label: 'Beranda' },
  { to: '/paket-umrah', label: 'Paket Umrah' },
  { to: '/tentang-kami', label: 'Tentang Kami' },
  { to: '/galeri', label: 'Galeri' },
  { to: '/artikel', label: 'Artikel' },
  { to: '/kontak', label: 'Kontak' },
]

const YEAR = new Date().getFullYear()

const socialLabels: Record<SocialKey, string> = { instagram: 'Instagram', facebook: 'Facebook', youtube: 'YouTube', tiktok: 'TikTok' }

function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="flex shrink-0 items-center" aria-label={`${site.name}, ke beranda`}>
      <img src={light ? site.logoWhite : site.logo} alt={site.name} width={221} height={40} className="h-9 w-auto sm:h-10" />
    </Link>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-ink hover:text-primary'}`

  return (
    <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow ${scrolled ? 'shadow-[0_2px_12px_rgba(75,3,86,0.08)]' : ''}`}>
      <div className="container-x flex h-18 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.to}><NavLink to={n.to} end={n.to === '/'} className={linkCls}>{n.label}</NavLink></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/kontak" className="btn-primary hidden py-2.5 sm:inline-flex">Konsultasi</Link>
          <button
            type="button"
            className="rounded-md p-2 text-deep lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Navigasi seluler" className="border-t border-lavender bg-white lg:hidden">
          <ul className="container-x flex flex-col py-3" onClick={() => setOpen(false)}>
            {nav.map((n) => (
              <li key={n.to}><NavLink to={n.to} end={n.to === '/'} className={(s) => `block ${linkCls(s)} py-3`}>{n.label}</NavLink></li>
            ))}
            <li className="pt-2"><Link to="/kontak" className="btn-primary w-full">Konsultasi</Link></li>
          </ul>
        </nav>
      )}
    </header>
  )
}

function Footer() {
  const socials = (Object.keys(site.social) as SocialKey[]).filter((k) => site.social[k])
  return (
    <footer className="bg-deep text-white/80">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light />
          <p className="text-sm leading-relaxed">{site.description}</p>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">Navigasi</h2>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-white">{n.label}</Link></li>)}
            <li><Link to="/kebijakan-privasi" className="hover:text-white">Kebijakan Privasi</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">Kontak</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><WhatsAppIcon className="mt-0.5 shrink-0" />{site.whatsapp ? `+${site.whatsapp}` : <span className="italic">Nomor WhatsApp belum diisi</span>}</li>
            {site.phone && <li className="flex gap-2"><PhoneIcon className="mt-0.5 shrink-0" /><a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="hover:text-white">{site.phone}</a></li>}
            <li className="flex gap-2"><MailIcon className="mt-0.5 shrink-0" />{site.email ? <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a> : <span className="italic">Email belum diisi</span>}</li>
            <li className="flex gap-2"><PinIcon className="mt-0.5 shrink-0" />{site.address || <span className="italic">Alamat kantor belum diisi</span>}</li>
            {site.serviceHours && <li className="flex gap-2"><ClockIcon className="mt-0.5 shrink-0" />{site.serviceHours}</li>}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">Perusahaan</h2>
          <ul className="space-y-2 text-sm">
            <li>{site.legal.companyName || <span className="italic">Nama badan hukum belum diisi</span>}</li>
            <li>Izin PPIU: {site.legal.ppiuLicense || <span className="italic">belum diisi</span>}</li>
            <li>Izin PIHK: {site.legal.pihkLicense || <span className="italic">belum diisi</span>}</li>
          </ul>
          {socials.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-3 text-sm">
              {socials.map((k) => (
                <li key={k}><a href={site.social[k]} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-white hover:underline">{socialLabels[k]}</a></li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-x py-5 text-xs text-white/60">© {YEAR} {site.name}. Seluruh hak cipta dilindungi.</p>
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <>
      <a href="#main" className="sr-only z-50 rounded bg-white px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Lewati ke konten</a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}
