"use server";

import bcrypt from "bcryptjs";

import {
  EmployeeCreateZodType,
  EmployeeUpdateZodType,
} from "@/schemas/zod.employees";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

// funcion para obtener todos los empleados
export async function getAllEmployees() {
  const employees = await prisma.employee.findMany({
    include: {
      role: true,
    },
  });
  return employees;
}

// funcion crear un empleado
export async function createEmployee(data: EmployeeCreateZodType) {
  console.log("data llegando al server", data);
  if (!data) {
    return {
      success: false,
      message: "No data provided",
    };
  }

  try {
    //  validamos que un usuario no exista y que venga con campos vacios
    const userExist = await prisma.users.findFirst({
      where: {
        userName: data.userName,
      },
    })
    if (userExist) {
      return {
        success: false,
        message: "User already exists",
      };
    }
    


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
    const result = await prisma.$transaction(async (tx) => {

      const passwordEncript = await bcrypt.hash(data.password!, 10);
      // creamos el usuario
      
      const user = await tx.users.create({
        data: {
          userName: data.userName || null,
          password: passwordEncript || null,
          rol: data.rol || null,
        },
      });

      // creamos el roles
      const role = await tx.roles.create({
        data: {
          jobRole: data.jobRole,
          country: data.country,
          area: data.area,
          cc: data.costCenter,
          cphCode: data.cphCode,
          cph: data.cph,
          currency: data.typeCurrency,
        },
      });

      // creamos el empleado
      const employee = await tx.employee.create({
        data: {
          fullName: data.fullName,
          email: data.email,
          status: data.status,
          latamId: data.latamId,
          typeEmployee: data.typeEmployee,
          userId: user.id,
          roleId: role.id,
        },
      });
      return { employee, user, role };
    });

    revalidatePath("/employees");

    return {
      success: true,
      message: "Employee created successfully",
      data: result,
    };
  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      message: "error creating employee",
    };
  }
}

// función para obtener un empleado por ID
export async function getEmployeeById(employeeId: number) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        role: true,
      },
    });

    if (!employee) {
      return {
        success: false,
        message: "Employee not found",
      };
    }

    // Transformamos los datos para que coincidan con el formato del formulario
    return {
      success: true,
      message: "Employee found",
      data: employee,
    };
  } catch (error) {
    console.error("Error fetching employee:", error);
    return {
      success: false,
      message: "Error fetching employee",
    };
  }
}

// función para actualizar empleado
export async function updateEmployee(
  employeeId: number,
  data: EmployeeUpdateZodType
) {
  if (!data) {
    return {
      success: false,
      message: "No data provided",
    };
  }

  try {
    // validamos el empleado para ver si exist
    const employeeExist = await prisma.employee.findUnique({
      where: { id: employeeId },
    });
    if (!employeeExist) {
      return {
        success: false,
        message: "Employee not found",
      };
    }
    // iniciamos la actualización
    const result = await prisma.$transaction(async (tx) => {
      // alctualizamos el rol
      const role = await tx.roles.update({
        where: { id: employeeExist.roleId },
        data: {
          jobRole: data.jobRole,
          country: data.country,
          area: data.area,
          cc: data.costCenter,
          cphCode: data.cphCode,
          cph: data.cph,
          currency: data.typeCurrency,
        },
      });

      // actualizamos el empleado
      const employee = await tx.employee.update({
        where: { id: employeeId },
        data: {
          fullName: data.fullName,
          email: data.email,
          status: data.status,
          latamId: data.latamId,
          typeEmployee: data.typeEmployee,
          roleId: role.id,
        },
      });
      return { employee, role };
    });

    revalidatePath("/employees");
    return {
      success: true,
      message: "Employee updated successfully",
      data: result,
    };

  } catch (error) {
    console.log("error", error);
    return {
      success: false,
      message: "error updating employee",
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

    // Eliminamos en transacción para mantener la integridad
    await prisma.$transaction(async (tx) => {
      // Primero eliminamos el empleado
      await tx.employee.delete({
        where: { id: employeeId },
      });

      // Eliminamos el rol asociado
      if (employee.roleId) {
        await tx.roles.delete({
          where: { id: employee.roleId },
        });
      }

      // Eliminamos el usuario si existe
      if (employee.userId) {
        await tx.users.delete({
          where: { id: employee.userId },
        });
      }
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
