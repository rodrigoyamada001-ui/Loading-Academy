import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#6366F1", // Indigo/Blue
          secondary: "#8B5CF6", // Purple
          accent: "#A855F7",
          background: "#020205",
          surface: "#0A0A14",
          card: "#11111F",
          border: "#1F2937",
          muted: "#9CA3AF"
        },
        academy: {
          black: "#020205",
          ink: "#0C0D13",
          line: "#1F2937",
          purple: "#8B5CF6",
          blue: "#3B82F6",
          white: "#F8FAFC"
        },
        premium: {
          base: "#020205",
          surface: "#0A0A14",
          line: "#1F2937",
          cyan: "#22D3EE",
          gold: "#FBBF24",
          mist: "#E5E7EB"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        glow: "0 0 50px rgba(139, 92, 246, 0.15)",
        halo: "0 30px 90px rgba(0, 0, 0, 0.6)",
        "card-glow": "0 0 20px rgba(99, 102, 241, 0.1)"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "premium-gradient": "linear-gradient(145deg, #0A0A14 0%, #020205 100%)",
        "purple-glow": "radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)"
      }
    }
  },
  plugins: []
};

export default config;
