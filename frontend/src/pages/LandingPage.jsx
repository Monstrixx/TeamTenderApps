import React from 'react';
import SEO from '../components/SEO';
import { Hammer, HardHat, Settings, ArrowRight } from 'lucide-react';

export default function LandingPage({ setActiveRoute }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col relative overflow-hidden">
      {/* SEO Injection */}
      <SEO 
        title="TeamTender - Sistem Manajemen Tender Sedang Dalam Pengembangan"
        description="TeamTender adalah sistem manajemen tender B2B terdepan untuk pelaku usaha jasa konstruksi. Kami sedang bersiap meluncurkan fitur otomatisasi, analisis AHSP, dan jejaring vendor terbaik."
      />

      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-100/50 to-transparent pointer-events-none"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-emerald-50 blur-3xl pointer-events-none"></div>
      
      {/* Header */}
      <header className="px-8 py-6 relative z-10 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-white font-black text-sm">TT</span>
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">TeamTender</span>
        </div>
        <button 
            onClick={() => setActiveRoute('dashboard')}
            className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2"
        >
          Masuk Demo <ArrowRight size={16} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 text-center max-w-4xl mx-auto w-full">
        <div className="flex justify-center gap-4 mb-8">
            <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center border border-slate-100 rotate-[-5deg]">
                <HardHat size={32} className="text-amber-500" />
            </div>
            <div className="w-16 h-16 bg-emerald-600 shadow-xl shadow-emerald-500/30 rounded-2xl flex items-center justify-center z-10 scale-110">
                <Settings size={32} className="text-white animate-[spin_4s_linear_infinite]" />
            </div>
            <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center border border-slate-100 rotate-[5deg]">
                <Hammer size={32} className="text-slate-600" />
            </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Under Construction
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Sistem Manajemen Tender <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Masa Depan</span>
        </h1>
        
        <p className="text-lg text-slate-600 mb-10 max-w-2xl leading-relaxed">
            TeamTender sedang meracik platform manajemen dokumen, penghitungan HPS (AHSP PUPR), dan jejaring KSO/Vendor tercanggih khusus untuk pelaku usaha jasa konstruksi.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input type="email" placeholder="Masukkan email untuk akses awal" className="px-5 py-3 w-full sm:w-80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800 shadow-sm" />
            <button className="px-6 py-3 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-lg">
                Beri Tahu Saya
            </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-slate-400 relative z-10">
        &copy; {new Date().getFullYear()} TeamTender. Seluruh hak cipta dilindungi.
      </footer>
    </div>
  );
}
