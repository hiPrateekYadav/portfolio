/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DAC5A7',
        dark: {
          DEFAULT: '#0E0E0E',
          100: 'rgba(218, 197, 167, 0.05)',
          200: 'rgba(218, 197, 167, 0.1)',
        },
        text: {
          default: '#DAC5A7',
          inverse: '#0E0E0E',
          muted: 'rgba(218, 197, 167, 0.6)',
        },
        border: {
          DEFAULT: 'rgba(218, 197, 167, 0.15)',
        },
        bg: {
          primary: '#DAC5A7',
          muted: 'rgba(218, 197, 167, 0.05)',
          glass: 'rgba(218, 197, 167, 0.05)',
        },
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        serif: ['Gambetta', 'Georgia', 'serif'],
        chillax: ['Chillax', 'sans-serif'],
      },
      fontSize: {
        'meta': ['13px', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '1.5px' }],
        'meta-small': ['12px', { lineHeight: '1.2', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.6', fontWeight: '300' }],
        'xsmall': ['12px', { lineHeight: '1.8', fontWeight: '400' }],
        'medium': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'large': ['20px', { lineHeight: '1.7', fontWeight: '400' }],
        'xlarge': ['24px', { lineHeight: '1.5', fontWeight: '300' }],
        'h5': ['20px', { lineHeight: '1.4', fontWeight: '300' }],
        'h4': ['24px', { lineHeight: '1.3', fontWeight: '300' }],
        'h2': ['48px', { lineHeight: '1.1', fontWeight: '300' }],
        'h1': ['96px', { lineHeight: '1.1', fontWeight: '300' }],
        'hero': ['160px', { lineHeight: '1', fontWeight: '300', letterSpacing: '-1px' }],
        'display': ['128px', { lineHeight: '1', fontWeight: '300', letterSpacing: '-1px' }],
      },
      letterSpacing: {
        'tight': '-1px',
        'normal': '0px',
        'wide': '1px',
        'wider': '1.5px',
        'widest': '1.5px',
      },
      backdropBlur: {
        '15': '15px',
      },
      borderRadius: {
        'sm': '2px',
        'DEFAULT': '2px',
        'full': '500px',
      },
      backgroundSize: {
        '220': '220px 220px',
      },
    },
  },
  plugins: [],
}

