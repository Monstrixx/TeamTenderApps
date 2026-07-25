import React from 'react';
import { Users2, Plus, Edit3, Trash2, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import AiScanButton from '../components/AiScanButton';
import EmptyState from '../components/EmptyState';

export default function TenagaAhliSection({ profile, tempProfile, viewMode, actions, tableActions, uiActions, aiActions }) {
    const LABEL_CLASS = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";
    const INPUT_CLASS = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
    const BTN_PRIMARY = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all cursor-pointer shadow-sm";

    return (
        <>
            <SectionHeader icon={Users2} title="Tenaga Ahli & Personel">
                {viewMode === 'list' && (
                    <button onClick={tableActions.handleAddClick} className={BTN_PRIMARY}><Plus size={15} /> Tambah Tenaga Ahli</button>
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
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Pendidikan</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Keahlian</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">SKK / Sertifikat</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Pengalaman</th>
                                        <th className="px-4 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-20">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profile.map((item, idx) => (
                                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3 font-semibold text-slate-800">{item.nama}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.pendidikan}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.keahlian}</td>
                                            <td className="px-4 py-3 text-slate-600">{item.skk}</td>
                                            <td className="px-4 py-3 text-slate-600 font-bold">{item.pengalaman} Tahun</td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <button onClick={() => tableActions.handleEditClick('tenaga', idx)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><Edit3 size={14} /></button>
                                                    <button onClick={() => tableActions.handleDeleteRow('tenaga', item.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"><Trash2 size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <EmptyState 
                            title="Belum ada data tenaga ahli" 
                            description="Tambahkan tenaga ahli dan kompetensi personel perusahaan."
                        />
                    )
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <div className="text-xs text-slate-500 font-medium">Gunakan pindaian AI untuk deteksi kesalahan & isi otomatis dari CV Tenaga Ahli:</div>
                            <AiScanButton target="tenaga" onScan={aiActions.triggerAiScan} />
                        </div>

                        <div>
                            <label className={LABEL_CLASS}>Nama Lengkap</label>
                            <input type="text" className={INPUT_CLASS} value={tempProfile.nama} onChange={e => actions.setTemp({...tempProfile, nama: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={LABEL_CLASS}>Pendidikan Terakhir</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.pendidikan} onChange={e => actions.setTemp({...tempProfile, pendidikan: e.target.value})} placeholder="Cth: S1 Teknik Sipil" />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Bidang Keahlian</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.keahlian} onChange={e => actions.setTemp({...tempProfile, keahlian: e.target.value})} placeholder="Cth: Struktur" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={LABEL_CLASS}>SKK / Sertifikat</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.skk} onChange={e => actions.setTemp({...tempProfile, skk: e.target.value})} placeholder="Cth: SKA Ahli Muda" />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Pengalaman Kerja (Tahun)</label>
                                <input type="number" className={INPUT_CLASS} value={tempProfile.pengalaman} onChange={e => actions.setTemp({...tempProfile, pengalaman: Number(e.target.value)})} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={LABEL_CLASS}>Upload Ijazah Tenaga Ahli (PDF)</label>
                                <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center justify-between">
                                    <span className="text-xs text-slate-500 truncate max-w-[150px]">{tempProfile.fileIjazah || 'Belum ada ijazah'}</span>
                                    <button type="button" onClick={() => actions.setTemp({...tempProfile, fileIjazah: 'ijazah_attached.pdf'})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                </div>
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Upload Curriculum Vitae (CV) (PDF)</label>
                                <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 flex items-center justify-between">
                                    <span className="text-xs text-slate-500 truncate max-w-[150px]">{tempProfile.fileCv || 'Belum ada CV'}</span>
                                    <button type="button" onClick={() => actions.setTemp({...tempProfile, fileCv: 'cv_attached.pdf'})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                            <button onClick={uiActions.cancelEdit} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                            <button onClick={() => tableActions.handleSaveTableItem('tenaga', tempProfile)} className={BTN_PRIMARY}><Check size={15} /> Simpan</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
