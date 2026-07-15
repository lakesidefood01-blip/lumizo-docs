import { z } from "zod";

export const offeringLetterSchema = z.object({
  letterNumber: z.string().min(1, "Letter number is required"),
  date: z.string().min(1, "Date is required"),
  candidateName: z.string().min(1, "Candidate name is required"),
  position: z.string().min(1, "Position is required"),
  department: z.string().optional(),
  salary: z.number().min(0, "Salary must be positive"),
  benefits: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  workLocation: z.string().optional(),
  workingHours: z.string().optional(),
  probationPeriod: z.string().optional(),
  notes: z.string().optional(),
});

export type OfferingLetterFormData = z.infer<typeof offeringLetterSchema>;
