import { z } from "zod";

export const quotationItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Item name is required"),
  description: z.string().optional(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Price must be positive"),
});

export const quotationSchema = z.object({
  quotationNumber: z.string().min(1, "Quotation number is required"),
  date: z.string().min(1, "Date is required"),
  validUntil: z.string().min(1, "Valid until date is required"),
  customerName: z.string().min(1, "Customer name is required"),
  customerCompany: z.string().optional(),
  customerAddress: z.string().min(1, "Address is required"),
  customerPhone: z.string().optional(),
  customerEmail: z.string().optional(),
  items: z.array(quotationItemSchema).min(1, "At least one item is required"),
  discountPercent: z.number().min(0).max(100),
  taxPercent: z.number().min(0).max(100),
  scopeOfWork: z.string().optional(),
  termsAndConditions: z.string().optional(),
  notes: z.string().optional(),
});

export type QuotationFormData = z.infer<typeof quotationSchema>;
