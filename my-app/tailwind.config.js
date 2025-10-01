/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
        // Vintage book color palette
        'parchment': {
          50: '#fdfcf8',
          100: '#faf8f1',
          200: '#f4ede4',
          300: '#e8dcc7',
          400: '#d4c4a0',
          500: '#c2a878',
          600: '#a08968',
          700: '#826e56',
          800: '#6b5a48',
          900: '#5a4b3d',
        },
        'burgundy': {
          50: '#fdf2f4',
          100: '#fce8eb',
          200: '#fad5db',
          300: '#f4a4b4',
          400: '#ec7b92',
          500: '#df4765',
          600: '#cc2e52',
          700: '#a82343',
          800: '#8e1f3a',
          900: '#7a1e35',
          950: '#4a0d1d',
        },
        'forest': {
          50: '#f3f6f4',
          100: '#e1eae3',
          200: '#c4d5c9',
          300: '#9db5a4',
          400: '#6f8e79',
          500: '#4e6f5a',
          600: '#3c5645',
          700: '#314538',
          800: '#29382e',
          900: '#232f27',
          950: '#141a15',
        },
        'ink': {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#3d3d3d',
          900: '#2d2d2d',
          950: '#1a1a1a',
        },
        'gold-leaf': {
          50: '#fcf9ea',
          100: '#f8f2c9',
          200: '#f2e396',
          300: '#e9cd59',
          400: '#dfb52f',
          500: '#c99a1f',
          600: '#a87619',
          700: '#865318',
          800: '#6f431a',
          900: '#5e381a',
          950: '#361d0b',
        },
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'aurora': 'aurora 10s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'page-turn': 'page-turn 0.6s ease-in-out',
        'bookmark-drop': 'bookmark-drop 0.4s ease-out',
        'typewriter': 'typewriter 2s steps(40, end)',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)',
          },
        },
        aurora: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'aurora-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #feca57 100%)',
        'mesh-gradient': 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        'paper-texture': 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27100%27%3E%3Cfilter id=%27paper%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.04%27 result=%27noise%27 seed=%271%27%3E%3C/feTurbulence%3E%3CfeDiffuseLighting in=%27noise%27 lighting-color=%27white%27 surfaceScale=%271%27%3E%3CfeDistantLight azimuth=%2745%27 elevation=%2760%27%3E%3C/feDistantLight%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23paper)%27%3E%3C/rect%3E%3C/svg%3E")',
        'vintage-gradient': 'linear-gradient(135deg, #f4ede4 0%, #e8dcc7 25%, #d4c4a0 50%, #c2a878 75%, #a08968 100%)',
        'leather-texture': 'radial-gradient(ellipse at center, #8b4513 0%, #654321 50%, #3e2723 100%)',
      },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Playfair Display', 'Merriweather', 'Georgia', 'serif'],
        display: ['Cinzel', 'Playfair Display', 'serif'],
        body: ['Crimson Text', 'Merriweather', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glow': '0 0 40px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 60px rgba(139, 92, 246, 0.4)',
        'inner-glow': 'inset 0 0 30px rgba(139, 92, 246, 0.2)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
