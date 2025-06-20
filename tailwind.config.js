/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7A2187',
        'primary-light': '#9B4AA3',
        'primary-dark': '#5A1865',
        'primary-lighter': '#E8D5EA',
        secondary: '#2187A7',
        'secondary-light': '#4AA3C4',
        'secondary-dark': '#186585',
        'accent-gold': '#F7B32B',
        'accent-green': '#28A745',
        'accent-coral': '#FF6B6B',
        success: '#28A745',
        warning: '#FFC107',
        error: '#DC3545',
        info: '#17A2B8',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}