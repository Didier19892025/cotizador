// Asegúrate de que tus interfaces coincidan con la estructura de datos de Prisma
export interface ServiceType {
  id: number;
  nameService: string;
  status: boolean;
  projectId?: number | null;
  createdAt: Date;
  updatedAt: Date;
  subServices: SubServiceType[];
}

export interface SubServiceType {
  id: number;
  nameSubService: string;
  status: boolean;
  serviceId: number;
  createdAt: Date;
  updatedAt: Date;
  itemSubServices: ItemSubServiceType[]; // Cambiado de itemSubService a itemSubServices para coincidir con Prisma
}

export interface ItemSubServiceType {
  id: number;
  nameItemSubService: string;
  status: boolean;
  subServiceId: number;
  createdAt: Date;
  updatedAt: Date;
}