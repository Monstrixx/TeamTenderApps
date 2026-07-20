import React, { useState, useEffect } from 'react';
import {
    Database, Table, Calculator, HardDrive, Lock, FileDown, PlusCircle, PenTool, BookOpen, 
    Sparkles, ShieldAlert, FileText, CheckCircle2, ChevronRight, Download, FileSpreadsheet, UploadCloud, TrendingDown, Zap, Settings, 
    Printer, Send, Sliders, RefreshCw, Layers, Calendar, AlertTriangle, 
    HelpCircle, UserCheck, DollarSign, Cpu, Trash2, Edit3, Plus, Search, Eye,
    Shield, CalendarDays, Users
} from 'lucide-react';

const INPUT_STYLE = "px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
const SELECT_STYLE = "px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer";
const LABEL = "block text-[10px] font-bold text-slate-450 uppercase tracking-wider mb-1.5";

export default function Workspace() {
    const [subTab, setSubTab] = useState('overview'); // 'overview' | 'permohonan' | 'rab' | 'rkk' | 'schedule'
    
    // Tender Metadata
    const tenderMeta = {
        namaPaket: "Hibah Barang Pembangunan Gedung PGRI Rembang",
        hps: 2889720000.00,
        pokja: "Pokja Pemilihan Hibah Barang Gedung PGRI",
        lokasi: "Kec. Rembang, Kab. Rembang, Jawa Tengah",
        tglSelesai: "2026-07-25T14:00:00"
    };

    // AI Agents Activity Logs
    const [aiLogs, setAiLogs] = useState([
        { time: "09:12", agent: "Sistem Penyusunan", msg: "Draf Surat Permohonan Dukungan Peralatan berhasil disiapkan." },
        { time: "09:15", agent: "Sistem Validasi", msg: "Memulai proses validasi kelengkapan berkas kualifikasi." },
        { time: "09:18", agent: "Sistem Estimasi", msg: "Melakukan pemetaan item kuantitas BOQ dengan referensi AHSP standar PUPR." }
    ]);

    // Supplier Directory for Requests
    const supplierDirectory = [
        { id: "s1", nama: "PT. Rental Alat Nusantara", alamat: "Jl. Pemuda No. 12, Rembang", kontak: "Rudi Hermawan (0812-3456-789)" },
        { id: "s2", nama: "CV. Material Utama Sejahtera", alamat: "Jl. Pantura Km. 4, Rembang", kontak: "H. Slamet (0821-9876-543)" }
    ];

    const [selectedSupplier, setSelectedSupplier] = useState('s1');
    const [requestLetterNo, setRequestLetterNo] = useState("015/PM-MK/VII/2026");
    const [requestPreviewText, setRequestPreviewText] = useState("");

    // RAB Workspace States
    const [pricingStrategy, setPricingStrategy] = useState('original'); // 'original' | 'percent' | 'nominal'
    const [targetPercentage, setTargetPercentage] = useState(5); // % reduction
    const [targetNominal, setTargetNominal] = useState(2500000000.00); // Nominal target
    const [useLumpsumOverride, setUseLumpsumOverride] = useState(false);
    const [isBoqUploaded, setIsBoqUploaded] = useState(false);
    const [isSimulatingAi, setIsSimulatingAi] = useState(false);
    const [rabActiveSheet, setRabActiveSheet] = useState('hsd'); // 'hsd' | 'ahsp' | 'boq' | 'rekap'
    const [profitMargin, setProfitMargin] = useState(10); // Default 10%
    const [rabTotal, setRabTotal] = useState(11500000000); // Dummy HPS
    const [isApendoSyncing, setIsApendoSyncing] = useState(false);

    const [isSpseFilled, setIsSpseFilled] = useState(false);
    const [isSpseFilling, setIsSpseFilling] = useState(false);

    // Persyaratan Kualifikasi & KSO States
    const [kualifikasiSubTab, setKualifikasiSubTab] = useState('validation'); // 'validation' | 'kdskp' | 'spse' | 'kso'
    const [selectedKsoPartnerId, setSelectedKsoPartnerId] = useState('');
    const [ksoModalShare, setKsoModalShare] = useState(0); // 0 means not connected, we sync it from admin document
    const [ksoShareStatus, setKsoShareStatus] = useState('Unsynced'); // 'Unsynced' | 'Synced'
    const [simulatedRole, setSimulatedRole] = useState('owner'); // 'owner' | 'estimator' | 'partner'
    const [isKdSkpPrinted, setIsKdSkpPrinted] = useState(false);
    const [isFormulirSaved, setIsFormulirSaved] = useState(false);

    // Persyaratan Teknis States
    const [teknisSubTab, setTeknisSubTab] = useState('personel'); // 'personel' | 'peralatan' | 'rkk' | 'dukungan' | 'jadwal' | 'metode' | 'rmpk'

    // New Teknis States
    const [personelList, setPersonelList] = useState([
        { 
            id: 'p1', nama: 'Budi Santoso, ST', jabatan: 'Manajer Pelaksanaan/Proyek', 
            tempatLahir: 'Semarang', tglLahir: '15/08/1985', pendidikan: 'S1 Teknik Sipil, Universitas Diponegoro (2007)',
            pengalaman: [
                { tahun: 2024, nama: 'Pembangunan RSUD Kota', lokasi: 'Semarang', pemberi: 'Dinas Kesehatan', perusahaan: 'PT. Maju Konstruksi', tugas: 'Manajer Proyek', waktu: '8 Bulan', posisi: 'Manajer Pelaksanaan' },
                { tahun: 2023, nama: 'Pembangunan Gedung Perkantoran', lokasi: 'Demak', pemberi: 'Kementerian PUPR', perusahaan: 'PT. Maju Konstruksi', tugas: 'Manajer Proyek', waktu: '10 Bulan', posisi: 'Manajer Pelaksanaan' }
            ]
        },
        { 
            id: 'p2', nama: 'Siti Aminah, ST', jabatan: 'Ahli K3 Konstruksi', 
            tempatLahir: 'Kendal', tglLahir: '22/03/1990', pendidikan: 'S1 Teknik Sipil, Universitas Negeri Semarang (2012)',
            pengalaman: [
                { tahun: 2024, nama: 'Pembangunan RSUD Kota', lokasi: 'Semarang', pemberi: 'Dinas Kesehatan', perusahaan: 'PT. Maju Konstruksi', tugas: 'Mengawasi K3', waktu: '8 Bulan', posisi: 'Ahli K3' }
            ]
        }
    ]);
    const [selectedPersonelId, setSelectedPersonelId] = useState('p1');

    const [peralatanList, setPeralatanList] = useState([
        { id: 'eq1', jenis: 'Excavator', merek: 'Komatsu PC200', kapasitas: '0.8 m3', jumlah: 2, status: 'Milik Sendiri' },
        { id: 'eq2', jenis: 'Dump Truck', merek: 'Hino Dutro', kapasitas: '8 Ton', jumlah: 5, status: 'Sewa' },
        { id: 'eq3', jenis: 'Concrete Mixer', merek: 'Hercules', kapasitas: '0.3 m3', jumlah: 3, status: 'Milik Sendiri' }
    ]);

    // Update RKK Section States to accommodate TOC
    const [rkkMenu, setRkkMenu] = useState('cover'); // 'cover' | 'pakta' | 'kepemimpinan' | 'ibprp' | 'sasaran' | 'dukungan' | 'operasi' | 'evaluasi'


    // Individual document validation states
    const [docValidation, setDocValidation] = useState({
        nib: { name: 'NIB (Nomor Induk Berusaha)', status: 'unvalidated', value: '9120004561239', detail: 'KBLI Jasa Konstruksi Aktif' },
        sbu: { name: 'SBU (Sertifikat Badan Usaha)', status: 'unvalidated', value: 'BG009 - Konstruksi Gedung', detail: 'Berlaku s/d: 14 Des 2028' },
        aktaPendirian: { name: 'Akta Pendirian', status: 'unvalidated', value: 'Akta No. 12 (Notaris R. Suprapto, SH - 2018)', detail: 'SK Kemenkumham Terdaftar' },
        aktaPerubahan: { name: 'Akta Perubahan Terakhir', status: 'unvalidated', value: 'Akta No. 04 (2024)', detail: 'SK Kemenkumham Terdaftar' },
        npwp: { name: 'NPWP Perusahaan', status: 'unvalidated', value: '01.234.567.8-012.000', detail: 'KPP Pratama Rembang' },
        pkp: { name: 'Pengukuhan PKP', status: 'unvalidated', value: 'SPPKP: S-12PKP/WPJ.04/2020', detail: 'Status PKP Aktif' },
        kswp: { name: 'Status KSWP', status: 'unvalidated', value: 'VALID (Keterangan Fiskal)', detail: 'Status Valid' },
        spt: { name: 'SPT Tahunan', status: 'unvalidated', value: 'SPT Tahunan 2025 (BPE Terbit)', detail: 'Tahun Pajak 2025' },
        pengalaman: { name: 'Pengalaman Proyek (Kontrak/BAST)', status: 'unvalidated', value: 'Pembangunan Gedung Serbaguna Rembang', detail: 'Nilai Kontrak Rp 4.100.000.000, BASTP Lengkap' },
        sertifikat: { name: 'Sertifikat Lainnya (ISO/K3)', status: 'unvalidated', value: 'ISO 9001:2015 & OHSAS 18001', detail: 'Masa berlaku s/d 10 Okt 2027' }
    });
    const [isValidatingAll, setIsValidatingAll] = useState(false);

    const handleValidateDoc = (key) => {
        setDocValidation(prev => ({
            ...prev,
            [key]: { ...prev[key], status: 'validating' }
        }));
        setTimeout(() => {
            setDocValidation(prev => ({
                ...prev,
                [key]: { ...prev[key], status: 'valid' }
            }));
            setAiLogs(logs => [
                ...logs,
                { 
                    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), 
                    agent: "Sistem Validasi", 
                    msg: `Dokumen ${key.toUpperCase()} berhasil divalidasi dan dicocokkan dengan persyaratan tender. Status: VALID.` 
                }
            ]);
        }, 1000);
    };

    const handleValidateAll = () => {
        setIsValidatingAll(true);
        const keys = Object.keys(docValidation);
        keys.forEach((key, index) => {
            setTimeout(() => {
                setDocValidation(prev => ({
                    ...prev,
                    [key]: { ...prev[key], status: 'validating' }
                }));
                setTimeout(() => {
                    setDocValidation(prev => ({
                        ...prev,
                        [key]: { ...prev[key], status: 'valid' }
                    }));
                    setAiLogs(logs => [
                        ...logs,
                        { 
                            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), 
                            agent: "Sistem Validasi", 
                            msg: `Dokumen ${key.toUpperCase()} berhasil divalidasi secara otomatis. Status: VALID.` 
                        }
                    ]);
                    if (index === keys.length - 1) {
                        setIsValidatingAll(false);
                    }
                }, 800);
            }, index * 1000);
        });
    };

    // Dokumen Administrasi States
    const [adminSubTab, setAdminSubTab] = useState('penawaran'); // 'penawaran' | 'kso' | 'jaminan'
    const [useApendoLetter, setUseApendoLetter] = useState(true);
    const [adminKsoName, setAdminKsoName] = useState('KSO Maju Sinergi');
    const [adminKsoLeaderShare, setAdminKsoLeaderShare] = useState(60);
    const [adminKsoMemberShare, setAdminKsoMemberShare] = useState(40);
    const [adminKsoUploadedFile, setAdminKsoUploadedFile] = useState(null);
    
    const [adminBidBondRequired, setAdminBidBondRequired] = useState(false);
    const [adminBidBondPercent, setAdminBidBondPercent] = useState(2);
    const [adminBidBondDays, setAdminBidBondDays] = useState(90);
    const [adminBidBondIssuer, setAdminBidBondIssuer] = useState('PT. Bank Rakyat Indonesia (Persero) Tbk');
    const [adminBidBondUploadedFile, setAdminBidBondUploadedFile] = useState(null);
    const [adminBidBondAiLogs, setAdminBidBondAiLogs] = useState([]);
    const [adminIsScanningBidBond, setAdminIsScanningBidBond] = useState(false);

    const handleUploadKsoFile = (e) => {
        if(e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAdminKsoUploadedFile(file.name);
            setAiLogs(logs => [
                ...logs,
                { time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), agent: "Sistem Penyusunan", msg: `Surat Perjanjian KSO asli (${file.name}) berhasil diunggah.` }
            ]);
        }
    };

    const handleUploadBidBondFile = (e) => {
        if(e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAdminBidBondUploadedFile(file.name);
            setAdminIsScanningBidBond(true);
            setAdminBidBondAiLogs([
                { status: 'info', msg: 'Memulai verifikasi otomatis untuk Jaminan Penawaran...' },
            ]);

            setTimeout(() => {
                setAdminBidBondAiLogs(prev => [
                    ...prev,
                    { status: 'scan', msg: 'Mengekstrak teks scan... OK' },
                    { status: 'scan', msg: `Mencocokkan penerbit: ${adminBidBondIssuer}... COCOK` },
                ]);
                
                setTimeout(() => {
                    const expectedNominal = Math.floor(tenderMeta.hps * (adminBidBondPercent / 100));
                    setAdminBidBondAiLogs(prev => [
                        ...prev,
                        { status: 'scan', msg: `Mencocokkan nilai nominal: Rp ${expectedNominal.toLocaleString('id-ID')}... COCOK` },
                        { status: 'scan', msg: `Mencocokkan masa berlaku: ${adminBidBondDays} hari kalender... COCOK` },
                        { status: 'success', msg: 'HASIL VERIFIKASI: Dokumen Jaminan Penawaran 100% VALID dan memenuhi syarat LDP!' }
                    ]);
                    setAdminIsScanningBidBond(false);
                    setAiLogs(logs => [
                        ...logs,
                        { time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), agent: "Sistem Validasi", msg: `Jaminan Penawaran (${file.name}) telah diverifikasi dan memenuhi persyaratan.` }
                    ]);
                }, 1200);
            }, 1000);
        }
    };

    // KSO Partners directory mock (synced from global list)
    const ksoPartnersList = [
        { id: 'kso1', nama: "PT. KSO Karya Pratama", email: "admin@karyapratama.co.id", SBU: "BG009 - Gedung", KD_Individual: 4200000000.00, SKP_Individual: 4 },
        { id: 'kso2', nama: "CV. Sinergi Beton Nusantara", email: "tender@sinergibeton.com", SBU: "SP004 - Beton", KD_Individual: 1500000000.00, SKP_Individual: 3 }
    ];

    // Default basic prices (Upah, Bahan, Alat)
    const [upahList, setUpahList] = useState([
        { id: "u1", nama: "Pekerja", harga: 110000.00 },
        { id: "u2", nama: "Tukang Batu", harga: 130000.00 },
        { id: "u3", nama: "Kepala Tukang", harga: 145000.00 },
        { id: "u4", nama: "Mandor", harga: 160000.00 }
    ]);

    const [bahanList, setBahanList] = useState([
        { id: "b1", nama: "Semen Portland (per 50kg)", harga: 72000.00 },
        { id: "b2", nama: "Pasir Beton (per m³)", harga: 230000.00 },
        { id: "b3", nama: "Batu Pecah 2/3 (per m³)", harga: 290000.00 },
        { id: "b4", nama: "Besi Beton Polos (per kg)", harga: 12500.00 }
    ]);

    const [alatList, setAlatList] = useState([
        { id: "e1", nama: "Excavator (sewa per jam)", harga: 275000.00 },
        { id: "e2", nama: "Dump Truck (sewa per hari)", harga: 850000.00 },
        { id: "e3", nama: "Concrete Mixer (sewa per hari)", harga: 350000.00 }
    ]);

    // AHSP (Analisa Harga Satuan Pekerjaan)
    const ahspItems = [
        { 
            id: "a1", 
            nama: "1 m³ Beton Mutu f'c = 19.3 MPa (K225)", 
            upah: [ { item: "u1", koef: 1.65 }, { item: "u2", koef: 0.275 }, { item: "u3", koef: 0.028 }, { item: "u4", koef: 0.083 } ],
            bahan: [ { item: "b1", koef: 7.42 }, { item: "b2", koef: 0.499 }, { item: "b3", koef: 0.776 } ],
            alat: [ { item: "e3", koef: 0.15 } ]
        },
        {
            id: "a2",
            nama: "1 m³ Galian Tanah Keras (Kedalaman 1m)",
            upah: [ { item: "u1", koef: 0.75 }, { item: "u4", koef: 0.025 } ],
            bahan: [],
            alat: [ { item: "e1", koef: 0.05 } ]
        }
    ];

    // Quantities & Base Prices for BOQ
    const [boqList, setBoqList] = useState([
        { id: "bq1", nama: "Pekerjaan Galian Tanah Struktur Gedung", vol: 245.0, sat: "m³", ahspId: "a2" },
        { id: "bq2", nama: "Pekerjaan Beton Struktur Utama K225", vol: 180.0, sat: "m³", ahspId: "a1" },
        { id: "bq3", nama: "Pekerjaan Finishing Cat Dinding Gedung (Lumpsum)", vol: 1, sat: "LS", isLumpsum: true, basePrice: 45000000.00 }
    ]);

    // Live calculations based on strategies
    const getBasePrice = (type, itemId) => {
        if (type === 'upah') return upahList.find(u => u.id === itemId)?.harga || 0;
        if (type === 'bahan') return bahanList.find(b => b.id === itemId)?.harga || 0;
        if (type === 'alat') return alatList.find(e => e.id === itemId)?.harga || 0;
        return 0;
    };

    const calculateAhspTotal = (ahsp) => {
        const upahCost = ahsp.upah.reduce((sum, u) => sum + (u.koef * getBasePrice('upah', u.item)), 0);
        const bahanCost = ahsp.bahan.reduce((sum, b) => sum + (b.koef * getBasePrice('bahan', b.item)), 0);
        const alatCost = ahsp.alat.reduce((sum, e) => sum + (e.koef * getBasePrice('alat', e.item)), 0);
        return parseFloat((upahCost + bahanCost + alatCost).toFixed(2));
    };

    const getBoqUnitRate = (item) => {
        if (item.isLumpsum) {
            let price = item.basePrice;
            if (pricingStrategy === 'percent') {
                price = price * (1 - targetPercentage / 100);
            }
            return parseFloat(price.toFixed(2));
        }
        const ahsp = ahspItems.find(a => a.id === item.ahspId);
        if (!ahsp) return 0;
        let rate = calculateAhspTotal(ahsp);

        if (pricingStrategy === 'percent') {
            rate = rate * (1 - targetPercentage / 100);
        }
        return parseFloat(rate.toFixed(2));
    };

    const getBoqTotal = (item) => {
        return parseFloat((item.vol * getBoqUnitRate(item)).toFixed(2));
    };

    const getGrandTotal = () => {
        const sum = boqList.reduce((sum, item) => sum + getBoqTotal(item), 0);
        
        // If nominal target strategy is set and lumpsum override is active, adjust the lumpsum item to hit the nominal target exactly
        if (pricingStrategy === 'nominal' && useLumpsumOverride) {
            return targetNominal;
        }
        
        return parseFloat(sum.toFixed(2));
    };

    // Auto-update request letter preview
    useEffect(() => {
        const supplier = supplierDirectory.find(s => s.id === selectedSupplier);
        if (!supplier) return;
        setRequestPreviewText(
            `KOP SURAT PERUSAHAAN\n` +
            `PT. MAJU KONSTRUKSI\n` +
            `=============================================================\n\n` +
            `Nomor   : ${requestLetterNo}\n` +
            `Lampiran: 1 (Satu) Berkas\n` +
            `Hal     : Permohonan Dukungan Sewa Peralatan Utama\n\n` +
            `Kepada Yth.\n` +
            `Pimpinan ${supplier.nama}\n` +
            `di Tempat\n\n` +
            `Dengan hormat,\n` +
            `Sehubungan dengan keikutsertaan kami, PT. Maju Konstruksi, dalam proses pelelangan pekerjaan:\n\n` +
            `Nama Paket Pekerjaan : Pembangunan Gedung PGRI Rembang\n` +
            `Nilai HPS            : Rp 2.889.720.000,00\n` +
            `Pokja Pemilihan      : ${tenderMeta.pokja}\n` +
            `Alamat Pokja         : Bagian PBJ, Setda Kab. Rembang\n\n` +
            `Maka dengan ini kami mengajukan permohonan dukungan sewa peralatan utama berupa:\n` +
            `1. Dump Truck Kapasitas 4 m³ (2 Unit)\n` +
            `2. Concrete Mixer Kapasitas 0.3 m³ (1 Unit)\n\n` +
            `Kami berharap Pihak ${supplier.nama} dapat menerbitkan Surat Perjanjian Sewa Peralatan spesifik untuk tender tersebut di atas sebagai kelengkapan dokumen teknis kami.\n\n` +
            `Demikian surat permohonan ini kami sampaikan. Atas perhatian dan kerja samanya kami ucapkan terima kasih.\n\n\n` +
            `Jakarta, 19 Juli 2026\n` +
            `PT. Maju Konstruksi,\n\n\n\n\n` +
            `Ir. Budi Santoso\n` +
            `Direktur Utama`
        );
    }, [selectedSupplier, requestLetterNo]);

    // RKK & RMPK States
    const [selectedRkkSection, setSelectedRkkSection] = useState('bahaya');
    const [isRkkProcessing, setIsRkkGenerating] = useState(false);
    const [rkkProgress, setRkkProgress] = useState(100);
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
    const [rkkContent, setRkkContent] = useState({
        kebijakan: "PT. Maju Konstruksi berkomitmen penuh untuk menjamin keselamatan kerja karyawan dan seluruh stakeholder di area Pembangunan Gedung PGRI Rembang...",
        bahaya: [
            { no: 1, pekerjaan: "Galian Tanah Struktur Gedung", risiko: "Pekerja tertimbun longsoran galian tanah", mitigasi: "Memasang cerucuk bambu/turap penahan tanah di pinggiran galian" },
            { no: 2, pekerjaan: "Pekerjaan Beton Struktur Utama", risiko: "Pekerja terkena cipratan cairan beton panas atau tertimpa bucket beton", mitigasi: "Wajib menggunakan helm, kacamata pelindung, rompi reflektif, dan menjaga jarak radius putar mixer" }
        ]
    });

    const triggerRkkGenerate = () => {
        setIsRkkGenerating(true);
        setRkkProgress(0);
        const interval = setInterval(() => {
            setRkkProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setIsRkkGenerating(false);
                    // Add a new risk identification dynamically based on tender context
                    setRkkContent(prev => ({
                        ...prev,
                        bahaya: [
                            ...prev.bahaya,
                            { no: 3, pekerjaan: "Pekerjaan Rangka Atap Baja", risiko: "Jatuh dari ketinggian > 5 meter", mitigasi: "Penyediaan Full Body Harness dengan anchor point yang teruji dan jaring pengaman (safety net)" }
                        ]
                    }));
                    setAiLogs(logs => [...logs, { time: "09:25", agent: "Sistem Penyusunan", msg: "Identifikasi Bahaya RKK diperbarui dengan klausul K3 atap baja." }]);
                    return 100;
                }
                return p + 25;
            });
        }, 300);
    };

    // SPSE Transfer Simulation
    const handleSpseFillBack = () => {
        setIsSpseFilling(true);
        setTimeout(() => {
            setIsSpseFilling(false);
            setIsSpseFilled(true);
            setAiLogs(logs => [...logs, { time: "09:30", agent: "Sistem Estimasi", msg: "Sukses mengisi balik harga satuan penawaran ke template SPSE Excel (2 desimal presisi)." }]);
        }, 1500);
    };

    return (
        <div className="w-full">
            {/* Header Area */}
            <div className="flex items-center justify-between p-4 mb-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold shadow-md">
                        <Layers size={20} />
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-slate-800">Workspace Tender: {tenderMeta.namaPaket}</h1>
                        <p className="text-xs text-slate-500 font-medium">Batas Pemasukan: 25 Juli 2026, 14:00 WIB (H-6)</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full animate-pulse flex items-center gap-1">
                        <AlertTriangle size={12} /> Live Compliance: 92.4%
                    </span>
                    <button onClick={handleSpseFillBack} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-sm cursor-pointer">
                        <Printer size={13} /> Ekspor Berkas Penawaran
                    </button>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6">
                
                {/* Left Sidebar Menu */}
                <div className="space-y-2">
                    {[
                        { id: 'overview', label: 'Resume Persyaratan', icon: Cpu },
                        { id: 'administrasi', label: 'Dokumen Administrasi', icon: FileText },
                        { id: 'kualifikasi', label: 'Dokumen Kualifikasi', icon: UserCheck },
                        { id: 'teknis', label: 'Dokumen Teknis', icon: Layers },
                        { id: 'rab', label: 'Penawaran Harga', icon: DollarSign },
                    ].filter(tab => {
                        if (simulatedRole === 'estimator') {
                            return tab.id === 'rab';
                        }
                        if (simulatedRole === 'partner') {
                            return tab.id === 'kualifikasi' || tab.id === 'overview' || tab.id === 'administrasi';
                        }
                        return true;
                    }).map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setSubTab(tab.id)}
                            className={`w-full flex items-center gap-2.5 px-4 py-3 text-left text-xs font-bold rounded-xl border transition-all cursor-pointer
                                ${subTab === tab.id 
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        >
                            <tab.icon size={15} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Main Action Board */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                    
                    {/* ========== TAB 1: RESUME PERSYARATAN ========== */}
                    {subTab === 'overview' && (
                        <div className="flex flex-col h-full bg-slate-50 p-6 overflow-y-auto">
                            <div className="max-w-4xl mx-auto w-full space-y-8">
                                
                                {/* Overall Progress */}
                                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                                    <div className="flex justify-between items-end mb-4">
                                        <div>
                                            <h2 className="text-xl font-black text-slate-800">Status Kelengkapan Tender</h2>
                                            <p className="text-sm text-slate-500 mt-1">Selesaikan seluruh persyaratan sebelum batas akhir penawaran.</p>
                                        </div>
                                        <div className="text-3xl font-black text-indigo-600">65%</div>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-3 mb-2 overflow-hidden">
                                        <div className="bg-indigo-600 h-3 rounded-full" style={{width: '65%'}}></div>
                                    </div>
                                    <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase">
                                        <span>Persiapan Awal</span>
                                        <span>Siap Kirim ke SPSE</span>
                                    </div>
                                </div>

                                {/* Requirements Checklist */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {/* Administrasi */}
                                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><FileText size={16} className="text-blue-500"/> Administrasi</h3>
                                            <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded">In Progress</span>
                                        </div>
                                        <div className="space-y-3 text-sm">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" checked readOnly className="w-4 h-4 text-emerald-600 rounded" />
                                                <span className="text-slate-600 line-through">Surat Penawaran (Otomatis SPSE)</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" checked readOnly className="w-4 h-4 text-emerald-600 rounded" />
                                                <span className="text-slate-600 line-through">Jaminan Penawaran</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                                                <span className="text-slate-700 font-semibold">Pakta Integritas</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Kualifikasi */}
                                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><Users size={16} className="text-emerald-500"/> Kualifikasi</h3>
                                            <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded">Completed</span>
                                        </div>
                                        <div className="space-y-3 text-sm">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" checked readOnly className="w-4 h-4 text-emerald-600 rounded" />
                                                <span className="text-slate-600 line-through">SBU & NIB Aktif</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" checked readOnly className="w-4 h-4 text-emerald-600 rounded" />
                                                <span className="text-slate-600 line-through">Pengalaman Kerja (Pajak)</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" checked readOnly className="w-4 h-4 text-emerald-600 rounded" />
                                                <span className="text-slate-600 line-through">Surat Perjanjian KSO</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Teknis */}
                                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><Layers size={16} className="text-purple-500"/> Teknis</h3>
                                            <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded">In Progress</span>
                                        </div>
                                        <div className="space-y-3 text-sm">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" checked readOnly className="w-4 h-4 text-emerald-600 rounded" />
                                                <span className="text-slate-600 line-through">Metode Pelaksanaan</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                                                <span className="text-slate-700 font-semibold">Jadwal Pelaksanaan (S-Curve)</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                                                <span className="text-slate-700 font-semibold">Dokumen RKK (Safety)</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Penawaran Harga */}
                                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><DollarSign size={16} className="text-rose-500"/> Penawaran Harga</h3>
                                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">Pending</span>
                                        </div>
                                        <div className="space-y-3 text-sm">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                                                <span className="text-slate-700 font-semibold">Upload BoQ Awal</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                                                <span className="text-slate-700 font-semibold">Penyesuaian AHSP 2025</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300" />
                                                <span className="text-slate-700 font-semibold">Injeksi Final ke Excel Apendo</span>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                    
{/* ========== TAB: DOKUMEN ADMINISTRASI ========== */}
                    {subTab === 'administrasi' && (
                        <div className="p-6 space-y-6 animate-in fade-in duration-200">
                            {/* Inner Sub-tabs Header */}
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                <div className="flex gap-2">
                                    {[
                                        { id: 'penawaran', label: 'Surat Penawaran' },
                                        { id: 'kso', label: 'Surat Perjanjian KSO' },
                                        { id: 'jaminan', label: 'Jaminan Penawaran (Bid Bond)' }
                                    ].map(sub => (
                                        <button
                                            key={sub.id}
                                            onClick={() => setAdminSubTab(sub.id)}
                                            className={`px-3 py-1.5 text-xs font-bold border-b-2 transition-all cursor-pointer
                                                ${adminSubTab === sub.id 
                                                    ? 'border-indigo-600 text-indigo-600' 
                                                    : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                        >
                                            {sub.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* SUB-TAB 1: SURAT PENAWARAN */}
                            {adminSubTab === 'penawaran' && (
                                <div className="space-y-6">
                                    {/* APENDO Choice Toggle */}
                                    <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                                        <div className="flex items-start gap-3">
                                            <input 
                                                type="checkbox" 
                                                id="apendo-toggle"
                                                className="w-4 h-4 rounded text-indigo-600 border-slate-350 focus:ring-indigo-500 mt-0.5"
                                                checked={useApendoLetter}
                                                onChange={e => setUseApendoLetter(e.target.checked)}
                                            />
                                            <div className="flex-1">
                                                <label htmlFor="apendo-toggle" className="text-xs font-bold text-slate-800 cursor-pointer select-none">
                                                    Gunakan Surat Penawaran Bawaan Sistem APENDO / SPSE (Rekomendasi Pokja)
                                                </label>
                                                <p className="text-[10px] text-slate-500 font-semibold mt-1">
                                                    Apabila diaktifkan, dokumen penawaran administrasi dasar akan secara otomatis disusun dan dimasukkan ke dalam payload enkripsi oleh software APENDO milik LKPP saat Anda mengunggah file penawaran. Anda tidak perlu mencetak dan memindai dokumen fisik.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {useApendoLetter ? (
                                        <div className="p-6 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center gap-3">
                                            <CheckCircle2 className="text-indigo-600 shrink-0" size={24} />
                                            <div className="text-xs text-indigo-850">
                                                <span className="font-extrabold block">Status APENDO: AKTIF & SIAP SINKRON</span>
                                                Sistem telah mengonfigurasi workspace agar Surat Penawaran disubmit secara elektronik via enkripsi payload APENDO. Tidak ada berkas fisik tambahan yang perlu diunggah.
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                                                <span>Draf Draf Surat Penawaran (Sistem) (A4 Portrait)</span>
                                                <button 
                                                    onClick={() => alert("Mencetak Surat Penawaran...")}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-bold text-white bg-slate-900 hover:bg-black rounded-lg transition-all cursor-pointer"
                                                >
                                                    <Printer size={12} /> Cetak Surat Penawaran
                                                </button>
                                            </div>

                                            {/* A4 Portrait Viewer */}
                                            <div className="p-6 bg-slate-100 border border-slate-200 rounded-xl flex justify-center max-h-[500px] overflow-y-auto w-full">
                                                <div className="a4-portrait font-mono text-[9.5px] text-slate-800 space-y-5 leading-relaxed shadow-lg overflow-y-auto">
                                                    <div className="text-right text-[8px] text-slate-400">LAMPIRAN APENDO ALTERNATIF</div>
                                                    
                                                    <div className="space-y-0.5">
                                                        <div>Nomor : 022/DIR-MK/VII/2026</div>
                                                        <div>Lampiran : 1 Berkas Dokumen Penawaran</div>
                                                        <div>Perihal : Penawaran Administrasi, Teknis, dan Harga</div>
                                                    </div>

                                                    <div className="pt-2">
                                                        Kepada Yth.<br />
                                                        <span className="font-bold">{tenderMeta.pokja}</span><br />
                                                        di Tempat
                                                    </div>

                                                    <p className="indent-8">
                                                        Sehubungan dengan pengumuman pendaftaran tender untuk paket pekerjaan <span className="font-bold">"{tenderMeta.namaPaket}"</span>, kami yang bertangan dibawah ini, atas nama PT. Maju Konstruksi, setelah mempelajari secara saksama Dokumen Pemilihan dan Adendumnya, dengan ini mengajukan penawaran untuk melaksanakan pekerjaan tersebut dengan nilai penawaran sebesar <span className="font-bold text-indigo-600">Rp {getGrandTotal().toLocaleString('id-ID', { minimumFractionDigits: 2 })}</span>.
                                                    </p>

                                                    <p className="indent-8">
                                                        Penawaran ini berlaku selama 90 (sembilan puluh) hari kalender sejak batas akhir pemasukan dokumen penawaran. Sesuai dengan persyaratan Dokumen Pemilihan, kami melampirkan seluruh dokumen administrasi, draf teknis, dan rincian harga penawaran sebagai satu kesatuan yang tidak terpisahkan.
                                                    </p>

                                                    <p>Dengan diserahkannya surat penawaran ini, kami menyatakan tunduk pada semua ketentuan Dokumen Pemilihan.</p>

                                                    <div className="pt-8 flex justify-between">
                                                        <div></div>
                                                        <div className="text-center w-60 space-y-12">
                                                            <div>
                                                                Rembang, 19 Juli 2026<br />
                                                                <span className="font-bold">PT. MAJU KONSTRUKSI</span>
                                                            </div>
                                                            <div>
                                                                <span className="font-bold underline text-[10px]">Ir. Budi Santoso</span><br />
                                                                Direktur Utama
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* SUB-TAB 2: SURAT PERJANJIAN KSO */}
                            {adminSubTab === 'kso' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
                                        {/* KSO Form */}
                                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 self-start">
                                            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Pengaturan Perjanjian KSO</h3>
                                            
                                            <div className="space-y-3">
                                                <div>
                                                    <label className={LABEL}>Pilih Rekanan KSO</label>
                                                    <select 
                                                        className={SELECT_STYLE + " w-full"}
                                                        value={selectedKsoPartnerId}
                                                        onChange={e => {
                                                            setSelectedKsoPartnerId(e.target.value);
                                                            if(e.target.value) {
                                                                setKsoModalShare(40);
                                                                setKsoShareStatus('Synced');
                                                            } else {
                                                                setKsoModalShare(0);
                                                                setKsoShareStatus('Unsynced');
                                                            }
                                                        }}
                                                    >
                                                        <option value="">-- Tanpa KSO (Penyedia Tunggal) --</option>
                                                        {ksoPartnersList.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                                                    </select>
                                                </div>

                                                {selectedKsoPartnerId && (
                                                    <>
                                                        <div>
                                                            <label className={LABEL}>Nama Kemitraan KSO</label>
                                                            <input 
                                                                type="text" 
                                                                className={INPUT_STYLE + " w-full font-bold"} 
                                                                value={adminKsoName}
                                                                onChange={e => setAdminKsoName(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div>
                                                                <label className={LABEL}>Saham Leader (%)</label>
                                                                <input 
                                                                    type="number" 
                                                                    className={INPUT_STYLE + " w-full font-bold"} 
                                                                    value={adminKsoLeaderShare}
                                                                    onChange={e => {
                                                                        const val = parseInt(e.target.value) || 0;
                                                                        setAdminKsoLeaderShare(val);
                                                                        setAdminKsoMemberShare(100 - val);
                                                                        setKsoModalShare(100 - val);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className={LABEL}>Saham Mitra (%)</label>
                                                                <input 
                                                                    type="number" 
                                                                    className={INPUT_STYLE + " w-full"} 
                                                                    value={adminKsoMemberShare}
                                                                    onChange={e => {
                                                                        const val = parseInt(e.target.value) || 0;
                                                                        setAdminKsoMemberShare(val);
                                                                        setAdminKsoLeaderShare(100 - val);
                                                                        setKsoModalShare(val);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="pt-2 border-t border-slate-200 space-y-3">
                                                            <div className="text-[10px] font-bold text-slate-500 uppercase">Aksi Berkas KSO</div>
                                                            <button 
                                                                onClick={() => alert("Mencetak Draf Perjanjian KSO...")}
                                                                className="w-full py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5"
                                                            >
                                                                <Printer size={13} /> Cetak Draf KSO
                                                            </button>
                                                            
                                                            <div className="space-y-1.5">
                                                                <div className="text-[9px] text-slate-400 font-semibold uppercase">Unggah File Surat KSO Asli (Tandatangan & Stempel)</div>
                                                                <label className="w-full py-2 bg-indigo-50 border border-dashed border-indigo-300 hover:bg-indigo-100/50 text-indigo-700 text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 text-center">
                                                                    <Eye size={13} />
                                                                    {adminKsoUploadedFile ? "Ganti File KSO" : "Pilih File & Unggah"}
                                                                    <input type="file" className="hidden" accept=".pdf,image/*" onChange={handleUploadKsoFile} />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* KSO Preview */}
                                        <div className="flex-1 space-y-4">
                                            {selectedKsoPartnerId ? (
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <div className="text-[10px] font-bold text-slate-500 uppercase">Pratinjau Surat Perjanjian KSO (A4 Portrait)</div>
                                                        {adminKsoUploadedFile ? (
                                                            <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-1 rounded-full font-bold border border-emerald-200">
                                                                ✓ File Terunggah: {adminKsoUploadedFile}
                                                            </span>
                                                        ) : (
                                                            <span className="bg-amber-50 text-amber-700 text-[10px] px-2.5 py-1 rounded-full font-bold border border-amber-200 animate-pulse">
                                                                Menunggu Unggahan Berkas TTD
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl flex justify-center max-h-[480px] overflow-y-auto w-full">
                                                        <div className="a4-portrait font-mono text-[9px] text-slate-700 space-y-4 leading-normal shadow-lg relative print-area shrink-0 overflow-y-auto">
                                                            <div className="text-right text-[8px] text-slate-400">- 66 -</div>
                                                            
                                                            <h2 className="text-center font-bold text-slate-900 text-[10px] underline uppercase tracking-wider">
                                                                SURAT PERJANJIAN KERJA SAMA OPERASI (KSO)
                                                            </h2>

                                                            <p className="text-justify text-[8px]">
                                                                Sehubungan dengan tender pekerjaan <span className="font-bold">"{tenderMeta.namaPaket}"</span> maka kami:
                                                            </p>

                                                            <div className="pl-4 space-y-1 text-[8px]">
                                                                <div>1. <span className="font-bold">PT. MAJU KONSTRUKSI</span> (Penyedia 1 / Leader)</div>
                                                                <div>2. <span className="font-bold">{(ksoPartnersList.find(p => p.id === selectedKsoPartnerId)?.nama || "Mitra KSO").toUpperCase()}</span> (Penyedia 2 / Anggota)</div>
                                                            </div>

                                                            <p className="text-justify text-[8px]">
                                                                bermaksud untuk mengikuti tender dan pelaksanaan kontrak secara bersama-sama dalam bentuk Kerja Sama Operasi (KSO). Kami menyetujui dan memutuskan bahwa:
                                                            </p>

                                                            <div className="space-y-2 text-justify text-[8px]">
                                                                <div>
                                                                    1. Secara bersama-sama:<br />
                                                                    a. Membentuk KSO dengan nama KSO adalah: <span className="font-bold underline">{adminKsoName}</span><br />
                                                                    b. Menunjuk <span className="font-bold">PT. MAJU KONSTRUKSI</span> sebagai perusahaan utama (leadfirm KSO) untuk KSO dan mewakili serta bertindak untuk dan atas nama KSO.<br />
                                                                    c. Menyetujui apabila ditunjuk sebagai pemenang, wajib bertanggung jawab secara tanggung renteng atas semua kewajiban sesuai ketentuan kontrak.
                                                                </div>
                                                                <div>
                                                                    2. Keikutsertaan modal (sharing) setiap perusahaan dalam KSO adalah:<br />
                                                                    - <span className="font-bold">PT. MAJU KONSTRUKSI</span> sebesar <span className="font-bold">{adminKsoLeaderShare}%</span> ({adminKsoLeaderShare} persen)<br />
                                                                    - <span className="font-bold">{ksoPartnersList.find(p => p.id === selectedKsoPartnerId)?.nama}</span> sebesar <span className="font-bold">{adminKsoMemberShare}%</span> ({adminKsoMemberShare} persen)
                                                                </div>
                                                                <div>
                                                                    3. Masing-masing peserta anggota KSO, akan mengambil bagian sesuai sharing tersebut dalam hal pengeluaran, keuntungan, dan kerugian dari KSO.
                                                                </div>
                                                            </div>

                                                            <div className="pt-6 flex justify-around text-center text-[7.5px] font-bold">
                                                                <div className="w-40 space-y-10">
                                                                    <div>PT. MAJU KONSTRUKSI</div>
                                                                    <div className="underline">( Ir. Budi Santoso )<br /><span className="text-[6.5px] text-slate-400 font-medium">Direktur Utama (Leader)</span></div>
                                                                </div>
                                                                <div className="w-40 space-y-10">
                                                                    <div>{ksoPartnersList.find(p => p.id === selectedKsoPartnerId)?.nama.toUpperCase()}</div>
                                                                    <div className="underline">( Perwakilan Mitra )<br /><span className="text-[6.5px] text-slate-400 font-medium">Anggota KSO</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-full border border-dashed border-slate-200 bg-slate-50/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-slate-400">
                                                    <UserCheck size={36} className="text-slate-300 mb-2" />
                                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Tender Tanpa KSO</h4>
                                                    <p className="text-[11px] max-w-sm mt-1">
                                                        Untuk tender ini, Anda masuk sebagai Penyedia Tunggal. Jika ingin menggunakan kemitraan KSO, silakan pilih rekanan pada panel formulir di sisi kiri.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SUB-TAB 3: JAMINAN PENAWARAN */}
                            {adminSubTab === 'jaminan' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
                                        {/* Bid Bond Form */}
                                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 self-start">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Kalkulator Jaminan Penawaran</h3>
                                                <span className="text-[8px] font-extrabold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100">
                                                    HPS: 2.8M
                                                </span>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                                                    <input 
                                                        type="checkbox" 
                                                        id="bidbond-required-toggle"
                                                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                                                        checked={adminBidBondRequired}
                                                        onChange={e => {
                                                            setAdminBidBondRequired(e.target.checked);
                                                            if(!e.target.checked) {
                                                                setAdminBidBondUploadedFile(null);
                                                                setAdminBidBondAiLogs([]);
                                                            }
                                                        }}
                                                    />
                                                    <label htmlFor="bidbond-required-toggle" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                                                        Jaminan Penawaran Disyaratkan
                                                    </label>
                                                </div>

                                                {adminBidBondRequired && (
                                                    <>
                                                        <div>
                                                            <label className={LABEL}>Besaran Jaminan (% HPS)</label>
                                                            <input 
                                                                type="number" 
                                                                className={INPUT_STYLE + " w-full font-bold"} 
                                                                value={adminBidBondPercent}
                                                                onChange={e => setAdminBidBondPercent(parseFloat(e.target.value) || 0)}
                                                            />
                                                            <span className="text-[9px] text-slate-400 font-semibold mt-1 block">
                                                                Nilai Nominal Hitung: <span className="text-indigo-600 font-bold">Rp {Math.floor(tenderMeta.hps * (adminBidBondPercent / 100)).toLocaleString('id-ID')}</span>
                                                            </span>
                                                        </div>

                                                        <div>
                                                            <label className={LABEL}>Jangka Waktu Jaminan (Hari Kalender)</label>
                                                            <input 
                                                                type="number" 
                                                                className={INPUT_STYLE + " w-full"} 
                                                                value={adminBidBondDays}
                                                                onChange={e => setAdminBidBondDays(parseInt(e.target.value) || 0)}
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className={LABEL}>Target Lembaga Penjamin (Bank/Surety)</label>
                                                            <input 
                                                                type="text" 
                                                                className={INPUT_STYLE + " w-full"} 
                                                                value={adminBidBondIssuer}
                                                                onChange={e => setAdminBidBondIssuer(e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="pt-2 border-t border-slate-200 space-y-3">
                                                            <div className="text-[10px] font-bold text-slate-500 uppercase">Unduh Surat Permohonan</div>
                                                            <button 
                                                                onClick={() => {
                                                                    setAdminBidBondRequestDownloaded(true);
                                                                    setAiLogs(logs => [...logs, { time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }), agent: "Sistem Penyusunan", msg: "Surat Permohonan Jaminan Penawaran diunduh untuk diajukan ke Lembaga Penjamin." }]);
                                                                }}
                                                                className="w-full py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5"
                                                            >
                                                                <Download size={13} /> {adminBidBondRequestDownloaded ? "Unduh Ulang" : "Unduh Surat Permohonan"}
                                                            </button>

                                                            <div className="space-y-1.5">
                                                                <div className="text-[9px] text-slate-400 font-semibold uppercase">Unggah File Scan Jaminan Asli yang Terbit</div>
                                                                <label className="w-full py-2 bg-indigo-50 border border-dashed border-indigo-300 hover:bg-indigo-100/50 text-indigo-700 text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 text-center">
                                                                    <Eye size={13} />
                                                                    {adminBidBondUploadedFile ? "Ganti File Scan Jaminan" : "Pilih File & Unggah"}
                                                                    <input type="file" className="hidden" accept=".pdf,image/*" onChange={handleUploadBidBondFile} />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Bid Bond Preview & AI Audit Terminal */}
                                        <div className="flex-1 space-y-4">
                                            {adminBidBondRequired ? (
                                                <div className="space-y-4">
                                                    {/* AI Audit Terminal */}
                                                    {adminBidBondUploadedFile && (
                                                        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 shadow-inner">
                                                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                                                                <span className="flex items-center gap-1.5 font-sans">
                                                                    <Cpu size={14} className="text-indigo-400" /> Hasil Pemeriksaan Kepatuhan AI (Bid Bond)
                                                                </span>
                                                                {adminIsScanningBidBond ? (
                                                                    <span className="text-blue-400 animate-pulse flex items-center gap-1 font-sans">
                                                                        <RefreshCw size={10} className="animate-spin" /> Sedang Memindai...
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-emerald-400 font-sans">✓ Selesai Audit</span>
                                                                )}
                                                            </div>
                                                            <div className="font-mono text-[9.5px] space-y-1.5 text-slate-300 max-h-[150px] overflow-y-auto">
                                                                {adminBidBondAiLogs.map((log, index) => (
                                                                    <div key={index} className="flex gap-2">
                                                                        {log.status === 'info' && <span className="text-blue-400 font-bold">[INFO]</span>}
                                                                        {log.status === 'scan' && <span className="text-slate-500">[SCAN]</span>}
                                                                        {log.status === 'success' && <span className="text-emerald-400 font-bold">[COMPLIANT]</span>}
                                                                        <span>{log.msg}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Permohonan Letter Preview */}
                                                    <div className="space-y-2">
                                                        <div className="text-[10px] font-bold text-slate-500 uppercase">Pratinjau Surat Permohonan Jaminan (A4 Portrait)</div>
                                                        <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl flex justify-center max-h-[380px] overflow-y-auto w-full">
                                                            <div className="a4-portrait font-mono text-[9px] text-slate-700 space-y-4 leading-normal shadow-lg relative print-area shrink-0 overflow-y-auto">
                                                                <div className="text-center border-b-2 border-slate-800 pb-2 space-y-1">
                                                                    <h2 className="text-xs font-extrabold text-slate-900 tracking-wider">PT. MAJU KONSTRUKSI</h2>
                                                                    <p className="text-[7.5px] text-slate-500 font-semibold">Gedung Graha Construction Lt. 4, Jakarta | Telp: 021-555666</p>
                                                                </div>

                                                                <div className="space-y-0.5">
                                                                    <div>Nomor : 023/DIR-MK/VII/2026</div>
                                                                    <div>Perihal: Permohonan Penerbitan Jaminan Penawaran (Bid Bond)</div>
                                                                </div>

                                                                <div className="pt-2">
                                                                    Kepada Yth.<br />
                                                                    Pimpinan <span className="font-bold">{adminBidBondIssuer}</span><br />
                                                                    di Tempat
                                                                </div>

                                                                <p className="text-justify indent-8">
                                                                    Dengan ini kami mengajukan permohonan penerbitan Jaminan Penawaran (Bid Bond) sehubungan dengan keikutsertaan kami pada tender pengadaan pekerjaan konstruksi <span className="font-bold">"{tenderMeta.namaPaket}"</span> dengan detail jaminan sebagai berikut:
                                                                </p>

                                                                <div className="pl-4 grid grid-cols-[160px_10px_1fr] gap-0.5 text-[8.5px]">
                                                                    <div>Penerima Jaminan</div><div>:</div><div className="font-bold">{tenderMeta.pokja}</div>
                                                                    <div>Besaran Nilai Jaminan</div><div>:</div><div className="font-bold">Rp {Math.floor(tenderMeta.hps * (adminBidBondPercent / 100)).toLocaleString('id-ID')},00 ({adminBidBondPercent}% dari HPS)</div>
                                                                    <div>Jangka Waktu Jaminan</div><div>:</div><div className="font-bold">{adminBidBondDays} hari kalender</div>
                                                                    <div>Efektif Mulai</div><div>:</div><div>19 Juli 2026 s.d. {(19 + adminBidBondDays) > 30 ? "17 Oktober 2026" : "19 Agustus 2026"}</div>
                                                                </div>

                                                                <p className="text-justify">
                                                                    Kami bersedia memenuhi segala persyaratan dan jaminan kontra yang disyaratkan oleh pihak Bank/Asuransi demi kelancaran penerbitan warkat jaminan penawaran ini.
                                                                </p>

                                                                <div className="pt-4 flex justify-between">
                                                                    <div></div>
                                                                    <div className="text-center w-44 space-y-8">
                                                                        <div>PT. Maju Konstruksi,</div>
                                                                        <div className="font-bold underline">Ir. Budi Santoso</div>
                                                                        <div className="text-[7.5px] text-slate-500">Direktur Utama</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-full border border-dashed border-slate-200 bg-slate-50/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-slate-400">
                                                    <ShieldAlert size={36} className="text-slate-300 mb-2" />
                                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Jaminan Penawaran Tidak Disyaratkan</h4>
                                                    <p className="text-[11px] max-w-sm mt-1">
                                                        Pokja menetapkan Jaminan Penawaran hanya disyaratkan secara ketat untuk HPS &ge; Rp 10 Miliar. Untuk tender Hibah Barang ini (Rp2.88 M), Jaminan tidak diwajibkan oleh LDP. Aktifkan checkbox di kiri jika ingin menyertakan secara opsional.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ========== TAB: KUALIFIKASI & KSO HUB ========== */}
                    {subTab === 'kualifikasi' && (
                        <div className="p-6 space-y-6 animate-in fade-in duration-200">
                            {/* Inner Sub-tabs Header */}
                            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                <div className="flex gap-2">
                                    {[
                                        { id: 'validation', label: 'Sync & Validasi Dokumen' },
                                        { id: 'kdskp', label: 'Kalkulator KD & SKP' },
                                        { id: 'spse', label: 'Formulir Kualifikasi SPSE' },
                                        { id: 'kso', label: 'KSO & Kolaborator (RBAC)' }
                                    ].map(sub => (
                                        <button
                                            key={sub.id}
                                            onClick={() => setKualifikasiSubTab(sub.id)}
                                            className={`px-3 py-1.5 text-xs font-bold border-b-2 transition-all cursor-pointer
                                                ${kualifikasiSubTab === sub.id 
                                                    ? 'border-emerald-600 text-emerald-600' 
                                                    : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                                        >
                                            {sub.label}
                                        </button>
                                    ))}
                                </div>
                                {simulatedRole !== 'owner' && (
                                    <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-[10px] px-2.5 py-1 rounded-full font-bold">
                                        <Lock size={11} /> Mode Simulasi Peran: {simulatedRole.toUpperCase()}
                                        <button onClick={() => setSimulatedRole('owner')} className="underline hover:text-amber-900 ml-1">Kembali</button>
                                    </div>
                                )}
                            </div>

                            {/* SUB-TAB 1: VALIDASI DOKUMEN LEGAL */}
                            {kualifikasiSubTab === 'validation' && (
                                <div className="space-y-6">
                                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                                        <div className="text-xs text-slate-600">
                                            <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-0.5">
                                                <CheckCircle2 className="text-emerald-600" size={14} /> Sinkronisasi & Validasi Profil Legalitas
                                            </div>
                                            Data kualifikasi ditarik dari profil legalitas aktif. Anda dapat memicu audit kualifikasi satu per satu atau secara sekuensial.
                                        </div>
                                        <button 
                                            onClick={handleValidateAll}
                                            disabled={isValidatingAll}
                                            className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-lg cursor-pointer flex items-center gap-1.5 transition-all shadow-sm"
                                        >
                                            <RefreshCw size={13} className={isValidatingAll ? "animate-spin" : ""} />
                                            {isValidatingAll ? "Memproses Validasi..." : "Validasi Semua Dokumen"}
                                        </button>
                                    </div>

                                    {/* Document Validation Table/List */}
                                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                        <table className="w-full text-left border-collapse text-xs">
                                            <thead>
                                                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                                    <th className="px-4 py-3 w-10">No</th>
                                                    <th className="px-4 py-3">Nama Dokumen Kualifikasi</th>
                                                    <th className="px-4 py-3">Nilai / Deskripsi Dokumen</th>
                                                    <th className="px-4 py-3 w-40 text-center">Status</th>
                                                    <th className="px-4 py-3 w-32 text-right">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(docValidation).map(([key, doc], idx) => {
                                                    return (
                                                        <tr key={key} className="border-b border-slate-150 hover:bg-slate-50/50 transition-colors">
                                                            <td className="px-4 py-3 text-slate-400 font-bold">{idx + 1}</td>
                                                            <td className="px-4 py-3">
                                                                <div className="font-bold text-slate-800">{doc.name}</div>
                                                                <div className="text-[10px] text-slate-400 font-medium mt-0.5">{doc.detail}</div>
                                                            </td>
                                                            <td className="px-4 py-3 font-mono text-[11px] text-slate-650 bg-slate-50/30">
                                                                {doc.value}
                                                            </td>
                                                            <td className="px-4 py-3 text-center">
                                                                {doc.status === 'unvalidated' && (
                                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                                                                        Belum Divalidasi
                                                                    </span>
                                                                )}
                                                                {doc.status === 'validating' && (
                                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200 animate-pulse">
                                                                        <RefreshCw size={10} className="animate-spin" /> Memverifikasi...
                                                                    </span>
                                                                )}
                                                                {doc.status === 'valid' && (
                                                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                                                                        ✓ Valid & Lolos
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-3 text-right">
                                                                <button
                                                                    onClick={() => handleValidateDoc(key)}
                                                                    disabled={doc.status === 'validating' || doc.status === 'valid'}
                                                                    className="px-2.5 py-1 text-[10px] font-bold text-blue-600 hover:text-blue-800 disabled:text-slate-400 bg-blue-50 disabled:bg-slate-50 border border-blue-200 disabled:border-slate-200 rounded cursor-pointer transition-all"
                                                                >
                                                                    {doc.status === 'valid' ? 'Valid' : 'Validasi'}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* SUB-TAB 2: KALKULATOR KD & SKP */}
                            {kualifikasiSubTab === 'kdskp' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* KD Card */}
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Perhitungan Kemampuan Dasar (KD)</h4>
                                            <div className="text-xl font-black text-slate-800">Rp 3.300.000.000,00</div>
                                            <div className="p-3 bg-white border border-slate-200 rounded-lg text-[10px] text-slate-500 space-y-1 leading-normal font-semibold">
                                                <div className="text-slate-700 font-bold">Rumus: KD = 3 x NPt</div>
                                                <div>NPt (Pengalaman Tertinggi Sejenis): Rp 1.100.000.000,00</div>
                                                <div>Sub-Klasifikasi: BG009 (Konstruksi Gedung)</div>
                                                <div className="text-emerald-600 font-bold">Syarat LDP (KD &gt;= HPS): LOLOS (KD &gt; Rp {tenderMeta.hps.toLocaleString('id-ID')})</div>
                                            </div>
                                        </div>

                                        {/* SKP Card */}
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Perhitungan Sisa Kemampuan Paket (SKP)</h4>
                                            <div className="text-xl font-black text-slate-800">3 Paket Tersedia</div>
                                            <div className="p-3 bg-white border border-slate-200 rounded-lg text-[10px] text-slate-500 space-y-1 leading-normal font-semibold">
                                                <div className="text-slate-700 font-bold">Rumus: SKP = 5 - Jumlah Paket Berjalan</div>
                                                <div>Paket Sedang Berjalan: 2 Pekerjaan Aktif</div>
                                                <div>Batas Maksimum Paket Konstruksi: 5 Paket</div>
                                                <div className="text-emerald-600 font-bold">Status Evaluasi Pokja: LOLOS (Sisa kuota paket memenuhi syarat)</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Declaration Letter Section */}
                                    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                                            <div className="text-xs font-bold text-slate-700">Draf Dokumen Pernyataan Perhitungan KD & SKP</div>
                                            <button 
                                                onClick={() => {
                                                    setIsKdSkpPrinted(true);
                                                    setAiLogs(logs => [...logs, { time: "09:40", agent: "Sistem Penyusunan", msg: "Dokumen Perhitungan KD & SKP resmi berkop surat ditandatangani dan berhasil dicetak." }]);
                                                }}
                                                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-white bg-slate-900 hover:bg-black rounded-lg transition-all cursor-pointer"
                                            >
                                                <Printer size={12} /> {isKdSkpPrinted ? "Cetak Ulang" : "Cetak Dokumen Resmi"}
                                            </button>
                                        </div>

                                        {isKdSkpPrinted && (
                                            <div className="p-3 bg-emerald-50 border-b border-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1.5 animate-in slide-in-from-top-2 duration-150">
                                                <CheckCircle2 size={13} className="text-emerald-600" /> Dokumen Pernyataan Resmi berhasil dicetak dan disematkan sebagai Dokumen Penawaran Kualifikasi.
                                            </div>
                                        )}

                                        {/* Headed Paper Letter Preview (A4 Portrait) */}
                                        <div className="p-4 bg-slate-100 flex flex-col">
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                                                <span>Pratinjau Surat Pernyataan KD & SKP (A4 Portrait)</span>
                                                <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[8px] font-bold">210mm x 297mm</span>
                                            </div>
                                            <div className="flex-1 overflow-auto border border-slate-200 rounded-xl bg-slate-350/30 p-4 flex justify-center max-h-[450px]">
                                                <div className="a4-portrait font-mono text-[9px] text-slate-700 space-y-4 leading-normal shadow-lg">
                                                {/* Header / Kop */}
                                                <div className="text-center border-b-2 border-slate-800 pb-3 space-y-1">
                                                    <h2 className="text-xs font-extrabold text-slate-900 tracking-wider">PT. MAJU KONSTRUKSI</h2>
                                                    <p className="text-[8px] text-slate-500 font-semibold">Gedung Graha Construction Lt. 4, Jl. Jend. Sudirman Kav. 21, Jakarta Selatan</p>
                                                    <p className="text-[7px] text-slate-400">Telp: 021-555666 | Email: tender@majunk.co.id</p>
                                                </div>

                                                {/* Letter Details */}
                                                <div className="space-y-0.5">
                                                    <div>Nomor: 019/DIR-MK/VII/2026</div>
                                                    <div>Hal  : Surat Pernyataan Perhitungan Kemampuan Dasar (KD) & SKP</div>
                                                </div>

                                                <div className="text-center font-bold text-slate-900 text-xs py-2 underline uppercase">
                                                    Surat Pernyataan Perhitungan Kualifikasi
                                                </div>

                                                <p>Yang bertanda tangan di bawah ini:</p>
                                                <div className="pl-6 space-y-0.5">
                                                    <div>Nama      : Ir. Budi Santoso</div>
                                                    <div>Jabatan   : Direktur Utama</div>
                                                    <div>Bertindak : mewakili PT. Maju Konstruksi</div>
                                                </div>

                                                <p className="indent-8">Menyatakan dengan sesungguhnya bahwa untuk memenuhi persyaratan kualifikasi pada paket pekerjaan **{tenderMeta.namaPaket}**, perusahaan kami memiliki perhitungan kualifikasi sebagai berikut:</p>

                                                {/* Calculations Table */}
                                                <table className="w-full border-collapse border border-slate-800 text-[8px] text-slate-800">
                                                    <thead>
                                                        <tr className="bg-slate-50">
                                                            <th className="border border-slate-800 p-1.5 text-center w-8">No</th>
                                                            <th className="border border-slate-800 p-1.5">Uraian Kualifikasi</th>
                                                            <th className="border border-slate-800 p-1.5">Nilai Perhitungan</th>
                                                            <th className="border border-slate-800 p-1.5">Keterangan Syarat LDP</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="border border-slate-800 p-1.5 text-center">1</td>
                                                            <td className="border border-slate-800 p-1.5 font-bold">Kemampuan Dasar (KD)</td>
                                                            <td className="border border-slate-800 p-1.5 font-bold">Rp 3.300.000.000,00</td>
                                                            <td className="border border-slate-800 p-1.5">KD minimal harus Rp {tenderMeta.hps.toLocaleString('id-ID')} (Lolos)</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border border-slate-800 p-1.5 text-center">2</td>
                                                            <td className="border border-slate-800 p-1.5 font-bold">Sisa Kemampuan Paket (SKP)</td>
                                                            <td className="border border-slate-800 p-1.5 font-bold">3 Paket Tersedia</td>
                                                            <td className="border border-slate-800 p-1.5">SKP maksimal 5 paket berjalan (Lolos)</td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <p className="indent-8">Demikian pernyataan ini dibuat dengan sebenar-benarnya untuk dipergunakan sebagai kelengkapan penawaran kualifikasi tender kami.</p>

                                                {/* Signature */}
                                                <div className="pt-4 flex justify-between">
                                                    <div></div>
                                                    <div className="text-center space-y-8 w-44">
                                                        <div>PT. Maju Konstruksi,</div>
                                                        <div className="font-bold underline">Ir. Budi Santoso</div>
                                                        <div className="text-[7px] text-slate-500">Direktur Utama</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            )}

                            {/* SUB-TAB 3: FORMULIR KUALIFIKASI SPSE */}
                            {kualifikasiSubTab === 'spse' && (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-200 rounded-xl">
                                        <div>
                                            <h3 className="text-xs font-bold text-slate-800">Formulir Isian Kualifikasi SPSE (Sesuai Lampiran)</h3>
                                            <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Format Dokumen KSO LKPP standar Penawaran. Silakan periksa, simpan, atau unduh.</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => {
                                                    setIsFormulirSaved(true);
                                                    setAiLogs(logs => [...logs, { time: "09:42", agent: "Sistem Validasi", msg: "Formulir Isian Kualifikasi SPSE disimpan sebagai berkas penawaran." }]);
                                                }}
                                                className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg cursor-pointer shadow-sm transition-all"
                                            >
                                                {isFormulirSaved ? "Telah Disimpan & Divalidasi" : "Simpan & Terapkan Berkas"}
                                            </button>
                                        </div>
                                    </div>

                                    {isFormulirSaved && (
                                        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-[10px] font-bold animate-in slide-in-from-top-2 flex items-center gap-2">
                                            <CheckCircle2 size={13} className="text-emerald-600" />
                                            Formulir isian kualifikasi siap diunduh/copy-paste ke portal LPSE. Simulasi Evaluasi Pokja: 99.99% Lolos Kepatuhan LDP.
                                        </div>
                                    )}

                                    {/* A4 Paper Device View for SPSE Forms */}
                                    <div className="p-6 bg-slate-100 border border-slate-200 rounded-2xl flex flex-col items-center gap-8 overflow-y-auto max-h-[600px]">
                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex justify-between w-[210mm]">
                                            <span>Dokumen Isian Kualifikasi (4 Halaman A4)</span>
                                            <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[8px] font-bold">A4 Portrait (210mm x 297mm)</span>
                                        </div>

                                        {/* PAGE 1 (- 90 -) */}
                                        <div className="a4-portrait font-mono text-[9px] text-slate-800 space-y-4 leading-normal shadow-lg relative print-area shrink-0">
                                            <div className="text-right text-[8px] text-slate-400">- 90 -</div>
                                            
                                            <h2 className="text-center font-bold text-slate-900 text-[11px] underline uppercase tracking-wider my-4">
                                                FORMULIR ISIAN KUALIFIKASI UNTUK ANGGOTA KSO
                                            </h2>

                                            <p className="mt-4">Saya yang bertanda tangan di bawah ini:</p>
                                            
                                            <div className="pl-4 grid grid-cols-[150px_10px_1fr] gap-y-2">
                                                <div className="font-bold">Nama</div>
                                                <div>:</div>
                                                <div className="border-b border-dashed border-slate-350 pb-0.5">Ir. Budi Santoso</div>
                                                
                                                <div className="font-bold">Jabatan</div>
                                                <div>:</div>
                                                <div className="border-b border-dashed border-slate-350 pb-0.5">Direktur Utama</div>
                                                
                                                <div className="font-bold">Bertindak untuk dan atas nama</div>
                                                <div>:</div>
                                                <div className="border-b border-dashed border-slate-350 pb-0.5">PT. Maju Konstruksi (Anggota KSO)</div>
                                                
                                                <div className="font-bold">Alamat</div>
                                                <div>:</div>
                                                <div className="border-b border-dashed border-slate-350 pb-0.5">Gedung Graha Construction Lt. 4, Jl. Jend. Sudirman Kav. 21, Jakarta Selatan</div>
                                                
                                                <div className="font-bold">Telepon/Fax</div>
                                                <div>:</div>
                                                <div className="border-b border-dashed border-slate-350 pb-0.5">021-555666 / 021-555777</div>
                                                
                                                <div className="font-bold">Email</div>
                                                <div>:</div>
                                                <div className="border-b border-dashed border-slate-350 pb-0.5">tender@majunk.co.id</div>
                                            </div>

                                            <p className="pt-2">menyatakan dengan sesungguhnya bahwa:</p>
                                            
                                            <div className="space-y-2 text-justify text-[8.5px]">
                                                <div className="flex gap-2">
                                                    <span>1.</span>
                                                    <span>saya secara hukum bertindak untuk dan atas nama badan usaha berdasarkan <span className="font-bold underline">Akta Pendirian No. 12 Tanggal 14 Mei 2018</span> yang diterbitkan oleh Notaris R. Suprapto, SH;</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span>2.</span>
                                                    <span>saya bukan sebagai pegawai K/L/PD [bagi pegawai K/L/PD yang sedang cuti diluar tanggungan negara ditulis sebagai berikut: "Saya merupakan pegawai K/L/PD yang sedang cuti diluar tanggungan negara"];</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span>3.</span>
                                                    <span>saya tidak sedang menjalani sanksi pidana;</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span>4.</span>
                                                    <span>saya tidak sedang dan tidak akan terlibat pertentangan kepentingan dengan para pihak yang terkait, langsung maupun tidak langsung dalam proses pengadaan ini;</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span>5.</span>
                                                    <span>badan usaha yang saya wakili tidak masuk dalam Daftar Hitam, tidak dalam pengawasan pengadilan, tidak pailit, dan kegiatan usahanya tidak sedang dihentikan;</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span>6.</span>
                                                    <span>data-data badan usaha yang saya wakili adalah sebagai berikut:</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* PAGE 2 (- 91 -) */}
                                        <div className="a4-portrait font-mono text-[9px] text-slate-800 space-y-4 leading-normal shadow-lg relative print-area shrink-0">
                                            <div className="text-right text-[8px] text-slate-400">- 91 -</div>
                                            
                                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-2">A. Data Administrasi</h3>
                                            <table className="w-full border-collapse border border-slate-850 text-[8px]">
                                                <tbody>
                                                    <tr>
                                                        <td className="border border-slate-850 p-1.5 w-44">1. Nama Badan Usaha</td>
                                                        <td className="border border-slate-850 p-1.5 font-bold">: PT. Maju Konstruksi</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-slate-850 p-1.5">2. Status</td>
                                                        <td className="border border-slate-850 p-1.5">: [x] Pusat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [ ] Cabang</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-slate-850 p-1.5 valign-top">3. Alamat Kantor Pusat</td>
                                                        <td className="border border-slate-850 p-1.5">
                                                            Jl. Jend. Sudirman Kav. 21, Graha Construction Lt. 4, Jakarta Selatan<br />
                                                            No. Telepon: 021-555666<br />
                                                            No. Fax: 021-555777<br />
                                                            E-Mail: tender@majunk.co.id
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-slate-850 p-1.5 valign-top">4. Alamat Kantor Cabang</td>
                                                        <td className="border border-slate-850 p-1.5">
                                                            -<br />
                                                            No. Telepon: -<br />
                                                            No. Fax: -<br />
                                                            E-Mail: -
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-4">B. Landasan Hukum Pendirian Badan Usaha</h3>
                                            <div className="space-y-3 pl-2">
                                                <div>
                                                    <div className="font-bold">1. Akta Pendirian Perusahaan/Anggaran Dasar:</div>
                                                    <div className="pl-4 grid grid-cols-[100px_10px_1fr] gap-0.5 text-[8px]">
                                                        <div>a. Nomor</div><div>:</div><div>12</div>
                                                        <div>b. Tanggal</div><div>:</div><div>14 Mei 2018</div>
                                                        <div>c. Nama Notaris</div><div>:</div><div>R. Suprapto, SH</div>
                                                        <div>d. Nomor Pengesahan</div><div>:</div><div>AHU-001294.AH.01.01.Tahun 2018</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">2. Akta/Anggaran Dasar Perubahan Terakhir:</div>
                                                    <div className="pl-4 grid grid-cols-[100px_10px_1fr] gap-0.5 text-[8px]">
                                                        <div>a. Nomor</div><div>:</div><div>04</div>
                                                        <div>b. Tanggal</div><div>:</div><div>18 April 2024</div>
                                                        <div>c. Nama Notaris</div><div>:</div><div>H. Wibowo, SH, M.Kn</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-4">C. Pengurus Badan Usaha</h3>
                                            <table className="w-full border-collapse border border-slate-850 text-[8px] text-center">
                                                <thead>
                                                    <tr className="bg-slate-50">
                                                        <th className="border border-slate-850 p-1.5 w-10">No.</th>
                                                        <th className="border border-slate-850 p-1.5">Nama</th>
                                                        <th className="border border-slate-850 p-1.5">No. Identitas</th>
                                                        <th className="border border-slate-850 p-1.5">Jabatan dalam Badan Usaha</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="border border-slate-850 p-1.5">1</td>
                                                        <td className="border border-slate-850 p-1.5 font-bold text-left">Ir. Budi Santoso</td>
                                                        <td className="border border-slate-850 p-1.5">3321041203770001</td>
                                                        <td className="border border-slate-850 p-1.5 text-left">Direktur Utama</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-slate-850 p-1.5">2</td>
                                                        <td className="border border-slate-850 p-1.5 font-bold text-left">Rahmat Hidayat, SE</td>
                                                        <td className="border border-slate-850 p-1.5">3321042508820002</td>
                                                        <td className="border border-slate-850 p-1.5 text-left">Komisaris Utama</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-4">D. Izin Usaha</h3>
                                            <div className="pl-2 space-y-1 text-[8px]">
                                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                                    <div>1. Surat Izin Berusaha di bidang Jasa Konstruksi</div>
                                                    <div>:</div>
                                                    <div>a. Nomor: 9120004561239<br />b. Tanggal: 20 September 2021</div>
                                                </div>
                                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                                    <div>2. Masa berlaku Izin Berusaha</div>
                                                    <div>:</div>
                                                    <div>Seumur Hidup / Selama Berusaha</div>
                                                </div>
                                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                                    <div>3. Instansi Penerbit</div>
                                                    <div>:</div>
                                                    <div>Lembaga OSS / BKPM</div>
                                                </div>
                                            </div>

                                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-4">E. Sertifikat Badan Usaha</h3>
                                            <div className="pl-2 space-y-1 text-[8px]">
                                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                                    <div>1. Sertifikat Badan Usaha</div>
                                                    <div>:</div>
                                                    <div>a. Nomor: SBU-00912-BG009-2023<br />b. Tanggal: 15 Maret 2023</div>
                                                </div>
                                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                                    <div>2. Masa Berlaku</div>
                                                    <div>:</div>
                                                    <div>14 Maret 2026 (Diperpanjang s/d 14 Maret 2029)</div>
                                                </div>
                                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                                    <div>3. Instansi Penerbit</div>
                                                    <div>:</div>
                                                    <div>LPJK Kementerian PUPR</div>
                                                </div>
                                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                                    <div>4. Kualifikasi</div>
                                                    <div>:</div>
                                                    <div>Menengah (M1)</div>
                                                </div>
                                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                                    <div>5. Klasifikasi</div>
                                                    <div>:</div>
                                                    <div>BG009</div>
                                                </div>
                                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                                    <div>6. Sub bidang klasifikasi/layanan</div>
                                                    <div>:</div>
                                                    <div>BG009 - Konstruksi Gedung Pendidikan</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* PAGE 3 (- 92 -) */}
                                        <div className="a4-portrait font-mono text-[9px] text-slate-800 space-y-4 leading-normal shadow-lg relative print-area shrink-0">
                                            <div className="text-right text-[8px] text-slate-400">- 92 -</div>
                                            
                                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-2">F. Sertifikat Lainnya (apabila disyaratkan)</h3>
                                            <div className="pl-2 space-y-1 text-[8px]">
                                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                                    <div>1. Sertifikat ISO 9001:2015</div>
                                                    <div>:</div>
                                                    <div>a. Nomor: ISO-9001-88912<br />b. Tanggal: 10 Okt 2024</div>
                                                </div>
                                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                                    <div>2. Masa Berlaku</div>
                                                    <div>:</div>
                                                    <div>09 Oktober 2027</div>
                                                </div>
                                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5">
                                                    <div>3. Instansi Penerbit</div>
                                                    <div>:</div>
                                                    <div>PT. SGS Indonesia</div>
                                                </div>
                                            </div>

                                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-4">G. Data Keuangan</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <div className="font-bold">1. Susunan Kepemilikan Saham (untuk PT) / Susunan Persero (untuk CV/Firma)</div>
                                                    <table className="w-full border-collapse border border-slate-850 text-[7px] text-center mt-1">
                                                        <thead>
                                                            <tr className="bg-slate-50 font-bold">
                                                                <th className="border border-slate-850 p-1 w-10">No</th>
                                                                <th className="border border-slate-850 p-1">Nama</th>
                                                                <th className="border border-slate-850 p-1">No. Identitas</th>
                                                                <th className="border border-slate-850 p-1">Alamat</th>
                                                                <th className="border border-slate-850 p-1">Persentase</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="border border-slate-850 p-1">1</td>
                                                                <td className="border border-slate-850 p-1 text-left font-bold">Ir. Budi Santoso</td>
                                                                <td className="border border-slate-850 p-1">3321041203770001</td>
                                                                <td className="border border-slate-850 p-1 text-left">Graha Construction Lt. 4, Jakarta</td>
                                                                <td className="border border-slate-850 p-1">60%</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="border border-slate-850 p-1">2</td>
                                                                <td className="border border-slate-850 p-1 text-left font-bold">Rahmat Hidayat, SE</td>
                                                                <td className="border border-slate-850 p-1">3321042508820002</td>
                                                                <td className="border border-slate-850 p-1 text-left">Graha Construction Lt. 4, Jakarta</td>
                                                                <td className="border border-slate-850 p-1">40%</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                
                                                <div className="grid grid-cols-[200px_10px_1fr] gap-0.5 text-[8px] mt-2">
                                                    <div className="font-bold">2. Pajak (Nomor Pokok Wajib Pajak)</div>
                                                    <div>:</div>
                                                    <div className="font-mono font-bold">01.234.567.8-012.000</div>
                                                </div>
                                            </div>

                                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-4">H. Data Pengalaman Perusahaan (15 Tahun Terakhir)</h3>
                                            <table className="w-full border-collapse border border-slate-850 text-[6px] leading-snug text-center">
                                                <thead>
                                                    <tr className="bg-slate-50 font-bold">
                                                        <th className="border border-slate-850 p-1" rowspan="2">No.</th>
                                                        <th className="border border-slate-850 p-1" rowspan="2">Nama Paket Pekerjaan</th>
                                                        <th className="border border-slate-850 p-1" rowspan="2">Sub Klasifikasi</th>
                                                        <th className="border border-slate-850 p-1" rowspan="2">Ringkasan Lingkup</th>
                                                        <th className="border border-slate-850 p-1" rowspan="2">Lokasi</th>
                                                        <th className="border border-slate-850 p-1" colspan="2">Pemberi Kerja</th>
                                                        <th className="border border-slate-850 p-1" colspan="2">Kontrak</th>
                                                        <th className="border border-slate-850 p-1" colspan="2">Tgl Selesai / PHO</th>
                                                    </tr>
                                                    <tr className="bg-slate-50 font-bold">
                                                        <th className="border border-slate-850 p-1">Nama</th>
                                                        <th className="border border-slate-850 p-1">Alamat/Telp</th>
                                                        <th className="border border-slate-850 p-1">No/Tanggal</th>
                                                        <th className="border border-slate-850 p-1">Nilai</th>
                                                        <th className="border border-slate-850 p-1">Kontrak</th>
                                                        <th className="border border-slate-850 p-1">BA Serah Terima</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="border border-slate-850 p-1">1</td>
                                                        <td className="border border-slate-850 p-1 text-left font-bold">Pembangunan Gedung Serbaguna</td>
                                                        <td className="border border-slate-850 p-1">BG009</td>
                                                        <td className="border border-slate-850 p-1 text-left">Pekerjaan struktur beton & arsitektur gedung</td>
                                                        <td className="border border-slate-850 p-1">Kab. Rembang</td>
                                                        <td className="border border-slate-850 p-1">Dinas PUPR Rembang</td>
                                                        <td className="border border-slate-850 p-1">Jl. Pemuda No. 5</td>
                                                        <td className="border border-slate-850 p-1">602/KTR/IV/2025</td>
                                                        <td className="border border-slate-850 p-1 text-right">Rp 4.100.000.000</td>
                                                        <td className="border border-slate-850 p-1">20 Okt 2025</td>
                                                        <td className="border border-slate-850 p-1">BAST-77/X/2025</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-4">I. Data Pengalaman Perusahaan Dalam Kurun Waktu 4 Tahun Terakhir</h3>
                                            <table className="w-full border-collapse border border-slate-850 text-[6px] leading-snug text-center">
                                                <thead>
                                                    <tr className="bg-slate-50 font-bold">
                                                        <th className="border border-slate-850 p-1" rowspan="2">No.</th>
                                                        <th className="border border-slate-850 p-1" rowspan="2">Nama Paket Pekerjaan</th>
                                                        <th className="border border-slate-850 p-1" rowspan="2">Ringkasan Lingkup</th>
                                                        <th className="border border-slate-850 p-1" rowspan="2">Lokasi</th>
                                                        <th className="border border-slate-850 p-1" colspan="2">Pemberi Kerja</th>
                                                        <th className="border border-slate-850 p-1" colspan="2">Kontrak</th>
                                                        <th className="border border-slate-850 p-1" colspan="2">Tgl Selesai / PHO</th>
                                                    </tr>
                                                    <tr className="bg-slate-50 font-bold">
                                                        <th className="border border-slate-850 p-1">Nama</th>
                                                        <th className="border border-slate-850 p-1">Alamat/Telp</th>
                                                        <th className="border border-slate-850 p-1">No/Tanggal</th>
                                                        <th className="border border-slate-850 p-1">Nilai</th>
                                                        <th className="border border-slate-850 p-1">Kontrak</th>
                                                        <th className="border border-slate-850 p-1">BA Serah Terima</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="border border-slate-850 p-1">1</td>
                                                        <td className="border border-slate-850 p-1 text-left font-bold">Pembangunan Jaringan Irigasi D.I. Kedung Uling</td>
                                                        <td className="border border-slate-850 p-1 text-left">Pembangunan bendung & saluran sekunder beton</td>
                                                        <td className="border border-slate-850 p-1">Kab. Grobogan</td>
                                                        <td className="border border-slate-850 p-1">Dinas PUPR Grobogan</td>
                                                        <td className="border border-slate-850 p-1">Jl. Gajah Mada No. 12</td>
                                                        <td className="border border-slate-850 p-1">403/KTR/V/2026</td>
                                                        <td className="border border-slate-850 p-1 text-right">Rp 4.250.000.000</td>
                                                        <td className="border border-slate-850 p-1">18 Juli 2026</td>
                                                        <td className="border border-slate-850 p-1">BAST-21/VII/2026</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* PAGE 4 (- 93 -) */}
                                        <div className="a4-portrait font-mono text-[9px] text-slate-800 space-y-4 leading-normal shadow-lg relative print-area shrink-0">
                                            <div className="text-right text-[8px] text-slate-400">- 93 -</div>
                                            
                                            <h3 className="font-bold text-slate-900 border-b border-slate-800 pb-1 mt-2">J. Data Pekerjaan yang Sedang Dilaksanakan (Wajib Diisi untuk Menghitung SKP)</h3>
                                            <table className="w-full border-collapse border border-slate-850 text-[6px] leading-snug text-center">
                                                <thead>
                                                    <tr className="bg-slate-50 font-bold">
                                                        <th className="border border-slate-850 p-1" rowspan="2">No.</th>
                                                        <th className="border border-slate-850 p-1" rowspan="2">Nama Paket Pekerjaan</th>
                                                        <th className="border border-slate-850 p-1" rowspan="2">Klasifikasi/Sub Klasifikasi</th>
                                                        <th className="border border-slate-850 p-1" rowspan="2">Lokasi</th>
                                                        <th className="border border-slate-850 p-1" colspan="2">Pemberi Kerja</th>
                                                        <th className="border border-slate-850 p-1" colspan="2">Kontrak</th>
                                                        <th className="border border-slate-850 p-1" colspan="2">Total Progres</th>
                                                    </tr>
                                                    <tr className="bg-slate-50 font-bold">
                                                        <th className="border border-slate-850 p-1">Nama</th>
                                                        <th className="border border-slate-850 p-1">Alamat/Telp</th>
                                                        <th className="border border-slate-850 p-1">No/Tanggal</th>
                                                        <th className="border border-slate-850 p-1">Nilai</th>
                                                        <th className="border border-slate-850 p-1">No/Tanggal</th>
                                                        <th className="border border-slate-850 p-1">Total Nilai</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="border border-slate-850 p-1">1</td>
                                                        <td className="border border-slate-850 p-1 text-left font-bold">Gedung Laboratorium Terpadu UNS</td>
                                                        <td className="border border-slate-850 p-1">BG009</td>
                                                        <td className="border border-slate-850 p-1">Kota Surakarta</td>
                                                        <td className="border border-slate-850 p-1">UNS Surakarta</td>
                                                        <td className="border border-slate-850 p-1">Jl. Ir. Sutami 36</td>
                                                        <td className="border border-slate-850 p-1">02/KTR-UNS/2026</td>
                                                        <td className="border border-slate-850 p-1 text-right">Rp 12.800.000.000</td>
                                                        <td className="border border-slate-850 p-1">Progres 80%</td>
                                                        <td className="border border-slate-850 p-1 text-right">Rp 10.240.000.000</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <div className="pt-4 text-justify text-[7.5px] leading-relaxed">
                                                Demikian Formulir Isian Kualifikasi ini saya buat dengan sebenarnya dan penuh rasa tanggung jawab. Jika dikemudian hari ditemui bahwa data/dokumen yang saya sampaikan tidak benar dan/atau ada pemalsuan, maka badan usaha yang saya wakili bersedia dikenakan sanksi berupa sanksi administratif, sanksi pencantuman dalam Daftar Hitam, gugatan secara perdata, dan/atau pelaporan secara pidana kepada pihak berwenang sesuai dengan ketentuan peraturan perundang-undangan.
                                            </div>

                                            {/* Signature Block */}
                                            <div className="pt-6 flex justify-between text-[8px]">
                                                <div></div>
                                                <div className="text-center w-60 space-y-6">
                                                    <div>
                                                        Jakarta, 19 Juli 2026<br />
                                                        <span className="font-bold">PT. MAJU KONSTRUKSI</span>
                                                    </div>
                                                    <div className="border border-slate-350 w-24 mx-auto p-1 text-[6px] text-slate-400 border-dashed">
                                                        Meterai Rp10.000,00 dan Tanda Tangan
                                                    </div>
                                                    <div>
                                                        <span className="font-bold underline text-[9px]">Ir. Budi Santoso</span><br />
                                                        Direktur Utama
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SUB-TAB 4: KSO & KOLABORATOR (RBAC) */}
                            {kualifikasiSubTab === 'kso' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        
                                        {/* KSO Connection Panel */}
                                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                                            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                                <Users size={16} className="text-indigo-600" /> Penautan & Integrasi Rekanan KSO
                                            </h3>

                                            <div className="space-y-3">
                                                <div>
                                                    <label className={LABEL}>Pilih Rekanan KSO (Dari Direktori Global)</label>
                                                    <select 
                                                        className={SELECT_STYLE + " w-full"}
                                                        value={selectedKsoPartnerId}
                                                        onChange={e => {
                                                            setSelectedKsoPartnerId(e.target.value);
                                                            setKsoModalShare(0); // Reset share until synced from doc
                                                            setKsoShareStatus('Unsynced');
                                                        }}
                                                    >
                                                        <option value="">-- Pilih Rekanan KSO --</option>
                                                        {ksoPartnersList.map(p => <option key={p.id} value={p.id}>{p.nama}</option>)}
                                                    </select>
                                                </div>

                                                {selectedKsoPartnerId && (
                                                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3.5 animate-in zoom-in-95 duration-150">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-[10px] text-slate-400 font-bold uppercase">Porsi Kepemilikan KSO</span>
                                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border
                                                                ${ksoShareStatus === 'Synced' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
                                                                {ksoShareStatus}
                                                            </span>
                                                        </div>

                                                        {ksoShareStatus === 'Unsynced' ? (
                                                            <div className="space-y-2">
                                                                <p className="text-[10px] text-rose-600 font-bold leading-relaxed">
                                                                    Persentase porsi modal KSO belum ditarik dari dokumen administrasi (Surat Perjanjian KSO).
                                                                </p>
                                                                <button 
                                                                    onClick={() => {
                                                                        setKsoModalShare(40); // 40% KSO share pulled
                                                                        setKsoShareStatus('Synced');
                                                                        setAiLogs(logs => [...logs, { time: "09:45", agent: "Sistem Penyusunan", msg: "Sinkronisasi porsi modal KSO (Leader: 60%, Member: 40%) dari berkas administrasi berhasil." }]);
                                                                    }}
                                                                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm transition-all"
                                                                >
                                                                    Hubungkan Porsi Modal KSO (Tarik dari Administrasi)
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="space-y-2 animate-in fade-in duration-200">
                                                                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
                                                                    <div>Leader (PT. Maju Konstruksi):</div>
                                                                    <div className="text-right text-slate-900">60%</div>
                                                                    <div>Mitra ({ksoPartnersList.find(x => x.id === selectedKsoPartnerId)?.nama}):</div>
                                                                    <div className="text-right text-slate-900">40%</div>
                                                                </div>
                                                                
                                                                {/* Combined calculations box */}
                                                                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[10px] text-slate-500 font-semibold">
                                                                    <div className="text-slate-800 font-bold">Rasio KD & SKP Gabungan KSO:</div>
                                                                    <div>KD Gabungan KSO: Rp 6.100.000.000,00</div>
                                                                    <div className="text-[9px] text-slate-400 italic">Rumus: KD_Leader + (Porsi_Member / Porsi_Leader) * KD_Member</div>
                                                                    <div className="text-emerald-600 font-bold">Evaluasi KSO: LOLOS (KD Gabungan KSO &gt; HPS)</div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* RBAC Simulation Panel */}
                                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                                            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                                                <Lock size={16} className="text-blue-600" /> Simulasi Hak Akses Kolaborator (RBAC)
                                            </h3>
                                            
                                            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                                                Uji batasan hak akses portal untuk kolaborator eksternal atau staf khusus Anda:
                                            </p>

                                            <div className="space-y-2.5">
                                                {[
                                                    { role: 'owner', label: 'Login sebagai Pemilik Akun / Admin Utama', desc: 'Akses penuh ke seluruh menu dan workspace' },
                                                    { role: 'estimator', label: 'Login sebagai Staf Estimator (RBAC)', desc: 'Hanya diizinkan mengakses menu RAB & BOQ Workspace' },
                                                    { role: 'partner', label: 'Login sebagai Rekanan KSO Partner (RBAC)', desc: 'Hanya dapat memperbarui berkas kualifikasi internal rekanan' }
                                                ].map(item => (
                                                    <button
                                                        key={item.role}
                                                        onClick={() => {
                                                            setSimulatedRole(item.role);
                                                            if (item.role === 'estimator') {
                                                                setSubTab('rab');
                                                            } else if (item.role === 'partner') {
                                                                setSubTab('kualifikasi');
                                                                setKualifikasiSubTab('validation');
                                                            }
                                                        }}
                                                        className={`w-full p-3 text-left border rounded-xl transition-all cursor-pointer flex flex-col gap-0.5
                                                            ${simulatedRole === item.role 
                                                                ? 'bg-white border-blue-500 shadow-sm ring-2 ring-blue-500/10' 
                                                                : 'bg-white hover:bg-slate-100 border-slate-200'}`}
                                                    >
                                                        <span className="text-xs font-bold text-slate-800">{item.label}</span>
                                                        <span className="text-[10px] text-slate-500 font-medium">{item.desc}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}

                        </div>
                    )}

                    {/* ========== TAB 3: ULTIMATE RAB WORKSPACE ========== */}
                    {subTab === 'rab' && (
                        <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
                            
                            
                            
                            {!isBoqUploaded ? (
                                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 relative overflow-hidden">
                                    <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-emerald-500 to-indigo-500"></div>
                                    
                                    {!isSimulatingAi ? (
                                        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-12 text-center animate-in fade-in zoom-in duration-500 relative">
                                            
                                            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <UploadCloud size={48} className="text-indigo-600" />
                                            </div>
                                            
                                            <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Mulai Ultimate RAB</h2>
                                            <p className="text-slate-500 mb-8 max-w-lg mx-auto">
                                                Langkah pertama: Tarik dan lepaskan dokumen <b>BoQ Kosong</b> atau <b>RAB Perencanaan</b> yang baru saja Anda unduh dari SPSE/Apendo ke area ini.
                                            </p>
                                            
                                            <div 
                                                onClick={() => {
                                                    setIsSimulatingAi(true);
                                                    setTimeout(() => {
                                                        setIsSimulatingAi(false);
                                                        setIsBoqUploaded(true);
                                                        setRabActiveSheet('hsd');
                                                    }, 3500);
                                                }}
                                                className="border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/50 rounded-2xl p-10 cursor-pointer transition-all group"
                                            >
                                                <div className="text-indigo-600 font-bold mb-2 group-hover:scale-110 transition-transform">
                                                    Klik atau Drop File .xlsx / .pdf di sini
                                                </div>
                                                <div className="text-xs text-slate-400">TeamTender AI akan membedah dokumen menjadi 4 lapis.</div>
                                            </div>
                                            
                                            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-500"/> Ekstrak HSD</span>
                                                <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-500"/> Mapping AHSP</span>
                                                <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-500"/> Kunci Volume BoQ</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="max-w-md w-full text-center space-y-6">
                                            <div className="relative w-32 h-32 mx-auto">
                                                <div className="absolute inset-0 border-4 border-indigo-200 rounded-full animate-ping"></div>
                                                <div className="absolute inset-2 border-4 border-indigo-500 rounded-full animate-spin border-t-transparent"></div>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Cpu size={32} className="text-indigo-600 animate-pulse" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800 mb-2">Reverse-Engineering BoQ...</h3>
                                                <p className="text-sm text-slate-500 animate-pulse">Membedah struktur AHSP dan mengekstrak Harga Satuan Dasar berdasarkan Standar PUPR 2025...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
    {/* Top Navigation Tabs */}
                            <div className="h-14 bg-white border-b border-slate-300 flex items-center px-4 shrink-0 overflow-x-auto shadow-sm z-10">
                                <div className="flex items-center space-x-1 h-full py-2">
                                    {[
                                        { id: 'hsd', label: 'Harga Satuan Dasar', icon: Database },
                                        { id: 'ahsp', label: 'AHSP', icon: Calculator },
                                        { id: 'boq', label: 'BOQ', icon: Table },
                                        { id: 'rekap', label: 'Rekapitulasi', icon: FileText },
                                        { id: 'apendo', label: 'Sync Apendo', icon: HardDrive },
                                    ].map(tab => {
                                        const Icon = tab.icon;
                                        const isActive = rabActiveSheet === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => setRabActiveSheet(tab.id)}
                                                className={`px-4 h-full rounded-lg flex items-center gap-2 text-xs font-bold transition-all whitespace-nowrap
                                                    ${isActive 
                                                        ? 'bg-indigo-600 text-white shadow-md' 
                                                        : 'text-slate-600 hover:bg-slate-100'}`
                                                }
                                            >
                                                <Icon size={14} className={isActive ? 'text-indigo-200' : 'text-slate-400'}/>
                                                {tab.label}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
    
                            {/* Main Content Area */}
                            <div className="flex-1 overflow-y-auto">
                                {/* SHEET 1: PONDASI HSD */}
                                {rabActiveSheet === 'hsd' && (
                                    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
                                        
                                        {/* GLOBAL STRATEGY ENGINE PANEL */}
                                        <div className="bg-indigo-900 rounded-xl shadow-xl overflow-hidden text-white mb-6">
                                            <div className="px-6 py-4 border-b border-indigo-800 flex justify-between items-center bg-indigo-950/50">
                                                <h3 className="font-bold flex items-center gap-2"><Zap size={18} className="text-amber-400"/> Global Strategy Engine (Bulk Adjuster)</h3>
                                                <span className="text-[10px] font-mono px-2 py-1 bg-indigo-800 rounded text-indigo-300">CTRL+SHIFT+G</span>
                                            </div>
                                            <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
                                                <div className="flex-1 space-y-4 w-full">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-indigo-300 uppercase mb-2">Target Divisi</label>
                                                            <select className="w-full bg-indigo-950 border border-indigo-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400">
                                                                <option>Semua Divisi Pekerjaan</option>
                                                                <option>I. Persiapan</option>
                                                                <option>II. Beton Utama</option>
                                                                <option>III. Arsitektur</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-indigo-300 uppercase mb-2">Aksi Massal</label>
                                                            <div className="flex gap-2">
                                                                <select className="w-2/3 bg-indigo-950 border border-indigo-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400">
                                                                    <option>Turunkan Harga Material</option>
                                                                    <option>Naikkan Upah Pekerja</option>
                                                                    <option>Pangkas Profit Margin</option>
                                                                </select>
                                                                <input type="number" defaultValue={5} className="w-1/3 bg-indigo-950 border border-indigo-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 text-center" />
                                                                <span className="flex items-center text-indigo-400 font-bold">%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="shrink-0 flex items-center justify-center">
                                                    <button className="h-full px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black rounded-xl transition-all shadow-lg hover:shadow-emerald-500/50 flex flex-col items-center gap-1">
                                                        <Sparkles size={20} />
                                                        <span>Eksekusi ke</span>
                                                        <span className="text-xs">1,245 Item</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                                            <div className="flex justify-between items-center mb-6">
                                                <div>
                                                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                                        <Database className="text-indigo-600" size={20}/> Harga Satuan Dasar (HSD)
                                                    </h3>
                                                    <p className="text-xs text-slate-500">Ubah harga material lokal di sini. Perubahan akan merambat ke seluruh AHSP.</p>
                                                </div>
                                                <div className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-lg border border-emerald-200 uppercase">
                                                    Standard PUPR 2025 Compliant
                                                </div>
                                            </div>
                                            
                                            <table className="w-full text-left text-xs border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-50 border-y border-slate-200 text-slate-600">
                                                        <th className="py-3 px-4 font-bold w-16 text-center">Kode</th>
                                                        <th className="py-3 px-4 font-bold">Uraian Bahan/Upah</th>
                                                        <th className="py-3 px-4 font-bold w-20 text-center">Sat</th>
                                                        <th className="py-3 px-4 font-bold w-48 text-right">Harga Satuan Dasar (Rp)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {[
                                                        { code: 'L.01', name: 'Pekerja', sat: 'OH', price: 120000 },
                                                        { code: 'L.02', name: 'Tukang Batu', sat: 'OH', price: 150000 },
                                                        { code: 'M.14', name: 'Semen Portland (Gresik)', sat: 'kg', price: 1250 },
                                                        { code: 'M.44', name: 'Pasir Beton (Cepu)', sat: 'm3', price: 275000 },
                                                        { code: 'M.17', name: 'Besi Beton Polos', sat: 'kg', price: 14500 },
                                                        { code: 'E.05', name: 'Sewa Concrete Mixer 0.3 m3', sat: 'Sewa/Hari', price: 450000 }
                                                    ].map((item, idx) => (
                                                        <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                                            <td className="py-2.5 px-4 text-center font-mono text-slate-400">{item.code}</td>
                                                            <td className="py-2.5 px-4 font-semibold text-slate-700">{item.name}</td>
                                                            <td className="py-2.5 px-4 text-center text-slate-500">{item.sat}</td>
                                                            <td className="py-2.5 px-4">
                                                                <input 
                                                                    type="number" 
                                                                    defaultValue={item.price}
                                                                    className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-right font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 group-hover:border-indigo-300"
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* SHEET 2: BEDAH AHSP */}
                                {rabActiveSheet === 'ahsp' && (
                                    <div className="p-6 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
                                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 opacity-50"></div>
                                            
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Analisa Harga Satuan Pekerjaan (AHSP)</div>
                                                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-2">
                                                        <Calculator className="text-indigo-600" size={24}/> Pembuatan 1 m3 Beton K-250
                                                    </h3>
                                                    <div className="flex gap-2">
                                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">Kode: 2.2.1.6.1.c</span>
                                                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold">SNI 2025</span>
                                                    </div>
                                                </div>
                                                
                                                {/* Profit Slider */}
                                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 w-64">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <label className="text-[10px] font-bold text-slate-600 uppercase">Overhead & Profit (%)</label>
                                                        <span className="text-sm font-black text-indigo-700">{profitMargin}%</span>
                                                    </div>
                                                    <input 
                                                        type="range" min="0" max="15" step="1"
                                                        value={profitMargin}
                                                        onChange={e => setProfitMargin(e.target.value)}
                                                        className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                                    />
                                                    <div className="text-[9px] text-slate-400 mt-2 text-center">Geser ke 0% untuk Mode Klarifikasi Kewajaran</div>
                                                </div>
                                            </div>

                                            <div className="border border-slate-200 rounded-lg overflow-hidden mb-6">
                                                <table className="w-full text-left text-xs">
                                                    <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                                                        <tr>
                                                            <th className="p-3 font-bold">Komponen</th>
                                                            <th className="p-3 font-bold text-center">Sat</th>
                                                            <th className="p-3 font-bold text-right">Koefisien</th>
                                                            <th className="p-3 font-bold text-right">Harga Dasar (Rp)</th>
                                                            <th className="p-3 font-bold text-right">Jumlah Harga (Rp)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-100">
                                                        <tr><td colSpan="5" className="px-3 py-1.5 bg-slate-50 font-bold text-[10px] text-slate-500 uppercase">A. Tenaga</td></tr>
                                                        <tr className="hover:bg-slate-50">
                                                            <td className="p-3 pl-6 font-medium text-slate-700">Pekerja</td>
                                                            <td className="p-3 text-center text-slate-500">OH</td>
                                                            <td className="p-3 text-right">1.6500</td>
                                                            <td className="p-3 text-right">120,000</td>
                                                            <td className="p-3 text-right font-semibold text-slate-800">198,000</td>
                                                        </tr>
                                                        <tr className="hover:bg-slate-50">
                                                            <td className="p-3 pl-6 font-medium text-slate-700">Tukang Batu</td>
                                                            <td className="p-3 text-center text-slate-500">OH</td>
                                                            <td className="p-3 text-right">0.2750</td>
                                                            <td className="p-3 text-right">150,000</td>
                                                            <td className="p-3 text-right font-semibold text-slate-800">41,250</td>
                                                        </tr>
                                                        
                                                        <tr><td colSpan="5" className="px-3 py-1.5 bg-slate-50 font-bold text-[10px] text-slate-500 uppercase">B. Bahan</td></tr>
                                                        <tr className="hover:bg-slate-50">
                                                            <td className="p-3 pl-6 font-medium text-slate-700">Semen Portland</td>
                                                            <td className="p-3 text-center text-slate-500">Kg</td>
                                                            <td className="p-3 text-right">384.0000</td>
                                                            <td className="p-3 text-right">1,250</td>
                                                            <td className="p-3 text-right font-semibold text-slate-800">480,000</td>
                                                        </tr>
                                                        <tr className="hover:bg-slate-50">
                                                            <td className="p-3 pl-6 font-medium text-slate-700">Pasir Beton</td>
                                                            <td className="p-3 text-center text-slate-500">m3</td>
                                                            <td className="p-3 text-right">0.4940</td>
                                                            <td className="p-3 text-right">275,000</td>
                                                            <td className="p-3 text-right font-semibold text-slate-800">135,850</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="flex justify-end">
                                                <div className="w-80 space-y-2 text-sm">
                                                    <div className="flex justify-between text-slate-600">
                                                        <span>Sub Total (A + B + C)</span>
                                                        <span className="font-semibold">Rp 855,100</span>
                                                    </div>
                                                    <div className="flex justify-between text-indigo-600 font-semibold border-b border-slate-200 pb-2">
                                                        <span>Overhead & Profit ({profitMargin}%)</span>
                                                        <span>Rp {(855100 * profitMargin / 100).toLocaleString('id-ID')}</span>
                                                    </div>
                                                    <div className="flex justify-between text-slate-900 font-black text-lg pt-1">
                                                        <span>Harga Satuan (D + E)</span>
                                                        <span>Rp {(855100 + (855100 * profitMargin / 100)).toLocaleString('id-ID')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SHEET 3: BoQ (BILL OF QUANTITIES) */}
                                {rabActiveSheet === 'boq' && (
                                    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
                                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[70vh]">
                                            <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                                                <div>
                                                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                                        <Table className="text-indigo-600" size={20}/> Bill of Quantity (BoQ)
                                                    </h3>
                                                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                        <Lock size={12} className="text-amber-500"/> Volume terkunci untuk menghindari kesalahan Koreksi Aritmatik (Pasal 28.3).
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1 overflow-auto">
                                                <table className="w-full text-left text-[11px] whitespace-nowrap">
                                                    <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 sticky top-0 z-10 shadow-sm">
                                                        <tr>
                                                            <th className="py-3 px-4 font-bold text-center w-12">No</th>
                                                            <th className="py-3 px-4 font-bold">Uraian Pekerjaan</th>
                                                            <th className="py-3 px-4 font-bold text-center">Sat</th>
                                                            <th className="py-3 px-4 font-bold text-right bg-amber-50 text-amber-800 border-l border-amber-100" title="Terkunci">Vol 🔒</th>
                                                            <th className="py-3 px-4 font-bold text-right w-40 border-l border-slate-200">Harga Satuan (Rp)</th>
                                                            <th className="py-3 px-4 font-bold text-right w-40">Total (Rp)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-100">
                                                        <tr className="bg-slate-50"><td colSpan="6" className="py-2 px-4 font-black text-xs text-slate-800">II. PEKERJAAN BETON UTAMA</td></tr>
                                                        {[
                                                            { no: '2.1', name: 'Beton K-250 (Ready Mix)', sat: 'm3', vol: 120.50, price: 1150000 },
                                                            { no: '2.2', name: 'Pembesian dengan Besi Polos', sat: 'Kg', vol: 8500.00, price: 18750 },
                                                            { no: '2.3', name: 'Bekisting Kayu Klas III', sat: 'm2', vol: 450.00, price: 110000 }
                                                        ].map((item, idx) => (
                                                            <tr key={idx} className="hover:bg-slate-50">
                                                                <td className="py-2.5 px-4 text-center text-slate-400">{item.no}</td>
                                                                <td className="py-2.5 px-4 font-semibold text-slate-700 truncate max-w-[200px]">{item.name}</td>
                                                                <td className="py-2.5 px-4 text-center text-slate-500">{item.sat}</td>
                                                                <td className="py-2.5 px-4 text-right font-mono font-bold text-amber-700 bg-amber-50/30 border-l border-amber-50">{item.vol.toLocaleString('en-US', {minimumFractionDigits:2})}</td>
                                                                <td className="py-2.5 px-4 border-l border-slate-100">
                                                                    <input 
                                                                        type="number" 
                                                                        defaultValue={item.price}
                                                                        className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-right font-bold text-indigo-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                                                    />
                                                                </td>
                                                                <td className="py-2.5 px-4 text-right font-black text-slate-800 bg-slate-50/50">
                                                                    {(item.vol * item.price).toLocaleString('id-ID')}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SHEET 4: REKAPITULASI */}
                                {rabActiveSheet === 'rekap' && (
                                    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
                                        
                                        {/* Survival Mode 80% Indicator */}
                                        <div className="bg-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden flex items-center justify-between">
                                            <div className="absolute -right-10 -top-10 opacity-10">
                                                <TrendingDown size={150} />
                                            </div>
                                            <div className="relative z-10">
                                                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-1">Total Penawaran Final (Dibulatkan)</h3>
                                                <div className="text-4xl font-black tracking-tight text-emerald-400 mb-2">Rp 11.500.000.000</div>
                                                <div className="flex gap-4 items-center">
                                                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full">92.5% dari HPS (Aman)</span>
                                                    <span className="text-[10px] text-slate-400">Ambang Batas Klarifikasi Kewajaran: Rp 9.940.000.000 (80%)</span>
                                                </div>
                                            </div>
                                            {/* Action Buttons for Survival Mode */}
                                            <div className="relative z-10 flex flex-col gap-2">
                                                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold rounded-lg border border-slate-600 transition-colors flex items-center justify-center gap-2">
                                                    <FileDown size={14}/> Cetak PDF Klarifikasi (Profit 0%)
                                                </button>
                                            </div>
                                        </div>

                                        
                                    </div>
                                )}
                                
                                {/* SHEET 5: SYNC APENDO */}
                                {rabActiveSheet === 'apendo' && (
                                    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
                                        {/* Apendo Injector Module */}
    
                                        <div className="bg-white rounded-2xl border-2 border-indigo-100 shadow-sm p-8 text-center space-y-6 relative">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md flex items-center gap-1.5">
                                                <HardDrive size={12}/> The Apendo Injector
                                            </div>
                                            
                                            <div className="max-w-lg mx-auto">
                                                <h2 className="text-2xl font-black text-slate-800 mb-3 mt-2">Suntikkan Harga ke File Apendo</h2>
                                                <p className="text-sm text-slate-500 leading-relaxed">
                                                    Unggah Template Excel kosong yang baru saja Anda <i>download</i> dari aplikasi <b>Apendo versi 5</b>. Sistem akan menginjeksi Harga Satuan final secara otomatis tanpa mengubah nama *file* maupun <i>formatting</i> bawaan LKPP.
                                                </p>
                                            </div>

                                            {!isApendoSyncing ? (
                                                <div 
                                                    onClick={() => {
                                                        setIsApendoSyncing(true);
                                                        setTimeout(() => setIsApendoSyncing(false), 3000);
                                                    }}
                                                    className="w-full max-w-md mx-auto p-8 border-2 border-dashed border-indigo-300 rounded-2xl cursor-pointer hover:bg-indigo-50/50 hover:border-indigo-500 transition-all group"
                                                >
                                                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                        <FileSpreadsheet size={28} className="text-indigo-600" />
                                                    </div>
                                                    <div className="text-sm font-bold text-slate-700 mb-1">Unggah Template Apendo (.xlsx)</div>
                                                    <div className="text-[10px] font-mono text-slate-400">Contoh: 8369999-14300999... .xlsx</div>
                                                </div>
                                            ) : (
                                                <div className="w-full max-w-md mx-auto p-8 bg-slate-900 rounded-2xl text-white">
                                                    <Calculator size={32} className="mx-auto text-emerald-400 mb-4 animate-bounce" />
                                                    <h3 className="font-bold text-lg mb-2">Menginjeksi Harga Satuan...</h3>
                                                    <p className="text-xs text-slate-400 mb-4">Mempertahankan formatting cell dan formula Excel asli...</p>
                                                    <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
                                                        <div className="bg-emerald-500 h-2 rounded-full w-full animate-[progress_3s_ease-in-out]"></div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left flex gap-3 text-amber-800 items-start">
                                                <AlertTriangle size={16} className="shrink-0 mt-0.5 text-amber-600"/>
                                                <p className="text-[11px] leading-relaxed">
                                                    <b>PENTING:</b> Pastikan nama file yang Anda unduh nanti <b>TIDAK DIUBAH</b> saat melakukan proses enkripsi (Lakukan Enkripsi) di dalam aplikasi Apendo desktop Anda.
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>

                                                        

                                </>
                            )}
                        </div>
                    )}
                    
                    {/* ========== TAB 4: RKK & RMPK WORKSPACE ========== */}{/* ========== TAB 4: RKK & RMPK WORKSPACE ========== */}{/* ========== TAB 4: RKK & RMPK WORKSPACE ========== */}
                    
                    {/* ========== TAB X: TEKNIS WORKSPACE ========== */}
                    {subTab === 'teknis' && (
                        <div className="flex flex-col h-full bg-slate-50">
                            {/* Header Teknis */}
                            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-800">Workspace Persyaratan Teknis</h3>
                                    <p className="text-xs text-slate-500">Pusat kelengkapan dokumen teknis penawaran</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-200 hover:bg-indigo-100 flex items-center gap-1">
                                        <CheckCircle2 size={14} /> Verifikasi Kelengkapan Teknis
                                    </button>
                                </div>
                            </div>
                            
                            {/* Sub-Tab Navigation */}
                            <div className="bg-white border-b border-slate-200 px-6">
                                <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
                                    {[
                                        { id: 'personel', label: 'Personel Manajerial' },
                                        { id: 'peralatan', label: 'Peralatan Utama' },
                                        { id: 'rkk', label: 'RKK' },
                                        { id: 'dukungan', label: 'Surat Dukungan' },
                                        { id: 'jadwal', label: 'Jadwal Pelaksanaan' },
                                        { id: 'metode', label: 'Metode Pelaksanaan' },
                                        { id: 'rmpk', label: 'RMPK' }
                                    ].map(sub => (
                                        <button
                                            key={sub.id}
                                            onClick={() => setTeknisSubTab(sub.id)}
                                            className={`px-4 py-3 text-[11px] font-bold border-b-2 whitespace-nowrap transition-colors
                                                ${teknisSubTab === sub.id 
                                                    ? 'border-indigo-600 text-indigo-600' 
                                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                                        >
                                            {sub.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Main Content Area */}
                            <div className="flex-1 p-6 overflow-y-auto">
                                {/* TAB: Personel */}
                                {teknisSubTab === 'personel' && (
                                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                                        <div className="flex flex-col h-full bg-slate-50">
                                            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                                        <UserCheck size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-800">Personel Manajerial</h3>
                                                        <p className="text-xs text-slate-500">Daftar Riwayat Hidup (CV) sesuai standar dokumen tender</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1 p-6 overflow-y-auto">
                                                <div className="flex gap-6">
                                                    {/* List & Edit */}
                                                    <div className="w-1/3 space-y-4">
                                                        <div className="flex justify-between items-center">
                                                            <h4 className="text-xs font-bold text-slate-700">Daftar Personel</h4>
                                                            <button className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold hover:bg-blue-100 flex items-center gap-1"><Plus size={10}/> Tambah</button>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {personelList.map(p => (
                                                                <div 
                                                                    key={p.id}
                                                                    onClick={() => setSelectedPersonelId(p.id)}
                                                                    className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedPersonelId === p.id ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300' : 'bg-white border-slate-200 hover:border-blue-200'}`}
                                                                >
                                                                    <div className="font-bold text-slate-800 text-xs">{p.nama}</div>
                                                                    <div className="text-[10px] text-slate-500">{p.jabatan}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 border-dashed text-center mt-6">
                                                            <FileText size={20} className="mx-auto text-indigo-300 mb-2" />
                                                            <p className="text-[10px] font-bold text-slate-700">Unggah CV & Bukti Scan</p>
                                                            <p className="text-[9px] text-slate-500 mb-2">Upload final PDF bertandatangan dan scan referensi.</p>
                                                            <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-[10px] font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-1">
                                                                <Download size={11} className="rotate-180" /> Pilih File
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* A4 Preview */}
                                                    <div className="w-2/3">
                                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                                                            <span>Pratinjau CV (A4 Portrait)</span>
                                                            <div className="flex gap-2">
                                                                <button className="bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded text-[9px] font-bold flex items-center gap-1 hover:bg-slate-50"><Edit3 size={10}/> Edit Data</button>
                                                                <button className="bg-blue-600 text-white px-2 py-1 rounded text-[9px] font-bold flex items-center gap-1 hover:bg-blue-700"><Printer size={10}/> Cetak Draf</button>
                                                            </div>
                                                        </div>
                                                        
                                                        {personelList.filter(p => p.id === selectedPersonelId).map(personel => (
                                                            <div key={personel.id} className="a4-portrait font-mono text-[9px] text-slate-800 leading-normal shadow-lg overflow-y-auto">
                                                                <div className="text-right mb-6">
                                                                    <div className="inline-block border border-black px-4 py-1 font-bold text-[10px]">CONTOH</div>
                                                                </div>
                                                                
                                                                <div className="text-center font-bold text-[11px] mb-8">
                                                                    Daftar Riwayat Hidup Personel Manajerial
                                                                </div>
                                                                
                                                                <table className="w-full mb-6">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="w-5/12 py-1">1. Jabatan dalam pekerjaan yang akan dilaksanakan</td>
                                                                            <td className="w-[2%]">:</td>
                                                                            <td>{personel.jabatan}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="py-1">2. Nama Perusahaan</td>
                                                                            <td>:</td>
                                                                            <td>PT. Maju Konstruksi</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="py-1">3. Nama Personel</td>
                                                                            <td>:</td>
                                                                            <td>{personel.nama}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="py-1">4. Tempat/Tanggal Lahir</td>
                                                                            <td>:</td>
                                                                            <td>{personel.tempatLahir} / {personel.tglLahir}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="py-1">5. Riwayat Pendidikan (Lembaga pendidikan, tempat dan tahun tamat belajar)</td>
                                                                            <td>:</td>
                                                                            <td>{personel.pendidikan}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="py-1 align-top">6. Pengalaman Kerja</td>
                                                                            <td className="align-top">:</td>
                                                                            <td></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                
                                                                <div className="pl-6 space-y-4">
                                                                    {personel.pengalaman.map((exp, idx) => (
                                                                        <div key={idx}>
                                                                            <div className="mb-1">{idx+1}) Tahun {exp.tahun}</div>
                                                                            <table className="w-full pl-4">
                                                                                <tbody>
                                                                                    <tr><td className="w-1/3 py-0.5 pl-4">a. Nama Kegiatan</td><td className="w-[2%]">:</td><td>{exp.nama}</td></tr>
                                                                                    <tr><td className="py-0.5 pl-4">b. Lokasi Kegiatan</td><td>:</td><td>{exp.lokasi}</td></tr>
                                                                                    <tr><td className="py-0.5 pl-4">c. Pemberi Pekerjaan</td><td>:</td><td>{exp.pemberi}</td></tr>
                                                                                    <tr><td className="py-0.5 pl-4">d. Nama Perusahaan</td><td>:</td><td>{exp.perusahaan}</td></tr>
                                                                                    <tr><td className="py-0.5 pl-4">e. Uraian Tugas</td><td>:</td><td>{exp.tugas}</td></tr>
                                                                                    <tr><td className="py-0.5 pl-4">f. Waktu Pelaksanaan</td><td>:</td><td>{exp.waktu}</td></tr>
                                                                                    <tr><td className="py-0.5 pl-4">g. Posisi Penugasan</td><td>:</td><td>{exp.posisi}</td></tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    ))}
                                                                    <div>{personel.pengalaman.length + 1}) Dst..</div>
                                                                </div>

                                                                <div className="mt-8 text-justify leading-relaxed">
                                                                    Daftar riwayat hidup ini saya buat dengan sebenar-benarnya dan penuh rasa tanggung jawab. Jika terdapat pengungkapan keterangan yang tidak benar secara sengaja atau sepatutnya diduga maka saya siap untuk digugurkan sebagai personel manajerial atau dikeluarkan jika sudah diperkerjakan.
                                                                </div>
                                                                
                                                                <div className="mt-6 text-right">
                                                                    Semarang, ................. 2026
                                                                </div>

                                                                <div className="flex justify-between mt-6">
                                                                    <div className="text-center w-1/2">
                                                                        Mengetahui:<br/>
                                                                        PT. Maju Konstruksi<br/><br/><br/><br/>
                                                                        (.....................................)<br/>
                                                                        <i>[nama jelas wakil sah]</i>
                                                                    </div>
                                                                    <div className="text-center w-1/2">
                                                                        Yang membuat pernyataan,<br/><br/><br/><br/><br/>
                                                                        ({personel.nama})<br/>
                                                                        <i>[nama jelas]</i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB: Peralatan */}
{teknisSubTab === 'peralatan' && (
                                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                                        <div className="flex flex-col h-full bg-slate-50">
                                            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                                        <Cpu size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-800">Daftar Peralatan Utama</h3>
                                                        <p className="text-xs text-slate-500">Isi data peralatan untuk meng-generate dokumen bukti</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1 p-6 overflow-y-auto">
                                                <div className="flex gap-6">
                                                    {/* Form */}
                                                    <div className="w-[45%] flex flex-col">
                                                        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-6">
                                                            <table className="w-full text-xs text-left">
                                                                <thead className="bg-slate-50 border-b border-slate-200">
                                                                    <tr>
                                                                        <th className="px-3 py-2">Jenis Alat</th>
                                                                        <th className="px-3 py-2">Kapasitas</th>
                                                                        <th className="px-3 py-2 text-center">Jml</th>
                                                                        <th className="px-3 py-2">Aksi</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-slate-100 bg-white">
                                                                    {peralatanList.map(eq => (
                                                                        <tr key={eq.id}>
                                                                            <td className="px-3 py-2 font-medium">{eq.jenis}</td>
                                                                            <td className="px-3 py-2">{eq.kapasitas}</td>
                                                                            <td className="px-3 py-2 text-center">{eq.jumlah}</td>
                                                                            <td className="px-3 py-2"><button className="text-red-500 hover:text-red-700"><Trash2 size={12}/></button></td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                            <div className="p-2 bg-slate-50 border-t border-slate-200">
                                                                <button className="w-full py-1.5 text-xs text-blue-600 font-bold border border-blue-200 border-dashed rounded bg-white hover:bg-blue-50 flex items-center justify-center gap-1">
                                                                    <Plus size={12}/> Tambah Peralatan
                                                                </button>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="mt-auto bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 border-dashed text-center">
                                                            <FileText size={20} className="mx-auto text-indigo-300 mb-2" />
                                                            <p className="text-[10px] font-bold text-slate-700">Unggah Daftar & Bukti Peralatan</p>
                                                            <p className="text-[9px] text-slate-500 mb-2">Upload final PDF bertandatangan beserta hasil pindai invoice/bukti sewa.</p>
                                                            <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-[10px] font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-1">
                                                                <Download size={11} className="rotate-180" /> Pilih File
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Preview */}
                                                    <div className="w-[55%]">
                                                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                                                            <span>Pratinjau Dokumen (A4 Portrait)</span>
                                                            <button className="bg-blue-600 text-white px-2 py-1 rounded text-[9px] font-bold flex items-center gap-1 hover:bg-blue-700"><Printer size={10}/> Cetak</button>
                                                        </div>
                                                        
                                                        <div className="a4-portrait font-mono text-[9px] text-slate-800 leading-normal shadow-lg overflow-y-auto p-8">
                                                            <div className="text-right mb-6">
                                                                <div className="inline-block border border-black px-4 py-1 font-bold text-[10px]">CONTOH</div>
                                                            </div>
                                                            <div className="font-bold text-[11px] mb-6">
                                                                G. DATA PERALATAN
                                                            </div>
                                                            
                                                            <table className="w-full border-collapse border border-black text-[9px] mb-4">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="border border-black p-2 w-8 text-center">No</th>
                                                                        <th className="border border-black p-2 text-center">Jenis</th>
                                                                        <th className="border border-black p-2 text-center">Merek dan Tipe*)</th>
                                                                        <th className="border border-black p-2 text-center">Kapasitas</th>
                                                                        <th className="border border-black p-2 text-center">Jumlah</th>
                                                                        <th className="border border-black p-2 text-center">Kepemilikan /status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {peralatanList.map((eq, idx) => (
                                                                        <tr key={eq.id}>
                                                                            <td className="border border-black p-1.5 text-center">{idx + 1}</td>
                                                                            <td className="border border-black p-1.5">{eq.jenis}</td>
                                                                            <td className="border border-black p-1.5">{eq.merek}</td>
                                                                            <td className="border border-black p-1.5 text-center">{eq.kapasitas}</td>
                                                                            <td className="border border-black p-1.5 text-center">{eq.jumlah}</td>
                                                                            <td className="border border-black p-1.5">{eq.status}</td>
                                                                        </tr>
                                                                    ))}
                                                                    <tr>
                                                                        <td className="border border-black p-1.5 text-center">dst</td>
                                                                        <td className="border border-black p-1.5">___</td>
                                                                        <td className="border border-black p-1.5">___</td>
                                                                        <td className="border border-black p-1.5 text-center">___</td>
                                                                        <td className="border border-black p-1.5 text-center">___</td>
                                                                        <td className="border border-black p-1.5">___</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            
                                                            <div className="mb-12">*) Merk dan Tipe bukan merupakan bagian yang dievaluasi</div>

                                                            <div className="text-right pr-12">
                                                                <div className="mb-16">PT. Maju Konstruksi</div>
                                                                <div>(.....................................)<br/><i>Direktur Utama</i></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB: RKK */}
{teknisSubTab === 'rkk' && (
                                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                                        <div className="flex flex-col h-full bg-slate-50">
                                            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                                        <ShieldAlert size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-800">Rencana Keselamatan Konstruksi (RKK)</h3>
                                                        <p className="text-xs text-slate-500">Penyusunan dokumen K3 lengkap sesuai Standar Dokumen Pemilihan</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* RKK Sub-navigation */}
                                            <div className="bg-white px-4 border-b border-slate-200 flex overflow-x-auto gap-2 text-[10px] font-bold">
                                                <button onClick={() => setRkkMenu('cover')} className={`py-2 px-3 border-b-2 transition-all whitespace-nowrap ${rkkMenu === 'cover' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                                                    Sampul & Daftar Isi
                                                </button>
                                                <button onClick={() => setRkkMenu('pakta')} className={`py-2 px-3 border-b-2 transition-all whitespace-nowrap ${rkkMenu === 'pakta' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                                                    A. Kepemimpinan (Pakta)
                                                </button>
                                                <button onClick={() => setRkkMenu('ibprp')} className={`py-2 px-3 border-b-2 transition-all whitespace-nowrap ${rkkMenu === 'ibprp' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                                                    B. IBPRP & Sasaran
                                                </button>
                                                <button onClick={() => setRkkMenu('dukungan')} className={`py-2 px-3 border-b-2 transition-all whitespace-nowrap ${rkkMenu === 'dukungan' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                                                    C. Dukungan K3
                                                </button>
                                                <button onClick={() => setRkkMenu('operasi')} className={`py-2 px-3 border-b-2 transition-all whitespace-nowrap ${rkkMenu === 'operasi' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                                                    D. Operasi (JSA)
                                                </button>
                                                <button onClick={() => setRkkMenu('evaluasi')} className={`py-2 px-3 border-b-2 transition-all whitespace-nowrap ${rkkMenu === 'evaluasi' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                                                    E. Evaluasi
                                                </button>
                                            </div>

                                            <div className="flex-1 p-6 overflow-y-auto flex flex-col">
                                                
                                                {/* Generate AI Button and Progress */}
                                                <div className="flex justify-between items-end mb-6">
                                                    <div>
                                                        <h4 className="text-sm font-bold text-slate-800 mb-1">Draf RKK Otomatis (AI)</h4>
                                                        <p className="text-xs text-slate-500 max-w-xl">
                                                            AI akan menyusun seluruh dokumen RKK berdasarkan uraian Pekerjaan dan Identifikasi Bahaya yang ditetapkan PPK pada Dokumen Pemilihan.
                                                        </p>
                                                    </div>
                                                    <button 
                                                        onClick={triggerRkkGenerate}
                                                        disabled={isRkkProcessing}
                                                        className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
                                                    >
                                                        <Sparkles size={14} /> {isRkkProcessing ? 'Sistem Menyusun Dokumen...' : 'Susun Seluruh RKK'}
                                                    </button>
                                                </div>

                                                {isRkkProcessing && (
                                                    <div className="space-y-2 mb-6">
                                                        <div className="flex justify-between text-xs text-slate-500">
                                                            <span>Membaca SSKK & menyusun dokumen RKK terintegrasi...</span>
                                                            <span>{rkkProgress}%</span>
                                                        </div>
                                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${rkkProgress}%` }}></div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex-1 overflow-auto border border-slate-200 rounded-xl bg-slate-300 p-6 flex justify-center min-h-[600px]">
                                                    {/* RKK Content Switcher */}
                                                    {rkkMenu === 'cover' && (
                                                        <div className="a4-portrait font-mono text-[10px] text-slate-800 leading-normal shadow-lg p-10 flex flex-col items-center">
                                                            <div className="text-right w-full mb-8">
                                                                <div className="inline-block border border-black px-4 py-1 font-bold text-[10px]">CONTOH</div>
                                                            </div>
                                                            
                                                            <div className="mt-20 font-bold text-sm mb-12">BENTUK RENCANA KESELAMATAN KONSTRUKSI</div>
                                                            
                                                            <div className="border border-black w-full flex text-center mb-16">
                                                                <div className="w-1/2 p-6 border-r border-black flex flex-col justify-center">
                                                                    <div className="text-slate-300 mb-2">[Logo Perusahaan]</div>
                                                                    <div className="font-bold">PT. Maju Konstruksi</div>
                                                                </div>
                                                                <div className="w-1/2 p-6 flex flex-col justify-center">
                                                                    <div className="font-bold text-xs mb-2">RENCANA KESELAMATAN KONSTRUKSI</div>
                                                                    <div className="italic">[digunakan untuk usulan penawaran]</div>
                                                                </div>
                                                            </div>

                                                            <div className="font-bold text-sm mb-6 uppercase">Daftar Isi</div>
                                                            
                                                            <div className="w-full text-left pl-8 space-y-1">
                                                                <div className="font-bold">A. Kepemimpinan dan Partisipasi Pekerja dalam Keselamatan Konstruksi</div>
                                                                <div className="pl-4">A.1. Kepedulian pimpinan terhadap Isu eksternal dan internal</div>
                                                                <div className="pl-4">A.2. Komitmen Keselamatan Konstruksi</div>
                                                                <div className="font-bold mt-2">B. Perencanaan keselamatan konstruksi</div>
                                                                <div className="pl-4">B.1. Identifikasi bahaya, Penilaian risiko, Pengendalian dan Peluang</div>
                                                                <div className="pl-4">B.2. Rencana tindakan (sasaran & program)</div>
                                                                <div className="pl-4">B.3. Standar dan peraturan perundangan</div>
                                                                <div className="font-bold mt-2">C. Dukungan Keselamatan Konstruksi</div>
                                                                <div className="pl-4">C.1. Sumber Daya</div>
                                                                <div className="pl-4">C.2. Kompetensi</div>
                                                                <div className="pl-4">C.3. Kepedulian</div>
                                                                <div className="pl-4">C.4. Komunikasi</div>
                                                                <div className="pl-4">C.5. Informasi Terdokumentasi</div>
                                                                <div className="font-bold mt-2">D. Operasi Keselamatan Konstruksi</div>
                                                                <div className="pl-4">D.1. Perencanaan dan Pengendalian Operasi</div>
                                                                <div className="pl-4">D.2. Kesiapan dan Tanggapan Terhadap Kondisi Darurat</div>
                                                                <div className="font-bold mt-2">E. Evaluasi Kinerja Keselamatan Konstruksi</div>
                                                                <div className="pl-4">E.1. Pemantauan dan evaluasi</div>
                                                                <div className="pl-4">E.2. Tinjauan manajemen</div>
                                                                <div className="pl-4">E.3. Peningkatan kinerja keselamatan konstruksi</div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {rkkMenu === 'pakta' && (
                                                        <div className="a4-portrait font-mono text-[9px] text-slate-800 leading-relaxed shadow-lg p-10">
                                                            <div className="font-bold text-[10px] mb-2">A. Kepemimpinan dan Partisipasi Pekerja dalam Keselamatan Konstruksi</div>
<div className="mb-4">
    <div className="font-bold mb-1">A.1. Kepedulian pimpinan terhadap Isu eksternal dan internal:</div>
    <p className="text-justify mb-2">Manajemen PT. Maju Konstruksi sangat peduli dan menyadari bahwa isu eksternal dan internal berdampak signifikan pada penerapan Sistem Manajemen Keselamatan Konstruksi (SMKK). Oleh karena itu, pimpinan perusahaan berkomitmen untuk mengelola risiko-risiko yang berasal dari isu sosial, budaya, kebijakan pemerintah, serta memastikan ketersediaan sumber daya, kesiapan teknologi, dan kompetensi personel internal. Kepedulian ini ditunjukkan melalui penyediaan anggaran K3 yang memadai, pembentukan tim K3 yang kompeten, dan adaptasi proaktif terhadap perubahan peraturan terkait di lingkungan {tenderMeta.instansi}.</p>
    
    <div className="font-bold mb-1 mt-4">A.2. Komitmen Keselamatan Konstruksi</div>
</div>
                                                            
                                                            <div className="text-center font-bold text-xs mt-8 mb-4">PAKTA KOMITMEN KESELAMATAN KONSTRUKSI</div>
                                                            
                                                            <div className="mb-4">Saya yang bertanda tangan di bawah ini:</div>
                                                            <table className="w-full mb-4">
                                                                <tbody>
                                                                    <tr><td className="w-1/4">Nama</td><td className="w-[2%]">:</td><td>Budi Santoso, ST</td></tr>
                                                                    <tr><td>Jabatan</td><td>:</td><td>Direktur Utama</td></tr>
                                                                    <tr><td className="align-top">Bertindak untuk<br/>dan atas nama</td><td className="align-top">:</td><td>PT. Maju Konstruksi</td></tr>
                                                                </tbody>
                                                            </table>

                                                            <div className="text-justify mb-4">
                                                                dalam rangka pengadaan <b>{tenderMeta.namaPaket}</b> pada <b>Pokja Pemilihan {tenderMeta.instansi}</b> berkomitmen melaksanakan konstruksi berkeselamatan demi terciptanya <i>Zero Accident</i>, dengan memastikan bahwa seluruh pelaksanaan konstruksi:
                                                            </div>

                                                            <ol className="list-decimal pl-8 mb-8 space-y-1">
                                                                <li>Memenuhi ketentuan Keselamatan Konstruksi;</li>
                                                                <li>Menggunakan tenaga kerja kompeten bersertifikat;</li>
                                                                <li>Menggunakan peralatan yang memenuhi standar kelaikan;</li>
                                                                <li>Menggunakan material yang memenuhi standar mutu;</li>
                                                                <li>Menggunakan teknologi yang memenuhi standar kelaikan;</li>
                                                                <li>Melaksanakan Standar Operasi dan Prosedur (SOP); dan</li>
                                                                <li>Memenuhi 9 (sembilan) komponen biaya penerapan SMKK.</li>
                                                            </ol>

                                                            <div className="flex justify-end pr-16 mb-24">
                                                                <div className="text-center">
                                                                    Semarang, ................. 2026<br/>
                                                                    <b>PT. Maju Konstruksi</b><br/><br/><br/><br/>
                                                                    (Budi Santoso, ST)<br/>
                                                                    <i>Direktur Utama</i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {rkkMenu === 'ibprp' && (
                                                        <div className="a4-landscape font-mono text-[8px] text-slate-800 leading-tight shadow-lg p-6">
                                                            <div className="font-bold text-[10px] mb-2">B. Perencanaan keselamatan konstruksi<br/>B.1. Identifikasi bahaya, Penilaian risiko, Pengendalian dan Peluang.</div>
                                                            
                                                            <table className="w-full border-collapse border border-black mb-4">
                                                                <thead className="bg-slate-50 font-bold text-center">
                                                                    <tr>
                                                                        <th rowSpan="2" className="border border-black p-1 w-[2%]">NO</th>
                                                                        <th rowSpan="2" className="border border-black p-1 w-[15%]">DESKRIPSI RISIKO (Uraian Pekerjaan & Identifikasi Bahaya)</th>
                                                                        <th rowSpan="2" className="border border-black p-1 w-[5%]">JENIS BAHAYA (Tipe Kecelakaan)</th>
                                                                        <th rowSpan="2" className="border border-black p-1 w-[8%]">PERSYARATAN PEMENUHAN PERATURAN</th>
                                                                        <th rowSpan="2" className="border border-black p-1 w-[12%]">PENGENDALIAN AWAL</th>
                                                                        <th colSpan="3" className="border border-black p-1 text-red-700">PENILAIAN TINGKAT RISIKO</th>
                                                                        <th rowSpan="2" className="border border-black p-1 w-[10%]">PENGENDALIAN LANJUTAN</th>
                                                                        <th colSpan="3" className="border border-black p-1 text-blue-700">PENILAIAN SISA RISIKO</th>
                                                                        <th rowSpan="2" className="border border-black p-1 w-[5%]">KETERANGAN</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="border border-black p-1 w-[3%] text-red-700">K (F)</th>
                                                                        <th className="border border-black p-1 w-[3%] text-red-700">P (A)</th>
                                                                        <th className="border border-black p-1 w-[3%] text-red-700">TR</th>
                                                                        <th className="border border-black p-1 w-[3%] text-blue-700">K (F)</th>
                                                                        <th className="border border-black p-1 w-[3%] text-blue-700">P (A)</th>
                                                                        <th className="border border-black p-1 w-[3%] text-blue-700">TR</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {rkkContent.bahaya.map((row) => (
                                                                        <tr key={row.no}>
                                                                            <td className="border border-black p-1 text-center">{row.no}</td>
                                                                            <td className="border border-black p-1"><b>{row.pekerjaan}</b><br/><span className="text-red-700">{row.risiko}</span></td>
                                                                            <td className="border border-black p-1 text-center">Tertimpa / Terluka</td>
                                                                            <td className="border border-black p-1">UU No. 1 Th 1970<br/>Permenaker 01/1980</td>
                                                                            <td className="border border-black p-1">{row.mitigasi}</td>
                                                                            <td className="border border-black p-1 text-center">3</td>
                                                                            <td className="border border-black p-1 text-center">4</td>
                                                                            <td className="border border-black p-1 text-center font-bold text-red-600">12 (T)</td>
                                                                            <td className="border border-black p-1">Inspeksi Harian, Toolbox Meeting</td>
                                                                            <td className="border border-black p-1 text-center">1</td>
                                                                            <td className="border border-black p-1 text-center">2</td>
                                                                            <td className="border border-black p-1 text-center font-bold text-emerald-600">2 (R)</td>
                                                                            <td className="border border-black p-1 text-center">N/A</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>

                                                            <div className="font-bold text-[10px] mt-6 mb-2">B.2. Rencana tindakan (sasaran khusus & program khusus)</div>
                                                            <table className="w-full border-collapse border border-black">
                                                                <thead className="bg-slate-50 font-bold text-center">
                                                                    <tr>
                                                                        <th rowSpan="2" className="border border-black p-1">NO</th>
                                                                        <th rowSpan="2" className="border border-black p-1">Pengendalian Risiko</th>
                                                                        <th colSpan="2" className="border border-black p-1">Sasaran</th>
                                                                        <th colSpan="5" className="border border-black p-1">Program</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="border border-black p-1">Uraian</th>
                                                                        <th className="border border-black p-1">Tolok Ukur</th>
                                                                        <th className="border border-black p-1">Uraian Kegiatan</th>
                                                                        <th className="border border-black p-1">Sumber Daya</th>
                                                                        <th className="border border-black p-1">Jadwal</th>
                                                                        <th className="border border-black p-1">Indikator</th>
                                                                        <th className="border border-black p-1">Penanggung Jawab</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {rkkContent.bahaya.map((row) => (
                                                                        <tr key={row.no}>
                                                                            <td className="border border-black p-1 text-center">{row.no}</td>
                                                                            <td className="border border-black p-1">{row.mitigasi}</td>
                                                                            <td className="border border-black p-1">Mencegah insiden</td>
                                                                            <td className="border border-black p-1">Zero Accident</td>
                                                                            <td className="border border-black p-1">Pengawasan intensif, penyediaan APD</td>
                                                                            <td className="border border-black p-1">Dana K3, Helm, Rompi</td>
                                                                            <td className="border border-black p-1">Setiap Hari</td>
                                                                            <td className="border border-black p-1">Laporan harian K3</td>
                                                                            <td className="border border-black p-1 text-center">Ahli K3</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>

                                                            <div className="font-bold text-[10px] mt-6 mb-2">B.3. Standar dan peraturan perundangan</div>
                                                            <div className="text-justify mb-4">
                                                                <p className="mb-2">Daftar peraturan perundang-undangan dan persyaratan lainnya yang diterapkan dalam proyek <b>{tenderMeta.namaPaket}</b> meliputi:</p>
                                                                <ul className="list-disc pl-4 space-y-1">
                                                                    <li>Undang-Undang No. 1 Tahun 1970 tentang Keselamatan Kerja.</li>
                                                                    <li>Undang-Undang No. 2 Tahun 2017 tentang Jasa Konstruksi.</li>
                                                                    <li>Peraturan Menteri PUPR No. 10 Tahun 2021 tentang Pedoman SMKK.</li>
                                                                    <li>Peraturan Menteri Ketenagakerjaan No. 5 Tahun 2018 tentang K3 Lingkungan Kerja.</li>
                                                                    <li>Peraturan Pemerintah No. 50 Tahun 2012 tentang Penerapan SMK3.</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {rkkMenu === 'dukungan' && (
                                                        <div className="a4-portrait font-mono text-[9px] text-slate-800 leading-relaxed shadow-lg p-10">
                                                            <div className="font-bold text-[10px] mb-4">C. Dukungan Keselamatan Konstruksi</div>

                                                            <div className="mb-4">
                                                                <div className="font-bold mb-1">C.1. Sumber Daya</div>
                                                                <p className="text-justify mb-2">PT. Maju Konstruksi menyediakan sumber daya yang memadai, meliputi ketersediaan personil bersertifikat Ahli K3 Konstruksi, anggaran biaya SMKK yang sesuai dengan ketentuan, peralatan kerja yang laik pakai, serta fasilitas kesehatan dan keselamatan di lapangan. Kebutuhan APD, rambu K3, dan fasilitas P3K dipastikan selalu tersedia sebelum pekerjaan dimulai.</p>
                                                                
                                                                <div className="font-bold mb-1 mt-3">C.2. Kompetensi</div>
                                                                <p className="text-justify mb-2">Setiap pekerja yang terlibat dalam proyek wajib memiliki tingkat pendidikan, sertifikat keahlian/keterampilan (SKK/SBU), dan pengalaman yang sesuai. Petugas K3 dan Ahli K3 akan memberikan pelatihan (training) secara berkala terkait cara kerja aman, penggunaan alat bantu, dan respon darurat.</p>
                                                                
                                                                <div className="font-bold mb-1 mt-3">C.3. Kepedulian</div>
                                                                <p className="text-justify mb-2">Kepedulian (Awareness) dibangun melalui pembiasaan dan teguran langsung. Seluruh elemen proyek dari Manajer hingga Pekerja wajib mematuhi Kebijakan K3, menyadari bahaya pekerjaannya masing-masing, dan memahami dampak jika mengabaikan prosedur K3.</p>
                                                            </div>

                                                            <div className="font-bold mb-2">C.4. Komunikasi</div>
                                                            <div className="mb-2">Jadwal Program Komunikasi:</div>
                                                            <table className="w-full border-collapse border border-black mb-8">
                                                                <thead className="bg-slate-50 font-bold">
                                                                    <tr>
                                                                        <th className="border border-black p-2 w-[5%] text-center">NO</th>
                                                                        <th className="border border-black p-2 w-[45%] text-center">Jenis Komunikasi</th>
                                                                        <th className="border border-black p-2 w-[25%] text-center">PIC</th>
                                                                        <th className="border border-black p-2 text-center">Waktu Pelaksanaan</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="border border-black p-2 text-center">1</td>
                                                                        <td className="border border-black p-2">Induksi Keselamatan Konstruksi (Safety Induction)</td>
                                                                        <td className="border border-black p-2 text-center">Ahli K3</td>
                                                                        <td className="border border-black p-2 text-center">Sebelum mulai pekerjaan</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="border border-black p-2 text-center">2</td>
                                                                        <td className="border border-black p-2">Pertemuan pagi hari (Safety morning)</td>
                                                                        <td className="border border-black p-2 text-center">Ahli K3 / Mandor</td>
                                                                        <td className="border border-black p-2 text-center">Setiap Pagi (07.30 WIB)</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="border border-black p-2 text-center">3</td>
                                                                        <td className="border border-black p-2">Pertemuan Kelompok Kerja (Toolbox meeting)</td>
                                                                        <td className="border border-black p-2 text-center">Pelaksana / Ahli K3</td>
                                                                        <td className="border border-black p-2 text-center">1x Seminggu</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="border border-black p-2 text-center">4</td>
                                                                        <td className="border border-black p-2">Rapat Keselamatan Konstruksi (Construction safety meeting)</td>
                                                                        <td className="border border-black p-2 text-center">Manajer Proyek</td>
                                                                        <td className="border border-black p-2 text-center">1x Sebulan</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                            <div className="mb-4 mt-6">
                                                                <div className="font-bold mb-1">C.5. Informasi Terdokumentasi</div>
                                                                <p className="text-justify mb-2">Semua aktivitas terkait K3 didokumentasikan dan diarsipkan. Hal ini meliputi form JSA, form Izin Kerja (Permit to Work), notulensi Toolbox Meeting, Laporan Harian/Mingguan K3, serta laporan inspeksi dan investigasi insiden. Dokumen akan dipelihara dan dikendalikan agar selalu up-to-date dan mudah diakses selama pelaksanaan konstruksi.</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {rkkMenu === 'operasi' && (
                                                        <div className="a4-portrait font-mono text-[9px] text-slate-800 leading-relaxed shadow-lg p-10">
                                                            <div className="font-bold text-[10px] mb-4">D. Operasi Keselamatan Konstruksi<br/>D.1. Analisis Keselamatan Pekerjaan (Job Safety Analysis)</div>
                                                            
                                                            <table className="mb-4 text-[9px]">
                                                                <tbody>
                                                                    <tr><td className="w-32">Nama Pekerja</td><td className="w-[2%]">:</td><td>Semua Pekerja Lapangan</td></tr>
                                                                    <tr><td>Nama Paket Pekerjaan</td><td>:</td><td>{tenderMeta.namaPaket}</td></tr>
                                                                    <tr><td>Tanggal Pekerjaan</td><td>:</td><td>Sesuai Jadwal Kontrak</td></tr>
                                                                </tbody>
                                                            </table>

                                                            <div className="mb-2">Alat Pelindung Diri yang diperlukan:</div>
                                                            <table className="w-full border-collapse border border-black mb-6">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="border border-black p-1 w-[5%] text-center">1</td>
                                                                        <td className="border border-black p-1 w-[40%]">Helm/Safety Helmet</td>
                                                                        <td className="border border-black p-1 w-[5%] text-center">√</td>
                                                                        <td className="border border-black p-1 w-[5%] text-center">4</td>
                                                                        <td className="border border-black p-1 w-[40%]">Rompi Keselamatan/Safety Vest</td>
                                                                        <td className="border border-black p-1 w-[5%] text-center">√</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="border border-black p-1 text-center">2</td>
                                                                        <td className="border border-black p-1">Sepatu/Safety Shoes</td>
                                                                        <td className="border border-black p-1 text-center">√</td>
                                                                        <td className="border border-black p-1 text-center">5</td>
                                                                        <td className="border border-black p-1">Masker Pernafasan/Respiratory</td>
                                                                        <td className="border border-black p-1 text-center">√</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="border border-black p-1 text-center">3</td>
                                                                        <td className="border border-black p-1">Sarung Tangan/Safety Gloves</td>
                                                                        <td className="border border-black p-1 text-center">√</td>
                                                                        <td className="border border-black p-1 text-center">6</td>
                                                                        <td className="border border-black p-1">Lainnya sesuai kebutuhan khusus</td>
                                                                        <td className="border border-black p-1 text-center"></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                            <table className="w-full border-collapse border border-black">
                                                                <thead className="bg-slate-50 font-bold">
                                                                    <tr>
                                                                        <th className="border border-black p-2">Urutan Langkah Pekerjaan</th>
                                                                        <th className="border border-black p-2">Identifikasi Bahaya</th>
                                                                        <th className="border border-black p-2">Pengendalian</th>
                                                                        <th className="border border-black p-2">Penanggung Jawab</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {rkkContent.bahaya.map((row) => (
                                                                        <tr key={row.no}>
                                                                            <td className="border border-black p-2">{row.pekerjaan}</td>
                                                                            <td className="border border-black p-2">{row.risiko}</td>
                                                                            <td className="border border-black p-2">{row.mitigasi}</td>
                                                                            <td className="border border-black p-2 text-center">Ahli K3 / Pelaksana</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>

                                                            <div className="mb-4 mt-6">
                                                                <div className="font-bold mb-1">D.2. Kesiapan dan Tanggapan Terhadap Kondisi Darurat</div>
                                                                <p className="text-justify mb-2">Dalam menghadapi situasi darurat (seperti kebakaran, gempa bumi, kecelakaan kerja fatal, atau tumpahan bahan kimia berbahaya), tim proyek telah membentuk Tim Tanggap Darurat (Emergency Response Team). Nomor telepon darurat (Rumah Sakit terdekat, Pemadam Kebakaran, Kepolisian) telah dipasang di papan informasi proyek.</p>
                                                                <p className="text-justify mb-2">Prosedur evakuasi ditetapkan dengan rute yang jelas menuju Titik Kumpul (Muster Point) yang aman. Simulasi (drill) tanggap darurat akan dilakukan minimal satu kali dalam periode pelaksanaan proyek untuk memastikan kesiapan seluruh personel.</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {rkkMenu === 'evaluasi' && (
                                                        <div className="a4-portrait font-mono text-[9px] text-slate-800 leading-relaxed shadow-lg p-10">
                                                            <div className="font-bold text-[10px] mb-4">E. Evaluasi Keselamatan Konstruksi<br/>E.1 Pemantauan dan Evaluasi</div>
                                                            
                                                            <div className="text-center font-bold mb-2">Jadwal Inspeksi dan Audit</div>
                                                            <table className="w-full border-collapse border border-black">
                                                                <thead className="bg-slate-50 font-bold text-center">
                                                                    <tr>
                                                                        <th rowSpan="2" className="border border-black p-2 w-[5%]">No</th>
                                                                        <th rowSpan="2" className="border border-black p-2">Kegiatan</th>
                                                                        <th rowSpan="2" className="border border-black p-2 w-[15%]">PIC</th>
                                                                        <th colSpan="12" className="border border-black p-2">Bulan Ke-</th>
                                                                    </tr>
                                                                    <tr>
                                                                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                                                                            <th key={m} className="border border-black p-1 w-[3%]">{m}</th>
                                                                        ))}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="border border-black p-2 text-center">1</td>
                                                                        <td className="border border-black p-2">Inspeksi Keselamatan Konstruksi</td>
                                                                        <td className="border border-black p-2 text-center">Ahli K3</td>
                                                                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                                                                            <td key={m} className="border border-black p-1 text-center font-bold">V</td>
                                                                        ))}
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="border border-black p-2 text-center">2</td>
                                                                        <td className="border border-black p-2">Patroli Keselamatan Konstruksi</td>
                                                                        <td className="border border-black p-2 text-center">Petugas K3</td>
                                                                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                                                                            <td key={m} className="border border-black p-1 text-center font-bold">V</td>
                                                                        ))}
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="border border-black p-2 text-center">3</td>
                                                                        <td className="border border-black p-2">Audit internal</td>
                                                                        <td className="border border-black p-2 text-center">Manajer Proyek</td>
                                                                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => (
                                                                            <td key={m} className="border border-black p-1 text-center font-bold">{m % 3 === 0 ? 'V' : ''}</td>
                                                                        ))}
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                            <div className="mb-4 mt-6">
                                                                <div className="font-bold mb-1">E.2. Tinjauan manajemen</div>
                                                                <p className="text-justify mb-2">Manajemen PT. Maju Konstruksi akan secara rutin (minimal sebulan sekali) melakukan rapat tinjauan manajemen untuk mengevaluasi efektivitas pelaksanaan SMKK di proyek <b>{tenderMeta.namaPaket}</b>. Rapat ini akan membahas hasil inspeksi, insiden/hampir celaka (near-miss) yang terjadi, kepatuhan terhadap peraturan, serta status tindak lanjut dari tinjauan sebelumnya.</p>
                                                                
                                                                <div className="font-bold mb-1 mt-3">E.3. Peningkatan kinerja keselamatan konstruksi</div>
                                                                <p className="text-justify mb-2">Berdasarkan hasil tinjauan manajemen dan pemantauan harian, perusahaan berkomitmen untuk terus meningkatkan kinerja K3. Peningkatan (Continuous Improvement) dilakukan melalui pembaruan JSA, peningkatan kualitas APD, perbaikan metode kerja (Metode Pelaksanaan), serta pemberian reward bagi pekerja yang konsisten menerapkan prinsip berkeselamatan.</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Upload Bottom */}
                                                <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 border-dashed text-center mt-6 shrink-0">
                                                    <FileText size={24} className="mx-auto text-indigo-300 mb-2" />
                                                    <p className="text-xs font-bold text-slate-700">Unggah Final RKK (PDF Lengkap)</p>
                                                    <p className="text-[10px] text-slate-500 mb-3">Format PDF yang sudah ditandatangani Direktur Utama</p>
                                                    <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-2">
                                                        <Download size={13} className="rotate-180" /> Pilih File PDF
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB: Dukungan */}
{teknisSubTab === 'dukungan' && (
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-800">Surat Dukungan Material/Peralatan</h4>
                                                <p className="text-[10px] text-slate-500">Dukungan pabrikan sesuai syarat teknis</p>
                                            </div>
                                        </div>
                                        <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 border-dashed text-center">
                                            <FileText size={24} className="mx-auto text-indigo-300 mb-2" />
                                            <p className="text-xs font-bold text-slate-700">Unggah Surat Dukungan</p>
                                            <p className="text-[10px] text-slate-500 mb-3">Format PDF terverifikasi</p>
                                            <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-2">
                                                <Download size={13} className="rotate-180" /> Pilih File PDF
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* TAB: Jadwal */}
                                {teknisSubTab === 'jadwal' && (
                                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                                        <div className="flex flex-col h-full bg-slate-50">
                                            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                                        <CalendarDays size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-800">Jadwal Pelaksanaan Pekerjaan</h3>
                                                        <p className="text-xs text-slate-500">Kurva S dan rincian waktu pelaksanaan</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 p-6 overflow-y-auto">
                                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                                    <table className="w-full text-left text-xs">
                                                        <thead className="bg-slate-50 border-b border-slate-200">
                                                            <tr>
                                                                <th className="p-3 font-semibold text-slate-600">Bulan Ke-</th>
                                                                <th className="p-3 font-semibold text-slate-600">Bobot (%)</th>
                                                                <th className="p-3 font-semibold text-slate-600">Keterangan Pekerjaan</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-slate-100">
                                                            <tr>
                                                                <td className="p-3">Bulan 1</td>
                                                                <td className="p-3 font-medium text-slate-800">15%</td>
                                                                <td className="p-3 text-slate-600">Persiapan, Mobilisasi, Pekerjaan Tanah</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="p-3">Bulan 2</td>
                                                                <td className="p-3 font-medium text-slate-800">35%</td>
                                                                <td className="p-3 text-slate-600">Pekerjaan Struktur Bawah, Pondasi</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="p-3">Bulan 3</td>
                                                                <td className="p-3 font-medium text-slate-800">30%</td>
                                                                <td className="p-3 text-slate-600">Pekerjaan Struktur Atas, Atap</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="p-3">Bulan 4</td>
                                                                <td className="p-3 font-medium text-slate-800">20%</td>
                                                                <td className="p-3 text-slate-600">Finishing, MEP, Serah Terima</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="mt-4 bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 border-dashed text-center">
                                                    <FileText size={24} className="mx-auto text-indigo-300 mb-2" />
                                                    <p className="text-xs font-bold text-slate-700">Unggah Jadwal / Kurva S Final</p>
                                                    <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-2">
                                                        <Download size={13} className="rotate-180" /> Pilih File PDF
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB: Metode */}
                                {teknisSubTab === 'metode' && (
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-800">Metode Pelaksanaan</h4>
                                                <p className="text-[10px] text-slate-500">Strategi dan tahapan pekerjaan konstruksi</p>
                                            </div>
                                        </div>
                                        <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 border-dashed text-center">
                                            <FileText size={24} className="mx-auto text-indigo-300 mb-2" />
                                            <p className="text-xs font-bold text-slate-700">Unggah Dokumen Metode Pelaksanaan</p>
                                            <p className="text-[10px] text-slate-500 mb-3">Format PDF</p>
                                            <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-2">
                                                <Download size={13} className="rotate-180" /> Pilih File PDF
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* TAB: RMPK */}
                                {teknisSubTab === 'rmpk' && (
                                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                                        <div className="flex flex-col h-full bg-slate-50">
                                            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                                        <Layers size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-800">Rencana Mutu Pekerjaan Konstruksi (RMPK)</h3>
                                                        <p className="text-xs text-slate-500">Auto-Compiled dari dokumen Personel, Alat, RKK, dan Spesifikasi</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* RMPK Sub-navigation */}
                                            <div className="bg-white px-4 border-b border-slate-200 flex overflow-x-auto gap-2 text-[10px] font-bold">
                                                {[
                                                    { id: 'cover', label: 'Cover & Pengesahan' },
                                                    { id: 'bab1', label: 'Bab 1: Info Proyek' },
                                                    { id: 'bab2', label: 'Bab 2: Organisasi' },
                                                    { id: 'bab3', label: 'Bab 3: Jadwal' },
                                                    { id: 'bab4', label: 'Bab 4: Spesifikasi' },
                                                    { id: 'bab5', label: 'Bab 5: Tahapan' },
                                                    { id: 'bab6', label: 'Bab 6: WMS' },
                                                    { id: 'bab7', label: 'Bab 7: ITP' },
                                                    { id: 'bab8', label: 'Bab 8: Vendor' }
                                                ].map(menu => (
                                                    <button 
                                                        key={menu.id}
                                                        onClick={() => setRmpkMenu(menu.id)} 
                                                        className={`py-2 px-3 border-b-2 transition-all whitespace-nowrap ${rmpkMenu === menu.id ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                                                        {menu.label}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="flex-1 p-6 overflow-y-auto flex flex-col">
                                                
                                                {/* Generate AI Button and Progress */}
                                                <div className="flex justify-between items-end mb-6">
                                                    <div>
                                                        <h4 className="text-sm font-bold text-slate-800 mb-1">Draf RMPK Terintegrasi (Auto-Compile)</h4>
                                                        <p className="text-xs text-slate-500 max-w-xl">
                                                            Sistem secara otomatis merangkum data dari Personel, Peralatan, RKK, dan Spesifikasi Teknis menjadi struktur Dokumen RMPK baku sesuai standar LDP.
                                                        </p>
                                                    </div>
                                                    <button 
                                                        onClick={triggerRmpkGenerate}
                                                        disabled={isRmpkProcessing || rmpkProgress === 100}
                                                        className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
                                                    >
                                                        <Sparkles size={14} /> {isRmpkProcessing ? 'Merangkai Data...' : (rmpkProgress === 100 ? 'RMPK Terangkai 100%' : 'Tarik Data & Susun RMPK')}
                                                    </button>
                                                </div>

                                                {isRmpkProcessing && (
                                                    <div className="space-y-2 mb-6">
                                                        <div className="flex justify-between text-xs text-slate-500">
                                                            <span>Mengkompilasi struktur organisasi, WMS, dan JSA...</span>
                                                            <span>{rmpkProgress}%</span>
                                                        </div>
                                                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                            <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${rmpkProgress}%` }}></div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex-1 overflow-auto border border-slate-200 rounded-xl bg-slate-300 p-6 flex justify-center min-h-[600px]">
                                                    {/* RMPK Content Switcher */}
                                                    {rmpkMenu === 'cover' && (
                                                        <div className="a4-portrait font-mono text-[10px] text-slate-800 leading-normal shadow-lg p-10 flex flex-col items-center">
                                                            <div className="border border-black w-32 h-16 flex items-center justify-center font-bold self-start mb-16">
                                                                [Logo Penyedia Jasa]
                                                            </div>
                                                            
                                                            <div className="font-bold text-lg mb-2 mt-8">RENCANA MUTU PEKERJAAN KONSTRUKSI</div>
                                                            <div className="font-bold text-lg mb-12">(RMPK)</div>
                                                            
                                                            <div className="w-3/4 border-b-2 border-dashed border-black mb-4 text-center pb-2 font-bold uppercase text-sm">
                                                                {tenderMeta.namaPaket}
                                                            </div>
                                                            <div className="mb-24 italic text-xs">(Nama Pekerjaan Konstruksi)</div>
                                                            
                                                            <table className="w-full border-collapse border border-black mb-16 text-xs">
                                                                <tbody>
                                                                    <tr><td className="border border-black p-2 font-bold w-1/3">Pemberi Tugas</td><td className="border border-black p-2 w-[5%] text-center">:</td><td className="border border-black p-2">{tenderMeta.pokja}</td></tr>
                                                                    <tr><td className="border border-black p-2 font-bold">Lokasi Pekerjaan</td><td className="border border-black p-2 text-center">:</td><td className="border border-black p-2">{tenderMeta.lokasi}</td></tr>
                                                                    <tr><td className="border border-black p-2 font-bold">Nomor Kontrak</td><td className="border border-black p-2 text-center">:</td><td className="border border-black p-2">........................................</td></tr>
                                                                    <tr><td className="border border-black p-2 font-bold">Waktu Pelaksanaan</td><td className="border border-black p-2 text-center">:</td><td className="border border-black p-2">Sesuai Kontrak (s.d {new Date(tenderMeta.tglSelesai).toLocaleDateString()})</td></tr>
                                                                </tbody>
                                                            </table>

                                                            <div className="text-center font-bold text-sm mb-6">DISUSUN OLEH:</div>
                                                            <div className="w-1/2 border-b-2 border-dashed border-black mb-2 pb-1 text-center font-bold uppercase text-sm">
                                                                PT. MAJU KONSTRUKSI
                                                            </div>
                                                            <div className="italic text-xs">(Nama Penyedia Jasa)</div>
                                                        </div>
                                                    )}

                                                    {rmpkMenu === 'bab1' && (
                                                        <div className="a4-portrait font-mono text-[10px] text-slate-800 leading-relaxed shadow-lg p-10">
                                                            <div className="font-bold text-sm text-center mb-6">BAB I INFORMASI PEKERJAAN</div>
                                                            <div className="font-bold text-xs mb-4">DATA UMUM PEKERJAAN</div>
                                                            
                                                            <table className="w-full mb-8">
                                                                <tbody>
                                                                    <tr><td className="w-1/3 py-1">Nama Pekerjaan</td><td className="w-[5%] text-center">:</td><td>{tenderMeta.namaPaket}</td></tr>
                                                                    <tr><td className="py-1">Lokasi Pekerjaan</td><td className="text-center">:</td><td>{tenderMeta.lokasi}</td></tr>
                                                                    <tr><td className="py-1">Kontrak (No & Tanggal)</td><td className="text-center">:</td><td>(Diisi setelah penandatanganan)</td></tr>
                                                                    <tr><td className="py-1">Nilai Kontrak</td><td className="text-center">:</td><td>Rp {tenderMeta.hps.toLocaleString('id-ID')} (Termasuk PPN)</td></tr>
                                                                    <tr><td className="py-1">Sistem Kontrak</td><td className="text-center">:</td><td>Harga Satuan</td></tr>
                                                                    <tr><td className="py-1">Sumber Dana</td><td className="text-center">:</td><td>APBD / APBN</td></tr>
                                                                </tbody>
                                                            </table>

                                                            <div className="font-bold mb-2">Waktu Pelaksanaan</div>
                                                            <table className="w-full mb-8">
                                                                <tbody>
                                                                    <tr><td className="w-1/3 py-1">Masa Kontrak</td><td className="w-[5%] text-center">:</td><td>Sesuai Jangka Waktu</td></tr>
                                                                    <tr><td className="py-1">Tanggal Mulai Kerja</td><td className="text-center">:</td><td>Sesuai SPMK</td></tr>
                                                                </tbody>
                                                            </table>

                                                            <div className="font-bold mb-2">Pengguna Jasa</div>
                                                            <table className="w-full mb-8">
                                                                <tbody>
                                                                    <tr><td className="w-1/3 py-1">Satuan Kerja</td><td className="w-[5%] text-center">:</td><td>{tenderMeta.instansi || 'Pemerintah Terkait'}</td></tr>
                                                                    <tr><td className="py-1">PPK</td><td className="text-center">:</td><td>PPK {tenderMeta.namaPaket}</td></tr>
                                                                </tbody>
                                                            </table>

                                                            <div className="font-bold mb-2">Penyedia Jasa</div>
                                                            <table className="w-full">
                                                                <tbody>
                                                                    <tr><td className="w-1/3 py-1">Nama</td><td className="w-[5%] text-center">:</td><td>PT. Maju Konstruksi</td></tr>
                                                                    <tr><td className="py-1">Alamat</td><td className="text-center">:</td><td>Jl. Pemuda No. 1, Kota</td></tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}

                                                    {rmpkMenu === 'bab2' && (
                                                        <div className="a4-portrait font-mono text-[10px] text-slate-800 leading-relaxed shadow-lg p-10 flex flex-col">
                                                            <div className="font-bold text-sm text-center mb-6">BAB II STRUKTUR ORGANISASI</div>
                                                            <div className="font-bold text-xs mb-2">2.1 Struktur Organisasi Para Pihak</div>
                                                            <div className="mb-8 text-justify">
                                                                Struktur Penyedia Jasa Pekerjaan Konstruksi memberikan uraian mengenai struktur organisasi tim internal serta penjelasan terkait tugas dan tanggung jawab masing-masing personel (Auto-compiled dari tab Personel Manajerial).
                                                            </div>

                                                            <div className="flex justify-center mb-10 mt-4">
                                                                <div className="flex flex-col items-center">
                                                                    <div className="border-2 border-blue-900 bg-blue-100 px-6 py-2 font-bold mb-4 w-64 text-center">
                                                                        Direktur Utama<br/>(Budi Santoso, ST)
                                                                    </div>
                                                                    <div className="h-6 w-0.5 bg-black"></div>
                                                                    <div className="w-full h-0.5 bg-black"></div>
                                                                    <div className="flex justify-between w-full">
                                                                        {personelList.map((p, idx) => (
                                                                            <div key={idx} className="flex flex-col items-center mx-2">
                                                                                <div className="h-6 w-0.5 bg-black"></div>
                                                                                <div className="border border-black bg-white px-4 py-2 text-center text-[9px] w-40">
                                                                                    <div className="font-bold border-b border-black pb-1 mb-1">{p.jabatan}</div>
                                                                                    <div>{p.nama}</div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="font-bold text-xs mb-2">b. Tugas dan Tanggung Jawab</div>
                                                            <div className="space-y-4">
                                                                {personelList.map((p, idx) => (
                                                                    <div key={idx}>
                                                                        <div className="font-bold">{idx+1}. {p.jabatan} ({p.nama})</div>
                                                                        <ul className="list-disc pl-5 mt-1 space-y-1">
                                                                            <li>Bertanggung jawab penuh terhadap pelaksanaan mutu kerja di bidang {p.jabatan.split(' ')[0]}.</li>
                                                                            <li>Mengkoordinasikan tugas dengan bagian lain agar pekerjaan selesai tepat waktu sesuai jadwal (WBS).</li>
                                                                            <li>Menjamin penerapan K3 dan Standar Mutu di wilayah kerjanya.</li>
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {rmpkMenu === 'bab5' && (
                                                        <div className="a4-portrait font-mono text-[9px] text-slate-800 leading-relaxed shadow-lg p-10 flex flex-col items-center">
                                                            <div className="font-bold text-sm text-center mb-6">BAB V TAHAPAN PEKERJAAN</div>
                                                            <div className="mb-8 text-justify w-full">
                                                                Rangkaian pekerjaan yang sistematis dari awal sampai akhir untuk mewujudkan suatu bangunan konstruksi yang dapat dipertanggungjawabkan secara teknis.
                                                            </div>
                                                            
                                                            {/* Flowchart Diagram CSS */}
                                                            <div className="flex flex-col items-center w-full max-w-lg space-y-4">
                                                                <div className="border-2 border-black rounded-full px-8 py-2 font-bold">MULAI</div>
                                                                <div className="h-6 w-0.5 bg-black relative"><div className="absolute bottom-0 -left-1 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-transparent border-t-black"></div></div>
                                                                <div className="border border-black px-6 py-2 bg-slate-50 text-center w-48 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">Serah Terima Lapangan</div>
                                                                <div className="h-6 w-0.5 bg-black relative"><div className="absolute bottom-0 -left-1 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-transparent border-t-black"></div></div>
                                                                <div className="border border-black px-6 py-2 bg-slate-50 text-center w-48 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">Pengajuan Uang Muka</div>
                                                                <div className="h-6 w-0.5 bg-black relative"><div className="absolute bottom-0 -left-1 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-transparent border-t-black"></div></div>
                                                                <div className="border border-black px-6 py-2 bg-slate-50 text-center w-48 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">Mobilisasi Peralatan & Personel</div>
                                                                <div className="h-6 w-0.5 bg-black relative"><div className="absolute bottom-0 -left-1 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-transparent border-t-black"></div></div>
                                                                <div className="border border-black px-6 py-2 bg-slate-50 text-center w-48 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">Pelaksanaan Pekerjaan Utama</div>
                                                                <div className="h-6 w-0.5 bg-black relative"><div className="absolute bottom-0 -left-1 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-transparent border-t-black"></div></div>
                                                                
                                                                <div className="w-[100px] h-[60px] border border-black bg-white flex items-center justify-center rotate-45 transform mt-4 relative">
                                                                    <div className="-rotate-45 font-bold">Uji Mutu?</div>
                                                                </div>
                                                                
                                                                <div className="flex w-full justify-center mt-6">
                                                                    <div className="flex flex-col items-center mr-16">
                                                                        <div className="font-bold mb-2 text-rose-600">Tdk (Perbaikan)</div>
                                                                        <div className="h-10 w-0.5 bg-black border-dashed"></div>
                                                                    </div>
                                                                    <div className="flex flex-col items-center">
                                                                        <div className="font-bold mb-2 text-emerald-600">Ya (Sesuai Spesifikasi)</div>
                                                                        <div className="h-6 w-0.5 bg-black relative"><div className="absolute bottom-0 -left-1 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-transparent border-t-black"></div></div>
                                                                        <div className="border border-black px-6 py-2 bg-slate-50 text-center w-48 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">Serah Terima Pertama (PHO)</div>
                                                                        <div className="h-6 w-0.5 bg-black relative"><div className="absolute bottom-0 -left-1 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-transparent border-t-black"></div></div>
                                                                        <div className="border-2 border-black rounded-full px-8 py-2 font-bold mt-2">SELESAI</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-8 font-bold italic">Gambar 5.1 Bagan Alir Tahapan Pekerjaan Utama</div>
                                                        </div>
                                                    )}

                                                    {rmpkMenu === 'bab6' && (
                                                        <div className="a4-landscape font-mono text-[8px] text-slate-800 leading-tight shadow-lg p-6">
                                                            <div className="font-bold text-[10px] mb-4 text-center">BAB VI RENCANA PELAKSANAAN PEKERJAAN (WORK METHOD STATEMENT)</div>
                                                            
                                                            <div className="font-bold mb-2">Tabel 6.3 Contoh Tabel Peralatan dalam Work Method Statement (Di-pull dari form Peralatan Utama)</div>
                                                            <table className="w-full border-collapse border border-black mb-8 text-center">
                                                                <thead className="bg-slate-50 font-bold">
                                                                    <tr>
                                                                        <th rowSpan="2" className="border border-black p-1">No</th>
                                                                        <th rowSpan="2" className="border border-black p-1">Peralatan / Mesin</th>
                                                                        <th rowSpan="2" className="border border-black p-1">Vol</th>
                                                                        <th rowSpan="2" className="border border-black p-1">Merek/Tipe</th>
                                                                        <th colSpan="6" className="border border-black p-1 bg-blue-50">Bulan Pelaksanaan 2026</th>
                                                                    </tr>
                                                                    <tr>
                                                                        {[1,2,3,4,5,6].map(m => (
                                                                            <th key={m} className="border border-black p-1 w-[4%] bg-blue-50">Bln {m}</th>
                                                                        ))}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {peralatanList.map((eq, idx) => (
                                                                        <tr key={idx}>
                                                                            <td className="border border-black p-1">{idx+1}</td>
                                                                            <td className="border border-black p-1 text-left">{eq.jenis}</td>
                                                                            <td className="border border-black p-1">{eq.jumlah} Unit</td>
                                                                            <td className="border border-black p-1">{eq.merek}</td>
                                                                            {[1,2,3,4,5,6].map(m => (
                                                                                <td key={m} className="border border-black p-1 font-bold text-blue-800">{m < 4 ? 'X' : ''}</td>
                                                                            ))}
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>

                                                            <div className="font-bold mb-2">Tabel 6.4 Aspek Keselamatan Konstruksi (Di-pull dari JSA RKK Bab D)</div>
                                                            <table className="w-full border-collapse border border-black">
                                                                <thead className="bg-slate-50 font-bold">
                                                                    <tr>
                                                                        <th className="border border-black p-2">Tahapan Pekerjaan</th>
                                                                        <th className="border border-black p-2">Identifikasi Bahaya</th>
                                                                        <th className="border border-black p-2">Pengendalian (Rekomendasi Tindakan)</th>
                                                                        <th className="border border-black p-2">Tanggung Jawab</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {rkkContent.bahaya.map((row) => (
                                                                        <tr key={row.no}>
                                                                            <td className="border border-black p-2 text-left">{row.pekerjaan}</td>
                                                                            <td className="border border-black p-2 text-left">{row.risiko}</td>
                                                                            <td className="border border-black p-2 text-left">{row.mitigasi}</td>
                                                                            <td className="border border-black p-2 text-center">Ahli K3 / Pelaksana</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    )}

                                                    {/* Other Bab Fallback */}
                                                    {['bab3', 'bab4', 'bab7', 'bab8'].includes(rmpkMenu) && (
                                                        <div className="a4-portrait font-mono text-[10px] text-slate-800 leading-relaxed shadow-lg p-10 flex flex-col items-center justify-center text-center">
                                                            <div className="border-4 border-slate-300 p-8 rounded-2xl w-full">
                                                                <Shield size={48} className="mx-auto text-slate-300 mb-4" />
                                                                <div className="font-bold text-lg text-slate-500 mb-2">{rmpkMenu.toUpperCase()} TER-GENERATE OTOMATIS</div>
                                                                <p className="text-slate-400">Bagian ini akan digenerate secara utuh dan dirangkai ke dalam PDF final saat Anda menekan tombol "Compile & Unduh ZIP" di menu Ringkasan.</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {/* Upload Bottom */}
                                                <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 border-dashed text-center mt-6 shrink-0">
                                                    <FileText size={24} className="mx-auto text-indigo-300 mb-2" />
                                                    <p className="text-xs font-bold text-slate-700">Unggah Final RMPK Lengkap</p>
                                                    <p className="text-[10px] text-slate-500 mb-3">Format PDF yang sudah ditandatangani Direktur Utama, disahkan PPK dan Konsultan Pengawas</p>
                                                    <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-2">
                                                        <Download size={13} className="rotate-180" /> Pilih File PDF
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}


                </div>

            </div>
        </div>
    );
}
