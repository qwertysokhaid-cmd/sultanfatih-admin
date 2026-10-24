import type { UmrahPackage } from '../types/index.ts'

export interface PackageFilters {
  month: string // 'YYYY-MM' atau ''
  duration: string // jumlah hari atau ''
  price: string // id dari PRICE_RANGES atau ''
}

export const EMPTY_FILTERS: PackageFilters = { month: '', duration: '', price: '' }

export const PRICE_RANGES = [
  { id: 'lt30', label: 'Di bawah Rp30 juta', min: 0, max: 30_000_000 },
  { id: '30-40', label: 'Rp30–40 juta', min: 30_000_000, max: 40_000_000 },
  { id: 'gte40', label: 'Rp40 juta ke atas', min: 40_000_000, max: Infinity },
]

/** Options are derived from the data, so a filter only appears when packages actually have that field. */
export function filterOptions(list: UmrahPackage[]) {
  const months = [...new Set(list.flatMap((p) => (p.departureDate ? [p.departureDate.slice(0, 7)] : [])))].sort()
  const durations = [...new Set(list.flatMap((p) => (p.durationDays ? [p.durationDays] : [])))].sort((a, b) => a - b)
  const prices = PRICE_RANGES.filter((r) => list.some((p) => p.price !== undefined && p.price >= r.min && p.price < r.max))
  return { months, durations, prices }
}

export function filterPackages(list: UmrahPackage[], f: PackageFilters): UmrahPackage[] {
  const range = PRICE_RANGES.find((r) => r.id === f.price)
  return list.filter(
    (p) =>
      (!f.month || p.departureDate?.startsWith(f.month)) &&
      (!f.duration || p.durationDays === Number(f.duration)) &&
      (!range || (p.price !== undefined && p.price >= range.min && p.price < range.max)),
  )
}

/** Hides departed packages and sorts cheapest first (same price: earliest departure; no price: last). */
export function upcomingByPrice<T extends Pick<UmrahPackage, 'price' | 'departureDate'>>(list: T[], today: string): T[] {
  return list
    .filter((p) => !p.departureDate || p.departureDate >= today)
    .sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity) || (a.departureDate ?? '').localeCompare(b.departureDate ?? ''))
}
