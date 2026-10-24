import { CtaBanner, GalleryGrid, PageHero } from '../components/blocks.tsx'
import { MosqueIcon } from '../components/icons.tsx'
import { Seo } from '../components/ui.tsx'
import VideoGallery from '../components/VideoGallery.tsx'
import { gallery } from '../data/content.ts'
import { docVideos } from '../data/videos.ts'

export default function Gallery() {
  const own = gallery.filter((g) => g.isOwnDocumentation)
  const other = gallery.filter((g) => !g.isOwnDocumentation)

  return (
    <>
      <Seo title="Galeri" description="Galeri dokumentasi perjalanan dan suasana ibadah di Makkah dan Madinah bersama Sultan Fatih Tour & Travel." />
      <PageHero eyebrow="Galeri" title="Galeri Perjalanan" desc="Dokumentasi perjalanan dan suasana ibadah di Tanah Suci." />
      <section className="container-x py-14">
        {gallery.length === 0 ? (
          <div className="card flex flex-col items-center px-6 py-16 text-center">
            <MosqueIcon width={40} height={40} className="text-primary" />
            <h2 className="mt-4 text-2xl">Dokumentasi segera hadir</h2>
            <p className="mt-2 max-w-md text-muted">Foto dokumentasi perjalanan jamaah Sultan Fatih sedang kami siapkan.</p>
          </div>
        ) : (
          <div className="space-y-14">
            {own.length > 0 && (
              <div>
                <h2 className="mb-6 text-3xl">Dokumentasi Jamaah Sultan Fatih</h2>
                <GalleryGrid items={own} />
              </div>
            )}
            {other.length > 0 && (
              <div>
                <h2 className="mb-2 text-3xl">Suasana Tanah Suci</h2>
                <p className="mb-6 text-sm text-muted">Foto ilustrasi berlisensi, bukan dokumentasi perjalanan Sultan Fatih.</p>
                <GalleryGrid items={other} />
              </div>
            )}
          </div>
        )}
      </section>
      {docVideos.length > 0 && (
        <section id="video" className="bg-lavender py-16">
          <div className="container-x">
            <h2 className="text-3xl">Video Dokumentasi</h2>
            <p className="mb-8 mt-2 text-muted">Video asli perjalanan jamaah Sultan Fatih. Ketuk untuk memutar dengan suara.</p>
            <VideoGallery items={docVideos} />
          </div>
        </section>
      )}
      <CtaBanner />
    </>
  )
}
