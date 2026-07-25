import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "TeamTender - Sistem Manajemen Tender Profesional",
  description = "Solusi B2B terpercaya untuk manajemen, analisis, dan otomasi tender pemerintah dan swasta. Persiapkan dokumen tender, hitung AHSP, dan temukan relasi KSO terbaik.",
  keywords = "Tender, Manajemen Tender, Aplikasi Konstruksi, LPSE, AHSP 2025, Proyek Pemerintah",
  image = "/teamtender-og.png", 
  url = "https://teamtender.id",
  schemaType = "SoftwareApplication",
  customSchema = null
}) {
  const siteName = "TeamTender";

  // Base Schema for Software Application
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": siteName,
    "description": description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "url": url,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    }
  };

  // Use custom schema if provided (e.g. for Blog Articles in the future), else use base schema
  const schemaStr = JSON.stringify(customSchema || baseSchema);

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {schemaStr}
      </script>
    </Helmet>
  );
}
