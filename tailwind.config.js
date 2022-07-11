const conicGradient = (theme, direction, colorList) => {
  const params = [direction, ...colorList.map((color) => theme(`colors.${color}`))]

  return `conic-gradient(${params.join(', ')})`
}

const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        neonderthaw: ["Neonderthaw", "cursive"],
        neonFuture: ["Neon Future", "cursive"],
      },
      colors: {
        amber: colors.amber,
        lightBlue: colors.sky,
        rose: colors.rose,
        gray: colors.gray,
      },
      backgroundImage: (theme) => ({
        'conic-gradient': conicGradient(theme, 'from 300deg', [
          'red.400',
          'amber.100',
          'lightBlue.500',
          'blue.300',
          'purple.600',
          'pink.500',
          'rose.600',
          'red.400',
        ]),
      }),
    },
  },
  plugins: [],
};
