import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        danger: "var(--color-danger)",
        black: "var(--color-black)",
        white: "var(--color-white)",
        background: "var(--color-background)",
        backgroundCard: "var(--color-background-card)",
        gray: {
          600: "var(--color-gray-600)",
          800: "var(--color-gray-800)",
        },
      },
      borderRadius: {
        xl: "14px", // sesuai style input kamu
      },
    },
  },
  plugins: [],
} satisfies Config
