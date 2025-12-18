/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#78806f',
          hover: '#B39952',
        },
        dark: {
          DEFAULT: '#1a1a1a',
          card: '#2D5A4A',
        },
        teal: {
          DEFAULT: '#3D6B59',
          light: '#5FCFB5',
        },
        gray: {
          50: '#fafafa',
          100: '#f7f7f7',
          150: '#f5f5f5',
          200: '#f0f0f0',
          300: '#e8e8e8',
          400: '#d0d0d0',
          500: '#999999',
          600: '#666666',
          700: '#333333',
        },
        pink: {
          light: '#fdf8f4',
        },
        beige: {
          light: '#f0ebe0',
        }
      },
      fontFamily: {
        inter: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'xl': '10px',
        '2xl': '12px',
        '3xl': '20px',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'fab': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'fab-hover': '0 6px 20px rgba(0, 0, 0, 0.2)',
        'chat': '0 8px 32px rgba(0, 0, 0, 0.15)',
      },
      screens: {
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontSize: {
        'xxs': ['10px', '14px'],
      }
    },
  },
  plugins: [],
}
