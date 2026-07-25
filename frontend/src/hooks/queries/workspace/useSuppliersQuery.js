import { useQuery } from '@tanstack/react-query';
import { workspaceService, workspaceKeys } from '../../../services/workspace';

export const useSuppliersQuery = (workspaceId = '12345', params = { page: 1, pageSize: 10 }) => {
    return useQuery({
        queryKey: [...workspaceKeys.suppliers(workspaceId), params],
        queryFn: () => workspaceService.getSuppliers(workspaceId, params),
    });
};
