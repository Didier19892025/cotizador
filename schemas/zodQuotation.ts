import { z } from "zod";

// Quotation form schema
export const quotationSchema = z.object({
  client: z.string().min(1, { message: "Client is required" }),
  service: z.string().min(1, { message: "Service is required" }),
  subService: z.string().min(1, { message: "Sub Service is required" }),
  item: z.string().min(1, { message: "Sub Service Item is required" }),
  hours: z.number().min(1, { message: "Hours must be at least 1" }),
  role: z.string().min(1, { message: "Role is required" }),
  product: z.string().min(1, { message: "Product is required" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  profitPercentage: z.number().min(0).max(100, { message: "Profit percentage must be between 0 and 100" })
});

// Type for the form data
export type QuotationFormData = z.infer<typeof quotationSchema>;