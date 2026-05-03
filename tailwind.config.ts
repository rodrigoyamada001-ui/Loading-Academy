import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        academy: {
          black: "#050509",
          ink: "#0C0D13",
          line: "#242638",
          purple: "#8B5CF6",
          blue: "#38BDF8",
          white: "#F8FAFC"
        },
        premium: {
          base: "#07111F",
          surface: "#102238",
          line: "#29496E",
          cyan: "#5EEAD4",
          gold: "#F6C453",
          mist: "#E5EEF8"
        }
      },
      fontFamily: {
        sans: ["var(--font-sora)", "Segoe UI", "sans-serif"],
        display: ["var(--font-cormorant)", "Times New Roman", "serif"]
      },
      boxShadow: {
        glow: "0 0 50px rgba(139, 92, 246, 0.24)",
        halo: "0 30px 90px rgba(12, 31, 56, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;
