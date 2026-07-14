"use client";

import { useState } from "react";
import { GeneratorLayout } from "@/components/generators/GeneratorLayout";
import { QuotationForm } from "@/components/forms/QuotationForm";
import { useCompanyProfile } from "@/features/company-profile/hooks/useCompanyProfile";
import { formatCurrency } from "@/lib/pdf-generator";
import { drawCompanyHeader, drawSignature, drawFooter, colors } from "@/lib/pdf-helpers";
import type { QuotationFormData } from "@/features/quotation/schema";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { TemplateSelector } from "@/components/pdf/TemplateSelector";

export default function QuotationGeneratorPage() {
  const { profile } = useCompanyProfile();
  const [formData, setFormData] = useState<QuotationFormData | null>(null);

  const subtotal = formData?.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  ) || 0;
  const discountAmount = subtotal * ((formData?.discountPercent || 0) / 100);
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * ((formData?.taxPercent || 0) / 100);
  const grandTotal = taxableAmount + taxAmount;

  const generatePdf = async () => {
    if (!formData) return;

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const page = pdfDoc.addPage([595.28, 841.89]);

    let y = await drawCompanyHeader({ page, profile, y: 750, title: "QUOTATION" });

    y -= 30;

    // Quotation details
    page.drawText(`Quotation #: ${formData.quotationNumber}`, { x: 50, y, size: 10, font, color: colors.text });
    y -= 15;
    page.drawText(`Date: ${formData.date}`, { x: 50, y, size: 10, font, color: colors.text });
    y -= 15;
    page.drawText(`Valid Until: ${formData.validUntil}`, { x: 50, y, size: 10, font, color: colors.text });

    y -= 30;

    // Customer info
    page.drawText("Quote For:", { x: 50, y, size: 10, font: fontBold, color: colors.text });
    y -= 15;
    page.drawText(formData.customerName, { x: 50, y, size: 10, font, color: colors.text });
    y -= 15;
    if (formData.customerCompany) {
      page.drawText(formData.customerCompany, { x: 50, y, size: 10, font, color: colors.text });
      y -= 15;
    }
    page.drawText(formData.customerAddress, { x: 50, y, size: 10, font, color: colors.text });

    y -= 40;

    // Table
    page.drawText("Item", { x: 50, y, size: 10, font: fontBold, color: colors.text });
    page.drawText("Qty", { x: 300, y, size: 10, font: fontBold, color: colors.text });
    page.drawText("Price", { x: 370, y, size: 10, font: fontBold, color: colors.text });
    page.drawText("Total", { x: 470, y, size: 10, font: fontBold, color: colors.text });

    y -= 5;
    page.drawLine({ start: { x: 50, y }, end: { x: 545, y }, thickness: 1, color: colors.primary });
    y -= 15;

    for (const item of formData.items) {
      page.drawText(item.name, { x: 50, y, size: 10, font, color: colors.text });
      page.drawText(String(item.quantity), { x: 300, y, size: 10, font, color: colors.text });
      page.drawText(formatCurrency(item.unitPrice), { x: 370, y, size: 10, font, color: colors.text });
      page.drawText(formatCurrency(item.quantity * item.unitPrice), { x: 470, y, size: 10, font, color: colors.text });
      y -= 15;
    }

    y -= 20;

    // Totals
    page.drawText("Subtotal:", { x: 370, y, size: 10, font, color: colors.text });
    page.drawText(formatCurrency(subtotal), { x: 470, y, size: 10, font, color: colors.text });
    y -= 15;

    if (formData.discountPercent > 0) {
      page.drawText(`Discount (${formData.discountPercent}%):`, { x: 370, y, size: 10, font, color: colors.text });
      page.drawText(`-${formatCurrency(discountAmount)}`, { x: 470, y, size: 10, font, color: colors.text });
      y -= 15;
    }

    if (formData.taxPercent > 0) {
      page.drawText(`Tax (${formData.taxPercent}%):`, { x: 370, y, size: 10, font, color: colors.text });
      page.drawText(formatCurrency(taxAmount), { x: 470, y, size: 10, font, color: colors.text });
      y -= 15;
    }

    y -= 2;
    page.drawLine({ start: { x: 370, y }, end: { x: 545, y }, thickness: 1, color: colors.primary });
    y -= 18;
    page.drawText("Grand Total:", { x: 370, y, size: 12, font: fontBold, color: colors.primary });
    page.drawText(formatCurrency(grandTotal), { x: 470, y, size: 12, font: fontBold, color: colors.primary });

    // Scope of Work
    if (formData.scopeOfWork) {
      y -= 40;
      page.drawText("Scope of Work:", { x: 50, y, size: 10, font: fontBold, color: colors.text });
      y -= 15;
      const lines = formData.scopeOfWork.split("\n");
      for (const line of lines.slice(0, 5)) {
        page.drawText(line, { x: 50, y, size: 10, font, color: colors.text });
        y -= 15;
      }
    }

    // Notes
    if (formData.notes) {
      y -= 20;
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
    a.download = `${companyName}_${formData.quotationNumber}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const previewContent = formData ? (
    <div className="space-y-4">
      <div className="aspect-[1/1.41] overflow-auto rounded border bg-white p-4 text-xs text-black">
        <div className="space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-bold text-blue-600">{profile.companyName || "Company Name"}</p>
              <p className="text-gray-500">{profile.address}</p>
            </div>
            <p className="text-2xl font-bold text-blue-600">QUOTATION</p>
          </div>
          <div className="border-t pt-4">
            <p><strong>Quote #:</strong> {formData.quotationNumber}</p>
            <p><strong>Date:</strong> {formData.date}</p>
            <p><strong>Valid Until:</strong> {formData.validUntil}</p>
          </div>
          <div className="border-t pt-4">
            <p className="font-bold">Quote For:</p>
            <p>{formData.customerName}</p>
            {formData.customerCompany && <p>{formData.customerCompany}</p>}
            <p>{formData.customerAddress}</p>
          </div>
          <div className="border-t pt-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Item</th>
                  <th className="py-2 text-right">Qty</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2 text-right">{item.quantity}</td>
                    <td className="py-2 text-right">{formatCurrency(item.unitPrice)}</td>
                    <td className="py-2 text-right">{formatCurrency(item.quantity * item.unitPrice)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t pt-4 text-right">
            <p>Subtotal: {formatCurrency(subtotal)}</p>
            {formData.discountPercent > 0 && <p className="text-red-500">Discount: -{formatCurrency(discountAmount)}</p>}
            {formData.taxPercent > 0 && <p>Tax: {formatCurrency(taxAmount)}</p>}
            <p className="text-lg font-bold text-blue-600">Grand Total: {formatCurrency(grandTotal)}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Button onClick={generatePdf} className="flex-1">
          <Download className="mr-2 h-4 w-4" />Download PDF
        </Button>
        <Button onClick={generatePdf} variant="outline" className="flex-1">
          <Printer className="mr-2 h-4 w-4" />Print
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
      title="Quotation Generator"
      description="Generate detailed quotations for your products and services."
      form={
        <>
          <TemplateSelector />
          <QuotationForm onSubmit={setFormData} />
        </>
      }
      preview={previewContent}
    />
  );
}
