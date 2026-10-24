import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CtaBanner, FaqList, GalleryGrid } from '../components/blocks.tsx'
import { CheckIcon, CloseIcon } from '../components/icons.tsx'
import { Img, Seo, WaButton } from '../components/ui.tsx'
import { getPackage } from '../data/packages.ts'
import { formatDate, formatPrice, NOT_CONFIRMED } from '../lib/format.ts'
import { packageWaMessage } from '../lib/whatsapp.ts'
import NotFound from './NotFound.tsx'

const Pending = () => <p className="text-muted italic">{NOT_CONFIRMED}</p>

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="card p-6 sm:p-8">
      <h2 className="mb-5 text-2xl">{title}</h2>
      {children}
    </section>
  )
}

function List({ items, icon }: { items: string[]; icon: 'check' | 'x' }) {
  if (!items.length) return <Pending />
  return (
    <ul className="space-y-2.5">
      {items.map((i) => (
        <li key={i} className="flex gap-2.5">
          {icon === 'check' ? <CheckIcon className="mt-0.5 shrink-0 text-primary" /> : <CloseIcon className="mt-0.5 shrink-0 text-muted" />}
          <span>{i}</span>
        </li>
      ))}
    </ul>
  )
}

export default function PackageDetail() {
  const { slug = '' } = useParams()
  const pkg = getPackage(slug)
  if (!pkg) return <NotFound />

  const message = packageWaMessage(pkg.name)
  const facts: [string, string | undefined][] = [
    ['Harga per orang', pkg.price !== undefined ? formatPrice(pkg.price) : undefined],
    ['Keberangkatan', pkg.departureDate && formatDate(pkg.departureDate)],
    ['Durasi', pkg.durationDays ? `${pkg.durationDays} hari` : undefined],
    ['Kota keberangkatan', pkg.departureCity],
    ['Maskapai', pkg.airline],
  ]

  return (
    <>
      <Seo title={pkg.name} description={pkg.summary} />
      <div className="container-x py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <Link to="/" className="hover:text-primary">Beranda</Link> / <Link to="/paket-umrah" className="hover:text-primary">Paket Umrah</Link> / <span className="text-ink">{pkg.name}</span>
        </nav>

        <div className="grid gap-4 md:grid-cols-4">
          <Img src={pkg.images[0]} alt={pkg.name} eager className={`aspect-[16/10] w-full rounded-xl ${pkg.images.length > 1 ? 'md:col-span-3 md:row-span-2 md:aspect-auto md:h-full' : 'md:col-span-4 md:aspect-[21/9]'}`} />
          {pkg.images.slice(1, 3).map((src, i) => <Img key={src} src={src} alt={`${pkg.name}, foto ${i + 2}`} className="aspect-[4/3] w-full rounded-xl" />)}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <header>
              <p className="eyebrow">{pkg.category}</p>
              <h1 className="mt-2 text-4xl sm:text-5xl">{pkg.name}</h1>
              <p className="mt-4 text-lg text-muted">{pkg.summary}</p>
              {pkg.highlights && pkg.highlights.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Keunggulan dan bonus">
                  {pkg.highlights.map((x) => <li key={x} className="rounded-full bg-lavender px-3 py-1.5 text-sm font-medium text-primary">{x}</li>)}
                </ul>
              )}
            </header>

            {pkg.brochures && pkg.brochures.length > 0 && (
              <Block title="Brosur Paket">
                <GalleryGrid tall items={pkg.brochures.map((src, i) => ({ src, alt: `Brosur ${pkg.name}, halaman ${i + 1}`, isOwnDocumentation: true }))} />
              </Block>
            )}

            <Block title="Itinerary">
              {pkg.itinerary.length ? (
                <ol className="relative space-y-6 border-l-2 border-lavender pl-6">
                  {pkg.itinerary.map((d) => (
                    <li key={d.day} className="relative">
                      <span className="absolute -left-[34px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{d.day}</span>
                      <h3 className="font-sans text-base font-semibold text-deep">Hari {d.day}: {d.title}</h3>
                      <p className="mt-1 text-muted">{d.description}</p>
                    </li>
                  ))}
                </ol>
              ) : <Pending />}
            </Block>

            <Block title="Hotel">
              {pkg.hotels.length ? (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {pkg.hotels.map((h) => (
                    <li key={h.name} className="rounded-lg bg-lavender p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">{h.city}</p>
                      <p className="mt-1 font-semibold text-deep">{h.name}</p>
                      <p className="text-sm text-muted">{[h.stars && `Bintang ${h.stars}`, h.distance].filter(Boolean).join(' · ')}</p>
                    </li>
                  ))}
                </ul>
              ) : <Pending />}
            </Block>

            <div className="grid gap-6 md:grid-cols-2">
              <Block title="Termasuk"><List items={pkg.includes} icon="check" /></Block>
              <Block title="Tidak Termasuk"><List items={pkg.excludes} icon="x" /></Block>
            </div>

            <Block title="Dokumen dan Persyaratan"><List items={pkg.documents} icon="check" /></Block>

            <Block title="Ketentuan Pembayaran dan Pembatalan">
              <h3 className="font-sans text-base font-semibold text-deep">Pembayaran</h3>
              <div className="mb-5 mt-1">{pkg.paymentTerms ? <p className="text-muted">{pkg.paymentTerms}</p> : <Pending />}</div>
              <h3 className="font-sans text-base font-semibold text-deep">Pembatalan</h3>
              <div className="mt-1">{pkg.cancellationTerms ? <p className="text-muted">{pkg.cancellationTerms}</p> : <Pending />}</div>
            </Block>

            {pkg.faqs.length > 0 && (
              <section>
                <h2 className="mb-5 text-2xl">FAQ Paket</h2>
                <FaqList items={pkg.faqs} />
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h2 className="mb-4 text-2xl">Ringkasan Paket</h2>
              <dl className="divide-y divide-lavender text-sm">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3">
                    <dt className="text-muted">{k}</dt>
                    <dd className={`text-right font-semibold ${v ? 'text-deep' : 'font-normal italic text-muted'}`}>{v ?? 'Akan dikonfirmasi'}</dd>
                  </div>
                ))}
              </dl>
              {pkg.roomOptions?.length ? (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-semibold text-deep">Pilihan kamar</p>
                  <ul className="space-y-1 text-sm">
                    {pkg.roomOptions.map((r) => (
                      <li key={r.type} className="flex justify-between"><span>{r.type}</span><span className="font-semibold">{r.price !== undefined ? formatPrice(r.price) : 'Akan dikonfirmasi'}</span></li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="mt-6 flex flex-col"><WaButton message={message} label="Tanya Paket via WhatsApp" className="btn-primary w-full" /></div>
              <p className="mt-3 text-xs text-muted">*Harga, waktu, dan kebijakan dapat berubah sewaktu-waktu.</p>
            </div>
          </aside>
        </div>
      </div>
      <CtaBanner message={message} />
    </>
  )
}
