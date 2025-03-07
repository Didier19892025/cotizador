import { Country, CurrencyType } from "@prisma/client";


export interface EmployeesType {
    id: number;
    fullName: string;
    email: string;
    status: boolean;
    latamId: string;
    typeEmployee: string;
    roleId: number;
    role: RoleType;
    createdAt: Date;
    updatedAt: Date;
}

export interface RoleType{
    id: number; 
    jobRole: string;
    country: Country;
    area: string;
    cc: string;
    cphCode: string;
    cph: number | string;
    currency: CurrencyType;
    createdAt: Date;
    updatedAt: Date;
}
