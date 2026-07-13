# Lumizo Docs

Create a modern web application called **Lumizo Docs** inspired by the simplicity, speed, and usability of iLovePDF and SmallPDF.

## Project Overview

Lumizo Docs is a collection of free business document generators that help users create professional business documents instantly and download them as PDF files.

The application should focus on:

* Simplicity
* Speed
* Mobile-first design
* SEO optimization
* Google AdSense monetization
* Professional business document templates
* Fully client-side architecture

Users should be able to:

1. Open a generator page
2. Fill out the form
3. Preview the document in real-time
4. Generate PDF
5. Download or print immediately

No login required.

No account required.

No subscription required.

No backend required.

Everything should work directly in the browser.

---

# Tech Stack

Use:

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide React Icons
* React Hook Form
* Zod Validation
* PDF-lib (preferred) or jsPDF
* next-themes

Do NOT use:

* Supabase
* Firebase
* Authentication
* User Accounts
* Dashboard
* SaaS Features
* Backend Database

The application should be deployable directly to Vercel.

---

# Main Generators

Create the following generators:

1. Invoice Generator
2. Quotation Generator
3. Receipt (Kwitansi) Generator
4. Delivery Order (Surat Jalan) Generator
5. Packing List Generator

Each generator should have its own route and SEO landing page.

---

# Homepage

Design inspiration:

* iLovePDF
* SmallPDF
* Canva Tools

Hero Section

Title:

Lumizo Docs

Subtitle:

Create professional invoices, quotations, receipts, delivery orders, and packing lists in seconds.

Primary CTA:

Start Creating Documents

Secondary CTA:

Browse Tools

---

# Tool Grid

Display five main tool cards.

Each card should contain:

* Lucide Icon
* Tool Name
* Short Description
* Open Tool Button

Tools:

* Invoice Generator
* Quotation Generator
* Receipt Generator
* Delivery Order Generator
* Packing List Generator

---

# Global Layout

Create:

* Header
* Footer
* Responsive Navigation
* Tool Grid
* FAQ Section
* SEO Content Section
* Related Tools Section

Fully responsive:

* Mobile
* Tablet
* Desktop

---

# Company Profile

Create a reusable Company Profile page.

Route:

/company-profile

Store all data using Local Storage.

Fields:

* Company Name
* Company Logo Upload
* Address
* Phone Number
* Email
* Website
* Tax ID (NPWP/NIB)
* Signatory Name
* Signatory Position
* Signature Upload

Features:

* Save Profile
* Update Profile
* Delete Profile
* Export Profile JSON
* Import Profile JSON
* Auto-fill Across All Generators

The company profile should automatically populate document generators.

---

# Invoice Generator

Route:

/invoice-generator

Invoice Information:

* Invoice Number
* Invoice Date
* Due Date

Customer Information:

* Customer Name
* Company Name
* Address
* Phone Number
* Email

Items:

* Item Name
* Description
* Quantity
* Unit Price

Automatically Calculate:

* Line Total
* Subtotal
* Discount Percentage
* Discount Amount
* Tax Percentage
* Tax Amount
* Grand Total

Additional:

* Notes

Actions:

* Add Item
* Remove Item
* Live Preview
* Generate PDF
* Download PDF
* Print
* Reset Form

Output:

Professional A4 Invoice PDF

---

# Quotation Generator

Route:

/quotation-generator

Quotation Information:

* Quotation Number
* Date
* Valid Until

Customer Information:

* Customer Name
* Company Name
* Address
* Phone Number
* Email

Items:

* Product / Service Name
* Description
* Quantity
* Unit Price

Automatically Calculate:

* Line Total
* Subtotal
* Discount
* Tax
* Grand Total

Additional:

* Scope of Work
* Terms and Conditions
* Notes

Actions:

* Add Item
* Remove Item
* Live Preview
* Generate PDF
* Download PDF
* Print

Output:

Professional A4 Quotation PDF

---

# Receipt Generator

Route:

/receipt-generator

Fields:

* Receipt Number
* Date
* Received From
* Amount
* Payment Method
* Payment Purpose
* Notes

Automatically Generate:

* Amount In Words

Actions:

* Live Preview
* Generate PDF
* Download PDF
* Print

Output:

Professional A4 Receipt PDF

---

# Delivery Order Generator

Route:

/surat-jalan-generator

Fields:

* Delivery Number
* Date
* Sender
* Receiver
* Delivery Address
* Courier
* Vehicle Information

Items:

* Product Name
* Quantity

Additional:

* Notes

Actions:

* Add Item
* Remove Item
* Live Preview
* Generate PDF
* Download PDF
* Print

Output:

Professional A4 Delivery Order PDF

---

# Packing List Generator

Route:

/packing-list-generator

Fields:

* Packing List Number
* Date
* Shipper
* Consignee
* Related Invoice Number

Items:

* Product Name
* Quantity
* Weight
* Dimensions

Automatically Calculate:

* Total Quantity
* Total Weight

Additional:

* Notes

Actions:

* Add Item
* Remove Item
* Live Preview
* Generate PDF
* Download PDF
* Print

Output:

Professional A4 Packing List PDF

---

# PDF Templates

Provide 3 professional templates for all document types:

1. Modern
2. Professional
3. Minimal

Features:

* Company Branding
* Logo
* Signature
* Clean Layout
* Print Optimized

Save selected template using Local Storage.

---

# Live Preview System

Every generator should include real-time document preview.

Desktop Layout:

* Left Side: Form
* Right Side: Live Preview

Mobile Layout:

* Form First
* Preview Below

Preview updates instantly as users type.

---

# Local Storage

Persist:

* Company Profile
* Selected PDF Template
* Theme Preference
* Last Used Form Data

Auto-load data when users revisit the site.

---

# SEO Requirements

Create optimized pages:

* /invoice-generator
* /quotation-generator
* /receipt-generator
* /surat-jalan-generator
* /packing-list-generator

Each page should include:

* Tool Interface
* Introduction
* Benefits
* How To Use
* FAQ
* Related Tools

Implement:

* Dynamic Metadata
* Open Graph
* Twitter Cards
* JSON-LD Structured Data
* XML Sitemap
* Robots.txt
* Canonical URLs

---

# Blog Section

Create:

/blog

and

/blog/[slug]

Blog categories:

* Invoice Guides
* Quotation Guides
* Receipt Guides
* Delivery Order Guides
* Packing List Guides
* Small Business Tips

Provide reusable blog page templates.

---

# AdSense Preparation

Create reusable ad components:

* AdPlaceholderHorizontal
* AdPlaceholderVertical
* AdPlaceholderInline

Homepage Placement:

* Below Hero
* Above Tool Grid
* Below Tool Grid

Generator Pages:

* Below Generator Form
* Before FAQ
* After Related Tools

Blog Pages:

* After Introduction
* Mid Article
* End of Article

Do not include real AdSense code.

Create placeholder components ready for future integration.

---

# Design Requirements

Style:

* Clean
* Minimal
* Fast
* Professional
* Modern

Inspired by:

* iLovePDF
* SmallPDF
* Canva Tools

Requirements:

* Responsive Design
* Smooth Animations
* Accessible Components
* Consistent Spacing
* Lucide Icons

Support:

* Light Mode
* Dark Mode

---

# Architecture

Use a scalable feature-based structure.

Separate:

* Components
* Features
* PDF Templates
* Hooks
* Utilities
* Types
* SEO
* Layouts

Create reusable form components that can be shared across generators.

---

# Deliverables

Generate a complete production-ready Next.js application including:

* Full folder structure
* Responsive layouts
* Reusable components
* 5 document generators
* Company Profile system using Local Storage
* Real-time document preview
* PDF generation system
* 3 PDF templates
* Blog structure
* SEO optimization
* AdSense-ready placeholders
* Light and Dark mode support

The final application should be ready for deployment on Vercel without requiring any backend services.
