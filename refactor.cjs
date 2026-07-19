const fs = require('fs');

const content = fs.readFileSync('src/pages/Workspace.jsx', 'utf8');

const rkkStartToken = "{subTab === 'rkk' && (";
const scheduleStartToken = "{subTab === 'schedule' && (";

let rkkStartIdx = content.indexOf(rkkStartToken);
let scheduleStartIdx = content.indexOf(scheduleStartToken);

if (rkkStartIdx === -1 || scheduleStartIdx === -1) {
    console.error("Tokens not found!");
    process.exit(1);
}

// Find matching closing parenthesis for schedule
let openCount = 0;
let scheduleEndIdx = -1;
for (let i = scheduleStartIdx + scheduleStartToken.length; i < content.length; i++) {
    if (content[i] === '(') openCount++;
    if (content[i] === ')') {
        if (openCount === 0) {
            scheduleEndIdx = i; // this is the closing parenthesis of `&& (`
            break;
        }
        openCount--;
    }
}
// the block ends with `)}`, we want to include `)}` or stop after `}`.
scheduleEndIdx = content.indexOf('}', scheduleEndIdx);

let rkkBlock = content.substring(rkkStartIdx, scheduleStartIdx);
let scheduleBlock = content.substring(scheduleStartIdx, scheduleEndIdx + 1);

// Extract inner div of rkk
let rkkInnerStart = rkkBlock.indexOf('<div className="flex flex-col h-full bg-slate-50">');
let rkkInnerEnd = rkkBlock.lastIndexOf(')}');
let rkkInner = rkkBlock.substring(rkkInnerStart, rkkInnerEnd).trim();
rkkInner = rkkInner.substring(0, rkkInner.lastIndexOf('</div>'));
rkkInner += `\n<div className="p-6 pt-0"><div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 border-dashed text-center mt-6">
    <FileText size={24} className="mx-auto text-indigo-300 mb-2" />
    <p className="text-xs font-bold text-slate-700">Unggah Final RKK (PDF)</p>
    <p className="text-[10px] text-slate-500 mb-3">Format PDF yang sudah ditandatangani</p>
    <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-2">
        <Download size={13} className="rotate-180" /> Pilih File PDF
    </button>
</div></div>\n</div>`;

// Extract inner div of schedule
let scheduleInnerStart = scheduleBlock.indexOf('<div className="flex flex-col h-full bg-slate-50">');
let scheduleInnerEnd = scheduleBlock.lastIndexOf(')}');
let scheduleInner = scheduleBlock.substring(scheduleInnerStart, scheduleInnerEnd).trim();
scheduleInner = scheduleInner.substring(0, scheduleInner.lastIndexOf('</div>'));
scheduleInner += `\n<div className="p-6 pt-0"><div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 border-dashed text-center mt-6">
    <FileText size={24} className="mx-auto text-indigo-300 mb-2" />
    <p className="text-xs font-bold text-slate-700">Unggah Jadwal / Kurva S Final</p>
    <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-2">
        <Download size={13} className="rotate-180" /> Pilih File PDF
    </button>
</div></div>\n</div>`;

const teknisBlock = `
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
                                            className={\`px-4 py-3 text-[11px] font-bold border-b-2 whitespace-nowrap transition-colors
                                                \${teknisSubTab === sub.id 
                                                    ? 'border-indigo-600 text-indigo-600' 
                                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}\`}
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
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-800">Personel Manajerial</h4>
                                                <p className="text-[10px] text-slate-500">Susun daftar personel sesuai persyaratan tender</p>
                                            </div>
                                            <button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 flex items-center gap-2">
                                                <Edit3 size={13} /> Draf CV & Penugasan
                                            </button>
                                        </div>
                                        <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 border-dashed text-center">
                                            <FileText size={24} className="mx-auto text-indigo-300 mb-2" />
                                            <p className="text-xs font-bold text-slate-700">Unggah Berkas Personel Manajerial</p>
                                            <p className="text-[10px] text-slate-500 mb-3">Format PDF maks 10MB</p>
                                            <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-2">
                                                <Download size={13} className="rotate-180" /> Pilih File PDF
                                            </button>
                                        </div>
                                    </div>
                                )}
                                
                                {/* TAB: Peralatan */}
                                {teknisSubTab === 'peralatan' && (
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-800">Peralatan Utama</h4>
                                                <p className="text-[10px] text-slate-500">Mapping peralatan konstruksi sesuai LDP</p>
                                            </div>
                                        </div>
                                        <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 border-dashed text-center">
                                            <FileText size={24} className="mx-auto text-indigo-300 mb-2" />
                                            <p className="text-xs font-bold text-slate-700">Unggah Bukti Kepemilikan Peralatan</p>
                                            <p className="text-[10px] text-slate-500 mb-3">Format PDF maks 20MB</p>
                                            <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-2">
                                                <Download size={13} className="rotate-180" /> Pilih File PDF
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* TAB: RKK */}
                                {teknisSubTab === 'rkk' && (
                                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                                        ${rkkInner}
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
                                        ${scheduleInner}
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
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                                            <div>
                                                <h4 className="text-xs font-bold text-slate-800">Rencana Mutu Pekerjaan Konstruksi (RMPK)</h4>
                                                <p className="text-[10px] text-slate-500">Penjaminan mutu teknis</p>
                                            </div>
                                        </div>
                                        <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 border-dashed text-center">
                                            <FileText size={24} className="mx-auto text-indigo-300 mb-2" />
                                            <p className="text-xs font-bold text-slate-700">Unggah RMPK</p>
                                            <p className="text-[10px] text-slate-500 mb-3">Format PDF</p>
                                            <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-2">
                                                <Download size={13} className="rotate-180" /> Pilih File PDF
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
`;

const beforeRkk = content.substring(0, rkkStartIdx);
let afterSchedule = content.substring(scheduleEndIdx + 1);

const finalContent = beforeRkk + teknisBlock + afterSchedule;
fs.writeFileSync('src/pages/Workspace.jsx', finalContent);
console.log("Refactoring Workspace.jsx completed successfully!");
