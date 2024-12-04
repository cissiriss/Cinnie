/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-green": "#0a2616",
        "light-green": "#b3dbb2",
        "grey-green": "rgb(116, 124, 108)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
