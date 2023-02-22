/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'yellow': '#FF8002',
      'gold':'#8D4200',
      'white': '#FFFFFF',
      'black': '#000000',
      'red':'rgb(181, 23, 0)',
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
