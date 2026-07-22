import React, { memo } from 'react';
import { Table, Lock } from 'lucide-react';

const BoqTable = memo(function BoqTable({ items }) {
    // Reason for memo: BoqTable can have 500+ rows in production, expensive rendering
    return (
        <table className="w-full text-left text-[11px] whitespace-nowrap">
            <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 sticky top-0 z-10 shadow-sm">
                <tr>
                    <th className="py-3 px-4 font-bold text-center w-12">No</th>
                    <th className="py-3 px-4 font-bold">Uraian Pekerjaan</th>
                    <th className="py-3 px-4 font-bold text-center">Sat</th>
                    <th className="py-3 px-4 font-bold text-right bg-amber-50 text-amber-800 border-l border-amber-100" title="Terkunci">Vol 🔒</th>
                    <th className="py-3 px-4 font-bold text-right w-40 border-l border-slate-200">Harga Satuan (Rp)</th>
                    <th className="py-3 px-4 font-bold text-right w-40">Total (Rp)</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                <tr className="bg-slate-50"><td colSpan="6" className="py-2 px-4 font-black text-xs text-slate-800">II. PEKERJAAN BETON UTAMA</td></tr>
                {items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 text-center text-slate-400">{item.no}</td>
                        <td className="py-2.5 px-4 font-semibold text-slate-700 truncate max-w-[200px]">{item.name}</td>
                        <td className="py-2.5 px-4 text-center text-slate-500">{item.sat}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-amber-700 bg-amber-50/30 border-l border-amber-50">{item.vol.toLocaleString('en-US', {minimumFractionDigits:2})}</td>
                        <td className="py-2.5 px-4 border-l border-slate-100">
                            <input 
                                type="number" 
                                defaultValue={item.price}
                                className="w-full bg-white border border-slate-200 rounded px-2 py-1 text-right font-bold text-indigo-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                        </td>
                        <td className="py-2.5 px-4 text-right font-black text-slate-800 bg-slate-50/50">
                            {(item.vol * item.price).toLocaleString('id-ID')}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
});

export default function BoqSection() {
    const mockItems = React.useMemo(() => [
        { no: '2.1', name: 'Beton K-250 (Ready Mix)', sat: 'm3', vol: 120.50, price: 1150000 },
        { no: '2.2', name: 'Pembesian dengan Besi Polos', sat: 'Kg', vol: 8500.00, price: 18750 },
        { no: '2.3', name: 'Bekisting Kayu Klas III', sat: 'm2', vol: 450.00, price: 110000 }
    ], []);

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[70vh]">
                <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <div>
                        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                            <Table className="text-indigo-600" size={20}/> Bill of Quantity (BoQ)
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                            <Lock size={12} className="text-amber-500"/> Volume terkunci untuk menghindari kesalahan Koreksi Aritmatik (Pasal 28.3).
                        </p>
                    </div>
                </div>
                
                <div className="flex-1 overflow-auto">
                    <BoqTable items={mockItems} />
                </div>
            </div>
        </div>
    );
}
