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
    slug: "ayam-bakar-sehat-atau-tidak",
    title: "Ayam Bakar: Pilihan Sehat atau Sekedar Selera?",
    excerpt: "Membahas soal ayam bakar yang jadi favorit banyak orang Indonesia, mulai dari asal-usulnya sampai apakah benar-benar lebih sehat dari ayam goreng.",
    content: `
      <p>Jujur saja, hampir mustahil menemukan orang Indonesia yang nggak suka ayam bakar. Dari warteg pinggir jalan sampai restoran padat pengunjung, menu ini selalu jadi andalan. Rasanya yang gurih dengan aroma khas dari proses pembakaran memang susah ditolak.</p>

      <p>Ayam bakar sendiri punya banyak variasi di tiap daerah. Di Jawa Timur, ada ayam bakar Sidoarjo yang terkenal bumbunya meresap. Di Sumatera, ayam bakar Minang punya citarasa rempah yang kuat. Belum lagi ayam bakar madu yang belakangan naik daun karena manis legitnya yang bikin nagih.</p>

      <h2>Lalu, Lebih Sehat dari Ayam Goreng?</h2>

      <p>Pertanyaan ini sering banget muncul. Jawabannya: <strong>ya, lebih sehat</strong> — tapi ada catatannya.</p>

      <p>Kalau ayam digoreng, kulit dan dagingnya langsung kontak sama minyak panas. Minyak goreng itu tinggi lemak jenuh, apalagi kalau sudah dipakai berulang kali. Konsumsi lemak jenuh berlebihan bisa bikin berat badan naik dan meningkatkan risiko penyakit jantung.</p>

      <p>Sedangkan ayam bakar? Proses pembakarannya nggak pakai minyak sama sekali. Lemak alami dari kulit ayam justru keluar sendiri saat terpapar api. Jadi secara teknis, jumlah lemak yang masuk ke tubuh jauh lebih sedikit.</p>

      <p><strong>Namun</strong>, ini yang sering dilupakan: bumbu. Ayam bakar yang diolesi bumbu kental berwarna kecoklatan — apalagi yang manis berat — bisa jadi mengandung gula dan sodium cukup tinggi. Jadi bukan berarti ayam bakar otomatis sehat ya. Semua tergantung bumbu dan cara bikinnya.</p>

      <h2>Variasi Ayam Bakar yang Wajib Dicoba</h2>

      <h3>Ayam Taliwang</h3>
      <p>Ini khas Lombok, dan jujur aja, level pedasnya bukan main. Bumbunya terdiri dari bawang merah, bawang putih, cabai rawit, cabai keriting, terasi Lombok, kencur, dan garam. Semua diulek jadi satu, lalu dioles ke ayam sebelum dibakar. Hasilnya? Pedas, gurih, dan bikin keringet keluar. Biasanya disajikan bareng plencing kangkung dan taburan bawang goreng. Mantap banget buat yang suka tantangan.</p>

      <h3>Ayam Bakakak</h3>
      <p>Beda dari taliwang yang super pedas, ayam bakakak justru punya kombinasi rasa manis, gurih, dan sedikit pedas. Rahasia kelezatannya ada di santan. Ayam diungkep dulu dengan santan berbumbu sebelum dibakar, jadi dagingnya empuk dan bumbunya meresap sampai ke dalam. Menu ini asalnya dari Sunda dan selalu jadi primadona di acara keluarga atau hajatan.</p>

      <h2>Tips Bikin Ayam Bakar yang Lebih Sehat di Rumah</h2>

      <ul>
        <li><strong>Pakai bumbu alami</strong> — kurangi gula pasir, manfaatkan kecap manis secukupnya saja</li>
        <li><strong>Jangan oles berulang</strong> — cukup sekali saat bakar supaya bumbu nggak menumpuk</li>
        <li><strong>Bakar dengan api sedang</strong> — biar matang merata tanpa gosong</li>
        <li><strong>Skim kulit kalau perlu</strong> — kalau mau lebih rendah lemak, buang kulit sebelum makan</li>
      </ul>

      <p>Jadi intinya, ayam bakar itu pilihan yang lebih baik dari goreng. Tapi tetap perhatikan bumbu dan porsinya. Nikmati dengan nasi hangat dan lalapan, deh — simpel tapi memuaskan.</p>
    `,
    category: "Tips Kuliner",
    date: "2024-01-20",
  },
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
