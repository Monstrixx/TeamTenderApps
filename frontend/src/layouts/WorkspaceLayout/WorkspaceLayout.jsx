import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { WorkspaceProvider } from '../../contexts/WorkspaceContext';
import WorkspaceSidebar from './WorkspaceSidebar';
import WorkspaceTopbar from './WorkspaceTopbar';
import WorkspaceStatusBar from './WorkspaceStatusBar';
import WorkspaceBreadcrumb from './WorkspaceBreadcrumb';
import { AppErrorBoundary, RouteErrorBoundary } from '../../components/ui/error-boundary';

export default function WorkspaceLayout() {
  const { workspaceId } = useParams();

  return (
    <AppErrorBoundary>
      <WorkspaceProvider initialWorkspaceId={workspaceId}>
        <div className="flex h-screen w-screen bg-slate-50 font-[Inter,system-ui,sans-serif] text-slate-800">
          <WorkspaceSidebar />
          
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <WorkspaceTopbar />
            
            <main className="flex-1 overflow-y-auto bg-slate-50 flex flex-col relative">
              <div className="px-8 py-4 shrink-0">
                <WorkspaceBreadcrumb />
              </div>
              
              <div className="flex-1 px-8 pb-8">
                <div className="max-w-[1440px] mx-auto w-full h-full">
                  <RouteErrorBoundary>
                    <Outlet />
                  </RouteErrorBoundary>
                </div>
              </div>
            </main>
            
            <WorkspaceStatusBar />
          </div>
        </div>
      </WorkspaceProvider>
    </AppErrorBoundary>
  );
}
