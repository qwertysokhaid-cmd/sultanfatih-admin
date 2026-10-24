import { upcomingByPrice } from '../lib/filterPackages.ts'
import type { UmrahPackage } from '../types/index.ts'

// Isi paket dikelola lewat panel admin (/admin) → satu file JSON per paket di src/content/paket/.
// Nama file = alamat halaman paket. Paket yang sudah berangkat otomatis disembunyikan, urutan termurah dulu.
const files = import.meta.glob<Partial<UmrahPackage>>('../content/paket/*.json', { eager: true, import: 'default' })

const documents = [
  'Paspor dengan masa berlaku sesuai ketentuan terbaru',
  'KTP dan Kartu Keluarga',
  'Pas foto sesuai ketentuan visa',
  'Vaksin meningitis dan polio sesuai ketentuan yang berlaku',
  'Dokumen tambahan lain akan diinformasikan oleh tim Sultan Fatih',
]

const faqs = [
  { q: 'Apakah bisa umroh private?', a: 'Bisa. Sultan Fatih melayani umroh private: Anda dapat menentukan sendiri paket dan waktunya.' },
  { q: 'Apakah jamaah cuci darah tetap bisa berangkat?', a: 'Bisa. Sampaikan kondisi kesehatan saat konsultasi agar tim dapat menyiapkan pendampingan yang sesuai.' },
  { q: 'Apakah harga bisa berubah?', a: 'Harga, waktu, dan kebijakan dapat berubah sewaktu-waktu, misalnya karena kurs atau kebijakan maskapai. Konfirmasi harga terbaru melalui WhatsApp.' },
]

const nonEmpty = <T,>(v: T[] | undefined, fallback: T[]) => (v?.length ? v : fallback)

const all: UmrahPackage[] = Object.entries(files).map(([path, p]) => ({
  ...p,
  slug: path.split('/').pop()!.replace(/\.json$/, ''),
  name: p.name ?? 'Paket',
  summary: p.summary ?? '',
  category: p.category ?? 'Umroh',
  // The CMS saves empty optional fields as '' or null; treat them as "not filled in".
  price: p.price || undefined,
  departureDate: p.departureDate || undefined,
  durationDays: p.durationDays || undefined,
  images: p.images ?? [],
  itinerary: p.itinerary ?? [],
  hotels: p.hotels ?? [],
  includes: p.includes ?? [],
  excludes: p.excludes ?? [],
  documents: nonEmpty(p.documents, documents),
  faqs: nonEmpty(p.faqs, faqs),
}))

export const packages = upcomingByPrice(all, new Date().toISOString().slice(0, 10))
export const getPackage = (slug: string) => packages.find((p) => p.slug === slug)
export const featuredPackages = packages.filter((p) => p.category === 'Umroh' || p.category === 'Umroh Plus').slice(0, 9)
