import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette
        violet: {
          DEFAULT: '#6F4CF5',
          50: '#F0ECFE',
          100: '#E1D9FD',
          200: '#C3B3FB',
          300: '#A58DF9',
          400: '#8767F7',
          500: '#6F4CF5',
          600: '#5A3AE0',
          700: '#4529CC',
          800: '#3018B8',
          900: '#1B07A4',
        },
        indigo: {
          deep: '#3B2EE0',
        },
        cyan: {
          brand: '#22D3EE',
        },
        ink: {
          DEFAULT: '#0B0A1F',
          light: '#1A1835',
        },
        offwhite: '#F7F5FF',
        // Semantic
        success: '#10B981',
        whatsapp: '#25D366',
        call: '#2563EB',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['var(--font-instrument)', 'Instrument Serif', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      backgroundImage: {
        'gradient-violet': 'linear-gradient(135deg, #6F4CF5, #3B2EE0)',
        'gradient-brand': 'linear-gradient(135deg, #6F4CF5, #22D3EE)',
        'gradient-dark': 'linear-gradient(180deg, #0B0A1F 0%, #1A1835 100%)',
        'mesh-violet': 'radial-gradient(at 40% 20%, #6F4CF540 0px, transparent 50%), radial-gradient(at 80% 0%, #3B2EE030 0px, transparent 50%), radial-gradient(at 0% 50%, #22D3EE20 0px, transparent 50%)',
        'mesh-dark': 'radial-gradient(at 40% 20%, #6F4CF520 0px, transparent 50%), radial-gradient(at 80% 0%, #3B2EE015 0px, transparent 50%), radial-gradient(at 0% 50%, #22D3EE10 0px, transparent 50%)',
      },
      boxShadow: {
        'violet': '0 0 40px rgba(111, 76, 245, 0.3)',
        'violet-lg': '0 0 80px rgba(111, 76, 245, 0.4)',
        'cyan': '0 0 40px rgba(34, 211, 238, 0.3)',
        'card': '0 4px 24px rgba(11, 10, 31, 0.08)',
        'card-hover': '0 8px 40px rgba(11, 10, 31, 0.16)',
        'glow': '0 0 0 1px rgba(111, 76, 245, 0.3), 0 4px 24px rgba(111, 76, 245, 0.15)',
      },
      animation: {
        'marquee': 'marquee 50s linear infinite',
        'marquee-reverse': 'marquee-reverse 50s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        counter: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
