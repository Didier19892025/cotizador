"use server";

import { JobSchemaType } from "@/schemas/zodRoles";
import { prisma } from "@/src/lib/prisma";
import { RoleType } from "@/types/rolesType";
import { revalidatePath } from "next/cache";

// function createRole
export async function createRole(data: JobSchemaType) {
  if (!data) {
    return {
      success: false,
      message: "No data provided",
    };
  }

  try {
    const newRole = await prisma.role.create({
      data: data,
    });

    revalidatePath("/roles");
    return {
      success: true,
      message: "Role created successfully",
      role: newRole,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error creating role",
    };
  }
}

// Function for getting all roles
export async function getAllRoles(): Promise<RoleType[]> {
  const roles = await prisma.role.findMany({
    include: {
      employee: true,
      project: true,
    },
  });
  return roles as RoleType[];
}

// function delete rol
export async function deleteRole(id: number) {
  try {
    // validamos empleados asociados
    const associatedEmployees = await prisma.employee.findFirst({
      where: { roleId: id },
    });
    if (associatedEmployees) {
      return {
        success: false,
        message: "Role cannot be deleted as it has associated employees",
      };
    }

    // validamos proyectos asociados
    const associatedProjects = await prisma.project.findFirst({
      where: { roleId: id },
    });
    if (associatedProjects) {
      return {
        success: false,
        message: "Role cannot be deleted as it has associated projects",
      };
    }

    const role = await prisma.role.findUnique({
      where: { id },
    });
    if (!role) {
      return {
        success: false,
        message: "Role not found",
      };
    }

    await prisma.role.delete({
      where: { id },
    });
    
    revalidatePath("/roles");
    return {
      success: true,
      message: "Role deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error deleting role",
    };
  }
}

// funcion edit rol
export async function editRol(id: number, data: JobSchemaType) {
  if (!data || !id)
    return {
      success: false,
      message: "No data received",
    };
  try {
    const role = await prisma.role.findUnique({
      where: { id },
    });
    if (!role) {
      return {
        success: false,
        message: "Role not found for update",
      };
    }
    const roleUpdate = await prisma.role.update({
      where: { id },
      data: data,
    });

    revalidatePath('roles')

    return {
      success: true,
      message: "Role updated successfully",
      data: roleUpdate,
    };

  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred",
    };
  }
}

