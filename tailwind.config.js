/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-orange": "510px 5px 10px orange",
      },
      colors: {
        orange: "#fd9512",
        white: "#ffffff",
        red: "#FF0408",
        customs: "#a3a2a0",
        darkorange: "#ff7b00",
        darkblue: "#3474bc",
        slash: "#75757d",
        light: "#9cd6ea",
      },
      fontFamily: {
        kaushan: ["Kaushan Script", "cursive"],
        spacemono: ["Space Mono", "Arial", "Serif"],
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: 0,
            transform: "translate3d(0, 100%, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
        // Add the jiggle keyframes here
        jiggle: {
          "0%": {
            transform: "scale3d(1, 1, 1)",
          },
          "30%": {
            transform: "scale3d(1.25, 0.75, 1)",
          },
          "40%": {
            transform: "scale3d(0.75, 1.25, 1)",
          },
          "50%": {
            transform: "scale3d(1.15, 0.85, 1)",
          },
          "65%": {
            transform: "scale3d(0.95, 1.05, 1)",
          },
          "75%": {
            transform: "scale3d(1.05, 0.95, 1)",
          },
          "100%": {
            transform: "scale3d(1, 1, 1)",
          },
        },
      },
      animation: {
        bounce: "bounce 1s infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        // Add the jiggle animation here
        jiggle: "jiggle 0.6s ease-in-out",

        fadeinup: "fade-in-up 0.5s ease-out forwards",
      },
      animationDelay: {
        100: "0.1s",
        200: "0.2s",
        300: "0.3s",
        400: "0.4s",
      },
    },
  },
  plugins: [],
};
