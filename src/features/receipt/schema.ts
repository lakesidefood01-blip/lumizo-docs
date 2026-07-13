import { z } from "zod";

export const receiptSchema = z.object({
  receiptNumber: z.string().min(1, "Receipt number is required"),
  date: z.string().min(1, "Date is required"),
  receivedFrom: z.string().min(1, "Received from is required"),
  amount: z.number().min(0, "Amount must be positive"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  paymentPurpose: z.string().min(1, "Payment purpose is required"),
  notes: z.string().optional(),
});

export type ReceiptFormData = z.infer<typeof receiptSchema>;
