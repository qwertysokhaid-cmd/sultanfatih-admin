import settings from '../content/pengaturan.json' with { type: 'json' }

// Identitas perusahaan (sumber: Company Profile 2026). Kontak, jam operasional, media sosial, dan rekening
// dikelola lewat panel admin (/admin) → src/content/pengaturan.json. Nilai kosong ('') = belum tersedia.
export const site = {
  name: 'Sultan Fatih Tour & Travel',
  description:
    'Promotor umroh dan haji bimbingan sunnah serta wisata halal dunia sejak 2017. Berizin PPIU dan PIHK, dengan pembimbing ibadah dari alumni dan mahasiswa Universitas Islam Madinah.',
  url: 'https://www.sultanfatihtravel.com',

  // whatsapp: format internasional tanpa tanda +, contoh '6281234567890'
  ...settings,

  legal: {
    companyName: 'PT Sultan Fatih Global Grup',
    ppiuLicense: '91202083923550002', // izin Penyelenggara Perjalanan Ibadah Umrah
    pihkLicense: '91202083923550004', // izin Penyelenggara Ibadah Haji Khusus
  },

  logo: '/images/logo/logo-horizontal.png',
  logoWhite: '/images/logo/logo-horizontal-putih.png',

  // Dikompres dari 'Sultan Fatih Travel.mp4 (Rev 2)': 720p/30fps, audio AAC stereo 128 kbps tetap utuh.
  profileVideo: '/videos/company-profile.mp4',
  profileVideoPoster: '/images/company-profile-poster.jpg',
}

export type SocialKey = keyof typeof site.social
