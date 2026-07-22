import { useState, useEffect } from 'react';
import { archivedTenders as initialArchivedTenders } from '../../data/mock/tenderArsip';

export function useTenderArsip() {
    const [selectedTender, setSelectedTender] = useState(null);
    const [activeTab, setActiveTab] = useState('summary'); // 'summary', 'schedule', 'appeal'
    const [evaluasiInput, setEvaluasiInput] = useState('');
    const [aiSanggahDraft, setAiSanggahDraft] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [archivedTenders, setArchivedTenders] = useState(initialArchivedTenders);

    useEffect(() => {
        if (!selectedTender && archivedTenders && archivedTenders.length > 0) {
            setSelectedTender(archivedTenders[0]);
        }
    }, [archivedTenders]);

    const handleTenderClick = (t) => {
        setSelectedTender(t);
        setActiveTab('summary');
        setAiSanggahDraft('');
        setEvaluasiInput('');
    };

    const handleSyncSchedule = () => {
        if (!selectedTender) return;
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            alert("Sinkronisasi Jadwal SPSE Sukses! Seluruh tahapan jadwal dimutakhirkan dengan data portal LPSE terbaru.");
        }, 1200);
    };

    const handleAnalyzeEvaluasi = (e) => {
        e.preventDefault();
        if (!evaluasiInput) return;

        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            setAiSanggahDraft(
                `KOP SURAT PERUSAHAAN\n` +
                `PT. MAJU KONSTRUKSI\n` +
                `=============================================================\n\n` +
                `Nomor   : 045/DIR-MK/VII/2026\n` +
                `Lampiran: 1 (satu) berkas\n` +
                `Hal     : Sanggahan Hasil Evaluasi Kualifikasi/Teknis\n\n` +
                `Kepada Yth.\n` +
                `Kelompok Kerja (Pokja) Pemilihan\n` +
                `Paket Pekerjaan: ${selectedTender?.name || ''}\n` +
                `di Tempat\n\n` +
                `Dengan hormat,\n` +
                `Sehubungan dengan pengumuman pemenang/hasil evaluasi kualifikasi untuk paket pekerjaan ${selectedTender?.name || ''}, di mana perusahaan kami, PT. Maju Konstruksi, dinyatakan GUGUR dengan alasan:\n\n` +
                `"${evaluasiInput}"\n\n` +
                `Maka dengan ini kami mengajukan SANGGAHAN atas keputusan tersebut dengan argumen dan bukti hukum sebagai berikut:\n\n` +
                `1. Bahwa keputusan Pokja Pemilihan tidak objektif karena berdasarkan aturan Dokumen Pemilihan (LDP) dan Permen PUPR No. 1 Tahun 2022, syarat klasifikasi SKK personel Pelaksana adalah sah apabila terdaftar resmi di LPJK. Personel kami memiliki sertifikat valid nomor SKK-9812-3213 yang terdaftar aktif s.d. Desember 2028.\n` +
                `2. Terlampir berkas print-out verifikasi LPJK Portal sebagai bukti keabsahan dokumen kami untuk menganulir alasan gugur Pokja.\n\n` +
                `Kami memohon Pokja Pemilihan untuk melakukan evaluasi ulang secara objektif dan adil sesuai dengan regulasi PBJ Pemerintah yang berlaku.\n\n` +
                `Demikian sanggahan ini kami sampaikan. Atas perhatian dan tindak lanjutnya kami ucapkan terima kasih.\n\n\n` +
                `Hormat kami,\n\nPT. MAJU KONSTRUKSI\n\n\n\n(Pimpinan Perusahaan)`
            );
        }, 1500);
    };

    return {
        selectedTender, setSelectedTender,
        activeTab, setActiveTab,
        evaluasiInput, setEvaluasiInput,
        aiSanggahDraft, setAiSanggahDraft,
        isAnalyzing, setIsAnalyzing,
        isSyncing, setIsSyncing,
        archivedTenders, setArchivedTenders,
        actions: {
            handleTenderClick,
            handleSyncSchedule,
            handleAnalyzeEvaluasi
        }
    };
}
