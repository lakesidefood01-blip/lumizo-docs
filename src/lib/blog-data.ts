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
    slug: "cara-membuat-invoice-profesional",
    title: "Cara Membuat Invoice yang Profesional",
    excerpt: "Panduan lengkap membuat invoice profesional agar proses penagihan lebih efektif dan pembayaran diterima tepat waktu.",
    content: `
      <p>Invoice merupakan dokumen penting dalam setiap transaksi bisnis. Dokumen ini berfungsi sebagai bukti tertulis atas barang atau jasa yang telah diberikan, sekaligus menjadi alat penagihan resmi kepada klien. Invoice yang profesional tidak hanya meningkatkan kredibilitas bisnis, tetapi juga mempercepat proses pembayaran.</p>

      <p>Ingin membuat invoice secara instan? Gunakan <a href="/invoice-generator" class="text-primary underline hover:text-primary/80">Invoice Generator</a> dari Lumizo Docs.</p>

      <h2>Elemen Wajib dalam Invoice</h2>

      <p>Sebuah invoice yang lengkap dan profesional harus memuat beberapa elemen berikut:</p>

      <h3>1. Identitas Perusahaan</h3>
      <p>Cantumkan nama lengkap perusahaan, alamat, nomor telepon, email, serta logo resmi. Elemen ini memberikan kesan profesional dan memudahkan klien mengidentifikasi pengirim invoice.</p>

      <h3>2. Nomor Invoice</h3>
      <p>Setiap invoice harus memiliki nomor unik yang berurutan. Sistem penomoran yang konsisten memudahkan pencatatan dan pelacakan transaksi di kemudian hari.</p>

      <h3>3. Rincian Barang atau Jasa</h3>
      <p>Daftar item harus tertulis dengan jelas dan terperinci. Sertakan nama barang atau jasa, jumlah, satuan, dan harga per item. Rincian yang detail mencegah terjadinya kesalahpahaman antara pihak penjual dan pembeli.</p>

      <h3>4. Tanggal dan Jatuh Tempo</h3>
      <p>Tulis tanggal pembuatan invoice serta tanggal jatuh tempo pembayaran. Tanpa batas waktu yang jelas, klien cenderung menunda pembayaran.</p>

      <h3>5. Metode Pembayaran</h3>
      <p>Sertakan informasi lengkap mengenai cara pembayaran, seperti nomor rekening bank, nama bank, atau metode pembayaran digital lainnya.</p>

      <h2>Kesalahan Umum yang Perlu Dihindari</h2>

      <p>Banyak pelaku bisnis yang mengirimkan invoice tanpa rincian yang memadai. Sebagai contoh, invoice yang hanya tertulis "Jasa Desain: Rp 5.000.000" tanpa penjelasan lebih lanjut akan menimbulkan pertanyaan dari klien mengenai komponen biaya tersebut.</p>

      <p>Untuk menghindari hal ini, rincikan setiap item secara terpisah. Contohnya: Desain Logo sebesar Rp 2.000.000, Desain Kartu Nama sebesar Rp 500.000, dan seterusnya. Semakin detail rincian yang diberikan, semakin cepat proses verifikasi dan pembayaran dapat dilakukan.</p>

      <h2>Waktu Pengiriman Invoice</h2>

      <p>Kirimkan invoice segera setelah pekerjaan selesai atau barang dikirim. Penundaan pengiriman invoice berpotensi mengurangi urgensi pembayaran di sisi klien.</p>

      <p>Dengan memanfaatkan <a href="/invoice-generator" class="text-primary underline hover:text-primary/80">Lumizo Docs Invoice Generator</a>, Anda dapat membuat invoice profesional dalam waktu singkat. Cukup isi data yang diperlukan, dan dokumen akan dihasilkan dalam format PDF yang rapi dan siap dikirim.</p>
    `,
    category: "Invoice Guides",
    date: "2024-01-15",
  },
  {
    slug: "perbedaan-quotation-dan-proposal",
    title: "Perbedaan Quotation dan Proposal dalam Bisnis",
    excerpt: "Mengenal perbedaan mendasar antara quotation dan proposal, serta kapan masing-masing dokumen tersebut sebaiknya digunakan.",
    content: `
      <p>Dalam dunia bisnis, quotation dan proposal merupakan dua dokumen yang sering digunakan dalam transaksi dengan klien. Meskipun keduanya berkaitan dengan penawaran harga, terdapat perbedaan mendasar dalam fungsi dan penggunaannya.</p>

      <p>Butuh membuat quotation? Gunakan <a href="/quotation-generator" class="text-primary underline hover:text-primary/80">Quotation Generator</a> dari Lumizo Docs untuk membuat penawaran harga yang profesional.</p>

      <h2>Definisi Quotation</h2>

      <p>Quotation atau penawaran harga adalah dokumen yang memuat informasi mengenai harga tertentu untuk produk atau layanan yang ditawarkan. Dokumen ini bersifat ringkas dan langsung pada intinya.</p>

      <h3>Karakteristik Quotation</h3>
      <ul>
        <li>Berisi harga pasti untuk produk atau layanan tertentu</li>
        <li>Format singkat dan tidak memerlukan penjelasan panjang</li>
        <li>Cocok untuk transaksi dengan ruang lingkup yang sudah jelas</li>
        <li>Masa berlaku biasanya terbatas</li>
      </ul>

      <h2>Definisi Proposal</h2>

      <p>Proposal adalah dokumen yang lebih komprehensif dan berisi strategi, pendekatan, serta rencana kerja untuk memenuhi kebutuhan klien. Proposal tidak hanya memuat harga, tetapi juga penjelasan mengenai cara kerja, timeline, dan nilai tambah yang ditawarkan.</p>

      <h3>Karakteristik Proposal</h3>
      <ul>
        <li>Berisi analisis kebutuhan dan solusi yang ditawarkan</li>
        <li>Memuat rencana kerja dan timeline pelaksanaan</li>
        <li>Menyertakan portofolio atau referensi pekerjaan sebelumnya</li>
        <li>Bisa memuat beberapa opsi harga dengan paket berbeda</li>
      </ul>

      <h2>Kapan Menggunakan Masing-Masing Dokumen</h2>

      <p>Pemilihan antara quotation dan proposal bergantung pada kompleksitas proyek dan kebutuhan klien. Berikut panduan umum penggunaannya:</p>

      <h3>Gunakan Quotation Ketika</h3>
      <ul>
        <li>Klien sudah mengetahui dengan jelas produk atau jasa yang dibutuhkan</li>
        <li>Ruang lingkup pekerjaan sederhana dan terukur</li>
        <li>Klien hanya memerlukan informasi harga</li>
      </ul>

      <h3>Gunakan Proposal Ketika</h3>
      <ul>
        <li>Proyek bersifat kompleks dan memerlukan strategi khusus</li>
        <li>Diperlukan penjelasan mengenai pendekatan dan metodologi kerja</li>
        <li>Ada beberapa opsi harga yang perlu dijelaskan</li>
      </ul>

      <p>Lumizo Docs menyediakan template profesional untuk kedua jenis dokumen ini. Anda dapat membuat <a href="/quotation-generator" class="text-primary underline hover:text-primary/80">quotation</a> yang ringkas maupun proposal yang detail sesuai kebutuhan bisnis.</p>
    `,
    category: "Quotation Guides",
    date: "2024-01-10",
  },
  {
    slug: "pengelolaan-resi-dalam-pembukuan",
    title: "Pengelolaan Resi dalam Pembukuan Usaha",
    excerpt: "Panduan praktis pengelolaan resi dan bukti transaksi untuk menjaga ketertiban pembukuan bisnis.",
    content: `
      <p>Resi atau kwitansi merupakan bukti tertulis bahwa sebuah transaksi telah terjadi. Dokumen ini memiliki peran krusial dalam pembukuan dan pelaporan keuangan, terutama bagi pelaku usaha kecil dan menengah.</p>

      <p>Untuk membuat resi yang profesional, gunakan <a href="/receipt-generator" class="text-primary underline hover:text-primary/80">Receipt Generator</a> dari Lumizo Docs.</p>

      <h2>Pentingnya Pengelolaan Resi</h2>

      <p>Banyak pelaku usaha yang menganggap remeh pengelolaan resi. Akibatnya, ketika diperlukan bukti transaksi untuk keperluan audit atau pelaporan pajak, dokumen tersebut tidak dapat ditemukan. Kondisi ini dapat menimbulkan masalah serius bagi kelangsungan bisnis.</p>

      <h2>Informasi yang Harus Ada pada Resi</h2>

      <h3>1. Tanggal Transaksi</h3>
      <p>Tanggal merupakan elemen fundamental yang tidak boleh terlewat. Tanpa tanggal yang jelas, resi kehilangan fungsinya sebagai bukti kronologis transaksi.</p>

      <h3>2. Nomor Resi</h3>
      <p>Setiap resi sebaiknya memiliki nomor urut yang unik. Nomor ini berguna untuk pencarian data dan referensi di masa mendatang.</p>

      <h3>3. Jumlah Nominal</h3>
      <p>Tuliskan jumlah uang yang diterima secara pasti. Hindari penulisan perkiraan atau angka bulat yang tidak sesuai dengan transaksi aktual.</p>

      <h3>4. Metode Pembayaran</h3>
      <p>Cantumkan metode pembayaran yang digunakan, apakah secara tunai, transfer bank, kartu kredit, atau metode lainnya.</p>

      <h3>5. Deskripsi Transaksi</h3>
      <p>Berikan deskripsi singkat mengenai keperluan pembayaran. Contoh: "Pembayaran Jasa Desain Logo Bulan Januari 2024" lebih informatif dibandingkan sekadar "Jasa Desain".</p>

      <h2>Cara Menyimpan Resi dengan Baik</h2>

      <p>Saat ini, menyimpan resi tidak harus dalam bentuk fisik semata. Lakukan scanning atau fotografi terhadap setiap resi yang diterima, kemudian simpan dalam sistem penyimpanan digital yang terorganisir. Buatlah folder khusus berdasarkan bulan atau jenis transaksi untuk memudahkan pencarian.</p>

      <p>Gunakan template resi yang konsisten untuk setiap transaksi. Template yang seragam tidak hanya memberikan kesan profesional, tetapi juga memudahkan proses pencatatan dan verifikasi. <a href="/receipt-generator" class="text-primary underline hover:text-primary/80">Lumizo Docs Receipt Generator</a> menyediakan template resi yang dapat disesuaikan dengan kebutuhan bisnis Anda.</p>
    `,
    category: "Receipt Guides",
    date: "2024-01-05",
  },
  {
    slug: "pentingnya-surat-jalan-dalam-logistik",
    title: "Pentingnya Surat Jalan dalam Operasional Logistik",
    excerpt: "Mengenal fungsi dan manfaat surat jalan sebagai dokumen pendukung dalam pengiriman barang.",
    content: `
      <p>Surat jalan merupakan dokumen resmi yang menyertai pengiriman barang dari satu lokasi ke lokasi lain. Dokumen ini berfungsi sebagai bukti bahwa pengiriman telah dilakukan secara sah dan tercatat.</p>

      <p>Buat surat jalan yang profesional dengan <a href="/surat-jalan-generator" class="text-primary underline hover:text-primary/80">Surat Jalan Generator</a> dari Lumizo Docs.</p>

      <h2>Fungsi Surat Jalan</h2>

      <p>Dalam operasional bisnis, surat jalan memiliki beberapa fungsi penting:</p>

      <ul>
        <li>Sebagai bukti pengiriman barang kepada pihak penerima</li>
        <li>Sebagai alat kontrol dan monitoring perjalanan barang</li>
        <li>Sebagai dasar klaim asuransi jika terjadi kerusakan atau kehilangan</li>
        <li>Sebagai dokumen pendukung dalam proses audit logistik</li>
      </ul>

      <h2>Isi Surat Jalan yang Lengkap</h2>

      <h3>1. Data Pengirim</h3>
      <p>Cantumkan nama lengkap pengirim, alamat, dan nomor kontak yang dapat dihubungi.</p>

      <h3>2. Data Penerima</h3>
      <p>Sertakan nama lengkap penerima, alamat tujuan yang jelas, serta nomor kontak yang valid.</p>

      <h3>3. Rincian Barang</h3>
      <p>Daftar barang harus tertulis secara detail, meliputi nama barang, jumlah, satuan, dan keterangan tambahan jika diperlukan.</p>

      <h3>4. Informasi Waktu</h3>
      <p>Tulis tanggal dan waktu pengiriman, serta estimasi waktu tiba di lokasi tujuan.</p>

      <h3>5. Data Kendaraan dan Kurir</h3>
      <p>Sertakan informasi mengenai kendaraan yang digunakan, termasuk nomor polisi, serta identitas kurir atau supir yang bertanggung jawab.</p>

      <h2>Manfaat Penggunaan Surat Jalan</h2>

      <p>Penggunaan surat jalan yang konsisten membantu bisnis dalam beberapa aspek, antara lain peningkatan akuntabilitas pengiriman, kemudahan penyelesaian sengketa, dan efisiensi dalam pengelolaan inventaris.</p>

      <p><a href="/surat-jalan-generator" class="text-primary underline hover:text-primary/80">Lumizo Docs Surat Jalan Generator</a> menyediakan template surat jalan yang profesional dan mudah digunakan. Anda dapat membuat dokumen ini langsung dari browser tanpa perlu perangkat lunak tambahan.</p>
    `,
    category: "Delivery Order Guides",
    date: "2024-01-01",
  },
  {
    slug: "dokumen-wajib-usaha-kecil",
    title: "Dokumen Bisnis Wajib bagi Usaha Kecil dan Menengah",
    excerpt: "Daftar lengkap dokumen bisnis yang harus disiapkan oleh pelaku usaha kecil dan menengah untuk operasional yang terorganisir.",
    content: `
      <p>Setiap usaha, baik yang baru berdiri maupun yang sudah berjalan, memerlukan sistem dokumentasi yang baik. Dokumen bisnis yang tertata dengan rapi menjadi fondasi penting bagi kelangsungan dan perkembangan usaha.</p>

      <h2>Jenis Dokumen Bisnis yang Perlu Disiapkan</h2>

      <h3>1. Invoice (Faktur)</h3>
      <p>Invoice adalah dokumen penagihan yang dikirimkan kepada klien setelah barang atau jasa diberikan. Dokumen ini memuat rincian harga, jumlah, dan termin pembayaran. Invoice yang profesional membantu mempercepat proses penerimaan pembayaran.</p>
      <p>Gunakan <a href="/invoice-generator" class="text-primary underline hover:text-primary/80">Invoice Generator</a> untuk membuat invoice profesional dalam hitungan detik.</p>

      <h3>2. Quotation (Penawaran Harga)</h3>
      <p>Quotation digunakan untuk memberikan informasi harga kepada calon klien sebelum transaksi terjadi. Dokumen ini bersifat mengikat dalam periode waktu tertentu dan menjadi dasar kesepakatan bisnis.</p>
      <p>Buat quotation yang menarik dengan <a href="/quotation-generator" class="text-primary underline hover:text-primary/80">Quotation Generator</a> dari Lumizo Docs.</p>

      <h3>3. Receipt (Kwitansi)</h3>
      <p>Kwitansi merupakan bukti bahwa pembayaran telah diterima. Dokumen ini penting untuk pencatatan keuangan dan menjadi bukti sah dalam transaksi bisnis.</p>
      <p>Sediakan bukti pembayaran yang resmi dengan <a href="/receipt-generator" class="text-primary underline hover:text-primary/80">Receipt Generator</a>.</p>

      <h3>4. Surat Jalan (Delivery Order)</h3>
      <p>Surat jalan menyertai pengiriman barang dari gudang ke lokasi penerima. Dokumen ini memuat rincian barang yang dikirim serta informasi pengiriman lainnya.</p>
      <p>Siapkan surat jalan yang lengkap menggunakan <a href="/surat-jalan-generator" class="text-primary underline hover:text-primary/80">Surat Jalan Generator</a>.</p>

      <h3>5. Packing List</h3>
      <p>Packing list adalah daftar lengkap isi pengiriman. Dokumen ini membantu proses penerimaan barang dan menjadi rujukan jika terjadi selisih jumlah atau jenis barang.</p>
      <p>Buat packing list yang terperinci dengan <a href="/packing-list-generator" class="text-primary underline hover:text-primary/80">Packing List Generator</a>.</p>

      <h3>6. Company Profile</h3>
      <p>Profil perusahaan yang memuat informasi mengenai visi, misi, layanan, dan pencapaian bisnis. Dokumen ini digunakan untuk keperluan pemasaran dan kerja sama dengan mitra bisnis.</p>
      <p>Presentasikan perusahaan Anda dengan <a href="/company-profile" class="text-primary underline hover:text-primary/80">Company Profile Generator</a>.</p>

      <h2>Langkah Awal Implementasi</h2>

      <p>Pelaku usaha tidak perlu menyiapkan seluruh dokumen sekaligus. Mulailah dari dokumen yang paling sering digunakan, yaitu invoice dan quotation. Setelah itu, kembangkan sistem dokumentasi sesuai dengan pertumbuhan bisnis.</p>

      <p>Lumizo Docs menyediakan solusi lengkap untuk pembuatan berbagai dokumen bisnis. Dengan antarmuka yang intuitif, Anda dapat membuat dokumen profesional secara instan tanpa memerlukan keahlian desain khusus.</p>
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
