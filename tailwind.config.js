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
        editor: {
          bg: '#0d1117',
          sidebar: '#161b22',
          border: '#30363d',
          line: '#6e7681',
          highlight: '#1f242c',
          diffAdd: '#0d321c',
          diffAddText: '#3fb950',
          diffDelete: '#3b1219',
          diffDeleteText: '#f85149',
        }
      }
    },
  },
  plugins: [],
}
