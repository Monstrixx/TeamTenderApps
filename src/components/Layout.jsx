import React from 'react';
import Sidebar from './Sidebar';
import { Search, Bell } from 'lucide-react';

export default function Layout({ activeRoute, setActiveRoute, children }) {
  return (
    <div className="flex h-screen w-screen bg-slate-100 font-[Inter,system-ui,sans-serif] text-slate-800">
      <Sidebar activeRoute={activeRoute} setActiveRoute={setActiveRoute} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-8 shrink-0 z-10">
          <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-lg w-80 border border-transparent focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-sm transition-all">
            <Search size={16} className="text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Cari tender, dokumen, atau menu..." 
              className="bg-transparent border-none outline-none w-full text-sm text-slate-700 placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-700 leading-tight">Ahmad Yasir Jajili</div>
                <div className="text-[11px] text-slate-400 font-medium">Administrator</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center overflow-hidden ring-2 ring-white shadow-sm">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-100 p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
