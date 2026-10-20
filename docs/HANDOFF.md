# InvestaLearning (versi baru): dokumen serah terima

Dokumen ini merangkum kondisi project per **15 Oktober 2026** supaya developer atau AI berikutnya bisa langsung melanjutkan. Baca seluruhnya sebelum mengubah kode, terutama bagian **Preferensi pemilik project** dan **Jebakan teknis**.

---

## 1. Tentang project

- **Apa:** website baru untuk **InvestaLearning**, platform persiapan **Ujian Standar Profesi Pasar Modal** (WAPERD, WPPE, WPPE-P, WPPE-PT, WMI, WPEE, AAJI). Fitur intinya: latihan soal, TryOut dengan waktu nyata (maks. 3x per paket), analisis hasil per topik, materi, pelatihan online/Zoom/inhouse.
- **Pemilik:** PT. Biner Investa Berkembang (Investa Group). Kontak: info@investalearning.com, analyst@investalearning.com, WA 0815-1962-9804, alamat Jl. Tentara Pelajar, Rukan Permata Senayan Blok E56-57, Jakarta Selatan.
- **Menggantikan:** situs lama https://investaprima.com/ (Laravel 7, kode di `C:\laragon\www\InvestaLearning`). Situs lama terlihat seperti portal berita; versi baru fokus ke pembelajaran.
- **Bahasa UI:** Bahasa Indonesia (`APP_LOCALE=id`, `APP_NAME=InvestaLearning`).

## 2. Stack dan perintah

- Laravel 13, PHP 8.3, SQLite. Inertia v3 + React 19 (TypeScript, React Compiler), Tailwind CSS v4, Laravel Wayfinder, Vite 8 lewat `vite-plus` (perintah `vp`). Font Plus Jakarta Sans (via `bunny()` di `vite.config.ts`).
- Starter kit awal: `laravel/blank-react-starter-kit`. **Belum ada** auth, database bisnis, atau model selain `User` bawaan.

| Perintah | Fungsi |
|---|---|
| `composer dev` | Jalankan server + Vite dev (`php artisan dev`). Pemilik menjalankan ini sendiri di `http://localhost:8000`. |
| `npm run build` | Build aset produksi ke `public/build`. |
| `npm run check:fix` | Lint + format (oxlint/oxfmt lewat `vp`), termasuk urutan class Tailwind. |
| `npm run types:check` | `tsc --noEmit`. |
| `composer test` | Pint (cek), PHPStan, lalu Pest. Saat ini 59 test lolos. |
| `php artisan wayfinder:generate --no-interaction` | Regenerasi helper route TS di `resources/js/routes` dan `resources/js/actions` setelah mengubah `routes/web.php`. |

Skill/aturan agen ada di `.claude/skills` dan `.agents/skills` (isinya identik, dari Laravel Boost): Laravel best practices, Inertia React, Wayfinder, Tailwind v4, Pest.

## 3. Sistem desain

Semua warna adalah token di `resources/css/app.css` (`@theme`). **Selalu pakai token, jangan hex langsung di komponen.**

| Token | Nilai | Dipakai untuk |
|---|---|---|
| `brand` / `brand-hover` | `#4F46E5` / `#4338CA` | Semua tombol utama, tab aktif, link, grafik |
| `brand-soft` | `#EEF2FF` | Latar lembut: nomor langkah, ikon, kartu panel |
| `ink` | `#0F172A` | Teks utama, banner gelap |
| `canvas` | `#FAFAFE` | Latar halaman |
| `line` | `#E2E8F0` | Garis tepi kartu/section |

Juga: `shadow-soft`, `shadow-floating`, animasi `animate-float`, `animate-fade-in`, `animate-slide-in` (semua menghormati `motion-reduce`), utilitas `no-scrollbar`.

Palet ini diambil dari referensi Stitch "Luminous EdTech" yang dipilih pemilik (hanya warnanya). Logo: ikon saja di `public/images/logo-mark.svg` (dipotong dari logo lama), selalu ditampilkan di samping teks "InvestaLearning".

## 4. Preferensi pemilik project (penting)

Ini hasil diskusi panjang; jangan dilanggar tanpa bertanya.

1. **Tanpa gradient** dan **tanpa badge/pill "eyebrow"** di atas judul. Pemilik menilai keduanya "kelihatan AI". Pakai warna datar.
2. **Tanpa konten berita** di mana pun (situs publik maupun admin).
3. **Isi halaman publik (About Us, Service, FAQ, Our Team, Contact Us, Glossary) disalin verbatim dari situs lama**, hanya desainnya yang baru. Jangan menulis ulang atau mengarang isi.
4. **Jangan mengarang angka, testimoni, atau data asli.** Angka ilustrasi harus ditandai (contoh: kartu "Analisis per topik" diberi label "Contoh hasil").
5. Pemilik menolak palet coral/biru dan lime; palet indigo sekarang sudah disetujui.
6. Pemilik ingin melihat hasil di browser; selalu cek tampilan desktop (1440px) dan HP (375px) sebelum menyatakan selesai.

## 5. Halaman dan route

Semua route ada di `routes/web.php`. Helper TS dari Wayfinder: `@/routes` (publik), `@/routes/admin`, `@/routes/password`.

### Situs publik (layout `resources/js/layouts/public-layout.tsx`)

| URL | Nama route | Komponen | Catatan |
|---|---|---|---|
| `/` | `home` | `pages/welcome.tsx` | Landing: Hero, Metrics, Program, Cara Belajar, Layanan, Tentang Kami, FAQ, CTA |
| `/faq` | `faq` | `pages/faq.tsx` | 8 FAQ verbatim situs lama |
| `/glossary` | `glossary` | `pages/glossary.tsx` via `GlossaryController` | 209 istilah dari `resources/data/glossary.json` |
| `/contact-us` | `contact` | `pages/contact-us.tsx` | |
| `/service` | `service` | `pages/service.tsx` | |
| `/about-us` | `about` | `pages/about-us.tsx` | |
| `/our-team` | `team` | `pages/our-team.tsx` | Foto pelatihan asli di `public/images/team/` |

- Navbar (`components/landing/site-header.tsx`) mengikuti urutan menu situs lama: Home, FAQ, Glossary (dropdown A–E … U–Z), Contact Us, Service, About Us, Our Team, plus Masuk/Daftar. Navbar **sticky** dan berubah jadi kapsul mengambang setelah scroll >24px (tinggi total tetap 80px agar halaman tidak meloncat). Menu desktop muncul mulai `xl`; di bawahnya ada menu hamburger.
- Komponen landing ada di `resources/js/components/landing/`. Halaman sederhana memakai `components/page-hero.tsx` + `components/page-content.tsx`.
- Glossary menampilkan **satu huruf per kali** (default A), kartu dua kolom, pencarian lintas semua huruf. Huruf dipilih lewat hash `#huruf-X` (dipakai juga oleh dropdown header).

### Masuk / Daftar / Lupa Password (layout `layouts/auth-layout.tsx`)

| URL | Nama route | Prop `tab` |
|---|---|---|
| `/login` | `login` | `login` |
| `/register` | `register` | `register` |
| `/forgot-password` | `password.request` | `forgot` |

- Ketiganya merender **satu komponen** `pages/auth.tsx`. Perpindahan form dilakukan di sisi klien dengan `router.push()` Inertia (tanpa request ke server, URL tetap berubah, tombol back berfungsi), dengan animasi garis bawah tab, slide-in form, dan tinggi kartu yang beranimasi (`AnimatedHeight`).
- Panel kanan: animasi pratinjau fitur `components/auth/feature-preview.tsx` (timer TryOut, skor naik tiap percobaan; data ilustrasi).
- Isian form mengikuti situs lama:
  - **Masuk:** User ID, Password, Ingat saya.
  - **Daftar** ("Daftar Peserta Baru"): Data Pribadi (Nama Lengkap, Jenis Kelamin Pria/Wanita, Tanggal Lahir, Institusi, Alamat, No. Telepon, E-Mail, Jenis Ujian, Paket) dan Data Login (User ID, Password ID, Re-Password ID, dengan pesan "Data Password tidak sama dengan Re-password").
  - **Lupa password:** Email, User ID.
- **Status: desain saja.** Semua `onSubmit` memanggil `preventSubmit`; belum ada backend. reCAPTCHA situs lama belum dibawa.

### Panel admin (layout `layouts/admin-layout.tsx`)

Login admin tersedia di `/adminTryOut` dengan panel visual yang memakai `auth-layout.tsx`. Login memakai **User ID + password akun admin di backend API** (lihat bagian 6a), bukan tabel `users` lokal. Hasil login disimpan di `session('admin')` (`id`, `name`, `access`) dan dibagikan ke Inertia sebagai prop `admin`. Route `/admin/*` dilindungi middleware `admin` (`EnsureUserIsAdmin`, cek session); logout tersedia di header. Login peserta `/login` masih desain saja.

| URL | Nama route | Komponen |
|---|---|---|
| `/admin` | `admin.dashboard` | `pages/admin/dashboard.tsx` via `Admin\DashboardController` |
| `/admin/<slug>` (satu route per menu, mis. `/admin/data-peserta`) | `admin.<slug>` | `pages/admin/<area>/<slug>.tsx` |

- Desain dari template Stitch "Mediso" (sidebar putih + submenu bertingkat, top bar sticky, kartu putih), diwarnai ulang dengan token proyek.
- Menu diadaptasi dari admin lama (`/adminTryOut` = login admin lama; panel lama di `/admin/*`, menu di `C:\laragon\www\InvestaLearning\resources\views\Admin\Home\index.blade.php`), **tanpa menu Berita**. Konfigurasi menu: `components/admin/admin-nav.ts` (seksi → grup → item `{ label, href }`, `href` dari helper Wayfinder `admin.<slugCamelCase>.url()`).
- **Satu file per halaman** di `resources/js/pages/admin/<area>/`, dikelompokkan sesuai grup sidebar: `peserta/`, `pelajaran/`, `bank-soal/`, `hasil-ujian/`, `koordinator/`, `informasi/`, `sertifikat/`, `pengaturan/`, plus `buku-tamu.tsx`, `dashboard.tsx`, dan `api-unavailable.tsx`. Setiap halaman jadi chunk JS sendiri.
- **Controller per area** di `app/Http/Controllers/Admin/`: `DashboardController`, `PesertaController`, `PelajaranController`, `SoalController`, `HasilController`, `KontenController`, `SertifikatController`, `SistemController`. Halaman tanpa data (Tambah Soal, Upload Excel, 3 menu Koordinator) memakai `Route::inertia`. Slug yang tidak terdaftar → 404.
- **Semua data dari API (tahap 1, hanya baca).** Setiap controller memetakan baris API ke field yang ditampilkan saja. Password (`password`, `passg`), kode verifikasi, alamat, email, dan telepon peserta **tidak pernah** dikirim ke browser (dicek di test).
- **Tabel di-paging di server.** Prop `table` = `{rows, meta: {page, lastPage, total, perPage, from}, query}` dibuat oleh `app/Support/AdminTable.php`: `fromPaged()` untuk endpoint yang sudah berhalaman (mis. hasil ujian, 30/halaman), `fromCollection()` untuk endpoint yang mengirim semua baris sekaligus (peserta 3.900+ baris, sertifikat 2.100+ baris) dengan cari (`?q=`), filter, dan paging di Laravel. `components/admin/data-table.tsx` meminta halaman/filter/pencarian berikutnya lewat `router.get(..., { only: ['table'] })`.
- **Data bersama:** `app/Services/InvestaLookups.php` (jenis ujian, kelas, pelajaran; cache 1 jam), `app/Services/InvestaDirectory.php` (daftar peserta yang sudah disaring field-nya; cache 60 detik), `app/Support/ApiFormat.php` (teks soal HTML → teks biasa, tanggal, URL file situs lama).
- **Gambar/file** (background, logo, TTD, slide, materi) ada di server situs lama: `INVESTA_ASSET_URL=https://investaprima.com/public/` + folder lama (`assets/logo/`, `assets/materi/`, dst.).
- **Endpoint lambat** dimuat sesudah halaman (deferred props): ringkasan dashboard (dua grup paralel) dan statistik bulanan/harian Visitor (10+ detik di backend, timeout 30 detik, cache 5 menit).
- **Materi Topik, Materi Topik Detail, Summary Hasil Peserta**: admin lama tidak punya data API untuk ini, hanya link ke laporan Excel di server lama (`INVESTA_LEGACY_REPORT_URL`). Halaman baru menampilkan tombol ke laporan yang sama.
- **Soal Latihan/Tryout** baru tampil setelah pelajaran, jenis ujian, dan kelas dipilih (backend butuh ketiganya). **Laporan Tryout** memakai daftar paket milik admin yang login (`session('admin.id')`), seperti admin lama.
- **Statistik viewer** (`admin/statistic/viewer_*`) mengembalikan halaman error dari backend, jadi Visitor hanya menampilkan akses per bagian.
- Komponen bersama: `components/admin/data-table.tsx` (tabel server, `TableFooter`, `StatusToggle`, `RowActions`), `gallery.tsx`, `downloads-table.tsx`, `subject-detail-table.tsx`, `package-questions.tsx`, `legacy-report.tsx`, `cells.tsx`, `dashboard/*`, `ui.tsx` (`Card`, `Button`, `Badge`, `Toggle`, `StatTile`, `RemoteImage`, `FormField`, `demoToast`), `types.ts`, `icon.tsx`.
- **Aksi tulis belum tersambung (tahap 2):** Simpan, Ubah, Hapus, Upload, Ekspor hanya menampilkan toast "Belum tersambung"; toggle status berubah lokal saja. Endpoint tulisnya ada di controller admin lama. Jangan uji aksi tulis ke API produksi; pakai `Http::fake`.
- Kalau API tidak bisa dihubungi, halaman admin menampilkan `pages/admin/api-unavailable.tsx` (status 503) di dalam layout admin (`bootstrap/app.php`).
- **Hak akses per role belum dibedakan**: nilai `access` dari API disimpan, tapi semua admin melihat menu yang sama.

## 6. Data

- `resources/data/glossary.json`: 209 istilah hasil scraping halaman Glossary situs lama (`/berita/31`, `32`, `33`, `34`, `36`), duplikat sudah digabung.
- `public/images/team/*.jpeg`: 4 foto pelatihan WAPERD (Bank Sinarmas 2020, Bank Mega 2019) dari situs lama.
- Foto di landing (hero, strip foto di "Tentang Kami") masih **hotlink** ke `lh3.googleusercontent.com` dari mockup awal. Sebaiknya diganti foto milik sendiri.
- Database lokal: SQLite bawaan, hanya untuk session/cache. **Tidak ada tabel bisnis di Laravel** — semua data milik backend API.

### 6a. Backend API (port 3333)

- Semua data (login admin/peserta, soal, peserta, hasil, materi, sertifikat) diambil dari **API backend lama yang sama dengan situs lama**, berjalan di VPS port 3333. Situs lama memanggilnya lewat `ENV('APP_URL_API')`; daftar endpoint ada di `C:\laragon\www\InvestaLearning\app\Http\Controllers\Admin\*` (mis. `admin/pelajaran/ListPelajaran/{page}`, `admin/bank/soal/ListSoal/{page}`).
- Base URL di `.env`: `INVESTA_API_URL=http://127.0.0.1:3333/api/migrasi/` (sama untuk lokal dan VPS). **Lokal** butuh SSH tunnel yang tetap terbuka: `ssh -N -L 3333:127.0.0.1:3333 <user>@<IP-VPS>`. **Di VPS** API sudah ada di 127.0.0.1:3333. Timeout: `INVESTA_API_TIMEOUT` (detik). Dibaca lewat `config('services.investa_api')`. Cek koneksi: `curl http://127.0.0.1:3333/api/migrasi/login/get_paket`.
- Klien: `app/Services/InvestaApi.php` (facade `Http`, body form-encoded, tanpa token). Gagal koneksi → `App\Exceptions\InvestaApiUnavailable` dengan pesan ramah.
- `admin/login`: kirim `username` + `password` **di-hash MD5** (aturan backend). Sukses bila `count > 0`; data di `data.idg`, `data.namag`, `data.access`.
- Klien punya `get()` (GET), `read()` (endpoint baca yang hanya melayani POST: `admin/bank/soal/ListSoal/{page}`, `admin/data/soal/DataSoal`, `admin/hasil/ujian/tryout/detail`), `rows()` (ambil list baris dari respons), dan `cached()`.
- Di test, API selalu dipalsukan dengan `Http::fake()` (lihat `tests/Feature/AdminLoginTest.php` dan `AdminPagesTest.php`).

## 7. Test

`tests/Feature`:
- `ExampleTest.php`: `/` merender `welcome`.
- `GlossaryTest.php`: glossary mengirim 209 istilah.
- `PublicPagesTest.php`: semua halaman publik + login/register/forgot (komponen `auth` dengan `tab` yang benar).
- `AdminPagesTest.php`: setiap menu admin merender komponennya dengan API palsu dan tanpa field sensitif; halaman admin hanya membaca dari API; paging/cari/filter peserta di server; skor hasil ujian; teks soal tanpa HTML; deferred props dashboard dan Visitor; API mati → 503; tamu → login; slug tak dikenal → 404.
- `AdminLoginTest.php`: login admin lewat API palsu (sukses + MD5, salah password, server mati, logout).

## 8. Jebakan teknis (sudah pernah kejadian)

1. **Sticky mati karena overflow.** Pembungkus halaman harus `overflow-x-clip`, bukan `overflow-x-hidden` (hidden membuat scroll container baru dan mematikan `position: sticky`). Kartu auth juga pakai `overflow-clip` agar panel kanan bisa sticky.
2. **Dev server Tailwind tidak membaca file baru.** Kalau halaman baru tampil berantakan saat `composer dev` berjalan, padahal `npm run build` benar, sentuh `resources/css/app.css` (`touch`) atau restart `composer dev`. `public/hot` membuat Laravel memakai dev server, bukan build.
3. **`Route::inertia()` tidak meneruskan parameter URL** ke props. Untuk route ber-parameter pakai controller.
4. **Wayfinder:** setelah ubah route, jalankan `php artisan wayfinder:generate`. Import route bernama dengan titik dari subfolder, mis. `import { request } from '@/routes/password'`, `import admin from '@/routes/admin'`.
5. **Inertia mereset scroll setelah kunjungan**, jadi lompat ke anchor (`#...`) setelah navigasi tidak bisa diandalkan. Glossary tidak memakai anchor scroll: huruf aktif dibaca dari hash saat mount lalu diperbarui lewat event `hashchange` (lihat `pages/glossary.tsx`). Bila sudah di halaman yang sama, header memakai `<a>` biasa, bukan `<Link>`, supaya hanya hash yang berubah (`SubLink` di `site-header.tsx`).
6. Pane browser Claude yang tersembunyi bisa menunda `requestAnimationFrame`/animasi saat diuji. Itu bukan bug aplikasi.

## 9. Konteks dari project lama

- Kode lama: `C:\laragon\www\InvestaLearning` (Laravel 7, Blade). View admin: `resources/views/Admin/*`; form daftar: `resources/views/login/registrasi.blade.php`; menu admin: `resources/views/Admin/Home/index.blade.php`.
- Di sana juga ada `INVESTALERNING-UPGRADE-PLAN.md` dan `docs/upgrade-plan.md` yang merencanakan **React SPA + API Laravel terpisah (Sanctum, MySQL, Midtrans)**. Project ini justru memakai **Inertia (satu aplikasi)**. Keputusan arsitektur final belum dibuat; konfirmasi ke pemilik sebelum menambah API/SPA terpisah.
- Data situs lama yang **tidak** dipindahkan: berita, Suara Investor, Kolom, video stock review, langganan berita.

## 10. Langkah berikutnya (belum dikerjakan)

1. Login/daftar/lupa password peserta lewat API (`login/login_api`, `login/registrasi`, `login/get_paket` di situs lama), plus reCAPTCHA.
2. Bedakan menu admin per nilai `access` (admin, koordinator, editor) setelah nilai aslinya dari API diketahui.
3. Tahap 2 admin: sambungkan aksi tulis (tambah/ubah/hapus/toggle/upload) per halaman ke endpoint tulis di controller admin lama, diuji dengan `Http::fake`.
4. Halaman peserta: dashboard peserta, Latihan, TryOut dengan timer, analisis per topik, sertifikat.
5. Ganti foto hotlink di landing dengan foto sendiri; tambahkan favicon dari `logo-mark.svg`.
