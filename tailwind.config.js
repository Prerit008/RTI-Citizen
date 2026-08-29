/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "Noto Sans",
          "Noto Sans Devanagari",
          "system-ui",
          "sans-serif",
        ],
      },

      colors: {
        rti: {
          50: "#FFF7F5",
          100: "#FEECE8",
          200: "#FDD4CD",
          300: "#F9AAA0",
          400: "#F47D70",
          500: "#D9483B",
          600: "#B42318",
          700: "#8E1B12",
          800: "#70170F",
          900: "#4A100B",
        },

        navy: {
          50: "#F5F7FA",
          100: "#E9EDF3",
          200: "#D2D8E2",
          300: "#AAB4C4",
          400: "#7D899C",
          500: "#596579",
          600: "#3E4A5E",
          700: "#293449",
          800: "#1D2738",
          900: "#172033",
        },
      },

      boxShadow: {
        soft: "0 2px 12px rgba(16, 24, 40, 0.06)",
        card: "0 4px 24px rgba(16, 24, 40, 0.08)",
      },

      borderRadius: {
        "4xl": "2rem",
      },
    },
  },

  plugins: [],
};