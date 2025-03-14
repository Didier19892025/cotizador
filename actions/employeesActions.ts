"use server";

import { EmployeeZodType } from "@/schemas/zodEmployees";
import { prisma } from "@/src/lib/prisma";
import { EmployeesType } from "@/types/employeesType";
import { revalidatePath } from "next/cache";

// funcion para obtener todos los empleados
export async function getAllEmployees(): Promise<EmployeesType[]> {
  const employees = await prisma.employee.findMany();
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
      },
    })

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


// función para actualizar empleado
// export async function updateEmployee(
//   employeeId: number,
//   data: EmployeeUpdateZodType
// ) {
//   if (!data) {
//     return {
//       success: false,
//       message: "No data provided",
//     };
//   }

//   try {
//     // validamos el empleado para ver si exist
//     const employeeExist = await prisma.employee.findUnique({
//       where: { id: employeeId },
//     });
//     if (!employeeExist) {
//       return {
//         success: false,
//         message: "Employee not found",
//       };
//     }
//     // iniciamos la actualización
//     const result = await prisma.$transaction(async (tx) => {
//       // alctualizamos el rol
//       const role = await tx.roles.update({
//         where: { id: employeeExist.roleId },
//         data: {
//           jobRole: data.jobRole,
//           country: data.country,
//           area: data.area,
//           cc: data.costCenter,
//           cphCode: data.cphCode,
//           cph: data.cph,
//           currency: data.typeCurrency,
//         },
//       });

//       // actualizamos el empleado
//       const employee = await tx.employee.update({
//         where: { id: employeeId },
//         data: {
//           fullName: data.fullName,
//           email: data.email,
//           status: data.status,
//           latamId: data.latamId,
//           typeEmployee: data.typeEmployee,
//           roleId: role.id,
//         },
//       });
//       return { employee, role };
//     });

//     revalidatePath("/employees");
//     return {
//       success: true,
//       message: "Employee updated successfully",
//       data: result,
//     };

//   } catch (error) {
//     console.log("error", error);
//     return {
//       success: false,
//       message: "error updating employee",
//     };
//   }
// }

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
