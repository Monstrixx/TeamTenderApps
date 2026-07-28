import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { workspaceService } from '../services/workspace/workspaceService';

export const WorkspaceContext = createContext({
  currentWorkspace: null,
  switchWorkspace: () => {},
  currentRole: null,
  permissions: [],
  isLoading: true,
  refreshWorkspace: () => {},
  hasPermission: () => false,
  hasRole: () => false,
  isOwner: () => false,
  isAdmin: () => false,
  isManager: () => false,
});

export const WorkspaceProvider = ({ children, initialWorkspaceId }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [workspaceId, setWorkspaceId] = useState(initialWorkspaceId);

  // Fetch workspace details and user's role in it
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['workspaceContext', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return null;
      // Depending on API, getWorkspace might return { workspace, role, permissions }
      // Assuming getWorkspace returns workspace info, and we need role separately, 
      // or the backend returns member context when fetching the workspace.
      // Let's assume getWorkspace returns the workspace and includes current user's role.
      // If not, we might need a dedicated context endpoint: `workspaceService.getContext(workspaceId)`
      // But for now, we'll try to fetch workspace.
      const workspace = await workspaceService.getWorkspace(workspaceId);
      // Let's fetch role/permissions. We can assume the backend attaches it or we have it in auth.
      // For the sake of matching the prompt, we'll assume `workspace` object has `.currentUserRole` and `.permissions`
      return workspace;
    },
    enabled: !!workspaceId,
  });

  const currentWorkspace = data || null;
  // Fallback to empty if not provided by backend directly on the workspace object
  const currentRole = data?.currentUserRole || null;
  const permissions = data?.permissions || [];

  const switchWorkspace = async (newWorkspaceId) => {
    // 1. Clear React Query caches restricted to tenant data to avoid leakage
    queryClient.removeQueries({
      predicate: (query) => {
        // Remove any queries that have the old workspaceId in their queryKey
        return query.queryKey.includes(workspaceId);
      },
    });

    // 2. Set new workspace ID
    setWorkspaceId(newWorkspaceId);
    
    // 3. Navigate to the new workspace's home
    navigate(`/workspace/${newWorkspaceId}/home`);
  };

  // Helpers
  const hasPermission = (permission) => {
    return permissions.includes(permission);
  };

  const hasRole = (roleType) => {
    if (!currentRole) return false;
    return currentRole.type === roleType || currentRole.name === roleType;
  };

  const isOwner = () => hasRole('OWNER');
  const isAdmin = () => hasRole('ADMIN');
  const isManager = () => hasRole('MANAGER');

  return (
    <WorkspaceContext.Provider value={{
      currentWorkspace,
      switchWorkspace,
      currentRole,
      permissions,
      isLoading,
      refreshWorkspace: refetch,
      hasPermission,
      hasRole,
      isOwner,
      isAdmin,
      isManager,
    }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspaceContext = () => useContext(WorkspaceContext);
