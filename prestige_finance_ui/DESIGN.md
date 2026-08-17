---
name: Prestige Finance UI
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c6c6c6'
  on-secondary: '#2f3131'
  secondary-container: '#484949'
  on-secondary-container: '#b8b8b8'
  tertiary: '#d0cdcd'
  on-tertiary: '#313030'
  tertiary-container: '#b4b2b2'
  on-tertiary-container: '#454544'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is built on a foundation of "Elite Trust." It targets high-intent automotive buyers seeking professional financial assistance. The brand personality is authoritative yet welcoming, using a high-end dark aesthetic to signify exclusivity and stability.

This design system utilizes a **Corporate / Modern** style infused with **Glassmorphism**. By combining deep, obsidian backgrounds with metallic accents and subtle translucency, the UI evokes the feeling of a luxury car dashboard or a premium banking terminal. The visual narrative emphasizes transparency through clean lines and precision-engineered layouts, ensuring the complex financial process feels manageable and high-end.

## Colors

The palette is rooted in a deep "Obsidian Black" base to provide maximum contrast for the metallic accents. 

- **Primary (Metallic Gold):** Used for primary calls to action, active states, and critical highlights. It represents value and success.
- **Secondary (Silver/Platinum):** Used for supportive icons, secondary text, and borders to create a technical, high-performance feel.
- **Surface Tiers:** Use varying depths of dark grey (from #0D0D0D to #262626) to define hierarchy without relying on harsh lines.
- **Accessibility:** Text on dark surfaces must maintain a minimum contrast ratio of 4.5:1. Use pure white for body text and a slightly muted silver for secondary descriptions.

## Typography

Montserrat is the exclusive typeface for the design system. Its geometric construction provides a modern, architectural feel that aligns with automotive engineering.

- **Headlines:** Use Bold or Extra-Bold weights. For display text, use tight letter-spacing to create a "machined" look.
- **Labels:** Always use semi-bold or bold weights with increased letter-spacing and uppercase styling for a professional, "instrument-cluster" aesthetic.
- **Readability:** On dark backgrounds, avoid thin weights to prevent "haloing" and light-bleed, which can reduce legibility. Stick to Regular (400) as the minimum weight for body copy.

## Layout & Spacing

The design system employs a **Fluid Grid** model with a 12-column structure for desktop and a 4-column structure for mobile.

- **Rhythm:** All spacing is based on an 8px base unit. 
- **Safe Margins:** Use generous 40px margins on desktop to allow the "premium" aesthetic to breathe. On mobile, reduce to 16px to maximize content space for forms.
- **Density:** Financial forms should use "Comfortable" vertical spacing (24px - 32px between fields) to reduce cognitive load and prevent the interface from feeling cluttered.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and **Glassmorphism**.

- **Surface Levels:** The background is the lowest level. Cards and containers use a slightly lighter grey with a subtle 1px "Silver" border at 10% opacity.
- **Glass Effects:** For sticky navigation and overlays, use a backdrop blur (20px) with a semi-transparent black fill (70% opacity). This maintains context while ensuring text remains legible.
- **Shadows:** Use extremely soft, large-radius shadows (Blur: 40px, Y: 20px) with a 40% black opacity. Avoid "heavy" shadows; the depth should feel like light interacting with dark glass.

## Shapes

The shape language is **Soft (0.25rem)**. This subtle rounding suggests precision and technological sophistication, avoiding the overly "bubbly" look of high-radius corners which can feel less professional in a financial context.

Buttons and input fields follow this 4px standard, while larger benefit cards may scale up to 8px (rounded-lg) to create a softer visual container for large blocks of information.

## Components

### Multi-Step Forms
Forms should feature a "Progress Track" at the top using Gold for completed steps and Silver for upcoming ones. Each step is housed in a single, centered card to maintain focus. Use "Validation Glow"—where fields glow Gold on focus and Red on error.

### Benefit Cards
Cards that highlight "Why Finance With Us?" should feature a Gold icon (top-left) and a 1px Gold-to-Transparent gradient border. Backgrounds should be 5% lighter than the main page background.

### Sticky Mobile Navigation
The mobile navigation is a bottom-docked glass bar. It features four primary actions: Home, Finance App, Inventory, and Profile. The "Finance App" (the primary CTA) is elevated with a circular Gold background that breaks the top plane of the nav bar.

### Buttons
- **Primary:** Solid Gold background with Black text. Bold weight.
- **Secondary:** Transparent background with a 2px Silver border and White text.
- **Ghost:** No background/border, Gold text, used for "Back" or "Cancel" actions.

### Input Fields
Inputs use a dark "Well" style—slightly darker than the card background—with a 1px Silver border that transitions to Gold on focus. Labels are always placed above the field in uppercase Label-MD style.