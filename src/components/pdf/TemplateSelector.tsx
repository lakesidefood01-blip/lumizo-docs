"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { PdfTemplate } from "@/types";

const templates: { value: PdfTemplate; label: string; description: string }[] = [
  {
    value: "modern",
    label: "Modern",
    description: "Clean design with colorful accents",
  },
  {
    value: "professional",
    label: "Professional",
    description: "Traditional business style",
  },
  {
    value: "minimal",
    label: "Minimal",
    description: "Simple and clean layout",
  },
];

export function TemplateSelector() {
  const { value: selectedTemplate, setValue } = useLocalStorage<PdfTemplate>(
    "lumizo-pdf-template",
    "modern"
  );

  return (
    <div className="space-y-3">
      <Label>PDF Template</Label>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((template) => (
          <Card
            key={template.value}
            className={`cursor-pointer transition-all ${
              selectedTemplate === template.value
                ? "border-primary ring-2 ring-primary"
                : "hover:border-primary/50"
            }`}
            onClick={() => setValue(template.value)}
          >
            <CardContent className="p-3 text-center">
              <p className="font-medium text-sm">{template.label}</p>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
