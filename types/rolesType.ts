import { Country, CurrencyType, ServiceEnum } from "@prisma/client";

export interface RoleType {
  id: number;
  jobRole: string;
  country: Country;
  area: string;
  cc: string;
  cphCode: string;
  cph: number;
  currency: CurrencyType;
  createdAt: Date;
  updatedAt: Date;
  employee: employeesType[];
  project: ProjectType[];
}

export interface ProjectType {
  id: number;
  country: Country;
  typeProject: string;
  costTicked: number;
  currencyType: CurrencyType;
  serviceEnum: ServiceEnum;
  createdAt: Date;
  updatedAt: Date;
}

export interface employeesType {
  id: number;
  fullName: string;
  email: string;
  status: boolean;
  phone: string;
  latamId: string;
  typeEmployee: string;
  createdAt: Date;
  updatedAt: Date;
  country: Country;
}
