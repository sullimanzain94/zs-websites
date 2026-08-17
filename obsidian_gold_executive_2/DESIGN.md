---
name: Obsidian Gold Executive
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#343535'
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
  surface-tint: '#eac249'
  primary: '#ffe9b0'
  on-primary: '#3d2f00'
  primary-container: '#f2ca50'
  on-primary-container: '#6b5500'
  inverse-primary: '#745b00'
  secondary: '#c8c6c5'
  on-secondary: '#303030'
  secondary-container: '#474746'
  on-secondary-container: '#b6b5b4'
  tertiary: '#ebeaea'
  on-tertiary: '#2f3131'
  tertiary-container: '#cfcece'
  on-tertiary-container: '#575858'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe08a'
  primary-fixed-dim: '#eac249'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574400'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1c1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
  surface-obsidian: '#121414'
  gold-accent: '#f2ca50'
  gold-dim: '#d4af37'
  metallic-silver: '#c8c6c5'
typography:
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
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
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system embodies the "Private Concierge" aesthetic of high-end automotive excellence. It targets high-net-worth individuals and the executive teams who serve them, evoking a sense of prestige, precision, and absolute trust. 

The visual style is a blend of **Minimalism and Glassmorphism**, rooted in a "Modern Corporate" framework. It mirrors the experience of a luxury vehicle’s digital cockpit: deep obsidian surfaces, brushed metallic accents, and warm gold illumination. The interface feels expensive, responsive, and curated, avoiding standard tech aesthetics in favor of a bespoke automotive atmosphere.

## Colors

This is a dark-first design system. The palette is anchored by **Obsidian (#121414)**, which serves as the primary background to minimize eye strain and maximize the "premium" feel.

- **Primary (Executive Gold):** Used for high-priority calls to action, active states, and critical status indicators. It should appear luminous and metallic against the dark backdrop.
- **Secondary (Metallic Silver):** Used for supporting text and subtle UI icons to provide a brushed-metal feel.
- **Surface Tiers:** Progressive charcoal tones define hierarchy. Higher-elevation elements use lighter shades of slate to create depth without relying on heavy borders.
- **Communication Status:** Muted gold signifies "Delivered" states, while a glowing, brilliant gold indicates "Read" receipts.

## Typography

The typography strategy balances automotive prestige with technical clarity.

- **Headlines:** Use **Manrope** for its geometric, sophisticated proportions. It reflects engineering excellence and luxury branding.
- **Body:** **Inter** is utilized for high-density information in the Lead Command Centre, ensuring maximum readability for long conversation threads and data lists.
- **Technical Data:** **JetBrains Mono** is reserved for timestamps, VIN numbers, and status labels. This monospaced choice adds a "technical dashboard" feel, signaling data precision.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model to simulate a professional cockpit environment.

- **Grid System:** A 12-column grid for desktop views with generous 32px gutters to allow the high-end imagery and data to breathe.
- **Sidebar:** Navigation and utility sidebars remain fixed-width to maintain a sturdy structural anchor.
- **Content Area:** The central thread or data view is fluid, adapting to fill the available space.
- **Rhythm:** A strict 4px baseline grid ensures tight vertical alignment. On mobile, margins reduce to 16px, and interaction density increases through the use of bottom sheets for rapid action selection.

## Elevation & Depth

Depth is communicated through **Tonal Layering** and **Micro-Glows** rather than standard drop shadows.

- **Surface Layering:** Elements closer to the user are rendered in lighter charcoal shades (`surface-bright`). The background remains `surface-obsidian`.
- **Inner Glows:** To simulate the edges of machined metal, use 1px inner borders with low-opacity white (10%) or gold (15%).
- **Glassmorphism:** Apply to global headers and floating message bars. Use a heavy backdrop blur (20px) with a subtle 5% white tint to maintain visibility against the dark thread without losing the sense of depth.

## Shapes

The shape language is **"Soft Industrial."** We avoid circular or organic shapes to maintain a professional automotive aesthetic.

- **Structural Elements:** Cards and primary containers use 8px (`rounded-lg`) corners, echoing the precision-cut lines of luxury vehicle interiors.
- **Interactive Elements:** Buttons and input fields use a consistent 8px radius.
- **Messaging:** Conversation bubbles are tail-less. Dealer messages use a subtle gold "glow-border" (1px), while client messages use a tonal grey fill to distinguish participants.

## Components

- **Buttons:** Primary actions use a subtle linear gradient (Gold to Deep Gold) with black text for high legibility. Secondary actions use "Ghost" styling with a 1px Gold border.
- **Status Chips:** Small, monospaced labels using JetBrains Mono. Include a "status dot" (e.g., a glowing Gold dot for 'Priority' or 'Read').
- **Input Fields:** Darker than the container surface with a 1px bottom-border that illuminates to Gold on focus.
- **Lead Cards:** Borderless cards with a subtle tonal lift. A vertical 4px accent line on the left edge categorizes the lead (e.g., Sales, Service).
- **Glass Headers:** Sticky navigation bars must utilize backdrop-blur and a subtle bottom-border to separate from the content scroll.
- **Message Thread:** Dealer responses are distinguished by an Obsidian background and a subtle gold outer glow; Client responses are tonal grey.