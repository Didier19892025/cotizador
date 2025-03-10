import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: '#4f46e5', // Color indigo principal
        purple: '#f3e8ff', // Color purple principal
        violet: '#7c3aed', // Color violet principal
        gray: '#6b7280',   // Color gray principal
        white: '#ffffff',  // Color blanco
        red: '#dc2626',    // Color rojo
      },
      keyframes:{
        palpito:{
          '0%': {transform: 'scale(0.9)', opacity:'0.7'},
          '50%': {transform:'scale(1.05)', opacity:'1'},
          '100%': {transform: 'scale(1)', opacity:'1'}
        }
      },
      animation:{
        palpito:'palpito 1s ease-out'
      }
    },
  },
  plugins: [],
} satisfies Config;
