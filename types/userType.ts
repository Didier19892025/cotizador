import { UserRole } from "@prisma/client";


export interface UserType{
    id: number;
    fullNameUser: string;
    userName: string;
    password: string;
    rol: UserRole;
    createdAt: Date;
    updatedAt: Date;
    logUser: LogUserType[];
}

export interface LogUserType {
    id: number;
    userId: number;
    loginTime: Date;
    logoutTime: Date;   
    createdAt: Date;
    updatedAt: Date;
}
