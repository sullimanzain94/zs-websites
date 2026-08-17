---
name: Obsidian Gold Executive
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#383939'
  surface-container-lowest: '#0d0e0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#292a2a'
  surface-container-highest: '#343535'
  on-surface: '#e3e2e2'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e3e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#d0cdcd'
  on-tertiary: '#303030'
  tertiary-container: '#b4b2b2'
  on-tertiary-container: '#454545'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#121414'
  on-background: '#e3e2e2'
  surface-variant: '#343535'
typography:
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system for Prime Lane Motors embodies a "Private Concierge" aesthetic, targeting high-net-worth automotive clients. The visual language is rooted in **Modern Minimalism with a Tactile twist**, utilizing deep obsidian surfaces to create a sense of exclusivity and prestige. 

The emotional response is one of absolute trust and precision. Every interaction should feel like a high-end physical dashboard—expensive, responsive, and curated. We avoid standard corporate "blue" in favor of a palette that mirrors luxury vehicle interiors: deep blacks, brushed metals, and warm gold illumination.

## Colors
The palette is centered on **Obsidian (#0A0A0A)** for the primary background to minimize eye strain and maximize the "premium" feel. 

- **Primary (Metallic Gold):** Used sparingly for calls to action, active states, and high-priority status indicators. It should feel luminous against the dark backdrop.
- **Secondary/Tertiary:** Variations of charcoal and deep slate to define hierarchy without using borders.
- **Communication Status:** We move away from standard green/blue. "Delivered" is represented by a muted gold, while "Read" elevates to a brilliant, glowing gold.
- **Template Categories:** Distinct subtle accents used for categorizing automated flows—Sales, Service, and General Follow-up.

## Typography
The typography strategy blends modern precision with technical clarity.

- **Headlines:** Use **Manrope** for its balanced, geometric, yet sophisticated proportions. It reflects the engineering excellence of the automotive industry.
- **Body:** **Hanken Grotesk** provides high legibility for long conversation threads, maintaining a clean and contemporary feel.
- **Labels & Metadata:** **JetBrains Mono** is utilized for timestamps, status labels, and technical data points (VIN numbers, lead IDs). This adds a "technical dashboard" feel to the interface, signaling precision and data-driven professionalism.

## Layout & Spacing
The layout follows a **Fixed-Fluid Hybrid** model. The sidebar and navigation are fixed-width to maintain a sturdy "cockpit" feel, while the central communication thread is fluid.

- **Grid:** 12-column grid for desktop views with wide 32px gutters to allow the UI to breathe.
- **Rhythm:** A 4px baseline grid ensures tight vertical alignment.
- **Mobile:** Margins shrink to 16px. Heavy use of bottom sheets for template selection and contact filtering to keep the thumb-zone clear for rapid communication.

## Elevation & Depth
In this dark-mode centric system, depth is communicated through **Tonal Layering** and **Micro-Glows** rather than traditional shadows.

- **Surfaces:** Use progressive lightening of the background color. The further "forward" an element is, the lighter its charcoal tone becomes.
- **Inner Glows:** To simulate metallic edges, use 1px inner borders with a 10% opacity white or gold.
- **Glassmorphism:** Apply to floating headers and the message input bar using a heavy backdrop blur (20px) and a subtle 5% white tint to maintain visibility against the dark thread.

## Shapes
The shape language is **"Soft Industrial."** We avoid overly rounded or "bubbly" elements to maintain a professional, high-end automotive aesthetic.

- **Primary Containers:** 4px radius (Soft) to echo the precision-cut lines of a luxury car's interior panels.
- **Interactive Elements:** Buttons and input fields use the same 4px radius. 
- **Message Bubbles:** Tail-less bubbles with slightly higher rounding (8px) on the outer corners to distinguish conversational content from the structural UI.

## Components
- **Buttons:** Primary buttons use a linear gradient (Gold to Deep Gold) with black text for maximum contrast. Secondary buttons are "Ghost" style with a 1px gold border.
- **Status Chips:** Small, monospaced labels using JetBrains Mono. Use a "dot" indicator next to the text (e.g., a glowing Gold dot for 'Read').
- **Input Fields:** Darker than the background surface with a 1px bottom-border that illuminates to Gold on focus.
- **Cards:** Used for Lead summaries. Cards should have no border, only a subtle tonal lift and a vertical accent line on the left edge colored by the `template_token` category.
- **Message Thread:** Client messages are tonal grey; dealer messages are obsidian with a subtle gold glow-border.
- **Status Indicators:** Integrated directly into the message timestamp, using the metallic gold tokens for delivered/read receipts.