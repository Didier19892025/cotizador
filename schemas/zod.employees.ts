import { z } from 'zod';

// Definimos el esquema de validación para los paises
const countryEnum = z.enum([
  "Colombia",
  "Peru",
  "Chile",
  "Mexico",
  "Argentina",
  "Uruguay",
  "Panama",
  "United_States",
  "Bolivia",
  "Brasil",
  "Ecuador",
  "Guatemala",
  "Honduras",
  "Nicaragua",
  "Puerto_Rico",
  "Saint_Lucia",
  "Venezuela",
]);

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
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, { message: "Invalid" }),

  typeEmployee: z.string().min(1, "Type Employee is required"),

  // datos del rol
  jobRole: z.string().min(1, "Job Role is required"),

  country: countryEnum,

  area: z.string().min(1, "Area is required"),

  costCenter: z.string().min(1, "Cost Center is required"),

  cphCode: z.string().min(1, "CPH Code is required"),

  cph: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val > 0, { message: "Invalid" }),

    typeCurrency: z.enum(["USD", "COP", "PEN", "CLP", "MXN", "ARS", "UYU", "PAB", "BRL", "EUR", "GTQ", "HNL", "NIO", "USD", "XCD", "VEF"]),

    userName: z
    .string()
    .min(1, "Username is required")
    .max(50, "Username is too long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must be alphanumeric or underscore")
    .optional(),  // Hacemos el campo opcional

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),  // Hacemos el campo opcional

  role: z
    .enum(["USER", "ADMIN"])
    .optional(),  // Hacemos el campo opcional
});

export type EmployeeCreateZodType = z.infer<typeof EmployeeCreateZod>;
