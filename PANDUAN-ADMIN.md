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

Website di-hosting di **hosting berbayar (cPanel)**. GitHub menyimpan isi website dan, lewat
GitHub Actions, otomatis membangun & mengunggah website ke hosting setiap ada perubahan.

1. Buat repository **privat** di GitHub, lalu unggah folder proyek ini (branch `main`).
2. Di repository: **Settings → Secrets and variables → Actions → New repository secret**, isi:
   - `FTP_SERVER` (contoh `ftp.sultanfatihtravelpage.com`)
   - `FTP_USERNAME` dan `FTP_PASSWORD` (dari cPanel → FTP Accounts)
   - opsional `FTP_SERVER_DIR` (bawaan `public_html/`) dan `FTP_PROTOCOL` (bawaan `ftps`; isi `ftp` jika hosting tidak mendukung FTPS)
3. Buka tab **Actions** → **Deploy ke hosting** → **Run workflow**. Unggahan pertama memakan waktu
   lebih lama karena video (±240 MB); berikutnya hanya file yang berubah.
4. Ubah baris `repo:` di `public/admin/config.yml` menjadi `username/nama-repo`.
5. Buat token untuk tim di GitHub: **Settings → Developer settings → Fine-grained tokens**,
   pilih hanya repository ini, izin **Contents: Read and write**. Berikan token ke admin.
6. Aturan halaman untuk Apache/LiteSpeed ada di `public/.htaccess` (ikut terunggah otomatis).
   Isi yang bisa diedit tersimpan di `src/content/` (JSON); foto unggahan admin masuk ke `public/images/uploads/`.
