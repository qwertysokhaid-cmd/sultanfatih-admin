import { Link } from 'react-router-dom'
import { parseInline, parseMarkdown } from '../lib/markdown.ts'

// Renders admin-written Markdown as React elements (never raw HTML), so article text cannot inject markup.
function Text({ text }: { text: string }) {
  return parseInline(text).map((t, i) => {
    if (t.href)
      return t.href.startsWith('/') ? (
        <Link key={i} to={t.href} className="font-medium text-primary underline underline-offset-4">{t.text}</Link>
      ) : (
        <a key={i} href={t.href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-4">{t.text}</a>
      )
    if (t.bold) return <strong key={i} className="font-semibold text-deep">{t.text}</strong>
    if (t.italic) return <em key={i}>{t.text}</em>
    return t.text
  })
}

export default function Markdown({ source }: { source: string }) {
  return (
    <div className="space-y-4 leading-relaxed text-ink/90">
      {parseMarkdown(source).map((b, i) => {
        if (!('items' in b)) {
          if (b.type === 'h2') return <h2 key={i} className="!mt-10 text-3xl text-deep">{b.text}</h2>
          if (b.type === 'h3') return <h3 key={i} className="!mt-7 border-l-2 border-primary/30 pl-4 text-2xl text-deep">{b.text}</h3>
          return <p key={i}><Text text={b.text} /></p>
        }
        const List = b.type === 'ul' ? 'ul' : 'ol'
        return (
          <List key={i} className={`space-y-1.5 pl-6 marker:text-primary ${b.type === 'ul' ? 'list-disc' : 'list-decimal'}`}>
            {b.items.map((item, j) => <li key={j}><Text text={item} /></li>)}
          </List>
        )
      })}
    </div>
  )
}
