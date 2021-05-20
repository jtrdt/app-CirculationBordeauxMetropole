module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'transparent-bar': '#ffffffee',
        'transparent-header': '#ffffff44',
        'bg-button': '#2a2a2a',
        'transparent-bg': '#ffffffbb',
        'disable-button' : '#94d3a2',
        'disable-button-text' : 'hsl(130, 40%, 94.1%)',
        'disable-button-border' : 'rgba(27,31,35,0.1)',
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
