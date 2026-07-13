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
    title: "Cara Bikin Invoice yang Profesional supaya Cepat Dibayar",
    excerpt: "Panduan praktis bikin invoice yang rapi dan profesional, biar klien cepat transfer.",
    content: `
      <p>Ceritanya gini: kamu sudah kerja keras menyelesaikan proyek untuk klien. Tapi begitu kirim invoice,Response-nya cuma "nanti ya" atau bahkan hilang tanpa kabar. Frustrating banget, kan?</p>

      <p>Yang sering luput diperhatikan: invoice itu bukan sekadar nominal yang harus dibayar. Invoice yang profesional bikin klien merasa yakin dan lebih tertarik untuk segera bayar. Jadi ini soal kesan pertama juga.</p>

      <h2>Elemen Wajib yang Harus Ada di Invoice</h2>

      <ul>
        <li><strong>Data perusahaan kamu</strong> — nama, alamat, nomor telepon, email. Ini bikin kamu keliatan legitimate.</li>
        <li><strong>Nomor invoice unik</strong> — penting banget buat tracking. Jangan pakai nomor yang sama untuk dua transaksi berbeda.</li>
        <li><strong>Daftar item yang jelas</strong> — apa saja yang sudah dikerjakan, berapa harganya. Kalau bisa, detailkan per item biar nggak ada yang bingung.</li>
        <li><strong>Tanggal jatuh tempo</strong> — kasih tahu kapan harus bayar. Tanpa ini, klien sering kali menunda-nunda.</li>
        <li><strong>Cara bayar</strong> — nomor rekening, metode pembayaran, atau link payment kalau ada.</li>
      </ul>

      <h2>Kesalahan yang Sering Terjadi</h2>

      <p>Saya pernah lihat invoice yang isinya cuma "Jasa desain: Rp 5.000.000". Nggak ada rincian, nggak ada deskripsi. Klien langsung tanya: "Desain apa aja? Kenapa bisa segitu?" Ujung-ujungnya telat bayar karena harus klarifikasi dulu.</p>

      <p>Jadi, <strong>selalu rinciakan</strong>. Misalnya: "Desain logo - Rp 2.000.000", "Desain kartu nama - Rp 500.000", dst. Semakin jelas, semakin cepat dibayar.</p>

      <h2>Timing juga Penting</h2>

      <p>Kirim invoice segera setelah pekerjaan selesai. Jangan tunggu seminggu atau dua minggu. Semakin lama kamu tunda, semakin kecil kemungkinan klien ingat dan bayar tepat waktu.</p>

      <p>Dengan Lumizo Docs, kamu bisa generate invoice profesional dalam hitungan detik. Tinggal isi datanya, langsung jadi PDF yang rapi dan siap kirim.</p>
    `,
    category: "Invoice Guides",
    date: "2024-01-15",
  },
  {
    slug: "quotation-vs-proposal",
    title: "Quotation vs Proposal: mana yang Perlu Dikirim?",
    excerpt: "Bingung bedanya quotation sama proposal? Ini penjelasan simpelnya biar nggak salah kirim.",
    content: `
      <p>Pernah nggak sih, kamu diminta "kirim quotation" tapi malah bikin proposal? Atau sebaliknya, dikirim proposal padahal cuma butuh harga? Saya sering lihat ini terjadi, terutama di freelancer atau usaha kecil yang baru mulai.</p>

      <p>Sebenernya dua dokumen ini beda, meskipun sama-sama dikirim ke klien.</p>

      <h2>Quotation (Penawaran Harga)</h2>

      <p>Quotation itu singkat dan to the point. Isinya cuma harga untuk produk atau layanan tertentu. Nggak perlu banyak penjelasan — klien cuma perlu tahu: berapa, dan kapan bisa selesai.</p>

      <p>Cocok kalau klien sudah tahu mau apa dan cuma butuh harga. Misalnya, "berapa biaya cetak 1000 brosur?" atau "tarif desain logo berapa?"</p>

      <h2>Proposal</h2>

      <p>Proposal lebih lengkap. Selain harga, biasanya ada penjelasan soal pendekatan, timeline, portofolio, dan kenapa kamu yang paling cocok untuk proyek ini.</p>

      <p>Proposal biasanya dikirim saat proyeknya besar atau butuh strategi. Misalnya, "kami butuh agensi yang bisa handle kampanye digital selama 3 bulan."</p>

      <h2>Jadi, Kapan Pakai yang Mana?</h2>

      <ul>
        <li><strong>Pakai quotation</strong> kalau: harga sudah jelas, scope kerja simpel, klien cuma minta angka.</li>
        <li><strong>Pakai proposal</strong> kalau: proyek kompleks, perlu jelasin cara kerja, atau ada banyak opsi harga.</li>
      </ul>

      <p>Kesalahan paling sering? Freelancer kirim proposal panjang-lebar padahal klien cuma mau tahu harga. Atau sebaliknya, kirim quotation begitu saja tanpa konteks, padahal proyeknya butuh penjelasan lebih.</p>

      <p>Di Lumizo Docs, kamu bisa buat keduanya — quotation yang ringkas atau proposal yang detail — dalam hitungan menit.</p>
    `,
    category: "Quotation Guides",
    date: "2024-01-10",
  },
  {
    slug: "receipt-best-practices",
    title: "Tips Kelola Resi supaya Keuangan Usaha Rapi",
    excerpt: "Resi kecil tapi penting. Ini cara mengelola resi biar nggak kacau saat audit atau laporan pajak.",
    content: `
      <p>Saya pernah punya klien yang hampir kena masalah pajak cuma gara-gara nggak punya bukti transaksi. Semua resi dibuang, digital record nggak ada. Pas ditanya, bingung sendiri.</p>

      <p>Resi itu kelihatannya sepele, tapi perannya krusial. Ini bukti bahwa transaksi benar-benar terjadi, dan jadi penyelamat saat ada sengketa atau audit.</p>

      <h2>Isi Resi yang Benar</h2>

      <ul>
        <li><strong>Tanggal transaksi</strong> — jangan pernah lupa ini. Tanpa tanggal, resi hampir nggak ada gunanya.</li>
        <li><strong>Nomor resi unik</strong> — untuk tracking dan referensi di masa depan.</li>
        <li><strong>Jumlah yang diterima</strong> — nominal pasti, jangan perkiraan.</li>
        <li><strong>Metode bayar</strong> — cash, transfer, kartu kredit, dll.</li>
        <li><strong>Deskripsi singkat</strong> — untuk apa pembayaran ini. "Pembayaran jasa desain bulan Januari" lebih jelas dari sekadar "jasa".</li>
      </ul>

      <h2>Kesalahan Fatal yang Sering Terjadi</h2>

      <p>Banyak pelaku UMKM yang nyimpen resi asal-asalan — masuk ke laci, dicampur sama bon belanja, atau malah dibuang. Pas butuh, nggak ketemu.</p>

      <p>Solusi yang saya sarankan: <strong>foto semua resi</strong> dan simpan di folder khusus di Google Drive atau Dropbox. Buat folder per bulan biar rapi. Ini jauh lebih aman dari menumpuk kertas.</p>

      <h2>Gunakan Template yang Konsisten</h2>

      <p>Kalau kamu sering terima pembayaran dari klien, pakai template resi yang seragam. Ini bikin kamu terlihat profesional dan memudahkan pembukuan. Lumizo Docs menyediakan template receipt yang siap pakai — tinggal isi, langsung jadi.</p>
    `,
    category: "Receipt Guides",
    date: "2024-01-05",
  },
  {
    slug: "delivery-order-essentials",
    title: "Surat Jalan: Kenapa Dokumen Ini Sering Dianggap Remeh?",
    excerpt: "Banyak yang skip bikin surat jalan padahal ini penyelamat saat ada masalah di perjalanan.",
    content: `
      <p>Pernah dengar cerita barang hilang di perjalanan tapi nggak bisa klaim karena nggak ada surat jalan? Ini sering banget terjadi, terutama di usaha kecil yang pengiriman masih informal.</p>

      <p>Surat jalan itu sebenernya simpel, tapi fungsinya besar. Ini dokumen yang menyertai barang dari gudang sampai ke tujuan, dan jadi bukti bahwa pengiriman benar-benar dilakukan.</p>

      <h2>Isi Surat Jalan yang Lengkap</h2>

      <ul>
        <li><strong>Data pengirim</strong> — nama, alamat, kontak</li>
        <li><strong>Data penerima</strong> — nama, alamat lengkap, kontak yang bisa dihubungi</li>
        <li><strong>Daftar barang</strong> — nama barang, jumlah, satuan. Jangan pernah kirim barang tanpa rincian.</li>
        <li><strong>Tanggal dan waktu kirim</strong> — kapan barang keluar dari gudang.</li>
        <li><strong>Info kurir/kendaraan</strong> — nomor polisi, nama supir, atau nama ekspedisi.</li>
      </ul>

      <h2>Kenapa Ini Penting?</h2>

      <p>Selain untuk klaim asuransi, surat jalan juga jadi alat kontrol. Kamu bisa track kapan barang keluar, siapa yang bawa, dan kapan seharusnya sampai. Kalau ada keterlambatan atau selisih jumlah, dokumen ini jadi rujukan utama.</p>

      <p>Di era digital sekarang, bikin surat jalan nggak harus manual lagi. Lumizo Docs bisa generate surat jalan profesional langsung dari browser kamu — cepat, rapi, dan siap cetak.</p>
    `,
    category: "Delivery Order Guides",
    date: "2024-01-01",
  },
  {
    slug: "small-business-documentation",
    title: "Dokumen yang Wajib Dimiliki Setiap Usaha Kecil",
    excerpt: "Baru mulai usaha? Ini daftar dokumen yang harus kamu siapkan sejak hari pertama.",
    content: `
      <p>Saya sering ketemu pelaku UMKM yang fokus banget sama penjualan, tapi lupa soal dokumen. "Belum perlu lah, masih kecil." Begitu katanya. Tapi begitu ada masalah — klien telat bayar, barang hilang, atau audit pajak — baru panik.</p>

      <p>Dokumen bisnis itu ibarat asuransi. Kamu nggak berharap butuh, tapi saat dibutuhkan, rasanya lega banget sudah siap.</p>

      <h2>Dokumen Wajib untuk Usaha Kecil</h2>

      <ul>
        <li><strong>Invoice</strong> — untuk tagih klien. Tanpa invoice formal, kamu nggak punya bukti tertulis soal tagihan.</li>
        <li><strong>Quotation</strong> — untuk calon klien yang minta penawaran harga. Bikin kamu keliatan profesional.</li>
        <li><strong>Resi / Kwitansi</strong> — bukti bahwa pembayaran sudah diterima. Penting untuk pembukuan dan klaim.</li>
        <li><strong>Surat Jalan</strong> — menyertai pengiriman barang. Jadi bukti dan alat tracking.</li>
        <li><strong>Packing List</strong> — daftar isi kiriman. Berguna saat ada selisih antara yang dikirim dan yang diterima.</li>
        <li><strong>Company Profile</strong> — profil perusahaan yang bisa dikirim ke calon klien atau mitra bisnis.</li>
      </ul>

      <h2>Mulai dari Mana?</h2>

      <p>Nggak perlu bikin semuanya sekaligus. Mulai dari yang paling sering kamu pakai — biasanya invoice dan quotation. Setelah itu, tambah dokumen lain seiring bisnis kamu berkembang.</p>

      <p>Dengan Lumizo Docs, kamu bisa buat semua dokumen ini tanpa ribet. Pilih template, isi datanya, langsung jadi PDF yang profesional. Gratis dan bisa diakses dari mana saja.</p>
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
