import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "vibrant-red": "#EA3323",
        light: "#F5F5F5",
        dark: "#1f2937",
        secondary: "#4F4F4F",
        "secondary-dark": "#c6c6c6",
        tertiary: "#303945",
      },
      textColor: {
        title: "#EA3323",
        primary: "#3d3d3d",
        "secondary-dark": "#c6c6c6",
        tertiary: "#303945",
      },
    },
    fontFamily: {
      body: ["Titillium Web"],
    },
  },
  plugins: ["prettier-plugin-tailwindcss", "@tailwindcss/line-clamp"],
};
