import { z } from "zod";

export const deliveryOrderItemSchema = z.object({
  id: z.string(),
  productName: z.string().min(1, "Product name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export const deliveryOrderSchema = z.object({
  deliveryNumber: z.string().min(1, "Delivery number is required"),
  date: z.string().min(1, "Date is required"),
  sender: z.string().min(1, "Sender is required"),
  receiver: z.string().min(1, "Receiver is required"),
  deliveryAddress: z.string().min(1, "Delivery address is required"),
  courier: z.string().optional(),
  vehicleInfo: z.string().optional(),
  items: z.array(deliveryOrderItemSchema).min(1, "At least one item is required"),
  notes: z.string().optional(),
});

export type DeliveryOrderFormData = z.infer<typeof deliveryOrderSchema>;
