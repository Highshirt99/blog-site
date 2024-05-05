/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
     fontFamily: {
      bodyFont: ["Nunito Sans", "sans-serif"],
     },
     colors: {
      primary: "#1565D8",
      dark: {
        light: "#5A7184",
        hard: "#0D2436",
        soft: "#183B56"
      }
     }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    
  ],
};
