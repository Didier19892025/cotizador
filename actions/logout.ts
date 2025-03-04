"use server";

import { cookies } from "next/headers";

export async function logout() {
  try {
    // Obtener el store de cookies
    const cookieStore = await cookies();
    
    // Eliminar la cookie del token
    cookieStore.delete("token");

    // Opcional: redirigir al usuario a la página de inicio de sesión

    return {
      success: true,
      message: "Logout successful.",
    };



  } catch (error) {
    console.error("Error during logout:", error);
    return {
      success: false,
      message: "An error occurred during logout.",
    };
  }
}