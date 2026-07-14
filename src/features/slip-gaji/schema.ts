import { z } from "zod";

export const slipGajiItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  amount: z.number().min(0, "Amount must be positive"),
});

export const slipGajiSchema = z.object({
  employeeName: z.string().min(1, "Employee name is required"),
  employeeId: z.string().min(1, "Employee ID is required"),
  position: z.string().min(1, "Position is required"),
  department: z.string().optional(),
  payPeriod: z.string().min(1, "Pay period is required"),
  payDate: z.string().min(1, "Pay date is required"),
  allowances: z.array(slipGajiItemSchema).optional(),
  deductions: z.array(slipGajiItemSchema).optional(),
  basicSalary: z.number().min(0, "Basic salary must be positive"),
  bpjsHealth: z.number().min(0).optional(),
  bpjsEmployment: z.number().min(0).optional(),
  taxPercent: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
});

export type SlipGajiFormData = z.infer<typeof slipGajiSchema>;
