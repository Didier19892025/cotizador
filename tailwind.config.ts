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
        gray: '#404040',   // Color gray principal
        white: '#ffffff',  // Color blanco
        red: '#dc2626',    // Color rojo
        green: '#16a34a',  // Color verde
        blue: '#3490dc',   // Color azul principal
      },
      keyframes: {
        palpito: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },      // Comienza fuera de la pantalla
          '20%': { transform: 'translateX(-80%)', opacity: '0.2' },    // Aparece gradualmente
          '60%': { transform: 'translateX(-20%)', opacity: '0.8' },    // Sigue apareciendo
          '100%': { transform: 'translateX(0)', opacity: '1' },        // Llega a su posición final
        },
      },
      animation: {
        palpito: 'palpito 1s ease-out',
        slideInLeft: 'slideInLeft 1.5s ease-out',  // Duración más corta, efecto más suave
      },
    },
  },
  plugins: [],
} satisfies Config;