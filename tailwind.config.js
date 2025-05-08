/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(to right, #000 1px, transparent 1px),
          linear-gradient(to bottom, #000 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid-pattern': '20px 20px',
      },
    },
  },
  plugins: [],
};