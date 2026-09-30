/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './**/code.html'],
  theme: {
    extend: {
      colors: {
        background: '#121414',
        surface: '#121414',
        'surface-obsidian': '#121414',
        'surface-container-lowest': '#0d0f0f',
        'surface-container-low': '#1a1c1c',
        'surface-container': '#1e2020',
        'surface-container-high': '#282a2a',
        'surface-container-highest': '#333535',
        'surface-variant': '#333535',
        primary: '#f2ca50',
        'primary-container': '#d4af37',
        'primary-fixed': '#ffe088',
        'primary-fixed-dim': '#e9c349',
        'on-primary': '#3c2f00',
        'on-primary-fixed': '#241a00',
        'on-surface': '#e2e2e2',
        'on-background': '#e2e2e2',
        'on-surface-variant': '#d0c5af',
        secondary: '#c4c7ca',
        'secondary-fixed': '#e0e2e6',
        'secondary-fixed-dim': '#c4c7ca',
        'on-secondary': '#2d3134',
        'on-secondary-container': '#b6b8bc',
        tertiary: '#cdcece',
        'tertiary-container': '#b1b3b3',
        outline: '#99907c',
        'outline-variant': '#4d4635',
        error: '#ffb4ab',
        'error-container': '#93000a',
        'gold-accent': '#f2ca50',
        'gold-dim': '#d4af37',
        'metallic-silver': '#c8c6c5'
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Manrope', 'sans-serif'],
        label: ['JetBrains Mono', 'monospace'],
        'body-md': ['Inter', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'headline-md': ['Manrope', 'sans-serif'],
        'headline-lg': ['Manrope', 'sans-serif'],
        'headline-lg-mobile': ['Manrope', 'sans-serif'],
        'display-lg': ['Manrope', 'sans-serif'],
        'button-text': ['Manrope', 'sans-serif'],
        'label-sm': ['JetBrains Mono', 'monospace'],
        'label-md': ['JetBrains Mono', 'monospace'],
        'label-lg': ['Chivo', 'sans-serif']
      },
      fontSize: {
        'body-md': ['16px', { lineHeight: '24px' }],
        'body-lg': ['18px', { lineHeight: '28px' }],
        'headline-md': ['24px', { lineHeight: '32px' }],
        'headline-lg': ['32px', { lineHeight: '40px' }],
        'headline-lg-mobile': ['28px', { lineHeight: '34px' }],
        'display-lg': ['48px', { lineHeight: '56px' }],
        'button-text': ['14px', { lineHeight: '20px' }],
        'label-sm': ['12px', { lineHeight: '16px' }],
        'label-md': ['14px', { lineHeight: '20px' }],
        'label-lg': ['14px', { lineHeight: '20px' }]
      },
      spacing: {
        unit: '8px',
        gutter: '16px',
        'margin-mobile': '16px',
        'margin-desktop': '64px',
        'section-gap': '80px',
        'container-padding': '24px',
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '32px'
      },
      maxWidth: {
        'container-max': '1280px'
      }
    }
  },
  plugins: []
};
