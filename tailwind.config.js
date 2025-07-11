/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          dark: "#3730A3",
          light: "#A5B4FC",
        },
        dark: {
          50: "#f8fafc", // lightest text
          100: "#e2e8f0",
          200: "#cbd5e1",
          300: "#94a3b8",
          400: "#64748b",
          500: "#475569",
          600: "#334155",
          700: "#1e293b", // dark background
          800: "#0f172a", // deeper background
          900: "#0b1120", // almost black
        },
      },
    },
  },
  plugins: [],
};
