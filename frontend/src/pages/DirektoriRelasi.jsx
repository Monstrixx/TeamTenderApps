import React, { useState } from 'react';
import { Users, Briefcase, Plus, Search, Building2, MapPin, Phone, Mail, Filter, CheckCircle2, X } from 'lucide-react';

export default function DirektoriRelasi() {
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState('Semua');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [relations, setRelations] = useState([
        { id: 'R001', type: 'Mitra KSO', name: 'PT. Konstruksi Hebat', pic: 'Bpk. Hendra', phone: '0812-3456-7890', email: 'hendra@konstruksihebat.com', address: 'Jl. Merdeka No. 45, Jakarta' },
        { id: 'R002', type: 'Supplier', name: 'CV. Baja Nusantara', pic: 'Ibu Ratna', phone: '0813-9876-5432', email: 'sales@bajanusantara.co.id', address: 'Kawasan Industri Pulo Gadung, Blok B2' },
        { id: 'R003', type: 'Subkontraktor', name: 'PT. Bumi Alat Berat', pic: 'Bpk. Tommy', phone: '0811-2233-4455', email: 'info@bumialatberat.com', address: 'Jl. Raya Bogor Km 28, Depok' },
        { id: 'R004', type: 'Supplier', name: 'PT. Semen Tiga Roda', pic: 'Bpk. Ahmad', phone: '0815-5555-6666', email: 'ahmad@tigareda.com', address: 'Jl. Sudirman No. 1, Jakarta' },
    ]);

    const [newVendor, setNewVendor] = useState({
        type: 'Supplier', name: '', pic: '', phone: '', email: '', address: ''
    });

    const handleSaveVendor = () => {
        if (!newVendor.name || !newVendor.pic) return;
        setRelations([...relations, { ...newVendor, id: `R00${relations.length + 1}` }]);
        setIsModalOpen(false);
        setNewVendor({ type: 'Supplier', name: '', pic: '', phone: '', email: '', address: '' });
    };

    const filteredRelations = relations.filter(r => {
        const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.pic.toLowerCase().includes(search.toLowerCase());
        const matchCategory = filterCategory === 'Semua' || r.type === filterCategory;
        return matchSearch && matchCategory;
    });

    return (
        <div className="w-full space-y-6 pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <Users className="text-emerald-600" /> Vendor Hub
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Kelola data Mitra KSO, Supplier, dan Subkontraktor untuk kemudahan pembuatan surat.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus size={16} /> Tambah Vendor
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Cari nama perusahaan atau PIC..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                    />
                </div>
                <div className="flex bg-slate-200/50 p-1 rounded-xl">
                    {['Semua', 'Mitra KSO', 'Supplier', 'Subkontraktor'].map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${filterCategory === cat ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Data */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredRelations.map(rel => (
                    <div key={rel.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-emerald-300 transition-all group flex flex-col cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                                    <Building2 className="text-slate-400 group-hover:text-emerald-500" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-800 text-lg group-hover:text-emerald-700 transition-colors">{rel.name}</h3>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mt-1 
                                        ${rel.type === 'Mitra KSO' ? 'bg-blue-100 text-blue-700' : 
                                          rel.type === 'Supplier' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>
                                        {rel.type}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-100 flex-1">
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <Briefcase size={16} className="text-slate-400" />
                                <span className="font-semibold text-slate-700">PIC:</span> {rel.pic}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <Phone size={16} className="text-slate-400" />
                                {rel.phone}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <Mail size={16} className="text-slate-400" />
                                {rel.email}
                            </div>
                            <div className="flex items-start gap-3 text-sm text-slate-600">
                                <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{rel.address}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {filteredRelations.length === 0 && (
                <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                    <Users size={48} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-lg font-bold text-slate-700">Tidak ada data ditemukan</h3>
                    <p className="text-slate-500 text-sm mt-2">Coba ubah kata kunci pencarian atau filter kategori.</p>
                </div>
            )}

            {/* Modal Tambah Vendor */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <Building2 size={20} className="text-emerald-600" /> Tambah Vendor Baru
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Perusahaan</label>
                                <input type="text" placeholder="PT. Contoh Sukses" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" value={newVendor.name} onChange={e => setNewVendor({...newVendor, name: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
                                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white" value={newVendor.type} onChange={e => setNewVendor({...newVendor, type: e.target.value})}>
                                    <option value="Mitra KSO">Mitra KSO</option>
                                    <option value="Supplier">Supplier</option>
                                    <option value="Subkontraktor">Subkontraktor</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Nama PIC (Person In Charge)</label>
                                <input type="text" placeholder="Bpk. Budi Santoso" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" value={newVendor.pic} onChange={e => setNewVendor({...newVendor, pic: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">No. Telepon / WhatsApp</label>
                                    <input type="text" placeholder="0812-xxxx-xxxx" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" value={newVendor.phone} onChange={e => setNewVendor({...newVendor, phone: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Email</label>
                                    <input type="email" placeholder="kontak@perusahaan.com" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" value={newVendor.email} onChange={e => setNewVendor({...newVendor, email: e.target.value})} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Lengkap</label>
                                <textarea rows="3" placeholder="Jl. Sudirman Kav 1..." className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none" value={newVendor.address} onChange={e => setNewVendor({...newVendor, address: e.target.value})}></textarea>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-bold text-sm text-slate-600 hover:text-slate-800 transition-colors">Batal</button>
                            <button onClick={handleSaveVendor} disabled={!newVendor.name || !newVendor.pic} className="px-5 py-2 font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all">Simpan Vendor</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
