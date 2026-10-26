import { site } from './site.ts'

// Title & description per halaman tetap. Dipakai <Seo> di tiap halaman dan oleh vite.config.ts
// untuk menulis HTML per halaman (bagi crawler/preview link yang tidak menjalankan JavaScript).
export const pageMeta = {
  '/': { title: 'Paket Umrah dan Konsultasi Jamaah', description: site.description },
  '/paket-umrah': {
    title: 'Paket Umrah',
    description: 'Katalog paket Umrah Sultan Fatih Tour & Travel. Bandingkan durasi, jadwal keberangkatan, dan fasilitas, lalu konsultasikan pilihan Anda.',
  },
  '/tentang-kami': {
    title: 'Tentang Kami',
    description: `Profil ${site.name}: sejarah sejak 2017, visi dan misi, fasilitas, program haji dan umroh, legalitas PPIU dan PIHK, serta tim.`,
  },
  '/galeri': {
    title: 'Galeri',
    description: 'Galeri dokumentasi perjalanan dan suasana ibadah di Makkah dan Madinah bersama Sultan Fatih Tour & Travel.',
  },
  '/artikel': {
    title: 'Artikel',
    description: 'Artikel edukasi seputar persiapan, manasik, dan tips perjalanan Umrah dari Sultan Fatih Tour & Travel.',
  },
  '/kontak': {
    title: 'Kontak dan Konsultasi',
    description: 'Hubungi Sultan Fatih Tour & Travel untuk konsultasi paket Umrah melalui WhatsApp, email, atau kunjungi kantor kami.',
  },
  '/kebijakan-privasi': { title: 'Kebijakan Privasi', description: `Kebijakan privasi ${site.name} terkait penggunaan data calon jamaah.` },
}
