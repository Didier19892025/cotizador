// src/utils/formatName.ts

export function capitalizeName(name: string): string {
    return name
      .split(" ") // Separa el nombre por espacios
      .map((word) => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ) // Convierte la primera letra a mayúscula y el resto a minúsculas
      .join(" "); // Une las palabras nuevamente con un espacio
  }
  