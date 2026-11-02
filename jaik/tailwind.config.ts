import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-primary": "#141414",
        "main-secondary": "#2b2b2b",
        "main-gray": "#808080",
        "main-red": "#ff4d4d",
      },
    },
  },
  plugins: [],
};

export default config;
