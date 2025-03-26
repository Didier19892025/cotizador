"use server";

import { ItemSubServiceSchemaType, ServiceSchemaType, SubServiceSchemaType } from "@/schemas/zodServices";
import { prisma } from "@/src/lib/prisma";
import { ServiceType } from "@/types/servicesType";
import { revalidatePath } from "next/cache";

// Acción para crear un nuevo servicio
export async function createService(data: ServiceSchemaType) {
  if (!data) {
    return {
      success: false,
      message: "No data provided",
    };
  }
  try {
    const newService = await prisma.service.create({
      data: data,
    });

    revalidatePath("/services");
    return {
      success: true,
      message: "Servicio creado exitosamente",
      service: newService,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al crear el servicio",
    };
  }
}

// Acción para obtener todos los servicios con sus subservicios e items
export async function getServices(): Promise<ServiceType[]> {
  const services = await prisma.service.findMany({
    include: {
      subServices: {
        include: {
          itemSubServices: true,
        },
      },
    },
  });

  return services as ServiceType[];
}

// Acción para crear un nuevo subservicio
export async function createSubService(data: SubServiceSchemaType) {
  if (!data) {
    return {
      success: false,
      message: "No data provided",
    };
  }
  
  try {
    const newSubService = await prisma.subService.create({
      data: data,
    });

    revalidatePath("/services");
    return {
      success: true,
      message: "Subservicio creado exitosamente",
      subService: newSubService,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al crear el subservicio",
    };
  }
}

// Acción para crear un nuevo item de subservicio
export async function createItemSubService(data: ItemSubServiceSchemaType) {
  if (!data) {
    return {
      success: false,
      message: "No data provided",
    };
  }
  
  try {
    const newItemSubService = await prisma.itemSubService.create({
      data: data,
    });

    revalidatePath("/services");
    return {
      success: true,
      message: "Item de subservicio creado exitosamente",
      itemSubService: newItemSubService,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al crear el item de subservicio",
    };
  }
}

// Acción para obtener subservicios por serviceId
export async function getSubServicesByServiceId(serviceId: number) {
  if (!serviceId) {
    return {
      success: false,
      message: "No service ID provided",
    };
  }
  
  try {
    const subServices = await prisma.subService.findMany({
      where: {
        serviceId: serviceId
      },
      include: {
        itemSubServices: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      success: true,
      subServices,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al obtener los subservicios",
    };
  }
}

// Acción para obtener items de subservicio por subServiceId
export async function getItemSubServicesBySubServiceId(subServiceId: number) {
  if (!subServiceId) {
    return {
      success: false,
      message: "No subservice ID provided",
    };
  }
  
  try {
    const itemSubServices = await prisma.itemSubService.findMany({
      where: {
        subServiceId: subServiceId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      success: true,
      itemSubServices,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al obtener los items de subservicio",
    };
  }
}