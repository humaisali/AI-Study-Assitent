/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'Segoe UI', 'sans-serif'],
        body: ['Work Sans', 'Segoe UI', 'sans-serif'],
        mono: ['Fira Code', 'Consolas', 'monospace'],
      },
      colors: {
        brand: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#7c8fff',
          500: '#536dfe', 600: '#4054e8', 700: '#3343c5', 800: '#2d399e', 900: '#29347d',
        },
        ink: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8',
          500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a',
        },
        sage: {
          50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf',
          500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a',
        },
        amber: {
          50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c',
          500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12',
        },
        cream: '#f8fafc',
        parchment: '#f1f5f9',
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
        'warm': '0 10px 30px rgba(133, 77, 14, 0.18)',
        'warm-lg': '0 24px 70px rgba(86, 54, 13, 0.22)',
        'card': '0 1px 2px rgba(20,18,16,0.04), 0 16px 50px rgba(20,18,16,0.07)',
        'card-hover': '0 4px 10px rgba(20,18,16,0.06), 0 24px 60px rgba(20,18,16,0.12)',
      },
    },
  },
  plugins: [],
}
