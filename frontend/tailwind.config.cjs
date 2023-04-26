/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  corePlugins: {
    preflight: false,
  },
  important: "#root",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: '"Pilcrow Rounded"',
      },
      boxShadow: {
        "3xl": "4px 4px 0px 0px rgba(0,0,0,1);",
      },
      container: {
        center: true,
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
        },
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      colors: {
        whiteSmoke: "#edede9",
        grey: "f0f0f0",
        brightYellow: "#ffeb3b",
        goldenYellow: "#e9a42d",
        tealBlue: "#59a9a1",
        scarletRed: "#e81200",
        brightGreen: "#4caf50",
        paleGreen: "#a3c382",
        purple: "#9c27b0",
        palePurple: "#ab47bc",
        // new colors
        goldenOrange: "#e6a02d",
        brightOrange: "#ff9900",
        deepBlue: "#0a3d62",
        oliveGreen: "#556b2f",
        warmBrown: "#8b4513",
        softCream: "#f5f5dc",
      },
    },
  },
  plugins: [],
}
