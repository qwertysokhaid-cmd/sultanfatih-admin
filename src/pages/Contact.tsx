import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/blocks.tsx'
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from '../components/icons.tsx'
import { Placeholder, Seo, WaButton } from '../components/ui.tsx'
import { site, type SocialKey } from '../config/site.ts'
import { packages } from '../data/packages.ts'
import { consultationMessage, validateConsultation, type ConsultationForm, type FormErrors } from '../lib/consultation.ts'
import { formatMonth } from '../lib/format.ts'
import { waUrl } from '../lib/whatsapp.ts'

const EMPTY: ConsultationForm = { name: '', phone: '', packageName: '', departure: '', participants: '1', consent: false }
const inputCls = 'mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm focus:border-primary'

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})
  const [opened, setOpened] = useState(false)
  const waReady = Boolean(waUrl())

  const field = <K extends keyof ConsultationForm>(k: K, v: ConsultationForm[K]) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validateConsultation(form)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    const url = waUrl(consultationMessage(form, form.departure && formatMonth(form.departure)))
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
      setOpened(true)
    }
  }

  const err = (k: keyof ConsultationForm) =>
    errors[k] && <p id={`e-${k}`} className="mt-1 text-sm text-red-700">{errors[k]}</p>
  const aria = (k: keyof ConsultationForm) => ({
    id: `f-${k}`,
    'aria-invalid': Boolean(errors[k]),
    'aria-describedby': errors[k] ? `e-${k}` : undefined,
  })
  const border = (k: keyof ConsultationForm) => (errors[k] ? 'border-red-600' : 'border-lavender')

  const socials = (Object.keys(site.social) as SocialKey[]).filter((k) => site.social[k])

  return (
    <>
      <Seo title="Kontak dan Konsultasi" description="Hubungi Sultan Fatih Tour & Travel untuk konsultasi paket Umrah melalui WhatsApp, email, atau kunjungi kantor kami." />
      <PageHero eyebrow="Kontak" title="Konsultasi Perjalanan Umrah" desc="Tim Sultan Fatih siap membantu menjawab pertanyaan Anda tentang paket, jadwal, dan persiapan." />

      <section className="container-x grid gap-10 py-14 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <div className="card space-y-5 p-7">
            <h2 className="text-2xl">Informasi Kontak</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3"><WhatsAppIcon className="mt-0.5 shrink-0 text-primary" /><div><p className="font-semibold text-deep">WhatsApp</p>{site.whatsapp ? `+${site.whatsapp}` : <Placeholder>Nomor WhatsApp resmi</Placeholder>}</div></li>
              {site.phone && <li className="flex gap-3"><PhoneIcon className="mt-0.5 shrink-0 text-primary" /><div><p className="font-semibold text-deep">Telepon kantor</p><a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="text-primary underline-offset-4 hover:underline">{site.phone}</a></div></li>}
              <li className="flex gap-3"><MailIcon className="mt-0.5 shrink-0 text-primary" /><div><p className="font-semibold text-deep">Email</p>{site.email ? <a href={`mailto:${site.email}`} className="text-primary underline-offset-4 hover:underline">{site.email}</a> : <Placeholder>Email resmi</Placeholder>}</div></li>
              <li className="flex gap-3"><PinIcon className="mt-0.5 shrink-0 text-primary" /><div><p className="font-semibold text-deep">Alamat kantor</p>{site.address || <Placeholder>Alamat kantor</Placeholder>}{site.mapsUrl && <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-primary underline-offset-4 hover:underline">Buka di Google Maps</a>}</div></li>
              <li className="flex gap-3"><ClockIcon className="mt-0.5 shrink-0 text-primary" /><div><p className="font-semibold text-deep">Jam pelayanan</p>{site.serviceHours || <Placeholder>Jam pelayanan</Placeholder>}</div></li>
            </ul>
            {socials.length > 0 && (
              <ul className="flex flex-wrap gap-3 border-t border-lavender pt-5 text-sm">
                {socials.map((k) => <li key={k}><a href={site.social[k]} target="_blank" rel="noopener noreferrer" className="capitalize text-primary underline-offset-4 hover:underline">{k}</a></li>)}
              </ul>
            )}
          </div>
          <div className="bg-pattern rounded-xl bg-deep p-7 text-white">
            <h2 className="text-2xl text-white">Cara tercepat: WhatsApp</h2>
            <p className="mt-2 text-sm text-white/80">Langsung terhubung dengan tim konsultasi Sultan Fatih.</p>
            <div className="mt-5"><WaButton className="btn-light" /></div>
          </div>
          <div className="card p-7">
            <h2 className="text-2xl">Rekening Resmi</h2>
            <p className="mt-2 text-sm text-muted">Pembayaran hanya melalui rekening atas nama {site.legal.companyName}. Waspadai pihak yang meminta transfer ke rekening lain.</p>
            <ul className="mt-4 space-y-2">
              {site.bankAccounts.map((b) => <li key={b.number} className="flex justify-between rounded-lg bg-lavender px-4 py-3 font-semibold text-deep"><span>{b.bank}</span><span className="tabular-nums">{b.number}</span></li>)}
            </ul>
          </div>
        </div>

        <div className="card p-7 sm:p-9 lg:col-span-3">
          <h2 className="text-2xl">Formulir Konsultasi</h2>
          <p className="mt-2 rounded-lg bg-lavender p-3 text-sm text-deep">
            Formulir ini belum terhubung ke server. Setelah Anda menekan tombol, pesan berisi data di bawah akan disiapkan di WhatsApp
            dan baru terkirim ketika Anda menekan <strong>Kirim</strong> di aplikasi WhatsApp.
          </p>

          <form noValidate onSubmit={onSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-deep sm:col-span-2">Nama lengkap
              <input {...aria('name')} className={`${inputCls} ${border('name')}`} autoComplete="name" value={form.name} onChange={(e) => field('name', e.target.value)} required />
              {err('name')}
            </label>
            <label className="text-sm font-medium text-deep">Nomor WhatsApp
              <input {...aria('phone')} type="tel" inputMode="tel" className={`${inputCls} ${border('phone')}`} autoComplete="tel" placeholder="081234567890" value={form.phone} onChange={(e) => field('phone', e.target.value)} required />
              {err('phone')}
            </label>
            <label className="text-sm font-medium text-deep">Paket yang diminati
              <select {...aria('packageName')} className={`${inputCls} ${border('packageName')}`} value={form.packageName} onChange={(e) => field('packageName', e.target.value)} required>
                <option value="">Pilih paket</option>
                {packages.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
                <option value="Belum menentukan">Belum menentukan</option>
              </select>
              {err('packageName')}
            </label>
            <label className="text-sm font-medium text-deep">Perkiraan keberangkatan <span className="font-normal text-muted">(opsional)</span>
              <input {...aria('departure')} type="month" className={`${inputCls} ${border('departure')}`} value={form.departure} onChange={(e) => field('departure', e.target.value)} />
            </label>
            <label className="text-sm font-medium text-deep">Jumlah peserta
              <input {...aria('participants')} type="number" min={1} max={100} className={`${inputCls} ${border('participants')}`} value={form.participants} onChange={(e) => field('participants', e.target.value)} required />
              {err('participants')}
            </label>
            <div className="sm:col-span-2">
              <label className="flex items-start gap-3 text-sm text-ink">
                <input {...aria('consent')} type="checkbox" className="mt-0.5 h-4 w-4 accent-primary" checked={form.consent} onChange={(e) => field('consent', e.target.checked)} />
                <span>Saya setuju data saya digunakan untuk keperluan konsultasi sesuai <Link to="/kebijakan-privasi" className="text-primary underline">Kebijakan Privasi</Link>.</span>
              </label>
              {err('consent')}
            </div>
            <div className="sm:col-span-2">
              {waReady ? (
                <button type="submit" className="btn-primary w-full sm:w-auto"><WhatsAppIcon /> Lanjutkan ke WhatsApp</button>
              ) : (
                <p className="rounded-lg border border-dashed border-primary/50 p-3 text-sm text-primary">
                  Pengiriman belum tersedia: nomor WhatsApp resmi belum dikonfigurasi di <code>src/config/site.ts</code>.
                </p>
              )}
              {opened && (
                <p role="status" className="mt-4 text-sm text-deep">
                  WhatsApp telah dibuka di tab baru. Pesan Anda <strong>belum terkirim</strong> sampai Anda menekan Kirim di WhatsApp.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
