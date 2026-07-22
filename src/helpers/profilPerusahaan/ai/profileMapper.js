export function mapOcrDataToState(type, detectedData, prevState) {
    switch (type) {
        case 'npwp':
            return {
                ...prevState,
                npwp: { nomor: detectedData.nomor, file: "npwp_scanned.pdf" }
            };
        case 'pkp':
            return {
                ...prevState,
                pkp: { nomor: detectedData.nomor, file: "pkp_scanned.pdf" }
            };
        case 'kswp':
            return {
                ...prevState,
                kswp: { status: detectedData.status, file: "kswp_scanned.pdf" }
            };
        case 'spt':
            return {
                ...prevState,
                spt: { jenis: detectedData.jenis, tahun: detectedData.tahun, nomorBpe: detectedData.nomorBpe, file: "spt_scanned.pdf" }
            };
        case 'akta':
            return {
                jenis: detectedData.jenis,
                nomor: detectedData.nomor,
                tanggal: detectedData.tanggal,
                notaris: detectedData.notaris,
                sk: detectedData.sk,
                file: "akta_scanned.pdf"
            };
        case 'tenaga':
            return {
                nama: detectedData.nama,
                pendidikan: detectedData.pendidikan,
                keahlian: detectedData.keahlian,
                skk: detectedData.skk,
                pengalaman: detectedData.pengalaman,
                fileIjazah: "ijazah_scanned.pdf",
                fileCv: "cv_scanned.pdf"
            };
        case 'peralatan':
            return {
                jenis: detectedData.jenis,
                merk: detectedData.merk,
                kapasitas: detectedData.kapasitas,
                tahun: detectedData.tahun,
                kondisi: detectedData.kondisi,
                status: detectedData.status,
                fileBukti: "faktur_scanned.pdf"
            };
        case 'pengalaman':
            return {
                paket: detectedData.paket,
                bidang: detectedData.bidang,
                pengguna: detectedData.pengguna,
                kontrak: detectedData.kontrak,
                nilai: detectedData.nilai,
                selesai: detectedData.selesai,
                status: "Selesai",
                progress: 100,
                fileKontrak: "kontrak_scanned.pdf",
                fileBastp: "bastp_scanned.pdf",
                fileBast: "bast_scanned.pdf"
            };
        default:
            return prevState;
    }
}
