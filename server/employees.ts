import { prisma } from "@/src/lib/prisma";


export async function  getAllEmployees(){
    const employees = await prisma.employee.findMany({
        include: {
            role: true,
        },
    })
    return employees;
}