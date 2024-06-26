/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "599px",
      md: "600px",
      lg: "1000px",
      // xl: "1280px",
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
