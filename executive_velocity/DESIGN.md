---
name: Executive Velocity
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#383939'
  surface-container-lowest: '#0d0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2a'
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
  secondary: '#c4c7ca'
  on-secondary: '#2d3134'
  secondary-container: '#46494d'
  on-secondary-container: '#b6b8bc'
  tertiary: '#cdcece'
  on-tertiary: '#2e3131'
  tertiary-container: '#b1b3b3'
  on-tertiary-container: '#434545'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e0e2e6'
  secondary-fixed-dim: '#c4c7ca'
  on-secondary-fixed: '#191c1f'
  on-secondary-fixed-variant: '#44474a'
  tertiary-fixed: '#e1e3e2'
  tertiary-fixed-dim: '#c5c7c6'
  on-tertiary-fixed: '#191c1c'
  on-tertiary-fixed-variant: '#444747'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  button-text:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '700'
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
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 80px
---

## Brand & Style

This design system is engineered for the premium automotive finance sector, where trust meets high-performance. The brand personality is **authoritative, prestigious, and efficient**. It is designed to evoke the feeling of stepping into a luxury showroom—quietly confident, meticulously organized, and technologically advanced.

The visual style is **Modern Corporate with Tactile Accents**. We utilize a deep, dark canvas to allow "Executive Gold" and metallic elements to pop with high-conversion intent. While the overall structure is clean and professional (Modern), we incorporate subtle metallic gradients and high-fidelity lighting effects (Tactile) to mirror the physical beauty of luxury vehicles. This duality ensures the public-facing site feels aspirational while the internal Command Centre remains a focused, high-utility tool.

## Colors

The palette is anchored in **Deep Obsidian (#121414)**, providing a sophisticated, low-fatigue background for both customers and internal sales agents. 

- **Executive Gold (#D4AF37):** Reserved exclusively for primary actions, success states, and key branding moments. It should be used sparingly to maintain its premium "reward" status.
- **Metallic Silver & Chrome:** Used for secondary typography and decorative borders to create depth without the visual weight of solid colors.
- **Surface Tiers:** Use **#1E2121** for cards and containers to create a subtle lift from the background.
- **Status Colors:** Use a muted emerald for approvals and a deep crimson for alerts, ensuring they are always paired with high-contrast white text for accessibility.

## Typography

The typography system uses a hierarchical "Power Pair": **Manrope** for assertive headlines and **Inter** for utilitarian body text.

- **Headlines:** Use Bold and Extra Bold weights. Large display sizes should use tighter letter spacing to emulate automotive branding.
- **Body Text:** Prioritize readability. In the Command Centre, use **Inter Regular** for data entries to maintain a clean, grid-like feel.
- **Data Labels:** **JetBrains Mono** is introduced for technical data, VIN numbers, and financial figures to provide a "precision instrument" feel.
- **Hierarchy:** Maintain a clear contrast between gold-tinted headlines and silver-tinted subtext to guide the user's eye toward conversion points.

## Layout & Spacing

The design system utilizes a **12-column fluid grid** with generous 24px gutters. 

- **Philosophy:** Emphasize whitespace to evoke a sense of "Luxury Space." Content should never feel cramped.
- **Desktop:** Elements should be center-aligned within a 1280px container for marketing pages. The Command Centre may use a full-width fluid layout to maximize data density.
- **Mobile-First:** All financial calculators and application forms must stack vertically with a minimum touch target of 48px.
- **Rhythm:** Use an 8px base grid. Components should use multiples of 8px for internal padding (16px, 24px, 32px) to ensure mathematical harmony across all screen sizes.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** and **Atmospheric Lighting**.

- **Surfaces:** We avoid traditional heavy shadows. Instead, we use "Inner Glows" and "Rim Lighting." Cards should have a 1px border of `rgba(255, 255, 255, 0.1)` to define their edges against the obsidian background.
- **Active State:** When a user interacts with a card, apply a subtle **Executive Gold** outer glow (5px blur, 20% opacity) to simulate a light source hitting a metallic surface.
- **Modals:** Use a Backdrop Blur (12px) with a 60% black tint to maintain context while focusing on the task at hand. This creates a "Glassmorphism" effect that feels like a darkened car window.

## Shapes

The shape language is **Soft (0.25rem)**. 

While the automotive world often uses curves, this design system uses "Tailored Corners"—sharp enough to look professional and engineered, but slightly softened to feel modern and accessible. 

- **Standard Radius:** 4px (Soft) for buttons and input fields.
- **Large Radius:** 8px for containers and cards.
- **Interactive Elements:** Maintain consistent corner radii across all form elements to reinforce the "Command Centre" aesthetic.

## Components

### Buttons
- **Primary:** Solid **Executive Gold** with black text. Use a subtle linear gradient (Top: #D4AF37 to Bottom: #B69121) to give it a metallic sheen.
- **Secondary:** Transparent with a 1px **Metallic Silver** border and white text.
- **Ghost:** No border, Silver text, turns Gold on hover.

### Input Fields
- Dark backgrounds (#1E2121) with 1px Silver borders.
- Labels use **JetBrains Mono** in all-caps for a technical, high-end feel.
- Focus state: Border changes to Gold with a 2px inner-shadow.

### Cards & Stats (Command Centre)
- Use high-contrast typography for large numbers.
- Metrics should be paired with a small 24x24px Gold icon.
- Borders should be minimal; use background color shifts to define areas.

### Progress Bars (Finance Flow)
- Track: Deep Charcoal.
- Fill: Executive Gold gradient.
- Indicate "Trust" by including small padlock icons or "Bank-Grade Security" labels near sensitive inputs.