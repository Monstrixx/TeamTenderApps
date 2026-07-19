const fs = require('fs');

let content = fs.readFileSync('src/pages/Workspace.jsx', 'utf8');

// 1. Add states for Personel, Peralatan, and advanced RKK
const stateInjectionStr = `
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
`;

const stateLocationIndex = content.indexOf("const [teknisSubTab, setTeknisSubTab] = useState('personel');");
if (stateLocationIndex !== -1 && !content.includes('personelList, setPersonelList')) {
    // Insert right after this line
    const insertPoint = content.indexOf('\n', stateLocationIndex) + 1;
    content = content.substring(0, insertPoint) + stateInjectionStr + content.substring(insertPoint);
}

// 2. Replace Personel Block
const personelStart = content.indexOf("{teknisSubTab === 'personel' && (");
const peralatanStart = content.indexOf("{teknisSubTab === 'peralatan' && (");

if (personelStart !== -1 && peralatanStart !== -1) {
    const personelOldStr = content.substring(personelStart, peralatanStart);
    const personelNewStr = `{teknisSubTab === 'personel' && (
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
                                                                    className={\`p-3 rounded-lg border cursor-pointer transition-all \${selectedPersonelId === p.id ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-300' : 'bg-white border-slate-200 hover:border-blue-200'}\`}
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
`;
    content = content.replace(personelOldStr, personelNewStr);
}

// 3. Replace Peralatan Block
const rkkStartCheck = content.indexOf("{teknisSubTab === 'rkk' && (");
const peralatanStartAfter = content.indexOf("{teknisSubTab === 'peralatan' && (");

if (peralatanStartAfter !== -1 && rkkStartCheck !== -1) {
    const peralatanOldStr = content.substring(peralatanStartAfter, rkkStartCheck);
    const peralatanNewStr = `{teknisSubTab === 'peralatan' && (
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
`;
    content = content.replace(peralatanOldStr, peralatanNewStr);
}

fs.writeFileSync('src/pages/Workspace.jsx', content, 'utf8');
console.log("Workspace.jsx Phase 1 updated (Personel & Peralatan).");
