import React from 'react';
import { Briefcase } from 'lucide-react';

export default function ProjectSummary() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase size={18} className="text-indigo-500" />
        <h3 className="text-base font-bold text-slate-800">Projects Summary</h3>
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-black text-slate-800">12</span>
        <span className="text-sm font-medium text-slate-500 mb-1">Active Projects</span>
      </div>
      <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden flex">
        <div className="bg-emerald-500 w-[60%] h-full"></div>
        <div className="bg-amber-400 w-[30%] h-full"></div>
        <div className="bg-rose-400 w-[10%] h-full"></div>
      </div>
      <div className="flex justify-between mt-2 text-xs font-medium text-slate-500">
        <span>60% On Track</span>
        <span>30% At Risk</span>
      </div>
    </div>
  );
}
