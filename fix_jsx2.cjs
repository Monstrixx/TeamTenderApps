const fs = require('fs');

let content = fs.readFileSync('src/pages/Workspace.jsx', 'utf8');

// Replace RKK block
const rkkStart = content.indexOf("{teknisSubTab === 'rkk' && (");
const dukunganStart = content.indexOf("{teknisSubTab === 'dukungan' && (");
if (rkkStart !== -1 && dukunganStart !== -1) {
  const rkkContentBefore = content.substring(rkkStart, dukunganStart);
  
  const replacementRkk = `{teknisSubTab === 'rkk' && (
                                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                                        <div className="flex flex-col h-full bg-slate-50">
                                            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                                        <Shield size={20} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-800">Rencana Keselamatan Konstruksi (RKK)</h3>
                                                        <p className="text-xs text-slate-500">Penyusunan dokumen K3 sesuai standar</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 p-6 overflow-y-auto">
                                                
                                                {/* Generate AI Button and Progress */}
                                                <div className="flex justify-between items-end mb-6">
                                                    <div>
                                                        <h4 className="text-sm font-bold text-slate-800 mb-1">Draf RKK Otomatis (AI)</h4>
                                                        <p className="text-xs text-slate-500">
                                                            AI membaca <i>Syarat Khusus Kontrak (SSKK)</i> dan mengidentifikasi bahaya utama.
                                                        </p>
                                                    </div>
                                                    <button 
                                                        onClick={triggerRkkGenerate}
                                                        disabled={isRkkProcessing}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
                                                    >
                                                        {isRkkProcessing ? 'Sistem Menyusun Bab...' : 'Susun Draf Bab Ini'}
                                                    </button>
                                                </div>

                                                {isRkkProcessing && (
                                                    <div className="space-y-2 mb-6">
                                                        <div className="flex justify-between text-xs text-slate-500">
                                                            <span>Sistem sedang memproses draf RKK K3...</span>
                                                            <span>{rkkProgress}%</span>
                                                        </div>
                                                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                            <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: \`\${rkkProgress}%\` }}></div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="border-b border-slate-200 flex gap-2">
                                                    <button 
                                                        onClick={() => setSelectedRkkSection('bahaya')}
                                                        className={\`px-3 py-1.5 text-xs font-bold border-b-2 transition-all cursor-pointer
                                                            \${selectedRkkSection === 'bahaya' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}\`}
                                                    >
                                                        Tabel Identifikasi Risiko Bahaya
                                                    </button>
                                                    <button 
                                                        onClick={() => setSelectedRkkSection('kebijakan')}
                                                        className={\`px-3 py-1.5 text-xs font-bold border-b-2 transition-all cursor-pointer
                                                            \${selectedRkkSection === 'kebijakan' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}\`}
                                                    >
                                                        Kebijakan Keselamatan (K3)
                                                    </button>
                                                </div>

                                                <div className="p-4 bg-slate-100 flex flex-col mt-4">
                                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                                                        <span>Pratinjau Dokumen K3 RKK (A4 Portrait)</span>
                                                        <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[8px] font-bold">210mm x 297mm</span>
                                                    </div>
                                                    <div className="flex-1 overflow-auto border border-slate-200 rounded-xl bg-slate-350/30 p-4 flex justify-center max-h-[500px]">
                                                        <div className="a4-portrait font-mono text-[9px] text-slate-700 leading-normal shadow-lg overflow-y-auto space-y-4">
                                                            <div className="text-center font-extrabold text-slate-900 text-xs underline uppercase mb-4">
                                                                RENCANA KESELAMATAN KONSTRUKSI (RKK)
                                                            </div>
                                                            <div className="text-left space-y-2 text-[8px]">
                                                                <div><strong>Paket Pekerjaan:</strong> {tenderMeta.namaPaket}</div>
                                                                <div><strong>Penyusun:</strong> PT. Maju Konstruksi</div>
                                                                <div className="border-t border-slate-300 pt-3"></div>
                                                            </div>
                                                            
                                                            {selectedRkkSection === 'bahaya' ? (
                                                                <div className="space-y-3">
                                                                    <div className="font-bold text-slate-800 text-[10px] uppercase border-b border-slate-200 pb-1">Tabel Identifikasi Bahaya K3</div>
                                                                    <table className="w-full border-collapse border border-slate-800 text-[7.5px] leading-relaxed">
                                                                        <thead>
                                                                            <tr className="bg-slate-50 font-bold">
                                                                                <th className="border border-slate-800 p-1 w-8 text-center">No</th>
                                                                                <th className="border border-slate-800 p-1">Item Pekerjaan</th>
                                                                                <th className="border border-slate-800 p-1 text-red-700">Risiko Bahaya</th>
                                                                                <th className="border border-slate-800 p-1 text-emerald-700">Mitigasi K3</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {rkkContent.bahaya.map((row) => (
                                                                                <tr key={row.no}>
                                                                                    <td className="border border-slate-800 p-1 text-center">{row.no}</td>
                                                                                    <td className="border border-slate-800 p-1 font-semibold">{row.pekerjaan}</td>
                                                                                    <td className="border border-slate-800 p-1 text-red-600">{row.risiko}</td>
                                                                                    <td className="border border-slate-800 p-1 text-emerald-700">{row.mitigasi}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            ) : (
                                                                <div className="space-y-3">
                                                                    <div className="font-bold text-slate-800 text-[10px] uppercase border-b border-slate-200 pb-1">Pakta Komitmen Kebijakan K3</div>
                                                                    <div className="whitespace-pre-wrap leading-relaxed text-justify text-[8px]">
                                                                        {rkkContent.kebijakan}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 border-dashed text-center mt-6">
                                                    <FileText size={24} className="mx-auto text-indigo-300 mb-2" />
                                                    <p className="text-xs font-bold text-slate-700">Unggah Final RKK (PDF)</p>
                                                    <p className="text-[10px] text-slate-500 mb-3">Format PDF yang sudah ditandatangani</p>
                                                    <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-2">
                                                        <Download size={13} className="rotate-180" /> Pilih File PDF
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB: Dukungan */}
                                `;

  content = content.replace(rkkContentBefore, replacementRkk);
}

fs.writeFileSync('src/pages/Workspace.jsx', content, 'utf8');
console.log("Workspace.jsx updated with AI components!");
