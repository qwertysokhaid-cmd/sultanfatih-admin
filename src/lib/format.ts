const idr = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
const longDate = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
const monthYear = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' })

export const formatPrice = (n: number) => idr.format(n)
// Parse as local date so '2027-02-01' never shifts to the previous day in western timezones
const toDate = (iso: string) => new Date(`${iso.slice(0, 10)}T00:00:00`)
export const formatDate = (iso: string) => longDate.format(toDate(iso))
export const formatMonth = (yyyyMm: string) => monthYear.format(toDate(`${yyyyMm}-01`))

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'agu', 'sep', 'okt', 'nov', 'des']
/** Package URL: the file name with its trailing date (e.g. -19-nov-2026 or -2026-11-19) swapped for the current departure date, so a date edited in /admin also updates the URL. */
export const packageSlug = (fileSlug: string, departureDate?: string) => {
  const base = fileSlug.replace(/-(\d{2}-[a-z]{3}-\d{4}|\d{4}-\d{2}-\d{2})$/, '')
  const d = departureDate?.match(/^(\d{4})-(\d{2})-(\d{2})/)
  return d ? `${base}-${d[3]}-${MONTHS[+d[2] - 1]}-${d[1]}` : fileSlug
}

export const NOT_CONFIRMED = 'Informasi akan dikonfirmasi oleh tim Sultan Fatih'
