"use client";

import { useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Upload, Download } from "lucide-react";
import { slipGajiSchema, type SlipGajiFormData } from "@/features/slip-gaji/schema";
import { useCompanyProfile } from "@/features/company-profile/hooks/useCompanyProfile";
import { formatCurrency } from "@/lib/pdf-generator";

interface SlipGajiFormProps {
  onSubmit: (data: SlipGajiFormData) => void;
}

export function SlipGajiForm({ onSubmit }: SlipGajiFormProps) {
  const { profile } = useCompanyProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SlipGajiFormData>({
    resolver: zodResolver(slipGajiSchema),
    defaultValues: {
      employeeName: "",
      employeeId: `EMP-${Date.now()}`,
      position: "",
      department: "",
      payPeriod: new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
      payDate: new Date().toISOString().split("T")[0],
      basicSalary: 0,
      allowances: [{ id: crypto.randomUUID(), name: "Transport", amount: 500000 }],
      deductions: [],
      bpjsHealth: 4,
      bpjsEmployment: 2,
      taxPercent: 5,
      notes: "",
    },
  });

  // CSV Import/Export functions
  const parseCSV = (csvText: string): Record<string, string> => {
    const lines = csvText.split("\n").filter((line) => line.trim());
    if (lines.length < 2) return {};

    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const values = lines[1].split(",").map((v) => v.trim());

    const data: Record<string, string> = {};
    headers.forEach((header, index) => {
      data[header] = values[index] || "";
    });
    return data;
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const data = parseCSV(text);

      if (data.name) setValue("employeeName", data.name);
      if (data.id) setValue("employeeId", data.id);
      if (data.position) setValue("position", data.position);
      if (data.department) setValue("department", data.department);
      if (data.salary) setValue("basicSalary", Number(data.salary) || 0);
      if (data.transport) {
        setValue("allowances", [
          { id: crypto.randomUUID(), name: "Transport", amount: Number(data.transport) || 0 },
        ]);
      }
      if (data.bpjs_health) setValue("bpjsHealth", Number(data.bpjs_health) || 0);
      if (data.bpjs_employment) setValue("bpjsEmployment", Number(data.bpjs_employment) || 0);
      if (data.tax) setValue("taxPercent", Number(data.tax) || 0);
      if (data.notes) setValue("notes", data.notes);
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const handleExportCSV = () => {
    const formData = watch();
    const headers = [
      "name",
      "id",
      "position",
      "department",
      "salary",
      "transport",
      "bpjs_health",
      "bpjs_employment",
      "tax",
      "notes",
    ];

    const transportAllowance = formData.allowances?.find((a) => a.name === "Transport");
    const values = [
      formData.employeeName,
      formData.employeeId,
      formData.position,
      formData.department || "",
      formData.basicSalary,
      transportAllowance?.amount || 0,
      formData.bpjsHealth || 0,
      formData.bpjsEmployment || 0,
      formData.taxPercent || 0,
      formData.notes || "",
    ];

    const csvContent = [headers.join(","), values.join(",")].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `slip-gaji-${formData.employeeId}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const { fields: allowanceFields, append: appendAllowance, remove: removeAllowance } = useFieldArray({
    control,
    name: "allowances",
  });

  const { fields: deductionFields, append: appendDeduction, remove: removeDeduction } = useFieldArray({
    control,
    name: "deductions",
  });

  const basicSalary = watch("basicSalary");
  const allowances = watch("allowances") || [];
  const deductions = watch("deductions") || [];
  const bpjsHealthPercent = watch("bpjsHealth") || 0;
  const bpjsEmploymentPercent = watch("bpjsEmployment") || 0;
  const taxPercent = watch("taxPercent") || 0;

  const totalAllowances = allowances.reduce((sum, item) => sum + (item?.amount || 0), 0);
  const grossPay = basicSalary + totalAllowances;

  const bpjsHealthAmount = grossPay * (bpjsHealthPercent / 100);
  const bpjsEmploymentAmount = grossPay * (bpjsEmploymentPercent / 100);
  const taxAmount = grossPay * (taxPercent / 100);
  const totalDeductions = bpjsHealthAmount + bpjsEmploymentAmount + taxAmount +
    deductions.reduce((sum, item) => sum + (item?.amount || 0), 0);

  const netPay = grossPay - totalDeductions;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Employee Information
            <div className="flex gap-2">
              <input
                type="file"
                ref={fileInputRef}
                accept=".csv"
                onChange={handleImportCSV}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Import CSV
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employeeName">Employee Name *</Label>
              <Input id="employeeName" {...register("employeeName")} />
              {errors.employeeName && (
                <p className="text-sm text-destructive">{errors.employeeName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID *</Label>
              <Input id="employeeId" {...register("employeeId")} />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Input id="position" {...register("position")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" {...register("department")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pay Period</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="payPeriod">Pay Period *</Label>
              <Input id="payPeriod" {...register("payPeriod")} placeholder="January 2024" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payDate">Pay Date *</Label>
              <Input id="payDate" type="date" {...register("payDate")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Income</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="basicSalary">Basic Salary *</Label>
            <Input
              id="basicSalary"
              type="number"
              min="0"
              {...register("basicSalary", { valueAsNumber: true })}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Allowances</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendAllowance({ id: crypto.randomUUID(), name: "", amount: 0 })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
            {allowanceFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  placeholder="Name"
                  {...register(`allowances.${index}.name`)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min="0"
                  placeholder="Amount"
                  {...register(`allowances.${index}.amount`, { valueAsNumber: true })}
                  className="w-32"
                />
                {allowanceFields.length > 1 && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeAllowance(index)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-muted p-3 text-right">
            <span className="text-sm text-muted-foreground">Total Allowances: </span>
            <span className="font-medium">{formatCurrency(totalAllowances)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deductions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>BPJS Kesehatan (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                {...register("bpjsHealth", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label>BPJS Ketenagakerjaan (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                {...register("bpjsEmployment", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label>PPh 21 (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                {...register("taxPercent", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Other Deductions</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendDeduction({ id: crypto.randomUUID(), name: "", amount: 0 })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
            {deductionFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  placeholder="Name"
                  {...register(`deductions.${index}.name`)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  min="0"
                  placeholder="Amount"
                  {...register(`deductions.${index}.amount`, { valueAsNumber: true })}
                  className="w-32"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeDeduction(index)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-muted p-3 text-right">
            <span className="text-sm text-muted-foreground">Total Deductions: </span>
            <span className="font-medium text-destructive">{formatCurrency(totalDeductions)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 rounded-lg bg-muted p-4">
            <div className="flex justify-between">
              <span>Basic Salary</span>
              <span>{formatCurrency(basicSalary)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Allowances</span>
              <span>{formatCurrency(totalAllowances)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-medium">
              <span>Gross Pay</span>
              <span>{formatCurrency(grossPay)}</span>
            </div>
            <div className="flex justify-between text-destructive">
              <span>Total Deductions</span>
              <span>-{formatCurrency(totalDeductions)}</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-lg font-bold">
              <span>Net Pay</span>
              <span className="text-primary">{formatCurrency(netPay)}</span>
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
        Generate Payslip
      </Button>
    </form>
  );
}
