/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#e50914",
        card: "#1f1f1f",   
        bg: "#121212",     
    },
  },
  plugins: [],
}
}