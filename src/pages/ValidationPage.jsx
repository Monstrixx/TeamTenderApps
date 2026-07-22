import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileText, CheckCircle2, Clock, Building2, Eye, Download, Info, Sparkles } from 'lucide-react';

export default function ValidationPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate network verification delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white font-[Inter,system-ui,sans-serif]">
                <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
                <h2 className="text-xl font-bold tracking-tight">Memverifikasi Hash Dokumen...</h2>
                <p className="text-slate-400 mt-2 text-sm">Terhubung dengan Trust Center TeamTender</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-[Inter,system-ui,sans-serif] text-slate-800">
            {/* Minimal Header */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-12 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <span className="text-white font-black text-xs">TT</span>
                    </div>
                    <div className="font-bold text-sm tracking-tight text-slate-900">TeamTender <span className="text-emerald-600">Trust Center</span></div>
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck size={14} className="text-emerald-500" /> SECURE PORTAL
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-4xl w-full mx-auto p-6 py-12">
                
                {/* Status Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden mb-8">
                    <div className="bg-emerald-500 p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <ShieldCheck size={120} />
                        </div>
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10">
                            <CheckCircle2 size={40} className="text-emerald-500" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight relative z-10">Dokumen Valid & Terverifikasi</h1>
                        <p className="text-emerald-50 font-medium mt-2 relative z-10">Integritas dokumen ini dijamin oleh TeamTender.</p>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Document Info */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Informasi Dokumen</h3>
                                    <div className="text-lg font-black text-slate-800">Surat Permohonan Dukungan Alat/Bahan</div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <FileText size={20} className="text-blue-500 shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-xs text-slate-500 font-semibold mb-0.5">Nomor Referensi</div>
                                            <div className="text-sm font-bold font-mono">015/SP-MK/VII/2026</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Building2 size={20} className="text-indigo-500 shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-xs text-slate-500 font-semibold mb-0.5">Diterbitkan Oleh</div>
                                            <div className="text-sm font-bold text-slate-800">PT. MAJU KONSTRUKSI</div>
                                            <div className="text-xs text-slate-500 mt-1">NPWP: 12.345.678.9-012.000</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Clock size={20} className="text-amber-500 shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-xs text-slate-500 font-semibold mb-0.5">Waktu Digital Signature (Timestamp)</div>
                                            <div className="text-sm font-bold text-slate-800">20 Juli 2026, 14:32:01 WIB</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hash & Security */}
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                                <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2 mb-4">
                                    <ShieldCheck size={16} className="text-emerald-500" /> Security Log
                                </h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">SHA-256 Checksum</div>
                                        <div className="text-xs font-mono text-slate-600 break-all bg-slate-200 p-2 rounded border border-slate-300">
                                            a3f9b2c8d1e4f6a7b8c9d0e1f2a3b4c5e6d7f8a9b0c1d2e3f4a5b6c7d8e9f0a
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start gap-3 bg-blue-50 text-blue-800 p-3 rounded-lg border border-blue-100">
                                        <Info size={16} className="shrink-0 mt-0.5" />
                                        <div className="text-xs leading-relaxed">
                                            Pemindaian ini telah dicatat dalam sistem. Penerbit dokumen (PT. Maju Konstruksi) telah menerima notifikasi "Read Receipt" bahwa Anda sedang memverifikasi dokumen ini.
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col gap-2">
                                    <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-900/20">
                                        <Eye size={16} /> Lihat Arsip Digital (PDF)
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Promotional B2B Banner (Unique Selling Point) */}
                <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -ml-20 -mb-20"></div>
                    
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-emerald-300 mb-6 backdrop-blur-md">
                            <Sparkles size={14} /> Powered by TeamTender
                        </div>
                        <h2 className="text-3xl font-black mb-4 tracking-tight leading-tight">Ingin manajemen tender perusahaan Anda setangguh ini?</h2>
                        <p className="text-slate-300 mb-8 leading-relaxed">
                            TeamTender adalah sistem manajemen pengadaan B2B yang digunakan oleh PT. Maju Konstruksi untuk mengotomatisasi RAB, melacak persyaratan, dan mengamankan integritas dokumen penawaran.
                        </p>
                        <button className="px-8 py-3.5 bg-white text-indigo-950 hover:bg-slate-100 font-bold rounded-xl shadow-xl transition-all cursor-pointer">
                            Pelajari Fitur TeamTender
                        </button>
                    </div>
                </div>

            </main>
            
            <footer className="text-center py-6 text-xs text-slate-400 font-medium border-t border-slate-200">
                &copy; {new Date().getFullYear()} TeamTender Secure Network. All rights reserved.
            </footer>
        </div>
    );
}
