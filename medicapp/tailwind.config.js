/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef8ff",
          100: "#d9efff",
          200: "#b6e0ff",
          300: "#83ccff",
          400: "#4db5ff",
          500: "#1890ff",
          600: "#0f6fdb",
          700: "#0e56ad",
          800: "#103f80",
          900: "#102f60"
        }
      }
    },
  },
  plugins: [],
}
