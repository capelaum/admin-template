module.exports = {
  mode: 'jit',
  content: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {},
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
}
