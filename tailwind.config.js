/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        '128': '32rem',
        '138': '42rem'
      },
      width: {
        '128': '60rem',
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      }
    },
  },
  plugins: [],
}