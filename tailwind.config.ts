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
        gwd: {
          bg: "#0a0f0a",
          surface: "#0d120d",
          card: "#111811",
          border: "#1a2e1a",
          accent: "#4ade80",
          muted: "#86efac",
          label: "#bbf7d0",
        },
      },
      fontFamily: {
        display: ["var(--font-press-start-2p)", "ui-monospace", "monospace"],
        body: ["var(--font-share-tech-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-share-tech-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        heroGlow:
          "radial-gradient(ellipse 80% 60% at 72% 40%, rgba(74,222,128,0.12) 0%, transparent 60%)",
      },
      keyframes: {
        spotlightPulse: {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
        spotlightColor: {
          "0%, 100%": { filter: "blur(267px)" },
          "50%": { filter: "blur(240px)" },
        },
        floating: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.7" },
          "50%": { transform: "translateY(10%)", opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-38px 0" },
          "100%": { backgroundPosition: "calc(200% + 38px) 0" },
        },
        flapTick: {
          "0%, 100%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(-90deg)" },
        },
      },
      animation: {
        "spotlight-pulse": "spotlightPulse 4s ease-in-out infinite",
        "spotlight-color": "spotlightColor 5s ease-in-out infinite",
        floating: "floating 4s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
        "flap-tick": "flapTick 0.35s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
