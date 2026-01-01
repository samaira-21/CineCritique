/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#e50914", // Netflix red
        card: "#1f1f1f",   // card background
        bg: "#121212",     // page background
      },
    },
  },
  plugins: [],
};
