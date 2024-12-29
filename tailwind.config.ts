import type { Config } from "tailwindcss";
import tailwindScrollbar from "tailwind-scrollbar";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        foreground: "hsl(var(--foreground))",
        accent: "hsl(var(--accent))",
        background: {
          DEFAULT: "hsl(var(--background))",
          subtle: "hsl(var(--background-subtle))",
        },
        content: {
          DEFAULT: "hsl(var(--content))",
          subtle: "hsl(var(--content-subtle))",
        },
        alert: {
          DEFAULT: "hsl(var(--alert))",
          subtle: "hsl(var(--alert-subtle))",
        },
      },
    },
  },
  plugins: [tailwindScrollbar({ nocompatible: true })],
};

export default config;
