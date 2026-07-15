import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.usahaType || !data.frequency || !data.easeOfUse) {
      return NextResponse.json({ error: "Mohon isi semua field yang wajib" }, { status: 400 });
    }

    const rowData = {
      timestamp: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      usahaType: data.usahaType,
      frequency: data.frequency,
      easeOfUse: data.easeOfUse,
      featureSatisfaction: data.featureSatisfaction,
      pdfQuality: data.pdfQuality,
      timeSaving: data.timeSaving,
      whatYouLike: data.whatYouLike || "",
      whatToImprove: data.whatToImprove || "",
      hardToFind: data.hardToFind || "",
      toolWishlist: data.toolWishlist?.join(", ") || "",
      npsScore: data.npsScore || "",
      email: data.email || "",
    };

    console.log("Questionnaire:", rowData);

    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;
    if (!GOOGLE_SHEETS_URL) {
      return NextResponse.json({ error: "GOOGLE_SHEETS_URL belum diset" }, { status: 500 });
    }

    // Kirim dengan follow redirect
    const res = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rowData),
    });

    const text = await res.text();
    console.log("Google Sheets response:", text);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Gagal mengirim" }, { status: 500 });
  }
}