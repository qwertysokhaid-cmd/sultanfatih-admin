import { PageHero } from '../components/blocks.tsx'
import { Placeholder, Seo } from '../components/ui.tsx'
import { site } from '../config/site.ts'

export default function Privacy() {
  return (
    <>
      <Seo title="Kebijakan Privasi" description={`Kebijakan privasi ${site.name} terkait penggunaan data calon jamaah.`} />
      <PageHero eyebrow="Legal" title="Kebijakan Privasi" desc="Bagaimana kami menggunakan data yang Anda berikan." />
      <section className="container-x max-w-3xl space-y-4 py-14 leading-relaxed text-ink/90">
        <p>Data yang Anda sampaikan melalui formulir atau WhatsApp (nama, nomor WhatsApp, paket yang diminati, perkiraan keberangkatan, dan jumlah peserta) digunakan untuk keperluan konsultasi perjalanan Umrah.</p>
        <p><Placeholder>Isi kebijakan privasi resmi: penyimpanan data, jangka waktu, pihak ketiga, hak pengguna, dan kontak pengelola data. Tinjau bersama penasihat hukum.</Placeholder></p>
      </section>
    </>
  )
}
