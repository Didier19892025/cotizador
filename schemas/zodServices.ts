import { z } from "zod";

// Schemas de validación
export const serviceSchema = z.object({
    nameService: z.string().min(1, "El nombre del servicio es requerido"),
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
});

export const subServiceSchema = z.object({
  // serviceId: z.number(),
  nameSubService: z.string().min(1, "El nombre del subservicio es requerido"),
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
  
});

export const itemSubServiceSchema = z.object({
  // subServiceId: z.number(),
  nameItemSubService: z.string().min(1, "El nombre del item de subservicio es requerido"),
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
});

// Tipos basados en los schemas
export type ServiceSchemaType = z.infer<typeof serviceSchema>;
export type SubServiceSchemaType = z.infer<typeof subServiceSchema>;
export type ItemSubServiceSchemaType = z.infer<typeof itemSubServiceSchema>;