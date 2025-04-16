/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        p1: "#FF4081",
        primary: {
          50: "#fef1f6",
          100: "#fee5ef",
          200: "#ffcae1",
          300: "#ff9fc6",
          400: "#ff639f",
          500: "fef1f6",
          600: "#f01253",
          700: "#d1053b",
          800: "#ad0731",
          900: "#8f0c2d",
        },
        green: "#00C64F",
        blue: "#1463FE",
        red: "#DA1818",
        yellow: "#F4C520",
        t1: "#FFFFFF",
        t2: "#A5A5A5",
        t3: "#676767",
        b1: "#1D1D1D",
        b2: "#222222",
        b3: "#292929",
        b4: "#313131",
      },
    },
  },
  plugins: [],
};
