"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { packingListSchema, type PackingListFormData } from "@/features/packing-list/schema";

interface PackingListFormProps {
  onSubmit: (data: PackingListFormData) => void;
}

export function PackingListForm({ onSubmit }: PackingListFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PackingListFormData>({
    resolver: zodResolver(packingListSchema),
    defaultValues: {
      packingListNumber: `PL-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      shipper: "",
      consignee: "",
      relatedInvoice: "",
      items: [{ id: crypto.randomUUID(), productName: "", quantity: 1, weight: 0, dimensions: "" }],
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const items = watch("items");
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Packing List Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="packingListNumber">Packing List Number *</Label>
              <Input id="packingListNumber" {...register("packingListNumber")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input id="date" type="date" {...register("date")} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="shipper">Shipper *</Label>
              <Input id="shipper" {...register("shipper")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="consignee">Consignee *</Label>
              <Input id="consignee" {...register("consignee")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="relatedInvoice">Related Invoice Number</Label>
            <Input id="relatedInvoice" {...register("relatedInvoice")} />
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
                append({ id: crypto.randomUUID(), productName: "", quantity: 1, weight: 0, dimensions: "" })
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
                  <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Product Name *</Label>
                  <Input {...register(`items.${index}.productName`)} />
                </div>
                <div className="space-y-2">
                  <Label>Quantity *</Label>
                  <Input type="number" min="1" {...register(`items.${index}.quantity`, { valueAsNumber: true })} />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Weight (kg)</Label>
                  <Input type="number" min="0" step="0.1" {...register(`items.${index}.weight`, { valueAsNumber: true })} />
                </div>
                <div className="space-y-2">
                  <Label>Dimensions</Label>
                  <Input placeholder="e.g., 30x20x10 cm" {...register(`items.${index}.dimensions`)} />
                </div>
              </div>
            </div>
          ))}

          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between">
              <span>Total Quantity:</span>
              <span className="font-bold">{totalQuantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Weight:</span>
              <span className="font-bold">{totalWeight.toFixed(2)} kg</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="Additional notes..." {...register("notes")} />
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full">
        Generate Packing List
      </Button>
    </form>
  );
}
