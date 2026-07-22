import React, { useState, useEffect } from 'react';
import { 
    Archive, FileText, Download, ShieldAlert, Printer, 
    CheckCircle2, AlertTriangle,
    Calendar, Clock, Check, RefreshCw, BarChart3, Award,
    ExternalLink
} from 'lucide-react';

const INPUT_STYLE = "w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400";
import { useTenderArsip } from '../hooks/tenderArsip/useTenderArsip';

export default function TenderArsip() {
    const {
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
    } = useTenderArsip();

    // Demo statistics data
    const stats = [
        { label: "Total Tender Diikuti", value: "18 Paket", sub: "Tahun Anggaran 2026", icon: BarChart3, color: "bg-blue-50 text-blue-600 border-blue-100" },
        { label: "Kemenangan (Won)", value: "8 Paket", sub: "Nilai Kontrak Rp 24.5 M", icon: Award, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
        { label: "Gugur & Sanggah", value: "6 Paket", sub: "2 Sanggahan Diterima", icon: ShieldAlert, color: "bg-amber-50 text-amber-600 border-amber-100" },
        { label: "Rasio Kemenangan", value: "57.1%", sub: "Di atas rata-rata industri", icon: CheckCircle2, color: "bg-purple-50 text-purple-600 border-purple-100" },
    ];

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white font-extrabold shadow-md">
                        <Archive size={20} />
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-slate-800">Tender Arsip & Monitoring SPSE</h1>
                        <p className="text-xs text-slate-500 font-medium">Monitoring jadwal real-time, audit keguguran Pokja, statistik kemenangan, dan draf Sanggahan AI.</p>
                    </div>
                </div>
            </div>

            {/* Statistics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {stats.map((s, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${s.color}`}>
                            <s.icon size={22} />
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</div>
                            <div className="text-lg font-black text-slate-900 mt-0.5">{s.value}</div>
                            <div className="text-[10px] text-slate-500 font-medium mt-0.5">{s.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
                {/* Left Side: Archived Tenders List */}
                <div className="space-y-3">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Daftar Arsip Tender</div>
                    <div className="space-y-2">
                        {archivedTenders.map(t => (
                            <button
                                key={t.id}
                                onClick={() => handleTenderClick(t)}
                                className={`w-full p-4 text-left border rounded-xl transition-all cursor-pointer block
                                    ${selectedTender?.id === t.id 
                                        ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'}`}
                            >
                                <h4 className="text-xs font-bold leading-snug">{t.name}</h4>
                                <div className={`text-[10px] mt-1.5 font-semibold ${selectedTender?.id === t.id ? 'text-slate-400' : 'text-slate-500'}`}>
                                    HPS: {t.hps}
                                </div>
                                <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100/10 text-[9px] font-bold">
                                    <span>ID: {t.spseId}</span>
                                    <span className={`px-2 py-0.5 rounded border text-[8px] font-bold uppercase ${t.id === selectedTender?.id ? 'bg-white/20 text-white border-white/20' : t.statusColor}`}>
                                        {t.status}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side: Details, Schedule Timeline, and AI Appeal */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                    {selectedTender ? (
                        <div className="flex flex-col h-full">
                            {/* Tender Header & Tabs */}
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-sm font-bold text-slate-800">{selectedTender.name}</h2>
                                    <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Lokasi: {selectedTender.location} | HPS: {selectedTender.hps}</p>
                                </div>
                                {/* Navigation Tabs */}
                                <div className="flex bg-slate-200/60 p-0.5 rounded-lg border border-slate-200 self-start md:self-auto">
                                    {[
                                        { id: 'summary', label: 'Ringkasan & Berkas' },
                                        { id: 'schedule', label: 'Monitoring Jadwal' },
                                        { id: 'appeal', label: 'Pusat Sanggah AI' }
                                    ].map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all cursor-pointer
                                                ${activeTab === tab.id ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tab Panels */}
                            <div className="p-6 flex-1">
                                {activeTab === 'summary' && (
                                    <div className="space-y-6">
                                        {/* Document List */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Berkas Penawaran Dihasilkan (Pembuktian)</h3>
                                                <button 
                                                    onClick={() => alert("Mengunduh seluruh dokumen arsip sebagai berkas zip...")}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg cursor-pointer"
                                                >
                                                    <Download size={12} /> Unduh Seluruh Dokumen (ZIP)
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {selectedTender.files.map((file, idx) => (
                                                    <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between hover:border-slate-300 transition-all">
                                                        <div className="flex items-center gap-2">
                                                            <FileText size={16} className="text-slate-400 shrink-0" />
                                                            <div>
                                                                <div className="text-xs font-bold text-slate-700">{file.name}</div>
                                                                <div className="text-[9px] text-slate-400 font-semibold">{file.size}</div>
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={() => alert(`Mengunduh berkas: ${file.name}`)}
                                                            className="p-1.5 text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg cursor-pointer"
                                                        >
                                                            <Download size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* SPSE Reference links */}
                                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                                            <div className="text-xs font-bold text-slate-700">Tautan SPSE Terintegrasi</div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-semibold">
                                                <a 
                                                    href={`https://spse.inaproc.id/pu/lelang/${selectedTender.spseId}/pengumumanlelang`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-blue-600 hover:underline"
                                                >
                                                    <ExternalLink size={12} /> Pengumuman Lelang SPSE
                                                </a>
                                                <a 
                                                    href={`https://spse.inaproc.id/pu/lelang/${selectedTender.spseId}/jadwal`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-blue-600 hover:underline"
                                                >
                                                    <Calendar size={12} /> Jadwal Lengkap Tender SPSE
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'schedule' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Timeline Monitoring Jadwal SPSE</h3>
                                                <p className="text-[10px] text-slate-500 mt-0.5">Sistem memantau pemutakhiran jadwal sampai tahapan penandatanganan kontrak.</p>
                                            </div>
                                            <button 
                                                onClick={handleSyncSchedule}
                                                disabled={isSyncing}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg cursor-pointer transition-all disabled:opacity-55"
                                            >
                                                <RefreshCw size={12} className={isSyncing ? "animate-spin" : ""} /> {isSyncing ? "Mensinkronkan..." : "Sinkronkan SPSE"}
                                            </button>
                                        </div>

                                        {/* SPSE Live Schedule Url Card */}
                                        <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-blue-600 shrink-0" />
                                                <div>
                                                    <span className="font-semibold text-slate-500">URL Jadwal Terpantau:</span>
                                                    <code className="ml-1 text-blue-700 font-bold">https://spse.inaproc.id/pu/lelang/{selectedTender.spseId}/jadwal</code>
                                                </div>
                                            </div>
                                            <a 
                                                href={`https://spse.inaproc.id/pu/lelang/${selectedTender.spseId}/jadwal`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>

                                        {/* Timeline */}
                                        <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6 py-2">
                                            {selectedTender.schedules.map((sch, idx) => (
                                                <div key={idx} className="relative">
                                                    {/* Timeline Dot */}
                                                    <div className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-white transition-all
                                                        ${sch.status === 'completed' ? 'border-emerald-500 bg-emerald-500 text-white' : sch.status === 'current' ? 'border-blue-600 bg-blue-50 text-blue-600 animate-pulse' : 'border-slate-300 text-slate-300'}`}
                                                    >
                                                        {sch.status === 'completed' && <Check size={10} strokeWidth={3} />}
                                                    </div>
                                                    {/* Timeline Text */}
                                                    <div>
                                                        <div className={`text-xs font-bold ${sch.status === 'completed' ? 'text-slate-500 line-through decoration-slate-300' : sch.status === 'current' ? 'text-blue-700' : 'text-slate-700'}`}>
                                                            {sch.step}
                                                        </div>
                                                        <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{sch.date}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'appeal' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs">
                                            <AlertTriangle size={16} className="text-amber-600 shrink-0" />
                                            <div>
                                                <span className="font-bold">Masa Sanggah Selesai:</span> Sanggahan diajukan maksimal 5 days setelah pengumuman pemenang diumumkan di portal SPSE.
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Evaluation Form */}
                                            <div className="space-y-4">
                                                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Analisis Keguguran Pokja</h4>
                                                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                                                    Tempelkan hasil audit evaluasi Pokja yang menyatakan Anda gugur atau kesalahan dokumen penawaran di bawah:
                                                </p>
                                                <form onSubmit={handleAnalyzeEvaluasi} className="space-y-3">
                                                    <textarea 
                                                        className={INPUT_STYLE + " h-32"}
                                                        placeholder="Contoh: Penawaran gugur pada evaluasi teknis karena Pokja menilai SKK personel atas nama Rahmat Hidayat tidak terdaftar pada portal LPJK."
                                                        value={evaluasiInput}
                                                        onChange={e => setEvaluasiInput(e.target.value)}
                                                    ></textarea>
                                                    <button 
                                                        type="submit" 
                                                        disabled={isAnalyzing}
                                                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
                                                    >
                                                        {isAnalyzing ? "AI Sedang Menganalisis Regulasi..." : "Buat Draf Surat Sanggah AI"}
                                                    </button>
                                                </form>
                                            </div>

                                            {/* AI Appeal Letter Draft */}
                                            <div className="flex flex-col">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Draf Surat Sanggahan AI</span>
                                                    {aiSanggahDraft && (
                                                        <button 
                                                            onClick={() => {
                                                                const printWindow = window.open('', '_blank');
                                                                printWindow.document.write(`<pre style="font-family: monospace; padding: 20px;">${aiSanggahDraft}</pre>`);
                                                                printWindow.document.close();
                                                                printWindow.print();
                                                            }}
                                                            className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline"
                                                        >
                                                            <Printer size={12} /> Cetak Surat
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-[9px] leading-relaxed whitespace-pre-wrap overflow-y-auto max-h-[300px] text-slate-700">
                                                    {aiSanggahDraft ? aiSanggahDraft : (
                                                        <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 italic">
                                                            Masukkan alasan keguguran di sebelah kiri untuk menghasilkan draf sanggahan regulasi otomatis.
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                            <Archive size={40} className="text-slate-300 mb-2" />
                            <div className="text-xs font-bold uppercase tracking-wider">Detail Arsip Kosong</div>
                            <p className="text-xs mt-1">Silakan pilih salah satu daftar tender arsip di sisi kiri untuk memulai.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
