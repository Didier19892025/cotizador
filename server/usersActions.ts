"use server"

import { UserSchemaType } from "@/schemas/zodUser";
import { prisma } from "@/src/lib/prisma"
import { UserType } from "@/types/userType"

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

// Function for creating a new user

export async function createUser(data: UserSchemaType) {
    if (!data) {
        return {
            success: false,
            message: "No data provided",
        };
    }
   
    try {
        const userExists = await prisma.users.findFirst({
            where: { userName: data.userName },
        })
        if (userExists) {
            return {
                success: false,
                message: "User already exists",
            };
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await prisma.users.create({
            data: {
                fullNameUser: data.fullNamaUser,
                userName: data.userName,
                password: hashedPassword,
                rol: data.rol,
            },
        })

        revalidatePath('users')
        return {
            success: true,
            message: "User created successfully",
            data: newUser,
        };
        
        
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Error creating user",
        };
    }
}


export async function getAllUsers(): Promise<UserType[]> {
    const users = await prisma.users.findMany();
    return users as UserType[];
}
