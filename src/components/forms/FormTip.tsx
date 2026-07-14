import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

export function FormTip() {
  return (
    <Card className="border-dashed border-primary/30 bg-primary/5">
      <CardContent className="flex items-start gap-3 p-4">
        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Petunjuk Pengisian</p>
          <p>
            Untuk data nama perusahaan, alamat, logo, dan tanda tangan, kamu bisa isi terlebih dahulu di{" "}
            <Link href="/company-profile" className="text-primary underline hover:text-primary/80">
              Company Profile
            </Link>
            . Data akan otomatis terisi di semua dokumen yang kamu buat.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
