import React from 'react';
import { Search, Bell, Grid, ChevronDown } from 'lucide-react';
import { useWorkspaceContext } from '../../contexts/WorkspaceContext';
import { useNavigate } from 'react-router-dom';

export default function WorkspaceTopbar() {
  const { currentWorkspace, currentRole } = useWorkspaceContext();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
      
      {/* Context Switcher (Left) */}
      <div className="flex items-center">
        <button 
          onClick={() => navigate('/workspace-selector')}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
        >
          <Grid size={18} className="text-slate-500" />
          <span className="text-sm font-semibold text-slate-700">
            {currentWorkspace ? currentWorkspace.name : 'Select Workspace'}
          </span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>

      {/* Global Search (Center) */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg border border-transparent focus-within:border-indigo-400 focus-within:bg-white focus-within:shadow-sm transition-all w-full">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search across entire workspace..." 
            className="bg-transparent border-none outline-none w-full text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Profile & Notifications (Right) */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden md:block">
            <div className="text-sm font-semibold text-slate-700 leading-tight">Admin User</div>
            <div className="text-[11px] text-slate-400 font-medium">
              {currentRole ? currentRole.name : 'Loading...'}
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300">
            {/* Placeholder avatar */}
            <span className="text-slate-500 text-sm font-bold">AU</span>
          </div>
        </div>
      </div>
    </header>
  );
}
