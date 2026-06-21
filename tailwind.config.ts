import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          black: "#080A0C",
          obsidian: "#0D0F12",
          gunmetal: "#161A20",
          panel: "#1C2028",
          border: "#252B35",
          blue: "#2D8EFF",
          "blue-dim": "#1A5CB8",
          "blue-glow": "rgba(45,142,255,0.15)",
          chrome: "#C8D0DC",
          silver: "#8A95A3",
          muted: "#4A5568",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Cascadia Code", "Consolas", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "forge-glow": "0 0 20px rgba(45,142,255,0.2), 0 0 60px rgba(45,142,255,0.06)",
        "forge-glow-sm": "0 0 10px rgba(45,142,255,0.15)",
        "forge-panel": "0 1px 0 rgba(255,255,255,0.04), 0 -1px 0 rgba(0,0,0,0.4)",
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "scan-line": "scan-line 2s linear infinite",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "slide-up": "slide-up 0.5s ease-out forwards",
        "boot-progress": "boot-progress 1.4s ease-in-out forwards",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "boot-progress": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
