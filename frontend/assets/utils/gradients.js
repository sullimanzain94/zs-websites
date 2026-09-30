/**
 * PRIME LANE MOTORS - GRADIENT UTILITIES
 * JavaScript module for dynamic gradient application
 */

const GradientUtils = {
  /**
   * Predefined gradient configurations
   */
  presets: {
    textGradients: {
      whiteToSilver: {
        type: 'text',
        start: '#ffffff',
        end: '#c8c6c5',
        direction: 'to right'
      },
      goldToWhite: {
        type: 'text',
        start: '#f2ca50',
        end: '#ffffff',
        direction: 'to right'
      },
      goldToDim: {
        type: 'text',
        start: '#f2ca50',
        end: '#d4af37',
        direction: 'to right'
      },
      diagonal: {
        type: 'text',
        start: '#ffffff',
        end: '#c8c6c5',
        direction: '135deg'
      }
    },
    backgroundGradients: {
      primary: {
        type: 'background',
        start: '#f2ca50',
        end: '#d4af37',
        direction: '135deg'
      },
      goldToDark: {
        type: 'background',
        start: '#f2ca50',
        end: '#121414',
        direction: 'to right'
      },
      obsidianSurface: {
        type: 'background',
        start: '#121414',
        end: '#282a2a',
        direction: 'to bottom'
      },
      subtle: {
        type: 'background',
        start: 'rgba(242, 202, 80, 0.1)',
        end: 'rgba(212, 175, 55, 0.05)',
        direction: '135deg'
      }
    }
  },

  /**
   * Generate a linear gradient CSS value
   * @param {string} direction - Gradient direction (e.g., 'to right', '135deg')
   * @param {string} startColor - Starting color
   * @param {string} endColor - Ending color
   * @param {Array<string>} [stops] - Optional additional color stops
   * @returns {string} CSS gradient value
   */
  generateLinearGradient(direction, startColor, endColor, stops = []) {
    const colors = [startColor, ...stops, endColor].join(', ');
    return `linear-gradient(${direction}, ${colors})`;
  },

  /**
   * Generate a radial gradient CSS value
   * @param {string} startColor - Starting color (center)
   * @param {string} endColor - Ending color (edge)
   * @param {string} [shape='circle'] - 'circle' or 'ellipse'
   * @returns {string} CSS gradient value
   */
  generateRadialGradient(startColor, endColor, shape = 'circle') {
    return `radial-gradient(${shape}, ${startColor}, ${endColor})`;
  },

  /**
   * Apply text gradient to an element
   * @param {HTMLElement} element - Target element
   * @param {string} startColor - Starting color
   * @param {string} endColor - Ending color
   * @param {string} [direction='to right'] - Gradient direction
   */
  applyTextGradient(element, startColor, endColor, direction = 'to right') {
    const gradient = this.generateLinearGradient(direction, startColor, endColor);
    element.style.background = gradient;
    element.style.backgroundClip = 'text';
    element.style.webkitBackgroundClip = 'text';
    element.style.webkitTextFillColor = 'transparent';
  },

  /**
   * Apply background gradient to an element
   * @param {HTMLElement} element - Target element
   * @param {string} startColor - Starting color
   * @param {string} endColor - Ending color
   * @param {string} [direction='135deg'] - Gradient direction
   */
  applyBackgroundGradient(element, startColor, endColor, direction = '135deg') {
    element.style.background = this.generateLinearGradient(direction, startColor, endColor);
  },

  /**
   * Apply a preset gradient to an element
   * @param {HTMLElement} element - Target element
   * @param {string} category - 'textGradients' or 'backgroundGradients'
   * @param {string} presetName - Name of the preset
   */
  applyPreset(element, category, presetName) {
    const preset = this.presets[category]?.[presetName];
    if (!preset) {
      console.warn(`Preset not found: ${category}.${presetName}`);
      return;
    }

    if (preset.type === 'text') {
      this.applyTextGradient(
        element,
        preset.start,
        preset.end,
        preset.direction
      );
    } else if (preset.type === 'background') {
      this.applyBackgroundGradient(
        element,
        preset.start,
        preset.end,
        preset.direction
      );
    }
  },

  /**
   * Apply animated gradient background
   * @param {HTMLElement} element - Target element
   * @param {Array<string>} colors - Array of colors for animation
   * @param {number} [duration=3] - Animation duration in seconds
   */
  applyAnimatedGradient(element, colors, duration = 3) {
    const gradientValue = colors.join(', ');
    element.style.background = `linear-gradient(90deg, ${gradientValue})`;
    element.style.backgroundSize = '200% 200%';
    element.style.animation = `gradient-shift ${duration}s ease infinite`;
  },

  /**
   * Create a gradient overlay on an element
   * @param {HTMLElement} element - Target element
   * @param {string} startColor - Starting color
   * @param {string} endColor - Ending color
   * @param {string} [direction='to bottom'] - Gradient direction
   */
  applyGradientOverlay(element, startColor, endColor, direction = 'to bottom') {
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.inset = '0';
    overlay.style.background = this.generateLinearGradient(direction, startColor, endColor);
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '10';

    element.style.position = 'relative';
    element.appendChild(overlay);
  },

  /**
   * Get a color from the PLM color palette
   * @param {string} colorName - Color name
   * @returns {string} Hex color value
   */
  getPlmColor(colorName) {
    const palette = {
      gold: '#f2ca50',
      goldDim: '#d4af37',
      obsidian: '#121414',
      surface: '#282a2a',
      silver: '#c8c6c5',
      white: '#ffffff',
      onSurface: '#e2e2e2',
      variant: '#d0c5af'
    };
    return palette[colorName] || null;
  },

  /**
   * Generate a multi-stop gradient
   * @param {string} direction - Gradient direction
   * @param {Array<{color: string, stop: number}>} colorStops - Color stops with positions (0-100)
   * @returns {string} CSS gradient value
   */
  generateMultiStopGradient(direction, colorStops) {
    const stops = colorStops
      .map(stop => `${stop.color} ${stop.stop}%`)
      .join(', ');
    return `linear-gradient(${direction}, ${stops})`;
  },

  /**
   * Apply multi-stop gradient to element
   * @param {HTMLElement} element - Target element
   * @param {string} direction - Gradient direction
   * @param {Array<{color: string, stop: number}>} colorStops - Color stops
   * @param {string} [type='background'] - 'background' or 'text'
   */
  applyMultiStopGradient(element, direction, colorStops, type = 'background') {
    const gradient = this.generateMultiStopGradient(direction, colorStops);

    if (type === 'text') {
      element.style.background = gradient;
      element.style.backgroundClip = 'text';
      element.style.webkitBackgroundClip = 'text';
      element.style.webkitTextFillColor = 'transparent';
    } else {
      element.style.background = gradient;
    }
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GradientUtils;
}
