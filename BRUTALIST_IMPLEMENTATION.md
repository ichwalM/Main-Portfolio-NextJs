# Brutalist Theme Implementation - Integration Guide

## 1. SETUP & CONFIGURATION

### 1.1 CSS Variables (✅ DONE)
- File: `app/globals.css`
- Added brutalist CSS variables for dark and light modes
- All variables use HSL format for consistency
- Keyframes added for brutalist animations

### 1.2 Utilities & Constants (✅ DONE)
- Location: `lib/brutalist/`
- Files:
  - `constants.ts` - Border weights, colors, animations, spacing
  - `animation-presets.ts` - Framer Motion presets with linear easing
  - `spacing-utils.ts` - Irregular spacing helper functions
  - `color-utils.ts` - Theme-aware color utilities
  - `index.ts` - Main export

### 1.3 Brutalist Components (✅ DONE)
- Location: `components/brutalist/`
- Components:
  1. **BrutalistButton** - Buttons with thick borders, variants (primary, secondary, accent, outline)
  2. **BrutalistCard** - Cards with variants (outlined, double-border, inset, filled)
  3. **BrutalistText** - Typography with semantic elements (h1-h6, p, span, label)
  4. **BrutalistBorder** - Decorative borders with animation support
  5. **BrutalistGrid** - Irregular grid layout with staggered animations

### 1.4 Storybook (✅ DONE)
- Commands:
  - `npm run storybook` (dev server)
  - `npm run build-storybook` (static build)
- Theme switching:
  - Toolbar `Theme` (dark/light) mengubah `data-theme` dan `localStorage.theme`

---

## 2. USAGE EXAMPLES

### 2.1 BrutalistButton

```jsx
import { BrutalistButton } from '@/components/brutalist';

// Primary button (3px border)
<BrutalistButton variant="primary" size="md">
  Click Me
</BrutalistButton>

// Secondary outline (3px white border in dark mode)
<BrutalistButton variant="secondary" borderWeight="thick">
  Secondary
</BrutalistButton>

// With icon
<BrutalistButton 
  variant="accent" 
  icon={<ArrowRight />} 
  iconPosition="right"
>
  Next
</BrutalistButton>

// Loading state
<BrutalistButton isLoading>
  Loading...
</BrutalistButton>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'accent' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `borderWeight`: 'thin' | 'medium' | 'thick' | 'heavy'
- `isLoading`: boolean
- `fullWidth`: boolean
- `icon`: React.ReactNode
- `iconPosition`: 'left' | 'right'

### 2.2 BrutalistCard

```jsx
import { BrutalistCard } from '@/components/brutalist';

// Simple outlined card (3px border)
<BrutalistCard variant="outlined">
  Card content here
</BrutalistCard>

// Double border effect (2x borders with gap)
<BrutalistCard variant="double-border" borderWeight="thick">
  Double border card
</BrutalistCard>

// Filled with background
import { createIrregularStyle } from '@/lib/brutalist/spacing-utils';

<BrutalistCard
  variant="filled"
  paddingStyle={createIrregularStyle(4, 6, 2, 8)}
>
  Custom padded card
</BrutalistCard>

// Hoverable
<BrutalistCard hoverable borderColor="accent">
  Hover me!
</BrutalistCard>
```

**Props:**
- `variant`: 'outlined' | 'double-border' | 'inset' | 'filled'
- `borderWeight`: 'medium' | 'thick' | 'heavy'
- `borderColor`: 'primary' | 'secondary' | 'accent'
- `hoverable`: boolean
- `padding`: string (Tailwind classes)
- `paddingStyle`: React.CSSProperties (irregular spacing)

### 2.3 BrutalistText

```jsx
import { BrutalistText } from '@/components/brutalist';

// Heading
<BrutalistText as="h1" uppercase>
  MAIN TITLE
</BrutalistText>

// Paragraph
<BrutalistText as="p" color="secondary" tracking="wide">
  Lorem ipsum dolor sit amet
</BrutalistText>

// Custom size and weight
<BrutalistText 
  as="span" 
  size="lg" 
  weight="bold" 
  color="accent"
>
  Custom Text
</BrutalistText>

// Label with high contrast
<BrutalistText 
  as="label" 
  highContrast 
  uppercase
>
  Form Label
</BrutalistText>
```

**Props:**
- `as`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label'
- `size`: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
- `weight`: 'normal' | 'semibold' | 'bold' | 'extrabold'
- `color`: 'primary' | 'secondary' | 'muted' | 'accent'
- `highContrast`: boolean
- `uppercase`: boolean
- `tracking`: 'tight' | 'normal' | 'wide' | 'wider'
- `leading`: 'tight' | 'normal' | 'relaxed' | 'loose'

### 2.4 BrutalistBorder

```jsx
import { BrutalistBorder } from '@/components/brutalist';

// Standalone border line
<BrutalistBorder position="bottom" weight={3} color="primary" />

// Animated border
<BrutalistBorder 
  position="top" 
  weight={4} 
  animated 
  animationType="pulse"
/>

// Wrapping content
<BrutalistBorder position="all" weight={3} color="accent">
  Content wrapped in border
</BrutalistBorder>
```

**Props:**
- `position`: 'top' | 'bottom' | 'left' | 'right' | 'all' | 'horizontal' | 'vertical'
- `weight`: 1 | 2 | 3 | 4
- `color`: 'primary' | 'secondary' | 'accent' | 'error'
- `animated`: boolean
- `animationType`: 'pulse' | 'slide' | 'glow'
- `height`: string (Tailwind class)
- `width`: string (Tailwind class)

### 2.5 BrutalistGrid

```jsx
import { BrutalistGrid } from '@/components/brutalist';

// Simple 3-column grid
<BrutalistGrid columns={3} gap="default">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</BrutalistGrid>

// Responsive grid
<BrutalistGrid 
  columns={4}
  gap="large"
  responsiveColumns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
>
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</BrutalistGrid>

// Staggered animation
<BrutalistGrid 
  columns={3} 
  staggered 
  delayStart={0.1}
>
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</BrutalistGrid>
```

**Props:**
- `columns`: 1 | 2 | 3 | 4 | 6
- `gap`: 'small' | 'default' | 'large' | 'tight' | custom string
- `overlap`: boolean
- `staggered`: boolean
- `delayStart`: number (in seconds)
- `responsiveColumns`: { sm?: number, md?: number, lg?: number, xl?: number }

---

## 3. COLOR THEMING - DARK VS LIGHT

### 3.1 Automatic Theme Switching
All brutalist components automatically adapt to dark/light mode using CSS variables:

```css
/* Dark mode (default) */
:root {
  --brutalist-dark-border-primary: 0 0% 100%;    /* White */
  --brutalist-dark-text-primary: 0 0% 96%;       /* Light gray */
  --brutalist-dark-bg: 0 0% 3.9%;                /* Near black */
}

/* Light mode */
:root[data-theme="light"] {
  --brutalist-dark-border-primary: 0 0% 0%;      /* Black */
  --brutalist-dark-text-primary: 220 40% 18%;    /* Dark blue */
  --brutalist-dark-bg: 0 0% 100%;                /* White */
}
```

### 3.2 Using Colors in Custom Components

```jsx
import { useTheme } from '@/lib/context/ThemeContext';
import { TEXT_COLORS, BORDER_COLORS } from '@/lib/brutalist/color-utils';

export function CustomComponent() {
  const { theme } = useTheme();
  
  return (
    <div className={`
      border-[3px]
      ${BORDER_COLORS.primary[theme]}
      ${TEXT_COLORS.primary[theme]}
    `}>
      Theme-aware content
    </div>
  );
}
```

---

## 4. ANIMATION PATTERNS

### 4.1 Staggered Entrance (60ms delay between items)

```jsx
import { motion } from 'framer-motion';
import { staggerContainerVariant, staggerChildVariant } from '@/lib/brutalist/animation-presets';

<motion.div
  initial="hidden"
  animate="visible"
  variants={staggerContainerVariant(0)}
>
  {items.map((item, index) => (
    <motion.div key={index} variants={staggerChildVariant}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### 4.2 Slide In Animation (Linear easing, 300ms)

```jsx
import { slideInLeftVariant } from '@/lib/brutalist/animation-presets';

<motion.div
  initial="initial"
  animate="animate"
  variants={slideInLeftVariant}
>
  Content slides in from left
</motion.div>
```

### 4.3 No-easing Hover Effect (0ms transition)

```jsx
<motion.button
  whileHover={{ scale: 0.98 }}
  transition={{ duration: 0 }}
>
  Abrupt hover effect
</motion.button>
```

---

## 5. INTEGRATION CHECKLIST FOR NEW COMPONENTS

When creating new components with brutalist style:

- [ ] Import brutalist utilities: `import { ... } from '@/lib/brutalist'`
- [ ] Use `border-[3px]` or higher for main elements
- [ ] Use `rounded-none` to ensure 0px border radius
- [ ] Use `transition-none` for buttons/interactive elements
- [ ] Use `useTheme()` hook for dynamic color switching
- [ ] Add `focus-visible` for accessibility
- [ ] Use `linear` easing for all animations
- [ ] Add irregular padding using `irregularPadding()` utility
- [ ] Use staggered animations for lists/grids (60ms delay)
- [ ] Ensure color contrast >= 4.5:1 for accessibility
- [ ] Test in both dark and light modes
- [ ] Add hover/active states with 0ms transitions
- [ ] Document variant options clearly

---

## 6. SPACING IRREGULAR EXAMPLES

### Predefined Spacings
```jsx
import { IRREGULAR_SPACINGS } from '@/lib/brutalist/spacing-utils';

// Use predefined
<div className={IRREGULAR_SPACINGS.default.padding}>
  Content
</div>

// Or create custom
<div className={irregularPadding(3, 4, 2, 5)}>
  Content with pt-3 pr-4 pb-2 pl-5
</div>
```

### Grid Gaps
```jsx
import { IRREGULAR_GAPS } from '@/lib/brutalist/spacing-utils';

// Default gap: 12px vertical, 20px horizontal
<div className={`grid grid-cols-3 ${IRREGULAR_GAPS.default}`}>
  Items
</div>
```

---

## 7. TESTING CHECKLIST

### Visual Testing
- [ ] Verify borders render correctly (1px, 2px, 3px, 4px)
- [ ] Check color accuracy in dark mode
- [ ] Check color accuracy in light mode
- [ ] Verify padding/margin irregular spacing
- [ ] Confirm no border radius on elements
- [ ] Check hover states are abrupt (no smooth transition)

### Animation Testing
- [ ] Stagger delay is exactly 60ms
- [ ] Animations use linear easing (no ease-in-out)
- [ ] Page transitions are rapid and discrete
- [ ] Hover effects have 0ms transition
- [ ] Device low-end: 60fps animation

### Accessibility Testing
- [ ] Color contrast >= 4.5:1
- [ ] Focus states visible
- [ ] Screen reader announces borders as decoration (not content)
- [ ] ARIA labels on interactive elements
- [ ] Reduced motion respected

### Cross-browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## 8. FILE STRUCTURE REFERENCE

```
lib/brutalist/
├── constants.ts              # Border weights, colors, animations
├── animation-presets.ts      # Framer Motion variants (linear easing)
├── spacing-utils.ts          # Irregular spacing helpers
├── color-utils.ts            # Theme-aware color utilities
└── index.ts                  # Main export

components/brutalist/
├── BrutalistButton.tsx       # Button component
├── BrutalistCard.tsx         # Card component
├── BrutalistText.tsx         # Typography component
├── BrutalistBorder.tsx       # Border decorator
├── BrutalistGrid.tsx         # Grid layout
└── index.ts                  # Main export
```

---

## 9. FUTURE ENHANCEMENTS

### Phase 2: Advanced Components
- BrutalistNavigation (with staggered menu items)
- BrutalistForm (input, textarea, select with thick borders)
- BrutalistToast (notifications with abrupt animations)
- BrutalistModal (dialog with aggressive styling)
- BrutalistTabs (tab panels with sharp borders)

### Phase 3: Integration with Existing Components
- Update Header.tsx with BrutalistButton, BrutalistNavigation
- Update Hero.tsx with BrutalistText, BrutalistBorder, staggered animations
- Update ProjectCard.tsx with double borders, irregular padding
- Update ContactForm.tsx with BrutalistButton, form inputs

### Phase 4: Documentation & Testing
- Storybook stories for all components
- Visual regression testing with Chromatic
- Accessibility audit (Axe DevTools)
- Performance profiling for animations

---

## 10. COMMON PITFALLS & SOLUTIONS

| Issue | Solution |
|-------|----------|
| Smooth transitions instead of abrupt | Use `transition-none` or `transition={{ duration: 0 }}` |
| Border radius on elements | Always use `rounded-none` |
| Colors not switching on theme change | Use CSS variables and `useTheme()` hook |
| Animations have ease function | Ensure all Framer Motion uses `ease: 'linear'` |
| Grid layout too uniform | Use `IRREGULAR_GAPS` or custom gap values |
| Missing accessibility | Add `focus-visible` and ARIA labels |
| Low contrast text | Use high-weight fonts and light borders on dark backgrounds |

---

Generated: 2026-05-05
Version: 1.0 - Implementation Complete
