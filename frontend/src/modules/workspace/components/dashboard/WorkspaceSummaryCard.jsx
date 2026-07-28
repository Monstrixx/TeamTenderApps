import React from 'react';
import { Building2, Users, MapPin } from 'lucide-react';

export default function WorkspaceSummaryCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Acme Corporation</h3>
          <p className="text-sm text-slate-500">Premium Tenant • ID: ws-mock-id</p>
        </div>
        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
          <Building2 size={24} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
        <div>
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Active Personnel</div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-slate-400" />
            <span className="font-semibold text-slate-700">124</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Headquarters</div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-slate-400" />
            <span className="font-semibold text-slate-700">Jakarta</span>
          </div>
        </div>
      </div>
    </div>
  );
}
