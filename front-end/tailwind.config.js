/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['../index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lora: ['Lora', 'ui-sans-serif', 'system-ui'],
        mulish: ['Mulish', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        custom: '0 2px 5px #888',
      },
    },
  },
  plugins: [],
}

