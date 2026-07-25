import React from 'react';
import { LayoutTemplate, Edit3, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';

export default function CompanyProfileSection({ profile, tempProfile, viewMode, actions, uiActions }) {
    const INPUT_CLASS = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all";
    const BTN_PRIMARY = "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all cursor-pointer shadow-sm";

    return (
        <>
            <SectionHeader icon={LayoutTemplate} title="Publikasi Company Profile">
                {viewMode === 'list' ? (
                    <button onClick={actions.handleEdit} className={BTN_PRIMARY}>
                        <Edit3 size={14} /> Edit Profil
                    </button>
                ) : (
                    <>
                        <button onClick={uiActions.cancelEdit} className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">Batal</button>
                        <button onClick={actions.handleSave} className={BTN_PRIMARY}>
                            <Check size={14} /> Simpan
                        </button>
                    </>
                )}
            </SectionHeader>

            <div className="p-6 space-y-8">
                {viewMode === 'list' ? (
                    <>
                        <section>
                            <h3 className="text-sm font-bold text-slate-800 mb-1">Tema Desain Aktif</h3>
                            <div className="mt-4 max-w-sm rounded-xl border border-slate-200 p-4 shadow-sm">
                                <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Corporate Minimalis</div>
                                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop" className="w-full h-32 object-cover rounded-lg" alt="Corporate" />
                            </div>
                        </section>
                        <section className="pt-6 border-t border-slate-100">
                            <h3 className="text-sm font-bold text-slate-800 mb-4">Informasi Dasar</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Slogan (Tagline)</div>
                                    <div className="text-sm font-medium text-slate-800">{profile.tagline}</div>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Latar Belakang</div>
                                    <div className="text-sm text-slate-700 leading-relaxed max-w-3xl">{profile.background}</div>
                                </div>
                            </div>
                        </section>
                    </>
                ) : (
                    <>
                        <section>
                            <h3 className="text-sm font-bold text-slate-800 mb-1">Pilih Tema Desain</h3>
                            <p className="text-xs text-slate-500 mb-4">Pilih tata letak visual Company Profile. Data akan terisi otomatis.</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative cursor-pointer group">
                                    <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md"><Check size={14} /></div>
                                    <div className="overflow-hidden rounded-xl border-2 border-blue-600 shadow-sm">
                                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop" className="w-full h-36 object-cover" alt="Corporate" />
                                    </div>
                                    <div className="mt-2 text-center text-xs font-bold text-slate-800">Corporate Minimalis</div>
                                </div>
                                <div className="relative cursor-pointer group opacity-60 hover:opacity-100 transition-opacity">
                                    <div className="overflow-hidden rounded-xl border-2 border-slate-200 hover:border-slate-300 shadow-sm transition-all">
                                        <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=400&auto=format&fit=crop" className="w-full h-36 object-cover grayscale group-hover:grayscale-0 transition-all" alt="Modern" />
                                    </div>
                                    <div className="mt-2 text-center text-xs font-semibold text-slate-500 group-hover:text-slate-800">Modern Konstruksi</div>
                                </div>
                            </div>
                        </section>
                        <section className="pt-6 border-t border-slate-100">
                            <h3 className="text-sm font-bold text-slate-800 mb-4">Informasi Dasar & Narasi Utama</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Slogan Perusahaan (Tagline)</label>
                                    <input type="text" className={INPUT_CLASS} value={tempProfile.tagline || ''} onChange={e => actions.setTemp({...tempProfile, tagline: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Latar Belakang / Deskripsi Singkat</label>
                                    <textarea className={INPUT_CLASS} rows={4} value={tempProfile.background || ''} onChange={e => actions.setTemp({...tempProfile, background: e.target.value})} />
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </>
    );
}
