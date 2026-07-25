import { useQuery } from '@tanstack/react-query';
import { workspaceService, workspaceKeys } from '../../../services/workspace';

export const useDocumentsQuery = (workspaceId = '12345') => {
    return useQuery({
        queryKey: workspaceKeys.documents(workspaceId),
        queryFn: () => workspaceService.getDocuments(workspaceId),
    });
};
