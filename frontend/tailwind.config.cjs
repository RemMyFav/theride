/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: "#FFF",
        },
        black: {
          DEFAULT: "#000",
        },
        prime: {
          DEFAULT: "#F48023",
          2: "#1682FD",
        },
        bg: {
          DEFAULT: "#FAFAFA",
        },
        border: {
          DEFAULT: "#EAEAEA",
        },
        gray: {
          DEFAULT: "rgb(156 163 175)",
          font: "#808080",
        },
      },
      borderRadius: {
        base: "20px",
      },
      boxShadow: {
        base: "0 2px 4px 0 rgba(0,0,0,0.25)",
      },
      transitionProperty: {
        "input-label": "top, left, font-size",
      },
      gridTemplateRows: {
        addQuestion: "32px auto 32px 32px",
          question: "32px 1px auto 1px 32px",
	  chat: "auto 32px"
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
