import React from 'react';
import { Bell } from 'lucide-react';

export default function NotificationWidget() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-rose-500" />
          <h3 className="text-base font-bold text-slate-800">Notifications</h3>
        </div>
        <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full">2 NEW</span>
      </div>
      <div className="space-y-3">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs font-semibold text-slate-700">Document Expiring Soon</p>
          <p className="text-[11px] text-slate-500 mt-1">SIUP ends in 14 days.</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs font-semibold text-slate-700">Tender Clarification</p>
          <p className="text-[11px] text-slate-500 mt-1">New message on Proyek Tol Trans.</p>
        </div>
      </div>
    </div>
  );
}
