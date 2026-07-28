import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Menu, ChevronLeft } from 'lucide-react';
import { WORKSPACE_NAVIGATION } from '../../config/navigation/workspaceNavigation';
import { useWorkspaceContext } from '../../contexts/WorkspaceContext';

export default function WorkspaceSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { workspaceId } = useParams();
  const { currentWorkspace, isLoading } = useWorkspaceContext();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigateTo = (route) => {
    navigate(`/workspace/${workspaceId}/${route}`);
  };

  const NavItem = ({ item }) => {
    // Check if current path includes the route
    const isActive = location.pathname.includes(`/workspace/${workspaceId}/${item.route}`);
    
    return (
      <button
        onClick={() => navigateTo(item.route)}
        className={`group flex items-center w-full rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
          ${isCollapsed ? 'justify-center p-2.5' : 'gap-3 px-4 py-2.5'}
          ${isActive 
            ? 'bg-indigo-50 text-indigo-700 font-semibold' 
            : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
        title={isCollapsed ? item.title : ''}
      >
        <item.icon size={18} className={`shrink-0 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
        {!isCollapsed && <span>{item.title}</span>}
      </button>
    );
  };

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-[260px]'} bg-white flex flex-col shrink-0 border-r border-slate-200 transition-all duration-300 relative z-20`}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
        {!isCollapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
              <span className="text-white font-black text-xs">TT</span>
            </div>
            <div className="truncate">
              <div className="text-slate-800 font-bold text-sm truncate">TeamTender</div>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 mx-auto rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
            <span className="text-white font-black text-xs">TT</span>
          </div>
        )}
      </div>

      {/* Workspace Context Info (only when expanded) */}
      {!isCollapsed && (
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Active Tenant
          </div>
          <div className="font-semibold text-slate-700 truncate">
            {isLoading ? 'Loading...' : currentWorkspace?.name || 'Unknown Workspace'}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {!isCollapsed && (
          <div className="px-3 mb-2 mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Modules
          </div>
        )}
        {WORKSPACE_NAVIGATION.map(item => <NavItem key={item.id} item={item} />)}
      </nav>

      {/* Footer Collapse Toggle */}
      <div className="p-3 border-t border-slate-100">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex items-center w-full rounded-lg text-sm text-slate-500 hover:bg-slate-100 p-2.5 transition-colors
            ${isCollapsed ? 'justify-center' : 'justify-start gap-3'}`}
        >
          <Menu size={18} />
          {!isCollapsed && <span>Tutup Panel</span>}
        </button>
      </div>
    </aside>
  );
}
