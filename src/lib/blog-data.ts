export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-create-professional-invoice",
    title: "How to Create a Professional Invoice",
    excerpt: "Learn how to create professional invoices that get paid faster.",
    content: `
      <p>A professional invoice is essential for any business. It not only looks credible but also helps ensure timely payments from your clients.</p>
      <h2>Key Elements of a Professional Invoice</h2>
      <ul>
        <li>Clear company branding and contact information</li>
        <li>Unique invoice number for tracking</li>
        <li>Detailed line items with descriptions</li>
        <li>Clear payment terms and due date</li>
      </ul>
      <h2>Best Practices</h2>
      <p>Always send invoices promptly after completing work. Include all relevant details and make it easy for clients to pay you.</p>
    `,
    category: "Invoice Guides",
    date: "2024-01-15",
  },
  {
    slug: "quotation-vs-proposal",
    title: "Quotation vs Proposal: What's the Difference?",
    excerpt: "Understanding the key differences between quotations and proposals.",
    content: `
      <p>Many businesses confuse quotations and proposals, but they serve different purposes.</p>
      <h2>Quotation</h2>
      <p>A quotation provides a fixed price for specific goods or services. It's typically shorter and more straightforward.</p>
      <h2>Proposal</h2>
      <p>A proposal is more comprehensive, outlining how you'll solve a problem or meet a need, often with multiple pricing options.</p>
    `,
    category: "Quotation Guides",
    date: "2024-01-10",
  },
  {
    slug: "receipt-best-practices",
    title: "Receipt Best Practices for Small Businesses",
    excerpt: "Essential tips for managing receipts and maintaining accurate records.",
    content: `
      <p>Proper receipt management is crucial for bookkeeping and tax purposes.</p>
      <h2>What to Include</h2>
      <ul>
        <li>Transaction date and receipt number</li>
        <li>Amount received and payment method</li>
        <li>Purpose of payment</li>
        <li>Authorized signature</li>
      </ul>
    `,
    category: "Receipt Guides",
    date: "2024-01-05",
  },
  {
    slug: "delivery-order-essentials",
    title: "Essentials of a Good Delivery Order",
    excerpt: "What makes an effective delivery order for your logistics.",
    content: `
      <p>A well-structured delivery order ensures smooth logistics operations.</p>
      <h2>Must-Have Information</h2>
      <ul>
        <li>Sender and receiver details</li>
        <li>Complete delivery address</li>
        <li>Itemized list of goods</li>
        <li>Courier and vehicle information</li>
      </ul>
    `,
    category: "Delivery Order Guides",
    date: "2024-01-01",
  },
  {
    slug: "small-business-documentation",
    title: "Essential Documents Every Small Business Needs",
    excerpt: "A complete guide to business documentation for startups.",
    content: `
      <p>Proper documentation is the backbone of any successful business.</p>
      <h2>Essential Documents</h2>
      <ul>
        <li>Invoices for billing clients</li>
        <li>Quotations for new business</li>
        <li>Receipts for payment records</li>
        <li>Delivery orders for shipping</li>
        <li>Packing lists for inventory</li>
      </ul>
    `,
    category: "Small Business Tips",
    date: "2023-12-28",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}
