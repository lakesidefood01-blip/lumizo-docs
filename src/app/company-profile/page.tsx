"use client";

import { useCompanyProfile } from "@/features/company-profile/hooks/useCompanyProfile";
import { CompanyProfileForm } from "@/components/forms/CompanyProfileForm";

export default function CompanyProfilePage() {
  const {
    profile,
    updateProfile,
    deleteProfile,
    exportProfile,
    importProfile,
  } = useCompanyProfile();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Company Profile</h1>
          <p className="mt-2 text-muted-foreground">
            Set up your company information to auto-fill across all document
            generators.
          </p>
        </div>
        <CompanyProfileForm
          profile={profile}
          onSave={updateProfile}
          onDelete={deleteProfile}
          onExport={exportProfile}
          onImport={importProfile}
        />
      </div>
    </div>
  );
}
