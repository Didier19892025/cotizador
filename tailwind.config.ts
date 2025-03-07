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
        slideDown:{
          '0%':{transform:'translateY(-100%)'},
          '100%':{transform:'translateY(0)'}
        }
      },
      animation:{
        slideDown:'slideDown 1s ease-in-out'
      }
    },
  },
  plugins: [],
} satisfies Config;
