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
          // ── Base surfaces (existing — do not rename) ──────────────────────
          black: "#080A0C",
          obsidian: "#0D0F12",
          gunmetal: "#161A20",
          panel: "#1C2028",
          border: "#252B35",
          // ── Added surfaces (Design System Day, additive) ──────────────────
          void: "#060709",            // deepest backdrop
          graphite: "#101318",        // between obsidian and gunmetal
          "panel-raised": "#21262F",  // a card lifted off a panel
          "border-strong": "#323945", // emphasized hairline / hover border
          // ── Accents ───────────────────────────────────────────────────────
          blue: "#2D8EFF",            // PRIMARY accent (existing; app depends on it)
          "blue-dim": "#1A5CB8",
          "blue-glow": "rgba(45,142,255,0.15)",
          violet: "#7C5CFF",          // SECONDARY accent — rare brand aura only
          // ── Text ──────────────────────────────────────────────────────────
          chrome: "#C8D0DC",
          silver: "#8A95A3",
          muted: "#4A5568",
          // ── Status / honesty (use only when meaningful) ───────────────────
          success: "#3FB950",         // real / passing / tested
          warn: "#D29922",            // planned / caution / untested
          danger: "#F85149",          // error / failing / blocked
          mock: "#8A95A3",            // mock (neutral steel, never alarming)
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
        // Restrained elevation for cards (depth, not glow).
        "forge-card": "0 1px 2px rgba(0,0,0,0.35), 0 6px 16px -8px rgba(0,0,0,0.45)",
        // Consistent electric-blue keyboard focus ring.
        "forge-focus": "0 0 0 1.5px rgba(45,142,255,0.55)",
      },
      borderRadius: {
        // Design System Day scale: badges 6 / controls 8 / cards 10 / panels 12.
        "forge-badge": "6px",
        "forge-control": "8px",
        "forge-card": "10px",
        "forge-panel": "12px",
      },
      transitionDuration: {
        // 150–250ms normal, ≤300ms larger (250 is missing from Tailwind defaults).
        "250": "250ms",
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
