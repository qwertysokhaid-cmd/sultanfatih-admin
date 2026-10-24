import { Link } from 'react-router-dom'
import AgentMap from '../components/AgentMap.tsx'
import Hero from '../components/Hero.tsx'
import { AirlineMarquee, ArticleCard, CtaBanner, FaqList, GalleryGrid, PackageSlider, Testimonials, VideoProfile } from '../components/blocks.tsx'
import { ChatIcon, CheckIcon, DocIcon, HeartIcon, ShieldIcon, TagIcon } from '../components/icons.tsx'
import { SectionHeading, Seo } from '../components/ui.tsx'
import { site } from '../config/site.ts'
import { latestArticles } from '../data/articles.ts'
import { company, gallery, generalFaqs, testimonials, whyUs } from '../data/content.ts'
import { featuredPackages, packages } from '../data/packages.ts'
import { formatPrice } from '../lib/format.ts'

const pillarIcons = { price: TagIcon, shield: ShieldIcon, heart: HeartIcon }
const cheapest = packages.find((p) => p.category === 'Umroh' && p.price)?.price

export default function Home() {
  const trust = [
    { icon: ShieldIcon, title: 'Izin PPIU (Umrah)', value: site.legal.ppiuLicense },
    { icon: DocIcon, title: 'Izin PIHK (Haji Khusus)', value: site.legal.pihkLicense },
    { icon: CheckIcon, title: 'Berdiri sejak 2017', value: 'Berpengalaman di umroh sejak 2012' },
    { icon: ChatIcon, title: 'Pembimbing UIM', value: 'Alumni dan mahasiswa Universitas Islam Madinah' },
  ]

  return (
    <>
      <Seo title="Paket Umrah dan Konsultasi Jamaah" description={site.description} />

      <Hero />

      {/* Trust bar */}
      <section aria-label="Informasi kepercayaan" className="border-b border-lavender bg-white">
        <ul className="container-x grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(({ icon: Icon, title, value }) => (
            <li key={title} className="flex items-start gap-3">
              <span className="rounded-lg bg-lavender p-2.5 text-primary"><Icon /></span>
              <div>
                <p className="text-sm font-semibold text-deep">{title}</p>
                <p className="text-sm text-muted">{value}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <AirlineMarquee />

      {/* Paket unggulan */}
      <section className="overflow-hidden bg-gradient-to-b from-lavender/60 to-bg py-20">
        <div className="container-x">
        <SectionHeading eyebrow="Paket Unggulan" title="Jadwal Umroh Terdekat" desc="Mulai dari harga termurah. Geser untuk melihat pilihan lainnya, lalu konsultasikan yang paling sesuai untuk Anda." />
        <PackageSlider items={featuredPackages} label="Paket umroh unggulan" />
        <div className="mt-8 text-center"><Link to="/paket-umrah" className="btn-outline">Lihat Semua Paket</Link></div>
        </div>
      </section>

      {/* Mengapa: tiga keunggulan utama */}
      <section className="bg-lavender py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Mengapa Sultan Fatih" title="Tiga Hal yang Kami Jaga" desc="Komitmen yang membuat jamaah kembali berangkat bersama kami." />
          <ul className="grid gap-6 lg:grid-cols-3">
            {whyUs.map((w, i) => {
              const Icon = pillarIcons[w.icon]
              const points = w.icon === 'price' && cheapest ? [`Paket umroh mulai ${formatPrice(cheapest)}`, ...w.points] : w.points
              return (
                <li key={w.title} className="card relative flex flex-col overflow-hidden p-7 sm:p-8">
                  <span aria-hidden className="absolute -right-2 -top-6 font-serif text-[7rem] font-bold leading-none text-primary/[0.06]">0{i + 1}</span>
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-deep text-white shadow-[0_8px_20px_rgba(126,28,186,0.3)]">
                    <Icon width={26} height={26} />
                  </span>
                  <h3 className="mt-6 text-3xl">{w.title}</h3>
                  <p className="mt-3 text-muted">{w.text}</p>
                  <ul className="mt-5 space-y-2.5">
                    {points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm font-medium text-deep"><CheckIcon width={18} height={18} className="mt-0.5 shrink-0 text-primary" />{p}</li>
                    ))}
                  </ul>
                  <figure className="mt-auto pt-6">
                    <blockquote className="rounded-xl border-l-4 border-primary bg-lavender/70 px-4 py-3 text-sm italic leading-relaxed text-ink/80">“{w.quote.text}”</blockquote>
                    <figcaption className="mt-2 text-xs text-muted">{w.quote.name}, ulasan Google</figcaption>
                  </figure>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Company profile */}
      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-3">Tentang Kami</p>
          <h2 className="text-3xl leading-tight sm:text-4xl">Mengenal {site.name}</h2>
          <p className="mt-5 text-muted">{company.history[0]}</p>
          <dl className="mt-6 space-y-4 text-sm">
            <div><dt className="font-semibold text-deep">Visi</dt><dd className="mt-1 text-muted">{company.visions.join(' · ')}</dd></div>
            <div><dt className="font-semibold text-deep">Misi</dt><dd className="mt-1 text-muted">{company.missions.join(' · ')}</dd></div>
          </dl>
          <Link to="/tentang-kami" className="btn-primary mt-8">Kenali Kami Lebih Dekat</Link>
        </div>
        <VideoProfile />
      </section>

      {gallery.length > 0 && (
        <section className="container-x pb-20">
          <SectionHeading eyebrow="Galeri" title="Galeri Perjalanan" />
          <GalleryGrid items={gallery.slice(0, 6)} />
          <div className="mt-10 text-center"><Link to="/galeri" className="btn-outline">Lihat Galeri</Link></div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="bg-lavender py-20">
          <div className="container-x">
            <SectionHeading eyebrow="Testimoni" title="Cerita dari Jamaah" desc="Ulasan asli jamaah Sultan Fatih di Google, ditampilkan apa adanya." />
            <Testimonials items={testimonials} />
          </div>
        </section>
      )}

      <AgentMap />

      {/* Artikel */}
      <section className="container-x py-20">
        <SectionHeading eyebrow="Artikel Edukasi" title="Bekal Sebelum Berangkat" />
        <div className="grid gap-6 md:grid-cols-3">
          {latestArticles.map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
        <div className="mt-10 text-center"><Link to="/artikel" className="btn-outline">Semua Artikel</Link></div>
      </section>

      {/* FAQ */}
      <section className="bg-lavender py-20">
        <div className="container-x">
          <SectionHeading eyebrow="FAQ" title="Pertanyaan yang Sering Diajukan" />
          <FaqList items={generalFaqs} />
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
