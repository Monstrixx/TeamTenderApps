import React, { useState, useEffect } from 'react';
import {
    Database, Table, Calculator, HardDrive, Lock, FileDown, PlusCircle, PenTool, BookOpen, 
    Sparkles, ShieldAlert, FileText, CheckCircle2, ChevronRight, Download, FileSpreadsheet, UploadCloud, TrendingDown, Zap, Settings, 
    Printer, Send, Sliders, RefreshCw, Layers, Calendar, AlertTriangle, 
    HelpCircle, UserCheck, DollarSign, Cpu, Trash2, Edit3, Plus, Search, Eye,
    Shield, CalendarDays, Users
} from 'lucide-react';
import {
    INPUT_STYLE, SELECT_STYLE, LABEL_STYLE as LABEL,
    TENDER_METADATA, INITIAL_AI_LOGS, INITIAL_SUPPLIERS,
    INITIAL_PERSONEL_LIST, INITIAL_PERALATAN_LIST, INITIAL_DOC_VALIDATION,
    INITIAL_KSO_PARTNERS, INITIAL_UPAH_LIST, INITIAL_BAHAN_LIST, INITIAL_ALAT_LIST,
    INITIAL_AHSP_ITEMS, INITIAL_BOQ_LIST
} from '../modules/workspace/config';
import {
    calculateItemBasePrice,
    calculateAhspItemTotal,
    calculateBoqUnitRate as calcBoqUnitRate,
    calculateBoqItemTotal as calcBoqItemTotal,
    calculateBoqGrandTotal as calcBoqGrandTotal
} from '../modules/workspace/helpers/workspaceHelpers';
import { generateRequestLetterText } from '../shared/helpers/requestLetterGenerator';
import { markDocumentValidating, markDocumentValid, createValidationLog } from '../engines/validation/documentValidationEngine';
import { getAvailableMenus } from '../containers/WorkspaceContainer';
import { AiLogPanel } from '../modules/workspace/ai/components';
import { SuratSection } from '../modules/workspace/surat/components';
import { PersonilSection } from '../modules/workspace/personil/components';
import { PeralatanSection } from '../modules/workspace/peralatan/components';
import { AdministrasiSection } from '../modules/workspace/administrasi/components';
import { KualifikasiSection } from '../modules/workspace/kualifikasi/components';
import { RkkSection } from '../modules/workspace/rkk/components';
import { AhspSection } from '../modules/workspace/rab/ahsp/components';
import { BoqSection } from '../modules/workspace/rab/boq/components';

export default function Workspace() {
    const [subTab, setSubTab] = useState('overview'); // 'overview' | 'permohonan' | 'rab' | 'rkk' | 'schedule'
    
    // Tender Metadata
    const tenderMeta = TENDER_METADATA;

    // AI Agents Activity Logs
    const [aiLogs, setAiLogs] = useState(INITIAL_AI_LOGS);

    // Supplier Directory for Requests
    const supplierDirectory = INITIAL_SUPPLIERS;

    const [selectedSupplier, setSelectedSupplier] = useState('s1');
    const [requestLetterNo, setRequestLetterNo] = useState("015/PM-MK/VII/2026");
    const [requestPreviewText, setRequestPreviewText] = useState("");

    // RAB Workspace States
    const [pricingStrategy, setPricingStrategy] = useState('original'); // 'original' | 'percent' | 'nominal'
    const [targetPercentage] = useState(5); // % reduction
    const [targetNominal] = useState(2500000000.00); // Nominal target
    const [useLumpsumOverride] = useState(false);
    const [rabActiveSheet, setRabActiveSheet] = useState('hsd'); // 'hsd' | 'ahsp' | 'boq' | 'rekap'
    const [profitMargin, setProfitMargin] = useState(10); // Default 10%
    const [rabTotal, setRabTotal] = useState(11500000000); // Dummy HPS

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
    const [personelList] = useState(INITIAL_PERSONEL_LIST);
    const [selectedPersonelId, setSelectedPersonelId] = useState('p1');

    const [peralatanList] = useState(INITIAL_PERALATAN_LIST);

    // Update RKK Section States to accommodate TOC
    const [rkkMenu, setRkkMenu] = useState('cover'); // 'cover' | 'pakta' | 'kepemimpinan' | 'ibprp' | 'sasaran' | 'dukungan' | 'operasi' | 'evaluasi'


    // Individual document validation states
    const [docValidation, setDocValidation] = useState(INITIAL_DOC_VALIDATION);
    const [isValidatingAll, setIsValidatingAll] = useState(false);

    const handleValidateDoc = (key) => {
        setDocValidation(prev => markDocumentValidating(prev, key));
        setTimeout(() => {
            setDocValidation(prev => markDocumentValid(prev, key));
            setAiLogs(logs => [...logs, createValidationLog(key, false)]);
        }, 1000);
    };

    const handleValidateAll = () => {
        setIsValidatingAll(true);
        const keys = Object.keys(docValidation);
        keys.forEach((key, index) => {
            setTimeout(() => {
                setDocValidation(prev => markDocumentValidating(prev, key));
                setTimeout(() => {
                    setDocValidation(prev => markDocumentValid(prev, key));
                    setAiLogs(logs => [...logs, createValidationLog(key, true)]);
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
    const ksoPartnersList = INITIAL_KSO_PARTNERS;

    // Default basic prices (Upah, Bahan, Alat)
    const [upahList] = useState(INITIAL_UPAH_LIST);
    const [bahanList] = useState(INITIAL_BAHAN_LIST);
    const [alatList] = useState(INITIAL_ALAT_LIST);

    // AHSP (Analisa Harga Satuan Pekerjaan)
    const ahspItems = INITIAL_AHSP_ITEMS;

    // Quantities & Base Prices for BOQ
    const [boqList] = useState(INITIAL_BOQ_LIST);

    // Live calculations based on strategies
    const getGrandTotal = () => calcBoqGrandTotal(boqList, ahspItems, upahList, bahanList, alatList, pricingStrategy, targetPercentage, useLumpsumOverride, targetNominal);

    // Auto-update request letter preview
    useEffect(() => {
        const supplier = supplierDirectory.find(s => s.id === selectedSupplier);
        if (!supplier) return;
        setRequestPreviewText(
            generateRequestLetterText({
                supplierName: supplier.nama,
                requestLetterNo,
                pokja: tenderMeta.pokja
            })
        );
    }, [selectedSupplier, requestLetterNo, tenderMeta.pokja, supplierDirectory]);

    // RKK & RMPK States
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
                    {getAvailableMenus(simulatedRole, [
                        { id: 'overview', label: 'Resume Persyaratan', icon: Cpu },
                        { id: 'administrasi', label: 'Dokumen Administrasi', icon: FileText },
                        { id: 'kualifikasi', label: 'Dokumen Kualifikasi', icon: UserCheck },
                        { id: 'teknis', label: 'Dokumen Teknis', icon: Layers },
                        { id: 'rab', label: 'Penawaran Harga', icon: DollarSign },
                    ]).map(tab => (
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
                        <AdministrasiSection 
                            adminSubTab={adminSubTab}
                            setAdminSubTab={setAdminSubTab}
                            useApendoLetter={useApendoLetter}
                            setUseApendoLetter={setUseApendoLetter}
                            tenderMeta={tenderMeta}
                            getGrandTotal={getGrandTotal}
                            selectedKsoPartnerId={selectedKsoPartnerId}
                            setSelectedKsoPartnerId={setSelectedKsoPartnerId}
                            ksoPartnersList={ksoPartnersList}
                            adminKsoName={adminKsoName}
                            setAdminKsoName={setAdminKsoName}
                            adminKsoLeaderShare={adminKsoLeaderShare}
                            setAdminKsoLeaderShare={setAdminKsoLeaderShare}
                            adminKsoMemberShare={adminKsoMemberShare}
                            setAdminKsoMemberShare={setAdminKsoMemberShare}
                            setKsoModalShare={setKsoModalShare}
                            setKsoShareStatus={setKsoShareStatus}
                            adminKsoUploadedFile={adminKsoUploadedFile}
                            handleUploadKsoFile={handleUploadKsoFile}
                            adminBidBondRequired={adminBidBondRequired}
                            setAdminBidBondRequired={setAdminBidBondRequired}
                            adminBidBondPercent={adminBidBondPercent}
                            setAdminBidBondPercent={setAdminBidBondPercent}
                            adminBidBondDays={adminBidBondDays}
                            setAdminBidBondDays={setAdminBidBondDays}
                            adminBidBondIssuer={adminBidBondIssuer}
                            setAdminBidBondIssuer={setAdminBidBondIssuer}
                            adminBidBondRequestDownloaded={adminBidBondRequestDownloaded}
                            setAdminBidBondRequestDownloaded={setAdminBidBondRequestDownloaded}
                            adminBidBondUploadedFile={adminBidBondUploadedFile}
                            handleUploadBidBondFile={handleUploadBidBondFile}
                            adminBidBondAiLogs={adminBidBondAiLogs}
                            adminIsScanningBidBond={adminIsScanningBidBond}
                            setAiLogs={setAiLogs}
                        />
                    )}

                    {/* ========== TAB: KUALIFIKASI & KSO HUB ========== */}
                    {subTab === 'kualifikasi' && (
                        <KualifikasiSection 
                            kualifikasiSubTab={kualifikasiSubTab}
                            setKualifikasiSubTab={setKualifikasiSubTab}
                            simulatedRole={simulatedRole}
                            setSimulatedRole={setSimulatedRole}
                            handleValidateAll={handleValidateAll}
                            isValidatingAll={isValidatingAll}
                            docValidation={docValidation}
                            handleValidateDoc={handleValidateDoc}
                            tenderMeta={tenderMeta}
                            isKdSkpPrinted={isKdSkpPrinted}
                            setIsKdSkpPrinted={setIsKdSkpPrinted}
                            setAiLogs={setAiLogs}
                            isFormulirSaved={isFormulirSaved}
                            setIsFormulirSaved={setIsFormulirSaved}
                            selectedKsoPartnerId={selectedKsoPartnerId}
                            setSelectedKsoPartnerId={setSelectedKsoPartnerId}
                            ksoPartnersList={ksoPartnersList}
                            ksoModalShare={ksoModalShare}
                            setKsoModalShare={setKsoModalShare}
                            ksoShareStatus={ksoShareStatus}
                            setKsoShareStatus={setKsoShareStatus}
                            setSubTab={setSubTab}
                        />
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
                                     <AhspSection 
                                         profitMargin={profitMargin}
                                         setProfitMargin={setProfitMargin}
                                     />
                                )}

                                {/* SHEET 3: BoQ (BILL OF QUANTITIES) */}
                                {rabActiveSheet === 'boq' && (
                                     <BoqSection />
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
                                     <PersonilSection 
                                         personelList={personelList}
                                         selectedPersonelId={selectedPersonelId}
                                         onSelectPersonel={setSelectedPersonelId}
                                     />
                                )}

                                {/* TAB: Peralatan */}
                                {teknisSubTab === 'peralatan' && (
                                    <PeralatanSection 
                                        peralatanList={peralatanList}
                                    />
                                )}
                                                             {/* TAB: RKK */}
                                 {teknisSubTab === 'rkk' && (
                                     <RkkSection 
                                         rkkMenu={rkkMenu}
                                         setRkkMenu={setRkkMenu}
                                         triggerRkkGenerate={triggerRkkGenerate}
                                         isRkkProcessing={isRkkProcessing}
                                         rkkProgress={rkkProgress}
                                         rkkContent={rkkContent}
                                         tenderMeta={tenderMeta}
                                     />
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
