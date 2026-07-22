import React from 'react';
import { Network, Plus, Edit3, Trash2, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';

export default function PengurusPerusahaanSection({ profile, tempProfile, viewMode, actions, tableActions, uiActions }) {
    const LABEL_CLASS = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";
    const INPUT_CLASS = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
    const BTN_PRIMARY = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all cursor-pointer shadow-sm";

    return (
        <>
            <SectionHeader icon={Network} title="Pengurus Perusahaan">
                {viewMode === 'list' && (
                    <button onClick={tableActions.handleAddClick} className={BTN_PRIMARY}><Plus size={15} /> Tambah Pengurus</button>
                )}
            </SectionHeader>
            <div className="p-6">
                {viewMode === 'list' ? (
                    profile.length > 0 ? (
                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Jabatan</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Masa Jabatan</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-20">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profile.map((item, idx) => (
                                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 font-semibold text-slate-800">{item.nama}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.jabatan}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.tglMulai} s.d. {item.tglSelesai}</td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <button onClick={() => tableActions.handleEditClick('pengurus', idx)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><Edit3 size={14} /></button>
                                                    <button onClick={() => tableActions.handleDeleteRow('pengurus', item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <EmptyState 
                            title="Belum ada data pengurus" 
                            description="Tambahkan data pengurus perusahaan yang aktif."
                        />
                    )
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className={LABEL_CLASS}>Nama Pengurus</label>
                            <input type="text" className={INPUT_CLASS} value={tempProfile.nama} onChange={e => actions.setTemp({...tempProfile, nama: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={LABEL_CLASS}>Jabatan</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.jabatan} onChange={e => actions.setTemp({...tempProfile, jabatan: e.target.value})} />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>NIK / No KTP</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.ktp} onChange={e => actions.setTemp({...tempProfile, ktp: e.target.value})} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={LABEL_CLASS}>Mulai Menjabat</label>
                                <input type="date" className={INPUT_CLASS} value={tempProfile.tglMulai} onChange={e => actions.setTemp({...tempProfile, tglMulai: e.target.value})} />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Selesai Menjabat</label>
                                <input type="date" className={INPUT_CLASS} value={tempProfile.tglSelesai} onChange={e => actions.setTemp({...tempProfile, tglSelesai: e.target.value})} />
                            </div>
                        </div>
                        <div>
                            <label className={LABEL_CLASS}>Unggah SK Pengangkatan Pengurus (PDF)</label>
                            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 flex items-center justify-between">
                                <span className="text-xs text-slate-500">{tempProfile.file || 'Belum ada berkas SK.'}</span>
                                <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Pilih Berkas</button>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                            <button onClick={uiActions.cancelEdit} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                            <button onClick={() => tableActions.handleSaveTableItem('pengurus', tempProfile)} className={BTN_PRIMARY}><Check size={15} /> Simpan</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
