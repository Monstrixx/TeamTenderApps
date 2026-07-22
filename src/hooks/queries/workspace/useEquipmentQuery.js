import { useQuery } from '@tanstack/react-query';
import { workspaceService, workspaceKeys } from '../../../services/workspace';

export const useEquipmentQuery = (workspaceId = '12345', params = { page: 1, pageSize: 10 }) => {
    return useQuery({
        // Include params in queryKey if we want to cache per page, but for simple mock we might just use the base key
        queryKey: [...workspaceKeys.equipment(workspaceId), params],
        queryFn: () => workspaceService.getEquipment(workspaceId, params),
    });
};
