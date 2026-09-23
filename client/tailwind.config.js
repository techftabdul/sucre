/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FAF6E8',
          100: '#F5ECBE',
          200: '#EBD784',
          300: '#E1C24A',
          400: '#D4AF37', // Brand Primary Gold
          500: '#C5A059', // Metallic Accent
          600: '#A3803C',
          700: '#816127',
          800: '#5F4417',
          900: '#3D2A0C',
        },
        cathedral: {
          bg: '#0A0B0E',        // Deep Charcoal Black
          card: '#12141A',      // Subtle Card Surface
          elevated: '#1A1D26',  // Elevated Border/Modal
          border: '#2C303E',    // Divider border
          ivory: '#FAF9F6',     // Warm Ivory Text/Surface
          cream: '#F4F1EA',
          muted: '#9CA3AF',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        script: ['"Alex Brush"', 'cursive'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 40px rgba(212, 175, 55, 0.4)',
        'cathedral-card': '0 10px 30px -5px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #A3803C 100%)',
        'gold-metallic': 'linear-gradient(135deg, #EBD784 0%, #C5A059 50%, #816127 100%)',
        'dark-glass': 'linear-gradient(180deg, rgba(18, 20, 26, 0.85) 0%, rgba(10, 11, 14, 0.95) 100%)',
      }
    },
  },
  plugins: [],
}
