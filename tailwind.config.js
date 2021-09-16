module.exports = {
  purge: false,
  // purge: ['./pages/**/*.jsx', './components/**/*.jsx', './pages/**/*.jss'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'transparent-bar': '#ffffffee',
        'transparent-header': '#ffffff44',
        'bg-button': '#2a2a2a',
        'transparent-bg': '#ffffffbb',
        'disable-button': '#94d3a2',
        'disable-button-text': 'hsl(130, 40%, 94.1%)',
        'disable-button-border': 'rgba(27,31,35,0.1)',
        login: 'rgba(194, 233, 255, 0.5)',
        'bg-form': '#f0f5f9'
      },
      backgroundImage: theme => ({
        home: "url('/bridge-5212947_1920.jpg')"
      })
    },
    fontFamily: {
      auth: ['Roboto']
    }
  },
  variants: {
    extend: {
      backgroundColor: ['odd'],
      opacity: ['disabled']
    }
  }
};
