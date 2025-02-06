"use server"

import { prisma } from "@/src/lib/prisma";
import { User } from "@/src/zod/user_zod";  // Asegúrate de importar el esquema User de Zod
import bcrypt  from 'bcryptjs'

export async function createUser(data: User) {
    console.log('Datos llegando al server', data);

    // Verificación si los datos no son válidos
    if (!data) {
        return {
            success: false,
            message: 'No se recibieron los datos',
        };
    }

    // Desestructuramos los datos para tener acceso a los valores

    try {
        // Comprobamos si ya existe un usuario con el mismo userName
        const userExis = await prisma.user.findFirst({
            where: {
                OR: [{ email: data.email },
                    {userName: data.userName}
                ]
            },
        });

        if (userExis) {
            // Si el usuario ya existe, enviamos un mensaje de error
            const conflicto = userExis.email === data.email
            ? "email"
            : "usuario"
            return {
                success: false,
                message: `El ${conflicto} ya está en uso. Por favor, intente con otro.`,
            };
        }

        const hashedPassword = await bcrypt.hash(data.password, 10); // Asegúrate de encriptar la contraseña antes de guardarla
        // Si el usuario no existe, procedemos a crear un nuevo usuario
        const newUser = await prisma.user.create({
            data: {
                userName: data.userName,
                email: data.email,
                password: hashedPassword, // Asegúrate de encriptar la contraseña antes de guardarla
                name: data.name,
                role: data.role,
            },
        });

        return {
            success: true,
            message: 'Usuario creado con éxito',
            user: newUser,
        };
    } catch (error) {
        console.error('Error al procesar la solicitud', error);
        return {
            success: false,
            message: 'Error al procesar la solicitud',
        };
    }
}
