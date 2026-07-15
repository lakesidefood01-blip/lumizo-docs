"use client";

import { useState } from "react";
import { GeneratorLayout } from "@/components/generators/GeneratorLayout";
import { DeliveryOrderForm } from "@/components/forms/DeliveryOrderForm";
import { useCompanyProfile } from "@/features/company-profile/hooks/useCompanyProfile";
import { drawCompanyHeader, drawSignature, drawFooter, colors } from "@/lib/pdf-helpers";
import type { DeliveryOrderFormData } from "@/features/delivery-order/schema";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { TemplateSelector } from "@/components/pdf/TemplateSelector";

export default function DeliveryOrderGeneratorPage() {
  const { profile } = useCompanyProfile();
  const [formData, setFormData] = useState<DeliveryOrderFormData | null>(null);

  const generatePdf = async () => {
    if (!formData) return;

    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const page = pdfDoc.addPage([595.28, 841.89]);

    let y = await drawCompanyHeader({ page, profile, y: 750, title: "DELIVERY ORDER" });

    y -= 30;

    // Delivery details
    page.drawText(`Delivery #: ${formData.deliveryNumber}`, { x: 50, y, size: 10, font, color: colors.text });
    y -= 15;
    page.drawText(`Date: ${formData.date}`, { x: 50, y, size: 10, font, color: colors.text });

    y -= 30;

    // Sender and Receiver
    page.drawText("Sender:", { x: 50, y, size: 10, font: fontBold, color: colors.text });
    page.drawText("Receiver:", { x: 320, y, size: 10, font: fontBold, color: colors.text });
    y -= 15;
    page.drawText(formData.sender, { x: 50, y, size: 10, font, color: colors.text });
    page.drawText(formData.receiver, { x: 320, y, size: 10, font, color: colors.text });

    y -= 20;

    page.drawText("Delivery Address:", { x: 50, y, size: 10, font: fontBold, color: colors.text });
    y -= 15;
    // Wrap delivery address
    const addressLines = formData.deliveryAddress.match(/.{1,50}/g) || [formData.deliveryAddress];
    for (const line of addressLines.slice(0, 2)) {
      page.drawText(line, { x: 50, y, size: 10, font, color: colors.text });
      y -= 12;
    }

    y -= 20;

    if (formData.courier) {
      page.drawText(`Courier: ${formData.courier}`, { x: 50, y, size: 10, font, color: colors.text });
      y -= 15;
    }
    if (formData.vehicleInfo) {
      page.drawText(`Vehicle: ${formData.vehicleInfo}`, { x: 50, y, size: 10, font, color: colors.text });
      y -= 15;
    }

    y -= 20;

    // Items table
    page.drawText("No.", { x: 50, y, size: 10, font: fontBold, color: colors.text });
    page.drawText("Product Name", { x: 100, y, size: 10, font: fontBold, color: colors.text });
    page.drawText("Quantity", { x: 400, y, size: 10, font: fontBold, color: colors.text });

    y -= 5;
    page.drawLine({ start: { x: 50, y }, end: { x: 545, y }, thickness: 1, color: colors.primary });
    y -= 15;

    formData.items.forEach((item, index) => {
      page.drawText(String(index + 1), { x: 50, y, size: 10, font, color: colors.text });
      page.drawText(item.productName, { x: 100, y, size: 10, font, color: colors.text });
      page.drawText(String(item.quantity), { x: 400, y, size: 10, font, color: colors.text });
      y -= 15;
    });

    y -= 10;
    page.drawText(`Total Items: ${formData.items.reduce((sum, item) => sum + item.quantity, 0)}`, {
      x: 50, y, size: 10, font: fontBold, color: colors.text,
    });

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
    a.download = `${companyName}_${formData.deliveryNumber}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const previewContent = formData ? (
    <div className="space-y-4">
      <div className="aspect-[1/1.41] overflow-auto rounded border bg-white p-4 text-xs text-black">
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="flex items-start gap-3">
              {profile.logo && (
                <img
                  src={profile.logo}
                  alt="Company Logo"
                  className="h-12 w-12 object-contain"
                />
              )}
              <p className="text-lg font-bold text-blue-600">{profile.companyName || "Company Name"}</p>
            </div>
            <p className="text-2xl font-bold text-blue-600">DELIVERY ORDER</p>
          </div>
          <div className="border-t pt-4">
            <p><strong>Delivery #:</strong> {formData.deliveryNumber}</p>
            <p><strong>Date:</strong> {formData.date}</p>
          </div>
          <div className="border-t pt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold">Sender:</p>
              <p>{formData.sender}</p>
            </div>
            <div>
              <p className="font-bold">Receiver:</p>
              <p>{formData.receiver}</p>
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="font-bold">Delivery Address:</p>
            <p>{formData.deliveryAddress}</p>
          </div>
          <div className="border-t pt-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">No.</th>
                  <th className="py-2">Product Name</th>
                  <th className="py-2 text-right">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">{i + 1}</td>
                    <td className="py-2">{item.productName}</td>
                    <td className="py-2 text-right">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      title="Delivery Order Generator"
      description="Generate delivery orders for shipping and logistics."
      form={
        <>
          <TemplateSelector />
          <DeliveryOrderForm onSubmit={setFormData} />
        </>
      }
      preview={previewContent}
    />
  );
}
