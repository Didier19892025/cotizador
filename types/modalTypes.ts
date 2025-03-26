// types/modalTypes.ts
import { RoleType } from './rolesType';
import { EmployeesType } from './employeesType';

export type ModalState = {
  type: 'none' | 'create' | 'edit' | 'detail';
  data?: RoleType | EmployeesType | number | undefined;
};