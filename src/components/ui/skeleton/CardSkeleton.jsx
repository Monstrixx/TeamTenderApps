import React from 'react';

export function CardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-pulse space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-200 rounded-lg" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-slate-200 rounded w-1/3" />
          <div className="h-3 bg-slate-200 rounded w-1/4" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-200 rounded w-full" />
        <div className="h-3 bg-slate-200 rounded w-5/6" />
      </div>
    </div>
  );
}
