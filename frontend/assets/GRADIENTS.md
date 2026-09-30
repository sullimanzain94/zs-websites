# Prime Lane Motors - Gradient Utilities Documentation

A comprehensive gradient system for consistent, reusable gradient styling across the Prime Lane Motors website.

## Overview

The gradient utilities system provides:
- **CSS Utility Classes** - Ready-to-use gradient classes
- **JavaScript Module** - Programmatic gradient application
- **Configuration** - Centralized gradient definitions
- **Presets** - Common gradient patterns

## Files

| File | Purpose |
|------|---------|
| `assets/gradients.css` | CSS utility classes for gradients |
| `assets/utils/gradients.js` | JavaScript utility functions |
| `assets/gradients-config.json` | Gradient presets and configuration |
| `GRADIENTS.md` | This documentation |

## Color Palette

```
Primary Gold:      #f2ca50
Primary Gold Dim:  #d4af37
Obsidian:          #121414
Surface:           #282a2a
Silver:            #c8c6c5
White:             #ffffff
On Surface:        #e2e2e2
Variant:           #d0c5af
```

## CSS Utility Classes

### Text Gradients

#### `.gradient-text-white-silver`
White to silver text gradient (left to right)
```html
<h2 class="gradient-text-white-silver">Premium Content</h2>
```

#### `.gradient-text-gold-white`
Gold to white text gradient (left to right)
```html
<h1 class="gradient-text-gold-white">Headline</h1>
```

#### `.gradient-text-gold-dim`
Gold to dim gold text gradient (left to right)
```html
<span class="gradient-text-gold-dim">Accent Text</span>
```

#### `.gradient-text-diagonal`
Diagonal text gradient (135 degrees)
```html
<h3 class="gradient-text-diagonal">Dynamic Text</h3>
```

### Background Gradients

#### `.gradient-bg-primary`
Gold gradient button and CTA backgrounds
```html
<button class="gradient-bg-primary">Apply for Finance</button>
```

#### `.gradient-bg-gold-dark`
Gold fading to dark for dramatic transitions
```html
<div class="gradient-bg-gold-dark">Content</div>
```

#### `.gradient-bg-obsidian-surface`
Subtle depth gradient
```html
<section class="gradient-bg-obsidian-surface">Section</section>
```

#### `.gradient-bg-subtle`
Subtle accent overlay
```html
<div class="gradient-bg-subtle">Subtle Background</div>
```

### Directional Gradients

- `.gradient-rtl` - Right to left
- `.gradient-ttb` - Top to bottom
- `.gradient-btt` - Bottom to top
- `.gradient-diagonal-135` - 135-degree diagonal
- `.gradient-diagonal-45` - 45-degree diagonal

### Multi-Color Gradients

#### `.gradient-tri-color`
Three-color gradient: Gold → Silver → Obsidian
```html
<div class="gradient-tri-color">Three Color Effect</div>
```

#### `.gradient-rainbow-gold`
Multi-color gradient: White → Gold → Dim Gold → Obsidian
```html
<div class="gradient-rainbow-gold">Multi-Color</div>
```

### Effects

#### `.gradient-hover-lift`
Hover effect with lift and brightness increase
```html
<div class="gradient-hover-lift gradient-bg-primary">Hover Me</div>
```

#### `.gradient-animated`
Continuously shifting gradient animation
```html
<div class="gradient-animated gradient-tri-color">Animated Gradient</div>
```

### Overlays

#### `.gradient-overlay-dark`
Dark gradient overlay from transparent to dark
```html
<div class="gradient-overlay-dark">
  Content with overlay
</div>
```

#### `.gradient-overlay-gold`
Gold-tinted gradient overlay
```html
<div class="gradient-overlay-gold">
  Gold overlay content
</div>
```

### Intensity Modifiers

Control gradient opacity:
- `.gradient-intensity-light` - 60% opacity
- `.gradient-intensity-medium` - 85% opacity
- `.gradient-intensity-strong` - 100% opacity

```html
<div class="gradient-bg-subtle gradient-intensity-medium">
  Medium intensity gradient
</div>
```

## JavaScript API

### Setup

Include the script in your HTML:
```html
<script src="assets/utils/gradients.js"></script>
```

### Methods

#### `applyTextGradient(element, startColor, endColor, direction)`
Apply a text gradient to an element
```javascript
const heading = document.querySelector('h1');
GradientUtils.applyTextGradient(heading, '#f2ca50', '#ffffff');

// With custom direction
GradientUtils.applyTextGradient(heading, '#f2ca50', '#ffffff', '135deg');
```

#### `applyBackgroundGradient(element, startColor, endColor, direction)`
Apply a background gradient to an element
```javascript
const button = document.querySelector('button');
GradientUtils.applyBackgroundGradient(button, '#f2ca50', '#d4af37');
```

#### `applyPreset(element, category, presetName)`
Apply a preset gradient
```javascript
// Text gradient preset
const header = document.querySelector('h2');
GradientUtils.applyPreset(header, 'textGradients', 'goldToWhite');

// Background gradient preset
const section = document.querySelector('section');
GradientUtils.applyPreset(section, 'backgroundGradients', 'primary');
```

#### `generateLinearGradient(direction, startColor, endColor, stops)`
Generate gradient CSS value
```javascript
const css = GradientUtils.generateLinearGradient(
  'to right',
  '#f2ca50',
  '#ffffff'
);
// Returns: "linear-gradient(to right, #f2ca50, #ffffff)"
```

#### `generateMultiStopGradient(direction, colorStops)`
Generate multi-stop gradient
```javascript
const gradient = GradientUtils.generateMultiStopGradient('90deg', [
  { color: '#ffffff', stop: 0 },
  { color: '#f2ca50', stop: 50 },
  { color: '#121414', stop: 100 }
]);
```

#### `applyAnimatedGradient(element, colors, duration)`
Apply animated shifting gradient
```javascript
GradientUtils.applyAnimatedGradient(
  element,
  ['#f2ca50', '#c8c6c5', '#121414'],
  3  // 3 seconds
);
```

#### `applyGradientOverlay(element, startColor, endColor, direction)`
Create a gradient overlay on an element
```javascript
GradientUtils.applyGradientOverlay(
  element,
  'rgba(242, 202, 80, 0.2)',
  'rgba(18, 20, 20, 0.8)'
);
```

#### `getPlmColor(colorName)`
Get a color from PLM palette
```javascript
const goldColor = GradientUtils.getPlmColor('gold');
// Returns: '#f2ca50'
```

## Usage Examples

### Example 1: Premium Button
```html
<!-- HTML -->
<button class="gradient-bg-primary gradient-hover-lift">
  Apply for Finance
</button>
```

### Example 2: Animated Hero Heading
```html
<h1 class="gradient-text-gold-white">
  Prime Lane Motors
</h1>
```

### Example 3: Dynamic Gradient with JavaScript
```javascript
const element = document.querySelector('.dynamic-element');
GradientUtils.applyPreset(element, 'backgroundGradients', 'goldToDark');
```

### Example 4: Multi-Stop Gradient Card
```html
<div class="gradient-tri-color p-8 rounded-lg">
  Three-color gradient card
</div>
```

### Example 5: Text Gradient with Animation
```html
<h2 class="gradient-text-gold-dim gradient-hover-lift">
  Dynamic Heading
</h2>
```

## Best Practices

1. **Consistency** - Use preset gradients for consistent styling
2. **Accessibility** - Ensure text gradients have sufficient contrast
3. **Performance** - Use CSS classes instead of JavaScript when possible
4. **Semantics** - Apply gradients meaningfully to reinforce visual hierarchy
5. **Customization** - Override gradients only when necessary

## Combining with Tailwind CSS

Gradient utilities work seamlessly with Tailwind classes:
```html
<button class="gradient-bg-primary px-6 py-3 rounded-lg font-bold">
  Gradient Button
</button>
```

## Troubleshooting

### Text Gradient Not Showing
Ensure you're using the `.gradient-text` base class or that all required properties are set:
- `background-clip: text`
- `-webkit-background-clip: text`
- `-webkit-text-fill-color: transparent`

### Gradient Overlay Not Appearing
Ensure the parent element has `position: relative` set.

### Animation Not Working
Verify that the `@keyframes gradient-shift` animation is defined in `gradients.css`.

## Extending the System

### Adding New Presets

1. Add to `assets/gradients.css`:
```css
.gradient-text-custom {
    background: linear-gradient(to right, #color1, #color2);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

2. Add to `GradientUtils.presets` in `assets/utils/gradients.js`:
```javascript
customPreset: {
    type: 'text',
    start: '#color1',
    end: '#color2',
    direction: 'to right'
}
```

3. Update `assets/gradients-config.json` with new preset details

## Version History

- **v1.0.0** - Initial release with 20+ gradient utilities

## Support

For issues or questions, refer to the configuration file or JavaScript comments for additional details.
