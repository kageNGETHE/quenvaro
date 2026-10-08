import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        quill: "#f5f3ee",
        ink: "#1b1f2a",
        blue: "#7aa4c4",
        plum: "#4e3a4d",
        gold: "#c8a66b",
        slate: "#7e93a4",
        stone: "#d9d1c4",
      },
      boxShadow: {
        soft: "0 25px 60px rgba(17, 40, 60, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
