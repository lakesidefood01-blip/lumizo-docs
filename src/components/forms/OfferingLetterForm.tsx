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
import { FormTip } from "@/components/forms/FormTip";
import { useFormPersistence } from "@/hooks/useFormPersistence";
import { offeringLetterSchema, type OfferingLetterFormData } from "@/features/offering-letter/schema";
import { formatCurrency } from "@/lib/pdf-generator";

interface OfferingLetterFormProps {
  onSubmit: (data: OfferingLetterFormData) => void;
}

export function OfferingLetterForm({ onSubmit }: OfferingLetterFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<OfferingLetterFormData>({
    resolver: zodResolver(offeringLetterSchema),
    defaultValues: {
      letterNumber: `OL-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      candidateName: "",
      position: "",
      department: "",
      salary: 0,
      benefits: [],
      startDate: "",
      workLocation: "",
      workingHours: "09:00 - 17:00",
      probationPeriod: "3 bulan",
      notes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "benefits",
  });

  const { saveToStorage, clearStorage, restoreForm } = useFormPersistence<OfferingLetterFormData>({
    key: "lumizo-offering-letter-form",
    setValue: watch as any,
    reset,
  });

  useEffect(() => {
    restoreForm();
  }, []);

  const handleSubmitForm = (data: OfferingLetterFormData) => {
    clearStorage();
    onSubmit(data);
  };

  useEffect(() => {
    const subscription = watch((data) => {
      saveToStorage(data as OfferingLetterFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, saveToStorage]);

  const salary = watch("salary") || 0;
  const benefits = watch("benefits") || [];
  const totalBenefits = benefits.reduce((sum, b) => sum + (b?.amount || 0), 0);
  const totalCompensation = salary + totalBenefits;

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Letter Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="letterNumber">Letter Number *</Label>
              <Input id="letterNumber" {...register("letterNumber")} />
              {errors.letterNumber && (
                <p className="text-sm text-destructive">{errors.letterNumber.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input id="date" type="date" {...register("date")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Candidate Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="candidateName">Candidate Name *</Label>
            <Input id="candidateName" {...register("candidateName")} placeholder="Full name" />
            {errors.candidateName && (
              <p className="text-sm text-destructive">{errors.candidateName.message}</p>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Input id="position" {...register("position")} placeholder="e.g. Marketing Manager" />
              {errors.position && (
                <p className="text-sm text-destructive">{errors.position.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" {...register("department")} placeholder="e.g. Marketing" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Employment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input id="startDate" type="date" {...register("startDate")} />
              {errors.startDate && (
                <p className="text-sm text-destructive">{errors.startDate.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="workLocation">Work Location</Label>
              <Input id="workLocation" {...register("workLocation")} placeholder="e.g. Jakarta Office" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="workingHours">Working Hours</Label>
              <Input id="workingHours" {...register("workingHours")} placeholder="e.g. 09:00 - 17:00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="probationPeriod">Probation Period</Label>
              <Input id="probationPeriod" {...register("probationPeriod")} placeholder="e.g. 3 bulan" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compensation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="salary">Monthly Salary *</Label>
            <Input
              id="salary"
              type="number"
              min="0"
              {...register("salary", { valueAsNumber: true })}
            />
            {errors.salary && (
              <p className="text-sm text-destructive">{errors.salary.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Benefits</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ id: crypto.randomUUID(), name: "", amount: 0 })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Benefit
              </Button>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  placeholder="Benefit name"
                  {...register(`benefits.${index}.name`)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min="0"
                  placeholder="Amount"
                  {...register(`benefits.${index}.amount`, { valueAsNumber: true })}
                  className="w-32"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-muted p-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span>Base Salary</span>
              <span>{formatCurrency(salary)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Benefits</span>
              <span>{formatCurrency(totalBenefits)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-1">
              <span>Total Compensation</span>
              <span>{formatCurrency(totalCompensation)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Additional notes or conditions..."
            {...register("notes")}
          />
        </CardContent>
      </Card>

      <FormTip />

      <Button type="submit" size="lg" className="w-full">
        Generate Offering Letter
      </Button>
    </form>
  );
}
