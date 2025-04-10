
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        cyberPurple: {
          DEFAULT: '#9b87f5',
          dark: '#7E69AB',
          light: '#b29eff'
        },
        cyberBlue: {
          DEFAULT: '#1EAEDB',
          dark: '#0e8bb1',
          light: '#40c8f1'
        },
        cyberOrange: {
          DEFAULT: '#F97316',
          dark: '#d55f0c',
          light: '#ff9544'
        },
        cyberDark: {
          DEFAULT: '#1A1F2C',
          darker: '#0d1117',
          lighter: '#2c3647'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glitch": {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-5px, 5px)" },
          "40%": { transform: "translate(-5px, -5px)" },
          "60%": { transform: "translate(5px, 5px)" },
          "80%": { transform: "translate(5px, -5px)" },
          "100%": { transform: "translate(0)" },
        },
        "float": {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0px)" },
        },
        "neon-pulse": {
          "0%, 100%": { 
            textShadow: "0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #9b87f5, 0 0 80px #9b87f5, 0 0 90px #9b87f5, 0 0 100px #9b87f5, 0 0 150px #9b87f5"
          },
          "50%": { 
            textShadow: "0 0 4px #fff, 0 0 10px #fff, 0 0 18px #fff, 0 0 38px #9b87f5, 0 0 73px #9b87f5, 0 0 80px #9b87f5, 0 0 94px #9b87f5, 0 0 140px #9b87f5"
          },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 5px #9b87f5, 0 0 10px #9b87f5, 0 0 15px #9b87f5" },
          "50%": { boxShadow: "0 0 20px #9b87f5, 0 0 30px #9b87f5, 0 0 40px #9b87f5" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glitch": "glitch 0.5s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite"
      },
      backgroundImage: {
        'cyber-grid': "url('/src/assets/cyber-grid.svg')",
        'neon-glow': "linear-gradient(135deg, rgba(155,135,245,0.4) 0%, rgba(30,174,219,0.4) 100%)",
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
