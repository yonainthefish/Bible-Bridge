/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
        pc: '1920px',
      },
    },

    extend: {
      colors: {
        /**point */
        primary: {
          DEFAULT: '#3a1d1d',
          600: '#9a6f0d',
          500: '#bf901e',
          400: '#cc9b24',
          300: '#daa830',
          200: '#e7b029',
          100: '#f0bb3a',
          main: '#f0bb3a',
          10: '#f3dea2',
          20: '#f5eacb',
          30: '#fff9ea',
        },
        /**gray */
        gray: {
          DEFAULT: '#1f1f1f',
          800: '#393939',
          700: '#525252',
          600: '#525252',
          500: '#525252',
          400: '#525252',
          300: '#525252',
          200: '#525252',
          100: '#EBEBEB',
          1: '#fbfbfb',
        },

        error: {
          DEFAULT: '#dc381a',
        },

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      borderRadius: {
        lg: '30px',
        md: '10px',
        sm: '8px',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
