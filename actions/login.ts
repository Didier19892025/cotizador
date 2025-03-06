"use server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { loginType } from "@/schemas/zodLogin";

export async function login(data: loginType) {
  if (!data) {
    return {
      success: false,
      message: "No data provided",
    };
  }

  try {
    const userFound = await prisma.users.findUnique({
      where: { userName: data.userName },
      include: { Employee: true },
    });

    if (!userFound) {
      return {
        success: false,
        message: "User not found",
      };
    }

    if (!userFound.password) {
      return {
        success: false,
        message: "Password not set for user",
      };
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      userFound.password
    );
    if (!passwordMatch) {
      return {
        success: false,
        message: "Password does not match",
      };
    }

    // Payload con más información para uso en el middleware y aplicación
    const payload = {
      id: userFound.id,
      role: userFound.rol,
      userName: userFound.userName,
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "secret",
      { expiresIn: "8h" } // Aumentamos el tiempo para mejor experiencia de usuario
    );

    // Guardamos el token en una cookie
    const cookieStore = await cookies();
    await cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo https en producción
      path: "/",
      maxAge: 8 * 60 * 60, // 8 horas en segundos
      sameSite: "lax", // Importante para que funcione con redirecciones
    });
    
    
    return {
      success: true,
      message: "User logged in",
      userFound,
    };
    
    
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while logging in",
    };
  }
}
