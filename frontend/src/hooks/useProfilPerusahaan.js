import { useState, useEffect } from 'react';
import { getMockOcrData } from '../helpers/profilPerusahaan/ai/profileScanner';
import { mapOcrDataToState } from '../helpers/profilPerusahaan/ai/profileMapper';
import { parseOcrResult } from '../helpers/profilPerusahaan/ai/profileParser';

export function useProfilPerusahaan(contentRef) {
    // === UI State ===
    const [activeTab, setActiveTab] = useState('tab-company');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'form'
    const [editIndex, setEditIndex] = useState(null); // to track which item is being edited in tables

    // AI Scanner States
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiScanProgress, setAiScanProgress] = useState(0);
    const [aiScanStatus, setAiScanStatus] = useState('idle'); // 'idle' | 'scanning' | 'done'
    const [aiTargetType, setAiTargetType] = useState('');
    const [aiScanLogs, setAiScanLogs] = useState([]);
    const [aiDetectedData, setAiDetectedData] = useState({});
    const [aiWarning, setAiWarning] = useState('');

    // === Domain State ===
    const [profileData, setProfileData] = useState({
        company: {
            tagline: "Membangun Infrastruktur Berkualitas untuk Negeri",
            background: "PT. Maju Konstruksi adalah perusahaan yang bergerak di bidang konstruksi infrastruktur dan gedung. Berdiri sejak tahun 2010, kami terus berkomitmen memberikan hasil terbaik dengan standar keamanan tertinggi.",
            visi: "Menjadi mitra konstruksi terpercaya dan terdepan di Indonesia.",
            misi: "Memberikan layanan konstruksi berkualitas tinggi, menerapkan keselamatan kerja terbaik, dan mengembangkan inovasi teknologi konstruksi berkelanjutan.",
            theme: "corporate"
        },
        identitas: {
            nama: "PT. Maju Konstruksi",
            bentuk: "Perseroan Terbatas (PT)",
            status: "Pusat",
            alamat: "Jl. Sudirman No. 45, Gedung Graha Lantai 3, Jakarta Selatan, 12920",
            email: "info@majukonstruksi.co.id",
            telepon: "(021) 555-0123",
            nib: "9120401234567",
            tglNib: "2020-05-15",
            fileBukti: "bukti_kantor.pdf"
        },
        akta: [
            { id: "ak1", jenis: "Akta Pendirian", nomor: "01", tanggal: "2010-01-12", notaris: "Hendra Wijaya, SH", sk: "AHU-00123.AH.01.01.2010", file: "akta_pendirian.pdf" },
            { id: "ak2", jenis: "Akta Perubahan Terakhir", nomor: "15", tanggal: "2023-03-08", notaris: "Siti Rahmawati, SH, M.Kn", sk: "AHU-00987.AH.01.02.2023", file: "akta_perubahan_15.pdf" }
        ],
        izin: [
            { id: "iz1", jenis: "NIB (Nomor Induk Berusaha)", nomor: "9120401234567", instansi: "OSS - BKPM", berlaku: "Seumur Hidup", status: "Aktif", file: "nib_perusahaan.pdf" },
            { id: "iz2", jenis: "SBU (Sertifikat Badan Usaha)", nomor: "SBU-BG002-K1-2024", instansi: "LPJK", berlaku: "2027-12-31", status: "Aktif", file: "sbu_bg002.pdf" }
        ],
        direksi: [
            { id: "dir1", nama: "Ir. Budi Santoso", jabatan: "Direktur Utama", ktp: "3273012204750001", saham: "60%", fileKtp: "ktp_budi.pdf", fileNpwp: "npwp_budi.pdf" },
            { id: "dir2", nama: "Siti Aminah, SE", jabatan: "Komisaris", ktp: "3273021811800002", saham: "40%", fileKtp: "ktp_siti.pdf", fileNpwp: "npwp_siti.pdf" }
        ],
        pajak: {
            npwp: { nomor: "01.234.567.8-012.000", file: "npwp_maju_konstruksi.pdf" },
            pkp: { nomor: "PEM-00129/WPJ.04/KP.0303/2012", file: "sppkp_maju_konstruksi.pdf" },
            kswp: { status: "Valid (KSWP)", file: "keterangan_fiskal_2025.pdf" },
            spt: { jenis: "SPT Tahunan PPh Badan", tahun: "2025", nomorBpe: "BPE-9988112025", file: "spt_tahunan_2025.pdf" }
        },
        pengurus: [
            { id: "pe1", nama: "Ir. Budi Santoso", jabatan: "Direktur Utama", ktp: "3273012204750001", tglMulai: "2020-06-10", tglSelesai: "2025-06-10", file: "sk_direksi_budi.pdf" },
            { id: "pe2", nama: "Siti Aminah, SE", jabatan: "Komisaris Utama", ktp: "3273021811800002", tglMulai: "2020-06-10", tglSelesai: "2025-06-10", file: "sk_komisaris_siti.pdf" }
        ],
        tenaga: [
            { id: "te1", nama: "Ahmad Yasir, ST", pendidikan: "S1 Teknik Sipil", keahlian: "Ahli Gedung", skk: "SKA Ahli Gedung Muda", pengalaman: 8, fileIjazah: "ijazah_s1_yasir.pdf", fileCv: "cv_ahmad_yasir.pdf" },
            { id: "te2", nama: "Rahmat Hidayat, A.Md", pendidikan: "D3 Teknik Sipil", keahlian: "Pelaksana Bangunan", skk: "SKK Pelaksana Gedung", pengalaman: 5, fileIjazah: "ijazah_d3_rahmat.pdf", fileCv: "cv_rahmat_hidayat.pdf" }
        ],
        peralatan: [
            { id: "pr1", jenis: "Excavator", merk: "Komatsu PC200", kapasitas: "0.8 m³", tahun: "2018", kondisi: "Baik", status: "Milik Sendiri", fileBukti: "faktur_komatsu.pdf" },
            { id: "pr2", jenis: "Dump Truck", merk: "Hino Dutro", kapasitas: "4 m³", tahun: "2020", kondisi: "Baik", status: "Milik Sendiri", fileBukti: "bpkb_hino.pdf" }
        ],
        pengalaman: [
            { id: "pg1", paket: "Pembangunan Gedung Sekolah SMPN 1 Rembang", bidang: "Gedung", pengguna: "Dinas Pendidikan Kab. Rembang", kontrak: "027/554/SMPN1/2024", nilai: "Rp 1.850.000.000", selesai: "2024-11-20", status: "Selesai", progress: 100, fileKontrak: "kontrak_smpn1.pdf", fileBastp: "pho_smpn1.pdf", fileBast: "fho_smpn1.pdf" },
            { id: "pg2", paket: "Pembangunan Jembatan Gantung Desa Karangtengah", bidang: "Sipil / Jembatan", pengguna: "Dinas Pekerjaan Umum Kab. Blora", kontrak: "602/441/DPU-BLORA/2026", nilai: "Rp 3.120.000.000", selesai: "2026-09-30", status: "Sedang Berjalan", progress: 65, fileKontrak: "kontrak_jembatan.pdf", fileBastp: "", fileBast: "" }
        ],
        sertifikat: [
            { id: "sr1", nama: "ISO 9001:2015 (Sistem Manajemen Mutu)", penerbit: "TUV NORD", nomor: "01 100 1834927", terbit: "2024-08-10", berlaku: "2027-08-10", file: "iso_9001_sertifikat.pdf" },
            { id: "sr2", nama: "Sertifikat SMK3 (Keselamatan Kerja)", penerbit: "Kemenaker RI", nomor: "Reg.5512/SMK3/2024", terbit: "2024-05-12", berlaku: "2027-05-12", file: "sertifikat_smk3.pdf" }
        ]
    });

    const [tempIdentitas, setTempIdentitas] = useState({});
    const [tempCompany, setTempCompany] = useState({});
    const [tempAkta, setTempAkta] = useState({ jenis: 'Akta Pendirian', nomor: '', tanggal: '', notaris: '', sk: '', file: '' });
    const [tempIzin, setTempIzin] = useState({ jenis: 'NIB (Nomor Induk Berusaha)', nomor: '', instansi: '', berlaku: '', status: 'Aktif', file: '' });
    const [tempDireksi, setTempDireksi] = useState({ nama: '', jabatan: 'Direktur Utama', ktp: '', saham: '', fileKtp: '', fileNpwp: '' });
    const [tempPajak, setTempPajak] = useState({
        npwp: { nomor: '', file: '' },
        pkp: { nomor: '', file: '' },
        kswp: { status: 'Valid (KSWP)', file: '' },
        spt: { jenis: 'SPT Tahunan PPh Badan', tahun: '', nomorBpe: '', file: '' }
    });
    const [tempPengurus, setTempPengurus] = useState({ nama: '', jabatan: 'Direktur Utama', ktp: '', tglMulai: '', tglSelesai: '', file: '' });
    const [tempTenaga, setTempTenaga] = useState({ nama: '', pendidikan: '', keahlian: '', skk: '', pengalaman: 0, fileIjazah: '', fileCv: '' });
    const [tempPeralatan, setTempPeralatan] = useState({ jenis: '', merk: '', kapasitas: '', tahun: '', kondisi: 'Baik', status: 'Milik Sendiri', fileBukti: '' });
    const [tempPengalaman, setTempPengalaman] = useState({ paket: '', bidang: '', pengguna: '', kontrak: '', nilai: '', selesai: '', status: 'Selesai', progress: 100, fileKontrak: '', fileBastp: '', fileBast: '' });
    const [tempSertifikat, setTempSertifikat] = useState({ nama: '', penerbit: '', nomor: '', terbit: '', berlaku: '', file: '' });

    // Derived States
    const getRunningTendersCount = () => {
        return profileData.pengalaman.filter(p => p.status === 'Sedang Berjalan').length;
    };
    const skpCount = 5 - getRunningTendersCount();

    // === Effects ===
    useEffect(() => {
        if (aiScanStatus !== 'scanning') return;

        const interval = setInterval(() => {
            setAiScanProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setAiScanStatus('done');
                    
                    const mockResult = getMockOcrData(aiTargetType);
                    const parsedData = parseOcrResult(mockResult.data);
                    
                    setAiDetectedData(parsedData);
                    setAiWarning(mockResult.warning);
                    
                    if (mockResult.logs) {
                        setAiScanLogs(logs => [...logs, ...mockResult.logs]);
                    }
                    return 100;
                }
                const nextProgress = p + 20;
                if (nextProgress === 40) {
                    setAiScanLogs(logs => [...logs, 'Menganalisis kecocokan nama instansi & logo...', 'Melakukan ekstraksi field data utama...']);
                }
                if (nextProgress === 80) {
                    setAiScanLogs(logs => [...logs, 'Validasi tanda tangan & segel elektronik...', 'Melakukan validasi silang basis data LKPP/OSS...']);
                }
                return nextProgress;
            });
        }, 400);

        return () => clearInterval(interval);
    }, [aiScanStatus, aiTargetType]);

    // === Actions ===
    
    // UI Navigation
    const switchTab = (tabId) => {
        setActiveTab(tabId);
        setViewMode('list');
        setEditIndex(null);
        if (contentRef && contentRef.current) contentRef.current.scrollTop = 0;
    };

    // AI Scanner
    const triggerAiScan = (type) => {
        setAiTargetType(type);
        setAiScanProgress(0);
        setAiScanStatus('scanning');
        setAiWarning('');
        setAiScanLogs(['Menghubungkan ke Mesin OCR...', 'Membaca metadata berkas...']);
        setIsAiModalOpen(true);
    };

    const closeAiModal = () => {
        setIsAiModalOpen(false);
    };

    const applyAiAutofill = () => {
        if (aiTargetType === 'npwp') {
            setTempPajak(prev => mapOcrDataToState('npwp', aiDetectedData, prev));
        } else if (aiTargetType === 'pkp') {
            setTempPajak(prev => mapOcrDataToState('pkp', aiDetectedData, prev));
        } else if (aiTargetType === 'kswp') {
            setTempPajak(prev => mapOcrDataToState('kswp', aiDetectedData, prev));
        } else if (aiTargetType === 'spt') {
            setTempPajak(prev => mapOcrDataToState('spt', aiDetectedData, prev));
        } else if (aiTargetType === 'akta') {
            setTempAkta(mapOcrDataToState('akta', aiDetectedData));
        } else if (aiTargetType === 'tenaga') {
            setTempTenaga(mapOcrDataToState('tenaga', aiDetectedData));
        } else if (aiTargetType === 'peralatan') {
            setTempPeralatan(mapOcrDataToState('peralatan', aiDetectedData));
        } else if (aiTargetType === 'pengalaman') {
            setTempPengalaman(mapOcrDataToState('pengalaman', aiDetectedData));
        }
        setIsAiModalOpen(false);
    };

    // Singular Data Forms (Company & Identitas & Pajak)
    const handleEditCompany = () => {
        setTempCompany({ ...profileData.company });
        setViewMode('form');
    };
    const handleSaveCompany = () => {
        setProfileData(prev => ({ ...prev, company: tempCompany }));
        setViewMode('list');
    };

    const handleEditIdentitas = () => {
        setTempIdentitas({ ...profileData.identitas });
        setViewMode('form');
    };
    const handleSaveIdentitas = () => {
        setProfileData(prev => ({ ...prev, identitas: tempIdentitas }));
        setViewMode('list');
    };

    const handleEditPajak = () => {
        setTempPajak({
            npwp: { ...profileData.pajak.npwp },
            pkp: { ...profileData.pajak.pkp },
            kswp: { ...profileData.pajak.kswp },
            spt: { ...profileData.pajak.spt }
        });
        setViewMode('form');
    };
    const handleSavePajak = () => {
        setProfileData(prev => ({ ...prev, pajak: tempPajak }));
        setViewMode('list');
    };

    // Table Data Forms
    const handleDeleteRow = (category, id) => {
        setProfileData(prev => ({
            ...prev,
            [category]: prev[category].filter(item => item.id !== id)
        }));
    };

    const handleAddClick = () => {
        setEditIndex(null);
        if (activeTab === 'tab-akta') setTempAkta({ jenis: 'Akta Pendirian', nomor: '', tanggal: '', notaris: '', sk: '', file: '' });
        else if (activeTab === 'tab-izin') setTempIzin({ jenis: 'NIB (Nomor Induk Berusaha)', nomor: '', instansi: '', berlaku: '', status: 'Aktif', file: '' });
        else if (activeTab === 'tab-direksi') setTempDireksi({ nama: '', jabatan: 'Direktur Utama', ktp: '', saham: '', fileKtp: '', fileNpwp: '' });
        else if (activeTab === 'tab-pengurus') setTempPengurus({ nama: '', jabatan: 'Direktur Utama', ktp: '', tglMulai: '', tglSelesai: '', file: '' });
        else if (activeTab === 'tab-tenaga') setTempTenaga({ nama: '', pendidikan: '', keahlian: '', skk: '', pengalaman: 0, fileIjazah: '', fileCv: '' });
        else if (activeTab === 'tab-peralatan') setTempPeralatan({ jenis: '', merk: '', kapasitas: '', tahun: '', kondisi: 'Baik', status: 'Milik Sendiri', fileBukti: '' });
        else if (activeTab === 'tab-pengalaman') setTempPengalaman({ paket: '', bidang: '', pengguna: '', kontrak: '', nilai: '', selesai: '', status: 'Selesai', progress: 100, fileKontrak: '', fileBastp: '', fileBast: '' });
        else if (activeTab === 'tab-sertifikat') setTempSertifikat({ nama: '', penerbit: '', nomor: '', terbit: '', berlaku: '', file: '' });
        setViewMode('form');
    };

    const handleEditClick = (category, idx) => {
        setEditIndex(idx);
        const item = profileData[category][idx];
        if (category === 'akta') setTempAkta({ ...item });
        else if (category === 'izin') setTempIzin({ ...item });
        else if (category === 'direksi') setTempDireksi({ ...item });
        else if (category === 'pengurus') setTempPengurus({ ...item });
        else if (category === 'tenaga') setTempTenaga({ ...item });
        else if (category === 'peralatan') setTempPeralatan({ ...item });
        else if (category === 'pengalaman') setTempPengalaman({ ...item });
        else if (category === 'sertifikat') setTempSertifikat({ ...item });
        setViewMode('form');
    };

    const handleSaveTableItem = (category, tempState) => {
        setProfileData(prev => {
            const list = [...prev[category]];
            if (editIndex !== null) {
                list[editIndex] = tempState;
            } else {
                list.push({ ...tempState, id: "item_" + Date.now() });
            }
            return { ...prev, [category]: list };
        });
        setViewMode('list');
        setEditIndex(null);
    };

    const cancelEdit = () => {
        setViewMode('list');
    };

    // Return structured object
    return {
        uiState: {
            activeTab,
            viewMode,
            editIndex,
            isAiModalOpen,
            aiScanProgress,
            aiScanStatus,
            aiTargetType,
            aiScanLogs,
            aiDetectedData,
            aiWarning
        },
        domainState: {
            profileData,
            skpCount,
            tempCompany,
            tempIdentitas,
            tempAkta,
            tempIzin,
            tempDireksi,
            tempPajak,
            tempPengurus,
            tempTenaga,
            tempPeralatan,
            tempPengalaman,
            tempSertifikat
        },
        actions: {
            ui: { switchTab, cancelEdit },
            ai: { triggerAiScan, applyAiAutofill, closeAiModal },
            company: { 
                handleEdit: handleEditCompany, 
                handleSave: handleSaveCompany, 
                setTemp: setTempCompany 
            },
            identitas: { 
                handleEdit: handleEditIdentitas, 
                handleSave: handleSaveIdentitas, 
                setTemp: setTempIdentitas 
            },
            pajak: { 
                handleEdit: handleEditPajak, 
                handleSave: handleSavePajak, 
                setTemp: setTempPajak 
            },
            table: { 
                handleAddClick, 
                handleEditClick, 
                handleSaveTableItem, 
                handleDeleteRow 
            },
            // Specific setters for forms to avoid prop drilling root state dispatcher
            setTempAkta,
            setTempIzin,
            setTempDireksi,
            setTempPengurus,
            setTempTenaga,
            setTempPeralatan,
            setTempPengalaman,
            setTempSertifikat
        }
    };
}
