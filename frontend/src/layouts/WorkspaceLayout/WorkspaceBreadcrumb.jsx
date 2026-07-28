import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { WORKSPACE_NAVIGATION } from '../../config/navigation/workspaceNavigation';

export default function WorkspaceBreadcrumb() {
  const location = useLocation();
  const { workspaceId } = useParams();
  
  // Example path: /workspace/ws-mock-id/company
  const pathParts = location.pathname.split('/').filter(p => p);
  
  // Determine module based on path
  // pathParts[0] = 'workspace', pathParts[1] = workspaceId, pathParts[2] = module
  const currentModulePath = pathParts[2];
  
  const currentModule = WORKSPACE_NAVIGATION.find(item => item.route === currentModulePath);
  const moduleName = currentModule ? currentModule.title : 'Overview';

  return (
    <nav className="flex items-center text-sm font-medium text-slate-500">
      <Link 
        to={`/workspace/${workspaceId}/home`} 
        className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
      >
        <Home size={14} />
        Workspace
      </Link>
      
      <ChevronRight size={14} className="mx-2 text-slate-300" />
      
      <span className="text-slate-800 font-semibold">{moduleName}</span>
      
      {/* If there are sub-paths, we can extend this logic */}
      {pathParts.length > 3 && (
        <>
          <ChevronRight size={14} className="mx-2 text-slate-300" />
          <span className="text-slate-600 capitalize">{pathParts[3].replace(/-/g, ' ')}</span>
        </>
      )}
    </nav>
  );
}
