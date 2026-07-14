"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { invoiceSchema, type InvoiceFormData } from "@/features/invoice/schema";
import { useCompanyProfile } from "@/features/company-profile/hooks/useCompanyProfile";
import { formatCurrency } from "@/lib/pdf-generator";
import { FormTip } from "@/components/forms/FormTip";
import { useFormPersistence } from "@/hooks/useFormPersistence";

interface InvoiceFormProps {
  onSubmit: (data: InvoiceFormData) => void;
}

interface InvoiceFormProps {
  onSubmit: (data: InvoiceFormData) => void;
}

export function InvoiceForm({ onSubmit }: InvoiceFormProps) {
  const { profile } = useCompanyProfile();

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceNumber: `INV-${Date.now()}`,
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      customerName: "",
      customerCompany: "",
      customerAddress: "",
      customerPhone: "",
      customerEmail: "",
      items: [{ id: crypto.randomUUID(), name: "", description: "", quantity: 1, unitPrice: 0 }],
      discountPercent: 0,
      taxPercent: 11,
      notes: "",
    },
  });

  const { saveToStorage, clearStorage, restoreForm } = useFormPersistence<InvoiceFormData>({
    key: "lumizo-invoice-form",
    setValue: watch as any,
    reset,
  });

  const handleSubmitForm = (data: InvoiceFormData) => {
    clearStorage();
    onSubmit(data);
  };

  // Restore form data from local storage on mount
  useEffect(() => {
    restoreForm();
  }, []);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items");
  const discountPercent = watch("discountPercent");
  const taxPercent = watch("taxPercent");

  // Auto-save form data to local storage
  useEffect(() => {
    const subscription = watch((data) => {
      saveToStorage(data as InvoiceFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, saveToStorage]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const discountAmount = subtotal * (discountPercent / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * (taxPercent / 100);
  const grandTotal = taxableAmount + taxAmount;

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Invoice Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number *</Label>
              <Input id="invoiceNumber" {...register("invoiceNumber")} />
              {errors.invoiceNumber && (
                <p className="text-sm text-destructive">
                  {errors.invoiceNumber.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date *</Label>
              <Input id="invoiceDate" type="date" {...register("invoiceDate")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input id="dueDate" type="date" {...register("dueDate")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input id="customerName" {...register("customerName")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerCompany">Company Name</Label>
              <Input id="customerCompany" {...register("customerCompany")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerAddress">Address *</Label>
            <Input id="customerAddress" {...register("customerAddress")} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Phone</Label>
              <Input id="customerPhone" {...register("customerPhone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Email</Label>
              <Input id="customerEmail" type="email" {...register("customerEmail")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Items
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                append({
                  id: crypto.randomUUID(),
                  name: "",
                  description: "",
                  quantity: 1,
                  unitPrice: 0,
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Item {index + 1}</h4>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Item Name *</Label>
                  <Input {...register(`items.${index}.name`)} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input {...register(`items.${index}.description`)} />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Quantity *</Label>
                  <Input
                    type="number"
                    min="1"
                    {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Unit Price *</Label>
                  <Input
                    type="number"
                    min="0"
                    {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                  />
                </div>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                Total: {formatCurrency(items[index]?.quantity * items[index]?.unitPrice || 0)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Totals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Discount (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                {...register("discountPercent", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label>Tax (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                {...register("taxPercent", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className="space-y-2 rounded-lg bg-muted p-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-destructive">
                <span>Discount ({discountPercent}%)</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            {taxPercent > 0 && (
              <div className="flex justify-between">
                <span>Tax ({taxPercent}%)</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t pt-2 font-bold">
              <span>Grand Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Additional notes..."
            {...register("notes")}
          />
        </CardContent>
      </Card>

      <FormTip />

      <Button type="submit" size="lg" className="w-full">
        Generate Invoice
      </Button>
    </form>
  );
}
