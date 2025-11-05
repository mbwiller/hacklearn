/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'leetcode-dark': {
          'bg-1': '#1a1a1a',
          'bg-2': '#282828',
          'bg-3': '#2a2d2e',
          'editor': '#282828',
          'border': 'rgba(255, 255, 255, 0.1)',
          'divider': '#3a3a3a',
        },
        'leetcode-text': {
          'primary': '#ffffff',
          'secondary': '#cccccc',
          'muted': '#858585',
          'code': '#d4d4d4',
        },
        'leetcode-accent': {
          'green': '#89d185',
          'blue': '#3794ff',
          'orange': '#FFA116',
          'red': '#f14c4c',
          'emerald': '#10B981',
        },
        'leetcode-syntax': {
          'comment': '#6a9955',
          'keyword': '#569cd6',
          'string': '#ce9178',
          'number': '#b5cea8',
          'function': '#dcdcaa',
          'type': '#4ec9b0',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'mono': ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
