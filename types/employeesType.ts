import { Country, CurrencyType, ServiceEnum } from "@prisma/client";

export interface EmployeesType {
  id: number;
  fullName: string;
  email: string;
  status: boolean;
  latamId: string;
  typeEmployee: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;

  // Cambiar role de RoleType[] a RoleType (porque es un solo objeto, no un arreglo)
  role: RoleType;
  project: ProjectType[];
}

export interface RoleType {
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

export interface ProjectType {
  id: number;
  country: Country;
  typeProject: string;
  costTicked: number;
  currencyType: CurrencyType;
  serviceEnum: ServiceEnum;
}
