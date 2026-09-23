/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: '#121213',
        surface: '#1a1a1b',
        'surface-2': '#272729',
        'surface-3': '#2a2a2b',
        border: '#3a3a3c',
        text: '#ffffff',
        'text-muted': '#818384',
        correct: '#538d4e',
        'correct-text': '#ffffff',
        present: '#b59f3b',
        'present-text': '#ffffff',
        absent: '#e63946',
        'absent-text': '#ffffff',
        danger: '#e63946',
        'danger-hover': '#d62828',
        focus: '#6AAA64',
        brand: '#6AAA64',
        'tile-focused': '#565758',
      },
      fontFamily: {
        base: ['system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '14px',
      },
      boxShadow: {
        modal: '0 4px 20px rgba(0, 0, 0, 0.4)',
      },
      transitionDuration: {
        fast: '150ms',
      },
      transitionTimingFunction: {
        fast: 'ease',
      },
    }
  },
  plugins: []
}