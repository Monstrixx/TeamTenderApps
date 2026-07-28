import React from 'react';

export default function ModulePlaceholder({ title, description, status = 'Coming Soon', icon: Icon }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-white border border-slate-200 rounded-2xl shadow-sm">
      {Icon && (
        <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
          <Icon size={32} />
        </div>
      )}
      <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="text-slate-500 mb-6 max-w-md">
        {description}
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 font-medium text-sm border border-slate-200">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
        {status}
      </div>
    </div>
  );
}
