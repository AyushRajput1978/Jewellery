import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scrollbar: {
        rounded: true, 
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
export default config;
