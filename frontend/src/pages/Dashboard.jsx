import React, { useEffect } from 'react';
import { Building2, Folder, Archive, Star, Calendar, MoreVertical, Edit3 } from 'lucide-react';
import { dashboardStats as stats, activeTenders, agendaItems } from '../data/mock/dashboard';

export default function Dashboard({ setActiveRoute }) {
  // Prefetch Workspace on idle
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        import('./Workspace');
      });
    } else {
      setTimeout(() => import('./Workspace'), 2000);
    }
  }, []);


  return (
    <div className="w-full space-y-6">
      {/* Welcome header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Selamat datang, Ahmad Yasir 👋</h1>
          <p className="text-xs text-slate-500 mt-1">Kelola tender Anda dengan lebih cerdas bersama TeamTender.</p>
        </div>
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          <Calendar size={14} /> Rabu, 16 Juli 2026
        </div>
      </div>

      {/* Top Section: Profile Summary & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        
        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-sm font-bold text-slate-800">Profil Perusahaan</h2>
            <button className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-50 border border-slate-200 rounded transition-colors cursor-pointer">
              <Edit3 size={12} /> Edit
            </button>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 border border-slate-200/50">
              <Building2 size={24} className="text-slate-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-bold text-slate-800">PT. Maju Konstruksi</h3>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded font-bold border border-emerald-200/50">Terverifikasi</span>
              </div>
              <div className="text-xs text-slate-500 space-y-1">
                <div><strong>Kualifikasi:</strong> Konstruksi Menengah</div>
                <div className="truncate"><strong>NPWP:</strong> 01.234.567.8-012.000</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border-2 border-blue-500 flex items-center justify-center font-bold text-xs text-blue-700 bg-blue-50 shrink-0">
              92%
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold text-slate-700 leading-tight">Kelengkapan Legalitas</div>
              <div className="text-[10px] text-slate-400 mt-0.5 truncate">12 / 13 Dokumen Terunggah</div>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer shrink-0">Detail</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div 
              key={idx} 
              onClick={() => s.route && setActiveRoute(s.route)}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between cursor-pointer hover:border-slate-400 hover:shadow-md transition-all"
            >
              <div className={`w-9 h-9 ${s.bg} rounded-lg flex items-center justify-center mb-3 border border-slate-200/20`}>
                <s.icon size={18} className={s.color} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400">{s.label}</div>
                <div className="text-2xl font-black text-slate-800 my-1">{s.value}</div>
                <div className="text-[10px] font-medium text-slate-500">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Main Grid: Active Tenders & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Tenders Table Card */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Tender Aktif</h2>
              <p className="text-xs text-slate-400 mt-0.5">Daftar tender yang sedang dalam proses pengerjaan dokumen.</p>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer">Lihat Semua &rarr;</button>
          </div>
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Paket Pekerjaan</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Batas Akhir</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Kesiapan</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {activeTenders.map((t, idx) => (
                  <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 max-w-[200px]">
                      <div className="font-semibold text-slate-800 truncate mb-0.5">{t.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{t.agency}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-semibold text-slate-700">{t.deadline}</div>
                      <div className="text-[10px] text-rose-500 font-medium">{t.remaining}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${t.color}`} style={{ width: `${t.progress}%` }}></div>
                        </div>
                        <span className="font-bold text-slate-700">{t.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="inline-flex items-center justify-center p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors cursor-pointer">
                        <MoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline / Calendar Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-bold text-slate-800">Agenda Terdekat</h2>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer">Kalender</button>
          </div>
          
          <div className="flex-1 space-y-4">
            {agendaItems.map((item, idx) => (
              <div key={idx} className="flex gap-3 relative pl-4 after:content-[''] after:absolute after:left-1.5 after:top-2 after:bottom-[-20px] after:w-0.5 after:bg-slate-100 last:after:hidden">
                <div className="absolute left-0.5 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-blue-500 bg-white z-10"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-0.5">
                    <span>{item.date}</span>
                    <span className="text-blue-600">{item.time}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-700 leading-snug">{item.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 truncate">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
