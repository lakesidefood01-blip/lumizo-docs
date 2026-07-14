"use client";

import { useState } from "react";
import { GeneratorLayout } from "@/components/generators/GeneratorLayout";
import { PackingListForm } from "@/components/forms/PackingListForm";
import { useCompanyProfile } from "@/features/company-profile/hooks/useCompanyProfile";
import { drawCompanyHeader, drawSignature, drawFooter, colors } from "@/lib/pdf-helpers";
import type { PackingListFormData } from "@/features/packing-list/schema";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { TemplateSelector } from "@/components/pdf/TemplateSelector";

export default function PackingListGeneratorPage() {
  const { profile } = useCompanyProfile();
  const [formData, setFormData] = useState<PackingListFormData | null>(null);

  const totalQuantity = formData?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalWeight = formData?.items.reduce((sum, item) => sum + item.weight, 0) || 0;

  const generatePdf = async () => {
    if (!formData) return;

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const page = pdfDoc.addPage([595.28, 841.89]);

    let y = await drawCompanyHeader({ page, profile, y: 750, title: "PACKING LIST" });

    y -= 30;

    // Packing list details
    page.drawText(`Packing List #: ${formData.packingListNumber}`, { x: 50, y, size: 10, font, color: colors.text });
    y -= 15;
    page.drawText(`Date: ${formData.date}`, { x: 50, y, size: 10, font, color: colors.text });
    if (formData.relatedInvoice) {
      y -= 15;
      page.drawText(`Related Invoice: ${formData.relatedInvoice}`, { x: 50, y, size: 10, font, color: colors.text });
    }

    y -= 30;

    // Shipper and Consignee
    page.drawText("Shipper:", { x: 50, y, size: 10, font: fontBold, color: colors.text });
    page.drawText("Consignee:", { x: 320, y, size: 10, font: fontBold, color: colors.text });
    y -= 15;
    page.drawText(formData.shipper, { x: 50, y, size: 10, font, color: colors.text });
    page.drawText(formData.consignee, { x: 320, y, size: 10, font, color: colors.text });

    y -= 30;

    // Items table
    page.drawText("No.", { x: 50, y, size: 10, font: fontBold, color: colors.text });
    page.drawText("Product Name", { x: 100, y, size: 10, font: fontBold, color: colors.text });
    page.drawText("Qty", { x: 300, y, size: 10, font: fontBold, color: colors.text });
    page.drawText("Weight", { x: 370, y, size: 10, font: fontBold, color: colors.text });
    page.drawText("Dimensions", { x: 440, y, size: 10, font: fontBold, color: colors.text });

    y -= 5;
    page.drawLine({ start: { x: 50, y }, end: { x: 545, y }, thickness: 1, color: colors.primary });
    y -= 15;

    formData.items.forEach((item, index) => {
      page.drawText(String(index + 1), { x: 50, y, size: 10, font, color: colors.text });
      page.drawText(item.productName, { x: 100, y, size: 10, font, color: colors.text });
      page.drawText(String(item.quantity), { x: 300, y, size: 10, font, color: colors.text });
      page.drawText(`${item.weight.toFixed(2)} kg`, { x: 370, y, size: 10, font, color: colors.text });
      page.drawText(item.dimensions || "-", { x: 440, y, size: 10, font, color: colors.text });
      y -= 15;
    });

    y -= 10;
    page.drawLine({ start: { x: 50, y }, end: { x: 545, y }, thickness: 0.5, color: colors.lightText });
    y -= 15;

    page.drawText(`Total Quantity: ${totalQuantity}`, { x: 50, y, size: 10, font: fontBold, color: colors.text });
    page.drawText(`Total Weight: ${totalWeight.toFixed(2)} kg`, { x: 300, y, size: 10, font: fontBold, color: colors.text });

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
    a.download = `${companyName}_${formData.packingListNumber}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const previewContent = formData ? (
    <div className="space-y-4">
      <div className="aspect-[1/1.41] overflow-auto rounded border bg-white p-4 text-xs text-black">
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-lg font-bold text-blue-600">{profile.companyName || "Company Name"}</p>
            <p className="text-2xl font-bold text-blue-600">PACKING LIST</p>
          </div>
          <div className="border-t pt-4">
            <p><strong>Packing List #:</strong> {formData.packingListNumber}</p>
            <p><strong>Date:</strong> {formData.date}</p>
            {formData.relatedInvoice && <p><strong>Related Invoice:</strong> {formData.relatedInvoice}</p>}
          </div>
          <div className="border-t pt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold">Shipper:</p>
              <p>{formData.shipper}</p>
            </div>
            <div>
              <p className="font-bold">Consignee:</p>
              <p>{formData.consignee}</p>
            </div>
          </div>
          <div className="border-t pt-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">No.</th>
                  <th className="py-2">Product</th>
                  <th className="py-2 text-right">Qty</th>
                  <th className="py-2 text-right">Weight</th>
                  <th className="py-2">Dimensions</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">{i + 1}</td>
                    <td className="py-2">{item.productName}</td>
                    <td className="py-2 text-right">{item.quantity}</td>
                    <td className="py-2 text-right">{item.weight.toFixed(2)} kg</td>
                    <td className="py-2">{item.dimensions || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t pt-4 flex justify-between">
            <p><strong>Total Quantity:</strong> {totalQuantity}</p>
            <p><strong>Total Weight:</strong> {totalWeight.toFixed(2)} kg</p>
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
      title="Packing List Generator"
      description="Create packing lists for shipment documentation."
      form={
        <>
          <TemplateSelector />
          <PackingListForm onSubmit={setFormData} />
        </>
      }
      preview={previewContent}
    />
  );
}
