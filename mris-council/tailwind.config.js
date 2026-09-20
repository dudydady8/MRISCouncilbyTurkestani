import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: { 900: "#1e3a8a", 800: "#1e40af", 700: "#1d4ed8", 600: "#2563eb", 500: "#3b82f6", 400: "#60a5fa", 300: "#93c5fd", 200: "#bfdbfe", 100: "#dbeafe", 50: "#eff6ff" },
        ok: "#10b981", warn: "#f59e0b", bad: "#ef4444",
      },
      borderRadius: { card: "16px" },
    },
  },
  plugins: [],
};
export default config;