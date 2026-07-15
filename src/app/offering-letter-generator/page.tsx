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

  const totalBenefits = formData?.benefits?.reduce((sum, b) => sum + (b?.amount || 0), 0) || 0;
  const totalCompensation = (formData?.salary || 0) + totalBenefits;

  const generatePdf = async () => {
    if (!formData) return;

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const page = pdfDoc.addPage([595.28, 841.89]);

    let y = await drawCompanyHeader({ page, profile, y: 750, title: "OFFERING LETTER" });

    y -= 20;

    // Letter details
    page.drawText(`Number: ${formData.letterNumber}`, { x: 50, y, size: 9, font, color: colors.text });
    y -= 12;
    page.drawText(`Date: ${formData.date}`, { x: 50, y, size: 9, font, color: colors.text });

    y -= 20;

    // To
    page.drawText("To:", { x: 50, y, size: 9, font: fontBold, color: colors.text });
    y -= 12;
    page.drawText(formData.candidateName, { x: 50, y, size: 9, font, color: colors.text });

    y -= 20;

    // Opening
    page.drawText(`Dear ${formData.candidateName},`, { x: 50, y, size: 9, font, color: colors.text });
    y -= 15;
    page.drawText("We are pleased to offer you the following position:", { x: 50, y, size: 9, font, color: colors.text });

    y -= 20;

    // Details table
    const details = [
      ["Position:", formData.position],
      ["Department:", formData.department || "-"],
      ["Start Date:", formData.startDate],
      ["Location:", formData.workLocation || "-"],
      ["Hours:", formData.workingHours || "-"],
      ["Probation:", formData.probationPeriod || "-"],
    ];

    for (const [label, value] of details) {
      page.drawText(label, { x: 50, y, size: 9, font: fontBold, color: colors.text });
      page.drawText(value, { x: 150, y, size: 9, font, color: colors.text });
      y -= 12;
    }

    y -= 10;

    // Compensation section
    page.drawText("COMPENSATION", { x: 50, y, size: 10, font: fontBold, color: colors.primary });
    y -= 15;

    page.drawText("Base Salary:", { x: 50, y, size: 9, font: fontBold, color: colors.text });
    page.drawText(formatCurrency(formData.salary), { x: 150, y, size: 9, font, color: colors.text });
    y -= 12;

    // Benefits
    if (formData.benefits && formData.benefits.length > 0) {
      for (const benefit of formData.benefits) {
        page.drawText(benefit.name, { x: 70, y, size: 9, font, color: colors.text });
        page.drawText(formatCurrency(benefit.amount), { x: 150, y, size: 9, font, color: colors.text });
        y -= 12;
      }
    }

    // Total
    y -= 5;
    page.drawLine({ start: { x: 50, y }, end: { x: 250, y }, thickness: 0.5, color: colors.lightText });
    y -= 12;
    page.drawText("Total:", { x: 50, y, size: 9, font: fontBold, color: colors.text });
    page.drawText(formatCurrency(totalCompensation), { x: 150, y, size: 10, font: fontBold, color: colors.primary });

    y -= 20;

    // Terms
    page.drawText("TERMS & CONDITIONS", { x: 50, y, size: 10, font: fontBold, color: colors.primary });
    y -= 12;
    page.drawText("1. You must pass the probation period.", { x: 50, y, size: 9, font, color: colors.text });
    y -= 10;
    page.drawText("2. Subject to company policies.", { x: 50, y, size: 9, font, color: colors.text });
    y -= 10;
    page.drawText("3. Please confirm by signing below.", { x: 50, y, size: 9, font, color: colors.text });

    y -= 15;

    page.drawText("We look forward to welcoming you.", { x: 50, y, size: 9, font, color: colors.text });

    // Notes
    if (formData.notes) {
      y -= 20;
      page.drawText("Notes:", { x: 50, y, size: 9, font: fontBold, color: colors.text });
      y -= 12;
      const noteLines = formData.notes.match(/.{1,60}/g) || [formData.notes];
      for (const line of noteLines.slice(0, 2)) {
        page.drawText(line, { x: 50, y, size: 9, font, color: colors.text });
        y -= 10;
      }
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
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="flex items-start gap-2">
              {profile.logo && (
                <img src={profile.logo} alt="Logo" className="h-10 w-10 object-contain" />
              )}
              <div>
                <p className="text-sm font-bold text-blue-600">{profile.companyName || "Company"}</p>
                <p className="text-gray-500 text-[10px]">{profile.address}</p>
              </div>
            </div>
            <p className="text-lg font-bold text-blue-600">OFFERING LETTER</p>
          </div>

          <div className="border-t pt-2 text-[10px]">
            <p><strong>No:</strong> {formData.letterNumber} | <strong>Date:</strong> {formData.date}</p>
          </div>

          <div className="border-t pt-2 text-[10px]">
            <p>To: <strong>{formData.candidateName}</strong></p>
          </div>

          <div className="border-t pt-2 text-[10px]">
            <p>Dear {formData.candidateName},</p>
            <p className="mt-1">We are pleased to offer you:</p>
          </div>

          <div className="border-t pt-2 text-[10px] space-y-1">
            <div className="grid grid-cols-2"><span className="font-bold">Position:</span><span>{formData.position}</span></div>
            <div className="grid grid-cols-2"><span className="font-bold">Department:</span><span>{formData.department || "-"}</span></div>
            <div className="grid grid-cols-2"><span className="font-bold">Start Date:</span><span>{formData.startDate}</span></div>
            <div className="grid grid-cols-2"><span className="font-bold">Location:</span><span>{formData.workLocation || "-"}</span></div>
            <div className="grid grid-cols-2"><span className="font-bold">Hours:</span><span>{formData.workingHours || "-"}</span></div>
            <div className="grid grid-cols-2"><span className="font-bold">Probation:</span><span>{formData.probationPeriod || "-"}</span></div>
          </div>

          <div className="border-t pt-2 text-[10px]">
            <p className="font-bold text-blue-600">COMPENSATION</p>
            <div className="mt-1 space-y-1">
              <div className="flex justify-between"><span>Base Salary</span><span>{formatCurrency(formData.salary)}</span></div>
              {formData.benefits?.map((b, i) => (
                <div key={i} className="flex justify-between"><span className="ml-2">{b.name}</span><span>{formatCurrency(b.amount)}</span></div>
              ))}
              <div className="flex justify-between border-t pt-1 font-bold"><span>Total</span><span className="text-blue-600">{formatCurrency(totalCompensation)}</span></div>
            </div>
          </div>

          <div className="border-t pt-2 text-[10px] text-gray-500">
            <p>1. Must pass probation period.</p>
            <p>2. Subject to company policies.</p>
            <p>3. Confirm by signing below.</p>
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
