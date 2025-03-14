import { Country } from '@prisma/client';
import { z } from 'zod';



export const EmployeeZod = z.object({
  // datos basicos
  fullName: z
    .string()
    .min(1, "Full Name is required")
    .max(100, "Full Name is too long"),

  email: z.string().email("Invalid email format").min(1, "Email is required"),

  status: z.union([
    z.boolean(),
    z.string().refine(val => val === 'true' || val === 'false', {
      message: "Invalid status. Must be 'true' or 'false'"
    }).transform((val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return val;  // Esto asegura que en caso de error, el valor original sea retornado
    }),
  ]),
  
  

  latamId: z
  .string()
   .min(1, "Latam ID is required"),

  typeEmployee: z.string().min(1, "Type Employee is required"),


  country: z.nativeEnum(Country, { message: "Invalid country" }),
  phone: z.string().min(1, "Phone is required")
  
});

export type EmployeeZodType = z.infer<typeof EmployeeZod>;
