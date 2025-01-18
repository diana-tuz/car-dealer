import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#a78bfa", 
        secondary: "#7c3aed",  
        default: "#c4b5fd",  
        text: "#4c1d95",  
        accent: "#facc15",  
        white: "#ffffff",  
      },
    },
  },
  plugins: [],
} satisfies Config;
