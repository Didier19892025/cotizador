import { Country } from "@prisma/client";
import { z } from "zod";

// Crear el esquema de validación
export const JobSchema = z.object({
  id: z.number().optional(),
  jobRole: z.string().min(1, { message: "Job role is required" }),
  country: z.nativeEnum(Country, {
    message: "Country must be a valid country",
  }),
  area: z.string().min(1, { message: "Area is required" }),
  cc: z.string().min(1, { message: "CC is required" }),
  cphCode: z.string().min(1, { message: "CPH code is required" }),
  cph: z.coerce.number().positive({ message: "CPH must be a positive number" }),
  // validamos el currecy
  currencyId: z
    .number()
    .min(1, "currency is required") // Valida que se haya seleccionado un rol válido
    .refine(value => value > 0, {
      message: "Please select a valid currency",
    }),
  
});

export type JobSchemaType = z.infer<typeof JobSchema>;
