import { z } from "zod";

export const packingListItemSchema = z.object({
  id: z.string(),
  productName: z.string().min(1, "Product name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  weight: z.number().min(0, "Weight must be positive"),
  dimensions: z.string().optional(),
});

export const packingListSchema = z.object({
  packingListNumber: z.string().min(1, "Packing list number is required"),
  date: z.string().min(1, "Date is required"),
  shipper: z.string().min(1, "Shipper is required"),
  consignee: z.string().min(1, "Consignee is required"),
  relatedInvoice: z.string().optional(),
  items: z.array(packingListItemSchema).min(1, "At least one item is required"),
  notes: z.string().optional(),
});

export type PackingListFormData = z.infer<typeof packingListSchema>;
