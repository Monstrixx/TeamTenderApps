import React from 'react';
import { 
    LayoutTemplate, Building2, FileSignature, Award, UserCheck, Network, 
    Users2, Truck, Briefcase, FileDigit, ShieldCheck 
} from 'lucide-react';

const navItems = [
    { id: 'tab-company', icon: LayoutTemplate, label: 'Company Profile', complete: true },
    { id: 'tab-identitas', icon: Building2, label: 'Identitas Penyedia', complete: true },
    { id: 'tab-akta', icon: FileSignature, label: 'Akta Pendirian', complete: true },
    { id: 'tab-izin', icon: Award, label: 'Izin Usaha', complete: true },
    { id: 'tab-direksi', icon: UserCheck, label: 'Direksi & Pemilik', complete: true },
    { id: 'tab-pajak', icon: FileDigit, label: 'Pajak & KSWP', complete: true },
    { id: 'tab-pengurus', icon: Network, label: 'Pengurus Perusahaan', complete: true },
    { id: 'tab-tenaga', icon: Users2, label: 'Tenaga Ahli', complete: true },
    { id: 'tab-peralatan', icon: Truck, label: 'Peralatan', complete: true },
    { id: 'tab-pengalaman', icon: Briefcase, label: 'Pengalaman', complete: true },
    { id: 'tab-sertifikat', icon: ShieldCheck, label: 'Sertifikat', complete: true },
];

export default function ProfileSidebar({ activeTab, onSwitchTab }) {
    return (
        <div className="w-64 shrink-0 space-y-4 overflow-y-auto pr-2">
            {/* Completion Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="text-sm font-bold text-slate-800 mb-3">Data Perusahaan</div>
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-500">Kelengkapan Berkas</span>
                    <span className="text-blue-600">100%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all" style={{ width: '100%' }}></div>
                </div>
            </div>

            {/* Nav Items */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                {navItems.map((item, idx) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button 
                            key={item.id}
                            onClick={() => onSwitchTab(item.id)}
                            className={`flex items-center gap-3 w-full px-4 py-3 text-left text-[13px] font-medium transition-all cursor-pointer border-l-[3px]
                                ${idx !== navItems.length - 1 ? 'border-b border-b-slate-100' : ''}
                                ${isActive 
                                    ? 'bg-blue-50 border-l-blue-600 text-blue-700 font-semibold' 
                                    : 'border-l-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-800'}`}
                        >
                            <item.icon size={16} className={`shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                            <span className="flex-1 truncate">{item.label}</span>
                            <div className={`w-2 h-2 rounded-full shrink-0 ${item.complete ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
