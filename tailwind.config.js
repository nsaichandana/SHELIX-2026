/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#06081C",
        navy: {
          DEFAULT: "#0B1030",
          light: "#111842",
          border: "#232B5C",
        },
        electric: "#3B6EFF",
        violet: "#8B5CF6",
        magenta: "#D6409F",
        pulse: "#FF4FA3",
        ink: {
          primary: "#F4F5FF",
          muted: "#9AA0C7",
          faint: "#5B6191",
        },
      },
      fontFamily: {
        display: ["'Chakra Petch'", "sans-serif"],
        body: ["'Manrope'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      backgroundImage: {
        "helix-radial":
          "radial-gradient(60% 50% at 20% 20%, rgba(59,110,255,0.20) 0%, rgba(59,110,255,0) 60%), radial-gradient(50% 45% at 85% 15%, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0) 60%), radial-gradient(55% 60% at 75% 85%, rgba(214,64,159,0.18) 0%, rgba(214,64,159,0) 65%)",
        grid: "linear-gradient(rgba(154,160,199,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(154,160,199,0.06) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(59,110,255,0.25)",
        "glow-pink": "0 0 40px rgba(255,79,163,0.25)",
      },
      keyframes: {
        "pulse-travel": {
          "0%": { strokeDashoffset: "1200" },
          "100%": { strokeDashoffset: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-14px, 10px)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-travel": "pulse-travel 7s linear infinite",
        drift: "drift 14s ease-in-out infinite",
        flicker: "flicker 3.2s ease-in-out infinite",
        "fade-up": "fade-up 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
