import { useMemo, useState, type ChangeEvent } from 'react'
import { CtaBanner, PackageCard, PageHero } from '../components/blocks.tsx'
import { Seo } from '../components/ui.tsx'
import { packages } from '../data/packages.ts'
import { EMPTY_FILTERS, filterOptions, filterPackages, type PackageFilters } from '../lib/filterPackages.ts'
import { formatMonth } from '../lib/format.ts'

const selectCls = 'w-full rounded-lg border border-lavender bg-white px-3 py-2.5 text-sm focus:border-primary'

export default function Packages() {
  const [filters, setFilters] = useState<PackageFilters>(EMPTY_FILTERS)
  const options = useMemo(() => filterOptions(packages), [])
  const results = filterPackages(packages, filters)
  const set = (k: keyof PackageFilters) => (e: ChangeEvent<HTMLSelectElement>) => setFilters((f) => ({ ...f, [k]: e.target.value }))
  const active = Object.values(filters).some(Boolean)
  const hasFilters = options.months.length > 0 || options.durations.length > 0 || options.prices.length > 0

  return (
    <>
      <Seo title="Paket Umrah" description="Katalog paket Umrah Sultan Fatih Tour & Travel. Bandingkan durasi, jadwal keberangkatan, dan fasilitas, lalu konsultasikan pilihan Anda." />
      <PageHero eyebrow="Paket Umrah" title="Paket Umroh & Wisata Halal" desc="Semua jadwal keberangkatan umroh, haji, dan wisata halal, diurutkan dari harga termurah. Harga, waktu, dan kebijakan dapat berubah sewaktu-waktu." />

      <section className="container-x py-14">
        {hasFilters && (
          <form className="card mb-10 grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-end" onSubmit={(e) => e.preventDefault()} aria-label="Filter paket">
            {options.months.length > 0 && (
              <label className="text-sm font-medium text-deep">Bulan keberangkatan
                <select className={`${selectCls} mt-1.5`} value={filters.month} onChange={set('month')}>
                  <option value="">Semua bulan</option>
                  {options.months.map((m) => <option key={m} value={m}>{formatMonth(m)}</option>)}
                </select>
              </label>
            )}
            {options.durations.length > 0 && (
              <label className="text-sm font-medium text-deep">Durasi
                <select className={`${selectCls} mt-1.5`} value={filters.duration} onChange={set('duration')}>
                  <option value="">Semua durasi</option>
                  {options.durations.map((d) => <option key={d} value={d}>{d} hari</option>)}
                </select>
              </label>
            )}
            {options.prices.length > 0 && (
              <label className="text-sm font-medium text-deep">Rentang harga
                <select className={`${selectCls} mt-1.5`} value={filters.price} onChange={set('price')}>
                  <option value="">Semua harga</option>
                  {options.prices.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
                </select>
              </label>
            )}
            <button type="button" className="btn-outline py-2.5" onClick={() => setFilters(EMPTY_FILTERS)} disabled={!active}>Reset filter</button>
          </form>
        )}

        <p className="mb-6 text-sm text-muted" aria-live="polite">{results.length} paket ditemukan</p>

        {results.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => <PackageCard key={p.slug} pkg={p} />)}
          </div>
        ) : (
          <div className="card px-6 py-16 text-center">
            <h2 className="text-2xl">Belum ada paket yang sesuai</h2>
            <p className="mt-2 text-muted">Coba ubah filter, atau konsultasikan jadwal yang Anda inginkan kepada tim kami.</p>
            {active && <button type="button" className="btn-primary mt-6" onClick={() => setFilters(EMPTY_FILTERS)}>Reset filter</button>}
          </div>
        )}
      </section>

      <CtaBanner title="Belum Menemukan Paket yang Tepat?" text="Sampaikan rencana waktu dan kebutuhan Anda, tim Sultan Fatih akan membantu mencarikan pilihan yang sesuai." />
    </>
  )
}
