import React from 'react';

export default function ProfilPerusahaanLayout({ skpCount, sidebar, content, aiScannerDialog }) {
    return (
        <div className="w-full" style={{ height: 'calc(100vh - 130px)' }}>
            {/* Page header */}
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Profil Perusahaan</h1>
                    <p className="text-sm text-slate-500 mt-1">Lengkapi data kualifikasi dan legalitas untuk validasi otomatis dokumen penawaran.</p>
                </div>
                {/* SKP Indicator */}
                <div className="bg-slate-50 rounded-lg border border-slate-200 px-4 py-2 text-right shrink-0">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Perhitungan SKP Aktif</div>
                    <div className="text-lg font-black text-slate-800">{skpCount} <span className="text-xs font-semibold text-slate-500">Paket Tersisa</span></div>
                </div>
            </div>

            <div className="flex gap-6" style={{ height: 'calc(100% - 60px)' }}>
                {sidebar}
                {content}
            </div>

            {aiScannerDialog}
        </div>
    );
}
