import { NextRequest, NextResponse } from "next/server";

// Google Sheets Webhook URL
// Ganti dengan URL Google Apps Script Anda
const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL || "";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validasi data wajib
    if (!data.usahaType || !data.frequency || !data.easeOfUse) {
      return NextResponse.json(
        { error: "Mohon isi semua field yang wajib" },
        { status: 400 }
      );
    }

    // Format data untuk Google Sheets
    const rowData = {
      timestamp: new Date().toISOString(),
      usahaType: data.usahaType,
      frequency: data.frequency,
      easeOfUse: data.easeOfUse,
      featureSatisfaction: data.featureSatisfaction,
      pdfQuality: data.pdfQuality,
      timeSaving: data.timeSaving,
      whatYouLike: data.whatYouLike,
      whatToImprove: data.whatToImprove,
      hardToFind: data.hardToFind,
      toolWishlist: data.toolWishlist?.join(", ") || "",
      npsScore: data.npsScore,
      email: data.email || "",
    };

    // Kirim ke Google Sheets jika URL tersedia
    if (GOOGLE_SHEETS_URL) {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rowData),
      });

      if (!response.ok) {
        console.error("Failed to send to Google Sheets");
      }
    } else {
      // Log data ke console untuk development
      console.log("Questionnaire submission:", rowData);
    }

    return NextResponse.json({ success: true, message: "Jawaban berhasil dikirim" });
  } catch (error) {
    console.error("Error processing questionnaire:", error);
    return NextResponse.json(
      { error: "Gagal memproses jawaban" },
      { status: 500 }
    );
  }
}
