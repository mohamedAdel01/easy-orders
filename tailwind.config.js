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
        figma: {
          black: '#141414',
          dark: '#292929',
          'gray-body': '#666666',
          'gray-muted': '#8F8F8F',
          'gray-date': '#818B9C',
          surface: '#F2F2F2',
          border: '#E6E6E6',
          'border-muted': '#B8B8B8',
          track: '#E4E9EE',
          star: '#F5A623',
        },
      },
      fontFamily: {
        sans: ['"Clash Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        clash: ['"Clash Grotesk"', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      maxWidth: {
        figma: '1200px',
      },
      borderRadius: {
        figma: '8px',
      },
    },
  },
  plugins: [],
}
