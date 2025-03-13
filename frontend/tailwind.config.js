module.exports = {
  theme: {
    extend: {
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'slow-spin': 'slow-spin 120s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'matrix-fall': 'matrix-fall 8s linear forwards',
        'matrix-char': 'matrix-char 0.5s ease-in-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'slow-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'matrix-fall': {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '10%': { opacity: 1 },
          '100%': { transform: 'translateY(1000%)', opacity: 0 }
        },
        'matrix-char': {
          '0%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 }
        }
      },
      colors: {
        'neon-blue': '#0ff',  // Cyan / Electric Blue
        'neon-green': '#0f0', // Bright Green
        'neon-purple': '#f0f' // Vibrant Purple
      },
      dropShadow: {
        neon: "0px 0px 8px rgba(0, 255, 255, 0.8)",  // Glowing neon effect
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}