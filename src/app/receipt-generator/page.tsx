"use client";

import { useState } from "react";
import { GeneratorLayout } from "@/components/generators/GeneratorLayout";
import { ReceiptForm } from "@/components/forms/ReceiptForm";
import { useCompanyProfile } from "@/features/company-profile/hooks/useCompanyProfile";
import { formatCurrency } from "@/lib/pdf-generator";
import { numberToWords } from "@/lib/number-to-words";
import { drawCompanyHeader, drawSignature, drawFooter, colors } from "@/lib/pdf-helpers";
import type { ReceiptFormData } from "@/features/receipt/schema";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { TemplateSelector } from "@/components/pdf/TemplateSelector";

export default function ReceiptGeneratorPage() {
  const { profile } = useCompanyProfile();
  const [formData, setFormData] = useState<ReceiptFormData | null>(null);

  const generatePdf = async () => {
    if (!formData) return;

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const page = pdfDoc.addPage([595.28, 841.89]);

    let y = await drawCompanyHeader({ page, profile, y: 750, title: "RECEIPT" });

    y -= 30;

    // Receipt details
    page.drawText(`Receipt #: ${formData.receiptNumber}`, { x: 50, y, size: 10, font, color: colors.text });
    y -= 15;
    page.drawText(`Date: ${formData.date}`, { x: 50, y, size: 10, font, color: colors.text });

    y -= 40;

    // Payment details
    page.drawText("Received From:", { x: 50, y, size: 10, font: fontBold, color: colors.text });
    y -= 15;
    page.drawText(formData.receivedFrom, { x: 50, y, size: 10, font, color: colors.text });

    y -= 30;

    page.drawText("Payment Details:", { x: 50, y, size: 10, font: fontBold, color: colors.text });
    y -= 15;
    page.drawText(`Purpose: ${formData.paymentPurpose}`, { x: 50, y, size: 10, font, color: colors.text });
    y -= 15;
    page.drawText(`Method: ${formData.paymentMethod.replace("_", " ").toUpperCase()}`, { x: 50, y, size: 10, font, color: colors.text });

    y -= 40;

    // Amount box
    page.drawRectangle({
      x: 50,
      y: y - 40,
      width: 495,
      height: 50,
      borderColor: colors.primary,
      borderWidth: 2,
    });
    page.drawText("AMOUNT:", { x: 70, y, size: 10, font: fontBold, color: colors.text });
    page.drawText(formatCurrency(formData.amount), {
      x: 300, y, size: 16, font: fontBold, color: colors.primary,
    });

    y -= 60;

    // Amount in words
    page.drawText("Amount in words:", { x: 50, y, size: 10, font, color: colors.lightText });
    y -= 15;
    page.drawText(numberToWords(formData.amount), { x: 50, y, size: 10, font, color: colors.text });

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
    const companyName = (profile.companyName || "Company").replace(/[^a-zA-Z0-9]/g, "");
    a.download = `${companyName}_${formData.receiptNumber}.pdf`;
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
            <p className="text-2xl font-bold text-blue-600">RECEIPT</p>
          </div>
          <div className="border-t pt-4">
            <p><strong>Receipt #:</strong> {formData.receiptNumber}</p>
            <p><strong>Date:</strong> {formData.date}</p>
          </div>
          <div className="border-t pt-4">
            <p className="font-bold">Received From:</p>
            <p>{formData.receivedFrom}</p>
          </div>
          <div className="border-t pt-4">
            <p className="font-bold">Payment Details:</p>
            <p>Purpose: {formData.paymentPurpose}</p>
            <p>Method: {formData.paymentMethod.replace("_", " ").toUpperCase()}</p>
          </div>
          <div className="border-t pt-4">
            <div className="rounded-lg border-2 border-blue-600 p-4">
              <p className="text-sm text-gray-500">AMOUNT</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(formData.amount)}</p>
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-gray-500">Amount in words:</p>
            <p className="font-medium">{numberToWords(formData.amount)}</p>
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
      title="Receipt Generator"
      description="Create receipts for payments received from customers."
      form={
        <>
          <TemplateSelector />
          <ReceiptForm onSubmit={setFormData} />
        </>
      }
      preview={previewContent}
    />
  );
}
