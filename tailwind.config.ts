import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",
        graphite: "#17181B",
        steel: "#26272B",
        mist: "#F5F5F4",
        metal: {
          red: "#FF3131",
          dark: "#D91F1F",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        shell: "80rem",
      },
    },
  },
  plugins: [],
};
export default config;
