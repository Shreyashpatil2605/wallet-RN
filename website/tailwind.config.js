/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#080C14',
        card: '#0F1626',
        'card-hover': '#141E33',
        border: 'rgba(255, 255, 255, 0.08)',
        accent: {
          emerald: '#10B981',
          teal: '#14B8A6',
          cyan: '#06B6D4',
          indigo: '#6366F1',
          purple: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-emerald': '0 0 50px -10px rgba(16, 185, 129, 0.25)',
        'glow-purple': '0 0 50px -10px rgba(139, 92, 246, 0.25)',
        'glow-cyan': '0 0 50px -10px rgba(6, 182, 212, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
