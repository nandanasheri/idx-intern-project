/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#764ba2',
          DEFAULT: '#667eea',
          dark: '#5a67d8',
        }
      }
    },
  },
  plugins: [],
}
