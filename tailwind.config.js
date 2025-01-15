/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        light: {
          backgroundPrimary: '#FFFFFF',
          backgroundSecondary: '#4B5563',
          textPrimary: '#111827',
          textSecondary: '#4B5563',
          primary: '#10B981',
          secondary: '#2563EB',
          danger: '#EF4444',
        },
      },
    },
  },
  plugins: [],
};
