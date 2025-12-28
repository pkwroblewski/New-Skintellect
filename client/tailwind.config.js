/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // DermaLogic brand colors
        cream: {
          50: '#FDFCFA',
          100: '#FAF7F2',  // Primary background
          200: '#F5F2ED',
          300: '#E8E2D9',  // Border color
        },
        rose: {
          soft: '#A67C7C',  // Primary accent
          light: '#FDF2F2', // Japandi pink
        },
        japandi: {
          blue: '#F0F4F8',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'shimmer': 'shimmer 2s infinite',
        'progress-indefinite': 'progress-indefinite 1.5s ease-in-out infinite',
        'gentle-pulse': 'gentle-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'progress-indefinite': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'gentle-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
}
