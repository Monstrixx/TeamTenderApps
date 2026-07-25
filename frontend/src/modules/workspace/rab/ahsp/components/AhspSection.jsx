import React from 'react';
import { Calculator } from 'lucide-react';

export default function AhspSection({
    profitMargin,
    setProfitMargin
}) {
    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 opacity-50"></div>
                
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Analisa Harga Satuan Pekerjaan (AHSP)</div>
                        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-2">
                            <Calculator className="text-indigo-600" size={24}/> Pembuatan 1 m3 Beton K-250
                        </h3>
                        <div className="flex gap-2">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">Kode: 2.2.1.6.1.c</span>
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold">SNI 2025</span>
                        </div>
                    </div>
                    
                    {/* Profit Slider */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 w-64">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-[10px] font-bold text-slate-600 uppercase">Overhead & Profit (%)</label>
                            <span className="text-sm font-black text-indigo-700">{profitMargin}%</span>
                        </div>
                        <input 
                            type="range" min="0" max="15" step="1"
                            value={profitMargin}
                            onChange={e => setProfitMargin(e.target.value)}
                            className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="text-[9px] text-slate-400 mt-2 text-center">Geser ke 0% untuk Mode Klarifikasi Kewajaran</div>
                    </div>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden mb-6">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 border-b border-slate-200 text-slate-600">
                            <tr>
                                <th className="p-3 font-bold">Komponen</th>
                                <th className="p-3 font-bold text-center">Sat</th>
                                <th className="p-3 font-bold text-right">Koefisien</th>
                                <th className="p-3 font-bold text-right">Harga Dasar (Rp)</th>
                                <th className="p-3 font-bold text-right">Jumlah Harga (Rp)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr><td colSpan="5" className="px-3 py-1.5 bg-slate-50 font-bold text-[10px] text-slate-500 uppercase">A. Tenaga</td></tr>
                            <tr className="hover:bg-slate-50">
                                <td className="p-3 pl-6 font-medium text-slate-700">Pekerja</td>
                                <td className="p-3 text-center text-slate-500">OH</td>
                                <td className="p-3 text-right">1.6500</td>
                                <td className="p-3 text-right">120,000</td>
                                <td className="p-3 text-right font-semibold text-slate-800">198,000</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="p-3 pl-6 font-medium text-slate-700">Tukang Batu</td>
                                <td className="p-3 text-center text-slate-500">OH</td>
                                <td className="p-3 text-right">0.2750</td>
                                <td className="p-3 text-right">150,000</td>
                                <td className="p-3 text-right font-semibold text-slate-800">41,250</td>
                            </tr>
                            
                            <tr><td colSpan="5" className="px-3 py-1.5 bg-slate-50 font-bold text-[10px] text-slate-500 uppercase">B. Bahan</td></tr>
                            <tr className="hover:bg-slate-50">
                                <td className="p-3 pl-6 font-medium text-slate-700">Semen Portland</td>
                                <td className="p-3 text-center text-slate-500">Kg</td>
                                <td className="p-3 text-right">384.0000</td>
                                <td className="p-3 text-right">1,250</td>
                                <td className="p-3 text-right font-semibold text-slate-800">480,000</td>
                            </tr>
                            <tr className="hover:bg-slate-50">
                                <td className="p-3 pl-6 font-medium text-slate-700">Pasir Beton</td>
                                <td className="p-3 text-center text-slate-500">m3</td>
                                <td className="p-3 text-right">0.4940</td>
                                <td className="p-3 text-right">275,000</td>
                                <td className="p-3 text-right font-semibold text-slate-800">135,850</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end">
                    <div className="w-80 space-y-2 text-sm">
                        <div className="flex justify-between text-slate-600">
                            <span>Sub Total (A + B + C)</span>
                            <span className="font-semibold">Rp 855,100</span>
                        </div>
                        <div className="flex justify-between text-indigo-600 font-semibold border-b border-slate-200 pb-2">
                            <span>Overhead & Profit ({profitMargin}%)</span>
                            <span>Rp {(855100 * profitMargin / 100).toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between text-slate-900 font-black text-lg pt-1">
                            <span>Harga Satuan (D + E)</span>
                            <span>Rp {(855100 + (855100 * profitMargin / 100)).toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
