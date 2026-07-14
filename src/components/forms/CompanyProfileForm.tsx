"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Download, Upload, Trash2, Save } from "lucide-react";
import type { CompanyProfile } from "@/types";

const schema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  logo: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  website: z.string().optional(),
  taxId: z.string().optional(),
  signatoryName: z.string().min(1, "Signatory name is required"),
  signatoryPosition: z.string().min(1, "Position is required"),
  signature: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface CompanyProfileFormProps {
  profile: CompanyProfile;
  onSave: (data: Partial<CompanyProfile>) => void;
  onDelete: () => void;
  onExport: () => void;
  onImport: (json: string) => boolean;
}

export function CompanyProfileForm({
  profile,
  onSave,
  onDelete,
  onExport,
  onImport,
}: CompanyProfileFormProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: profile,
  });

  const logo = watch("logo");
  const signature = watch("signature");

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logo" | "signature"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setAlert({ type: "error", message: "File size must be less than 2MB." });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setValue(field, base64, { shouldValidate: true });

        setTimeout(() => {
          try {
            onSave({ [field]: base64 });
            setAlert({ type: "success", message: "File uploaded successfully!" });
          } catch {
            setAlert({ type: "error", message: "Failed to upload file. Please try again." });
          }
        }, 100);
      };
      reader.onerror = () => {
        setAlert({ type: "error", message: "Failed to read file. Please try again." });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    try {
      const currentLogo = watch("logo");
      const currentSignature = watch("signature");
      const saveData = {
        ...data,
        logo: currentLogo || data.logo || "",
        signature: currentSignature || data.signature || "",
      };
      onSave(saveData);
      setAlert({ type: "success", message: "Company profile saved successfully!" });
    } catch {
      setAlert({ type: "error", message: "Failed to save profile. Please try again." });
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const json = event.target?.result as string;
        const success = onImport(json);
        if (success) {
          setAlert({ type: "success", message: "Profile imported successfully!" });
        } else {
          setAlert({ type: "error", message: "Failed to import profile. Invalid JSON format." });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input id="companyName" {...register("companyName")} />
            {errors.companyName && (
              <p className="text-sm text-destructive">{errors.companyName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Company Logo</Label>
            <div className="flex items-center gap-4">
              {logo && (
                <img
                  src={logo}
                  alt="Logo preview"
                  className="h-16 w-16 object-contain"
                />
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => logoInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "logo")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input id="address" {...register("address")} />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address.message}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register("phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" {...register("website")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID (NPWP/NIB)</Label>
              <Input id="taxId" {...register("taxId")} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Signatory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="signatoryName">Name *</Label>
              <Input id="signatoryName" {...register("signatoryName")} />
              {errors.signatoryName && (
                <p className="text-sm text-destructive">
                  {errors.signatoryName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="signatoryPosition">Position *</Label>
              <Input id="signatoryPosition" {...register("signatoryPosition")} />
              {errors.signatoryPosition && (
                <p className="text-sm text-destructive">
                  {errors.signatoryPosition.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Signature</Label>
            <div className="flex items-center gap-4">
              {signature && (
                <img
                  src={signature}
                  alt="Signature preview"
                  className="h-16 w-32 object-contain"
                />
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => signatureInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Signature
              </Button>
              <input
                ref={signatureInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "signature")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-4">
        <Button type="submit">
          <Save className="mr-2 h-4 w-4" />
          Save Profile
        </Button>
        <Button type="button" variant="outline" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Export JSON
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => importInputRef.current?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          Import JSON
        </Button>
        <input
          ref={importInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            try {
              onDelete();
              setAlert({ type: "success", message: "Profile deleted successfully!" });
            } catch {
              setAlert({ type: "error", message: "Failed to delete profile." });
            }
          }}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Profile
        </Button>
      </div>
    </form>
  );
}
