/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        gray: {
          700: "#0d0d0d",
          600: "#1a1a1a",
          500: "#262626",
          400: "#333333",
          300: "#808080",
          200: "#d9d9d9",
          100: "#f2f2f2",
        },

        red: {
          500: "#e25858",
        },

        purple: {
          500: "#8284fa",
          600: "#5e60ce",
        },

        blue: {
          500: "#4ea8de",
          600: "#1e6f9f",
        },
      },

      fontFamily: {
        inter: '"Inter", sans-serif',
      },
    },
  },
  plugins: [],
};
