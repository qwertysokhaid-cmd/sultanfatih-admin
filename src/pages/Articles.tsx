import { Link, useParams } from 'react-router-dom'
import { ArticleCard, CtaBanner, PageHero } from '../components/blocks.tsx'
import Markdown from '../components/Markdown.tsx'
import { Img, Seo } from '../components/ui.tsx'
import { articles, getArticle } from '../data/articles.ts'
import { formatDate } from '../lib/format.ts'
import NotFound from './NotFound.tsx'

export function Articles() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <>
      <Seo title="Artikel" description="Artikel edukasi seputar persiapan, manasik, dan tips perjalanan Umrah dari Sultan Fatih Tour & Travel." />
      <PageHero eyebrow="Artikel" title="Artikel Edukasi Umrah" desc="Bekal pengetahuan untuk mempersiapkan perjalanan ibadah dengan lebih tenang." />
      <section className="container-x py-14">
        {sorted.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{sorted.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
        ) : (
          <p className="card px-6 py-16 text-center text-muted">Belum ada artikel yang diterbitkan.</p>
        )}
      </section>
    </>
  )
}

export function ArticleDetail() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  if (!article) return <NotFound />

  return (
    <>
      <Seo title={article.title} description={article.excerpt} />
      <article className="container-x max-w-3xl py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <Link to="/" className="hover:text-primary">Beranda</Link> / <Link to="/artikel" className="hover:text-primary">Artikel</Link>
        </nav>
        <header>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <span className="font-semibold text-primary">{article.category}</span>
            <span aria-hidden>·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
          </div>
          <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{article.title}</h1>
          <p className="mt-4 text-lg text-muted">{article.excerpt}</p>
        </header>
        <Img src={article.thumbnail} alt={article.title} eager className="mt-8 aspect-[16/9] w-full rounded-xl" />
        <div className="mt-10">
          <Markdown source={article.body} />
        </div>
        {article.references && article.references.length > 0 && (
          <aside className="mt-12 rounded-xl bg-lavender p-6">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-deep">Referensi</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted marker:text-primary">{article.references.map((r) => <li key={r}>{r}</li>)}</ul>
            <p className="mt-4 text-xs text-muted">Ketentuan dokumen, visa, dan kesehatan dapat berubah. Konfirmasi informasi terbaru kepada tim Sultan Fatih sebelum berangkat.</p>
          </aside>
        )}
      </article>
      <CtaBanner title="Ada Pertanyaan Seputar Umrah?" text="Tim Sultan Fatih siap membantu menjawab pertanyaan Anda tentang persiapan dan pilihan paket." />
    </>
  )
}
