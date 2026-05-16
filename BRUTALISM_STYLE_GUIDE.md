# Brutalism Style Guide

## Tujuan
Panduan ini mendefinisikan standar visual tema brutalism untuk seluruh website agar konsisten, cepat dirender, dan mudah dipelihara.

## Prinsip Inti
- Gunakan kontras tinggi: latar hitam/putih dengan aksen primer tajam.
- Gunakan tipografi sans-serif tebal dengan hierarki ukuran jelas.
- Gunakan layout grid kaku, blok geometris sederhana, dan garis lurus.
- Hindari efek dekoratif halus: shadow lembut, blur, gradient, transisi halus.
- Prioritaskan performa: minim animasi, minim dekorasi bitmap, dan struktur DOM sederhana.

## Token Warna
- `--background`: hitam pekat (`dark`) / putih bersih (`light`).
- `--foreground`: putih (`dark`) / hampir hitam (`light`).
- `--primary`: biru primer kontras tinggi.
- `--accent`: warna sekunder mencolok untuk aksen visual.
- `--border`: warna border kontras untuk garis tebal.

## Tipografi
- Font utama: `var(--font-sans), Space Grotesk, Arial, Helvetica, sans-serif`.
- Heading: uppercase, `font-weight: 900`, tracking rapat, ukuran besar.
- Body: sans-serif tegas, kontras tinggi, line-height ringkas.

## Grid & Layout
- Semua section utama dipisahkan border tebal (`border-4`).
- Grid card memakai struktur kaku dengan separator vertikal/horizontal tegas.
- Spasi konsisten, tidak mengandalkan efek visual transisi.

## Aturan Komponen
- Tombol: persegi/persegi panjang, warna solid kontras, border tegas.
- Input/Form: bentuk kotak, border tebal, label langsung dan jelas.
- Navigasi: blok solid, label uppercase, tanpa dropdown menu.
- Card: tanpa glow/blur/shadow; gunakan garis tebal dan aksen garis bawah.

## Elemen Dekoratif Brutalist
- Gunakan bentuk dasar: lingkaran, segitiga, garis tebal.
- Hindari ilustrasi dekoratif berlebihan.
- Elemen dekoratif wajib non-interaktif (`pointer-events: none`) bila hanya ornamen.

## Responsivitas
- Mobile: tetap mempertahankan border tebal dan blok solid.
- Tablet/Desktop: grid bertambah kolom tanpa mengubah bahasa visual.
- Breakpoint utama: `sm`, `md`, `lg`, `xl` mengikuti utilitas Tailwind.

## Performa
- Gunakan `next/image` untuk gambar konten penting.
- Hindari animasi non-esensial; gunakan gerakan minimum hanya bila fungsional.
- Hindari efek berat GPU seperti blur besar dan gradient berlapis.

## Checklist QA
- Kontras teks terhadap background selalu terbaca.
- Tidak ada rounded corner, shadow, atau gradient lembut.
- Border dan divider terlihat tegas di semua viewport.
- Navigasi, button, form, dan card konsisten dalam bahasa visual brutalism.
