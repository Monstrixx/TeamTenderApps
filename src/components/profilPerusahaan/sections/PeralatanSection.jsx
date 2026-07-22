import React from 'react';
import { Truck, Plus, Edit3, Trash2, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import AiScanButton from '../components/AiScanButton';
import EmptyState from '../components/EmptyState';

export default function PeralatanSection({ profile, tempProfile, viewMode, actions, tableActions, uiActions, aiActions }) {
    const LABEL_CLASS = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";
    const INPUT_CLASS = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
    const SELECT_CLASS = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer";
    const BTN_PRIMARY = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all cursor-pointer shadow-sm";

    return (
        <>
            <SectionHeader icon={Truck} title="Daftar Peralatan Utama">
                {viewMode === 'list' && (
                    <button onClick={tableActions.handleAddClick} className={BTN_PRIMARY}><Plus size={15} /> Tambah Alat</button>
                )}
            </SectionHeader>
            <div className="p-6">
                {viewMode === 'list' ? (
                    profile.length > 0 ? (
                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Jenis Alat</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Merk / Tipe</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Kapasitas</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Kondisi</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Kepemilikan</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-20">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profile.map((item, idx) => (
                                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 font-semibold text-slate-800">{item.jenis}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.merk}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.kapasitas}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.kondisi}</td>
                                            <td className="px-4 py-3 text-slate-600 font-semibold text-blue-600">{item.status}</td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <button onClick={() => tableActions.handleEditClick('peralatan', idx)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><Edit3 size={14} /></button>
                                                    <button onClick={() => tableActions.handleDeleteRow('peralatan', item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <EmptyState 
                            title="Belum ada data peralatan" 
                            description="Tambahkan daftar peralatan utama yang dimiliki untuk proyek konstruksi."
                        />
                    )
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <div className="text-xs text-slate-500 font-medium">Gunakan pindaian AI untuk deteksi kesalahan & isi otomatis berkas pembelian alat:</div>
                            <AiScanButton target="peralatan" onScan={aiActions.triggerAiScan} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={LABEL_CLASS}>Jenis Alat</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.jenis} onChange={e => actions.setTemp({...tempProfile, jenis: e.target.value})} placeholder="Cth: Dump Truck" />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Merk / Tipe</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.merk} onChange={e => actions.setTemp({...tempProfile, merk: e.target.value})} placeholder="Cth: Hino Dutro" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className={LABEL_CLASS}>Kapasitas</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.kapasitas} onChange={e => actions.setTemp({...tempProfile, kapasitas: e.target.value})} placeholder="Cth: 4 m³" />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Tahun Pembuatan</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.tahun} onChange={e => actions.setTemp({...tempProfile, tahun: e.target.value})} />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Kondisi</label>
                                <select className={SELECT_CLASS} value={tempProfile.kondisi} onChange={e => actions.setTemp({...tempProfile, kondisi: e.target.value})}>
                                    <option>Baik</option>
                                    <option>Rusak Ringan</option>
                                    <option>Rusak Berat</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={LABEL_CLASS}>Status Kepemilikan</label>
                                <select className={SELECT_CLASS} value={tempProfile.status} onChange={e => actions.setTemp({...tempProfile, status: e.target.value})}>
                                    <option>Milik Sendiri</option>
                                    <option>Sewa</option>
                                    <option>Sewa Beli</option>
                                </select>
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Unggah Bukti Kepemilikan (Faktur/BPKB/Sewa) (PDF)</label>
                                <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center justify-between">
                                    <span className="text-xs text-slate-500 truncate max-w-[150px]">{tempProfile.fileBukti || 'Belum ada bukti'}</span>
                                    <button type="button" onClick={() => actions.setTemp({...tempProfile, fileBukti: 'bukti_alat_attached.pdf'})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                            <button onClick={uiActions.cancelEdit} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                            <button onClick={() => tableActions.handleSaveTableItem('peralatan', tempProfile)} className={BTN_PRIMARY}><Check size={15} /> Simpan</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
