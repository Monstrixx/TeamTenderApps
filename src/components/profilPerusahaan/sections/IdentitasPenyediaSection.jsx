import React from 'react';
import { Building2, Edit3, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import InfoRow from '../components/InfoRow';

export default function IdentitasPenyediaSection({ profile, tempProfile, viewMode, actions, uiActions }) {
    const LABEL_CLASS = "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5";
    const INPUT_CLASS = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
    const SELECT_CLASS = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer";
    const BTN_PRIMARY = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all cursor-pointer shadow-sm";

    return (
        <>
            <SectionHeader icon={Building2} title="Identitas Penyedia">
                {viewMode === 'list' ? (
                    <button onClick={actions.handleEdit} className={BTN_PRIMARY}>
                        <Edit3 size={15} /> Edit Identitas
                    </button>
                ) : (
                    <>
                        <button onClick={uiActions.cancelEdit} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                        <button onClick={actions.handleSave} className={BTN_PRIMARY}>
                            <Check size={15} /> Simpan
                        </button>
                    </>
                )}
            </SectionHeader>
            <div className="p-6">
                {viewMode === 'list' ? (
                    <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
                        <div className="col-span-2"><InfoRow label="Nama Badan Usaha" value={<span className="text-lg font-bold text-slate-900">{profile.nama}</span>} /></div>
                        <InfoRow label="Bentuk Badan Usaha" value={profile.bentuk} />
                        <InfoRow label="Status Usaha" value={profile.status} />
                        <div className="col-span-2"><InfoRow label="Alamat Lengkap" value={profile.alamat} /></div>
                        <InfoRow label="Email Perusahaan" value={profile.email} />
                        <InfoRow label="Telepon" value={profile.telepon} />
                    </dl>
                ) : (
                    <div className="space-y-5">
                        <div>
                            <label className={LABEL_CLASS}>Nama Badan Usaha</label>
                            <input type="text" className={INPUT_CLASS} value={tempProfile.nama || ''} onChange={e => actions.setTemp({...tempProfile, nama: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={LABEL_CLASS}>Bentuk Badan Usaha</label>
                                <select className={SELECT_CLASS} value={tempProfile.bentuk || ''} onChange={e => actions.setTemp({...tempProfile, bentuk: e.target.value})}>
                                    <option>Perseroan Terbatas (PT)</option>
                                    <option>CV</option>
                                    <option>Koperasi</option>
                                </select>
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>Status Usaha</label>
                                <select className={SELECT_CLASS} value={tempProfile.status || ''} onChange={e => actions.setTemp({...tempProfile, status: e.target.value})}>
                                    <option>Pusat</option>
                                    <option>Cabang</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className={LABEL_CLASS}>Alamat Jalan / Gedung</label>
                            <textarea className={INPUT_CLASS} rows={2} value={tempProfile.alamat || ''} onChange={e => actions.setTemp({...tempProfile, alamat: e.target.value})}></textarea>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={LABEL_CLASS}>Email Resmi</label>
                                <input type="email" className={INPUT_CLASS} value={tempProfile.email || ''} onChange={e => actions.setTemp({...tempProfile, email: e.target.value})} />
                            </div>
                            <div>
                                <label className={LABEL_CLASS}>No. Telepon</label>
                                <input type="tel" className={INPUT_CLASS} value={tempProfile.telepon || ''} onChange={e => actions.setTemp({...tempProfile, telepon: e.target.value})} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
