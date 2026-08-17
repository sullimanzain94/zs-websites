# Prime Lane Motors - Final CSS Variables

These CSS variables are derived from the 'Obsidian Gold Executive' ({{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_1}}) and 'Executive Velocity' ({{DATA:DESIGN_SYSTEM:DESIGN_SYSTEM_2}}) design systems, representing the premium production-ready tokens for the Prime Lane Motors platform.

## Color Tokens (Obsidian Gold Theme)

```css
:root {
  /* Surface Colors */
  --color-surface: #121414;
  --color-surface-dim: #121414;
  --color-surface-bright: #383939;
  --color-surface-container-lowest: #0d0f0f;
  --color-surface-container-low: #1a1c1c;
  --color-surface-container: #1e2020;
  --color-surface-container-high: #282a2a;
  --color-surface-container-highest: #333535;
  --color-surface-variant: #333535;

  /* On-Surface Colors (Text/Icons) */
  --color-on-surface: #e2e2e2;
  --color-on-surface-variant: #d0c5af;
  --color-inverse-on-surface: #2f3131;
  --color-inverse-surface: #e2e2e2;

  /* Primary Brand (Executive Gold) */
  --color-primary: #f2ca50;
  --color-primary-container: #d4af37;
  --color-on-primary: #3c2f00;
  --color-on-primary-container: #554300;
  --color-primary-fixed: #ffe088;
  --color-primary-fixed-dim: #e9c349;
  --color-on-primary-fixed: #241a00;
  --color-on-primary-fixed-variant: #574500;
  --color-inverse-primary: #735c00;
  --color-surface-tint: #e9c349;

  /* Secondary Neutral */
  --color-secondary: #c4c7ca;
  --color-secondary-container: #46494d;
  --color-on-secondary: #2d3134;
  --color-on-secondary-container: #b6b8bc;
  --color-secondary-fixed: #e0e2e6;
  --color-secondary-fixed-dim: #c4c7ca;
  --color-on-secondary-fixed: #191c1f;
  --color-on-secondary-fixed-variant: #44474a;

  /* Tertiary */
  --color-tertiary: #cdcece;
  --color-tertiary-container: #b1b3b3;
  --color-on-tertiary: #2e3131;
  --color-on-tertiary-container: #434545;

  /* Error/Feedback */
  --color-error: #ffb4ab;
  --color-error-container: #93000a;
  --color-on-error: #690005;
  --color-on-error-container: #ffdad6;

  /* Outlines */
  --color-outline: #99907c;
  --color-outline-variant: #4d4635;

  /* Background */
  --color-background: #121414;
  --color-on-background: #e2e2e2;
}
```

## Typography & Spacing

```css
:root {
  /* Font Family */
  --font-main: 'Manrope', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Roundness */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Layout Spacing */
  --spacing-unit: 8px;
  --section-gap: 80px;
  --margin-desktop: 64px;
  --margin-mobile: 16px;
  --gutter: 24px;
  --container-max: 1280px;
}
```

## Special Effects

```css
.executive-gold-gradient {
  background: linear-gradient(180deg, #D4AF37 0%, #B69121 100%);
}

.glass-panel {
  background: rgba(30, 32, 32, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-inner-glow {
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
}
```