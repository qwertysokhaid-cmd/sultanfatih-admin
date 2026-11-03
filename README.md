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

Deploy: Cloudflare Pages membangun (`npm run build` → `dist`) setiap push ke `main`. Tiap halaman punya file HTML sendiri (`dist/<route>.html`); alamat lain jatuh ke `index.html` (React Router).
