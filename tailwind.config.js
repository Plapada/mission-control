/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        'card': '20px',
        'button': '12px',
        'input': '8px',
      },
      boxShadow: {
        'glass': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'glass': '16px',
      },
      colors: {
        priority: {
          low: '#94a3b8',
          medium: '#3b82f6',
          high: '#f59e0b',
          urgent: '#ef4444',
        },
        status: {
          sleeping: '#94a3b8',
          working: '#10b981',
          blocked: '#ef4444',
        },
      },
    },
  },
  plugins: [],
}
