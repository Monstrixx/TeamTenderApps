import { useQuery } from '@tanstack/react-query';
import { workspaceService, workspaceKeys } from '../../../services/workspace';

export const usePersonnelQuery = (workspaceId = '12345') => {
    return useQuery({
        queryKey: workspaceKeys.personnel(workspaceId),
        queryFn: () => workspaceService.getPersonnel(workspaceId),
    });
};

export const useKsoPartnersQuery = (workspaceId = '12345') => {
    return useQuery({
        queryKey: workspaceKeys.ksoPartners(workspaceId),
        queryFn: () => workspaceService.getKsoPartners(workspaceId),
    });
};

export const useUpahQuery = (workspaceId = '12345') => {
    return useQuery({
        queryKey: workspaceKeys.upah(workspaceId),
        queryFn: () => workspaceService.getUpah(workspaceId),
    });
};

export const useBahanQuery = (workspaceId = '12345') => {
    return useQuery({
        queryKey: workspaceKeys.bahan(workspaceId),
        queryFn: () => workspaceService.getBahan(workspaceId),
    });
};

export const useAlatQuery = (workspaceId = '12345') => {
    return useQuery({
        queryKey: workspaceKeys.alat(workspaceId),
        queryFn: () => workspaceService.getAlat(workspaceId),
    });
};

export const useAhspQuery = (workspaceId = '12345') => {
    return useQuery({
        queryKey: workspaceKeys.ahsp(workspaceId),
        queryFn: () => workspaceService.getAhsp(workspaceId),
    });
};

export const useBoqQuery = (workspaceId = '12345') => {
    return useQuery({
        queryKey: workspaceKeys.boq(workspaceId),
        queryFn: () => workspaceService.getBoq(workspaceId),
    });
};
