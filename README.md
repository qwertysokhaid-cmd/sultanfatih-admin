# Sultan Fatih Tour & Travel

React + Vite + TypeScript + Tailwind CSS v4 + React Router.

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # unit test helper WhatsApp, filter, validasi form
npm run build    # output ke dist/
```

## Panel admin
Isi website (paket, artikel, testimoni, FAQ, kontak) diedit lewat **/admin** tanpa kode.
Data tersimpan di `src/content/`. Panduan lengkap untuk tim: [PANDUAN-ADMIN.md](PANDUAN-ADMIN.md).

Deploy: setiap push ke `main` dibangun & diunggah ke hosting cPanel lewat FTP oleh GitHub Actions (`.github/workflows/deploy.yml`). Aturan halaman Apache ada di `public/.htaccess`.
