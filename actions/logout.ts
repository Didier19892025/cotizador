"use server";

import { cookies } from "next/headers";
import { prisma } from "@/src/lib/prisma";
import jwt from "jsonwebtoken";

export async function logoutS() {
  try {
    // Obtener el token de las cookies
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "No hay sesión activa.",
      };
    }

    // Decodificar el token para obtener el ID del usuario
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { 
      userId: number 
    };

    // Buscar el último registro de log sin hora de salida para este usuario
    const lastLogEntry = await prisma.logUser.findFirst({
      where: {
        userId: decoded.userId,
        logoutTime: null
      },
      orderBy: {
        loginTime: 'desc'
      }
    });

    // Si existe un registro sin hora de salida, actualizarlo
    if (lastLogEntry) {
      await prisma.logUser.update({
        where: { id: lastLogEntry.id },
        data: { logoutTime: new Date() }
      });
    }

    // Eliminar las cookies
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("fullNameUser");
    cookieStore.delete("rol");

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