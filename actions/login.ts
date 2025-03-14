"use server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { loginType } from "@/schemas/zodLogin";
import { revalidatePath } from "next/cache";

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

    const token = jwt.sign(
      {
        userId: userFound.id,
        fullNameUser: userFound.fullNameUser,
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

    (await cookies()).set("fullNameUser", userFound.fullNameUser, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production", // Solo https en producción
      path: "/",
      maxAge: 8 * 60 * 60, // 8 horas en segundos
      sameSite: "lax", // Importante para que funcione con redirecciones
    });

    revalidatePath('/')  

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
