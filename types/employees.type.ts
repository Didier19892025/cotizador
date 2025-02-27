import { Country, CurrencyType } from "@prisma/client";


export interface EmployeesType {
    id: number;
    fullName: string;
    email: string;
    status: boolean;
    latamId: string;
    typeEmployee: string;
    userId: number | null;
    roleId: number;
    role: {
        id: number;
        jobRole: string;
        country: Country;
        area: string;
        cc: string;
        cphCode: string;
        cph: number | string;
        currency: CurrencyType;
    }
}
