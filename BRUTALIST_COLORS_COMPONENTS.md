# Brutalist Color Palette & Components Audit

## 1. PALET WARNA BRUTALIST LENGKAP

### 1.1 Dark Mode Color System

```css
:root {
  /* ============================================
     BACKGROUND & SURFACE
     ============================================ */
  --brutalist-dark-background: hsl(0, 0%, 3.9%);    /* #0a0a0a - Base */
  --brutalist-dark-surface-1: hsl(0, 0%, 6%);       /* #0f0f0f - Cards */
  --brutalist-dark-surface-2: hsl(0, 0%, 8%);       /* #141414 - Elevated */
  --brutalist-dark-surface-accent: hsl(0, 0%, 12%); /* #1f1f1f - Hover */
  
  /* ============================================
     TEXT & FOREGROUND
     ============================================ */
  --brutalist-dark-text-primary: hsl(0, 0%, 96%);   /* #f5f5f5 - Main text */
  --brutalist-dark-text-secondary: hsl(0, 0%, 75%); /* #bfbfbf - Secondary */
  --brutalist-dark-text-muted: hsl(0, 0%, 55%);     /* #8c8c8c - Muted */
  
  /* ============================================
     BORDERS - PRIMARY
     ============================================ */
  --brutalist-dark-border-primary: hsl(0, 0%, 100%);    /* #ffffff - Main */
  --brutalist-dark-border-primary-hover: hsl(0, 0%, 95%); /* #f2f2f2 - Hover */
  
  /* ============================================
     BORDERS - SECONDARY  
     ============================================ */
  --brutalist-dark-border-secondary: hsl(0, 0%, 30%);    /* #4d4d4d - Dividers */
  --brutalist-dark-border-secondary-hover: hsl(0, 0%, 40%); /* #666666 - Hover */
  
  /* ============================================
     ACCENT & INTERACTIVE
     ============================================ */
  --brutalist-dark-accent-primary: hsl(220, 100%, 32%);  /* #0043CC - Brand blue */
  --brutalist-dark-accent-yellow: hsl(60, 100%, 50%);    /* #ffff00 - Neon yellow */
  --brutalist-dark-accent-cyan: hsl(180, 100%, 50%);     /* #00ffff - Neon cyan */
  
  /* ============================================
     STATUS COLORS
     ============================================ */
  --brutalist-dark-status-error: hsl(0, 100%, 50%);      /* #ff0000 - Error */
  --brutalist-dark-status-success: hsl(120, 100%, 40%);  /* #00cc00 - Success */
  --brutalist-dark-status-warning: hsl(45, 100%, 50%);   /* #ffcc00 - Warning */
  
  /* ============================================
     BORDER SIZES
     ============================================ */
  --brutalist-border-1: 1px;
  --brutalist-border-2: 2px;
  --brutalist-border-3: 3px;
  --brutalist-border-4: 4px;
  
  /* ============================================
     ANIMATION TIMINGS
     ============================================ */
  --brutalist-duration-fast: 150ms;
  --brutalist-duration-normal: 300ms;
  --brutalist-duration-slow: 500ms;
  --brutalist-stagger: 60ms;
}
```

### 1.2 Light Mode Color System

```css
:root[data-theme="light"] {
  /* ============================================
     BACKGROUND & SURFACE
     ============================================ */
  --brutalist-dark-background: hsl(0, 0%, 100%);    /* #ffffff - Base */
  --brutalist-dark-surface-1: hsl(0, 0%, 98%);      /* #fafafa - Cards */
  --brutalist-dark-surface-2: hsl(0, 0%, 96%);      /* #f5f5f5 - Elevated */
  --brutalist-dark-surface-accent: hsl(0, 0%, 92%); /* #ebebeb - Hover */
  
  /* ============================================
     TEXT & FOREGROUND
     ============================================ */
  --brutalist-dark-text-primary: hsl(220, 40%, 18%);  /* #0d2454 - Main text */
  --brutalist-dark-text-secondary: hsl(220, 20%, 40%); /* #4d6080 - Secondary */
  --brutalist-dark-text-muted: hsl(220, 10%, 60%);     /* #99a6b3 - Muted */
  
  /* ============================================
     BORDERS - PRIMARY
     ============================================ */
  --brutalist-dark-border-primary: hsl(0, 0%, 0%);     /* #000000 - Main */
  --brutalist-dark-border-primary-hover: hsl(0, 0%, 10%); /* #1a1a1a - Hover */
  
  /* ============================================
     BORDERS - SECONDARY
     ============================================ */
  --brutalist-dark-border-secondary: hsl(220, 30%, 75%); /* #b8cde3 - Dividers */
  --brutalist-dark-border-secondary-hover: hsl(220, 30%, 65%); /* #9ab3cc - Hover */
  
  /* ============================================
     ACCENT & INTERACTIVE
     ============================================ */
  --brutalist-dark-accent-primary: hsl(220, 100%, 32%);  /* #0043CC - Brand blue */
  --brutalist-dark-accent-yellow: hsl(0, 100%, 50%);     /* #ff0000 - Error red */
  --brutalist-dark-accent-cyan: hsl(320, 100%, 50%);     /* #ff0066 - Neon pink */
  
  /* ============================================
     STATUS COLORS
     ============================================ */
  --brutalist-dark-status-error: hsl(0, 100%, 40%);      /* #cc0000 - Error */
  --brutalist-dark-status-success: hsl(120, 70%, 35%);   /* #008f00 - Success */
  --brutalist-dark-status-warning: hsl(35, 100%, 40%);   /* #cc5500 - Warning */
}
```

### 1.3 Kombinasi Warna Rekomendasi

#### Dark Mode Kombinasi
| Element | Border | Text | Background |
|---------|--------|------|------------|
| Primary Button | #ffffff | #000000 | #0043CC |
| Secondary Button | #ffffff | #f5f5f5 | #141414 |
| Accent Button | #ffff00 | #000000 | transparent |
| Card - Outlined | #ffffff | #f5f5f5 | #0a0a0a |
| Card - Double | 2x #ffffff | #f5f5f5 | #0f0f0f |
| Input - Active | #0043CC | #f5f5f5 | #141414 |
| Navigation Item | #ffffff | #f5f5f5 | #0a0a0a |
| Badge - Active | #ffff00 | #000000 | #0a0a0a |
| Badge - Inactive | #4d4d4d | #8c8c8c | #0a0a0a |

#### Light Mode Kombinasi
| Element | Border | Text | Background |
|---------|--------|------|------------|
| Primary Button | #0043CC | #ffffff | #0043CC |
| Secondary Button | #000000 | #0d2454 | transparent |
| Accent Button | #ff0066 | #ff0066 | transparent |
| Card - Outlined | #000000 | #0d2454 | #ffffff |
| Card - Double | 2x #000000 | #0d2454 | #ffffff |
| Input - Active | #0043CC | #0d2454 | #ebebeb |
| Navigation Item | #000000 | #0d2454 | #ffffff |
| Badge - Active | #000000 | #ffffff | #0043CC |
| Badge - Inactive | #b8cde3 | #4d6080 | #ffffff |

---

## 2. KOMPONEN UI YANG MEMERLUKAN MODIFIKASI - DETAILED AUDIT

### 2.1 KOMPONEN CRITICAL (High Priority)

#### 1. Header.tsx
**Status**: Primary Navigation
- **Issues**: Smooth transitions, rounded corners pada mobile menu
- **Brutalist Changes**:
  - Remove rounded corners (border-radius: 0)
  - Add 3-4px borders pada mobile menu
  - Staggered menu item animation (60ms delay)
  - Abrupt hover state (no easing)
  - Irregular padding: pt-4 pr-6 pb-4 pl-8
- **Color Changes**:
  - Dark: White borders (#ffffff)
  - Light: Black borders (#000000)
- **Priority**: 🔴 CRITICAL

#### 2. Hero.tsx
**Status**: Landing section
- **Issues**: Smooth animations, gradient backgrounds
- **Brutalist Changes**:
  - Add 4px border around hero content
  - Staggered text animation (title, subtitle, CTA)
  - Grid layout dengan overlapping elements
  - Sharp typography (font-weight: 900)
  - Animasi masuk dengan step function
- **Animation**: Stagger 0, 60ms, 120ms per element
- **Priority**: 🔴 CRITICAL

#### 3. ProjectCard.tsx
**Status**: Project showcase
- **Issues**: 3D tilt effect (smooth), rounded card corners
- **Brutalist Changes**:
  - Remove 3D tilt effect
  - Add double border (3px + 2px gap + 2px)
  - Irregular padding padding: 12px 16px 8px 20px
  - Sharp edges (0px border-radius)
  - On hover: Border color + background shift (no easing)
  - Remove smooth transitions
- **Accessibility**: Add focus-visible border
- **Priority**: 🔴 CRITICAL

#### 4. BlogCard.tsx
**Status**: Blog post preview
- **Issues**: Rounded corners, smooth hover effects
- **Brutalist Changes**:
  - Single 3px border
  - High contrast text
  - Staggered layout dalam blog list
  - Tag styling dengan thin borders (1px)
  - Metadata text: gray, smaller, bold
- **Priority**: 🟡 HIGH

### 2.2 KOMPONEN IMPORTANT (Medium Priority)

#### 5. About.tsx
**Status**: About section
- **Brutalist Changes**:
  - Add thick borders (3px) around content blocks
  - Irregular spacing between elements
  - Overlapping text boxes
  - Strong typography hierarchy
- **Priority**: 🟡 HIGH

#### 6. Skills.tsx
**Status**: Skills showcase
- **Issues**: Smooth animations, grid layout
- **Brutalist Changes**:
  - Grid dengan irregular gaps (12px vertikal, 20px horizontal)
  - Skill items dengan 2px border
  - Staggered entrance animation
  - On hover: Border color change + background shift
- **Priority**: 🟡 HIGH

#### 7. Experience.tsx
**Status**: Timeline experience
- **Issues**: Smooth connector lines, rounded elements
- **Brutalist Changes**:
  - Thick vertical line (3-4px) untuk timeline
  - Sharp corner untuk experience blocks
  - Irregular item spacing
  - Date styling: bold, uppercase
- **Priority**: 🟡 HIGH

#### 8. Certificates.tsx
**Status**: Certificate list
- **Issues**: Smooth animations, grid layout
- **Brutalist Changes**:
  - Double border cards (2x 2px borders)
  - Staggered list animation
  - Strong typography
  - Cert icon: simple, sharp
- **Priority**: 🟡 HIGH

#### 9. ContactForm.tsx
**Status**: Contact form
- **Issues**: Smooth input animations, rounded inputs
- **Brutalist Changes**:
  - Input: 2px borders, 0px radius
  - Label: bold, uppercase, irregular positioning
  - Form groups: irregular padding
  - Submit button: 4px border, abrupt state changes
  - Error states: 3px red border
- **Accessibility**: Proper ARIA labels, color + border for status
- **Priority**: 🟡 HIGH

### 2.3 KOMPONEN SUPPORTING (Medium Priority)

#### 10. ProfileCard.tsx
- **Changes**: 3px border, irregular padding, bold text
- **Priority**: 🟡 HIGH

#### 11. WallAppCard.tsx
- **Changes**: Double borders, staggered animation
- **Priority**: 🟡 HIGH

#### 12. SocialIcons.tsx
- **Changes**: Icon size increase, borders around icons, irregular layout
- **Priority**: 🟠 MEDIUM

#### 13. ThemeToggle.tsx
- **Changes**: 3px border button, sharp toggle animation
- **Priority**: 🟠 MEDIUM

### 2.4 KOMPONEN ANIMASI (Requires Refactoring)

#### 14. AnimatedBorder.tsx
- **Current**: Smooth animated borders
- **Brutalist**: Keep but make staggered, linear easing
- **Priority**: 🟠 MEDIUM

#### 15. ScrollReveal.tsx
- **Current**: Smooth reveal on scroll
- **Brutalist**: Staggered reveal, step animation
- **Priority**: 🟠 MEDIUM

#### 16. FloatingParticles.tsx
- **Current**: Smooth particle movement
- **Brutalist**: Consider removal atau strong styling dengan borders
- **Priority**: 🟢 LOW

#### 17. WaveAnimation.tsx
- **Current**: Smooth wave background
- **Brutalist**: Consider removal atau discrete wave steps
- **Priority**: 🟢 LOW

#### 18. MagneticButton.tsx
- **Current**: Smooth magnetic effect
- **Brutalist**: Remove smoothness, abrupt clicks
- **Priority**: 🟠 MEDIUM

---

## 3. IMPLEMENTASI ROADMAP

### Phase 1: Foundation (Jam 1-2)
- ✅ Setup CSS variables
- ✅ Buat brutalist constants
- ✅ Setup Framer Motion presets

### Phase 2: Core Components (Jam 3-6)
- BrutalistButton (1 jam)
- BrutalistCard (1 jam)
- BrutalistBorder (45 menit)
- BrutalistText (45 menit)
- BrutalistNavigation (1 jam)

### Phase 3: Update Critical Components (Jam 7-12)
- Header.tsx (1.5 jam)
- Hero.tsx (1.5 jam)
- ProjectCard.tsx (1.5 jam)
- BlogCard.tsx (1 jam)
- ContactForm.tsx (1.5 jam)

### Phase 4: Medium Components (Jam 13-18)
- About, Skills, Experience, Certificates (3 jam)
- Supporting cards (2 jam)
- Animasi updates (2 jam)

### Phase 5: Polish & Testing (Jam 19-21)
- Storybook setup (1 jam)
- Visual testing (1.5 jam)
- Performance testing (0.5 jam)

---

## 4. TEMPLATE SNIPPETS

### Button Brutalist Template
```jsx
<button
  className={cn(
    // Borders
    'border-[3px] border-[rgb(var(--brutalist-dark-border-primary))]',
    // Padding irregular
    'px-[16px] py-[12px]',
    // Sharp
    'rounded-none',
    // Typography
    'font-bold text-sm uppercase',
    // Transitions - abrupt (no easing)
    'transition-none',
    // Hover state
    'hover:border-[rgb(var(--brutalist-dark-accent-yellow))]',
    'hover:bg-[rgb(var(--brutalist-dark-surface-accent))]',
    // Focus accessible
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'focus-visible:outline-[rgb(var(--brutalist-dark-accent-primary))]'
  )}
>
  Click Me
</button>
```

### Card Brutalist Template
```jsx
<div
  className={cn(
    // Double border effect
    'border-[3px] border-[rgb(var(--brutalist-dark-border-primary))]',
    'p-[12px_16px_8px_20px]',
    'relative',
    'after:absolute after:inset-[6px]',
    'after:border-[2px] after:border-[rgb(var(--brutalist-dark-border-secondary))]',
    'rounded-none'
  )}
>
  {children}
</div>
```

### Staggered Animation Template
```jsx
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.3,
      delay: index * 0.06,
      ease: "linear"
    }}
  >
    {item}
  </motion.div>
))}
```

---

Generated: 2026-05-05
Version: 1.0 - Color & Components Audit
