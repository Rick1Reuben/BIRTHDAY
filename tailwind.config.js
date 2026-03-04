/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#39FF14', // Neon green
        'dark-bg': '#121212',      // Dark background
        'light-text': '#EAEAEA',   // Light text
      },
    },
  },
  plugins: [],
}
