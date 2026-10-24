const idr = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
const longDate = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
const monthYear = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' })

export const formatPrice = (n: number) => idr.format(n)
// Parse as local date so '2027-02-01' never shifts to the previous day in western timezones
const toDate = (iso: string) => new Date(`${iso.slice(0, 10)}T00:00:00`)
export const formatDate = (iso: string) => longDate.format(toDate(iso))
export const formatMonth = (yyyyMm: string) => monthYear.format(toDate(`${yyyyMm}-01`))

export const NOT_CONFIRMED = 'Informasi akan dikonfirmasi oleh tim Sultan Fatih'
