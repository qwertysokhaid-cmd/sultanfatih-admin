import assert from 'node:assert/strict'
import { test } from 'node:test'
import { filterOptions, filterPackages, EMPTY_FILTERS } from '../src/lib/filterPackages.ts'
import { buildWaUrl, packageWaMessage } from '../src/lib/whatsapp.ts'
import type { UmrahPackage } from '../src/types/index.ts'

const base = { summary: '', images: [], itinerary: [], hotels: [], includes: [], excludes: [], documents: [], faqs: [] }
const list: UmrahPackage[] = [
  { ...base, slug: 'a', name: 'A', durationDays: 9, departureDate: '2027-02-10', price: 28_000_000 },
  { ...base, slug: 'b', name: 'B', durationDays: 12, departureDate: '2027-03-05', price: 35_000_000 },
  { ...base, slug: 'c', name: 'C', durationDays: 9 },
]

test('whatsapp url', () => {
  assert.equal(buildWaUrl(''), null)
  assert.equal(buildWaUrl('+62 812-3456'), 'https://wa.me/628123456')
  assert.equal(
    buildWaUrl('62812', packageWaMessage('Umrah & Turki')),
    'https://wa.me/62812?text=' + encodeURIComponent(packageWaMessage('Umrah & Turki')),
  )
})

test('filters', () => {
  assert.equal(filterPackages(list, EMPTY_FILTERS).length, 3)
  assert.deepEqual(filterPackages(list, { ...EMPTY_FILTERS, duration: '9' }).map((p) => p.slug), ['a', 'c'])
  assert.deepEqual(filterPackages(list, { ...EMPTY_FILTERS, month: '2027-03' }).map((p) => p.slug), ['b'])
  assert.deepEqual(filterPackages(list, { ...EMPTY_FILTERS, price: 'lt30' }).map((p) => p.slug), ['a'])
  assert.deepEqual(filterPackages(list, { month: '2027-02', duration: '12', price: '' }), [])
  const o = filterOptions(list)
  assert.deepEqual(o.months, ['2027-02', '2027-03'])
  assert.deepEqual(o.durations, [9, 12])
  assert.deepEqual(o.prices.map((r) => r.id), ['lt30', '30-40'])
})

import { validateConsultation } from '../src/lib/consultation.ts'

test('consultation validation', () => {
  const ok = { name: 'Ahmad', phone: '0812-3456-7890', packageName: 'X', departure: '', participants: '2', consent: true }
  assert.deepEqual(validateConsultation(ok), {})
  assert.deepEqual(validateConsultation({ ...ok, phone: '+6281234567' }), {})
  const bad = validateConsultation({ name: 'A', phone: '12345', packageName: '', departure: '', participants: '0', consent: false })
  assert.deepEqual(Object.keys(bad).sort(), ['consent', 'name', 'packageName', 'participants', 'phone'])
})

import { upcomingByPrice } from '../src/lib/filterPackages.ts'

test('upcoming packages sorted cheapest first', () => {
  const l = [
    { slug: 'mahal', price: 40, departureDate: '2027-01-01' },
    { slug: 'tanpa-harga' },
    { slug: 'lewat', price: 1, departureDate: '2026-01-01' },
    { slug: 'murah-akhir', price: 30, departureDate: '2027-03-01' },
    { slug: 'murah-awal', price: 30, departureDate: '2027-02-01' },
  ]
  assert.deepEqual(upcomingByPrice(l, '2026-10-23').map((p) => p.slug), ['murah-awal', 'murah-akhir', 'mahal', 'tanpa-harga'])
})

import { parseInline, parseMarkdown } from '../src/lib/markdown.ts'

test('markdown blocks and inline', () => {
  const md = 'Pembuka satu\nbaris dua\n\n## Judul\n\n### Sub\nIsi sub\n\n- a\n- b\n\n- c\n\n1. satu\n2. dua'
  assert.deepEqual(parseMarkdown(md), [
    { type: 'p', text: 'Pembuka satu baris dua' },
    { type: 'h2', text: 'Judul' },
    { type: 'h3', text: 'Sub' },
    { type: 'p', text: 'Isi sub' },
    { type: 'ul', items: ['a', 'b', 'c'] },
    { type: 'ol', items: ['satu', 'dua'] },
  ])
  assert.deepEqual(parseInline('ini **tebal** dan *miring* ke [Kemenag](https://kemenag.go.id).'), [
    { text: 'ini ' }, { text: 'tebal', bold: true }, { text: ' dan ' }, { text: 'miring', italic: true },
    { text: ' ke ' }, { text: 'Kemenag', href: 'https://kemenag.go.id' }, { text: '.' },
  ])
  // javascript: links are not turned into links
  assert.deepEqual(parseInline('[x](javascript:alert(1))'), [{ text: '[x](javascript:alert(1))' }])
})
