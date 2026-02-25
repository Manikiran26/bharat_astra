/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0B1C2D',
                accent: {
                    cyan: '#00C6FF',
                    blue: '#4DA8FF',
                    glow: 'rgba(0, 198, 255, 0.3)',
                }
            },
            fontFamily: {
                display: ['Orbitron', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'sweep': 'sweep 3s ease-in-out infinite',
                'gradient-shift': 'gradient-shift 10s ease infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                sweep: {
                    '0%': { transform: 'translateX(-100%) skewX(-45deg)' },
                    '100%': { transform: 'translateX(200%) skewX(-45deg)' },
                },
                'gradient-shift': {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: 1, filter: 'brightness(1)' },
                    '50%': { opacity: 0.8, filter: 'brightness(1.5)' },
                }
            }
        },
    },
    plugins: [],
}
