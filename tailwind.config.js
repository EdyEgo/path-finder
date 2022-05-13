module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        whiteop: 'rgba(255, 255, 255, 0.1)',
        red: {
          650: '#FF0000'
        }
      },
      dropShadow: {
        buttonLogIn: '0px 0px 16px rgba(251, 177, 34, 1)',
        buttonAppBarAuth: '0 0px 2px rgba(251, 129, 34, 1)',
        textShadowLogIn: [
          '0 0px 3px rgba(251, 129, 34, 1)',
          '0 0px 4px rgba(251, 129, 34, 1)'
        ],
        '4xl': [
          '0 0px 2px rgba(251, 129, 34, 1)',
          '0 0px 9px rgba(251, 129, 34, 1)'
        ]
      },
      width: {
        112: '28rem',
        128: '32rem',
        160: '40rem'
      },
      height: {
        112: '28rem',
        160: '40rem'
      },
      spacing: {
        112: '28rem',
        160: '40rem'
      }
    }
  },
  plugins: [],
  important: true
}
