module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors22: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'blue': '#253C64',
      'light-yellow': '#FDFFDD',
      'light-red': '#FBEBE8',
      'light-blue': '#EDF9FF',
      'light-green': '#E5EAE3',
      'light-gray':"#F3F4F2",
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',      
    },
    screens: {
      xs: '375px',
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
    },
    extend:{
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'blue': '#253C64',
        'yellow2': '#FFFF01',
        'light-yellow': '#FDFFDD',
        'light-red': '#FBEBE8',
        'light-blue': '#EDF9FF',
        'light-green': '#E5EAE3',
        'light-gray':"#F3F4F2",
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'ygray': {
          100: '#f6f6f4',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'box': '0px 50px 35px -24px rgba(0,0,0,0.1)',
      },
      width: {
        '120': '480px',
      }
    }
  },
  plugins: [],
}
