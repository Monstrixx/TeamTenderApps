import { useState } from 'react';
import { INITIAL_PERSONEL_LIST, INITIAL_PERALATAN_LIST } from '../../data/mock/workspace';

export function useWorkspaceTeknis(setAiLogs) {
    const [personelList, setPersonelList] = useState(INITIAL_PERSONEL_LIST);
    const [selectedPersonelId, setSelectedPersonelId] = useState('p1');
    const [peralatanList, setPeralatanList] = useState(INITIAL_PERALATAN_LIST);
    
    // RKK State
    const [rkkMenu, setRkkMenu] = useState('cover'); // 'cover' | 'pakta' | 'kepemimpinan' | 'ibprp' | 'sasaran' | 'dukungan' | 'operasi' | 'evaluasi'
    const [isRkkGenerating, setIsRkkGenerating] = useState(false);
    const [rkkProgress, setRkkProgress] = useState(100);
    const [rkkContent, setRkkContent] = useState({
        kebijakan: "PT. Maju Konstruksi berkomitmen penuh untuk menjamin keselamatan kerja karyawan dan seluruh stakeholder di area Pembangunan Gedung PGRI Rembang...",
        bahaya: [
            { no: 1, pekerjaan: "Galian Tanah Struktur Gedung", risiko: "Pekerja tertimbun longsoran galian tanah", mitigasi: "Memasang cerucuk bambu/turap penahan tanah di pinggiran galian" },
            { no: 2, pekerjaan: "Pekerjaan Beton Struktur Utama", risiko: "Pekerja terkena cipratan cairan beton panas atau tertimpa bucket beton", mitigasi: "Wajib menggunakan helm, kacamata pelindung, rompi reflektif, dan menjaga jarak radius putar mixer" }
        ],
        pakta_integritas: "Berdasarkan komitmen perusahaan untuk menjalankan seluruh aktivitas konstruksi secara aman...",
        sasaran_k3: "Nihil Kecelakaan Kerja (Zero Fatalities).\nTingkat Keparahan (Severity Rate) = 0.\nNihil Penyakit Akibat Kerja (Zero Occupational Disease).",
        evaluasi: "Inspeksi rutin K3 dilakukan setiap minggu oleh Ahli K3 Konstruksi.\nRapat tinjauan manajemen akan dilakukan setiap bulan..."
    });

    // RMPK State
    const [rmpkMenu, setRmpkMenu] = useState('cover'); // 'cover'|'bab1'|'bab2'|'bab3'|'bab4'|'bab5'|'bab6'|'bab7'|'bab8'
    const [isRmpkProcessing, setIsRmpkProcessing] = useState(false);
    const [rmpkProgress, setRmpkProgress] = useState(0);

    const triggerRmpkGenerate = () => {
        setIsRmpkProcessing(true);
        setRmpkProgress(0);
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 10;
            if (currentProgress >= 100) {
                clearInterval(interval);
                setIsRmpkProcessing(false);
                setRmpkProgress(100);
            } else {
                setRmpkProgress(currentProgress);
            }
        }, 150);
    };

    const triggerRkkGenerate = () => {
        setIsRkkGenerating(true);
        setRkkProgress(0);
        const interval = setInterval(() => {
            setRkkProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setIsRkkGenerating(false);
                    setRkkContent(prev => ({
                        ...prev,
                        bahaya: [
                            ...prev.bahaya,
                            { no: 3, pekerjaan: "Mobilisasi Alat Berat (Excavator)", risiko: "Kecelakaan lalu lintas, jalan desa rusak", mitigasi: "Pengawalan voorijder, perkuatan jalan sementara, pengaturan jam kerja" }
                        ]
                    }));
                    if(setAiLogs) {
                        setAiLogs(logs => [
                            ...logs,
                            { time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), agent: "RKK Generator", msg: `Berhasil menambahkan identifikasi bahaya spesifik lokasi secara otomatis.` }
                        ]);
                    }
                    return 100;
                }
                return p + 15;
            });
        }, 300);
    };

    return {
        personelList, setPersonelList,
        selectedPersonelId, setSelectedPersonelId,
        peralatanList, setPeralatanList,
        rkkMenu, setRkkMenu,
        isRkkGenerating, setIsRkkGenerating,
        rkkProgress, setRkkProgress,
        rkkContent, setRkkContent,
        rmpkMenu, setRmpkMenu,
        isRmpkProcessing, setIsRmpkProcessing,
        rmpkProgress, setRmpkProgress,
        actions: {
            triggerRmpkGenerate,
            triggerRkkGenerate
        }
    };
}
