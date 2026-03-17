import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "notes-title": "hsl(var(--notes-title))",
        "notes-subtitle": "hsl(var(--notes-subtitle))",
        "notes-text": "hsl(var(--notes-text))",
        "notes-card-border": "hsl(var(--notes-card-border))",
        "notes-formula-bg": "hsl(var(--notes-formula-bg))",
        "notes-formula-border": "hsl(var(--notes-formula-border))",
        "notes-formula-icon": "hsl(var(--notes-formula-icon))",
        "notes-h3": "hsl(var(--notes-h3))",
        "notes-highlight": "hsl(var(--notes-highlight))",
        "notes-highlight-bg": "hsl(var(--notes-highlight-bg))",
        "notes-blockquote-bg": "hsl(var(--notes-blockquote-bg))",
        "notes-blockquote-border": "hsl(var(--notes-blockquote-border))",
        "notes-success": "hsl(var(--notes-success))",
        "notes-success-bg": "hsl(var(--notes-success-bg))",
        "notes-info": "hsl(var(--notes-info))",
        "notes-info-bg": "hsl(var(--notes-info-bg))",
        "notes-warning": "hsl(var(--notes-warning))",
        "notes-warning-bg": "hsl(var(--notes-warning-bg))",
        "notes-table-header": "hsl(var(--notes-table-header))",
        "notes-table-stripe": "hsl(var(--notes-table-stripe))",
        "notes-hr": "hsl(var(--notes-hr))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
