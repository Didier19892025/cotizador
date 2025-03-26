// src/utils/formatCurrency.ts
export function formatCurrency(value: number | undefined): string {
  // Manejar valores undefined o null
  if (value === undefined || value === null) {
    return '$0.00';
  }

  let formattedValue = '';

  // Formatear el valor según el tamaño
  if (value < 10000) {
    // Si el valor es menor a 10000, usar punto para miles y coma para decimales
    formattedValue = `${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else {
    // Si el valor es 10000 o mayor, usar coma para miles y punto para decimales
    formattedValue = `${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  return formattedValue;
}