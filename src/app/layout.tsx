import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Lumizo Docs - Buat Dokumen Bisnis Profesional Gratis",
    template: "%s | Lumizo Docs",
  },
  description:
    "Buat invoice, quotation, kwitansi, surat jalan, packing list, dan slip gaji profesional dalam hitungan detik. Gratis, tanpa login, langsung download PDF.",
  keywords: [
    "invoice generator",
    "quotation generator",
    "receipt generator",
    "surat jalan",
    "packing list",
    "slip gaji",
    "dokumen bisnis",
    "bikin invoice gratis",
    "faktur online",
    "kwitansi digital",
    "tools bisnis gratis",
    "UMKM tools",
    "freelancer tools",
  ],
  authors: [{ name: "Lumizo Docs" }],
  creator: "Lumizo Docs",
  publisher: "Lumizo Docs",
  metadataBase: new URL("https://lumizo-docs.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://lumizo-docs.vercel.app",
    siteName: "Lumizo Docs",
    title: "Lumizo Docs - Buat Dokumen Bisnis Profesional Gratis",
    description:
      "Buat invoice, quotation, kwitansi, surat jalan, packing list, dan slip gaji profesional dalam hitungan detik. Gratis, tanpa login, langsung download PDF.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lumizo Docs - Dokumen Bisnis Gratis",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumizo Docs - Buat Dokumen Bisnis Profesional Gratis",
    description:
      "Buat invoice, quotation, kwitansi, surat jalan, packing list, dan slip gaji profesional dalam hitungan detik. Gratis, tanpa login, langsung download PDF.",
    images: ["/images/og-image.png"],
    creator: "@lumizodocs",
    site: "@lumizodocs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo-icon.webp",
    apple: "/images/logo-icon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9229758212351921"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
