/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        prompt: ["Prompt", "sans-serif"],
      },
      fontSize: {
        "custom-12": "12px",
      },
      lineHeight: {
        "custom-18": "18px",
      },
    },
  },
  plugins: [],
};
