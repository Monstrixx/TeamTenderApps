import React from 'react';
import { Cpu, Trash2, Plus, FileText, Download, Printer } from 'lucide-react';

export default function PeralatanSection({
    peralatanList = [],
    onDeleteEquipment = () => {}
}) {
    return (
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
                                                <td className="px-3 py-2">
                                                    <button 
                                                        onClick={() => onDeleteEquipment(eq.id)} 
                                                        className="text-red-500 hover:text-red-700 cursor-pointer"
                                                    >
                                                        <Trash2 size={12}/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="p-2 bg-slate-50 border-t border-slate-200">
                                    <button className="w-full py-1.5 text-xs text-blue-600 font-bold border border-blue-200 border-dashed rounded bg-white hover:bg-blue-50 flex items-center justify-center gap-1 cursor-pointer">
                                        <Plus size={12}/> Tambah Peralatan
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mt-auto bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 border-dashed text-center">
                                <FileText size={20} className="mx-auto text-indigo-300 mb-2" />
                                <p className="text-[10px] font-bold text-slate-700">Unggah Daftar & Bukti Peralatan</p>
                                <p className="text-[9px] text-slate-500 mb-2">Upload final PDF bertandatangan beserta hasil pindai invoice/bukti sewa.</p>
                                <button className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-[10px] font-bold rounded-lg hover:bg-indigo-50 inline-flex items-center gap-1 cursor-pointer">
                                    <Download size={11} className="rotate-180" /> Pilih File
                                </button>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="w-[55%]">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                                <span>Pratinjau Dokumen (A4 Portrait)</span>
                                <button className="bg-blue-600 text-white px-2 py-1 rounded text-[9px] font-bold flex items-center gap-1 hover:bg-blue-700 cursor-pointer">
                                    <Printer size={10}/> Cetak
                                </button>
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
    );
}
