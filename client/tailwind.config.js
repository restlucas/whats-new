/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "red-vibrant": "#EA3323",
        "red-hover": "#b2241a",
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
      keyframes: {
        "fade-y-normal": {
          "0%": {
            transform: "translateY(-10px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "fade-x-normal": {
          "0%": {
            transform: "translateX(10px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "fade-in": {
          "0%": {
            transform: "translateX(60px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "entrance-right": {
          "0%": {
            transform: "translateX(100vw)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "exit-right": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(100vw)",
          },
        },
        slide: {
          "0%": {
            backgroundPosition: "0 0",
          },
          "100%": {
            backgroundPosition: "-600% 0",
          },
        },
      },
      animation: {
        "fade-in": "entrance-right .15s ease-in",
        "fade-out": "exit-right .15s ease-out",
        "fade-entrance": "fade-in .35s ease-in-out",
        "fade-yaxis": "fade-y-normal .25s ease-in-out",
        "fade-xaxis": "fade-x-normal .25s ease-in-out",
        "slide-left": "slide 100s linear infinite",
      },
    },
    fontFamily: {
      body: ["Titillium Web"],
    },
  },
  plugins: ["prettier-plugin-tailwindcss", "@tailwindcss/line-clamp"],
};
