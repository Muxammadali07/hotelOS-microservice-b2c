import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          950: "#09090b",
          900: "#18181b",
          800: "#27272a",
          700: "#3f3f46",
          600: "#52525b",
        },
        brand: {
          600: "#7c3aed",
          500: "#8b5cf6",
          400: "#a78bfa",
          300: "#c4b5fd",
          100: "#ede9fe",
        },
      },
    },
  },
  plugins: [],
};

export default config;
