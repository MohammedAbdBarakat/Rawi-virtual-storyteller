/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        animation: {
            fadeToBlack: "fadeToBlack 1s ease-in-out forwards",
        },
        keyframes: {
            fadeToBlack: {
                "0%": { opacity: 0, backgroundColor: "transparent" },
                "100%": { opacity: 1, backgroundColor: "black" },
            },
        },
    },
},
  plugins: [],
}