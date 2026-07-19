import React from 'react';
import { Award, Calendar, MapPin, Tag, Plus, LayoutGrid } from 'lucide-react';

export default function TenderAktif({ setActiveRoute }) {
  const tenders = [
    {
      id: 1,
      name: 'Hibah Barang Pembangunan Gedung PGRI Rembang',
      deadline: 'H-12 Upload',
      deadlineColor: 'bg-rose-50 text-rose-700 border-rose-200/50',
      hps: 'Rp 2.889.720.000',
      location: 'Kab. Rembang, Jawa Tengah',
      schedule: '150 Hari Kalender',
      progress: 10,
      progressColor: 'bg-blue-600',
      desc: 'Workspace baru saja dibuat.'
    },
    {
      id: 2,
      name: 'Pembangunan Jaringan Irigasi D.I. Kedung Uling',
      deadline: 'H-2 Upload',
      deadlineColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
      hps: 'Rp 4.250.000.000',
      location: 'Kab. Grobogan, Jawa Tengah',
      schedule: '120 Hari Kalender',
      progress: 85,
      progressColor: 'bg-emerald-500',
      desc: 'Menunggu tanda tangan direksi.'
    }
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Daftar Tender Aktif</h1>
          <p className="text-xs text-slate-500 mt-1">Pantau kemajuan kelengkapan dokumen dan masuk ke Workspace untuk kolaborasi.</p>
        </div>
        <button 
          onClick={() => setActiveRoute('tender-baru')}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-sm cursor-pointer"
        >
          <Plus size={15} /> Tambah Tender Baru
        </button>
      </div>

      <div className="space-y-4">
        {tenders.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row items-stretch justify-between gap-6 hover:shadow-md hover:border-slate-300 transition-all">
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-base font-bold text-slate-800 leading-snug">{t.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${t.deadlineColor}`}>
                    {t.deadline}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                  <Tag size={14} className="text-slate-400 shrink-0" />
                  <span>HPS: {t.hps}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                  <MapPin size={14} className="text-slate-400 shrink-0" />
                  <span>{t.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold col-span-2 md:col-span-1">
                  <Calendar size={14} className="text-slate-400 shrink-0" />
                  <span>Jadwal: {t.schedule}</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-64 flex flex-col justify-center gap-3 pl-0 md:pl-6 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 shrink-0">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                  <span>Kelengkapan Berkas</span>
                  <span className="text-blue-600">{t.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${t.progressColor} rounded-full`} style={{ width: `${t.progress}%` }}></div>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{t.desc}</div>
              </div>
              <button 
                onClick={() => setActiveRoute('workspace')} 
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 border border-blue-200 hover:border-blue-600 rounded-lg transition-all cursor-pointer"
              >
                <LayoutGrid size={14} /> Buka Workspace
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
