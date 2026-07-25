import { BarChart3, Award, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const stats = [
    { label: "Total Tender Diikuti", value: "18 Paket", sub: "Tahun Anggaran 2026", icon: BarChart3, color: "bg-blue-50 text-blue-600 border-blue-100" },
    { label: "Kemenangan (Won)", value: "8 Paket", sub: "Nilai Kontrak Rp 24.5 M", icon: Award, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { label: "Gugur & Sanggah", value: "6 Paket", sub: "2 Sanggahan Diterima", icon: ShieldAlert, color: "bg-amber-50 text-amber-600 border-amber-100" },
    { label: "Rasio Kemenangan", value: "57.1%", sub: "Di atas rata-rata industri", icon: CheckCircle2, color: "bg-purple-50 text-purple-600 border-purple-100" },
];

export const archivedTenders = [
    {
        id: "arch1",
        name: "Pembangunan Jaringan Irigasi D.I. Kedung Uling",
        hps: "Rp 4.250.000.000",
        location: "Kab. Grobogan, Jawa Tengah",
        date: "18 Juli 2026",
        status: "Gugur Evaluasi",
        statusColor: "text-rose-600 bg-rose-50 border-rose-100",
        spseId: "10150966000",
        files: [
            { name: "Rencana Anggaran Biaya (RAB).xlsx", size: "1.4 MB" },
            { name: "Rencana Keselamatan Konstruksi (RKK).pdf", size: "2.1 MB" },
            { name: "Surat Permohonan Dukungan Alat.pdf", size: "320 KB" },
            { name: "Formulir Isian Kualifikasi SPSE.pdf", size: "850 KB" }
        ],
        schedules: [
            { step: "Pengumuman Pasca/Prakualifikasi", date: "15 Juni 2026", status: "completed" },
            { step: "Download Dokumen Pemilihan", date: "16 Juni - 22 Juni 2026", status: "completed" },
            { step: "Pemberian Penjelasan (Aanwijzing)", date: "18 Juni 2026", status: "completed" },
            { step: "Upload Dokumen Penawaran", date: "23 Juni 2026", status: "completed" },
            { step: "Pembukaan Dokumen Penawaran", date: "24 Juni 2026", status: "completed" },
            { step: "Evaluasi Dokumen Kualifikasi/Teknis", date: "25 Juni - 10 Juli 2026", status: "completed" },
            { step: "Pengumuman Pemenang", date: "12 Juli 2026", status: "completed" },
            { step: "Masa Sanggah", date: "13 - 17 Juli 2026", status: "completed" }
        ],
        evaluasi: "Berdasarkan hasil evaluasi Pokja, penawaran digugurkan karena dukungan alat (Excavator) tidak melampirkan bukti kepemilikan/sewa yang valid sesuai persyaratan LDP Bab III klausul 15.2."
    },
    {
        id: "arch2",
        name: "Rehabilitasi Gedung Puskesmas Kecamatan Mijen",
        hps: "Rp 2.150.000.000",
        location: "Kota Semarang, Jawa Tengah",
        date: "05 Juni 2026",
        status: "Menang",
        statusColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
        spseId: "11245099000",
        files: [
            { name: "Dokumen Penawaran Lengkap.zip", size: "12.5 MB" },
            { name: "SPPBJ.pdf", size: "1.1 MB" }
        ],
        schedules: [
            { step: "Penandatanganan Kontrak", date: "10 Juni 2026", status: "completed" }
        ],
        evaluasi: "Penawaran memenuhi seluruh syarat administrasi, kualifikasi, teknis, dan harga terendah terkoreksi yang responsif."
    }
];
