import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        wood: "#8B5A2B",
        lightWood: "#C19A6B",
      },
  theme: {
    extend: {
      backgroundImage: {
        woodTexture: "url('/wood-texture.jpg')",
      },
    },
  },     
      fontFamily: {
        tamil: ["'Baloo Thambi 2'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
