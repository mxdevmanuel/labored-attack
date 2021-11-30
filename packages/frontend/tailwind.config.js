const colors = require('tailwindcss/colors');
// Color pallete sky-900 sky-700/600 indigo-200 orange-400
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        indigo: colors.indigo,
        orange: colors.orange,
      },
      fontFamily: {
        publicsans: ['Public Sans', 'sans-serif'],
        sourcecodepro: ['Source Code Pro', 'monospace'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
