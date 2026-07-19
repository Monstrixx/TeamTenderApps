import React, { useState, useRef, useEffect } from 'react';
import { 
    LayoutTemplate, Building2, FileSignature, Award, UserCheck, Network, 
    Users2, Truck, Briefcase, FileDigit, ShieldCheck, Eye, FileDown, 
    Check, Edit3, Trash2, Plus, Upload, X, AlertCircle, Sparkles, Loader2, RefreshCw
} from 'lucide-react';

const INPUT_CLASS = "w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
const SELECT_CLASS = "w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer";
const LABEL_CLASS = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";
const CARD_CLASS = "bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden";
const BTN_PRIMARY = "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-sm cursor-pointer";
const BTN_OUTLINE = "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 transition-all cursor-pointer";

export default function ProfilPerusahaan() {
    const [activeTab, setActiveTab] = useState('tab-company');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'form'
    const [editIndex, setEditIndex] = useState(null); // to track which item is being edited in tables
    const contentRef = useRef(null);

    // AI Scanner States
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [aiScanProgress, setAiScanProgress] = useState(0);
    const [aiScanStatus, setAiScanStatus] = useState('idle'); // 'idle' | 'scanning' | 'done'
    const [aiTargetType, setAiTargetType] = useState(''); // 'npwp' | 'pkp' | 'kswp' | 'spt' | 'akta' | 'tenaga' | 'peralatan' | 'pengalaman'
    const [aiScanLogs, setAiScanLogs] = useState([]);
    const [aiDetectedData, setAiDetectedData] = useState({});
    const [aiWarning, setAiWarning] = useState('');

    // State Database
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

    // Temporary states for form inputs
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

    const navItems = [
        { id: 'tab-company', icon: LayoutTemplate, label: 'Company Profile', complete: true },
        { id: 'tab-identitas', icon: Building2, label: 'Identitas Penyedia', complete: true },
        { id: 'tab-akta', icon: FileSignature, label: 'Akta Pendirian', complete: true },
        { id: 'tab-izin', icon: Award, label: 'Izin Usaha', complete: true },
        { id: 'tab-direksi', icon: UserCheck, label: 'Direksi & Pemilik', complete: true },
        { id: 'tab-pajak', icon: FileDigit, label: 'Pajak & KSWP', complete: true },
        { id: 'tab-pengurus', icon: Network, label: 'Pengurus Perusahaan', complete: true },
        { id: 'tab-tenaga', icon: Users2, label: 'Tenaga Ahli', complete: true },
        { id: 'tab-peralatan', icon: Truck, label: 'Peralatan', complete: true },
        { id: 'tab-pengalaman', icon: Briefcase, label: 'Pengalaman', complete: true },
        { id: 'tab-sertifikat', icon: ShieldCheck, label: 'Sertifikat', complete: true },
    ];

    const switchTab = (tabId) => {
        setActiveTab(tabId);
        setViewMode('list');
        setEditIndex(null);
        if (contentRef.current) contentRef.current.scrollTop = 0;
    };

    // AI SCANNER LOGIC SIMULATOR
    const triggerAiScan = (type) => {
        setAiTargetType(type);
        setAiScanProgress(0);
        setAiScanStatus('scanning');
        setAiWarning('');
        setAiScanLogs(['Menghubungkan ke Mesin OCR...', 'Membaca metadata berkas...']);
        setIsAiModalOpen(true);
    };

    useEffect(() => {
        if (aiScanStatus !== 'scanning') return;

        const interval = setInterval(() => {
            setAiScanProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setAiScanStatus('done');
                    // Generate mock OCR data based on target type
                    generateMockOcrData(aiTargetType);
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

    const generateMockOcrData = (type) => {
        if (type === 'npwp') {
            setAiDetectedData({
                nomor: "01.234.567.8-012.000",
                namaPerusahaan: "PT. Maju Konstruksi"
            });
            setAiScanLogs(logs => [...logs, '✅ Valid: Nama wajib pajak 100% sesuai dengan profil perusahaan.']);
        } else if (type === 'pkp') {
            setAiDetectedData({
                nomor: "PEM-00129/WPJ.04/KP.0303/2012",
                namaPerusahaan: "PT. Maju Konstruksi"
            });
            setAiScanLogs(logs => [...logs, '✅ Valid: Dokumen pengukuhan PKP diterbitkan oleh Ditjen Pajak RI.']);
        } else if (type === 'kswp') {
            setAiDetectedData({
                status: "Valid (KSWP)"
            });
            setAiScanLogs(logs => [...logs, '✅ Valid: Terdaftar aktif pada sistem KSWP Kemenkeu.']);
        } else if (type === 'spt') {
            setAiDetectedData({
                jenis: "SPT Tahunan PPh Badan",
                tahun: "2025",
                nomorBpe: "BPE-9988112025"
            });
            setAiScanLogs(logs => [...logs, '✅ Valid: Nomor BPE terverifikasi di server DJP Online.']);
        } else if (type === 'akta') {
            setAiDetectedData({
                jenis: "Akta Pendirian",
                nomor: "01",
                tanggal: "2010-01-12",
                notaris: "Hendra Wijaya, SH",
                sk: "AHU-00123.AH.01.01.2010"
            });
            setAiScanLogs(logs => [...logs, '✅ Valid: Nomor SK Kemenkumham sah.']);
        } else if (type === 'tenaga') {
            setAiDetectedData({
                nama: "Ahmad Yasir, ST",
                pendidikan: "S1 Teknik Sipil",
                keahlian: "Ahli Gedung",
                skk: "SKA Ahli Gedung Muda",
                pengalaman: 8
            });
            setAiScanLogs(logs => [...logs, '⚠️ Peringatan: Masa berlaku sertifikat keahlian tersisa 45 hari.']);
            setAiWarning("Sertifikat SKA Ahli Gedung Muda akan segera habis masa berlakunya dalam waktu dekat.");
        } else if (type === 'peralatan') {
            setAiDetectedData({
                jenis: "Excavator",
                merk: "Komatsu PC200",
                kapasitas: "0.8 m³",
                tahun: "2018",
                kondisi: "Baik",
                status: "Milik Sendiri"
            });
            setAiScanLogs(logs => [...logs, '✅ Valid: Dokumen faktur pembelian alat cocok dengan nomor rangka mesin.']);
        } else if (type === 'pengalaman') {
            setAiDetectedData({
                paket: "Pembangunan Gedung Sekolah SMPN 1 Rembang",
                bidang: "Gedung",
                pengguna: "Dinas Pendidikan Kab. Rembang",
                kontrak: "027/554/SMPN1/2024",
                nilai: "Rp 1.850.000.000",
                selesai: "2024-11-20"
            });
            setAiScanLogs(logs => [...logs, '✅ Valid: BAST Kontrak dinyatakan sah 100% selesai oleh PPK.']);
        }
    };

    const applyAiAutofill = () => {
        if (aiTargetType === 'npwp') {
            setTempPajak(prev => ({ ...prev, npwp: { nomor: aiDetectedData.nomor, file: "npwp_scanned.pdf" } }));
        } else if (aiTargetType === 'pkp') {
            setTempPajak(prev => ({ ...prev, pkp: { nomor: aiDetectedData.nomor, file: "pkp_scanned.pdf" } }));
        } else if (aiTargetType === 'kswp') {
            setTempPajak(prev => ({ ...prev, kswp: { status: aiDetectedData.status, file: "kswp_scanned.pdf" } }));
        } else if (aiTargetType === 'spt') {
            setTempPajak(prev => ({ ...prev, spt: { jenis: aiDetectedData.jenis, tahun: aiDetectedData.tahun, nomorBpe: aiDetectedData.nomorBpe, file: "spt_scanned.pdf" } }));
        } else if (aiTargetType === 'akta') {
            setTempAkta({
                jenis: aiDetectedData.jenis,
                nomor: aiDetectedData.nomor,
                tanggal: aiDetectedData.tanggal,
                notaris: aiDetectedData.notaris,
                sk: aiDetectedData.sk,
                file: "akta_scanned.pdf"
            });
        } else if (aiTargetType === 'tenaga') {
            setTempTenaga({
                nama: aiDetectedData.nama,
                pendidikan: aiDetectedData.pendidikan,
                keahlian: aiDetectedData.keahlian,
                skk: aiDetectedData.skk,
                pengalaman: aiDetectedData.pengalaman,
                fileIjazah: "ijazah_scanned.pdf",
                fileCv: "cv_scanned.pdf"
            });
        } else if (aiTargetType === 'peralatan') {
            setTempPeralatan({
                jenis: aiDetectedData.jenis,
                merk: aiDetectedData.merk,
                kapasitas: aiDetectedData.kapasitas,
                tahun: aiDetectedData.tahun,
                kondisi: aiDetectedData.kondisi,
                status: aiDetectedData.status,
                fileBukti: "faktur_scanned.pdf"
            });
        } else if (aiTargetType === 'pengalaman') {
            setTempPengalaman({
                paket: aiDetectedData.paket,
                bidang: aiDetectedData.bidang,
                pengguna: aiDetectedData.pengguna,
                kontrak: aiDetectedData.kontrak,
                nilai: aiDetectedData.nilai,
                selesai: aiDetectedData.selesai,
                status: "Selesai",
                progress: 100,
                fileKontrak: "kontrak_scanned.pdf",
                fileBastp: "bastp_scanned.pdf",
                fileBast: "bast_scanned.pdf"
            });
        }
        setIsAiModalOpen(false);
    };

    // Calculate SKP (Sisa Kemampuan Paket)
    // SKP = KP - jumlah paket yang sedang berjalan
    // KP (Kemampuan Paket) untuk usaha non-kecil = 5, kecil = 5
    const getRunningTendersCount = () => {
        return profileData.pengalaman.filter(p => p.status === 'Sedang Berjalan').length;
    };
    const skpCount = 5 - getRunningTendersCount();

    // Actions
    const handleEditIdentitas = () => {
        setTempIdentitas({ ...profileData.identitas });
        setViewMode('form');
    };

    const handleSaveIdentitas = () => {
        setProfileData(prev => ({ ...prev, identitas: tempIdentitas }));
        setViewMode('list');
    };

    const handleEditCompany = () => {
        setTempCompany({ ...profileData.company });
        setViewMode('form');
    };

    const handleSaveCompany = () => {
        setProfileData(prev => ({ ...prev, company: tempCompany }));
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

    // Generic delete handler
    const handleDeleteRow = (category, id) => {
        setProfileData(prev => ({
            ...prev,
            [category]: prev[category].filter(item => item.id !== id)
        }));
    };

    // Form switches for tables
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

    const InfoRow = ({ label, value }) => (
        <div>
            <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</dt>
            <dd className="text-sm font-medium text-slate-800">{value}</dd>
        </div>
    );

    // AI Scanner Mini Button Component
    const AiScanButton = ({ target }) => (
        <button 
            type="button" 
            onClick={() => triggerAiScan(target)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-all cursor-pointer shadow-sm select-none"
        >
            <Sparkles size={11} className="animate-pulse" /> AI Scanner & Autofill
        </button>
    );

    return (
        <div className="w-full" style={{ height: 'calc(100vh - 130px)' }}>
            {/* Page header */}
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Profil Perusahaan</h1>
                    <p className="text-sm text-slate-500 mt-1">Lengkapi data kualifikasi dan legalitas untuk validasi otomatis dokumen penawaran.</p>
                </div>
                {/* SKP Indicator */}
                <div className="bg-slate-50 rounded-lg border border-slate-200 px-4 py-2 text-right shrink-0">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Perhitungan SKP Aktif</div>
                    <div className="text-lg font-black text-slate-800">{skpCount} <span className="text-xs font-semibold text-slate-500">Paket Tersisa</span></div>
                </div>
            </div>

            <div className="flex gap-6" style={{ height: 'calc(100% - 60px)' }}>
                {/* Left Sidebar Navigation */}
                <div className="w-64 shrink-0 space-y-4 overflow-y-auto pr-2">
                    {/* Completion Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                        <div className="text-sm font-bold text-slate-800 mb-3">Data Perusahaan</div>
                        <div className="flex items-center justify-between text-xs font-semibold mb-2">
                            <span className="text-slate-500">Kelengkapan Berkas</span>
                            <span className="text-blue-600">100%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all" style={{ width: '100%' }}></div>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        {navItems.map((item, idx) => {
                            const isActive = activeTab === item.id;
                            return (
                                <button 
                                    key={item.id}
                                    onClick={() => switchTab(item.id)}
                                    className={`flex items-center gap-3 w-full px-4 py-3 text-left text-[13px] font-medium transition-all cursor-pointer border-l-[3px]
                                        ${idx !== navItems.length - 1 ? 'border-b border-b-slate-100' : ''}
                                        ${isActive 
                                            ? 'bg-blue-50 border-l-blue-600 text-blue-700 font-semibold' 
                                            : 'border-l-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-800'}`}
                                >
                                    <item.icon size={16} className={`shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                                    <span className="flex-1 truncate">{item.label}</span>
                                    <div className={`w-2 h-2 rounded-full shrink-0 ${item.complete ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content Panel */}
                <div ref={contentRef} className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-y-auto">
                    
                    {/* ========== TAB: Company Profile ========== */}
                    {activeTab === 'tab-company' && (
                        <>
                            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                                <div className="flex items-center gap-2.5">
                                    <LayoutTemplate size={20} className="text-blue-600" />
                                    <h2 className="text-sm font-bold text-slate-800">Publikasi Company Profile</h2>
                                </div>
                                {viewMode === 'list' ? (
                                    <button onClick={handleEditCompany} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all cursor-pointer shadow-sm">
                                        <Edit3 size={14} /> Edit Profil
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button onClick={() => setViewMode('list')} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                                        <button onClick={handleSaveCompany} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all cursor-pointer">
                                            <Check size={14} /> Simpan
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="p-6 space-y-8">
                                <section>
                                    <h3 className="text-sm font-bold text-slate-800 mb-1">Pilih Tema Desain</h3>
                                    <p className="text-xs text-slate-500 mb-4">Pilih tata letak visual Company Profile. Data akan terisi otomatis.</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative cursor-pointer group">
                                            <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md"><Check size={14} /></div>
                                            <div className="overflow-hidden rounded-xl border-2 border-blue-600 shadow-sm">
                                                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop" className="w-full h-36 object-cover" alt="Corporate" />
                                            </div>
                                            <div className="mt-2 text-center text-xs font-bold text-slate-800">Corporate Minimalis</div>
                                        </div>
                                        <div className="relative cursor-pointer group opacity-60 hover:opacity-100 transition-opacity">
                                            <div className="overflow-hidden rounded-xl border-2 border-slate-200 hover:border-slate-300 shadow-sm transition-all">
                                                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=400&auto=format&fit=crop" className="w-full h-36 object-cover grayscale group-hover:grayscale-0 transition-all" alt="Modern" />
                                            </div>
                                            <div className="mt-2 text-center text-xs font-semibold text-slate-500 group-hover:text-slate-800">Modern Konstruksi</div>
                                        </div>
                                    </div>
                                </section>
                                <section className="pt-6 border-t border-slate-100">
                                    <h3 className="text-sm font-bold text-slate-800 mb-4">Informasi Dasar & Narasi Utama</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Slogan Perusahaan (Tagline)</label>
                                            <input type="text" className={INPUT_CLASS} value={tempCompany.tagline || ''} onChange={e => setTempCompany({...tempCompany, tagline: e.target.value})} defaultValue="Membangun Infrastruktur Berkualitas untuk Negeri" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Latar Belakang / Deskripsi Singkat</label>
                                            <textarea className={INPUT_CLASS} rows={4} value={tempCompany.background || ''} onChange={e => setTempCompany({...tempCompany, background: e.target.value})} defaultValue="PT. Maju Konstruksi adalah perusahaan yang bergerak di bidang konstruksi infrastruktur dan gedung..." />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </>
                    )}

                    {/* ========== TAB: Identitas Penyedia ========== */}
                    {activeTab === 'tab-identitas' && (
                        <>
                            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                                <div className="flex items-center gap-2.5">
                                    <Building2 size={20} className="text-blue-600" />
                                    <h2 className="text-sm font-bold text-slate-800">Identitas Penyedia</h2>
                                </div>
                                {viewMode === 'list' ? (
                                    <button onClick={handleEditIdentitas} className={BTN_PRIMARY}><Edit3 size={15} /> Edit Identitas</button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button onClick={() => setViewMode('list')} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                                        <button onClick={handleSaveIdentitas} className={BTN_PRIMARY}><Check size={15} /> Simpan</button>
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                {viewMode === 'list' ? (
                                    <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
                                        <div className="col-span-2"><InfoRow label="Nama Badan Usaha" value={<span className="text-lg font-bold text-slate-900">PT. Maju Konstruksi</span>} /></div>
                                        <InfoRow label="Bentuk Badan Usaha" value="Perseroan Terbatas (PT)" />
                                        <InfoRow label="Status Usaha" value="Pusat" />
                                        <div className="col-span-2"><InfoRow label="Alamat Lengkap" value="Jl. Sudirman No. 45, Gedung Graha Lantai 3, Jakarta Selatan, 12920" /></div>
                                        <InfoRow label="Email Perusahaan" value="info@majukonstruksi.co.id" />
                                        <InfoRow label="Telepon" value="(021) 555-0123" />
                                    </dl>
                                ) : (
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nama Badan Usaha</label>
                                            <input type="text" className={INPUT_CLASS} value={tempIdentitas.nama || ''} onChange={e => setTempIdentitas({...tempIdentitas, nama: e.target.value})} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Bentuk Badan Usaha</label>
                                                <select className={SELECT_CLASS} value={tempIdentitas.bentuk || ''} onChange={e => setTempIdentitas({...tempIdentitas, bentuk: e.target.value})}>
                                                    <option>Perseroan Terbatas (PT)</option>
                                                    <option>CV</option>
                                                    <option>Koperasi</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Status Usaha</label>
                                                <select className={SELECT_CLASS} value={tempIdentitas.status || ''} onChange={e => setTempIdentitas({...tempIdentitas, status: e.target.value})}>
                                                    <option>Pusat</option>
                                                    <option>Cabang</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className={LABEL_CLASS}>Alamat Jalan / Gedung</label>
                                            <textarea className={INPUT_CLASS} rows={2} value={tempIdentitas.alamat || ''} onChange={e => setTempIdentitas({...tempIdentitas, alamat: e.target.value})}></textarea>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Email Resmi</label>
                                                <input type="email" className={INPUT_CLASS} value={tempIdentitas.email || ''} onChange={e => setTempIdentitas({...tempIdentitas, email: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>No. Telepon</label>
                                                <input type="tel" className={INPUT_CLASS} value={tempIdentitas.telepon || ''} onChange={e => setTempIdentitas({...tempIdentitas, telepon: e.target.value})} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* ========== TAB: Akta Pendirian ========== */}
                    {activeTab === 'tab-akta' && (
                        <>
                            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                                <div className="flex items-center gap-2.5">
                                    <FileSignature size={20} className="text-blue-600" />
                                    <h2 className="text-sm font-bold text-slate-800">Akta Pendirian & Perubahan</h2>
                                </div>
                                {viewMode === 'list' && (
                                    <button onClick={handleAddClick} className={BTN_PRIMARY}><Plus size={15} /> Tambah Akta</button>
                                )}
                            </div>
                            <div className="p-6">
                                {viewMode === 'list' ? (
                                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-slate-200 bg-slate-50">
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Jenis Akta</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Nomor</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Tanggal</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Notaris</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-20">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {profileData.akta.map((item, idx) => (
                                                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                        <td className="px-4 py-3 font-semibold text-slate-800">{item.jenis}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.nomor}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.tanggal}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.notaris}</td>
                                                        <td className="px-4 py-3 text-right">
                                                            <div className="flex justify-end gap-1">
                                                                <button onClick={() => handleEditClick('akta', idx)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><Edit3 size={14} /></button>
                                                                <button onClick={() => handleDeleteRow('akta', item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                                            <div className="text-xs text-slate-500 font-medium">Gunakan pindaian AI untuk deteksi kesalahan & isi otomatis dari Dokumen Akta:</div>
                                            <AiScanButton target="akta" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Jenis Akta</label>
                                                <select className={SELECT_CLASS} value={tempAkta.jenis} onChange={e => setTempAkta({...tempAkta, jenis: e.target.value})}>
                                                    <option>Akta Pendirian</option>
                                                    <option>Akta Perubahan</option>
                                                    <option>Akta Perubahan Terakhir</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Nomor Akta</label>
                                                <input type="text" className={INPUT_CLASS} value={tempAkta.nomor} onChange={e => setTempAkta({...tempAkta, nomor: e.target.value})} placeholder="Cth: 01" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Tanggal Surat</label>
                                                <input type="date" className={INPUT_CLASS} value={tempAkta.tanggal} onChange={e => setTempAkta({...tempAkta, tanggal: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Notaris</label>
                                                <input type="text" className={INPUT_CLASS} value={tempAkta.notaris} onChange={e => setTempAkta({...tempAkta, notaris: e.target.value})} placeholder="Cth: Hendra Wijaya, SH" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className={LABEL_CLASS}>Nomor SK Kemenkumham</label>
                                            <input type="text" className={INPUT_CLASS} value={tempAkta.sk} onChange={e => setTempAkta({...tempAkta, sk: e.target.value})} placeholder="AHU-XXXXX.AH.XX.XX" />
                                        </div>
                                        <div>
                                            <label className={LABEL_CLASS}>Unggah Berkas Akta Pendirian / Perubahan (PDF)</label>
                                            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 flex items-center justify-between">
                                                <span className="text-xs text-slate-500 font-medium">{tempAkta.file || 'Belum ada file terlampir.'}</span>
                                                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Pilih Berkas</button>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                                            <button onClick={() => setViewMode('list')} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                                            <button onClick={() => handleSaveTableItem('akta', tempAkta)} className={BTN_PRIMARY}><Check size={15} /> Simpan</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* ========== TAB: Izin Usaha ========== */}
                    {activeTab === 'tab-izin' && (
                        <>
                            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                                <div className="flex items-center gap-2.5">
                                    <Award size={20} className="text-blue-600" />
                                    <h2 className="text-sm font-bold text-slate-800">Izin Usaha</h2>
                                </div>
                                {viewMode === 'list' && (
                                    <button onClick={handleAddClick} className={BTN_PRIMARY}><Plus size={15} /> Tambah Izin</button>
                                )}
                            </div>
                            <div className="p-6">
                                {viewMode === 'list' ? (
                                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-slate-200 bg-slate-50">
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Jenis Izin</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Nomor</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Instansi</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Masa Berlaku</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-20">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {profileData.izin.map((item, idx) => (
                                                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                        <td className="px-4 py-3 font-semibold text-slate-800">{item.jenis}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.nomor}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.instansi}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.berlaku}</td>
                                                        <td className="px-4 py-3 text-right">
                                                            <div className="flex justify-end gap-1">
                                                                <button onClick={() => handleEditClick('izin', idx)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><Edit3 size={14} /></button>
                                                                <button onClick={() => handleDeleteRow('izin', item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Jenis Izin</label>
                                                <input type="text" className={INPUT_CLASS} value={tempIzin.jenis} onChange={e => setTempIzin({...tempIzin, jenis: e.target.value})} placeholder="Cth: SBU" />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Nomor</label>
                                                <input type="text" className={INPUT_CLASS} value={tempIzin.nomor} onChange={e => setTempIzin({...tempIzin, nomor: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Instansi Penerbit</label>
                                                <input type="text" className={INPUT_CLASS} value={tempIzin.instansi} onChange={e => setTempIzin({...tempIzin, instansi: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Masa Berlaku</label>
                                                <input type="text" className={INPUT_CLASS} value={tempIzin.berlaku} onChange={e => setTempIzin({...tempIzin, berlaku: e.target.value})} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className={LABEL_CLASS}>Unggah Dokumen Sertifikat Izin (PDF)</label>
                                            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 flex items-center justify-between">
                                                <span className="text-xs text-slate-500 font-medium">{tempIzin.file || 'Belum ada berkas terlampir.'}</span>
                                                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Pilih Berkas</button>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                                            <button onClick={() => setViewMode('list')} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                                            <button onClick={() => handleSaveTableItem('izin', tempIzin)} className={BTN_PRIMARY}><Check size={15} /> Simpan</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* ========== TAB: Direksi & Pemilik ========== */}
                    {activeTab === 'tab-direksi' && (
                        <>
                            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                                <div className="flex items-center gap-2.5">
                                    <UserCheck size={20} className="text-blue-600" />
                                    <h2 className="text-sm font-bold text-slate-800">Direksi & Pemilik Saham</h2>
                                </div>
                                {viewMode === 'list' && (
                                    <button onClick={handleAddClick} className={BTN_PRIMARY}><Plus size={15} /> Tambah Direksi</button>
                                )}
                            </div>
                            <div className="p-6">
                                {viewMode === 'list' ? (
                                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-slate-200 bg-slate-50">
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Jabatan</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">KTP</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Saham</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Lampiran KTP & NPWP</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-20">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {profileData.direksi.map((item, idx) => (
                                                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                        <td className="px-4 py-3 font-semibold text-slate-800">{item.nama}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.jabatan}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.ktp}</td>
                                                        <td className="px-4 py-3 text-slate-600 font-bold">{item.saham}</td>
                                                        <td className="px-4 py-3 text-xs text-slate-500">
                                                            <div className="flex gap-2">
                                                                <span className="bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-[80px]">{item.fileKtp || 'KTP'}</span>
                                                                <span className="bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-[80px]">{item.fileNpwp || 'NPWP'}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-3 text-right">
                                                            <div className="flex justify-end gap-1">
                                                                <button onClick={() => handleEditClick('direksi', idx)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><Edit3 size={14} /></button>
                                                                <button onClick={() => handleDeleteRow('direksi', item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <label className={LABEL_CLASS}>Nama Lengkap</label>
                                            <input type="text" className={INPUT_CLASS} value={tempDireksi.nama} onChange={e => setTempDireksi({...tempDireksi, nama: e.target.value})} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Jabatan</label>
                                                <input type="text" className={INPUT_CLASS} value={tempDireksi.jabatan} onChange={e => setTempDireksi({...tempDireksi, jabatan: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Kepemilikan Saham (%)</label>
                                                <input type="text" className={INPUT_CLASS} value={tempDireksi.saham} onChange={e => setTempDireksi({...tempDireksi, saham: e.target.value})} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className={LABEL_CLASS}>Nomor KTP</label>
                                            <input type="text" className={INPUT_CLASS} value={tempDireksi.ktp} onChange={e => setTempDireksi({...tempDireksi, ktp: e.target.value})} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Lampiran KTP Personil (PDF/JPG)</label>
                                                <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center justify-between">
                                                    <span className="text-xs text-slate-500 truncate max-w-[150px]">{tempDireksi.fileKtp || 'Belum ada file KTP'}</span>
                                                    <button type="button" onClick={() => setTempDireksi({...tempDireksi, fileKtp: 'ktp_direksi_attached.pdf'})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Lampiran NPWP Personil (PDF/JPG)</label>
                                                <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center justify-between">
                                                    <span className="text-xs text-slate-500 truncate max-w-[150px]">{tempDireksi.fileNpwp || 'Belum ada file NPWP'}</span>
                                                    <button type="button" onClick={() => setTempDireksi({...tempDireksi, fileNpwp: 'npwp_direksi_attached.pdf'})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                                            <button onClick={() => setViewMode('list')} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                                            <button onClick={() => handleSaveTableItem('direksi', tempDireksi)} className={BTN_PRIMARY}><Check size={15} /> Simpan</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* ========== TAB: Pajak & KSWP (RESTRUCTURED) ========== */}
                    {activeTab === 'tab-pajak' && (
                        <>
                            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                                <div className="flex items-center gap-2.5">
                                    <FileDigit size={20} className="text-blue-600" />
                                    <h2 className="text-sm font-bold text-slate-800">Berkas Pajak & KSWP Perusahaan</h2>
                                </div>
                                {viewMode === 'list' ? (
                                    <button onClick={handleEditPajak} className={BTN_PRIMARY}><Edit3 size={15} /> Lengkapi Dokumen Pajak</button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button onClick={() => setViewMode('list')} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                                        <button onClick={handleSavePajak} className={BTN_PRIMARY}><Check size={15} /> Simpan Semua</button>
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                {viewMode === 'list' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        
                                        {/* NPWP */}
                                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">NPWP Perusahaan</span>
                                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">Tervalidasi</span>
                                            </div>
                                            <div className="text-base font-extrabold text-slate-800">{profileData.pajak.npwp.nomor || 'Belum diisi'}</div>
                                            <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                                                <span>File: {profileData.pajak.npwp.file || 'Tidak ada berkas'}</span>
                                                <button className="font-bold text-blue-600 hover:underline">Lihat PDF</button>
                                            </div>
                                        </div>

                                        {/* PKP */}
                                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pengukuhan PKP</span>
                                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">Aktif</span>
                                            </div>
                                            <div className="text-base font-extrabold text-slate-800">{profileData.pajak.pkp.nomor || 'Belum diisi'}</div>
                                            <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                                                <span>File: {profileData.pajak.pkp.file || 'Tidak ada berkas'}</span>
                                                <button className="font-bold text-blue-600 hover:underline">Lihat PDF</button>
                                            </div>
                                        </div>

                                        {/* KSWP */}
                                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Konfirmasi Wajib Pajak (KSWP)</span>
                                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">Valid</span>
                                            </div>
                                            <div className="text-base font-extrabold text-slate-800">{profileData.pajak.kswp.status || 'Belum diisi'}</div>
                                            <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                                                <span>File: {profileData.pajak.kswp.file || 'Tidak ada berkas'}</span>
                                                <button className="font-bold text-blue-600 hover:underline">Lihat PDF</button>
                                            </div>
                                        </div>

                                        {/* SPT */}
                                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">SPT Tahunan / Bulanan</span>
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">Tahun {profileData.pajak.spt.tahun || '-'}</span>
                                            </div>
                                            <div className="text-sm font-bold text-slate-700">{profileData.pajak.spt.jenis || 'Belum diisi'}</div>
                                            <div className="text-xs text-slate-400 truncate">No BPE: {profileData.pajak.spt.nomorBpe || '-'}</div>
                                            <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                                                <span>File: {profileData.pajak.spt.file || 'Tidak ada berkas'}</span>
                                                <button className="font-bold text-blue-600 hover:underline">Lihat PDF</button>
                                            </div>
                                        </div>

                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        
                                        {/* Form: NPWP */}
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">1. NPWP Perusahaan</h3>
                                                <AiScanButton target="npwp" />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Nomor NPWP</label>
                                                <input type="text" className={INPUT_CLASS} value={tempPajak.npwp.nomor} onChange={e => setTempPajak({...tempPajak, npwp: {...tempPajak.npwp, nomor: e.target.value}})} placeholder="00.000.000.0-000.000" />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Upload Berkas NPWP (PDF)</label>
                                                <div className="border border-slate-200 rounded-lg p-2 bg-white flex items-center justify-between">
                                                    <span className="text-xs text-slate-500">{tempPajak.npwp.file || 'Belum ada berkas terunggah.'}</span>
                                                    <button type="button" onClick={() => setTempPajak({...tempPajak, npwp: {...tempPajak.npwp, file: 'npwp_uploaded.pdf'}})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Form: PKP */}
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">2. Pengukuhan PKP</h3>
                                                <AiScanButton target="pkp" />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Nomor SPPKP</label>
                                                <input type="text" className={INPUT_CLASS} value={tempPajak.pkp.nomor} onChange={e => setTempPajak({...tempPajak, pkp: {...tempPajak.pkp, nomor: e.target.value}})} />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Upload Berkas SPPKP (PDF)</label>
                                                <div className="border border-slate-200 rounded-lg p-2 bg-white flex items-center justify-between">
                                                    <span className="text-xs text-slate-500">{tempPajak.pkp.file || 'Belum ada berkas terunggah.'}</span>
                                                    <button type="button" onClick={() => setTempPajak({...tempPajak, pkp: {...tempPajak.pkp, file: 'pkp_uploaded.pdf'}})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Form: KSWP */}
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">3. Status KSWP</h3>
                                                <AiScanButton target="kswp" />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Status Validitas KSWP</label>
                                                <select className={SELECT_CLASS} value={tempPajak.kswp.status} onChange={e => setTempPajak({...tempPajak, kswp: {...tempPajak.kswp, status: e.target.value}})}>
                                                    <option>Valid (KSWP)</option>
                                                    <option>Tidak Valid</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Upload Bukti KSWP (PDF)</label>
                                                <div className="border border-slate-200 rounded-lg p-2 bg-white flex items-center justify-between">
                                                    <span className="text-xs text-slate-500">{tempPajak.kswp.file || 'Belum ada berkas terunggah.'}</span>
                                                    <button type="button" onClick={() => setTempPajak({...tempPajak, kswp: {...tempPajak.kswp, file: 'kswp_uploaded.pdf'}})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Form: SPT */}
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">4. SPT Tahunan / Bulanan</h3>
                                                <AiScanButton target="spt" />
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="col-span-2">
                                                    <label className={LABEL_CLASS}>Jenis SPT</label>
                                                    <select className={SELECT_CLASS} value={tempPajak.spt.jenis} onChange={e => setTempPajak({...tempPajak, spt: {...tempPajak.spt, jenis: e.target.value}})}>
                                                        <option>SPT Tahunan PPh Badan</option>
                                                        <option>SPT Masa PPN</option>
                                                        <option>SPT Masa PPh Pasal 21</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className={LABEL_CLASS}>Tahun Pajak</label>
                                                    <input type="text" className={INPUT_CLASS} value={tempPajak.spt.tahun} onChange={e => setTempPajak({...tempPajak, spt: {...tempPajak.spt, tahun: e.target.value}})} placeholder="Cth: 2025" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Nomor Bukti Penerimaan Elektronik (BPE)</label>
                                                <input type="text" className={INPUT_CLASS} value={tempPajak.spt.nomorBpe} onChange={e => setTempPajak({...tempPajak, spt: {...tempPajak.spt, nomorBpe: e.target.value}})} />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Upload Berkas Laporan SPT & BPE (PDF)</label>
                                                <div className="border border-slate-200 rounded-lg p-2 bg-white flex items-center justify-between">
                                                    <span className="text-xs text-slate-500">{tempPajak.spt.file || 'Belum ada berkas terunggah.'}</span>
                                                    <button type="button" onClick={() => setTempPajak({...tempPajak, spt: {...tempPajak.spt, file: 'spt_uploaded.pdf'}})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* ========== TAB: Pengurus Perusahaan ========== */}
                    {activeTab === 'tab-pengurus' && (
                        <>
                            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                                <div className="flex items-center gap-2.5">
                                    <Network size={20} className="text-blue-600" />
                                    <h2 className="text-sm font-bold text-slate-800">Pengurus Perusahaan</h2>
                                </div>
                                {viewMode === 'list' && (
                                    <button onClick={handleAddClick} className={BTN_PRIMARY}><Plus size={15} /> Tambah Pengurus</button>
                                )}
                            </div>
                            <div className="p-6">
                                {viewMode === 'list' ? (
                                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-slate-200 bg-slate-50">
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Jabatan</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Masa Jabatan</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-20">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {profileData.pengurus.map((item, idx) => (
                                                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                        <td className="px-4 py-3 font-semibold text-slate-800">{item.nama}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.jabatan}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.tglMulai} s.d. {item.tglSelesai}</td>
                                                        <td className="px-4 py-3 text-right">
                                                            <div className="flex justify-end gap-1">
                                                                <button onClick={() => handleEditClick('pengurus', idx)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><Edit3 size={14} /></button>
                                                                <button onClick={() => handleDeleteRow('pengurus', item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <label className={LABEL_CLASS}>Nama Pengurus</label>
                                            <input type="text" className={INPUT_CLASS} value={tempPengurus.nama} onChange={e => setTempPengurus({...tempPengurus, nama: e.target.value})} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Jabatan</label>
                                                <input type="text" className={INPUT_CLASS} value={tempPengurus.jabatan} onChange={e => setTempPengurus({...tempPengurus, jabatan: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>NIK / No KTP</label>
                                                <input type="text" className={INPUT_CLASS} value={tempPengurus.ktp} onChange={e => setTempPengurus({...tempPengurus, ktp: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Mulai Menjabat</label>
                                                <input type="date" className={INPUT_CLASS} value={tempPengurus.tglMulai} onChange={e => setTempPengurus({...tempPengurus, tglMulai: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Selesai Menjabat</label>
                                                <input type="date" className={INPUT_CLASS} value={tempPengurus.tglSelesai} onChange={e => setTempPengurus({...tempPengurus, tglSelesai: e.target.value})} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className={LABEL_CLASS}>Unggah SK Pengangkatan Pengurus (PDF)</label>
                                            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 flex items-center justify-between">
                                                <span className="text-xs text-slate-500">{tempPengurus.file || 'Belum ada berkas SK.'}</span>
                                                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Pilih Berkas</button>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                                            <button onClick={() => setViewMode('list')} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                                            <button onClick={() => handleSaveTableItem('pengurus', tempPengurus)} className={BTN_PRIMARY}><Check size={15} /> Simpan</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* ========== TAB: Tenaga Ahli ========== */}
                    {activeTab === 'tab-tenaga' && (
                        <>
                            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                                <div className="flex items-center gap-2.5">
                                    <Users2 size={20} className="text-blue-600" />
                                    <h2 className="text-sm font-bold text-slate-800">Tenaga Ahli & Personel</h2>
                                </div>
                                {viewMode === 'list' && (
                                    <button onClick={handleAddClick} className={BTN_PRIMARY}><Plus size={15} /> Tambah Tenaga Ahli</button>
                                )}
                            </div>
                            <div className="p-6">
                                {viewMode === 'list' ? (
                                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-slate-200 bg-slate-50">
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Pendidikan</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Keahlian</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">SKK / Sertifikat</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Pengalaman</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-20">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {profileData.tenaga.map((item, idx) => (
                                                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                        <td className="px-4 py-3 font-semibold text-slate-800">{item.nama}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.pendidikan}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.keahlian}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.skk}</td>
                                                        <td className="px-4 py-3 text-slate-600 font-bold">{item.pengalaman} Tahun</td>
                                                        <td className="px-4 py-3 text-right">
                                                            <div className="flex justify-end gap-1">
                                                                <button onClick={() => handleEditClick('tenaga', idx)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><Edit3 size={14} /></button>
                                                                <button onClick={() => handleDeleteRow('tenaga', item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                                            <div className="text-xs text-slate-500 font-medium">Gunakan pindaian AI untuk deteksi kesalahan & isi otomatis dari CV Tenaga Ahli:</div>
                                            <AiScanButton target="tenaga" />
                                        </div>

                                        <div>
                                            <label className={LABEL_CLASS}>Nama Lengkap</label>
                                            <input type="text" className={INPUT_CLASS} value={tempTenaga.nama} onChange={e => setTempTenaga({...tempTenaga, nama: e.target.value})} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Pendidikan Terakhir</label>
                                                <input type="text" className={INPUT_CLASS} value={tempTenaga.pendidikan} onChange={e => setTempTenaga({...tempTenaga, pendidikan: e.target.value})} placeholder="Cth: S1 Teknik Sipil" />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Bidang Keahlian</label>
                                                <input type="text" className={INPUT_CLASS} value={tempTenaga.keahlian} onChange={e => setTempTenaga({...tempTenaga, keahlian: e.target.value})} placeholder="Cth: Struktur" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>SKK / Sertifikat</label>
                                                <input type="text" className={INPUT_CLASS} value={tempTenaga.skk} onChange={e => setTempTenaga({...tempTenaga, skk: e.target.value})} placeholder="Cth: SKA Ahli Muda" />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Pengalaman Kerja (Tahun)</label>
                                                <input type="number" className={INPUT_CLASS} value={tempTenaga.pengalaman} onChange={e => setTempTenaga({...tempTenaga, pengalaman: Number(e.target.value)})} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Upload Ijazah Tenaga Ahli (PDF)</label>
                                                <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center justify-between">
                                                    <span className="text-xs text-slate-500 truncate max-w-[150px]">{tempTenaga.fileIjazah || 'Belum ada ijazah'}</span>
                                                    <button type="button" onClick={() => setTempTenaga({...tempTenaga, fileIjazah: 'ijazah_attached.pdf'})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Upload Curriculum Vitae (CV) (PDF)</label>
                                                <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center justify-between">
                                                    <span className="text-xs text-slate-500 truncate max-w-[150px]">{tempTenaga.fileCv || 'Belum ada CV'}</span>
                                                    <button type="button" onClick={() => setTempTenaga({...tempTenaga, fileCv: 'cv_attached.pdf'})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                                            <button onClick={() => setViewMode('list')} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                                            <button onClick={() => handleSaveTableItem('tenaga', tempTenaga)} className={BTN_PRIMARY}><Check size={15} /> Simpan</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* ========== TAB: Peralatan ========== */}
                    {activeTab === 'tab-peralatan' && (
                        <>
                            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                                <div className="flex items-center gap-2.5">
                                    <Truck size={20} className="text-blue-600" />
                                    <h2 className="text-sm font-bold text-slate-800">Daftar Peralatan Utama</h2>
                                </div>
                                {viewMode === 'list' && (
                                    <button onClick={handleAddClick} className={BTN_PRIMARY}><Plus size={15} /> Tambah Alat</button>
                                )}
                            </div>
                            <div className="p-6">
                                {viewMode === 'list' ? (
                                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-slate-200 bg-slate-50">
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Jenis Alat</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Merk / Tipe</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Kapasitas</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Kondisi</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Kepemilikan</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-20">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {profileData.peralatan.map((item, idx) => (
                                                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                        <td className="px-4 py-3 font-semibold text-slate-800">{item.jenis}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.merk}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.kapasitas}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.kondisi}</td>
                                                        <td className="px-4 py-3 text-slate-600 font-semibold text-blue-600">{item.status}</td>
                                                        <td className="px-4 py-3 text-right">
                                                            <div className="flex justify-end gap-1">
                                                                <button onClick={() => handleEditClick('peralatan', idx)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><Edit3 size={14} /></button>
                                                                <button onClick={() => handleDeleteRow('peralatan', item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                                            <div className="text-xs text-slate-500 font-medium">Gunakan pindaian AI untuk deteksi kesalahan & isi otomatis berkas pembelian alat:</div>
                                            <AiScanButton target="peralatan" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Jenis Alat</label>
                                                <input type="text" className={INPUT_CLASS} value={tempPeralatan.jenis} onChange={e => setTempPeralatan({...tempPeralatan, jenis: e.target.value})} placeholder="Cth: Dump Truck" />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Merk / Tipe</label>
                                                <input type="text" className={INPUT_CLASS} value={tempPeralatan.merk} onChange={e => setTempPeralatan({...tempPeralatan, merk: e.target.value})} placeholder="Cth: Hino Dutro" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Kapasitas</label>
                                                <input type="text" className={INPUT_CLASS} value={tempPeralatan.kapasitas} onChange={e => setTempPeralatan({...tempPeralatan, kapasitas: e.target.value})} placeholder="Cth: 4 m³" />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Tahun Pembuatan</label>
                                                <input type="text" className={INPUT_CLASS} value={tempPeralatan.tahun} onChange={e => setTempPeralatan({...tempPeralatan, tahun: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Kondisi</label>
                                                <select className={SELECT_CLASS} value={tempPeralatan.kondisi} onChange={e => setTempPeralatan({...tempPeralatan, kondisi: e.target.value})}>
                                                    <option>Baik</option>
                                                    <option>Rusak Ringan</option>
                                                    <option>Rusak Berat</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Status Kepemilikan</label>
                                                <select className={SELECT_CLASS} value={tempPeralatan.status} onChange={e => setTempPeralatan({...tempPeralatan, status: e.target.value})}>
                                                    <option>Milik Sendiri</option>
                                                    <option>Sewa</option>
                                                    <option>Sewa Beli</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Unggah Bukti Kepemilikan (Faktur/BPKB/Sewa) (PDF)</label>
                                                <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center justify-between">
                                                    <span className="text-xs text-slate-500 truncate max-w-[150px]">{tempPeralatan.fileBukti || 'Belum ada bukti'}</span>
                                                    <button type="button" onClick={() => setTempPeralatan({...tempPeralatan, fileBukti: 'bukti_alat_attached.pdf'})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                                            <button onClick={() => setViewMode('list')} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                                            <button onClick={() => handleSaveTableItem('peralatan', tempPeralatan)} className={BTN_PRIMARY}><Check size={15} /> Simpan</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* ========== TAB: Pengalaman ========== */}
                    {activeTab === 'tab-pengalaman' && (
                        <>
                            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                                <div className="flex items-center gap-2.5">
                                    <Briefcase size={20} className="text-blue-600" />
                                    <h2 className="text-sm font-bold text-slate-800">Daftar Pengalaman Paket Pekerjaan</h2>
                                </div>
                                {viewMode === 'list' && (
                                    <button onClick={handleAddClick} className={BTN_PRIMARY}><Plus size={15} /> Tambah Pengalaman</button>
                                )}
                            </div>
                            <div className="p-6">
                                {viewMode === 'list' ? (
                                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-slate-200 bg-slate-50">
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Paket Pekerjaan</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Nilai Kontrak</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status Proyek</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Fisik (%)</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Lampiran Berkas</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-20">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {profileData.pengalaman.map((item, idx) => (
                                                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                        <td className="px-4 py-3 max-w-[200px]">
                                                            <div className="font-semibold text-slate-800 truncate mb-0.5">{item.paket}</div>
                                                            <div className="text-[10px] text-slate-400 truncate">{item.pengguna}</div>
                                                        </td>
                                                        <td className="px-4 py-3 text-slate-800 font-bold">{item.nilai}</td>
                                                        <td className="px-4 py-3">
                                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border 
                                                                ${item.status === 'Sedang Berjalan' 
                                                                    ? 'bg-amber-50 text-amber-700 border-amber-200/50' 
                                                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200/50'}`}>
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 font-semibold text-slate-700">{item.progress}%</td>
                                                        <td className="px-4 py-3 text-xs text-slate-400 space-y-0.5">
                                                            <div className="truncate max-w-[120px]">Kontrak: {item.fileKontrak || '-'}</div>
                                                            <div className="truncate max-w-[120px]">BASTP (PHO): {item.fileBastp || '-'}</div>
                                                            <div className="truncate max-w-[120px]">BAST (FHO): {item.fileBast || '-'}</div>
                                                        </td>
                                                        <td className="px-4 py-3 text-right">
                                                            <div className="flex justify-end gap-1">
                                                                <button onClick={() => handleEditClick('pengalaman', idx)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><Edit3 size={14} /></button>
                                                                <button onClick={() => handleDeleteRow('pengalaman', item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                                            <div className="text-xs text-slate-500 font-medium">Gunakan pindaian AI untuk deteksi kesalahan & isi otomatis dari Dokumen Kontrak:</div>
                                            <AiScanButton target="pengalaman" />
                                        </div>

                                        <div>
                                            <label className={LABEL_CLASS}>Nama Paket Pekerjaan</label>
                                            <input type="text" className={INPUT_CLASS} value={tempPengalaman.paket} onChange={e => setTempPengalaman({...tempPengalaman, paket: e.target.value})} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Bidang Pekerjaan</label>
                                                <input type="text" className={INPUT_CLASS} value={tempPengalaman.bidang} onChange={e => setTempPengalaman({...tempPengalaman, bidang: e.target.value})} placeholder="Cth: Gedung" />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Pengguna Jasa / Instansi</label>
                                                <input type="text" className={INPUT_CLASS} value={tempPengalaman.pengguna} onChange={e => setTempPengalaman({...tempPengalaman, pengguna: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="col-span-2">
                                                <label className={LABEL_CLASS}>Nomor Kontrak</label>
                                                <input type="text" className={INPUT_CLASS} value={tempPengalaman.kontrak} onChange={e => setTempPengalaman({...tempPengalaman, kontrak: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Nilai Kontrak (Rp)</label>
                                                <input type="text" className={INPUT_CLASS} value={tempPengalaman.nilai} onChange={e => setTempPengalaman({...tempPengalaman, nilai: e.target.value})} placeholder="Cth: Rp 1.500.000.000" />
                                            </div>
                                        </div>
                                        
                                        {/* Status & Progress */}
                                        <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                            <div className="col-span-2">
                                                <label className={LABEL_CLASS}>Status Pekerjaan</label>
                                                <select 
                                                    className={SELECT_CLASS} 
                                                    value={tempPengalaman.status} 
                                                    onChange={e => {
                                                        const stat = e.target.value;
                                                        setTempPengalaman({
                                                            ...tempPengalaman, 
                                                            status: stat,
                                                            progress: stat === 'Selesai' ? 100 : (tempPengalaman.progress === 100 ? 50 : tempPengalaman.progress)
                                                        });
                                                    }}
                                                >
                                                    <option value="Selesai">Selesai (100%) [Untuk menghitung KD]</option>
                                                    <option value="Sedang Berjalan">Sedang Berjalan (Belum 100%) [Untuk menghitung SKP]</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Progress Fisik (%)</label>
                                                <input 
                                                    type="number" 
                                                    className={INPUT_CLASS} 
                                                    disabled={tempPengalaman.status === 'Selesai'} 
                                                    value={tempPengalaman.progress} 
                                                    onChange={e => setTempPengalaman({...tempPengalaman, progress: Number(e.target.value)})} 
                                                    min="0" max="99"
                                                />
                                            </div>
                                        </div>

                                        {/* Multi-uploads */}
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Lampiran Dokumen Pengalaman (PDF)</h4>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="text-[10px] font-bold text-slate-500 mb-1 block">1. File Kontrak</label>
                                                    <div className="border border-slate-200 rounded p-1.5 bg-slate-50 flex items-center justify-between text-xs">
                                                        <span className="truncate max-w-[80px]">{tempPengalaman.fileKontrak || 'Tidak ada'}</span>
                                                        <button type="button" onClick={() => setTempPengalaman({...tempPengalaman, fileKontrak: 'kontrak_attached.pdf'})} className="text-blue-600 font-bold hover:underline">Upload</button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-slate-500 mb-1 block">2. File BASTP (PHO)</label>
                                                    <div className="border border-slate-200 rounded p-1.5 bg-slate-50 flex items-center justify-between text-xs">
                                                        <span className="truncate max-w-[80px]">{tempPengalaman.fileBastp || 'Tidak ada'}</span>
                                                        <button type="button" onClick={() => setTempPengalaman({...tempPengalaman, fileBastp: 'pho_attached.pdf'})} className="text-blue-600 font-bold hover:underline">Upload</button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-slate-500 mb-1 block">3. File BAST (FHO)</label>
                                                    <div className="border border-slate-200 rounded p-1.5 bg-slate-50 flex items-center justify-between text-xs">
                                                        <span className="truncate max-w-[80px]">{tempPengalaman.fileBast || 'Tidak ada'}</span>
                                                        <button type="button" onClick={() => setTempPengalaman({...tempPengalaman, fileBast: 'fho_attached.pdf'})} className="text-blue-600 font-bold hover:underline">Upload</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                                            <button onClick={() => setViewMode('list')} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                                            <button onClick={() => handleSaveTableItem('pengalaman', tempPengalaman)} className={BTN_PRIMARY}><Check size={15} /> Simpan</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* ========== TAB: Sertifikat ========== */}
                    {activeTab === 'tab-sertifikat' && (
                        <>
                            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
                                <div className="flex items-center gap-2.5">
                                    <ShieldCheck size={20} className="text-blue-600" />
                                    <h2 className="text-sm font-bold text-slate-800">Sertifikat Manajemen (ISO, K3, dll)</h2>
                                </div>
                                {viewMode === 'list' && (
                                    <button onClick={handleAddClick} className={BTN_PRIMARY}><Plus size={15} /> Tambah Sertifikat</button>
                                )}
                            </div>
                            <div className="p-6">
                                {viewMode === 'list' ? (
                                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                                        <table className="w-full text-left text-sm">
                                            <thead>
                                                <tr className="border-b border-slate-200 bg-slate-50">
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Sertifikat</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Penerbit</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Nomor Sertifikat</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Masa Berlaku</th>
                                                    <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-20">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {profileData.sertifikat.map((item, idx) => (
                                                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                                        <td className="px-4 py-3 font-semibold text-slate-800">{item.nama}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.penerbit}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.nomor}</td>
                                                        <td className="px-4 py-3 text-slate-600">{item.berlaku}</td>
                                                        <td className="px-4 py-3 text-right">
                                                            <div className="flex justify-end gap-1">
                                                                <button onClick={() => handleEditClick('sertifikat', idx)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><Edit3 size={14} /></button>
                                                                <button onClick={() => handleDeleteRow('sertifikat', item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <label className={LABEL_CLASS}>Nama Sertifikat</label>
                                            <input type="text" className={INPUT_CLASS} value={tempSertifikat.nama} onChange={e => setTempSertifikat({...tempSertifikat, nama: e.target.value})} placeholder="Cth: ISO 9001:2015" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Instansi Penerbit</label>
                                                <input type="text" className={INPUT_CLASS} value={tempSertifikat.penerbit} onChange={e => setTempSertifikat({...tempSertifikat, penerbit: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Nomor Sertifikat</label>
                                                <input type="text" className={INPUT_CLASS} value={tempSertifikat.nomor} onChange={e => setTempSertifikat({...tempSertifikat, nomor: e.target.value})} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className={LABEL_CLASS}>Tanggal Terbit</label>
                                                <input type="date" className={INPUT_CLASS} value={tempSertifikat.terbit} onChange={e => setTempSertifikat({...tempSertifikat, terbit: e.target.value})} />
                                            </div>
                                            <div>
                                                <label className={LABEL_CLASS}>Berlaku s.d. / Kedaluwarsa</label>
                                                <input type="date" className={INPUT_CLASS} value={tempSertifikat.berlaku} onChange={e => setTempSertifikat({...tempSertifikat, berlaku: e.target.value})} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className={LABEL_CLASS}>Unggah Berkas Sertifikat (PDF)</label>
                                            <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center justify-between">
                                                <span className="text-xs text-slate-500">{tempSertifikat.file || 'Belum ada sertifikat'}</span>
                                                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Pilih Berkas</button>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                                            <button onClick={() => setViewMode('list')} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                                            <button onClick={() => handleSaveTableItem('sertifikat', tempSertifikat)} className={BTN_PRIMARY}><Check size={15} /> Simpan</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                </div>
            </div>

            {/* ========== OVERLAY MODAL: AI DOCUMENT SCANNER SIMULATOR ========== */}
            {isAiModalOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
                    <div className="relative bg-slate-900 text-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
                            <div className="flex items-center gap-2">
                                <Sparkles className="text-blue-400 animate-pulse" size={18} />
                                <span className="text-sm font-bold tracking-tight">AI Document Reader & Validator</span>
                            </div>
                            {aiScanStatus === 'done' && (
                                <button onClick={() => setIsAiModalOpen(false)} className="text-slate-400 hover:text-white rounded-full p-1 cursor-pointer"><X size={18} /></button>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            
                            {/* Scanning Progress */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-semibold text-slate-400">
                                    <span>{aiScanStatus === 'scanning' ? 'Mengekstrak data dari dokumen...' : 'Pindaian AI Selesai'}</span>
                                    <span>{aiScanProgress}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300" style={{ width: `${aiScanProgress}%` }}></div>
                                </div>
                            </div>

                            {/* OCR Logs / Terminal */}
                            <div className="bg-slate-950 rounded-lg p-4 font-mono text-[11px] text-slate-300 border border-slate-800/80 space-y-2 max-h-40 overflow-y-auto">
                                {aiScanLogs.map((log, idx) => (
                                    <div key={idx} className="flex gap-2 items-start">
                                        <span className="text-slate-500 select-none">&gt;</span>
                                        <span>{log}</span>
                                    </div>
                                ))}
                                {aiScanStatus === 'scanning' && (
                                    <div className="flex items-center gap-1.5 text-blue-400">
                                        <Loader2 size={12} className="animate-spin" />
                                        <span>Membaca dokumen...</span>
                                    </div>
                                )}
                            </div>

                            {/* Detected OCR Fields */}
                            {aiScanStatus === 'done' && (
                                <div className="space-y-4 pt-4 border-t border-slate-800">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hasil Pembacaan Dokumen (OCR)</h4>
                                    
                                    <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-lg border border-slate-800/60">
                                        {Object.entries(aiDetectedData).map(([key, val]) => (
                                            <div key={key}>
                                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">{key}</div>
                                                <div className="text-xs font-bold text-white">{val}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Warnings if any */}
                                    {aiWarning && (
                                        <div className="flex items-start gap-2.5 p-3.5 bg-rose-950/40 border border-rose-900/50 rounded-lg text-rose-300 text-xs">
                                            <AlertCircle size={15} className="shrink-0 mt-0.5" />
                                            <div>
                                                <div className="font-bold">Peringatan Kesesuaian</div>
                                                <div className="opacity-90">{aiWarning}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex justify-end gap-3">
                            <button 
                                onClick={() => setIsAiModalOpen(false)}
                                className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white bg-transparent hover:bg-slate-900 rounded-lg border border-slate-800 transition-all cursor-pointer"
                            >
                                {aiScanStatus === 'done' ? 'Tutup' : 'Batal'}
                            </button>
                            {aiScanStatus === 'done' && (
                                <button 
                                    onClick={applyAiAutofill}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer"
                                >
                                    <Check size={14} /> Terapkan Autofill
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
