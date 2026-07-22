export const requirementsDB = {
    kualifikasi: [
        { id: "k1", title: "Sertifikat Badan Usaha (SBU)", desc: "Kualifikasi Usaha Kecil. Subklasifikasi: Konstruksi Gedung Perkantoran (BG002)", ref: "LDP Hal 69" },
        { id: "k2", title: "Kemampuan Dasar (KD)", desc: "Dipersyaratkan bagi Kualifikasi Usaha Menengah dan Besar.", ref: "LDP Hal 69" },
        { id: "k3", title: "Konfirmasi Status Wajib Pajak (KSWP)", desc: "Mempunyai status valid keterangan Wajib Pajak.", ref: "LDP Hal 70" },
        { id: "k4", title: "Akta Perusahaan", desc: "Memiliki akta pendirian perusahaan dan akta perubahan (apabila ada).", ref: "LDP Hal 70" },
        { id: "k5", title: "Sisa Kemampuan Paket (SKP)", desc: "Memenuhi perhitungan Sisa Kemampuan Paket.", ref: "LDP Hal 71" },
        { id: "k6", title: "Formulir Isian Kualifikasi KSO", desc: "Wajib diisi untuk setiap Anggota KSO (jika ber-KSO).", ref: "LDP Hal 71" }
    ],
    administrasi: [
        { id: "a1", title: "Surat Penawaran", desc: "Sesuai format IKP, masa berlaku penawaran 90 hari kalender.", ref: "LDP Hal 23" },
        { id: "a2", title: "Jaminan Penawaran", desc: "Wajib untuk nilai HPS > Rp10.000.000.000 atau jika ditetapkan pada dokumen pemilihan.", ref: "LDP Hal 25" },
        { id: "a3", title: "Surat Perjanjian Kerja Sama Operasi", desc: "Wajib apabila perusahaan ber-KSO.", ref: "LDP Hal 26" }
    ],
    harga: [
        { id: "h1", title: "Daftar Kuantitas dan Harga (BOQ)", desc: "Daftar rincian harga excel harus sesuai spesifikasi.", ref: "IKP 28" }
    ],
    teknis_umum: [
        { id: "tu1", title: "Metode Pelaksanaan", desc: "Metode kerja teknis yang logis dan realistis.", ref: "LDP Hal 66" },
        { id: "tu2", title: "Rencana Mutu Pelaksanaan Konstruksi (RMPK)", desc: "Rencana mutu kerja pelaksanaan.", ref: "LDP Hal 66" },
        { id: "tu3", title: "Daftar Pekerjaan Yang Disubkontrakkan", desc: "Rincian pekerjaan yang akan di-subkontrakkan.", ref: "LDP Hal 67" }
    ],
    personel: [
        { id: "p1", jabatan: "Pelaksana Lapangan", skk: "SKK Pelaksana Gedung", pengalaman: 1, ref: "LDP Hal 65" }
    ],
    peralatan: [
        { id: "e1", jenis: "Dump Truck", kapasitas: "4m³", jumlah: 2, ref: "LDP Hal 65" }
    ],
    rkk: [
        { id: "r1", uraian: "Pekerjaan Atap", bahaya: "Terjatuh dari Ketinggian", ref: "LDP Hal 67" }
    ],
    dokumen_lain: [
        { id: "d1", title: "Pakta Integritas", desc: "Dokumen pernyataan integritas penawar.", ref: "IKP 28" },
        { id: "d2", title: "Surat Pernyataan Tidak Masuk Daftar Hitam", desc: "Pernyataan tidak masuk daftar hitam LKPP.", ref: "IKP 28" },
        { id: "d3", title: "Surat Pernyataan Kesanggupan Lainnya", desc: "Surat pernyataan lain yang disyaratkan dalam LDP.", ref: "LDP Hal 75" }
    ]
};
