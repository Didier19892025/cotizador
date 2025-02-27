import { Country, CurrencyType, UserRole} from '@prisma/client';
import { z } from 'zod';



export const EmployeeCreateZod = z.object({
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

  // datos del rol
  jobRole: z.string().min(1, "Job Role is required"),

  country: z.nativeEnum(Country),

  typeCurrency: z.nativeEnum(CurrencyType),

  area: z.string().min(1, "Area is required"),

  costCenter: z.string().min(1, "Cost Center is required"),

  cphCode: z.string().min(1, "CPH Code is required"),

  cph: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, { message: "Invalid" }),


    userName: z
    .string()
    .optional()
    .refine((val) => val === '' || val?.trim() !== '', {
      message: "Username is required",
    }),

    password: z
    .string()
    .optional()
    .refine((val) => val === '' || val?.trim() !== '', {
      message: "Password is required",
    }),
  

    rol: z
    .string()
    .optional()
    .transform((val) => (val === '' ? null : val))  // Transformación de '' a null
    .refine(
      (val) => val === null || val === UserRole.admin || val === UserRole.user,
      {
        message: "Role must be 'admin' or 'user'",
      }
    ),
  

});

export const EmployeeUpdateZod = z.object({
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

  // datos del rol
  jobRole: z.string().min(1, "Job Role is required"),

  country: z.nativeEnum(Country),

  typeCurrency: z.nativeEnum(CurrencyType),

  area: z.string().min(1, "Area is required"),

  costCenter: z.string().min(1, "Cost Center is required"),

  cphCode: z.string().min(1, "CPH Code is required"),

  cph: z.union([
    z.number().min(0),
    z.string().transform(val => parseFloat(val))
  ]),


});

export type EmployeeUpdateZodType = z.infer<typeof EmployeeUpdateZod>;
export type EmployeeCreateZodType = z.infer<typeof EmployeeCreateZod>;
