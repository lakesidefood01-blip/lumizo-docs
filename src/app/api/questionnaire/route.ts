import { NextRequest, NextResponse } from "next/server";

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

    // Format data
    const rowData = [
      new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      data.usahaType,
      data.frequency,
      data.easeOfUse,
      data.featureSatisfaction,
      data.pdfQuality,
      data.timeSaving,
      data.whatYouLike || "",
      data.whatToImprove || "",
      data.hardToFind || "",
      data.toolWishlist?.join(", ") || "",
      data.npsScore || "",
      data.email || "",
    ];

    // Kirim ke Google Sheets
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;
    if (GOOGLE_SHEETS_URL) {
      try {
        await fetch(GOOGLE_SHEETS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "append", values: rowData }),
          redirect: "follow",
        });
      } catch (err) {
        console.error("Google Sheets error:", err);
      }
    }

    // Log untuk development
    console.log("Questionnaire:", rowData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Gagal mengirim" }, { status: 500 });
  }
}
