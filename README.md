# Portofolio Fullstack Developer: Bayu

Situs web portofolio statis untuk Bayu, seorang fullstack web developer yang berfokus pada arsitektur API Node.js dan antarmuka web modern React. Dibuat murni dengan HTML5 semantik, CSS3 modular, dan JavaScript standar tanpa kompilasi build step.

## Fitur Utama

1. **Studi Kasus Proyek Konkret**:
   - Menjelaskan pemisahan arsitektur teknis antara backend (Node.js, PostgreSQL, validasi skema) dan frontend (React, pengelolaan state, aksesibilitas).
   - Fitur interaktif simulasi respons endpoint API dan kalkulator diskon kasir point-of-sale.
2. **Kategori Keahlian Terstruktur**:
   - Pengelompokan berbasis area rekayasa: Backend & Layanan API, Frontend & Antarmuka Klien, serta Praktik Rekayasa & Operasional.
   - Tanpa grafik persentase fiktif.
3. **Formulir Kontak Berfungsi**:
   - Validasi sisi klien secara langsung untuk nama, format email, dan panjang pesan.
   - Penanganan status pemrosesan dan konfirmasi pesan yang aksesibel.
4. **Dukungan Dua Tema (Terang & Gelap)**:
   - Pengalih tema mandiri yang menyimpan preferensi pengguna pada `localStorage` dan menghormati setelan sistem operasi.
   - Menjamin rasio kontras warna teks dan elemen interaktif memenuhi standar WCAG AA.
5. **Responsif & Aksesibilitas**:
   - Navigasi keyboard penuh (`Tab`, `Shift+Tab`, `Escape`).
   - Tautan lompat langsung ke konten utama (*skip link*).
   - Ukuran target sentuh tombol minimal 44x44px untuk kenyamanan perangkat layar sentuh.

## Struktur Berkas

```text
├── index.html       # Struktur semantik dokumen web
├── css/
│   └── style.css    # Desain token, layout grid/flexbox, tema warna
├── js/
│   └── main.js      # Pengalih tema, validasi formulir, simulasi interaktif
└── README.md        # Dokumentasi situs
```

## Cara Menjalankan

Buka berkas `index.html` secara langsung di peramban web modern apa pun, atau sajikan melalui GitHub Pages tanpa perlu konfigurasi tambahan.
