import React from 'react';
import { Building2, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { SELECT_STYLE, LABEL_STYLE as LABEL } from '../../../../data/mock/workspace/fields';

export default function SupplierSection({
    suppliers = [],
    selectedSupplierId = '',
    onSelectSupplier = () => {}
}) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                    <Building2 size={18} className="text-indigo-600" />
                    <div>
                        <h4 className="text-xs font-bold text-slate-800">Direktori Supplier & Distributor</h4>
                        <p className="text-[10px] text-slate-500">Daftar mitra penyedia terverifikasi untuk permohonan dukungan</p>
                    </div>
                </div>
            </div>

            <div>
                <label className={LABEL}>Pilih Supplier Aktif</label>
                <select
                    value={selectedSupplierId}
                    onChange={(e) => onSelectSupplier(e.target.value)}
                    className={`w-full ${SELECT_STYLE}`}
                >
                    {suppliers.map(s => (
                        <option key={s.id} value={s.id}>{s.nama} ({s.kontak})</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {suppliers.map(s => {
                    const isSelected = s.id === selectedSupplierId;
                    return (
                        <div 
                            key={s.id} 
                            onClick={() => onSelectSupplier(s.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-2
                                ${isSelected 
                                    ? 'bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-500/20' 
                                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                                    <Building2 size={13} className="text-indigo-500 shrink-0" />
                                    <span>{s.nama}</span>
                                </div>
                                {isSelected && <CheckCircle2 size={14} className="text-indigo-600 shrink-0" />}
                            </div>

                            <div className="space-y-1 text-[11px] text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={11} className="text-slate-400 shrink-0" />
                                    <span className="truncate">{s.alamat}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Phone size={11} className="text-slate-400 shrink-0" />
                                    <span>{s.kontak}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
