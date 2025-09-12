import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {} },
  plugins: [daisyui],
  daisyui: {
    themes: [
      // Default login theme
      {
        brand: {
          "primary":   "#5B8DEF", // blue
          "secondary": "#F97316", // orange
          "accent":    "#22D3EE", // cyan
          "neutral":   "#1F2937",
          "base-100":  "#0F172A", // slate-900
          "info":      "#60A5FA",
          "success":   "#34D399",
          "warning":   "#F59E0B",
          "error":     "#EF4444"
        }
      },
      // Role: sponsor (fresh, trust)
      {
        sponsor: {
          "primary":   "#16A34A", // emerald-600
          "secondary": "#0EA5A8", // teal/cyan
          "accent":    "#84CC16", // lime
          "neutral":   "#111827",
          "base-100":  "#0B1220",
          "info":      "#38BDF8",
          "success":   "#22C55E",
          "warning":   "#EAB308",
          "error":     "#F87171"
        }
      },
      // Role: advertiser (bold, creative)
      {
        advertiser: {
          "primary":   "#7C3AED", // violet-600
          "secondary": "#F43F5E", // rose-500
          "accent":    "#22D3EE",
          "neutral":   "#111827",
          "base-100":  "#0F172A",
          "info":      "#60A5FA",
          "success":   "#34D399",
          "warning":   "#F59E0B",
          "error":     "#EF4444"
        }
      },
      "light", "dark"
    ]
  }
} satisfies Config;
