/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0e17",
        surface: "#111827",
        surfaceAlt: "#1a2236",
        primary: "#00e5a0",
        secondary: "#00b4d8",
        accent: "#ff6b6b",
        warning: "#fbbf24",
        textLight: "#e2e8f0",
        textMuted: "#64748b",
        glow: "#00e5a0",
        border: "#1e293b",
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        body: ['"Rajdhani"', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 229, 160, 0.3), 0 0 60px rgba(0, 229, 160, 0.1)',
        'neon-sm': '0 0 10px rgba(0, 229, 160, 0.2), 0 0 30px rgba(0, 229, 160, 0.05)',
        'neon-blue': '0 0 20px rgba(0, 180, 216, 0.3), 0 0 60px rgba(0, 180, 216, 0.1)',
        'neon-red': '0 0 20px rgba(255, 107, 107, 0.3), 0 0 60px rgba(255, 107, 107, 0.1)',
        'panel': '0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      borderRadius: {
        'lab': '0.75rem',
      },
      animation: {
        'scan': 'scan 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'grid-move': 'gridMove 20s linear infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gridMove: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 50px)' },
        },
      },
    },
  },
  plugins: [],
}
