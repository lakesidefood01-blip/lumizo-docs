import Link from "next/link";
import { ArrowRight, FileText, ClipboardList, Receipt, Truck, Package } from "lucide-react";

const relatedTools = [
  { name: "Invoice Generator", href: "/invoice-generator", icon: FileText },
  { name: "Quotation Generator", href: "/quotation-generator", icon: ClipboardList },
  { name: "Receipt Generator", href: "/receipt-generator", icon: Receipt },
  { name: "Delivery Order Generator", href: "/surat-jalan-generator", icon: Truck },
  { name: "Packing List Generator", href: "/packing-list-generator", icon: Package },
];

export function RelatedToolsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary text-center">
            More Tools
          </p>
          <h2 className="mb-12 text-3xl font-bold tracking-tight md:text-5xl text-center">
            Related Tools
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-center gap-4 rounded-xl border border-border/50 bg-background/50 p-5 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <tool.icon className="h-5 w-5" />
                </div>
                <span className="font-medium flex-1">{tool.name}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
