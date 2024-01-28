/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        redsanta: "#da2c38",
        greensanta: "#226f54",
        earthsanta: "#43291f",
        yellowsanta: "#f4f0bb",
      },
    },
    fontFamily: {
      sans: ["dearsanta"],
      heading: ["Patrick Hand SC"],
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("flowbite/plugin")],
};
