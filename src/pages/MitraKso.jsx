import React, { useState } from 'react';
import { 
    Users, Plus, Search, Mail, Phone, ShieldCheck, ShieldAlert, 
    ArrowUpRight, CheckCircle2, AlertCircle, Copy, Send, Trash2, Edit2, Lock
} from 'lucide-react';

const INPUT_STYLE = "px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all";
const SELECT_STYLE = "px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer";
const LABEL = "block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5";

export default function MitraKso() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [invitationLink, setInvitationLink] = useState('');
    
    // Form States
    const [newMitraName, setNewMitraName] = useState('');
    const [newMitraEmail, setNewMitraEmail] = useState('');
    const [newMitraPhone, setNewMitraPhone] = useState('');
    const [newMitraSbu, setNewMitraSbu] = useState('BG009 - Gedung');

    // Partners list
    const [partners, setPartners] = useState([
        { 
            id: "kso1", 
            nama: "PT. KSO Karya Pratama", 
            email: "admin@karyapratama.co.id", 
            telp: "0812-3456-7890", 
            sbu: "BG009 (Konstruksi Gedung)", 
            progress: 100, 
            status: "Verified",
            tenders: ["Pembangunan Gedung PGRI Rembang"] 
        },
        { 
            id: "kso2", 
            nama: "CV. Sinergi Beton Nusantara", 
            email: "tender@sinergibeton.com", 
            telp: "0821-9876-5432", 
            sbu: "SP004 (Pekerjaan Beton)", 
            progress: 75, 
            status: "Pending Review",
            tenders: ["Peningkatan Jalan Lingkar Rembang"] 
        }
    ]);

    const handleInvite = (e) => {
        e.preventDefault();
        if (!newMitraName || !newMitraEmail) return;

        const newId = `kso${partners.length + 1}`;
        const newPartner = {
            id: newId,
            nama: newMitraName,
            email: newMitraEmail,
            telp: newMitraPhone || "-",
            sbu: newMitraSbu,
            progress: 0,
            status: "Invited",
            tenders: []
        };

        setPartners([newPartner, ...partners]);
        setInvitationLink(`http://localhost:5173/kso-portal/invite?code=KSO-${newId}-SECURE`);
        
        // Reset form
        setNewMitraName('');
        setNewMitraEmail('');
        setNewMitraPhone('');
    };

    const handleDelete = (id) => {
        if(confirm("Apakah Anda yakin ingin menghapus mitra KSO ini dari direktori?")) {
            setPartners(partners.filter(p => p.id !== id));
        }
    };

    const filteredPartners = partners.filter(p => 
        p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-extrabold shadow-md">
                        <Users size={20} />
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-slate-800">Direktori Mitra KSO (Kerja Sama Operasi)</h1>
                        <p className="text-xs text-slate-500 font-medium">Kelola rekanan KSO terpusat, kirim undangan akses profil, dan sinkronkan kelengkapan kualifikasi.</p>
                    </div>
                </div>
                <button 
                    onClick={() => { setShowInviteModal(true); setInvitationLink(''); }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all shadow-sm cursor-pointer"
                >
                    <Plus size={13} /> Undang Mitra KSO
                </button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-3 bg-white p-3 border border-slate-200 rounded-xl shadow-sm">
                <div className="relative flex-1">
                    <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Cari nama mitra KSO atau email..." 
                        className={INPUT_STYLE + " w-full pl-9 py-2"}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid Kartu Mitra KSO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPartners.map(partner => (
                    <div key={partner.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:border-slate-300 transition-all">
                        {/* Top Area */}
                        <div className="p-5 border-b border-slate-100 space-y-3.5 flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-800">{partner.nama}</h3>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{partner.sbu}</span>
                                </div>
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border
                                    ${partner.status === 'Verified' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 
                                      partner.status === 'Pending Review' ? 'bg-amber-50 border-amber-200 text-amber-600' : 
                                      'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                    {partner.status}
                                </span>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                    <Mail size={12} className="text-slate-400" />
                                    <span>{partner.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                    <Phone size={12} className="text-slate-400" />
                                    <span>{partner.telp}</span>
                                </div>
                            </div>

                            {/* Active Tenders */}
                            <div className="pt-2">
                                <span className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Tender Tertaut</span>
                                {partner.tenders.length > 0 ? (
                                    <div className="flex flex-wrap gap-1.5">
                                        {partner.tenders.map((t, idx) => (
                                            <span key={idx} className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <span className="text-[10px] italic text-slate-400">Belum ditautkan ke tender manapun</span>
                                )}
                            </div>
                        </div>

                        {/* Bottom Area / Progress & Action */}
                        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
                            <div className="w-1/2">
                                <div className="flex justify-between items-center text-[10px] text-slate-500 mb-1 font-bold">
                                    <span>Data Kualifikasi</span>
                                    <span>{partner.progress}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all ${partner.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                                        style={{ width: `${partner.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <button className="p-1.5 text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-lg cursor-pointer">
                                    <Edit2 size={12} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(partner.id)} 
                                    className="p-1.5 text-rose-500 hover:text-rose-700 bg-white border border-slate-200 rounded-lg cursor-pointer"
                                >
                                    <Trash2 size={12} />
                                </button>
                                <button className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-bold text-white bg-slate-900 hover:bg-black rounded-lg cursor-pointer">
                                    Akses <ArrowUpRight size={10} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        {/* Header */}
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <div className="flex items-center gap-2">
                                <Users size={18} className="text-emerald-600" />
                                <h3 className="text-sm font-bold text-slate-800">Undang Rekanan KSO Baru</h3>
                            </div>
                            <button onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer">
                                Tutup
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleInvite} className="p-5 space-y-4">
                            <div>
                                <label className={LABEL}>Nama Perusahaan / Rekanan</label>
                                <input 
                                    type="text" 
                                    placeholder="Contoh: PT. Partner Karya Sejahtera"
                                    className={INPUT_STYLE + " w-full"}
                                    value={newMitraName}
                                    onChange={e => setNewMitraName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={LABEL}>Alamat Email</label>
                                    <input 
                                        type="email" 
                                        placeholder="partner@company.co.id"
                                        className={INPUT_STYLE + " w-full"}
                                        value={newMitraEmail}
                                        onChange={e => setNewMitraEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={LABEL}>No. Telepon / WA</label>
                                    <input 
                                        type="text" 
                                        placeholder="0812..."
                                        className={INPUT_STYLE + " w-full"}
                                        value={newMitraPhone}
                                        onChange={e => setNewMitraPhone(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={LABEL}>Sub-Klasifikasi SBU Utama</label>
                                <select 
                                    className={SELECT_STYLE + " w-full"}
                                    value={newMitraSbu}
                                    onChange={e => setNewMitraSbu(e.target.value)}
                                >
                                    <option value="BG009 - Gedung">BG009 (Konstruksi Gedung Perkantoran)</option>
                                    <option value="SI001 - Jalan Raya">SI001 (Konstruksi Jalan Raya/Tol)</option>
                                    <option value="SP004 - Beton">SP004 (Pekerjaan Spesialis Struktur Beton)</option>
                                </select>
                            </div>

                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1.5">
                                <h4 className="text-[10px] font-bold text-blue-800 uppercase tracking-wider flex items-center gap-1">
                                    <Lock size={12} /> Pembatasan Hak Akses Otomatis (RBAC)
                                </h4>
                                <p className="text-[10px] text-blue-700 leading-normal">
                                    Mitra KSO yang diundang hanya diberikan wewenang khusus untuk memperbarui profil legalitas (NIB, SBU, Akta, Pajak, Alat) perusahaan mereka sendiri demi kemudahan integrasi. Mereka tidak dapat melihat workspace tender Anda yang lain.
                                </p>
                            </div>

                            <button 
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all cursor-pointer"
                            >
                                <Send size={12} /> Kirim Undangan & Buat Tautan
                            </button>
                        </form>

                        {/* Invitation Link Output */}
                        {invitationLink && (
                            <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-2.5">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tautan Undangan Terbuat</div>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        className={INPUT_STYLE + " w-full font-mono text-[10px] bg-white"} 
                                        value={invitationLink} 
                                        readOnly
                                    />
                                    <button 
                                        onClick={() => {
                                            navigator.clipboard.writeText(invitationLink);
                                            alert("Tautan berhasil disalin ke clipboard!");
                                        }}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                                    >
                                        <Copy size={12} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
