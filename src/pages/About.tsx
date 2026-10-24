import { CtaBanner, GalleryGrid, PageHero, VideoProfile } from '../components/blocks.tsx'
import { CheckIcon } from '../components/icons.tsx'
import { Img, SectionHeading, Seo } from '../components/ui.tsx'
import { site } from '../config/site.ts'
import { company } from '../data/content.ts'

export default function About() {
  const licenses = [
    { label: 'Badan hukum', value: site.legal.companyName },
    { label: 'Izin PPIU (Umrah)', value: site.legal.ppiuLicense },
    { label: 'Izin PIHK (Haji Khusus)', value: site.legal.pihkLicense },
  ].filter((l) => l.value)

  return (
    <>
      <Seo title="Tentang Kami" description={`Profil ${site.name}: sejarah sejak 2017, visi dan misi, fasilitas, program haji dan umroh, legalitas PPIU dan PIHK, serta tim.`} />
      <PageHero eyebrow="Tentang Kami" title={site.name} desc={company.summary} />

      <section className="container-x grid gap-12 py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl sm:text-4xl">Profil dan Sejarah</h2>
          {company.history.map((p) => <p key={p} className="mt-5 leading-relaxed text-muted">{p}</p>)}
        </div>
        <div className="space-y-6">
          <div className="card p-7">
            <h2 className="text-2xl">Visi</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted marker:text-primary">{company.visions.map((v) => <li key={v}>{v}</li>)}</ul>
          </div>
          <div className="card p-7">
            <h2 className="text-2xl">Misi</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted marker:text-primary">{company.missions.map((m) => <li key={m}>{m}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className="bg-lavender py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Fasilitas" title="Yang Jamaah Dapatkan" />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {company.facilities.map((f) => (
              <li key={f} className="card flex gap-3 p-6"><CheckIcon className="mt-0.5 shrink-0 text-primary" /><span>{f}</span></li>
            ))}
          </ul>
          <ul className="mt-10 flex flex-wrap justify-center gap-3" aria-label="Komitmen kami">
            {company.commitments.map((c) => <li key={c} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">{c}</li>)}
          </ul>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-3">Program</p>
          <h2 className="text-3xl sm:text-4xl">Program Haji dan Umroh</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {company.programs.map((p) => <li key={p} className="card px-5 py-4 font-semibold text-deep">{p}</li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3">Wisata Halal</p>
          <h2 className="text-3xl sm:text-4xl">Kenapa Halal Tour?</h2>
          <p className="mt-5 leading-relaxed text-muted">{company.halalTour}</p>
          <p className="mt-6 text-sm font-semibold text-deep">Destinasi yang pernah kami kunjungi</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {company.destinations.map((d) => <li key={d} className="rounded-full bg-lavender px-3 py-1.5 text-sm text-primary">{d}</li>)}
          </ul>
        </div>
      </section>

      <section className="bg-lavender py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Pimpinan" title="Tim Sultan Fatih" />
          <ul className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
            {company.team.map((t) => (
              <li key={t.name} className="card overflow-hidden text-center">
                <Img src={t.photo} alt={`Foto ${t.name}`} className="aspect-square w-full bg-white" />
                <div className="p-5"><h3 className="text-2xl">{t.name}</h3><p className="text-sm text-muted">{t.role}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl sm:text-4xl">Legalitas</h2>
          <p className="mt-4 text-muted">Informasi legalitas dapat diverifikasi melalui Kementerian Agama Republik Indonesia.</p>
          <dl className="card mt-6 divide-y divide-lavender">
            {licenses.map((l) => (
              <div key={l.label} className="flex justify-between gap-4 px-5 py-4 text-sm"><dt className="text-muted">{l.label}</dt><dd className="text-right font-semibold text-deep">{l.value}</dd></div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="mb-6 text-3xl sm:text-4xl">Video Company Profile</h2>
          <VideoProfile />
        </div>
      </section>

      <section className="container-x pb-20">
        <SectionHeading eyebrow="Kantor" title="Kantor Kami" desc={site.address} />
        <GalleryGrid items={company.officePhotos} />
      </section>

      <CtaBanner />
    </>
  )
}
