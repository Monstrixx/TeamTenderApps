/**
 * TeamTender AI Blog Schema Blueprint
 * 
 * Skema ini dirancang sebagai struktur referensi untuk database/CMS masa depan (seperti Sanity/Strapi)
 * yang akan diinjeksi oleh agen AI pembuat konten secara otomatis.
 * 
 * Skema ini menjamin format data terstruktur dan ramah SEO untuk industri jasa konstruksi.
 */

export const ArticleSchemaTemplate = {
  // Metadata Dasar
  id: "uuid-v4",
  slug: "peluang-emas-50-tender-jalan-jabar-bulan-ini", // Dibuat oleh AI berdasarkan judul
  title: "Peluang Emas: 50 Tender Konstruksi Jalan di Jawa Barat Bulan Ini",
  excerpt: "Analisa lengkap 50 peluang tender jalan di Jawa Barat dengan proyeksi AHSP 2025 dan tips kualifikasi untuk kontraktor lokal.",
  author: "TeamTender AI Analyst", // Bisa diganti dengan nama penulis asli
  publishedAt: "2026-07-20T08:00:00Z",
  status: "published", // draft, published, archived

  // Taksonomi Konstruksi Khusus
  categories: ["Peluang Tender", "Analisis AHSP"],
  tags: ["Jalan Raya", "Jawa Barat", "PUPR", "LPSE"],

  // Konten Utama
  contentMarkdown: `
# Peluang Emas Tender Konstruksi Jalan

Bulan ini, LPSE Jawa Barat merilis lebih dari 50 paket pekerjaan rekonstruksi dan pemeliharaan jalan...
*(Di sini AI akan men-generate analisa berdasarkan data scraping LPSE dan hitungan AHSP)*
  `,

  // Aset Media
  featuredImage: {
    url: "https://teamtender.id/images/blog/tender-jalan-jabar.jpg",
    altText: "Ilustrasi proyek jalan raya Jawa Barat",
    caption: "Sumber Data: LPSE Jawa Barat"
  },

  // SEO & Meta Tags Khusus (Diinjeksi ke komponen <SEO />)
  seoConfig: {
    metaTitle: "50 Tender Jalan Jawa Barat & Analisa AHSP | TeamTender",
    metaDescription: "Jangan lewatkan 50 peluang tender konstruksi jalan di Jawa Barat. Lengkap dengan prediksi HPS dan analisa dokumen teknis untuk menang.",
    focusKeywords: "Tender Jalan Jawa Barat, LPSE Jabar, AHSP Jalan PUPR",
    
    // JSON-LD Schema.org khusus Artikel Berita / Panduan
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Peluang Emas: 50 Tender Konstruksi Jalan di Jawa Barat Bulan Ini",
      "image": [
        "https://teamtender.id/images/blog/tender-jalan-jabar.jpg"
       ],
      "datePublished": "2026-07-20T08:00:00+08:00",
      "dateModified": "2026-07-20T08:00:00+08:00",
      "author": [{
          "@type": "Organization",
          "name": "TeamTender AI",
          "url": "https://teamtender.id"
        }]
    }
  },

  // (Optional) Referensi Tender Langsung
  // Agen AI akan menautkan artikel ini ke database tender riil di TeamTender
  relatedTenderIds: ["tender-12345", "tender-67890"]
};
