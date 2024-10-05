/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cormorant', 'Helvetica', 'Arial', 'sans-serif'],
        // You can also add more font families like 'serif', 'mono', etc.
      },
    },
  },
  plugins: [],
}