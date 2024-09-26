module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'monospace'],
      },
      colors: {
        customRed: 'rgb(175, 37, 44)'
      }
    }
  },
  variants: {
    extend: {
      padding: ['first']
    }
  },
  plugins: []
}
