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
      // center: true,
      // screens: {
      //   '2xl': '1400px',
      //   pc: '1920px',
      // },
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
          600: '#6C6C6C',
          500: '#858585',
          400: '#9F9F9F',
          300: '#B8B8B8',
          200: '#D2D2D2',
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

      fontSize: {
        smaller: '12px',
        small: '14px',
        basic: '16px',
        large: '18px',
        title: '30px',
        largeTitle: '45px',
      },

      fontWeight: {
        500: '500',
        600: '600',
        700: '700',
      },

      keyframes: {
        'gradient-move': {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      },
      animation: {
        'gradient-move': 'gradient-move 0.1s linear infinite',
      },

      boxShadow: {
        slate200: '7px 7px 6px 5px rgba(244, 163, 122, 0.5)',
      },
    },
    plugins: [tailwindcssAnimate],
  },
};
