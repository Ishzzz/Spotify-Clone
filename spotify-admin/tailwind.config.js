/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Montserrat', 'Open Sans', 'sans-serif'], // fallback fonts
        serif: ['Merriweather', 'serif'],
        comic: ['"Comic Neue"', 'cursive'],
         // example for serif fonts
      },
    },
  },
  plugins: [],
}