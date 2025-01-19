/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", "!./node_modules"],
  theme: {
    extend: {
      animation: {
        blink: "blink 2s infinite",
        marquee: "marquee 15s linear infinite forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": {
            opacity: 0,
          },
          "40%,50%,60%": {
            opacity: 1,
          },
        },
        marquee: {
          "0%": {
            transform: "translateX(-200%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      colors: {
        light: {
          background: "#f1f5f9",
          textPrimary: "#111827",
          textSecondary: "#4B5563",
          primary: "#10B981",
          secondary: "#2563EB",
          danger: "#EF4444",
        },
      },
    },
  },
  plugins: [],
};
