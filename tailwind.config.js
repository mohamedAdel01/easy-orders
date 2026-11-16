/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f7f4',
          100: '#ede9e0',
          200: '#d8d0bc',
          300: '#c0b49a',
          400: '#a99070',
          500: '#967553',
          600: '#8a6648',
          700: '#73523c',
          800: '#5f4535',
          900: '#4e3a2e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
