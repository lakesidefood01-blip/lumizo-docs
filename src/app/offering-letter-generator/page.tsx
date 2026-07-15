"use client";

import { useState } from "react";
import { GeneratorLayout } from "@/components/generators/GeneratorLayout";
import { OfferingLetterForm } from "@/components/forms/OfferingLetterForm";
import { useCompanyProfile } from "@/features/company-profile/hooks/useCompanyProfile";
import { drawCompanyHeader, drawSignature, drawFooter, colors } from "@/lib/pdf-helpers";
import { formatCurrency } from "@/lib/pdf-generator";
import type { OfferingLetterFormData } from "@/features/offering-letter/schema";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export default function OfferingLetterGeneratorPage() {
  const { profile } = useCompanyProfile();
  const [formData, setFormData] = useState<OfferingLetterFormData | null>(null);

  const generatePdf = async () => {
    if (!formData) return;

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const page = pdfDoc.addPage([595.28, 841.89]);

    let y = await drawCompanyHeader({ page, profile, y: 750, title: "OFFERING LETTER" });

    y -= 30;

    // Letter details
    page.drawText(`Number: ${formData.letterNumber}`, { x: 50, y, size: 10, font, color: colors.text });
    y -= 15;
    page.drawText(`Date: ${formData.date}`, { x: 50, y, size: 10, font, color: colors.text });

    y -= 30;

    // Candidate info
    page.drawText("To:", { x: 50, y, size: 10, font: fontBold, color: colors.text });
    y -= 15;
    page.drawText(formData.candidateName, { x: 50, y, size: 10, font, color: colors.text });

    y -= 30;

    // Opening
    page.drawText("Dear " + formData.candidateName + ",", { x: 50, y, size: 10, font, color: colors.text });
    y -= 20;
    page.drawText("We are pleased to offer you the following position at our company:", {
      x: 50, y, size: 10, font, color: colors.text,
    });

    y -= 30;

    // Position details
    const details = [
      { label: "Position", value: formData.position },
      { label: "Department", value: formData.department || "-" },
      { label: "Start Date", value: formData.startDate },
      { label: "Work Location", value: formData.workLocation || "-" },
      { label: "Working Hours", value: formData.workingHours || "-" },
      { label: "Probation Period", value: formData.probationPeriod || "-" },
    ];

    for (const detail of details) {
      page.drawText(`${detail.label}:`, { x: 50, y, size: 10, font: fontBold, color: colors.text });
      page.drawText(detail.value, { x: 200, y, size: 10, font, color: colors.text });
      y -= 15;
    }

    y -= 10;

    // Salary
    page.drawText("Monthly Salary:", { x: 50, y, size: 10, font: fontBold, color: colors.text });
    page.drawText(formatCurrency(formData.salary), { x: 200, y, size: 12, font: fontBold, color: colors.primary });

    y -= 25;

    // Benefits
    if (formData.benefits) {
      page.drawText("Benefits:", { x: 50, y, size: 10, font: fontBold, color: colors.text });
      y -= 15;
      const benefitLines = formData.benefits.match(/.{1,60}/g) || [formData.benefits];
      for (const line of benefitLines.slice(0, 3)) {
        page.drawText(line, { x: 70, y, size: 10, font, color: colors.text });
        y -= 12;
      }
      y -= 10;
    }

    // Closing
    page.drawText("This offer is subject to the following terms:", { x: 50, y, size: 10, font, color: colors.text });
    y -= 15;
    page.drawText("1. You must pass the probation period as specified above.", { x: 50, y, size: 10, font, color: colors.text });
    y -= 12;
    page.drawText("2. This position is subject to the company's policies and regulations.", { x: 50, y, size: 10, font, color: colors.text });
    y -= 12;
    page.drawText("3. Please confirm your acceptance by signing below.", { x: 50, y, size: 10, font, color: colors.text });

    y -= 30;

    page.drawText("We look forward to welcoming you to our team.", { x: 50, y, size: 10, font, color: colors.text });

    // Notes
    if (formData.notes) {
      y -= 30;
      page.drawText("Notes:", { x: 50, y, size: 10, font: fontBold, color: colors.text });
      y -= 15;
      page.drawText(formData.notes, { x: 50, y, size: 10, font, color: colors.text });
    }

    drawSignature(page, profile, 150);
    drawFooter(page);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const companyName = (profile.companyName || "Company").replace(/[^a-zA-Z0-9]/g, "");
    a.download = `${companyName}_${formData.letterNumber}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = async () => {
    if (!formData) return;
    await generatePdf();
  };

  const previewContent = formData ? (
    <div className="space-y-4">
      <div className="aspect-[1/1.41] overflow-auto rounded border bg-white p-4 text-xs text-black">
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="flex items-start gap-3">
              {profile.logo && (
                <img src={profile.logo} alt="Company Logo" className="h-12 w-12 object-contain" />
              )}
              <div>
                <p className="text-lg font-bold text-blue-600">{profile.companyName || "Company Name"}</p>
                <p className="text-gray-500">{profile.address}</p>
                <p className="text-gray-500">{profile.phone && `Phone: ${profile.phone}`}</p>
                <p className="text-gray-500">{profile.email && `Email: ${profile.email}`}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">OFFERING LETTER</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p><strong>Number:</strong> {formData.letterNumber}</p>
            <p><strong>Date:</strong> {formData.date}</p>
          </div>

          <div className="border-t pt-4">
            <p className="font-bold">To:</p>
            <p>{formData.candidateName}</p>
          </div>

          <div className="border-t pt-4">
            <p>Dear {formData.candidateName},</p>
            <p className="mt-2">We are pleased to offer you the following position at our company:</p>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="grid grid-cols-2">
              <span className="font-bold">Position:</span>
              <span>{formData.position}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-bold">Department:</span>
              <span>{formData.department || "-"}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-bold">Start Date:</span>
              <span>{formData.startDate}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-bold">Work Location:</span>
              <span>{formData.workLocation || "-"}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-bold">Working Hours:</span>
              <span>{formData.workingHours || "-"}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-bold">Probation Period:</span>
              <span>{formData.probationPeriod || "-"}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <span className="font-bold">Monthly Salary:</span>
            <span className="ml-2 text-lg font-bold text-blue-600">{formatCurrency(formData.salary)}</span>
          </div>

          {formData.benefits && (
            <div className="border-t pt-4">
              <p className="font-bold">Benefits:</p>
              <p className="text-gray-600">{formData.benefits}</p>
            </div>
          )}

          <div className="border-t pt-4 text-gray-500 text-xs">
            <p>Generated by Lumizo Docs</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button onClick={generatePdf} className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        <Button onClick={handlePrint} variant="outline" className="flex-1">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      </div>
    </div>
  ) : (
    <div className="flex aspect-[1/1.41] items-center justify-center rounded border bg-muted/50">
      <p className="text-muted-foreground">Fill the form to see preview</p>
    </div>
  );

  return (
    <GeneratorLayout
      title="Offering Letter Generator"
      description="Create professional job offering letters for your candidates."
      form={<OfferingLetterForm onSubmit={setFormData} />}
      preview={previewContent}
    />
  );
}
