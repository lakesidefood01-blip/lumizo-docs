export const SITE_NAME = "Lumizo Docs";
export const SITE_DESCRIPTION =
  "Create professional invoices, quotations, receipts, delivery orders, and packing lists in seconds.";
export const SITE_URL = "https://docs.lumizo.my.id";

export const GENERATORS = [
  {
    name: "Invoice Generator",
    slug: "invoice-generator",
    description: "Create professional invoices for your business transactions.",
    icon: "FileText",
  },
  {
    name: "Quotation Generator",
    slug: "quotation-generator",
    description: "Generate detailed quotations for your products and services.",
    icon: "ClipboardList",
  },
  {
    name: "Receipt Generator",
    slug: "receipt-generator",
    description: "Create receipts for payments received from customers.",
    icon: "Receipt",
  },
  {
    name: "Delivery Order Generator",
    slug: "surat-jalan-generator",
    description: "Generate delivery orders for shipping and logistics.",
    icon: "Truck",
  },
  {
    name: "Packing List Generator",
    slug: "packing-list-generator",
    description: "Create packing lists for shipment documentation.",
    icon: "Package",
  },
  {
    name: "Slip Gaji Generator",
    slug: "slip-gaji-generator",
    description: "Create professional payslips for your employees.",
    icon: "Users",
  },
  {
    name: "Offering Letter Generator",
    slug: "offering-letter-generator",
    description: "Create professional job offering letters for candidates.",
    icon: "FileCheck",
  },
] as const;

export const BLOG_CATEGORIES = [
  "Invoice Guides",
  "Quotation Guides",
  "Receipt Guides",
  "Delivery Order Guides",
  "Packing List Guides",
  "Small Business Tips",
  "Legal Documents",
  "HR Documents",
] as const;
