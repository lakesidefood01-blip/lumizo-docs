"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { deliveryOrderSchema, type DeliveryOrderFormData } from "@/features/delivery-order/schema";

interface DeliveryOrderFormProps {
  onSubmit: (data: DeliveryOrderFormData) => void;
}

export function DeliveryOrderForm({ onSubmit }: DeliveryOrderFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DeliveryOrderFormData>({
    resolver: zodResolver(deliveryOrderSchema),
    defaultValues: {
      deliveryNumber: `DO-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      sender: "",
      receiver: "",
      deliveryAddress: "",
      courier: "",
      vehicleInfo: "",
      items: [{ id: crypto.randomUUID(), productName: "", quantity: 1 }],
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Delivery Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="deliveryNumber">Delivery Number *</Label>
              <Input id="deliveryNumber" {...register("deliveryNumber")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input id="date" type="date" {...register("date")} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sender">Sender *</Label>
              <Input id="sender" {...register("sender")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="receiver">Receiver *</Label>
              <Input id="receiver" {...register("receiver")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryAddress">Delivery Address *</Label>
            <Input id="deliveryAddress" {...register("deliveryAddress")} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="courier">Courier</Label>
              <Input id="courier" {...register("courier")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleInfo">Vehicle Information</Label>
              <Input id="vehicleInfo" placeholder="e.g., Truck B 1234 CD" {...register("vehicleInfo")} />
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
                append({ id: crypto.randomUUID(), productName: "", quantity: 1 })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-4 rounded-lg border p-4">
              <div className="flex-1 space-y-2">
                <Label>Product Name *</Label>
                <Input {...register(`items.${index}.productName`)} />
              </div>
              <div className="w-32 space-y-2">
                <Label>Quantity *</Label>
                <Input
                  type="number"
                  min="1"
                  {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                />
              </div>
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
          ))}
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
        Generate Delivery Order
      </Button>
    </form>
  );
}
