# 🎨 ReadnEX Design System - Quick Reference

## 🎯 Design Philosophy

**Vintage Library Aesthetic** - Inspired by old bookshops, aged manuscripts, and classic literature.

---

## 🎨 Color Palette

### Light Mode
```css
Background:    #faf8f1  (parchment-100)
Surface:       #f4ede4  (parchment-200)
Text:          #2d2d2d  (ink-900)
Primary:       #a82343  (burgundy-700)
Accent:        #dfb52f  (gold-leaf-400)
Success:       #4e6f5a  (forest-500)
```

### Dark Mode
```css
Background:    #1a1a1a  (ink-950)
Surface:       #3d3d3d  (ink-800)
Text:          #faf8f1  (parchment-100)
Primary:       #7a1e35  (burgundy-900)
Accent:        #865318  (gold-leaf-700)
Success:       #314538  (forest-700)
```

---

## ✍️ Typography

### Fonts
```css
/* Headings & Display */
font-family: 'Playfair Display', 'Cinzel', serif;

/* Body & UI Text */
font-family: 'Crimson Text', 'Merriweather', 'Georgia', serif;

/* Fallback Sans-Serif */
font-family: 'Inter', system-ui, sans-serif;
```

### Scale
| Size | Class | Pixels | Usage |
|------|-------|--------|-------|
| xs | `text-xs` | 12px | Captions, footnotes |
| sm | `text-sm` | 14px | Small labels |
| base | `text-base` | 16px | Body text |
| lg | `text-lg` | 18px | Lead paragraphs |
| xl | `text-xl` | 20px | Subheadings |
| 2xl | `text-2xl` | 24px | Section titles |
| 3xl | `text-3xl` | 30px | Card titles |
| 4xl | `text-4xl` | 36px | Page headings |
| 5xl | `text-5xl` | 48px | Hero titles |
| 6xl | `text-6xl` | 60px | Large displays |

### Weights
```tsx
font-light    // 300 - Subtle text
font-normal   // 400 - Body text
font-medium   // 500 - Emphasized text
font-semibold // 600 - Labels, buttons
font-bold     // 700 - Headings
font-extrabold// 800 - Display titles
```

---

## 🧩 Components

### VintageCard
```tsx
import { VintageCard, VintageCardHeader, VintageCardTitle, VintageCardContent } from '@/components/ui/vintage-card'

// Variants
<VintageCard variant="aged">      {/* Parchment colored */}
<VintageCard variant="paper">     {/* White/light */}
<VintageCard variant="manuscript"> {/* Darker, more contrast */}

// With ornate borders
<VintageCard ornate>

// Hover effect
<VintageCard hoverable>
```

### VintagePageHeader
```tsx
import VintagePageHeader from '@/components/VintagePageHeader'

<VintagePageHeader
  badge="Section Label"                    // Optional badge
  title="Page Title"                       // Required
  subtitle="Page description"              // Optional
  quote={{                                 // Optional
    text: "Quote text",
    author: "Author name"
  }}
>
  {/* Optional custom content */}
</VintagePageHeader>
```

### Buttons
```tsx
// Primary Button (Burgundy)
<Button className="bg-burgundy-700 hover:bg-burgundy-800 
                   dark:bg-burgundy-600 dark:hover:bg-burgundy-700 
                   text-parchment-50 font-serif">
  Button Text
</Button>

// Outline Button
<Button variant="outline" 
        className="border-burgundy-700 text-burgundy-700 
                   hover:bg-burgundy-50 font-serif">
  Button Text
</Button>

// Ghost Button
<Button variant="ghost" 
        className="text-burgundy-700 hover:bg-parchment-100 font-serif">
  Button Text
</Button>
```

### Icons
```tsx
// Standard Icon
<Icon className="h-5 w-5 text-burgundy-700 dark:text-gold-leaf-500" />

// Icon in Gold Circle
<div className="p-3 bg-gold-leaf-100 dark:bg-gold-leaf-900/30 rounded-full">
  <Icon className="h-6 w-6 text-burgundy-700 dark:text-gold-leaf-500" />
</div>

// Icon with Accent
<Icon className="h-6 w-6 text-gold-leaf-600 dark:text-gold-leaf-400" />
```

### Badges
```tsx
<Badge className="bg-burgundy-100 dark:bg-burgundy-900/30 
                 text-burgundy-800 dark:text-burgundy-300 
                 font-serif">
  Badge Text
</Badge>

<Badge className="bg-gold-leaf-100 dark:bg-gold-leaf-900/30 
                 text-gold-leaf-800 dark:text-gold-leaf-300 
                 font-serif">
  Badge Text
</Badge>
```

---

## 📐 Layout Patterns

### Page Structure
```tsx
export default function YourPage() {
  return (
    <div className="min-h-screen bg-parchment-50 dark:bg-ink-950">
      {/* Header */}
      <VintagePageHeader
        badge="Section"
        title="Page Title"
        subtitle="Description"
      />

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 
                          bg-parchment-100 dark:bg-ink-900">
        <div className="max-w-7xl mx-auto">
          {/* Content */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 
                          bg-parchment-50 dark:bg-ink-950">
        <VintageCard variant="manuscript" ornate>
          {/* CTA content */}
        </VintageCard>
      </section>
    </div>
  )
}
```

### Content Card
```tsx
<VintageCard variant="aged" ornate>
  <VintageCardHeader>
    <VintageCardTitle className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-gold-leaf-600" />
      Card Title
    </VintageCardTitle>
  </VintageCardHeader>
  <VintageCardContent>
    <p className="font-serif text-ink-700 dark:text-parchment-300">
      Card content here
    </p>
  </VintageCardContent>
</VintageCard>
```

### Form Layout
```tsx
<form onSubmit={handleSubmit} className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="field" className="font-serif">
      Field Label
    </Label>
    <Input
      id="field"
      className="bg-parchment-100 dark:bg-ink-800"
      placeholder="Enter value..."
    />
  </div>
  
  <Button type="submit" 
          className="w-full bg-burgundy-700 hover:bg-burgundy-800 
                     text-parchment-50 font-serif">
    Submit
  </Button>
</form>
```

---

## 🎭 Effects & Decorations

### Decorative Corners
```tsx
{/* Add to card for vintage corners */}
<div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-600" />
<div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-600" />
<div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-600" />
<div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-600" />
```

### Paper Texture Overlay
```tsx
<div className="absolute inset-0 opacity-10">
  <div className="absolute inset-0 bg-repeat" style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-width='0.5' opacity='0.2'%3E%3Cpath d='M0 40h80M40 0v80'/%3E%3C/g%3E%3C/svg%3E")`
  }} />
</div>
```

### Sepia Image Filter
```tsx
<img
  src={imageSrc}
  alt={alt}
  className="filter sepia-[0.15] saturate-[1.2]"
  style={{ filter: 'sepia(0.15) saturate(1.2)' }}
/>
```

---

## 🌓 Dark Mode Support

### Always include dark mode variants:
```tsx
// Backgrounds
className="bg-parchment-50 dark:bg-ink-950"
className="bg-parchment-100 dark:bg-ink-900"

// Text
className="text-ink-900 dark:text-parchment-100"
className="text-ink-700 dark:text-parchment-300"

// Borders
className="border-parchment-300 dark:border-ink-700"

// Accents
className="text-burgundy-700 dark:text-burgundy-400"
className="text-gold-leaf-600 dark:text-gold-leaf-400"
```

---

## 📱 Responsive Design

### Breakpoints
```tsx
sm:   640px  // Mobile landscape
md:   768px  // Tablet
lg:   1024px // Desktop
xl:   1280px // Large desktop
2xl:  1536px // Extra large
```

### Common Patterns
```tsx
// Responsive Grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Responsive Text
className="text-2xl md:text-4xl lg:text-5xl"

// Responsive Padding
className="px-4 sm:px-6 lg:px-8"
className="py-8 md:py-12 lg:py-20"

// Responsive Flex
className="flex flex-col sm:flex-row gap-4"
```

---

## 🎬 Animations

### Framer Motion Variants
```tsx
// Fade in from bottom
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

// Stagger children
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Usage
<motion.div {...fadeInUp}>
  Content
</motion.div>

<motion.div {...stagger}>
  {items.map((item, index) => (
    <motion.div key={index} {...fadeInUp}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Hover Effects
```tsx
// Card hover
<motion.div whileHover={{ y: -5, scale: 1.02 }}>

// Button hover
<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
```

---

## ✅ Checklist for New Pages

- [ ] Use `VintagePageHeader` for page header
- [ ] Set background: `bg-parchment-50 dark:bg-ink-950`
- [ ] Use `VintageCard` components for content blocks
- [ ] Apply vintage color palette (burgundy, gold-leaf, parchment, ink)
- [ ] Use serif fonts: `font-display` or `font-serif`
- [ ] Include dark mode variants for all colors
- [ ] Add responsive classes (sm:, md:, lg:)
- [ ] Use Framer Motion for animations
- [ ] Add decorative elements (corners, patterns)
- [ ] Test in both light and dark modes

---

## 🚫 Avoid

- ❌ Modern gradients (purple, blue, indigo)
- ❌ Sans-serif fonts for body text
- ❌ Bright neon colors
- ❌ Sharp, modern shadows
- ❌ Glowing effects (unless gold accent)
- ❌ Generic `Card` component (use `VintageCard`)
- ❌ Hardcoded colors (use Tailwind classes)

---

## 📚 Resources

- **Design Tokens:** `src/lib/design-tokens.ts`
- **Tailwind Config:** `tailwind.config.js`
- **VintageCard:** `src/components/ui/vintage-card.tsx`
- **VintagePageHeader:** `src/components/VintagePageHeader.tsx`

---

**Quick Tip:** When in doubt, look at `Home.tsx`, `Dashboard.tsx`, or `BookDetails.tsx` for reference implementations!

---

**Version:** 1.0  
**Last Updated:** 2025-01-30  
**Status:** Active