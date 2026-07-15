"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { CheckCircle2, Send } from "lucide-react";

type FormData = {
  usahaType: string;
  frequency: string;
  easeOfUse: string;
  featureSatisfaction: string;
  pdfQuality: string;
  timeSaving: string;
  whatYouLike: string;
  whatToImprove: string;
  hardToFind: string;
  toolWishlist: string[];
  npsScore: string;
  email: string;
};

const initialState: FormData = {
  usahaType: "",
  frequency: "",
  easeOfUse: "",
  featureSatisfaction: "",
  pdfQuality: "",
  timeSaving: "",
  whatYouLike: "",
  whatToImprove: "",
  hardToFind: "",
  toolWishlist: [],
  npsScore: "",
  email: "",
};

const tools = [
  "Surat Perjanjian Kerja",
  "Surat Penawaran Harga",
  "Nota Dinas",
  "Surat Keterangan Bekerja",
  "Formulir Pengajuan Cuti",
  "Laporan Keuangan Sederhana",
  "Kontrak Kerja Freelance",
  "Surat Teguran",
];

export default function QuestionnairePage() {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      toolWishlist: prev.toolWishlist.includes(tool)
        ? prev.toolWishlist.filter((t) => t !== tool)
        : [...prev.toolWishlist, tool],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlert({ type: "success", message: "Terima kasih! Jawaban Anda telah dikirim." });
        setFormData(initialState);
      } else {
        setAlert({ type: "error", message: "Gagal mengirim jawaban. Silakan coba lagi." });
      }
    } catch {
      setAlert({ type: "error", message: "Gagal mengirim jawaban. Silakan coba lagi." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Kuesioner Kepuasan Pengguna</h1>
        <p className="mt-2 text-muted-foreground">
          Bantu kami meningkatkan layanan Lumizo Docs dengan mengisi kuesioner ini.
        </p>
      </div>

      {alert && (
        <div className="mb-6">
          <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profil Responden */}
        <Card>
          <CardHeader>
            <CardTitle>Profil Responden</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Jenis usaha Anda *</Label>
              <select
                required
                value={formData.usahaType}
                onChange={(e) => setFormData({ ...formData, usahaType: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Pilih jenis usaha</option>
                <option value="UMKM">UMKM</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Startup">Startup</option>
                <option value="Perusahaan">Perusahaan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Seberapa sering Anda menggunakan tools dokumen bisnis? *</Label>
              <select
                required
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Pilih frekuensi</option>
                <option value="Setiap hari">Setiap hari</option>
                <option value="Seminggu sekali">Seminggu sekali</option>
                <option value="Sebulan sekali">Sebulan sekali</option>
                <option value="Jarang">Jarang</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Tingkat Kepuasan */}
        <Card>
          <CardHeader>
            <CardTitle>Tingkat Kepuasan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Seberapa mudah menggunakan Lumizo Docs? *</Label>
              <select
                required
                value={formData.easeOfUse}
                onChange={(e) => setFormData({ ...formData, easeOfUse: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Pilih jawaban</option>
                <option value="Sangat Mudah">Sangat Mudah</option>
                <option value="Mudah">Mudah</option>
                <option value="Net">Net</option>
                <option value="Sulit">Sulit</option>
                <option value="Sangat Sulit">Sangat Sulit</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Apakah fitur yang tersedia sudah memenuhi kebutuhan bisnis Anda? *</Label>
              <select
                required
                value={formData.featureSatisfaction}
                onChange={(e) => setFormData({ ...formData, featureSatisfaction: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Pilih jawaban</option>
                <option value="Sangat Memenuhi">Sangat Memenuhi</option>
                <option value="Memenuhi">Memenuhi</option>
                <option value="Cukup">Cukup</option>
                <option value="Kurang">Kurang</option>
                <option value="Tidak Sama Sekali">Tidak Sama Sekali</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Bagaimana kualitas PDF yang dihasilkan? *</Label>
              <select
                required
                value={formData.pdfQuality}
                onChange={(e) => setFormData({ ...formData, pdfQuality: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Pilih jawaban</option>
                <option value="Sangat Bagus">Sangat Bagus</option>
                <option value="Bagus">Bagus</option>
                <option value="Biasa">Biasa</option>
                <option value="Kurang">Kurang</option>
                <option value="Tidak Bagus">Tidak Bagus</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Apakah Lumizo Docs membantu menghemat waktu? *</Label>
              <select
                required
                value={formData.timeSaving}
                onChange={(e) => setFormData({ ...formData, timeSaving: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Pilih jawaban</option>
                <option value="Sangat Membantu">Sangat Membantu</option>
                <option value="Membantu">Membantu</option>
                <option value="Cukup">Cukup</option>
                <option value="Kurang">Kurang</option>
                <option value="Tidak Membantu">Tidak Membantu</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Kritik dan Saran */}
        <Card>
          <CardHeader>
            <CardTitle>Kritik dan Saran</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Apa yang paling Anda suka dari Lumizo Docs?</Label>
              <Textarea
                placeholder="Tuliskan hal yang Anda sukai..."
                value={formData.whatYouLike}
                onChange={(e) => setFormData({ ...formData, whatYouLike: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Apa yang perlu diperbaiki dari Lumizo Docs?</Label>
              <Textarea
                placeholder="Tuliskan hal yang perlu diperbaiki..."
                value={formData.whatToImprove}
                onChange={(e) => setFormData({ ...formData, whatToImprove: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Apakah ada fitur yang sulit Anda temukan atau gunakan?</Label>
              <Textarea
                placeholder="Tuliskan fitur yang sulit ditemukan atau digunakan..."
                value={formData.hardToFind}
                onChange={(e) => setFormData({ ...formData, hardToFind: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Tool Wishlist */}
        <Card>
          <CardHeader>
            <CardTitle>Tools Tambahan</CardTitle>
            <CardDescription>Tools apa yang ingin Anda tambahkan di Lumizo Docs? (Bisa pilih lebih dari satu)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tools.map((tool) => (
                <label
                  key={tool}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    formData.toolWishlist.includes(tool)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.toolWishlist.includes(tool)}
                    onChange={() => handleCheckboxChange(tool)}
                    className="rounded"
                  />
                  <span className="text-sm">{tool}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* NPS Score */}
        <Card>
          <CardHeader>
            <CardTitle>Rekomendasi</CardTitle>
            <CardDescription>Seberapa besar kemungkinan Anda merekomendasikan Lumizo Docs kepada rekan bisnis? (0-10)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 11 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFormData({ ...formData, npsScore: String(i) })}
                  className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors ${
                    formData.npsScore === String(i)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Tidak mungkin</span>
              <span>Sangat mungkin</span>
            </div>
          </CardContent>
        </Card>

        {/* Email */}
        <Card>
          <CardHeader>
            <CardTitle>Kontak (Opsional)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Email (untuk follow up jika diperlukan)</Label>
              <Input
                type="email"
                placeholder="email@contoh.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            "Mengirim..."
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Kirim Jawaban
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
