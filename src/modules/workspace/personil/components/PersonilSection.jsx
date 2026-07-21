import React from 'react';
import { UserCheck, Plus, FileText, Download, Edit3, Printer } from 'lucide-react';

export default function PersonilSection({
    personelList = [],
    selectedPersonelId = '',
    onSelectPersonel = () => {}
}) {
    return (
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
                                <button className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold hover:bg-blue-100 flex items-center gap-1 cursor-pointer">
                                    <Plus size={10}/> Tambah
                                </button>
                            </div>
                            <div className="space-y-2">
                                {personelList.map(p => (
                                    <div 
                                        key={p.id}
                                        onClick={() => onSelectPersonel(p.id)}
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
                                <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-[10px] font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-1 cursor-pointer">
                                    <Download size={11} className="rotate-180" /> Pilih File
                                </button>
                            </div>
                        </div>

                        {/* A4 Preview */}
                        <div className="w-2/3">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                                <span>Pratinjau CV (A4 Portrait)</span>
                                <div className="flex gap-2">
                                    <button className="bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded text-[9px] font-bold flex items-center gap-1 hover:bg-slate-50 cursor-pointer">
                                        <Edit3 size={10}/> Edit Data
                                    </button>
                                    <button className="bg-blue-600 text-white px-2 py-1 rounded text-[9px] font-bold flex items-center gap-1 hover:bg-blue-700 cursor-pointer">
                                        <Printer size={10}/> Cetak Draf
                                    </button>
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
    );
}
