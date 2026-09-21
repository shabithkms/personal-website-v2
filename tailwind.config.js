/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0c",
        paper: "#f4f2ea",
        accent: {
          DEFAULT: "#d7ff3d",
          dim: "#a8cc1f",
        },
        signal: "#ff4d2e",
      },
      fontFamily: {
        sans: ["'Space Grotesk'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        brutal: "6px 6px 0 0 var(--shadow-color)",
        "brutal-sm": "4px 4px 0 0 var(--shadow-color)",
        "brutal-lg": "10px 10px 0 0 var(--shadow-color)",
        "brutal-press": "2px 2px 0 0 var(--shadow-color)",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        blink: "blink 1.1s steps(1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
