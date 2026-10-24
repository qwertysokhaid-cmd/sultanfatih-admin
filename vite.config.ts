import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { readdirSync, readFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import { site } from './src/config/site.ts'

const pages = ['/', '/paket-umrah', '/tentang-kami', '/galeri', '/artikel', '/kontak', '/kebijakan-privasi']

const jsonFiles = (dir: string) =>
  readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => ({ slug: f.slice(0, -5), data: JSON.parse(readFileSync(`${dir}/${f}`, 'utf8')) }))

/** Writes sitemap.xml and robots.txt into the build, listing current packages and published articles. */
function seoFiles(): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      // Same rule as the site: departed packages are hidden, so they are left out of the sitemap too.
      const paket = jsonFiles('src/content/paket').filter((p) => !p.data.departureDate || p.data.departureDate >= today)
      const artikel = jsonFiles('src/content/artikel').filter((a) => !a.data.draft)
      const urls: { loc: string; lastmod?: string }[] = [
        ...pages.map((p) => ({ loc: p })),
        ...paket.map((p) => ({ loc: `/paket-umrah/${p.slug}` })),
        ...artikel.map((a) => ({ loc: `/artikel/${a.slug}`, lastmod: a.data.date as string })),
      ]
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
        .map((u) => `  <url><loc>${site.url}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
        .join('\n')}\n</urlset>\n`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nDisallow: /admin/\n\nSitemap: ${site.url}/sitemap.xml\n` })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFiles()],
})
