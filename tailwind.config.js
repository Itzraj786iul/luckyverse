/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pastel: {
          lilac: '#E6E6FA',
          pink: '#FFB6C1',
          blue: '#87CEEB',
          ivory: '#FFFFF0',
          lavender: '#F8F4FF',
          rose: '#FFF0F5',
          mint: '#F0FFFF',
          peach: '#FFEEE6',
        },
        lv: {
          midnight: '#05070d',
          night: '#0a1018',
          himalayan: '#1e3a5f',
          himalayanMuted: '#2d4a6f',
          forest: '#14261f',
          forestGlow: '#1f3d32',
          campfire: '#c45c26',
          campfireSoft: '#e07840',
          fog: '#8a939e',
          dust: '#c9bfb2',
          dustDeep: '#9a8f82',
          river: '#2a4d5c',
          aurora: '#1f5f55',
          star: '#dce6f5',
          text: '#e8edf5',
          muted: 'rgba(232, 237, 245, 0.62)',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        dancing: ['Dancing Script', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'lv-radial-fog':
          'radial-gradient(120% 80% at 50% 100%, rgba(30,58,95,0.45) 0%, transparent 55%)',
        'lv-aurora':
          'linear-gradient(115deg, rgba(31,95,85,0.35) 0%, rgba(30,58,95,0.2) 40%, rgba(196,92,38,0.12) 100%)',
        'lv-vignette':
          'radial-gradient(ellipse at center, transparent 40%, rgba(5,7,13,0.85) 100%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(196, 92, 38, 0.15)',
        'glow-blue': '0 0 50px rgba(45, 74, 111, 0.35)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
        'gentle-bounce': 'gentleBounce 2s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        heartbeat: 'heartbeat 2s ease-in-out infinite',
        'particle-float': 'particleFloat 8s ease-in-out infinite',
        'slow-drift': 'lvDrift 22s ease-in-out infinite',
        'fog-pulse': 'lvFog 14s ease-in-out infinite',
        'ember': 'lvEmber 3s ease-in-out infinite',
        'lantern-sway': 'lvSway 6s ease-in-out infinite',
        'grain': 'lvGrain 8s steps(10) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        gentleBounce: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-30px) rotate(120deg)' },
          '66%': { transform: 'translateY(-15px) rotate(240deg)' },
        },
        lvDrift: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-12px) translateX(6px)' },
        },
        lvFog: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.55' },
        },
        lvEmber: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        },
        lvSway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        lvGrain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '50%': { transform: 'translate(-2%, 2%)' },
        },
      },
    },
  },
  plugins: [],
};
