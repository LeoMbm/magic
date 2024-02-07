import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./content/**/*.mdx",
    "./public/**/*.svg",
    "./components/**/*.{ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {},
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
