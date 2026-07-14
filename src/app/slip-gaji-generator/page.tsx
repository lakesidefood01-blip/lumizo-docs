"use client";

import { useState } from "react";
import { GeneratorLayout } from "@/components/generators/GeneratorLayout";
import { SlipGajiForm } from "@/components/forms/SlipGajiForm";
import { useCompanyProfile } from "@/features/company-profile/hooks/useCompanyProfile";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { formatCurrency } from "@/lib/pdf-generator";
import { drawCompanyHeader, drawSignature, drawFooter, colors, base64ToUint8Array } from "@/lib/pdf-helpers";
import type { SlipGajiFormData } from "@/features/slip-gaji/schema";
import type { PdfTemplate } from "@/types";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { TemplateSelector } from "@/components/pdf/TemplateSelector";

export default function SlipGajiGeneratorPage() {
  const { profile } = useCompanyProfile();
  const { value: template } = useLocalStorage<PdfTemplate>("lumizo-pdf-template", "modern");
  const [formData, setFormData] = useState<SlipGajiFormData | null>(null);

  const totalAllowances = formData?.allowances?.reduce((sum, item) => sum + (item?.amount || 0), 0) || 0;
  const grossPay = (formData?.basicSalary || 0) + totalAllowances;

  const bpjsHealthAmount = grossPay * ((formData?.bpjsHealth || 0) / 100);
  const bpjsEmploymentAmount = grossPay * ((formData?.bpjsEmployment || 0) / 100);
  const taxAmount = grossPay * ((formData?.taxPercent || 0) / 100);
  const otherDeductions = formData?.deductions?.reduce((sum, item) => sum + (item?.amount || 0), 0) || 0;
  const totalDeductions = bpjsHealthAmount + bpjsEmploymentAmount + taxAmount + otherDeductions;

  const netPay = grossPay - totalDeductions;

  const generatePdf = async () => {
    if (!formData) return;

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const page = pdfDoc.addPage([595.28, 841.89]); // A4

    let y = await drawCompanyHeader({ page, profile, y: 750, title: "SLIP GAJI" });

    y -= 30;

    // Employee details
    page.drawText(`Employee: ${formData.employeeName}`, { x: 50, y, size: 10, font, color: colors.text });
    y -= 15;
    page.drawText(`ID: ${formData.employeeId}`, { x: 50, y, size: 10, font, color: colors.text });
    y -= 15;
    page.drawText(`Position: ${formData.position}`, { x: 50, y, size: 10, font, color: colors.text });
    if (formData.department) {
      y -= 15;
      page.drawText(`Department: ${formData.department}`, { x: 50, y, size: 10, font, color: colors.text });
    }

    y -= 30;

    // Pay period
    page.drawText(`Period: ${formData.payPeriod}`, { x: 50, y, size: 10, font, color: colors.text });
    y -= 15;
    page.drawText(`Pay Date: ${formData.payDate}`, { x: 50, y, size: 10, font, color: colors.text });

    y -= 40;

    // Income section
    page.drawText("INCOME", { x: 50, y, size: 12, font: fontBold, color: colors.primary });
    y -= 20;

    page.drawText("Basic Salary", { x: 50, y, size: 10, font, color: colors.text });
    page.drawText(formatCurrency(formData.basicSalary), { x: 400, y, size: 10, font, color: colors.text });
    y -= 15;

    if (formData.allowances && formData.allowances.length > 0) {
      for (const item of formData.allowances) {
        page.drawText(item.name, { x: 70, y, size: 10, font, color: colors.text });
        page.drawText(formatCurrency(item.amount), { x: 400, y, size: 10, font, color: colors.text });
        y -= 15;
      }
    }

    y -= 10;
    page.drawLine({ start: { x: 50, y }, end: { x: 545, y }, thickness: 1, color: colors.primary });
    y -= 15;
    page.drawText("Gross Pay", { x: 50, y, size: 10, font: fontBold, color: colors.text });
    page.drawText(formatCurrency(grossPay), { x: 400, y, size: 10, font: fontBold, color: colors.green });

    y -= 40;

    // Deductions section
    page.drawText("DEDUCTIONS", { x: 50, y, size: 12, font: fontBold, color: colors.primary });
    y -= 20;

    if (bpjsHealthAmount > 0) {
      page.drawText(`BPJS Kesehatan (${formData.bpjsHealth}%)`, { x: 50, y, size: 10, font, color: colors.text });
      page.drawText(formatCurrency(bpjsHealthAmount), { x: 400, y, size: 10, font, color: colors.red });
      y -= 15;
    }

    if (bpjsEmploymentAmount > 0) {
      page.drawText(`BPJS Ketenagakerjaan (${formData.bpjsEmployment}%)`, { x: 50, y, size: 10, font, color: colors.text });
      page.drawText(formatCurrency(bpjsEmploymentAmount), { x: 400, y, size: 10, font, color: colors.red });
      y -= 15;
    }

    if (taxAmount > 0) {
      page.drawText(`PPh 21 (${formData.taxPercent}%)`, { x: 50, y, size: 10, font, color: colors.text });
      page.drawText(formatCurrency(taxAmount), { x: 400, y, size: 10, font, color: colors.red });
      y -= 15;
    }

    if (formData.deductions && formData.deductions.length > 0) {
      for (const item of formData.deductions) {
        page.drawText(item.name, { x: 70, y, size: 10, font, color: colors.text });
        page.drawText(formatCurrency(item.amount), { x: 400, y, size: 10, font, color: colors.red });
        y -= 15;
      }
    }

    y -= 10;
    page.drawLine({ start: { x: 50, y }, end: { x: 545, y }, thickness: 1, color: colors.primary });
    y -= 15;
    page.drawText("Total Deductions", { x: 50, y, size: 10, font: fontBold, color: colors.text });
    page.drawText(formatCurrency(totalDeductions), { x: 400, y, size: 10, font: fontBold, color: colors.red });

    y -= 40;

    // Net pay
    page.drawLine({ start: { x: 50, y: y + 10 }, end: { x: 545, y: y + 10 }, thickness: 2, color: colors.primary });
    page.drawText("NET PAY", { x: 50, y, size: 14, font: fontBold, color: colors.primary });
    page.drawText(formatCurrency(netPay), { x: 380, y, size: 14, font: fontBold, color: colors.green });

    // Notes
    if (formData.notes) {
      y -= 40;
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
    a.download = `payslip-${formData.employeeId}-${formData.payPeriod.replace(/\s/g, "-")}.pdf`;
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
            <div>
              <p className="text-lg font-bold text-blue-600">{profile.companyName || "Company Name"}</p>
              <p className="text-gray-500">{profile.address}</p>
              <p className="text-gray-500">{profile.phone && `Phone: ${profile.phone}`}</p>
              <p className="text-gray-500">{profile.email && `Email: ${profile.email}`}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">SLIP GAJI</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p><strong>Employee:</strong> {formData.employeeName}</p>
            <p><strong>ID:</strong> {formData.employeeId}</p>
            <p><strong>Position:</strong> {formData.position}</p>
            {formData.department && <p><strong>Department:</strong> {formData.department}</p>}
          </div>

          <div className="border-t pt-4">
            <p><strong>Period:</strong> {formData.payPeriod}</p>
            <p><strong>Pay Date:</strong> {formData.payDate}</p>
          </div>

          <div className="border-t pt-4">
            <p className="font-bold text-blue-600">INCOME</p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between">
                <span>Basic Salary</span>
                <span>{formatCurrency(formData.basicSalary)}</span>
              </div>
              {formData.allowances?.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="ml-4">{item.name}</span>
                  <span>{formatCurrency(item.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-1 font-bold">
                <span>Gross Pay</span>
                <span className="text-green-600">{formatCurrency(grossPay)}</span>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="font-bold text-blue-600">DEDUCTIONS</p>
            <div className="mt-2 space-y-1">
              {bpjsHealthAmount > 0 && (
                <div className="flex justify-between">
                  <span>BPJS Kesehatan ({formData.bpjsHealth}%)</span>
                  <span className="text-red-500">{formatCurrency(bpjsHealthAmount)}</span>
                </div>
              )}
              {bpjsEmploymentAmount > 0 && (
                <div className="flex justify-between">
                  <span>BPJS Ketenagakerjaan ({formData.bpjsEmployment}%)</span>
                  <span className="text-red-500">{formatCurrency(bpjsEmploymentAmount)}</span>
                </div>
              )}
              {taxAmount > 0 && (
                <div className="flex justify-between">
                  <span>PPh 21 ({formData.taxPercent}%)</span>
                  <span className="text-red-500">{formatCurrency(taxAmount)}</span>
                </div>
              )}
              {formData.deductions?.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="ml-4">{item.name}</span>
                  <span className="text-red-500">{formatCurrency(item.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t pt-1 font-bold">
                <span>Total Deductions</span>
                <span className="text-red-500">-{formatCurrency(totalDeductions)}</span>
              </div>
            </div>
          </div>

          <div className="border-t-2 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>NET PAY</span>
              <span className="text-green-600">{formatCurrency(netPay)}</span>
            </div>
          </div>

          {formData.notes && (
            <div className="border-t pt-4">
              <p className="font-bold">Notes:</p>
              <p className="text-gray-500">{formData.notes}</p>
            </div>
          )}

          {profile.signatoryName && (
            <div className="border-t pt-4 text-right">
              <p className="text-gray-500">Authorized Signature:</p>
              <div className="inline-block border-b pb-1">{profile.signatoryName}</div>
            </div>
          )}
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
      title="Slip Gaji Generator"
      description="Create professional payslips for your employees."
      form={
        <>
          <TemplateSelector />
          <SlipGajiForm onSubmit={setFormData} />
        </>
      }
      preview={previewContent}
    />
  );
}
