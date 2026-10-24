import { site } from '../config/site.ts'

/** Returns null when no number is configured, so callers never render a fake link. */
export function buildWaUrl(number: string, message?: string): string | null {
  const digits = number.replace(/\D/g, '')
  if (!digits) return null
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

export const waUrl = (message?: string) => buildWaUrl(site.whatsapp, message)

export const DEFAULT_WA_MESSAGE =
  'Assalamualaikum, saya ingin berkonsultasi mengenai paket Umrah di Sultan Fatih Tour & Travel.'

export const packageWaMessage = (packageName: string) =>
  `Assalamualaikum, saya tertarik dengan paket ${packageName}. Mohon informasi mengenai harga, fasilitas, dan jadwal keberangkatan.`
