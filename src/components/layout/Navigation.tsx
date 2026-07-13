"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, FileText, ClipboardList, Receipt, Truck, Package } from "lucide-react";
import { GENERATORS } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="h-4 w-4" />,
  ClipboardList: <ClipboardList className="h-4 w-4" />,
  Receipt: <Receipt className="h-4 w-4" />,
  Truck: <Truck className="h-4 w-4" />,
  Package: <Package className="h-4 w-4" />,
};

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1">
        <Link
          href="/company-profile"
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            pathname === "/company-profile"
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
        >
          Company Profile
        </Link>
        <Link
          href="/blog"
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            pathname === "/blog"
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
        >
          Blog
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background/50 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-x-0 top-16 z-50 border-b bg-background/95 backdrop-blur-xl md:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-1">
              {GENERATORS.map((gen) => (
                <Link
                  key={gen.slug}
                  href={`/${gen.slug}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === `/${gen.slug}`
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {iconMap[gen.icon]}
                  {gen.name}
                </Link>
              ))}
              <div className="border-t my-2" />
              <Link
                href="/company-profile"
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/company-profile"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Company Profile
              </Link>
              <Link
                href="/blog"
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/blog"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
