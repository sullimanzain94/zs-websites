---
name: Prime Lane Design System
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
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
  tertiary: '#f2cc00'
  on-tertiary: '#3a3000'
  tertiary-container: '#d2b100'
  on-tertiary-container: '#534400'
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
  tertiary-fixed: '#ffe16d'
  tertiary-fixed-dim: '#e9c400'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#544600'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-lg:
    fontFamily: Chivo
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Chivo
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  section-gap: 80px
  container-padding: 24px
  gutter: 16px
---

## Brand & Style

This design system embodies a **High-Contrast / Bold** aesthetic with strong **Tactile** influences, designed specifically for the premium automotive and finance sector. The brand personality is authoritative, luxurious, and high-impact, evoking a sense of prestige and immediate reliability.

The visual narrative is driven by the contrast between deep, light-absorbing blacks and lustrous metallic finishes. It targets high-intent customers who value quality and "The Way To Go" status. The interface should feel like the cockpit of a luxury vehicle: dark, focused, and gleaming with precision-engineered details.

## Colors

The palette is strictly dark-mode to maintain a premium automotive atmosphere.

*   **Primary (Metallic Gold):** Used for key calls to action, borders of high-priority containers, and accent icons. It represents the "Gold Standard" of service.
*   **Secondary (Brushed Chrome/Silver):** Primarily used for secondary headers and hardware-like UI accents. It provides a technical, sophisticated contrast to the gold.
*   **Neutrals:** The background uses a "Deep Obsidian" (#0A0A0A) rather than pure black to allow for subtle depth and texture.
*   **Accents:** High-intensity gold (#FFD700) is reserved for small "glint" highlights and critical interactive states.

## Typography

The typography strategy focuses on a "Power Serif-less" approach, using bold, geometric sans-serifs to convey modern luxury.

*   **Headlines:** Utilize **Montserrat** for its architectural stability and bold weights. Key display text should utilize a metallic CSS gradient (Gold or Silver) to mimic the logo's high-impact finish.
*   **Body:** **Work Sans** provides a grounded, professional readability for finance terms and vehicle specifications.
*   **Labels/Data:** **Chivo** is used for technical specs and labels, offering a sharp, confident tone.

All headlines should lean into uppercase styling to maintain the "The Way To Go" authority found in the brand's primary marketing materials.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop (12 columns, 1200px max-width) to ensure the high-impact visual assets remain framed like a gallery. 

*   **Rhythm:** An 8px base unit drives all spacing.
*   **Margins:** Generous section gaps (80px+) are required to provide the "breathing room" associated with luxury brands.
*   **Mobile:** On mobile, the layout shifts to a single column with 16px margins. High-impact cards may bleed to the edges to maximize the visual scale of vehicle imagery.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and **Glint Highlights**.

*   **Surfaces:** Use slightly lighter grey-blacks (Obsidian) to lift containers off the pure black background.
*   **Borders:** Instead of heavy shadows, use 1px or 2px "Metallic Gold" borders to define primary cards. 
*   **Glow:** Apply a subtle "Atmospheric Glow" (outer glow) to primary buttons and active containers, using a low-opacity gold (#D4AF37 at 20%) to simulate a light source hitting a metallic surface.
*   **Dividers:** Horizontal rules should be thin, using a gold-to-transparent linear gradient.

## Shapes

The shape language is **Soft (0.25rem)**, leaning towards architectural precision. 

*   **Corner Radii:** Avoid overly rounded "bubbly" corners. The preferred radius is 4px for small elements and 8px for large containers. 
*   **Geometric Accents:** Incorporate hexagonal or angled motifs in icons and decorative frames, echoing the "PLM" shield.
*   **Bevels:** For primary call-to-action buttons, a subtle inner-bevel effect can be used to reinforce the metallic, tactile feel.

## Components

*   **Buttons:** Primary buttons feature a vertical "Gold-to-Brass" gradient with bold, uppercase Montserrat text. Hover states should increase the "glint" intensity.
*   **Cards:** Finance and car cards use a dark obsidian background with a 1px gold border. Headers within cards should be in metallic silver.
*   **Input Fields:** Ghost-style inputs with a silver bottom-border only. On focus, the border transitions to a glowing gold.
*   **Chips/Badges:** Small, pill-shaped elements with gold outlines and silver text, used for "Verified" or "Premium" statuses.
*   **Iconography:** Use "Stroke-style" icons with a consistent 2px weight, rendered in Primary Gold. Icons should be housed in subtle hexagonal containers when used for primary features.
*   **Section Headers:** Accompanied by a gold horizontal "speed line" that anchors the text to the left or center of the grid.