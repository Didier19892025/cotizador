import { UserRole } from "@prisma/client";
import { z } from "zod";


export const UserSchema = z.object({
    id: z.string().optional(),
    fullNameUser: z.string().min(1, { message: 'Full name is required' }),
    userName: z.string().min(1, { message: 'User name name is required' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    rol: z.nativeEnum(UserRole, { message: 'Role is required, and must be a valid role' }),
});


export type UserSchemaType = z.infer<typeof UserSchema>;