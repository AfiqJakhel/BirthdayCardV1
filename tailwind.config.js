/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        luxury: {
          blush: '#FFF0F5',
          blushDark: '#F9D7E3',
          rose: '#EFA8C2',
          gold: '#D4AF37',
          goldLight: '#F2D57E',
          goldDark: '#C8825F',
          burgundy: '#6B0F3A',
          cream: '#FFF8E7',
          black: '#0A0A0A',
        }
      },
      animation: {
        'shimmer': 'shimmer 3s infinite linear',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
