"use server";

import { EmployeeZodType } from "@/schemas/zodEmployees";
import { prisma } from "@/src/lib/prisma";
import { EmployeesType } from "@/types/employeesType";
import { revalidatePath } from "next/cache";

// funcion para obtener el nombre y el id del rol

// funcion para obtener todos los empleados
export async function getAllEmployees(): Promise<EmployeesType[]> {
  const employees = await prisma.employee.findMany({
    include: {
      role: true,
    },
  });
  return employees as EmployeesType[];
}

// funcion crear un empleado
export async function createEmployee(data: EmployeeZodType) {
  console.log("data llegando al server", data);
  if (!data) {
    return {
      success: false,
      message: "No data provided",
    };
  }

  try {
    const employeeExists = await prisma.employee.findFirst({
      where: {
        OR: [{ email: data.email }, { latamId: data.latamId }],
      },
    });
    if (employeeExists) {
      const conflicEmployee =
        employeeExists.email === data.email ? "email" : "latamId";

      return {
        success: false,
        message: `Employee with ${conflicEmployee} already exists`,
      };
    }

    // iniciamos la creacion
    const newEmployee = await prisma.employee.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        status: data.status,
        latamId: data.latamId,
        phone: data.phone,
        country: data.country,
        typeEmployee: data.typeEmployee,
        roleId: data.role,
      },
    });

    revalidatePath("/employees");

    return {
      success: true,
      message: "Employee created successfully",
      data: newEmployee,
    };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      message: "error creating employee",
    };
  }
}


export async function updateEmployee(
  employeeId: number,
  data: EmployeeZodType
) {
  if (!data) {
    return {
      success: false,
      message: "No data provided",
    };
  }

  try {
    // Verificamos si el empleado existe
    const employeeExist = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employeeExist) {
      return {
        success: false,
        message: "Employee not found",
      };
    }

    // Actualizamos el empleado
    const updatedEmployee = await prisma.employee.update({
      where: { id: employeeId },
      data: {
        fullName: data.fullName,
        email: data.email,
        status: data.status,
        latamId: data.latamId,
        phone: data.phone,
        typeEmployee: data.typeEmployee,
        country: data.country,
        roleId: data.role,
      },
    });

    revalidatePath("/employees");

    return {
      success: true,
      message: "Employee updated successfully",
      updatedEmployee,
    };
  } catch (error) {
    console.error("Error updating employee:", error);
    return {
      success: false,
      message: "Error updating employee",
    };
  }
}

// función para eliminar empleado
export async function deleteEmployee(employeeId: number) {
  if (!employeeId) {
    return {
      success: false,
      message: "Employee ID is required",
    };
  }

  try {
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: { role: true },
    });

    if (!employee) {
      return {
        success: false,
        message: "Employee not found",
      };
    }

    await prisma.employee.delete({
      where: { id: employeeId },
    });

    revalidatePath("/employees");

    return {
      success: true,
      message: "Employee deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting employee:", error);
    return {
      success: false,
      message: "Error deleting employee",
    };
  }
}
