import { Home, Building2, PlusCircle, Activity, Settings, HelpCircle, Users, Archive, FileText } from 'lucide-react';

export default function Sidebar({ activeRoute, setActiveRoute }) {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'profil', icon: Building2, label: 'Profil Perusahaan' },
    { id: 'direktori-relasi', icon: Users, label: 'Vendor Hub' },
    { id: 'surat', icon: FileText, label: 'Surat Menyurat' },
  ];

  const tenderItems = [
    { id: 'tender-baru', icon: PlusCircle, label: 'Tender Baru' },
    { id: 'tender-aktif', icon: Activity, label: 'Tender Aktif' },
    { id: 'tender-arsip', icon: Archive, label: 'Tender Arsip' },
  ];

  const NavItem = ({ item }) => {
    const isActive = activeRoute === item.id;
    return (
      <button
        onClick={() => setActiveRoute(item.id)}
        className={`group flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer
          ${isActive 
            ? 'bg-white/10 text-white shadow-sm' 
            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
      >
        <item.icon size={18} className={`shrink-0 transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-400'}`} />
        <span>{item.label}</span>
        {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"></div>}
      </button>
    );
  };

  return (
    <aside className="w-[260px] bg-slate-900 flex flex-col shrink-0 border-r border-slate-800">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-800">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <span className="text-white font-black text-sm">TT</span>
        </div>
        <div>
          <div className="text-white font-bold text-sm tracking-tight">TeamTender</div>
          <div className="text-slate-500 text-[10px] font-medium">Tender Management System</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600">
          Menu Utama
        </div>
        {menuItems.map(item => <NavItem key={item.id} item={item} />)}

        <div className="px-3 mt-6 mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-600">
          Manajemen Tender
        </div>
        {tenderItems.map(item => <NavItem key={item.id} item={item} />)}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-slate-800 space-y-1">
        <button className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-[13px] font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all">
          <Settings size={18} className="text-slate-500" /> Pengaturan
        </button>
        <button className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-[13px] font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all">
          <HelpCircle size={18} className="text-slate-500" /> Bantuan
        </button>
      </div>
    </aside>
  );
}
