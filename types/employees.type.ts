import { Country } from '@prisma/client'

export interface EmployeesType {
    id: number;
    fullName: string;
    email: string;
    status: boolean;
    latamId: string;
    typeEmployee: string;
    role: {
        id: number;
        jobRole: string;
        country: Country;
        area: string;
        cc: string;
        cphCode: string;
        cph: number;
        currency: string;
    }
}