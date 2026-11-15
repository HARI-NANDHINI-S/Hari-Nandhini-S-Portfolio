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
        cyber: {
          bg: '#050B16',
          card: '#0A1424',
          cardBorder: '#1A2E4C',
          cardHover: '#0E1C33',
          blue: '#168BFF',
          cyan: '#38D9FF',
          orange: '#FF852E',
          text: '#F4F7FC',
          muted: '#9BAAC0',
          darkMuted: '#627694',
        },
        light: {
          bg: '#F5F8FC',
          secondary: '#EAF0F8',
          card: '#FFFFFF',
          cardBorder: '#DCE5F0',
          cardHover: '#EAF0F8',
          text: '#10213A',
          muted: '#52647B',
          accentBlue: '#087BEA',
          accentCyan: '#0097C2',
          accentOrange: '#EF7928',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px rgba(22, 139, 255, 0.35)',
        'glow-cyan': '0 0 25px rgba(56, 217, 255, 0.35)',
        'glow-orange': '0 0 25px rgba(255, 133, 46, 0.35)',
        'glow-subtle': '0 0 15px rgba(22, 139, 255, 0.15)',
        'light-card': '0 4px 20px -2px rgba(16, 33, 58, 0.08), 0 2px 6px -1px rgba(16, 33, 58, 0.04)',
      },
      animation: {
        'marquee-left': 'marqueeLeft 30s linear infinite',
        'marquee-right': 'marqueeRight 30s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        marqueeLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        }
      }
    },
  },
  plugins: [
    function({ addVariant }) {
      addVariant('light', 'html.light &');
    }
  ],
}
