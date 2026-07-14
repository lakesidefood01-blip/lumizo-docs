"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { receiptSchema, type ReceiptFormData } from "@/features/receipt/schema";
import { formatCurrency } from "@/lib/pdf-generator";
import { numberToWords } from "@/lib/number-to-words";
import { FormTip } from "@/components/forms/FormTip";
import { useFormPersistence } from "@/hooks/useFormPersistence";

interface ReceiptFormProps {
  onSubmit: (data: ReceiptFormData) => void;
}

export function ReceiptForm({ onSubmit }: ReceiptFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReceiptFormData>({
    resolver: zodResolver(receiptSchema),
    defaultValues: {
      receiptNumber: `RCP-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      receivedFrom: "",
      amount: 0,
      paymentMethod: "cash",
      paymentPurpose: "",
      notes: "",
    },
  });

  const { saveToStorage, clearStorage, restoreForm } = useFormPersistence<ReceiptFormData>({
    key: "lumizo-receipt-form",
    setValue: watch as any,
    reset,
  });

  useEffect(() => {
    restoreForm();
  }, []);

  const handleSubmitForm = (data: ReceiptFormData) => {
    clearStorage();
    onSubmit(data);
  };

  const amount = watch("amount");

  useEffect(() => {
    const subscription = watch((data) => {
      saveToStorage(data as ReceiptFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, saveToStorage]);

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Receipt Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="receiptNumber">Receipt Number *</Label>
              <Input id="receiptNumber" {...register("receiptNumber")} />
              {errors.receiptNumber && (
                <p className="text-sm text-destructive">{errors.receiptNumber.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input id="date" type="date" {...register("date")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="receivedFrom">Received From *</Label>
            <Input id="receivedFrom" placeholder="Customer or company name" {...register("receivedFrom")} />
            {errors.receivedFrom && (
              <p className="text-sm text-destructive">{errors.receivedFrom.message}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (IDR) *</Label>
              <Input id="amount" type="number" min="0" {...register("amount", { valueAsNumber: true })} />
              {errors.amount && (
                <p className="text-sm text-destructive">{errors.amount.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method *</Label>
              <select
                id="paymentMethod"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...register("paymentMethod")}
              >
                <option value="cash">Cash</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="check">Check</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentPurpose">Payment Purpose *</Label>
            <Input id="paymentPurpose" placeholder="e.g., Payment for Invoice #123" {...register("paymentPurpose")} />
            {errors.paymentPurpose && (
              <p className="text-sm text-destructive">{errors.paymentPurpose.message}</p>
            )}
          </div>

          {amount > 0 && (
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Amount in words:</p>
              <p className="font-medium">{numberToWords(amount)}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Additional notes..." {...register("notes")} />
          </div>
        </CardContent>
      </Card>

      <FormTip />

      <Button type="submit" size="lg" className="w-full">
        Generate Receipt
      </Button>
    </form>
  );
}
