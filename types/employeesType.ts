import { Country } from "@prisma/client";
import { RoleType } from "./rolesType";

export interface EmployeesType {
  id: number;
  fullName: string;
  email: string;
  status: boolean;
  latamId: string;
  phone: string;
  typeEmployee: string;
  country: Country;
  createdAt: Date;
  updatedAt: Date;
  role: RoleType; // Changed from RoleType[] to RoleType
  roleId: number; // Add this field to match the Prisma model
}