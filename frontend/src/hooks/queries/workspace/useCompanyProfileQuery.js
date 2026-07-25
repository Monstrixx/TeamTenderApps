import { useQuery } from '@tanstack/react-query';
import { workspaceService, workspaceKeys } from '../../../services/workspace';

export const useCompanyProfileQuery = (workspaceId = '12345') => {
    return useQuery({
        queryKey: workspaceKeys.company(workspaceId),
        queryFn: () => workspaceService.getCompanyProfile(workspaceId),
    });
};
