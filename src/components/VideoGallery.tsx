import { useEffect, useRef, useState } from 'react'
import { VIDEO_TAGS } from '../data/videos.ts'
import { formatMonth } from '../lib/format.ts'
import type { DocVideo } from '../types/index.ts'
import { CloseIcon, PlayIcon } from './icons.tsx'

const PAGE = 12
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

/** Filterable grid of documentation clips; each opens in a dialog and plays with sound (started by the click). */
export default function VideoGallery({ items }: { items: DocVideo[] }) {
  const [tag, setTag] = useState<string>('Semua')
  const [limit, setLimit] = useState(PAGE)
  const [current, setCurrent] = useState<DocVideo | null>(null)
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (current && !ref.current?.open) ref.current?.showModal()
  }, [current])

  const tags = ['Semua', ...VIDEO_TAGS.filter((t) => items.some((v) => v.tag === t))]
  const list = tag === 'Semua' ? items : items.filter((v) => v.tag === tag)

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter video">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={tag === t}
            onClick={() => { setTag(t); setLimit(PAGE) }}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${tag === t ? 'bg-primary text-white shadow-[0_6px_16px_rgba(126,28,186,0.3)]' : 'bg-white text-deep ring-1 ring-primary/20 hover:bg-lavender'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {list.slice(0, limit).map((v) => (
          <li key={v.id}>
            <button type="button" onClick={() => setCurrent(v)} className="group block w-full text-left" aria-label={`Putar video: ${v.title}`}>
              <span className="relative block overflow-hidden rounded-xl bg-deep">
                <img src={`/images/dokumentasi/${v.id}.jpg`} alt="" loading="lazy" decoding="async" className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-transparent" aria-hidden />
                <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary shadow-lg transition-transform group-hover:scale-110" aria-hidden>
                  <PlayIcon width={22} height={22} className="ml-0.5" />
                </span>
                <span className="absolute right-2 top-2 rounded-full bg-deep/70 px-2 py-0.5 text-[11px] font-semibold text-white">{mmss(v.duration)}</span>
                <span className="absolute inset-x-0 bottom-0 p-3 text-white">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/75">{v.tag} · {formatMonth(v.date.slice(0, 7))}</span>
                  <span className="mt-0.5 line-clamp-2 block text-sm font-semibold leading-snug">{v.title}</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {list.length > limit && (
        <div className="mt-8 text-center">
          <button type="button" className="btn-outline bg-white" onClick={() => setLimit((l) => l + PAGE)}>
            Tampilkan lebih banyak
          </button>
        </div>
      )}

      <dialog
        ref={ref}
        onClose={() => setCurrent(null)}
        onClick={(e) => e.target === ref.current && ref.current.close()}
        className="m-auto max-h-[94vh] max-w-[min(94vw,960px)] bg-transparent p-0 backdrop:bg-deep/90"
        aria-label="Pemutar video dokumentasi"
      >
        {current && (
          <figure className="relative">
            <video
              key={current.id}
              src={`/videos/dokumentasi/${current.id}.mp4`}
              poster={`/images/dokumentasi/${current.id}.jpg`}
              controls
              autoPlay
              playsInline
              className={`mx-auto rounded-lg bg-black ${current.portrait ? 'max-h-[82vh] w-auto' : 'max-h-[82vh] w-full'}`}
            />
            <figcaption className="mt-3 text-center text-sm text-white">{current.title} · {formatMonth(current.date.slice(0, 7))}</figcaption>
            <button type="button" onClick={() => ref.current?.close()} className="absolute right-2 top-2 rounded-full bg-white/90 p-2 text-deep" aria-label="Tutup video">
              <CloseIcon />
            </button>
          </figure>
        )}
      </dialog>
    </>
  )
}
