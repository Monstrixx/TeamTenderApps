import React from 'react';
import { useWorkspaceContext } from '../../contexts/WorkspaceContext';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

export default function WorkspaceStatusBar() {
  const { currentWorkspace, isLoading } = useWorkspaceContext();

  return (
    <footer className="h-8 bg-slate-900 flex items-center justify-between px-6 shrink-0 text-[11px] text-slate-400 font-medium">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <Activity size={12} /> System Online
        </span>
        <span className="flex items-center gap-1.5 border-l border-slate-700 pl-4">
          <ShieldCheck size={12} /> {isLoading ? 'Loading...' : currentWorkspace?.name || 'No Workspace'}
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-indigo-400">
          <Zap size={12} /> AI Extraction: Idle
        </span>
        <span className="border-l border-slate-700 pl-4">v1.0.0-w6</span>
      </div>
    </footer>
  );
}
