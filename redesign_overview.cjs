const fs = require('fs');

let content = fs.readFileSync('src/pages/Workspace.jsx', 'utf8');

const overviewStart = content.indexOf("{/* ========== TAB 1: OVERVIEW ========== */}");
const administrasiStart = content.indexOf("{/* ========== TAB: DOKUMEN ADMINISTRASI ========== */}");

if (overviewStart !== -1 && administrasiStart !== -1) {
    const overviewContentBefore = content.substring(overviewStart, administrasiStart);

    const replacementOverview = `{/* ========== TAB 1: OVERVIEW ========== */}
                    {subTab === 'overview' && (
                        <div className="p-6 space-y-6 animate-in fade-in duration-200">
                            
                            {/* 1. MASTER PROGRESS TRACKER */}
                            <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row gap-8 items-center border border-slate-800">
                                <div className="shrink-0 relative flex items-center justify-center">
                                    <svg className="w-24 h-24 transform -rotate-90">
                                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                                        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset="62.8" className="text-emerald-400" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-black">75%</span>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-4 w-full">
                                    <div>
                                        <h2 className="text-xl font-bold">Kesiapan Penawaran: Menunggu Penyelesaian Teknis</h2>
                                        <p className="text-xs text-slate-400 mt-1">Selesaikan seluruh indikator merah dan kuning sebelum batas waktu pemasukan dokumen penawaran berakhir (25 Juli 2026 14:00).</p>
                                    </div>
                                    <div className="grid grid-cols-4 gap-3">
                                        <div className="bg-slate-800/50 border border-slate-700 p-3 rounded-xl">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Administrasi</div>
                                            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 size={14}/> 3/3 Selesai</div>
                                        </div>
                                        <div className="bg-slate-800/50 border border-slate-700 p-3 rounded-xl">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kualifikasi</div>
                                            <div className="text-sm font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 size={14}/> 100% Valid</div>
                                        </div>
                                        <div className="bg-rose-900/20 border border-rose-800/50 p-3 rounded-xl">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Teknis</div>
                                            <div className="text-sm font-bold text-rose-400 flex items-center gap-1"><AlertTriangle size={14}/> 2/7 Tersisa</div>
                                        </div>
                                        <div className="bg-amber-900/20 border border-amber-800/50 p-3 rounded-xl">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Harga (RAB)</div>
                                            <div className="text-sm font-bold text-amber-400 flex items-center gap-1"><HelpCircle size={14}/> Draf Belum Dikunci</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                {/* 2. SMART CHECKLIST */}
                                <div className="col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
                                    <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><Layers size={16} className="text-blue-600"/> Daftar Periksa (Smart Checklist)</h3>
                                            <p className="text-[10px] text-slate-500">Dihasilkan otomatis berdasarkan syarat Dokumen Pemilihan</p>
                                        </div>
                                    </div>
                                    <div className="p-4 flex-1 overflow-y-auto space-y-4">
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pilar 1: Administrasi</div>
                                            <div className="space-y-2">
                                                <div className="flex items-start justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                                                    <div className="flex gap-2">
                                                        <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0"/>
                                                        <div>
                                                            <p className="text-xs font-bold text-emerald-800">Surat Penawaran</p>
                                                            <p className="text-[10px] text-emerald-600">Diset menggunakan integrasi APENDO SPSE.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                                                    <div className="flex gap-2">
                                                        <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0"/>
                                                        <div>
                                                            <p className="text-xs font-bold text-emerald-800">Jaminan Penawaran</p>
                                                            <p className="text-[10px] text-emerald-600">File asuransi Rp 57,794,400 telah divalidasi (Askrindo).</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">Pilar 2: Teknis</div>
                                            <div className="space-y-2">
                                                <div className="flex items-start justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                                                    <div className="flex gap-2">
                                                        <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0"/>
                                                        <div>
                                                            <p className="text-xs font-bold text-emerald-800">Rencana Keselamatan Konstruksi (RKK)</p>
                                                            <p className="text-[10px] text-emerald-600">Ter-generate otomatis 100%.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start justify-between p-2 rounded-lg bg-rose-50 border border-rose-100">
                                                    <div className="flex gap-2">
                                                        <AlertTriangle size={14} className="text-rose-600 mt-0.5 shrink-0"/>
                                                        <div>
                                                            <p className="text-xs font-bold text-rose-800">Personel Manajerial</p>
                                                            <p className="text-[10px] text-rose-600">Kekurangan 1 Personel: Ahli Arsitektur Madya.</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => {setSubTab('teknis'); setTeknisSubTab('personel')}} className="text-[10px] font-bold bg-white text-rose-700 border border-rose-200 px-2 py-1 rounded hover:bg-rose-100">Perbaiki</button>
                                                </div>
                                                <div className="flex items-start justify-between p-2 rounded-lg bg-amber-50 border border-amber-100">
                                                    <div className="flex gap-2">
                                                        <HelpCircle size={14} className="text-amber-600 mt-0.5 shrink-0"/>
                                                        <div>
                                                            <p className="text-xs font-bold text-amber-800">Jadwal & Metode Pelaksanaan</p>
                                                            <p className="text-[10px] text-amber-600">Kurva S belum diselaraskan dengan bobot RAB.</p>
                                                        </div>
                                                    </div>
                                                    <button className="text-[10px] font-bold bg-white text-amber-700 border border-amber-200 px-2 py-1 rounded hover:bg-amber-100">Perbaiki</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 flex flex-col h-[500px]">
                                    {/* 3. AI POKJA SIMULATOR */}
                                    <div className="bg-indigo-900 rounded-2xl border border-indigo-800 shadow-sm p-5 text-white flex-shrink-0 relative overflow-hidden">
                                        <div className="absolute -right-4 -top-4 opacity-10">
                                            <Shield size={100} />
                                        </div>
                                        <h3 className="font-bold text-indigo-100 flex items-center gap-2 mb-1 relative z-10"><ShieldAlert size={16} className="text-indigo-300"/> AI Pokja Simulator</h3>
                                        <p className="text-[10px] text-indigo-300 mb-4 relative z-10">Evaluasi dokumen Anda seolah-olah Anda adalah Panitia Pokja Pemilihan untuk menemukan kesalahan fatal.</p>
                                        
                                        <button className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold rounded-xl shadow-md transition-all relative z-10 flex items-center justify-center gap-2">
                                            <Sparkles size={14}/> Jalankan Audit Kelengkapan
                                        </button>
                                    </div>

                                    {/* 4. ACTIONABLE AUDIT TRAIL */}
                                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden">
                                        <div className="p-4 border-b border-slate-200">
                                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><Cpu size={16} className="text-slate-400"/> Audit Trail (Log Sistem)</h3>
                                        </div>
                                        <div className="p-4 flex-1 overflow-y-auto space-y-3">
                                            <div className="border-l-2 border-emerald-400 pl-3">
                                                <p className="text-[9px] text-slate-400 font-mono">14:30 WIB</p>
                                                <p className="text-xs text-slate-700"><span className="font-bold text-emerald-600">Sistem AI</span> berhasil men-generate 100% dokumen RKK.</p>
                                            </div>
                                            <div className="border-l-2 border-slate-200 pl-3">
                                                <p className="text-[9px] text-slate-400 font-mono">14:15 WIB</p>
                                                <p className="text-xs text-slate-700"><span className="font-bold text-slate-600">User</span> mengunggah asuransi Jaminan Penawaran.</p>
                                            </div>
                                            <div className="border-l-2 border-rose-400 pl-3">
                                                <p className="text-[9px] text-slate-400 font-mono">13:50 WIB</p>
                                                <p className="text-xs text-slate-700"><span className="font-bold text-rose-600">Validasi</span> Masa berlaku SKK Personel "Budi Santoso" hampir habis.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 5. FINAL EXPORT BUTTON */}
                            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-blue-900 text-lg">Finalisasi Paket Penawaran</h3>
                                    <p className="text-xs text-blue-700 mt-1 max-w-2xl">Satukan seluruh persyaratan Administrasi, Kualifikasi, Teknis, dan RAB menjadi struktur folder baku yang siap untuk dienkripsi oleh Apendo / SPSE.</p>
                                </div>
                                <button disabled className="px-6 py-3 bg-blue-600/50 text-white font-bold rounded-xl flex items-center gap-2 cursor-not-allowed">
                                    <Download size={18} /> Compile & Unduh ZIP (Terkunci)
                                </button>
                            </div>
                        </div>
                    )}
                    
                    `;

    content = content.replace(overviewContentBefore, replacementOverview);
    fs.writeFileSync('src/pages/Workspace.jsx', content, 'utf8');
    console.log("Overview successfully redesigned!");
} else {
    console.log("Overview start or Administrasi start not found.");
}
