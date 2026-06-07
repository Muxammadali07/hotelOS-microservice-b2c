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
        primary: {
          600: "#0284c7",
          500: "#0ea5e9",
          400: "#38bdf8",
          300: "#7dd3fc",
          100: "#e0f2fe",
        },
      },
    },
  },
  plugins: [],
};

export default config;
