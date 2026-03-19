/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          50:  '#f5f3ef',
          100: '#e8e3d8',
          200: '#d4cbb8',
          300: '#b8a98f',
          400: '#9c8768',
          500: '#7d6848',
          600: '#5e4d34',
          700: '#3f3422',
          800: '#261f14',
          900: '#120f09',
        },
        sage: {
          50:  '#f2f5f0',
          100: '#e0e9db',
          200: '#bfd1b5',
          300: '#96b288',
          400: '#6d9359',
          500: '#4d7040',
          600: '#3a562f',
          700: '#273d20',
          800: '#162313',
          900: '#0a1109',
        },
        amber: {
          50:  '#fffbf0',
          100: '#fff3cc',
          200: '#ffe799',
          300: '#ffd666',
          400: '#ffc233',
          500: '#f0a500',
          600: '#c78200',
          700: '#9e6000',
          800: '#754000',
          900: '#4c2200',
        },
        cream: '#faf7f2',
        parchment: '#f0ebe0',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulse_soft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease forwards',
        shimmer: 'shimmer 2s linear infinite',
        pulse_soft: 'pulse_soft 2s ease-in-out infinite',
        slideIn: 'slideIn 0.4s ease forwards',
        scaleIn: 'scaleIn 0.35s ease forwards',
      },
      boxShadow: {
        'warm': '0 4px 24px rgba(120, 80, 20, 0.12)',
        'warm-lg': '0 8px 48px rgba(120, 80, 20, 0.18)',
        'card': '0 1px 3px rgba(38,31,20,0.06), 0 8px 24px rgba(38,31,20,0.08)',
        'card-hover': '0 4px 8px rgba(38,31,20,0.08), 0 16px 40px rgba(38,31,20,0.14)',
      },
    },
  },
  plugins: [],
}
