const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      red: colors.rose,
      white: colors.white,
      cwhite: {
        one: '#f1f6ff',
        two: '#ddf5f4',
      },
      cgray: {
        one: '#999'
      },
      cgreen: {
        light: '#BAEBB8',
        dark: '#0EC795',
        darker: '#2ab87e'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
