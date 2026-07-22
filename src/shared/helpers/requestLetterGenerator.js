/**
 * Generates official equipment lease request letter text.
 * Pure function - No React, No DOM, No API side-effects.
 * 
 * @param {Object} params
 * @param {string} params.supplierName - Name of target supplier
 * @param {string} params.requestLetterNo - Official request letter number
 * @param {string} [params.pokja] - Selection committee name
 * @returns {string} Formatted request letter body text
 */
export function generateRequestLetterText({ supplierName, requestLetterNo, pokja = 'Pokja Pemilihan Kab. Rembang' }) {
    if (!supplierName) return '';

    return (
        `KOP SURAT PERUSAHAAN\n` +
        `PT. MAJU KONSTRUKSI\n` +
        `=============================================================\n\n` +
        `Nomor   : ${requestLetterNo}\n` +
        `Lampiran: 1 (Satu) Berkas\n` +
        `Hal     : Permohonan Dukungan Sewa Peralatan Utama\n\n` +
        `Kepada Yth.\n` +
        `Pimpinan ${supplierName}\n` +
        `di Tempat\n\n` +
        `Dengan hormat,\n` +
        `Sehubungan dengan keikutsertaan kami, PT. Maju Konstruksi, dalam proses pelelangan pekerjaan:\n\n` +
        `Nama Paket Pekerjaan : Pembangunan Gedung PGRI Rembang\n` +
        `Nilai HPS            : Rp 2.889.720.000,00\n` +
        `Pokja Pemilihan      : ${pokja}\n` +
        `Alamat Pokja         : Bagian PBJ, Setda Kab. Rembang\n\n` +
        `Maka dengan ini kami mengajukan permohonan dukungan sewa peralatan utama berupa:\n` +
        `1. Dump Truck Kapasitas 4 m³ (2 Unit)\n` +
        `2. Concrete Mixer Kapasitas 0.3 m³ (1 Unit)\n\n` +
        `Kami berharap Pihak ${supplierName} dapat menerbitkan Surat Perjanjian Sewa Peralatan spesifik untuk tender tersebut di atas sebagai kelengkapan dokumen teknis kami.\n\n` +
        `Demikian surat permohonan ini kami sampaikan. Atas perhatian dan kerja samanya kami ucapkan terima kasih.\n\n\n` +
        `Jakarta, 19 Juli 2026\n` +
        `PT. Maju Konstruksi,\n\n\n\n\n` +
        `Ir. Budi Santoso\n` +
        `Direktur Utama`
    );
}
