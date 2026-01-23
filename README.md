# Personal Portfolio Website

A premium, animation-rich personal portfolio built with **Next.js 14+** (App Router), featuring dynamic API integration, smooth animations, and a futuristic UI inspired by ReactBits, Framer Motion showcases, and Apple's design language.

## 🚀 Features

- **Modern Stack**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Animation-Heavy UI**: Framer Motion + GSAP for 60 FPS smooth animations
- **Dynamic API Integration**: Fetches all content from Laravel REST API
- **Server Components**: Optimal performance with SSR and ISR
- **SEO Optimized**: Dynamic metadata, OpenGraph tags, semantic HTML
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode**: Premium dark theme by default

## 📋 Prerequisites

- Node.js 18+ installed
- Laravel API running at `http://localhost:8000` (or update `.env.local`)
- API endpoints must be accessible:
  - `/api/profile`
  - `/api/projects`
  - `/api/skills`
  - `/api/experiences`
  - `/api/posts`

## 🛠️ Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create `.env.local` file (already created):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

3. **Ensure Laravel API is running**:
   - Start your Laravel backend server
   - Verify CORS is configured to allow requests from `http://localhost:3000`
   - Test API endpoints are returning data

## 🎯 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
npm run build
npm start
```

**Note**: Build will fail if API is not accessible. Ensure your Laravel API is running before building.

## 📁 Project Structure

```
my-portfolio/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout with SEO
│   ├── page.tsx                  # Home page
│   ├── projects/                 # Projects pages
│   │   ├── page.tsx              # Projects listing
│   │   └── [slug]/page.tsx       # Project detail
│   └── blog/                     # Blog pages
│       ├── page.tsx              # Blog listing
│       └── [slug]/page.tsx       # Blog post detail
├── components/                   # React components
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx            # Animated navbar
│   │   ├── Footer.tsx            # Footer
│   │   └── PageTransition.tsx    # Page transitions
│   ├── sections/                 # Page sections
│   │   ├── Hero.tsx              # Hero section
│   │   ├── Skills.tsx            # Skills visualization
│   │   └── Experience.tsx        # Timeline
│   ├── ui/                       # UI components
│   │   ├── ProjectCard.tsx       # Project card
│   │   └── BlogCard.tsx          # Blog card
│   └── animations/               # Animation wrappers
│       ├── ScrollReveal.tsx      # Scroll animations
│       └── MagneticButton.tsx    # Magnetic effect
├── lib/                          # Utilities
│   ├── api/                      # API services
│   │   ├── client.ts             # API client
│   │   ├── profile.ts            # Profile API
│   │   ├── projects.ts           # Projects API
│   │   ├── skills.ts             # Skills API
│   │   ├── experience.ts         # Experience API
│   │   └── blog.ts               # Blog API
│   ├── animations/               # Animation utilities
│   │   └── variants.ts           # Framer Motion variants
│   └── utils.ts                  # Helper functions
└── types/                        # TypeScript types
    ├── profile.ts
    ├── project.ts
    ├── skill.ts
    ├── experience.ts
    └── blog.ts
```

## 🎨 Key Technologies

- **Next.js 14+**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Declarative animations
- **GSAP**: Advanced animations
- **SWR**: Client-side data fetching
- **Lucide React**: Icon library

## 🎭 Animation Features

- **Scroll-triggered animations**: Elements animate as they enter viewport
- **Page transitions**: Smooth transitions between routes
- **Magnetic buttons**: Interactive hover effects
- **Parallax effects**: Depth and motion
- **Staggered reveals**: Sequential animations
- **Gradient animations**: Animated backgrounds
- **Hover effects**: 3D transforms, glows, and scales

## 🔧 API Integration

All data is fetched from your Laravel API:

### Profile Endpoint
```json
GET /api/profile
{
  "data": {
    "id": 1,
    "name": "Ichwal",
    "bio": "...",
    "hero_image": "http://localhost:8000/storage/profile/hero.jpg",
    "social_links": {
      "github": "https://github.com/ichwal",
      "linkedin": "..."
    }
  }
}
```

### Projects Endpoint
```json
GET /api/projects
{
  "data": [
    {
      "id": 1,
      "title": "Project Name",
      "slug": "project-name",
      "description": "...",
      "image": "...",
      "tech_stack": ["Next.js", "TypeScript"],
      "github_url": "...",
      "live_url": "...",
      "featured": true,
      "created_at": "2024-01-01"
    }
  ]
}
```

## 🚨 Troubleshooting

### Build Fails with API Error
- Ensure Laravel API is running
- Check CORS configuration in Laravel
- Verify API endpoints return correct data structure
- Check `.env.local` has correct API URL

### Images Not Loading
- Verify `next.config.ts` has correct image domain
- Check Laravel storage is publicly accessible
- Ensure image URLs are absolute paths

### Animations Not Working
- Check browser console for errors
- Verify Framer Motion is installed
- Ensure components are client components (`'use client'`)

## 📝 Customization

1. **Update API URL**: Edit `.env.local`
2. **Change Colors**: Edit `app/globals.css` CSS variables
3. **Modify Animations**: Edit `lib/animations/variants.ts`
4. **Add Sections**: Create new components in `components/sections/`

## 🎯 Performance

- **60 FPS animations**: Optimized for smooth performance
- **ISR**: Incremental Static Regeneration (1 hour cache)
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Server Components**: Reduced client-side JavaScript

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use.

---

Built with ❤️ using Next.js 14+ and modern web technologies.
