import React from 'react';
import { FileSignature } from 'lucide-react';

export default function TenderSummary() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <FileSignature size={18} className="text-orange-500" />
        <h3 className="text-base font-bold text-slate-800">Active Tenders</h3>
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-black text-slate-800">5</span>
        <span className="text-sm font-medium text-slate-500 mb-1">In Progress</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="text-xs text-slate-400 font-medium mb-1">Evaluating</div>
          <div className="text-lg font-bold text-slate-700">2</div>
        </div>
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="text-xs text-slate-400 font-medium mb-1">Awarded (YTD)</div>
          <div className="text-lg font-bold text-emerald-600">8</div>
        </div>
      </div>
    </div>
  );
}
