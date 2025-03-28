import { Country } from "@prisma/client";

export interface RoleType {
  id: number;
  jobRole: string;
  country: Country;
  area: string;
  cc: string;
  cphCode: string;
  cph: number;
  currencyId: number;
  currency: {
    id: number;
    code: string;
    name: string;
    rate: number;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  employee: {
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
    roleId: number;
  }[];
  project: {
    id: number;
    country: Country;
    typeProject: string;
    costTicked: number;
    currencyId: number;
    roleId: number;
    productId: number;
    clientId: number;
    tecnologyId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
