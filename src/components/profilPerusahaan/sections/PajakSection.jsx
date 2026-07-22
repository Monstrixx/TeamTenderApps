import React from 'react';
import { FileDigit, Edit3, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import AiScanButton from '../components/AiScanButton';

export default function PajakSection({ profile, tempProfile, viewMode, actions, uiActions, aiActions }) {
    const LABEL_CLASS = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";
    const INPUT_CLASS = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
    const SELECT_CLASS = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer";
    const BTN_PRIMARY = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all cursor-pointer shadow-sm";

    return (
        <>
            <SectionHeader icon={FileDigit} title="Berkas Pajak & KSWP Perusahaan">
                {viewMode === 'list' ? (
                    <button onClick={actions.handleEdit} className={BTN_PRIMARY}>
                        <Edit3 size={15} /> Lengkapi Dokumen Pajak
                    </button>
                ) : (
                    <>
                        <button onClick={uiActions.cancelEdit} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                        <button onClick={actions.handleSave} className={BTN_PRIMARY}>
                            <Check size={15} /> Simpan Semua
                        </button>
                    </>
                )}
            </SectionHeader>
            <div className="p-6">
                {viewMode === 'list' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* NPWP */}
                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">NPWP Perusahaan</span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">Tervalidasi</span>
                            </div>
                            <div className="text-base font-extrabold text-slate-800">{profile.npwp.nomor || 'Belum diisi'}</div>
                            <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                                <span>File: {profile.npwp.file || 'Tidak ada berkas'}</span>
                                <button className="font-bold text-blue-600 hover:underline">Lihat PDF</button>
                            </div>
                        </div>

                        {/* PKP */}
                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pengukuhan PKP</span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">Aktif</span>
                            </div>
                            <div className="text-base font-extrabold text-slate-800">{profile.pkp.nomor || 'Belum diisi'}</div>
                            <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                                <span>File: {profile.pkp.file || 'Tidak ada berkas'}</span>
                                <button className="font-bold text-blue-600 hover:underline">Lihat PDF</button>
                            </div>
                        </div>

                        {/* KSWP */}
                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Konfirmasi Wajib Pajak (KSWP)</span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">Valid</span>
                            </div>
                            <div className="text-base font-extrabold text-slate-800">{profile.kswp.status || 'Belum diisi'}</div>
                            <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                                <span>File: {profile.kswp.file || 'Tidak ada berkas'}</span>
                                <button className="font-bold text-blue-600 hover:underline">Lihat PDF</button>
                            </div>
                        </div>

                        {/* SPT */}
                        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">SPT Tahunan / Bulanan</span>
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">Tahun {profile.spt.tahun || '-'}</span>
                            </div>
                            <div className="text-sm font-bold text-slate-700">{profile.spt.jenis || 'Belum diisi'}</div>
                            <div className="text-xs text-slate-400 truncate">No BPE: {profile.spt.nomorBpe || '-'}</div>
                            <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
                                <span>File: {profile.spt.file || 'Tidak ada berkas'}</span>
                                <button className="font-bold text-blue-600 hover:underline">Lihat PDF</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Form: NPWP */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">1. NPWP Perusahaan</h3>
                                <AiScanButton target="npwp" onScan={aiActions.triggerAiScan} />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Nomor NPWP</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.npwp.nomor} onChange={e => actions.setTemp({...tempProfile, npwp: {...tempProfile.npwp, nomor: e.target.value}})} placeholder="00.000.000.0-000.000" />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Upload Berkas NPWP (PDF)</label>
                                <div className="border border-slate-200 rounded-lg p-2 bg-white flex items-center justify-between">
                                    <span className="text-xs text-slate-500">{tempProfile.npwp.file || 'Belum ada berkas terunggah.'}</span>
                                    <button type="button" onClick={() => actions.setTemp({...tempProfile, npwp: {...tempProfile.npwp, file: 'npwp_uploaded.pdf'}})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                </div>
                            </div>
                        </div>

                        {/* Form: PKP */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">2. Pengukuhan PKP</h3>
                                <AiScanButton target="pkp" onScan={aiActions.triggerAiScan} />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Nomor SPPKP</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.pkp.nomor} onChange={e => actions.setTemp({...tempProfile, pkp: {...tempProfile.pkp, nomor: e.target.value}})} />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Upload Berkas SPPKP (PDF)</label>
                                <div className="border border-slate-200 rounded-lg p-2 bg-white flex items-center justify-between">
                                    <span className="text-xs text-slate-500">{tempProfile.pkp.file || 'Belum ada berkas terunggah.'}</span>
                                    <button type="button" onClick={() => actions.setTemp({...tempProfile, pkp: {...tempProfile.pkp, file: 'pkp_uploaded.pdf'}})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                </div>
                            </div>
                        </div>

                        {/* Form: KSWP */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">3. Status KSWP</h3>
                                <AiScanButton target="kswp" onScan={aiActions.triggerAiScan} />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Status Validitas KSWP</label>
                                <select className={SELECT_CLASS} value={tempProfile.kswp.status} onChange={e => actions.setTemp({...tempProfile, kswp: {...tempProfile.kswp, status: e.target.value}})}>
                                    <option>Valid (KSWP)</option>
                                    <option>Tidak Valid</option>
                                </select>
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Upload Bukti KSWP (PDF)</label>
                                <div className="border border-slate-200 rounded-lg p-2 bg-white flex items-center justify-between">
                                    <span className="text-xs text-slate-500">{tempProfile.kswp.file || 'Belum ada berkas terunggah.'}</span>
                                    <button type="button" onClick={() => actions.setTemp({...tempProfile, kswp: {...tempProfile.kswp, file: 'kswp_uploaded.pdf'}})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                </div>
                            </div>
                        </div>

                        {/* Form: SPT */}
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">4. SPT Tahunan / Bulanan</h3>
                                <AiScanButton target="spt" onScan={aiActions.triggerAiScan} />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2">
                                    <label className={LABEL_CLASS}>Jenis SPT</label>
                                    <select className={SELECT_CLASS} value={tempProfile.spt.jenis} onChange={e => actions.setTemp({...tempProfile, spt: {...tempProfile.spt, jenis: e.target.value}})}>
                                        <option>SPT Tahunan PPh Badan</option>
                                        <option>SPT Masa PPN</option>
                                        <option>SPT Masa PPh Pasal 21</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={LABEL_CLASS}>Tahun Pajak</label>
                                    <input type="text" className={INPUT_CLASS} value={tempProfile.spt.tahun} onChange={e => actions.setTemp({...tempProfile, spt: {...tempProfile.spt, tahun: e.target.value}})} placeholder="Cth: 2025" />
                                </div>
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Nomor Bukti Penerimaan Elektronik (BPE)</label>
                                <input type="text" className={INPUT_CLASS} value={tempProfile.spt.nomorBpe} onChange={e => actions.setTemp({...tempProfile, spt: {...tempProfile.spt, nomorBpe: e.target.value}})} />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Upload Berkas Laporan SPT & BPE (PDF)</label>
                                <div className="border border-slate-200 rounded-lg p-2 bg-white flex items-center justify-between">
                                    <span className="text-xs text-slate-500">{tempProfile.spt.file || 'Belum ada berkas terunggah.'}</span>
                                    <button type="button" onClick={() => actions.setTemp({...tempProfile, spt: {...tempProfile.spt, file: 'spt_uploaded.pdf'}})} className="text-xs font-bold text-blue-600 hover:underline">Upload</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
