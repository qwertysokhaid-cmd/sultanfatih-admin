import faqData from '../content/faq.json' with { type: 'json' }
import type { Faq, GalleryItem } from '../types/index.ts'

// Sumber teks dan foto: Sultan Fatih Travel - Company Profile 2026.
const g = (file: string, alt: string): GalleryItem => ({ src: `/images/galeri/${file}`, alt, isOwnDocumentation: true })

// isOwnDocumentation: true hanya untuk dokumentasi asli perjalanan Sultan Fatih.
export const gallery: GalleryItem[] = [
  g('jamaah-pelataran-kabah-malam.jpg', "Jamaah Sultan Fatih di pelataran Ka'bah, Masjidil Haram, pada malam hari"),
  g('jamaah-ihram-pembimbing.jpg', 'Jamaah berihram bersama pembimbing Sultan Fatih'),
  g('jamaah-masjid-quba.jpg', 'Rombongan jamaah Sultan Fatih di depan masjid dengan menara putih'),
  g('rombongan-jamaah-wanita.jpg', 'Rombongan jamaah wanita Sultan Fatih berfoto bersama'),
  g('jamaah-wanita-dalam-masjid.jpg', 'Jamaah wanita Sultan Fatih di dalam masjid'),
  g('jamaah-matahari-terbit-makkah.jpg', 'Jamaah Sultan Fatih saat matahari terbit dengan latar menara jam Makkah'),
  g('haji-furoda-1.jpg', 'Jamaah Haji Furoda Sultan Fatih membentangkan spanduk'),
  g('haji-furoda-2.jpg', 'Rombongan jamaah Haji Furoda Sultan Fatih berihram'),
  g('jamaah-haji-tenda.jpg', 'Jamaah haji Sultan Fatih berihram di area perkemahan'),
  g('jamaah-umroh-super-promo.jpg', 'Rombongan jamaah Umroh Super Promo Sultan Fatih'),
  g('jamaah-umroh-turki.jpg', 'Rombongan jamaah Umroh Turki Sultan Fatih'),
  g('umroh-plus-turki-istanbul.jpg', 'Jamaah Umroh Plus Turki Sultan Fatih di Istanbul'),
  g('umroh-syawal-plus-cappadocia.jpg', 'Jamaah Umroh Syawal Plus Cappadocia Sultan Fatih di hamparan salju'),
  g('tur-cappadocia.jpg', 'Peserta tur Sultan Fatih di Cappadocia dengan balon udara'),
  g('umroh-plus-aqsha-petra.jpg', 'Jamaah Umroh Plus Aqsha Sultan Fatih di Petra, Yordania'),
  g('rombongan-dome-of-the-rock.jpg', 'Rombongan Sultan Fatih di depan Kubah Batu, Yerusalem'),
  g('wisata-halal-korea.jpg', 'Peserta wisata halal Korea Sultan Fatih di istana Seoul'),
  g('wisata-halal-kuala-lumpur.jpg', 'Peserta wisata halal Sultan Fatih di Menara Kembar Petronas, Kuala Lumpur'),
  g('jamaah-ziarah.jpg', 'Jamaah pria Sultan Fatih dalam perjalanan ziarah'),
  g('rombongan-jamaah-ziarah.jpg', 'Rombongan besar jamaah Sultan Fatih berfoto bersama saat ziarah'),
]

export { testimonials } from './testimonials.ts'

const office = (file: string, alt: string): GalleryItem => ({ src: `/images/kantor/${file}`, alt, isOwnDocumentation: true })

export const company = {
  summary: 'Promotor umroh dan haji bimbingan sunnah serta wisata halal dunia sejak 2017.',
  history: [
    'Sultan Fatih Tour and Travel berdiri sejak tahun 2017 dengan berbekal pengalaman dalam bidang Umroh dan Wisata Muslim sejak tahun 2012. Di tengah maraknya bisnis travel, kami berusaha selalu konsisten untuk menjadikan Umroh sebagai perjalanan spiritual dan mengedepankan ibadah dengan bimbingan sesuai tuntunan Rasulullah.',
    'Bekerja sama dengan para alumni dan mahasiswa Universitas Islam Madinah, kami ingin perjalanan umroh bukan hanya dijadikan sebagai wisata ke Tanah Suci. Umroh adalah sebuah rangkaian perjalanan yang di dalamnya terdapat aturan yang membuat sah atau batalnya ibadah tersebut.',
    'Kami menjadikan bimbingan ibadah itu sendiri sebagai tolak ukur berhasil atau tidaknya sebuah perjalanan umroh. Sebab jika tidak terpenuhi, maka tentu hal tersebut akan dipertanggungjawabkan di Akhirat.',
  ],
  visions: [
    'Membimbing jamaah sesuai dengan sunnah Rasulullah Shallallahu ‘alaihi wa sallam',
    'Memberikan bimbingan ibadah sesuai dengan syariat',
  ],
  missions: [
    'Memberikan fasilitas ibadah yang memuaskan',
    'Menjadikan jamaah sebagai amanah',
    'Mempererat tali persaudaraan antar muslim',
  ],
  commitments: ['Pasti Jadwalnya', 'Pasti Terbangnya', 'Pasti Hotelnya', 'Pasti Visanya', 'Pasti Pengurusan Sesuai Regulasi dan Legal'],
  facilities: [
    'Pembimbing ibadah dari alumni dan mahasiswa Universitas Islam Madinah (UIM) yang profesional, sabar, dan amanah, memberikan tuntunan ibadah sesuai sunnah.',
    'Berbagai pilihan paket umroh dengan pesawat Saudia Airlines, Qatar Airways, Turkish Airlines, Garuda Indonesia, dan Oman Air sesuai budget jamaah.',
    'Jarak hotel di Makkah dan Madinah yang dekat.',
    'Dua kali manasik bimbingan: di Indonesia dan di Madinah.',
    'Perwakilan dan agen yang tersebar di seluruh Indonesia dan Timur Tengah.',
    'Melayani umroh private: tentukan sendiri paket dan waktunya.',
    'Jamaah cuci darah tetap bisa umroh, dengan program yang ramah lansia.',
    'Tour leader yang selalu up to date mengenai sejarah dan semua yang berkaitan dengan tempat kunjungan, juga bahasa.',
  ],
  programs: ['Umroh Reguler', 'Umroh Plus Halal Tour', 'Umroh Ramadhan', 'Haji Plus & Furoda'],
  halalTour:
    'Akomodasi tour kami muslim friendly supaya semua peserta merasakan nyaman, aman, dan terjamin akomodasi halal selama perjalanan. Kami juga sangat memperhatikan waktu Shalat Fardhu peserta tour.',
  destinations: ['Saudi Arabia', 'Turki', 'Dubai', 'Abu Dhabi', 'Palestina (Al-Aqsha)', 'Yordania', 'Mesir', 'Korea', 'Jepang', 'Thailand'],
  team: [
    { name: 'M. Hanief Shubuhqi', role: 'CEO Sultan Fatih', photo: '/images/tim/hanief-shubuhqi.jpg' },
    { name: 'Astri Ummu Alfatih', role: 'Direktur Utama Sultan Fatih', photo: '/images/tim/astri-ummu-alfatih.jpg' },
  ],
  officePhotos: [
    office('kantor-tampak-depan.jpg', 'Tampak depan kantor Sultan Fatih di Ruko Cibubur City'),
    office('pintu-masuk-kantor.jpg', 'Pintu masuk kantor Sultan Fatih'),
    office('meja-resepsionis.jpg', 'Meja resepsionis kantor Sultan Fatih'),
    office('ruang-tamu.jpg', 'Ruang tamu dan konsultasi kantor Sultan Fatih'),
    office('ruang-kerja.jpg', 'Ruang kerja kantor Sultan Fatih'),
    office('ruang-mushala.jpg', 'Sudut mushala di kantor Sultan Fatih'),
  ],
}

// Tiga keunggulan utama menurut owner (wawancara). Bukti diambil dari brosur, company profile, dan ulasan Google asli.
// Harga termurah ditambahkan otomatis dari data paket di Home.
export const whyUs = [
  {
    icon: 'price',
    title: 'Harga Terjangkau',
    text: 'Fasilitas dan pendampingan tetap lengkap dengan harga yang ramah di kantong, sehingga lebih banyak keluarga bisa berangkat ke Tanah Suci.',
    points: ['DP mulai Rp5 juta', 'Pilihan maskapai sesuai budget jamaah'],
    quote: { text: 'Travel amanah..harga murah dengan fasilitas dan pelayanan jamaah sangat memuaskan', name: 'Erna Marlina' },
  },
  {
    icon: 'shield',
    title: 'Amanah & Sesuai Sunnah',
    text: 'Bimbingan ibadah mengikuti tuntunan Rasulullah, dibawakan pembimbing alumni dan mahasiswa Universitas Islam Madinah.',
    points: ['Berizin PPIU & PIHK Kemenag', 'Manasik 2 kali: di Indonesia dan Madinah'],
    quote: { text: 'Karena bimbingan umrohnya sesuai dengan Sunnah, Lalu Tour Leader nya sangat baik, bertanggung jawab dan sabar melayani Jamaah nya.', name: 'Syafriyeni daqu' },
  },
  {
    icon: 'heart',
    title: 'Ramah Lansia',
    text: 'Orang tua didampingi dengan sabar sejak manasik hingga kepulangan, dengan hotel yang dekat dari masjid agar ibadah tidak melelahkan.',
    points: ['Hotel dekat Masjid Nabawi & Masjidil Haram', 'Jamaah cuci darah tetap bisa umroh'],
    quote: { text: 'Umroh ramah lansia,,jgn ragu umrohin org tua dgn sultan Fatih travel.. Alhamdulillah memuaskan', name: 'Destry Ramadhan' },
  },
] as const

// Dikelola lewat panel admin (/admin) → src/content/faq.json.
export const generalFaqs: Faq[] = faqData.faq
