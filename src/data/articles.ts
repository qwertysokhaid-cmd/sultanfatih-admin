import type { Article } from '../types/index.ts'

// Artikel dikelola lewat panel admin (/admin) → satu file JSON per artikel di src/content/artikel/.
// Nama file = alamat halaman artikel. Artikel bertanda draft tidak ditampilkan.
const files = import.meta.glob<Omit<Article, 'slug'>>('../content/artikel/*.json', { eager: true, import: 'default' })

export const articles: Article[] = Object.entries(files)
  .map(([path, a]) => ({ ...a, slug: path.split('/').pop()!.replace(/\.json$/, ''), references: a.references ?? [] }))
  .filter((a) => !a.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug)
export const latestArticles = articles.slice(0, 3)
