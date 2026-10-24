export interface ConsultationForm {
  name: string
  phone: string
  packageName: string
  departure: string // 'YYYY-MM' atau ''
  participants: string
  consent: boolean
}

export type FormErrors = Partial<Record<keyof ConsultationForm, string>>

export function validateConsultation(f: ConsultationForm): FormErrors {
  const e: FormErrors = {}
  if (f.name.trim().length < 2) e.name = 'Mohon isi nama lengkap Anda.'
  if (!/^(\+?62|0)8\d{7,12}$/.test(f.phone.replace(/[\s-]/g, ''))) e.phone = 'Mohon isi nomor WhatsApp yang valid, contoh 081234567890.'
  if (!f.packageName) e.packageName = 'Mohon pilih paket yang diminati.'
  const n = Number(f.participants)
  if (!Number.isInteger(n) || n < 1 || n > 100) e.participants = 'Jumlah peserta antara 1 sampai 100 orang.'
  if (!f.consent) e.consent = 'Mohon setujui kebijakan privasi untuk melanjutkan.'
  return e
}

export function consultationMessage(f: ConsultationForm, departureLabel: string) {
  return [
    'Assalamualaikum, saya ingin berkonsultasi mengenai paket Umrah.',
    `Nama: ${f.name.trim()}`,
    `No. WhatsApp: ${f.phone.trim()}`,
    `Paket diminati: ${f.packageName}`,
    `Perkiraan keberangkatan: ${departureLabel || 'Belum ditentukan'}`,
    `Jumlah peserta: ${f.participants} orang`,
  ].join('\n')
}
