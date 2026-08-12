import type { Config } from "tailwindcss";

/**
 * Paleta DK Eletromóveis (fornecida pelo cliente)
 *   sand    #D9B698   olive  #ABB369   moss  #5B7A3A
 *   forest  #3E632F   pine   #234A29   ink   #182625
 *
 * As cores semânticas (bg, surface, primary…) são dirigidas por CSS variables
 * definidas em globals.css, permitindo tema claro/escuro sem duplicar classes.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta bruta
        sand: "#D9B698",
        olive: "#ABB369",
        moss: "#5B7A3A",
        forest: "#3E632F",
        pine: "#234A29",
        ink: "#182625",
        // Tokens semânticos (via CSS vars — canal RGB para suportar /opacidade)
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        content: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--border) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-ink": "rgb(var(--primary-ink) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      fontFamily: {
        sans: [
          "Roboto",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Roboto",
          "system-ui",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        // Escala de raio inspirada no Material 3
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "28px",
      },
      boxShadow: {
        // Elevações Material (suaves e discretas)
        e1: "0 1px 2px rgba(24,38,37,.10), 0 1px 3px rgba(24,38,37,.06)",
        e2: "0 2px 6px rgba(24,38,37,.10), 0 1px 2px rgba(24,38,37,.06)",
        e3: "0 6px 16px -6px rgba(24,38,37,.22), 0 2px 6px rgba(24,38,37,.08)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up .5s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
