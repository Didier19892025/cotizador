import { Country } from "@prisma/client";

export interface EmployeesType {
  id: number;
  fullName: string;
  email: string;
  status: boolean;
  latamId: string;
  phone: string;
  typeEmployee: string;
  roleId: number;
  country: Country;
  createdAt: Date;
  updatedAt: Date;
}


