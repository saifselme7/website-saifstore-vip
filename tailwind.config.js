/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saif: {
          bg: '#000000',
          text: '#F5F0E8',
          dim: '#9C9C9C',
          accent: '#E63946',
          accentDark: '#C1121F',
          surface: '#0A0A0A',
          border: 'rgba(245, 240, 232, 0.08)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      transitionTimingFunction: {
        'saif': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
