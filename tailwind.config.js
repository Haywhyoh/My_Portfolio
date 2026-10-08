/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  important: '#tw-root',
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#06070a',
          900: '#0a0c12',
          800: '#11141c',
          700: '#1a1e2b',
          600: '#262c3f',
          500: '#3a4260',
        },
        mist: {
          400: '#8891a8',
          300: '#aab2c6',
          200: '#c9cfdd',
          100: '#e7eaf1',
          50: '#f5f6fa',
        },
        accent: {
          DEFAULT: '#6d5bff',
          50: '#f1efff',
          100: '#e4e0ff',
          200: '#c9c0ff',
          300: '#a594ff',
          400: '#8268ff',
          500: '#6d5bff',
          600: '#5641e6',
          700: '#4330b8',
          800: '#352691',
          900: '#2b1f72',
        },
        glow: {
          DEFAULT: '#00e6a8',
          500: '#00e6a8',
          600: '#00c491',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent, rgba(6,7,10,0.9)), repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 48px)',
        'radial-glow':
          'radial-gradient(600px circle at var(--x,50%) var(--y,0%), rgba(109,91,255,0.25), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(109,91,255,0.25), 0 20px 60px -20px rgba(109,91,255,0.45)',
        card: '0 1px 0 rgba(255,255,255,0.06) inset, 0 20px 50px -24px rgba(0,0,0,0.6)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        marquee: 'marquee 32s linear infinite',
        blink: 'blink 1s steps(1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 49%': { opacity: 1 },
          '50%, 100%': { opacity: 0 },
        },
      },
      maxWidth: {
        content: '1280px',
      },
    },
  },
  plugins: [],
};
