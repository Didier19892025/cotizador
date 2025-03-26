// import { prisma } from "@/src/lib/prisma"

import { prisma } from "@/src/lib/prisma"
import { ServiceType } from "@/types/servicesType";


// export  async function getAllRoles() {
//     const roles = await prisma.role.findMany({
//         include: {
//             employee: true,
//         }
//     })
//     return roles
    
// }

export async function getAllServices(): Promise<ServiceType[]> {
    const services = await prisma.service.findMany({
        include: {
            subServices: {
                include: {
                    itemSubServices: true
                }
            }
        }
    })
    return services as ServiceType[];
}