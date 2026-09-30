# Prime Lane Motors - Gradient Utilities Quick Reference

## Files Created

```
assets/
├── gradients.css              # CSS utility classes
├── utils/
│   └── gradients.js           # JavaScript module
├── gradients-config.json      # Configuration & presets
└── GRADIENTS.md               # Full documentation
```

## Quick Start

### Option 1: CSS Classes (Easiest)

```html
<!-- Text Gradients -->
<h1 class="gradient-text-gold-white">Headline</h1>
<p class="gradient-text-white-silver">Subtitle</p>

<!-- Background Gradients -->
<button class="gradient-bg-primary">Apply Now</button>
<div class="gradient-bg-gold-dark">Content</div>

<!-- Effects -->
<div class="gradient-animated gradient-tri-color">Animated</div>
<div class="gradient-hover-lift gradient-bg-primary">Hover Me</div>
```

### Option 2: JavaScript (Programmatic)

```javascript
// Apply preset gradients
const element = document.querySelector('h1');
GradientUtils.applyPreset(element, 'textGradients', 'goldToWhite');

// Custom gradient
GradientUtils.applyTextGradient(element, '#f2ca50', '#ffffff');

// Multi-stop gradient
GradientUtils.applyMultiStopGradient(element, '90deg', [
  { color: '#fff', stop: 0 },
  { color: '#f2ca50', stop: 50 },
  { color: '#121414', stop: 100 }
], 'text');
```

## All Available Classes

### Text Gradients
- `.gradient-text-white-silver` - White to silver
- `.gradient-text-gold-white` - Gold to white
- `.gradient-text-gold-dim` - Gold to dim
- `.gradient-text-diagonal` - Diagonal 135°

### Background Gradients
- `.gradient-bg-primary` - Gold gradient
- `.gradient-bg-gold-dark` - Gold to dark
- `.gradient-bg-obsidian-surface` - Subtle depth
- `.gradient-bg-subtle` - Light accent

### Directional
- `.gradient-rtl` - Right to left
- `.gradient-ttb` - Top to bottom
- `.gradient-btt` - Bottom to top
- `.gradient-diagonal-135` - Diagonal 135°
- `.gradient-diagonal-45` - Diagonal 45°

### Multi-Color
- `.gradient-tri-color` - Three colors
- `.gradient-rainbow-gold` - Multi-stop

### Effects
- `.gradient-animated` - Animated shift
- `.gradient-hover-lift` - Hover lift effect
- `.gradient-overlay-dark` - Dark overlay
- `.gradient-overlay-gold` - Gold overlay

### Intensity
- `.gradient-intensity-light` - 60% opacity
- `.gradient-intensity-medium` - 85% opacity
- `.gradient-intensity-strong` - 100% opacity

## PLM Colors Available

```javascript
GradientUtils.getPlmColor('gold')        // #f2ca50
GradientUtils.getPlmColor('goldDim')     // #d4af37
GradientUtils.getPlmColor('obsidian')    // #121414
GradientUtils.getPlmColor('surface')     // #282a2a
GradientUtils.getPlmColor('silver')      // #c8c6c5
GradientUtils.getPlmColor('white')       // #ffffff
GradientUtils.getPlmColor('onSurface')   // #e2e2e2
GradientUtils.getPlmColor('variant')     // #d0c5af
```

## Preset Gradients

### Text Gradients
- `whiteToSilver` - Subtle highlight
- `goldToWhite` - Premium headings
- `goldToDim` - Accent text
- `diagonal` - Dynamic effect

### Background Gradients
- `primary` - CTA & buttons
- `goldToDark` - Dramatic transitions
- `obsidianSurface` - Subtle depth
- `subtle` - Light accents

## Common Patterns

### Premium Button
```html
<button class="gradient-bg-primary gradient-hover-lift px-6 py-3 rounded-lg font-bold">
  Apply for Finance
</button>
```

### Hero Heading
```html
<h1 class="gradient-text-gold-white text-4xl font-bold">
  Prime Lane Motors
</h1>
```

### Animated Section
```html
<section class="gradient-animated gradient-tri-color p-12 rounded-xl">
  Content with animated gradient
</section>
```

### Gradient Overlay
```html
<div class="gradient-overlay-dark relative">
  <img src="..." alt="..." />
</div>
```

## JavaScript API Methods

| Method | Purpose |
|--------|---------|
| `applyTextGradient()` | Apply text gradient |
| `applyBackgroundGradient()` | Apply background gradient |
| `applyPreset()` | Apply preset gradient |
| `generateLinearGradient()` | Generate gradient CSS |
| `generateRadialGradient()` | Generate radial gradient |
| `generateMultiStopGradient()` | Multi-stop gradient |
| `applyAnimatedGradient()` | Animated gradient |
| `applyGradientOverlay()` | Gradient overlay |
| `applyMultiStopGradient()` | Apply multi-stop |
| `getPlmColor()` | Get PLM color |

## Integration Checklist

- ✅ CSS file included in HTML: `<link rel="stylesheet" href="assets/gradients.css">`
- ✅ JS file included in HTML: `<script src="assets/utils/gradients.js"></script>`
- ✅ Can use CSS classes immediately
- ✅ Can use JavaScript API for dynamic gradients
- ✅ Works with Tailwind CSS classes

## Tips

1. **Combine CSS classes** with Tailwind for powerful styling
2. **Use presets** for consistency across the site
3. **Test contrast** when using text gradients
4. **Browser testing** - gradients work on all modern browsers
5. **Performance** - CSS classes are faster than JavaScript

## Examples in Your Project

The `text-gradient` class in your original code can now be replaced with:
- CSS: `class="gradient-text-white-silver"`
- JavaScript: `GradientUtils.applyTextGradient(element, '#ffffff', '#c8c6c5')`

## Need Help?

- See `assets/GRADIENTS.md` for complete documentation
- Check `assets/gradients-config.json` for all presets
- View `assets/gradients.css` for CSS source
- Explore `assets/utils/gradients.js` for JavaScript source

---

**Created for Prime Lane Motors - VW Finance Lead Generation Platform**
