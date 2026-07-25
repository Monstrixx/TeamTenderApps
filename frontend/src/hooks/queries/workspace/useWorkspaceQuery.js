import { useQuery } from '@tanstack/react-query';
import { workspaceService, workspaceKeys } from '../../../services/workspace';

export const useWorkspaceQuery = (workspaceId = '12345') => {
    return useQuery({
        queryKey: workspaceKeys.detail(workspaceId),
        queryFn: () => workspaceService.getWorkspace(workspaceId),
    });
};
