import { Link } from 'react-router-dom'
import { MosqueIcon } from '../components/icons.tsx'
import { Seo } from '../components/ui.tsx'

export default function NotFound() {
  return (
    <>
      <Seo title="Halaman Tidak Ditemukan" description="Halaman yang Anda cari tidak tersedia." />
      <meta name="robots" content="noindex" />
      <section className="container-x flex flex-col items-center py-28 text-center">
        <MosqueIcon width={48} height={48} className="text-primary" />
        <p className="eyebrow mt-6">404</p>
        <h1 className="mt-2 text-4xl sm:text-5xl">Halaman tidak ditemukan</h1>
        <p className="mt-4 max-w-md text-muted">Halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">Kembali ke Beranda</Link>
          <Link to="/paket-umrah" className="btn-outline">Lihat Paket Umrah</Link>
        </div>
      </section>
    </>
  )
}
