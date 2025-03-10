import { UserRole } from "@prisma/client";


export interface UserType{
    id: number;
    fullNameUser: string;
    userName: string;
    password: string;
    rol: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
