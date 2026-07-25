import React from 'react';

export function SectionSkeleton() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/4" />
      <div className="h-32 bg-slate-200 rounded-lg w-full" />
      <div className="h-64 bg-slate-200 rounded-lg w-full" />
    </div>
  );
}
