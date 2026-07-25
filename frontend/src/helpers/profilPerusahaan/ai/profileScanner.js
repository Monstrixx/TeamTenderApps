export function getMockOcrData(type) {
    let data = {};
    let logs = [];
    let warning = '';

    if (type === 'npwp') {
        data = {
            nomor: "01.234.567.8-012.000",
            namaPerusahaan: "PT. Maju Konstruksi"
        };
        logs.push('✅ Valid: Nama wajib pajak 100% sesuai dengan profil perusahaan.');
    } else if (type === 'pkp') {
        data = {
            nomor: "PEM-00129/WPJ.04/KP.0303/2012",
            namaPerusahaan: "PT. Maju Konstruksi"
        };
        logs.push('✅ Valid: Dokumen pengukuhan PKP diterbitkan oleh Ditjen Pajak RI.');
    } else if (type === 'kswp') {
        data = {
            status: "Valid (KSWP)"
        };
        logs.push('✅ Valid: Terdaftar aktif pada sistem KSWP Kemenkeu.');
    } else if (type === 'spt') {
        data = {
            jenis: "SPT Tahunan PPh Badan",
            tahun: "2025",
            nomorBpe: "BPE-9988112025"
        };
        logs.push('✅ Valid: Nomor BPE terverifikasi di server DJP Online.');
    } else if (type === 'akta') {
        data = {
            jenis: "Akta Pendirian",
            nomor: "01",
            tanggal: "2010-01-12",
            notaris: "Hendra Wijaya, SH",
            sk: "AHU-00123.AH.01.01.2010"
        };
        logs.push('✅ Valid: Nomor SK Kemenkumham sah.');
    } else if (type === 'tenaga') {
        data = {
            nama: "Ahmad Yasir, ST",
            pendidikan: "S1 Teknik Sipil",
            keahlian: "Ahli Gedung",
            skk: "SKA Ahli Gedung Muda",
            pengalaman: 8
        };
        logs.push('⚠️ Peringatan: Masa berlaku sertifikat keahlian tersisa 45 hari.');
        warning = "Sertifikat SKA Ahli Gedung Muda akan segera habis masa berlakunya dalam waktu dekat.";
    } else if (type === 'peralatan') {
        data = {
            jenis: "Excavator",
            merk: "Komatsu PC200",
            kapasitas: "0.8 m³",
            tahun: "2018",
            kondisi: "Baik",
            status: "Milik Sendiri"
        };
        logs.push('✅ Valid: Dokumen faktur pembelian alat cocok dengan nomor rangka mesin.');
    } else if (type === 'pengalaman') {
        data = {
            paket: "Pembangunan Gedung Sekolah SMPN 1 Rembang",
            bidang: "Gedung",
            pengguna: "Dinas Pendidikan Kab. Rembang",
            kontrak: "027/554/SMPN1/2024",
            nilai: "Rp 1.850.000.000",
            selesai: "2024-11-20"
        };
        logs.push('✅ Valid: BAST Kontrak dinyatakan sah 100% selesai oleh PPK.');
    }

    return { data, logs, warning };
}
