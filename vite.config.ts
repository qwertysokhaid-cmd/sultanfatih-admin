import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import { pageMeta } from './src/config/pages.ts'
import { site } from './src/config/site.ts'

type Route = { loc: string; title: string; description: string; image?: string; lastmod?: string }

const jsonFiles = (dir: string) =>
  readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => ({ slug: f.slice(0, -5), data: JSON.parse(readFileSync(`${dir}/${f}`, 'utf8')) }))

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function routes(): Route[] {
  const today = new Date().toISOString().slice(0, 10)
  // Same rule as the site: departed packages are hidden, so they are left out of the sitemap too.
  const paket = jsonFiles('src/content/paket').filter((p) => !p.data.departureDate || p.data.departureDate >= today)
  const artikel = jsonFiles('src/content/artikel').filter((a) => !a.data.draft)
  return [
    ...Object.entries(pageMeta).map(([loc, m]) => ({ loc, ...m })),
    ...paket.map((p) => ({ loc: `/paket-umrah/${p.slug}`, title: p.data.name || 'Paket', description: p.data.summary || '', image: p.data.images?.[0] })),
    ...artikel.map((a) => ({ loc: `/artikel/${a.slug}`, title: a.data.title, description: a.data.excerpt, image: a.data.thumbnail, lastmod: a.data.date })),
  ]
}

/** The <head> tags <Seo> would render for this route, plus og:image; main.tsx removes them once React takes over. */
function headTags(r: Route) {
  const title = `${r.title} | ${site.name}`
  const url = site.url + r.loc
  const image = r.image ? (r.image.startsWith('http') ? r.image : site.url + r.image) : `${site.url}${site.profileVideoPoster}`
  return [
    `<title data-static>${esc(title)}</title>`,
    `<link data-static rel="canonical" href="${esc(url)}" />`,
    `<meta data-static name="description" content="${esc(r.description)}" />`,
    `<meta data-static property="og:title" content="${esc(title)}" />`,
    `<meta data-static property="og:description" content="${esc(r.description)}" />`,
    `<meta data-static property="og:url" content="${esc(url)}" />`,
    `<meta data-static property="og:image" content="${esc(encodeURI(image))}" />`,
  ].join('\n    ')
}

/**
 * Writes sitemap.xml and robots.txt, and one HTML file per route (dist/seo/<route>.html, served by .htaccess)
 * whose <head> carries that page's own title, description, canonical and Open Graph.
 */
function seoFiles(): Plugin {
  const list = routes()
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${list
        .map((u) => `  <url><loc>${site.url}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
        .join('\n')}\n</urlset>\n`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nDisallow: /admin/\n\nSitemap: ${site.url}/sitemap.xml\n` })
    },
    writeBundle({ dir = 'dist' }) {
      const template = readFileSync(`${dir}/index.html`, 'utf8').replace(/\s*<(title|meta|link) data-static[^>]*>(?:[^<]*<\/title>)?/g, '')
      if (template.includes('data-static')) throw new Error('seo-files: a data-static tag in index.html was not stripped')
      for (const r of list) {
        const file = r.loc === '/' ? `${dir}/index.html` : `${dir}/seo${r.loc}.html`
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, template.replace('</head>', `  ${headTags(r)}\n  </head>`))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFiles()],
})
