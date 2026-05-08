# Brutalist Theme - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Import Components
```jsx
import { 
  BrutalistButton, 
  BrutalistCard, 
  BrutalistText,
  BrutalistBorder,
  BrutalistGrid 
} from '@/components/brutalist';
```

### Step 2: Use in Your Component
```jsx
export function MySection() {
  return (
    <div className="py-20">
      {/* Title */}
      <BrutalistText as="h2" uppercase>
        Section Title
      </BrutalistText>
      
      {/* Divider */}
      <BrutalistBorder position="bottom" weight={3} />
      
      {/* Grid of Cards */}
      <BrutalistGrid columns={3} staggered gap="default">
        {items.map((item, i) => (
          <BrutalistCard 
            key={i} 
            variant="double-border"
            hoverable
          >
            <BrutalistText as="h3">
              {item.title}
            </BrutalistText>
            <BrutalistText as="p" color="secondary">
              {item.description}
            </BrutalistText>
            <BrutalistButton variant="primary">
              Learn More
            </BrutalistButton>
          </BrutalistCard>
        ))}
      </BrutalistGrid>
    </div>
  );
}
```

### Step 3: Done! 🎉
- ✅ Theme-aware (dark/light mode automatic)
- ✅ Responsive design
- ✅ Accessible (focus states, contrast)
- ✅ Animated (staggered 60ms delays)
- ✅ No configuration needed

---

## 📖 Component Reference

### BrutalistButton
```jsx
<BrutalistButton 
  variant="primary"          // primary | secondary | accent | outline
  size="md"                  // sm | md | lg
  borderWeight="thick"       // thin | medium | thick | heavy
  isLoading={false}
  icon={<ArrowRight />}
  iconPosition="right"
>
  Button Text
</BrutalistButton>
```

### BrutalistCard
```jsx
<BrutalistCard
  variant="outlined"         // outlined | double-border | inset | filled
  borderWeight="thick"       // medium | thick | heavy
  borderColor="primary"      // primary | secondary | accent
  hoverable={true}
  padding="pt-4 pr-6 pb-2 pl-8"
>
  Card content
</BrutalistCard>
```

### BrutalistText
```jsx
<BrutalistText
  as="h1"                    // h1-h6 | p | span | label
  size="3xl"                 // xs | sm | base | lg | xl | 2xl | 3xl | 4xl
  weight="bold"              // normal | semibold | bold | extrabold
  color="primary"            // primary | secondary | muted | accent
  uppercase={true}
  tracking="wide"            // tight | normal | wide | wider
>
  Your text here
</BrutalistText>
```

### BrutalistBorder
```jsx
<BrutalistBorder
  position="bottom"          // top | bottom | left | right | all | horizontal | vertical
  weight={3}                 // 1 | 2 | 3 | 4
  color="primary"            // primary | secondary | accent | error
  animated={true}
  animationType="pulse"      // pulse | slide | glow
/>
```

### BrutalistGrid
```jsx
<BrutalistGrid
  columns={3}                // 1 | 2 | 3 | 4 | 6
  gap="default"              // small | default | large | tight
  staggered={true}
  delayStart={0}
  responsiveColumns={{
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4
  }}
>
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</BrutalistGrid>
```

---

## 🎨 Colors & Theming

### Automatic Dark/Light Mode
All components automatically switch colors based on theme:

**Dark Mode:**
- Borders: White (#ffffff)
- Text: Light gray (#f5f5f5)
- Background: Near black (#0a0a0a)
- Accent: Sharp blue (#0043CC)

**Light Mode:**
- Borders: Black (#000000)
- Text: Dark blue (#0d2454)
- Background: White (#ffffff)
- Accent: Sharp blue (#0043CC)

### Using Theme in Custom Components
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
      Custom content
    </div>
  );
}
```

---

## ⚡ Common Patterns

### Hero Section with Staggered Text
```jsx
<BrutalistText as="h1" uppercase>
  Main Title
</BrutalistText>

<motion.div
  initial="hidden"
  animate="visible"
  variants={staggerContainerVariant()}
>
  {paragraphs.map((p, i) => (
    <motion.p key={i} variants={staggerChildVariant}>
      {p}
    </motion.p>
  ))}
</motion.div>
```

### Project Showcase Grid
```jsx
<BrutalistGrid 
  columns={3} 
  staggered
  responsiveColumns={{ sm: 1, md: 2, lg: 3 }}
>
  {projects.map(project => (
    <BrutalistCard key={project.id} variant="double-border" hoverable>
      <img src={project.image} alt={project.title} />
      <BrutalistText as="h3">{project.title}</BrutalistText>
      <BrutalistButton variant="primary">View</BrutalistButton>
    </BrutalistCard>
  ))}
</BrutalistGrid>
```

### Form with Buttons
```jsx
<form className="space-y-4">
  <div>
    <BrutalistText as="label" uppercase>Email</BrutalistText>
    <input 
      type="email"
      className="w-full border-2 border-[hsl(var(--brutalist-dark-border-primary))] p-3"
    />
  </div>
  
  <BrutalistButton variant="primary" fullWidth>
    Submit
  </BrutalistButton>
</form>
```

---

## 🔍 Checking Implementation

### Test Dark Mode
```jsx
// In any component:
import { useTheme } from '@/lib/context/ThemeContext';

export function Debug() {
  const { theme } = useTheme();
  return <p>Current theme: {theme}</p>;
}
```

### Test Animations
```jsx
// Verify stagger delay is 60ms
import { ANIMATION_DURATIONS } from '@/lib/brutalist/constants';
console.log(ANIMATION_DURATIONS.stagger); // Should be 60
```

### Test Colors
```jsx
// Check CSS variables are applied
const root = document.documentElement;
const borderColor = getComputedStyle(root)
  .getPropertyValue('--brutalist-dark-border-primary');
console.log(borderColor); // Should show color value
```

---

## 🧩 Integration Checklist for New Components

When adding new components to existing sections:

- [ ] Import from `@/components/brutalist`
- [ ] Use `useTheme()` if custom colors needed
- [ ] Add `border-[3px]` or higher for visibility
- [ ] Add `rounded-none` for sharp corners
- [ ] Use `transition-none` for buttons
- [ ] Add `focus-visible` for accessibility
- [ ] Use staggered animations (60ms delay)
- [ ] Test in dark and light modes
- [ ] Verify color contrast >= 4.5:1
- [ ] Test hover states (should be instant)

---

## 📱 Responsive Design

All components are responsive. For custom layouts:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</div>
```

Or use BrutalistGrid with built-in responsive:

```jsx
<BrutalistGrid
  columns={3}
  responsiveColumns={{
    sm: 1,   // 1 column on small screens
    md: 2,   // 2 columns on medium
    lg: 3,   // 3 columns on large
    xl: 4    // 4 columns on extra large
  }}
>
  {items.map(item => <Card key={item.id}>{item}</Card>)}
</BrutalistGrid>
```

---

## 🎬 Animation Examples

### Simple Fade In
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3, ease: 'linear' }}
>
  Content
</motion.div>
```

### Staggered List
```jsx
import { staggerContainerVariant, staggerChildVariant } from '@/lib/brutalist/animation-presets';

<motion.ul
  initial="hidden"
  animate="visible"
  variants={staggerContainerVariant()}
>
  {items.map((item, i) => (
    <motion.li key={i} variants={staggerChildVariant}>
      {item}
    </motion.li>
  ))}
</motion.ul>
```

### Hover Scale (Abrupt - 0ms)
```jsx
<motion.button
  whileHover={{ scale: 0.98 }}
  transition={{ duration: 0 }}
>
  Click Me
</motion.button>
```

---

## 🔧 Utilities You Can Use

### Spacing
```jsx
import { irregularPadding, IRREGULAR_SPACINGS, IRREGULAR_GAPS } from '@/lib/brutalist/spacing-utils';

// Create custom irregular padding
const padding = irregularPadding(3, 4, 2, 5); // pt-3 pr-4 pb-2 pl-5

// Use presets
<div className={IRREGULAR_SPACINGS.default.padding}>
  Content
</div>

// Grid gaps
<div className={`grid grid-cols-3 ${IRREGULAR_GAPS.default}`}>
  Items
</div>
```

### Colors
```jsx
import { getColor, useBrutalistColors, TEXT_COLORS } from '@/lib/brutalist/color-utils';

// In component
const { borderColor, textColor, theme } = useBrutalistColors();

// In className
<div className={TEXT_COLORS.primary[theme]}>
  Themed text
</div>
```

### Animations
```jsx
import { 
  staggerContainerVariant,
  slideInLeftVariant,
  getStaggerDelay 
} from '@/lib/brutalist/animation-presets';

// Stagger items
const delay = getStaggerDelay(2); // 120ms for item at index 2

// Use preset variant
const variants = slideInLeftVariant;
```

---

## ❓ Common Issues

**Q: Colors not changing on theme switch?**
A: Make sure you use the `useTheme()` hook and CSS variables with `hsl(var(--brutalist-...))`.

**Q: Animations too smooth?**
A: Check that you're using `ease: 'linear'` and not easing functions like `ease-in-out`.

**Q: Borders not showing?**
A: Verify `border-[3px]` or higher is applied, and check if `rounded-none` is set.

**Q: Hover state is smooth?**
A: Add `transition={{ duration: 0 }}` to make hover instant (0ms).

---

## 📚 Documentation Files

Detailed documentation available:

1. **BRUTALIST_THEME_GUIDE.md** - Architecture & design system
2. **BRUTALIST_COLORS_COMPONENTS.md** - Color reference & component audit
3. **BRUTALIST_IMPLEMENTATION.md** - Integration guide & testing
4. **DELIVERABLES.md** - What was delivered
5. **QUICKSTART.md** - This file!

---

## 💪 You're Ready!

Start using the brutalist components now:

```jsx
import { BrutalistButton, BrutalistCard, BrutalistText } from '@/components/brutalist';

export default function Example() {
  return (
    <div className="p-20">
      <BrutalistText as="h1">
        Welcome to Brutalist Design
      </BrutalistText>
      <BrutalistCard>
        <BrutalistText as="p">
          Everything is theme-aware, accessible, and production-ready.
        </BrutalistText>
        <BrutalistButton variant="primary">
          Get Started
        </BrutalistButton>
      </BrutalistCard>
    </div>
  );
}
```

**Enjoy building with the brutalist design system! 🚀**

---

Last updated: May 5, 2026
