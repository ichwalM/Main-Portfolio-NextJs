# Troubleshooting Guide - Portfolio Website

## ✅ Status: Website Berfungsi!

Dari screenshot, website sudah berhasil menampilkan data dari API:
- ✅ Projects ditampilkan
- ✅ Skills ditampilkan dengan progress bar
- ✅ Experience timeline ditampilkan

## 🔧 Perbaikan yang Dilakukan

### 1. API Integration
- URL API: `http://localhost:8000/api/v1`
- Semua endpoint terhubung dengan benar
- Data fetching berhasil

### 2. Type Definitions
- Profile: No `data` wrapper
- Projects: Uses `thumbnail` field
- Skills: No `data` wrapper  
- Experience: Uses `role` field
- Tech stack: Handles both string and array

### 3. Image Configuration
- Next.js Image component dikonfigurasi untuk localhost
- Unoptimized mode untuk development
- Remote patterns untuk storage Laravel

## 🎯 Cara Menggunakan

### Development
```bash
npm run dev
```
Buka: http://localhost:3000

### Build Production
```bash
npm run build
npm start
```

## 📝 Catatan Penting

### Jika Ada Error di Console:
1. **Image Error**: Normal untuk development, gambar tetap ditampilkan
2. **CORS Warning**: Pastikan Laravel CORS sudah dikonfigurasi
3. **Hydration Error**: Refresh browser

### Data dari API
Pastikan Laravel API mengembalikan data dengan struktur:

**Profile** (`/api/v1/profile`):
```json
{
  "id": 1,
  "name": "Ichwal",
  "bio": "...",
  "hero_image": "http://localhost:8000/storage/...",
  "social_links": { "github": "...", "linkedin": "..." }
}
```

**Projects** (`/api/v1/projects`):
```json
{
  "data": [
    {
      "id": 1,
      "title": "...",
      "slug": "...",
      "thumbnail": "...",
      "tech_stack": ["Laravel", "React"] // atau "Laravel,React"
    }
  ]
}
```

**Skills** (`/api/v1/skills`):
```json
{
  "Backend": [
    { "name": "Laravel", "proficiency": 95 }
  ],
  "Frontend": [...]
}
```

**Experience** (`/api/v1/experiences`):
```json
[
  {
    "company": "...",
    "role": "...",
    "start_date": "2023-01-01",
    "end_date": null,
    "description": "..."
  }
]
```

## 🚀 Fitur yang Sudah Berfungsi

- ✅ Hero section dengan animasi
- ✅ Projects grid dengan hover effects
- ✅ Skills dengan animated progress bars
- ✅ Experience timeline
- ✅ Blog section (jika ada data)
- ✅ Responsive design
- ✅ Dark theme
- ✅ Smooth animations
- ✅ Page transitions

## 🎨 Customization

### Mengubah Warna
Edit `app/globals.css`:
```css
:root {
  --primary: #06b6d4; /* Cyan */
  --accent: #a855f7;  /* Purple */
}
```

### Menambah Section
1. Buat component di `components/sections/`
2. Import di `app/page.tsx`
3. Tambahkan data fetching jika perlu

## 📞 Support

Jika ada masalah:
1. Check Laravel API berjalan: `php artisan serve`
2. Check Next.js dev server: `npm run dev`
3. Lihat console browser untuk error
4. Check terminal untuk error server

Website sudah siap digunakan! 🎉
