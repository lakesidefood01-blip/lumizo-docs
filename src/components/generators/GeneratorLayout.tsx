"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface GeneratorLayoutProps {
  title: string;
  description: string;
  form: React.ReactNode;
  preview: React.ReactNode;
}

export function GeneratorLayout({
  title,
  description,
  form,
  preview,
}: GeneratorLayoutProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>

      {isDesktop ? (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">{form}</div>
          <div className="sticky top-24 h-fit">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-semibold">Preview</h3>
              {preview}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div>{form}</div>
          <div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-semibold">Preview</h3>
              {preview}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
