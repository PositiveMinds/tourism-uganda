/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B8860B', // DarkGoldenRod
          dark: '#DAA520', // GoldenRod
        },
        secondary: {
          DEFAULT: '#006400', // DarkGreen (Emerald feel)
          dark: '#008000', // Green
        },
        accent: {
          DEFAULT: '#1A1A1A',
          light: '#F5F5F5',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
