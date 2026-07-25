import React from 'react';
import { Briefcase, Plus, Edit3, Trash2, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import AiScanButton from '../components/AiScanButton';
import EmptyState from '../components/EmptyState';

export default function PengalamanSection({ profile, tempProfile, viewMode, actions, tableActions, uiActions, aiActions }) {
    const LABEL_CLASS = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";
    const INPUT_CLASS = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
    const SELECT_CLASS = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer";
    const BTN_PRIMARY = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all cursor-pointer shadow-sm";

    return (
        <>
            <SectionHeader icon={Briefcase} title="Daftar Pengalaman Paket Pekerjaan">
                {viewMode === 'list' && (
                    <button onClick={tableActions.handleAddClick} className={BTN_PRIMARY}><Plus size={15} /> Tambah Pengalaman</button>
                )}
            </SectionHeader>
            <div className="p-6">
                {viewMode === 'list' ? (
                    profile.length > 0 ? (
                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Paket Pekerjaan</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Nilai Kontrak</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status Proyek</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Fisik (%)</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Lampiran Berkas</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-20">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profile.map((item, idx) => (
                                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 max-w-[200px]">
                                                <div className="font-semibold text-slate-800 truncate mb-0.5">{item.paket}</div>
                                                <div className="text-[10px] text-slate-400 truncate">{item.pengguna}</div>
                                            </td>
                                            <td className="px-4 py-3 text-slate-800 font-bold">{item.nilai}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border 
                                                    ${item.status === 'Sedang Berjalan' 
                                                        ? 'bg-amber-50 text-amber-700 border-amber-200/50' 
                                                        : 'bg-emerald-50 text-emerald-700 border-emerald-200/50'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-slate-700">{item.progress}%</td>
                                            <td className="px-4 py-3 text-xs text-slate-400 space-y-0.5">
                                                <div className="truncate max-w-[120px]">Kontrak: {item.fileKontrak || '-'}</div>
                                                <div className="truncate max-w-[120px]">BASTP (PHO): {item.fileBastp || '-'}</div>
                                                <div className="truncate max-w-[120px]">BAST (FHO): {item.fileBast || '-'}</div>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <button onClick={() => tableActions.handleEditClick('pengalaman', idx)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><Edit3 size={14} /></button>
                                                    <button onClick={() => tableActions.handleDeleteRow('pengalaman', item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <EmptyState 
                            title="Belum ada data pengalaman" 
                            description="Tambahkan data pengalaman pekerjaan konstruksi perusahaan."
                        />
                    )
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <div className="text-xs text-slate-500 font-medium">Gunakan pindaian AI untuk deteksi kesalahan & isi otomatis dari Dokumen Kontrak:</div>
                            <AiScanButton target="pengalaman" onScan={aiActions.triggerAiScan} />
                        </div>

                        <div>
                            <label className={LABEL_CLASS}>Nama Paket Pekerjaan</label>
                            <input type="text" className={INPUT_CLASS} value={tempProfile.paket} onChange={e => actions.setTemp({...tempProfile, paket: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={LABEL_CLASS}>Bidang Pekerjaan</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.bidang} onChange={e => actions.setTemp({...tempProfile, bidang: e.target.value})} placeholder="Cth: Gedung" />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Pengguna Jasa / Instansi</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.pengguna} onChange={e => actions.setTemp({...tempProfile, pengguna: e.target.value})} />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <label className={LABEL_CLASS}>Nomor Kontrak</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.kontrak} onChange={e => actions.setTemp({...tempProfile, kontrak: e.target.value})} />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Nilai Kontrak (Rp)</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.nilai} onChange={e => actions.setTemp({...tempProfile, nilai: e.target.value})} placeholder="Cth: Rp 1.500.000.000" />
                            </div>
                        </div>
                        
                        {/* Status & Progress */}
                        <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                            <div className="col-span-2">
                                <label className={LABEL_CLASS}>Status Pekerjaan</label>
                                <select 
                                    className={SELECT_CLASS} 
                                    value={tempProfile.status} 
                                    onChange={e => {
                                        const stat = e.target.value;
                                        actions.setTemp({
                                            ...tempProfile, 
                                            status: stat,
                                            progress: stat === 'Selesai' ? 100 : (tempProfile.progress === 100 ? 50 : tempProfile.progress)
                                        });
                                    }}
                                >
                                    <option value="Selesai">Selesai (100%) [Untuk menghitung KD]</option>
                                    <option value="Sedang Berjalan">Sedang Berjalan (Belum 100%) [Untuk menghitung SKP]</option>
                                </select>
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Progress Fisik (%)</label>
                                <input 
                                    type="number" 
                                    className={INPUT_CLASS} 
                                    disabled={tempProfile.status === 'Selesai'} 
                                    value={tempProfile.progress} 
                                    onChange={e => actions.setTemp({...tempProfile, progress: Number(e.target.value)})} 
                                    min="0" max="99"
                                />
                            </div>
                        </div>

                        {/* Multi-uploads */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Lampiran Dokumen Pengalaman (PDF)</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 mb-1 block">1. File Kontrak</label>
                                    <div className="border border-slate-200 rounded p-1.5 bg-slate-50 flex items-center justify-between text-xs">
                                        <span className="truncate max-w-[80px]">{tempProfile.fileKontrak || 'Tidak ada'}</span>
                                        <button type="button" onClick={() => actions.setTemp({...tempProfile, fileKontrak: 'kontrak_attached.pdf'})} className="text-blue-600 font-bold hover:underline">Upload</button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 mb-1 block">2. File BASTP (PHO)</label>
                                    <div className="border border-slate-200 rounded p-1.5 bg-slate-50 flex items-center justify-between text-xs">
                                        <span className="truncate max-w-[80px]">{tempProfile.fileBastp || 'Tidak ada'}</span>
                                        <button type="button" onClick={() => actions.setTemp({...tempProfile, fileBastp: 'pho_attached.pdf'})} className="text-blue-600 font-bold hover:underline">Upload</button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 mb-1 block">3. File BAST (FHO)</label>
                                    <div className="border border-slate-200 rounded p-1.5 bg-slate-50 flex items-center justify-between text-xs">
                                        <span className="truncate max-w-[80px]">{tempProfile.fileBast || 'Tidak ada'}</span>
                                        <button type="button" onClick={() => actions.setTemp({...tempProfile, fileBast: 'fho_attached.pdf'})} className="text-blue-600 font-bold hover:underline">Upload</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                            <button onClick={uiActions.cancelEdit} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                            <button onClick={() => tableActions.handleSaveTableItem('pengalaman', tempProfile)} className={BTN_PRIMARY}><Check size={15} /> Simpan</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
