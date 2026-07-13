"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { CompanyProfile } from "@/types";

const DEFAULT_PROFILE: CompanyProfile = {
  companyName: "",
  logo: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  taxId: "",
  signatoryName: "",
  signatoryPosition: "",
  signature: "",
};

const STORAGE_KEY = "lumizo-company-profile";

export function useCompanyProfile() {
  const { value, setValue, isLoaded } = useLocalStorage<CompanyProfile>(
    STORAGE_KEY,
    DEFAULT_PROFILE
  );

  const updateProfile = (data: Partial<CompanyProfile>) => {
    setValue((prev) => ({ ...prev, ...data }));
  };

  const deleteProfile = () => {
    setValue(DEFAULT_PROFILE);
  };

  const exportProfile = () => {
    const dataStr = JSON.stringify(value, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "company-profile.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importProfile = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr) as CompanyProfile;
      setValue(data);
      return true;
    } catch {
      return false;
    }
  };

  return {
    profile: value,
    isLoaded,
    updateProfile,
    deleteProfile,
    exportProfile,
    importProfile,
  };
}
