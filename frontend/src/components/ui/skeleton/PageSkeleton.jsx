import React from 'react';

export function PageSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      <div className="h-24 bg-slate-200 rounded-xl w-full" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-64 bg-slate-200 rounded-xl" />
        <div className="h-64 bg-slate-200 rounded-xl" />
        <div className="h-64 bg-slate-200 rounded-xl" />
      </div>
      <div className="h-96 bg-slate-200 rounded-xl w-full" />
    </div>
  );
}
