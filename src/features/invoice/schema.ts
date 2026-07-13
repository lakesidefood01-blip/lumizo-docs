import { z } from "zod";

export const invoiceItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Item name is required"),
  description: z.string().optional(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Price must be positive"),
});

export const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.string().min(1, "Date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  customerName: z.string().min(1, "Customer name is required"),
  customerCompany: z.string().optional(),
  customerAddress: z.string().min(1, "Address is required"),
  customerPhone: z.string().optional(),
  customerEmail: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required"),
  discountPercent: z.number().min(0).max(100),
  taxPercent: z.number().min(0).max(100),
  notes: z.string().optional(),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;
