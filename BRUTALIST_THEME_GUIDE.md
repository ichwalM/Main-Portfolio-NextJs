# Brutalist Theme Implementation Guide

## Ringkasan Eksekutif

Transformasi tema portfolio dari desain modern minimalis menjadi desain Brutalist dengan mempertahankan palet warna yang sudah ada. Pendekatan ini menggabungkan karakteristik arsitektur Brutalist (border tebal, sudut tajam, elemen yang mencolok) dengan sistem tema yang sudah ada.

---

## 1. AUDIT STRUKTUR PROJECT

### 1.1 Teknologi Existing
- **Framework**: Next.js 16.2.4 dengan React 19.2.3
- **Styling**: Tailwind CSS 4 dengan PostCSS
- **Animasi**: Framer Motion 12.29.0, GSAP 3.14.2
- **Utilities**: clsx 2.1.1, tailwind-merge 3.4.0
- **Icons**: lucide-react 0.562.0

### 1.2 Sistem Tema Existing
- **Lokasi**: `lib/context/ThemeContext.tsx`
- **Mode**: Dark (default) dan Light
- **Sistem**: CSS Variables (HSL) dengan `data-theme` attribute
- **Penyimpanan**: localStorage

### 1.3 Palet Warna Existing

#### Dark Mode
```
Background:    #0a0a0a (0 0% 3.9%)
Foreground:    #f5f5f5 (0 0% 96%)
Primary:       #0043CC (220 100% 32%)
Border:        #242424 (0 0% 14%)
Surface:       #141414 (0 0% 8%)
Destructive:   #ff4444 (0 72% 51%)
```

#### Light Mode
```
Background:    #ffffff (0 0% 100%)
Foreground:    #0d2454 (220 40% 18%)
Primary:       #0043CC (220 100% 32%)
Border:        #c7d2e8 (220 30% 85%)
Surface:       #ffffff (0 0% 100%)
Input:         #e8ecf6 (220 30% 92%)
```

### 1.4 Komponen Existing yang Perlu Dimodifikasi

#### Komponen Layout
- `Header.tsx` - Navigation dengan mobile menu
- `Footer.tsx` - Footer links
- `PageTransition.tsx` - Transisi halaman

#### Komponen Sections
- `Hero.tsx` - Hero section
- `About.tsx` - Section tentang
- `Projects.tsx` - Project showcase
- `Skills.tsx` - Skills grid
- `Experience.tsx` - Experience timeline
- `Certificates.tsx` - Certificate list
- `ContactForm.tsx` - Contact form

#### Komponen UI
- `ProjectCard.tsx` - Project showcase cards
- `BlogCard.tsx` - Blog post cards
- `ProfileCard.tsx` - Profile card
- `WallAppCard.tsx` - Wall app cards
- `ThemeToggle.tsx` - Theme switcher
- `SocialIcons.tsx` - Social media links
- `MagneticButton.tsx` - Interactive buttons

#### Animasi Existing
- `AnimatedBorder.tsx` - Border animations
- `FloatingParticles.tsx` - Particle effects
- `ScrollReveal.tsx` - Scroll reveal animations
- `WaveAnimation.tsx` - Wave background effects
- `MagneticButton.tsx` - Magnetic button effect

---

## 2. PRINSIP DESAIN BRUTALIST

### 2.1 Karakteristik Utama
| Aspek | Implementasi |
|-------|--------------|
| **Border Radius** | 0px untuk SEMUA elemen |
| **Borders** | 3-4px, warna kontras, solid |
| **Padding/Margin** | Tidak simetris, ekspresif |
| **Animasi** | Staggered, abrupt (tanpa easing) |
| **Transisi** | 0ms-100ms, linear atau step |
| **Typography** | Bold, high contrast |
| **Whitespace** | Ekspresif, irregular |
| **Grid** | Overlapping, unconventional |
| **Color** | High contrast dengan background |

### 2.2 Strategi Warna Brutalist

#### Dark Mode Brutalist
```
Content Border:     #ffffff (bright white on dark)
Interactive:        #0043CC (primary blue)
Secondary Border:   #4d4d4d (medium gray)
Background Accent:  #1a1a1a (slight contrast from #0a0a0a)
Highlight:          #ffff00 (neon yellow accent)
```

#### Light Mode Brutalist
```
Content Border:     #0a0a0a (black on white)
Interactive:        #0043CC (primary blue)
Secondary Border:   #999999 (medium gray)
Background Accent:  #f0f0f0 (slight contrast from #ffffff)
Highlight:          #ff0066 (neon pink accent)
```

### 2.3 Sistem Border Brutalist

```typescript
// Border weight system
BORDER_THIN = "1px"      // 1px - Grid lines, dividers
BORDER_MEDIUM = "2px"    // 2px - Secondary elements
BORDER_THICK = "3px"     // 3px - Main components
BORDER_HEAVY = "4px"     // 4px - Featured elements, hero

// Border color system (theme-aware)
BORDER_PRIMARY    // Primary brand color
BORDER_SECONDARY  // Muted borders
BORDER_ACCENT     // Highlight elements
BORDER_WARNING    // Error states
```

### 2.4 Sistem Animasi Brutalist

```typescript
// Animasi staggered (tanpa easing, linear atau step)
STAGGER_DELAY = 60ms          // Delay antar item
ANIMATION_FAST = 200ms        // Quick transitions
ANIMATION_NORMAL = 300ms      // Standard transitions
ANIMATION_SLOW = 500ms        // Slow reveals

// Easing patterns
LINEAR       // Constant speed
STEPS(n)     // Discrete steps
NO_EASING    // Abrupt changes
```

### 2.5 Sistem Spacing Brutalist (Tidak Simetris)

```typescript
// Padding irregular (pt, pr, pb, pl berbeda)
p-[12px_16px_8px_20px]   // Top, Right, Bottom, Left

// Margin irregular
m-[0_20px_16px_0]        // Top, Right, Bottom, Left

// Gap dalam grid
gap-[12px_20px]          // Vertical, Horizontal
```

---

## 3. KOMPONEN REUSABLE BRUTALIST

### 3.1 BrutalistButton
**File**: `components/brutalist/BrutalistButton.tsx`

```typescript
interface Props {
  variant: 'primary' | 'secondary' | 'accent'
  size: 'sm' | 'md' | 'lg'
  borderWeight: 'thin' | 'medium' | 'thick' | 'heavy'
  theme: 'dark' | 'light'
  isLoading?: boolean
  children: React.ReactNode
}

// Dark Mode:
// - Primary: #0043CC border, #ffffff text, #0a0a0a background
// - Secondary: #ffffff border, #f5f5f5 text, #141414 background
// - Accent: #ffff00 border, #000000 text, #0a0a0a background

// Light Mode:
// - Primary: #0043CC border, white text, transparent background
// - Secondary: #0a0a0a border, black text, transparent background
// - Accent: #ff0066 border, #ff0066 text, transparent background
```

### 3.2 BrutalistCard
**File**: `components/brutalist/BrutalistCard.tsx`

```typescript
interface Props {
  variant: 'outlined' | 'double-border' | 'inset'
  borderWeight: 'medium' | 'thick'
  theme: 'dark' | 'light'
  children: React.ReactNode
}

// Variants:
// - outlined: Single 3px border
// - double-border: 2x borders dengan gap 4px
// - inset: Border + inner border inset
```

### 3.3 BrutalistBorder
**File**: `components/brutalist/BrutalistBorder.tsx`

```typescript
interface Props {
  position: 'top' | 'bottom' | 'left' | 'right' | 'all'
  weight: 1 | 2 | 3 | 4
  color: 'primary' | 'secondary' | 'accent'
  animated?: boolean
}
```

### 3.4 BrutalistText
**File**: `components/brutalist/BrutalistText.tsx`

```typescript
interface Props {
  variant: 'h1' | 'h2' | 'h3' | 'body' | 'label'
  weight: 'bold' | 'medium'
  theme: 'dark' | 'light'
  highContrast?: boolean
  children: React.ReactNode
}
```

### 3.5 BrutalistGrid
**File**: `components/brutalist/BrutalistGrid.tsx`

```typescript
interface Props {
  columns: number
  gap: 'irregular' | 'uniform'
  overlap?: boolean
  staggered?: boolean
  children: React.ReactNode
}
```

---

## 4. IMPLEMENTASI DARK MODE VARIANTS

### 4.1 CSS Variables Extended

```css
:root {
  /* Brutalist Dark Borders */
  --brutalist-border-primary: 255 255 255;      /* White */
  --brutalist-border-secondary: 77 77 77;       /* Medium gray */
  --brutalist-border-accent: 255 255 0;         /* Neon yellow */
  
  /* Border Widths */
  --brutalist-border-thin: 1px;
  --brutalist-border-medium: 2px;
  --brutalist-border-thick: 3px;
  --brutalist-border-heavy: 4px;
}

:root[data-theme="light"] {
  /* Brutalist Light Borders */
  --brutalist-border-primary: 10 10 10;         /* Black */
  --brutalist-border-secondary: 153 153 153;    /* Medium gray */
  --brutalist-border-accent: 255 0 102;         /* Neon pink */
}
```

### 4.2 Conditional Classes (clsx patterns)

```typescript
const brutalistClasses = clsx(
  'border-[3px]',
  theme === 'dark' 
    ? 'border-[rgb(var(--brutalist-border-primary))]'
    : 'border-[rgb(var(--brutalist-border-primary))]',
  'p-[12px_16px_8px_20px]',
  'transition-none'  // No smooth transitions
);
```

---

## 5. ANIMASI BRUTALIST

### 5.1 Staggered Entrance
```typescript
// 60ms delay antar item, linear easing
{
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.3,
    delay: index * 0.06,
    ease: "linear"
  }
}
```

### 5.2 Abrupt Hover State
```typescript
// Instant visual feedback tanpa transition
whileHover={{
  borderColor: "rgb(var(--brutalist-border-accent))",
  backgroundColor: "#1a1a1a",
  transition: { duration: 0 }
}}
```

### 5.3 Page Transitions
```typescript
// Rapid fade dengan stagger
{
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0
    }
  },
  exit: { opacity: 0 }
}
```

---

## 6. TESTING CHECKLIST

### 6.1 Visual Testing
- [ ] Border rendering pada berbagai ukuran (1px, 2px, 3px, 4px)
- [ ] Warna border pada dark dan light mode
- [ ] Padding/margin irregular konsisten
- [ ] Overlap elements tidak memiliki rendering issues
- [ ] Typography bold dan high contrast

### 6.2 Performa Animasi
- [ ] Device low-end (60fps monitor): smooth stagger
- [ ] Mobile device: animasi tidak jank
- [ ] Reduced motion preference: animasi off
- [ ] Paint time < 16ms

### 6.3 Aksesibilitas
- [ ] Color contrast ratio > 4.5:1
- [ ] Screen readers: border tidak announced
- [ ] Focus states: visible dan kontras
- [ ] Keyboard navigation: smooth
- [ ] ARIA labels di interactive elements

### 6.4 Cross-browser
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

### 6.5 Responsive Design
- [ ] Desktop (1920px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

---

## 7. TIMELINE IMPLEMENTASI

| Phase | Task | Duration |
|-------|------|----------|
| 1 | Setup library & CSS variables | 1-2 jam |
| 2 | Buat komponen reusable (5 komponen) | 3-4 jam |
| 3 | Update section components | 4-5 jam |
| 4 | Implementasi dark/light variants | 2-3 jam |
| 5 | Setup Storybook & testing | 3-4 jam |
| 6 | Final polish & optimization | 2-3 jam |

**Total: 15-21 jam**

---

## 8. FILE STRUCTURE BARU

```
components/
├── brutalist/                    # NEW: Komponen reusable brutalist
│   ├── BrutalistButton.tsx
│   ├── BrutalistCard.tsx
│   ├── BrutalistBorder.tsx
│   ├── BrutalistText.tsx
│   ├── BrutalistGrid.tsx
│   ├── BrutalistNavigation.tsx
│   └── index.ts
│
├── brutalist-updates/            # NEW: Updated existing components
│   ├── HeroBrutalist.tsx
│   ├── ProjectCardBrutalist.tsx
│   ├── BlogCardBrutalist.tsx
│   └── index.ts
│
lib/
├── brutalist/                    # NEW: Utilities brutalist
│   ├── constants.ts              # Border weights, colors, timings
│   ├── animation-presets.ts      # Framer Motion presets
│   ├── spacing-utils.ts          # Irregular spacing utilities
│   └── color-utils.ts            # Theme-aware color utilities

docs/
├── BRUTALIST_IMPLEMENTATION.md   # NEW: Detailed implementation notes
├── BRUTALIST_COLORS.md           # NEW: Color reference
└── BRUTALIST_STORYBOOK.md        # NEW: Storybook setup guide
```

---

## 9. DEPENDENCIES YANG DIPERLUKAN

### Sudah Installed
- ✅ framer-motion 12.29.0
- ✅ clsx 2.1.1
- ✅ tailwindcss 4
- ✅ next 16.2.4

### Optional (Recommended)
- 🔄 @storybook/react (untuk dokumentasi komponen)
- 🔄 @storybook/addon-a11y (untuk testing aksesibilitas)
- 🔄 chromatic (untuk visual regression testing)

---

## 10. NEXT STEPS

1. ✅ **Ini**: Baca dokumentasi ini
2. **NEXT**: Install dependencies opsional
3. **NEXT**: Buat CSS variables brutalist di `globals.css`
4. **NEXT**: Implementasi komponen reusable 5 buah
5. **NEXT**: Update existing components dengan brutalist style
6. **NEXT**: Buat Storybook untuk semua komponen
7. **NEXT**: Testing visual & performa
8. **NEXT**: Deploy & monitoring

---

Generated: 2026-05-05
Version: 1.0 - Initial Architecture
