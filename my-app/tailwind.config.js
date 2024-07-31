/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        "custom-rgba": "rgba(255, 255, 255, 0.10)",
      },
      colors: {
        primaryIndigo: "#655DE9",
        hoverIndigo: "#544BE7",
        primaryYellow: "#FEF08A",
        hoverYellow: "#FEEC67",
      },
      fontFamily: { spaceGrotesk: ['"Space Grotesk"', "sans-serif"] },
    },
  },
  plugins: [],
};
