import React from 'react';
import { UserCheck, Plus, Edit3, Trash2, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import EmptyState from '../components/EmptyState';

export default function DireksiPemilikSection({ profile, tempProfile, viewMode, actions, tableActions, uiActions }) {
    const LABEL_CLASS = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";
    const INPUT_CLASS = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
    const BTN_PRIMARY = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all cursor-pointer shadow-sm";

    return (
        <>
            <SectionHeader icon={UserCheck} title="Direksi & Pemilik Saham">
                {viewMode === 'list' && (
                    <button onClick={tableActions.handleAddClick} className={BTN_PRIMARY}><Plus size={15} /> Tambah Direksi</button>
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
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">KTP</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Saham</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Lampiran KTP & NPWP</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-20">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profile.map((item, idx) => (
                                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 font-semibold text-slate-800">{item.nama}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.jabatan}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.ktp}</td>
                                            <td className="px-4 py-3 text-slate-600 font-bold">{item.saham}</td>
                                            <td className="px-4 py-3 text-xs text-slate-500">
                                                <div className="flex gap-2">
                                                    <span className="bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-[80px]">{item.fileKtp || 'KTP'}</span>
                                                    <span className="bg-slate-100 px-1.5 py-0.5 rounded truncate max-w-[80px]">{item.fileNpwp || 'NPWP'}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <button onClick={() => tableActions.handleEditClick('direksi', idx)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><Edit3 size={14} /></button>
                                                    <button onClick={() => tableActions.handleDeleteRow('direksi', item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <EmptyState 
                            title="Belum ada data direksi" 
                            description="Tambahkan susunan pengurus, direksi, dan pemilik saham perusahaan."
                        />
                    )
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className={LABEL_CLASS}>Nama Lengkap</label>
                            <input type="text" className={INPUT_CLASS} value={tempProfile.nama} onChange={e => actions.setTemp({...tempProfile, nama: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={LABEL_CLASS}>Jabatan</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.jabatan} onChange={e => actions.setTemp({...tempProfile, jabatan: e.target.value})} />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Kepemilikan Saham (%)</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.saham} onChange={e => actions.setTemp({...tempProfile, saham: e.target.value})} />
                            </div>
                        </div>
                        <div>
                            <label className={LABEL_CLASS}>Nomor KTP</label>
                            <input type="text" className={INPUT_CLASS} value={tempProfile.ktp} onChange={e => actions.setTemp({...tempProfile, ktp: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={LABEL_CLASS}>Lampiran KTP Personil (PDF/JPG)</label>
                                <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center justify-between">
                                    <span className="text-xs text-slate-500 truncate max-w-[150px]">{tempProfile.fileKtp || 'Belum ada file KTP'}</span>
                                    <button type="button" onClick={() => actions.setTemp({...tempProfile, fileKtp: 'ktp_direksi_attached.pdf'})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                </div>
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Lampiran NPWP Personil (PDF/JPG)</label>
                                <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center justify-between">
                                    <span className="text-xs text-slate-500 truncate max-w-[150px]">{tempProfile.fileNpwp || 'Belum ada file NPWP'}</span>
                                    <button type="button" onClick={() => actions.setTemp({...tempProfile, fileNpwp: 'npwp_direksi_attached.pdf'})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                            <button onClick={uiActions.cancelEdit} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                            <button onClick={() => tableActions.handleSaveTableItem('direksi', tempProfile)} className={BTN_PRIMARY}><Check size={15} /> Simpan</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
