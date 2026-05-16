# Dokumentasi Komponen Brutalism

Dokumen ini mencatat komponen/halaman yang diadaptasi ke tema brutalism dan aturan implementasinya.

## Fondasi Global
- `app/globals.css`
  - Palet kontras tinggi (hitam/putih + aksen primer).
  - Tipografi global sans-serif tebal.
  - Override global untuk menghapus shadow, gradient, blur, dan transisi halus.
  - Utility brutalist: `brutal-box`, `brutal-divider`, `brutal-circle`, `brutal-triangle`.

- `app/layout.tsx`
  - Aktivasi mode brutalism melalui class `body.brutalist`.
  - Menonaktifkan transisi halaman halus (loader/page transition non-esensial).

- `components/layout/BrutalistMotionProvider.tsx`
  - Paksa reduced motion (`MotionConfig reducedMotion="always"`).

## Navigasi
- `components/layout/Header.tsx`
  - Menu desktop jadi blok-blok solid.
  - Border tebal, label uppercase langsung.
  - Scroll ke anchor menggunakan `behavior: auto`.
  - Tanpa dropdown.

## Halaman Utama
- `components/sections/Hero.tsx`
  - Grid background kasar.
  - Heading besar tebal.
  - CTA berbentuk blok solid dengan border tebal.

- `app/page.tsx`
  - Pembatas section tebal.
  - Komposisi blok tegas untuk blog/contact.

## Halaman Blog
- `app/blog/page.tsx`
  - Grid kaku untuk daftar artikel.
  - Empty state berbentuk panel border tebal.

- `app/blog/[slug]/page.tsx`
  - Konten artikel dalam panel border tebal.
  - Back navigation berbentuk tombol blok.

- `components/ui/BlogCard.tsx`
  - Card tanpa gradient/transisi halus.
  - Struktur visual tegas dengan border separator.

## Halaman Projects
- `app/projects/page.tsx`
  - Grid daftar project berbasis border sistem.

- `app/projects/[slug]/page.tsx`
  - Header aksi (Code/Demo) sebagai blok kontras tinggi.
  - Panel deskripsi dan stack menggunakan border tebal.

- `components/ui/ProjectCard.tsx`
  - Menghapus tilt/glow.
  - Fokus pada struktur informasi dan kontras.

## Halaman Wall App
- `app/wall-app/page.tsx`
  - Hero section tanpa gradient/blur.
  - Penambahan elemen bentuk dasar (lingkaran, segitiga, garis tebal).

- `components/ui/WallAppCard.tsx`
  - Kartu berbasis geometri tegas.
  - Tombol aksi solid kontras tinggi.

## Form Kontak
- `components/sections/ContactForm.tsx`
  - Input dan textarea kotak border tebal.
  - Banner status dengan panel kontras.
  - Tombol submit uppercase, tebal, dan solid.

## Aturan Pengembangan Selanjutnya
- Gunakan class utilitas brutalist, hindari class efek lembut.
- Prioritaskan readability: heading besar, label jelas, informasi ringkas.
- Uji di viewport mobile/tablet/desktop sebelum merge.
