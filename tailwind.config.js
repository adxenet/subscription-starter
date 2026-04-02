const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'pages/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        brand: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#f87171',
          400: '#e53535',
          500: '#b4090b',
          600: '#b4090b',
          700: '#9a0809',
          800: '#7f0708',
          900: '#5c0506'
        },
        surface: {
          50: '#f7f7f7',
          100: '#ededed',
          200: '#dfdfdf',
          300: '#c4c4c4',
          400: '#8a8a8a',
          500: '#555555',
          600: '#333333',
          700: '#222222',
          800: '#111111',
          900: '#000000'
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          'var(--font-sans)',
          ...fontFamily.sans
        ]
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
