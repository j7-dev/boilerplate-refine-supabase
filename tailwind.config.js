/** @type {import('tailwindcss').Config} */
/* eslint-disable @typescript-eslint/no-var-requires */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{html, js, ts, vue}", "./src/**/*"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
      },
      screens: {
        sm: "375px", // iphone SE
        md: "810px", // ipad 直向
        lg: "1080px", // ipad 橫向
        xl: "1280px", // mac air
        xxl: "1440px",
      },
    },
  },
  plugins: [],
  important: true,
  corePlugins: {
    preflight: false,
  },
};
