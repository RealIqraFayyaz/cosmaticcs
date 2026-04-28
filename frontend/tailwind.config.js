/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07060A",
          900: "#0E0C12",
          800: "#17141E",
        },
        gold: {
          50: "#FFF7D6",
          200: "#F7E3A0",
          400: "#E6C972",
          600: "#C9A84C",
        },
        nude: {
          50: "#FFF7F3",
          100: "#FDEDE6",
          200: "#F7D8CB",
          400: "#E7B7A4",
        },
        blush: {
          50: "#FFF1F6",
          100: "#FFE4EE",
          300: "#F7B6CB",
          500: "#E96C97",
        },
      },
      fontFamily: {
        display: ["\"Playfair Display\"", "ui-serif", "Georgia", "serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        "soft-xl": "0 30px 80px rgba(0,0,0,.35)",
        "glass": "0 10px 30px rgba(0,0,0,.25)",
      },
      backdropBlur: {
        "glass": "18px",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

