# Panduan Panel Admin Sultan Fatih

Panel admin dipakai untuk mengubah isi website **tanpa menyentuh kode**.
Alamatnya: **sultanfatihtravelpage.com/admin**

Setelah Anda menekan **Publish**, website diperbarui otomatis dalam **±2–3 menit**.

---

## Yang bisa diubah dari panel admin

| Menu | Isinya |
|---|---|
| **Paket Umroh & Wisata** | Tambah paket baru, ubah harga/tanggal/hotel, unggah foto & brosur |
| **Artikel** | Tulis artikel baru, ubah artikel lama, simpan sebagai draft |
| **Testimoni, FAQ & Kontak** | Ulasan jamaah, pertanyaan umum, nomor WhatsApp, email, alamat, jam operasional, media sosial, rekening |

Yang **tidak** diubah dari panel (minta bantuan developer): foto/video galeri, video company profile, logo, izin PPIU/PIHK, dan tampilan halaman.

---

## Cara masuk

1. Buka **sultanfatihtravelpage.com/admin**
2. Klik **Sign In Using Access Token**
3. Tempel kode token GitHub yang diberikan developer (cukup sekali, browser akan mengingatnya)

> Token itu seperti kunci rumah. Jangan dibagikan di grup WhatsApp atau ditulis di tempat umum.

---

## Tugas sehari-hari

### Menambah paket baru
1. Buka menu **Paket Umroh & Wisata**
2. Cara paling cepat: buka paket lama yang mirip → klik menu **⋯** → **Duplicate**
3. Ubah **Nama paket**, **Tanggal keberangkatan**, **Harga**, hotel, dan lainnya
4. Klik **Publish**

**Penting:**
- **Harga** ditulis angka saja tanpa titik. Contoh: `29900000` (bukan 29.900.000)
- Paket otomatis **diurutkan dari yang termurah**
- Paket yang **tanggal berangkatnya sudah lewat otomatis hilang** dari website. Tidak perlu dihapus
- Foto pertama di **Foto paket** dipakai sebagai sampul kartu paket

### Mengubah harga atau tanggal
Buka paketnya → ubah angkanya → **Publish**.

### Mengunggah brosur
Buka paket → bagian **Brosur** → **Add** → pilih gambar dari komputer → **Publish**.

### Menulis artikel
1. Buka menu **Artikel** → **New Artikel**
2. Isi **Judul**, **Kategori**, **Tanggal**, **Foto sampul**, **Ringkasan**
3. Tulis **Isi artikel**. Gunakan tombol:
   - **H2 / H3** untuk subjudul
   - **• daftar** atau **1. daftar** untuk poin-poin
   - **B** untuk huruf tebal, **I** untuk miring, **🔗** untuk link
4. Belum siap tampil? Centang **Simpan sebagai draft**
5. Klik **Publish**

Tiga artikel dengan tanggal terbaru otomatis tampil di beranda.

### Menambah testimoni
Menu **Testimoni, FAQ & Kontak** → **Testimoni Jamaah** → **Add** → isi nama & ulasan → **Publish**.
Gunakan hanya ulasan asli dari jamaah.

### Mengubah nomor WhatsApp, email, jam operasional, atau rekening
Menu **Testimoni, FAQ & Kontak** → **Kontak, Jam Operasional & Rekening**.
- Nomor WhatsApp diawali **62**, tanpa tanda + dan tanpa 0. Contoh: `6282134506616`
- Semua tombol WhatsApp di website ikut berubah otomatis.

---

## Kalau ada masalah

- **Perubahan belum muncul?** Tunggu 2 menit, lalu muat ulang halaman (tekan F5).
- **Salah ubah?** Semua riwayat perubahan tersimpan di GitHub, developer bisa mengembalikan versi sebelumnya.
- **Lupa token / tidak bisa masuk?** Hubungi developer untuk membuat token baru.

---

## Untuk developer: pemasangan awal (sekali saja)

Website di-hosting di **Cloudflare Pages** (gratis). GitHub menyimpan isi website; setiap ada perubahan
di branch `main` (termasuk dari panel /admin), Cloudflare otomatis membangun & menayangkan website (±1–3 menit).

1. Buat repository di GitHub, lalu unggah folder proyek ini (branch `main`).
2. Di Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, pilih repository ini.
   Framework preset **None**, build command `npm run build`, output directory `dist` (versi Node diambil dari `.node-version`).
3. Domain: **Custom domains → Set up a custom domain**. Batas Cloudflare Pages: tiap file maksimal 25 MB.
4. Ubah baris `repo:` di `public/admin/config.yml` menjadi `username/nama-repo`.
5. Buat token untuk tim di GitHub: **Settings → Developer settings → Fine-grained tokens**,
   pilih hanya repository ini, izin **Contents: Read and write**. Berikan token ke admin.
6. Isi yang bisa diedit tersimpan di `src/content/` (JSON); foto unggahan admin masuk ke `public/images/uploads/`.
