/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          terra: '#E0533C',
          terraHover: '#C4422D',
          terraLight: '#FDF2EE',
          alpine: '#2A5C43',
          alpineLight: '#EAF2ED',
        },
        neutral: {
          canvas: '#FAF9F7',
          surface: '#FFFFFF',
          subtle: '#F3F1EC',
          border: '#E5E2DA',
          borderHover: '#CCC8BD',
          muted: '#827E74',
          body: '#45433E',
          obsidian: '#1A1917',
        },
        status: {
          success: '#2D7A4F',
          successBg: '#ECF6F0',
          warning: '#D97706',
          warningBg: '#FEF3C7',
          error: '#C53030',
          errorBg: '#FDF2F2',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'brand-glow': '0 4px 20px rgba(224, 83, 60, 0.28)',
        'subtle': '0 1px 3px rgba(26, 25, 23, 0.05), 0 2px 8px rgba(26, 25, 23, 0.03)',
        'card-hover': '0 8px 24px -4px rgba(26, 25, 23, 0.1)',
      }
    },
  },
  plugins: [],
}
