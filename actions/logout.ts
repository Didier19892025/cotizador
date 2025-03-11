"use server";

import { cookies } from "next/headers";

export async function logoutS() {
  try {
    // Obtener el store de cookies
    const cookieStore = await cookies();
    
    // Eliminar la cookie del token
    cookieStore.delete("token");
    cookieStore.delete("fullNameUser");

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