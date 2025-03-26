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
    const userFound = await prisma.user.findUnique({
      where: { userName: data.userName },
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

    // Crear el token JWT con el rol incluido
    const token = jwt.sign(
      {
        userId: userFound.id,
        fullNameUser: userFound.fullNameUser,
        role: userFound.rol,  // Incluimos el rol aquí
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "8h" } // Aumentamos el tiempo para mejor experiencia de usuario
    );

    // Guardamos el token en una cookie
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo https en producción
      path: "/",
      maxAge: 8 * 60 * 60, // 8 horas en segundos
      sameSite: "lax", // Importante para que funcione con redirecciones
    });

    // Guardamos el nombre del usuario en una cookie (si es necesario)
    (await cookies()).set("fullNameUser", userFound.fullNameUser, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production", // Solo https en producción
      path: "/",
      maxAge: 8 * 60 * 60, // 8 horas en segundos
      sameSite: "lax", // Importante para que funcione con redirecciones
    });

    // Si prefieres guardar el rol en una cookie, puedes hacerlo aquí también
    (await cookies()).set("rol", userFound.rol, {
      httpOnly: false,  // Lo dejamos en falso si deseas acceder al rol en el cliente
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 horas en segundos
      sameSite: "lax",
    });

    if(userFound){
      await prisma.logUser.create({
        data: {
          userId: userFound.id,
          loginTime: new Date(),
        },
      })
    }


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
