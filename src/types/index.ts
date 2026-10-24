export interface Faq {
  q: string
  a: string
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface Hotel {
  city: string
  name: string
  stars?: number
  distance?: string
}

export interface RoomOption {
  type: string
  price?: number
}

export interface UmrahPackage {
  slug: string
  name: string
  summary: string
  category: 'Umroh' | 'Umroh Plus' | 'Ziarah & Wisata Halal' | 'Haji'
  highlights?: string[] // bonus & keunggulan dari brosur
  brochures?: string[]
  durationDays?: number
  departureDate?: string // ISO, contoh '2027-02-14'
  departureCity?: string
  airline?: string
  price?: number // harga per orang (IDR)
  roomOptions?: RoomOption[]
  images: string[]
  itinerary: ItineraryDay[]
  hotels: Hotel[]
  includes: string[]
  excludes: string[]
  documents: string[]
  paymentTerms?: string
  cancellationTerms?: string
  faqs: Faq[]
}

export interface GalleryItem {
  src: string
  alt: string
  caption?: string
  /** true hanya jika foto adalah dokumentasi asli Sultan Fatih */
  isOwnDocumentation: boolean
}

export interface Article {
  slug: string
  title: string
  category: string
  date: string // ISO
  excerpt: string
  thumbnail?: string
  draft?: boolean
  body: string // Markdown
  references?: string[]
}

export interface Testimonial {
  name: string
  text: string
  rating?: number // undefined = rating tidak terlihat di tangkapan layar
  localGuide?: boolean
  photo?: string
}

export interface DocVideo {
  id: string
  date: string // ISO
  duration: number // detik
  portrait: boolean
  title: string
  tag: 'Tanah Suci' | 'Turki' | 'Aqsa & Yordania' | 'Thaif' | 'Perjalanan'
}
