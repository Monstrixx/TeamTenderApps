const fs = require('fs');

let content = fs.readFileSync('src/pages/Workspace.jsx', 'utf8');

// 1. Inject RMPK States
const stateSearch = `    // RKK & RMPK States
    const [selectedRkkSection, setSelectedRkkSection] = useState('bahaya');
    const [isRkkProcessing, setIsRkkGenerating] = useState(false);
    const [rkkProgress, setRkkProgress] = useState(100);`;
    
const stateReplacement = `    // RKK & RMPK States
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
    };`;

content = content.replace(stateSearch, stateReplacement);

// 2. Replace the RMPK Tab Content
const rmpkStart = content.indexOf("{teknisSubTab === 'rmpk' && (");
const rmpkEndSearch = `                                        </div>
                                    </div>
                                )}`;
const rmpkEnd = content.indexOf(rmpkEndSearch, rmpkStart) + rmpkEndSearch.length;

if (rmpkStart !== -1 && rmpkEnd !== -1) {
    const rmpkContentBefore = content.substring(rmpkStart, rmpkEnd);

    const replacementRmpk = `{teknisSubTab === 'rmpk' && (
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
                                                        className={\`py-2 px-3 border-b-2 transition-all whitespace-nowrap \${rmpkMenu === menu.id ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700'}\`}>
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
                                                            <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: \`\${rmpkProgress}%\` }}></div>
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
                                )}`;

    content = content.replace(rmpkContentBefore, replacementRmpk);
    fs.writeFileSync('src/pages/Workspace.jsx', content, 'utf8');
    console.log("RMPK logic injected successfully!");
} else {
    console.log("Could not find RMPK boundaries.");
}
