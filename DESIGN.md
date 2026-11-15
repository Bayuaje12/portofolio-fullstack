antislop active: during (session override).

# Panduan Desain: Portofolio Fullstack Bayu (Node.js & React)

## 1. Design Read & Karakter Visual
- **Pembacaan**: Portofolio teknis untuk rekruter, engineering manager, dan calon klien yang membutuhkan bukti nyata kemampuan arsitektur backend Node.js serta antarmuka React yang responsif.
- **Bahasa Visual**: Editorial teknis yang bersih, fungsional, dan berbobot tanpa ornamen kecerdasan buatan seperti gradien ungu generik atau bento-grid acak.
- **Dials**: ENERGY 2 / RHYTHM 2 / MOTION 1.
  - *Energy 2*: Tenang, percaya diri, langsung memperlihatkan kapabilitas rekayasa perangkat lunak tanpa grafis berlebihan.
  - *Rhythm 2*: Komposisi bervariasi antara ringkasan profil, studi kasus proyek horizontal, kartu keahlian berdasar domain kerja, dan formulir kontak terarah.
  - *Motion 1*: Interaksi mikro fungsional saat kursor menyentuh elemen interaktif dan fokus keyboard; menghormati preferensi `prefers-reduced-motion`.

## 2. Palet Warna & Kontras Aksesibilitas (WCAG AA)
Palet dibatasi pada 2 warna netral utama dan 1 warna aksen terukur:
- **Tema Terang (Default)**:
  - Latar Belakang Dasar: `#FBFBF9` (Warm Paper)
  - Latar Belakang Kartu / Kontainer: `#FFFFFF` dengan batas tepi `#E3E5E8`
  - Teks Utama (Heading & Body): `#1A1D20` (Dark Charcoal, rasio kontras 14.8:1 terhadap `#FBFBF9`)
  - Teks Sekunder (Keterangan & Metadata): `#4B535D` (Slate Grey, rasio kontras 6.2:1 terhadap `#FBFBF9`)
  - Aksen Tunggal: `#C04A24` (Deep Terracotta, rasio kontras 4.7:1 terhadap `#FFFFFF` dan `#FBFBF9` untuk tombol dan tautan aktif)
  - Fokus Ring Indikator: `#1A1D20` solid 2px dengan offset 2px.
- **Tema Gelap (Didukung Penuh lewat Toggle)**:
  - Latar Belakang Dasar: `#121417` (Deep Obsidian)
  - Latar Belakang Kartu: `#1C1F24` dengan batas tepi `#2D323A`
  - Teks Utama: `#F0F2F5` (rasio kontras 15.2:1)
  - Teks Sekunder: `#A2AAB4` (rasio kontras 6.4:1)
  - Aksen Tunggal: `#E05A32` (rasio kontras 5.2:1)

## 3. Tipografi
- **Font Utama (Antarmuka & Teks Tubuh)**: `Plus Jakarta Sans`, sans-serif humanis yang bersih dan dirancang untuk keterbacaan tinggi pada teks bahasa Indonesia.
  - Ukuran Judul Utama (`h1`): `clamp(2rem, 5vw, 3.25rem)`, bobot 700, tinggi baris 1.15.
  - Judul Seksi (`h2`): `clamp(1.5rem, 3.5vw, 2.25rem)`, bobot 600, tinggi baris 1.25.
  - Subjudul & Judul Komponen (`h3`): `1.125rem` (18px), bobot 600.
  - Teks Tubuh (`p`, `li`): `1rem` (16px) dengan tinggi baris 1.6 untuk kenyamanan membaca.
- **Font Monospace (Aksen Kode & Tag Arsitektur)**: `JetBrains Mono` atau `ui-monospace`, hanya untuk label stack teknis (misalnya `Node.js v20`, `Express`, `React 18`, `PostgreSQL`).
- **Aturan Tipografi**: Tidak ada huruf kapital penuh dengan spasi renggang acak, tidak ada tanda pisang em dash (`—`). Semua tanda jeda menggunakan koma, titik dua, atau kurung.

## 4. Struktur Halaman & Narasi Konten
Struktur halaman disusun berdasar kebutuhan evaluasi teknis, bukan susunan templat AI:
1. **Header & Navigasi**:
   - Teks nama identitas ("Bayu / Fullstack"), tautan lompat cepat ke `#proyek`, `#keahlian`, `#kontak`, serta tombol pengganti tema (terang/gelap) yang berfungsi nyata dengan atribut ARIA lengkap.
2. **Hero Section (Profil & Fokus Kerja)**:
   - Judul fokus: Bayu, Fullstack Web Developer.
   - Penjelasan lingkup kerja spesifik: Pengembangan API Node.js yang modular, manajemen basis data relasional, dan antarmuka dinamis berbasis React.
   - Status ketersediaan kerja yang jujur tanpa animasi kedip palsu.
   - Tombol tindakan langsung: Gulir ke daftar proyek nyata dan tombol kontak.
3. **Seksi Proyek (Studi Kasus Konkret)**:
   - Tidak memakai bento-grid atau placeholder screenshot kartun.
   - Menampilkan proyek representatif dengan arsitektur jelas:
     - Masalah yang diselesaikan.
     - Pembagian tanggung jawab teknis: Backend (Node.js API, penanganan kueri, keamanan autentikasi) dan Frontend (React state management, interaksi form, optimasi rendering).
     - Tautan langsung ke repositori sumber kode atau demo langsung.
4. **Seksi Keahlian (Pengelompokan Berbasis Solusi)**:
   - Menghindari grafik batang persentase palsu (seperti "React 90%").
   - Dikelompokkan berdasar area teknis:
     - *Backend & Lingkungan Eksekusi*: Node.js, Express, RESTful API design, PostgreSQL, Redis caching, pengujian Jest/Supertest.
     - *Frontend & Arsitektur Klien*: React, TypeScript, pengelolaan state (Zustand/Context), Tailwind CSS, integrasi REST API.
     - *Praktik & Alat Rekayasa*: Git, Docker kontainerisasi dasar, CI/CD GitHub Actions, dokumentasi API OpenAPI/Swagger.
5. **Seksi Kontak**:
   - Formulir interaktif dengan validasi langsung (nama, alamat email, pesan kebutuhan proyek).
   - Jalur kontak alternatif: Alamat email langsung (`mailto:`) dan tautan GitHub profil.
6. **Footer Ringkas**:
   - Hak cipta sederhana, tautan kembali ke atas, dan penanda bahasa Indonesia.

## 5. Tata Letak & Perilaku Responsif
- **Ponsel (< 640px)**:
  - Tata letak satu kolom penuh dengan margin samping `1.25rem`.
  - Target sentuh tombol dan tautan minimal `44px x 44px` dengan jarak pemisah minimal `8px`.
  - Navigasi tetap mudah diakses tanpa menu hamburger kosong yang menyembunyikan halaman.
  - Tidak ada luapan horizontal (`overflow-x: hidden` dicegah melalui pengujian lebar fleksibel `max-width: 100%`).
- **Tablet (640px - 1024px)**:
  - Transisi modular dua kolom pada seksi keahlian dan metadata proyek.
- **Desktop (> 1024px)**:
  - Lebar kontainer maksimum `1120px` di tengah layar, memberikan ruang napas struktural dan keterbacaan baris teks yang ideal (maksimal 70 karakter per baris teks tubuh).

## 6. Gaya Bahasa & Copywriting
- Ditulis sepenuhnya dalam bahasa Indonesia yang lugas, profesional, dan alami.
- Menolak klaim bombastis tanpa bukti (tidak ada kata seperti "solusi revolusioner", "ahli kelas dunia", atau angka metrik buatan seperti "99% kepuasan pengguna").
- Kalimat langsung berpusat pada apa yang dibangun, alat yang dipakai, dan bagaimana sistem tersebut berjalan.
<<<END>>>
