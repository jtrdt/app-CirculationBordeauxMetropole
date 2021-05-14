module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'transparent-bar': '#ffffffee',
        'transparent-header': '#ffffff44',
        'bg-button': '#2a2a2a'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['odd'],
    },
  },
  plugins: [],
}
