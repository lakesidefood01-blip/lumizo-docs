import { NextRequest, NextResponse } from "next/server";

async function postToGoogleSheets(url: string, payload: unknown, maxRedirects = 5) {
  let currentUrl = url;

  for (let i = 0; i < maxRedirects; i++) {
    const res = await fetch(currentUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "manual", // penting: Apps Script selalu redirect 302 dulu.
      // Kalau dibiarkan auto-follow, method POST bisa berubah jadi GET
      // dan body-nya hilang, sehingga e.postData di Apps Script undefined.
    });

    if (res.status === 301 || res.status === 302) {
      const location = res.headers.get("location");
      if (!location) {
        throw new Error("Redirect dari Google Sheets tanpa header Location");
      }
      currentUrl = location;
      continue; // POST ulang ke URL baru, method & body tetap dipertahankan
    }

    const text = await res.text();

    if (!res.ok) {
      throw new Error(`Google Sheets merespons error ${res.status}: ${text}`);
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error(`Respons Google Sheets bukan JSON valid: ${text}`);
    }

    // Apps Script kita membalas { status: "error", message: ... } dengan HTTP 200,
    // jadi res.ok tidak cukup — perlu cek field status juga.
    if (
      parsed &&
      typeof parsed === "object" &&
      "status" in parsed &&
      (parsed as { status: string }).status === "error"
    ) {
      throw new Error(
        `Apps Script melaporkan error: ${(parsed as { message?: string }).message ?? "unknown"}`
      );
    }

    return parsed;
  }

  throw new Error("Terlalu banyak redirect saat POST ke Google Sheets");
}

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

    // Log untuk development
    console.log("Questionnaire:", rowData);

    // Kirim ke Google Sheets
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

    if (!GOOGLE_SHEETS_URL) {
      console.error("GOOGLE_SHEETS_URL belum diset di environment variables");
      return NextResponse.json(
        { error: "Konfigurasi server belum lengkap (GOOGLE_SHEETS_URL kosong)" },
        { status: 500 }
      );
    }

    try {
      const sheetsResult = await postToGoogleSheets(GOOGLE_SHEETS_URL, {
        action: "append",
        values: rowData,
      });
      console.log("Google Sheets response:", sheetsResult);
    } catch (err) {
      // Jangan tutupi error ini — kalau gagal masuk sheet, user harus tahu
      console.error("Google Sheets error:", err);
      return NextResponse.json(
        { error: "Gagal menyimpan ke Google Sheets. Silakan coba lagi." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Gagal mengirim" }, { status: 500 });
  }
}