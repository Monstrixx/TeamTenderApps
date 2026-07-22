import React from 'react';

export function DialogSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="space-y-2">
        <div className="h-6 bg-slate-200 rounded w-1/3" />
        <div className="h-4 bg-slate-200 rounded w-2/3" />
      </div>
      <div className="h-32 bg-slate-100 rounded-lg w-full border border-slate-200" />
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <div className="h-10 w-24 bg-slate-200 rounded-lg" />
        <div className="h-10 w-24 bg-blue-200 rounded-lg" />
      </div>
    </div>
  );
}
