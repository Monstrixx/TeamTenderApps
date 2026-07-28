import React from 'react';
import { Plus, FileSignature, UploadCloud, Users } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { label: 'New Tender', icon: FileSignature, color: 'bg-blue-50 text-blue-600' },
    { label: 'Upload Doc', icon: UploadCloud, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Invite User', icon: Users, color: 'bg-purple-50 text-purple-600' },
    { label: 'Create Project', icon: Plus, color: 'bg-orange-50 text-orange-600' }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h3 className="text-base font-bold text-slate-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action, idx) => (
          <button key={idx} className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all group">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${action.color} group-hover:scale-110 transition-transform`}>
              <action.icon size={20} />
            </div>
            <span className="text-xs font-semibold text-slate-600 text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
