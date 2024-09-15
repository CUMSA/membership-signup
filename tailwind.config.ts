import type { Config } from "tailwindcss";
import {content, plugin} from "flowbite-react/tailwind"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      brightness: {
        25: '.25',
        175: '1.75',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(),
  ],
};
export default config;
