// Minimal Markdown for article bodies written in the admin panel: ## / ### headings, paragraphs,
// "- " and "1. " lists. Inline **bold**, *italic*, [link](url) are handled by the renderer.
// shortcut: no tables, quotes, or images inside the body; switch to a Markdown library if editors need them.
export type Block =
  | { type: 'h2' | 'h3' | 'p'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }

export function parseMarkdown(src: string): Block[] {
  const blocks: Block[] = []
  for (const chunk of src.replace(/\r\n/g, '\n').split(/\n\s*\n/)) {
    const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean)
    if (!lines.length) continue
    const heading = lines[0].match(/^(#{2,3})\s+(.*)$/)
    if (heading) {
      blocks.push({ type: heading[1] === '##' ? 'h2' : 'h3', text: heading[2] })
      if (lines.length > 1) blocks.push(...parseMarkdown(lines.slice(1).join('\n')))
    } else if (lines.every((l) => /^[-*]\s+/.test(l))) {
      blocks.push({ type: 'ul', items: lines.map((l) => l.replace(/^[-*]\s+/, '')) })
    } else if (lines.every((l) => /^\d+[.)]\s+/.test(l))) {
      blocks.push({ type: 'ol', items: lines.map((l) => l.replace(/^\d+[.)]\s+/, '')) })
    } else {
      blocks.push({ type: 'p', text: lines.join(' ') })
    }
  }
  // Merge consecutive list blocks the CMS may separate with blank lines.
  return blocks.reduce<Block[]>((acc, b) => {
    const last = acc[acc.length - 1]
    if (last && 'items' in last && 'items' in b && last.type === b.type) last.items.push(...b.items)
    else acc.push(b)
    return acc
  }, [])
}

export type Inline = { text: string; bold?: boolean; italic?: boolean; href?: string }

export function parseInline(text: string): Inline[] {
  const out: Inline[] = []
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|_(.+?)_|\[(.+?)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g
  let last = 0
  for (const m of text.matchAll(re)) {
    if (m.index > last) out.push({ text: text.slice(last, m.index) })
    if (m[1]) out.push({ text: m[1], bold: true })
    else if (m[2] || m[3]) out.push({ text: m[2] ?? m[3], italic: true })
    else out.push({ text: m[4], href: m[5] })
    last = m.index + m[0].length
  }
  if (last < text.length) out.push({ text: text.slice(last) })
  return out
}
