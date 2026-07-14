"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ClipboardList, Receipt, Truck, Package, Users, ArrowRight } from "lucide-react";
import { GENERATORS } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="h-6 w-6" />,
  ClipboardList: <ClipboardList className="h-6 w-6" />,
  Receipt: <Receipt className="h-6 w-6" />,
  Truck: <Truck className="h-6 w-6" />,
  Package: <Package className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
};

export function ToolGrid() {
  return (
    <section id="tools" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            Tools
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Document Generators
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a tool to get started. Create professional documents in seconds.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {GENERATORS.map((gen, index) => (
            <Link key={gen.slug} href={`/${gen.slug}`} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {iconMap[gen.icon]}
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{gen.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {gen.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
