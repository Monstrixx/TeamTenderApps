import { useMutation, useQueryClient } from '@tanstack/react-query';
import { workspaceService, workspaceKeys } from '../../../services/workspace';

export const useEquipmentMutations = (workspaceId = '12345') => {
    const queryClient = useQueryClient();

    const addEquipment = useMutation({
        mutationFn: (data) => workspaceService.createEquipment(workspaceId, data),
        // No optimistic update for add since we don't have the ID yet, just invalidate
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.equipment(workspaceId) });
        }
    });

    const updateEquipment = useMutation({
        mutationFn: ({ id, data }) => workspaceService.updateEquipment(workspaceId, id, data),
        onMutate: async ({ id, data }) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: workspaceKeys.equipment(workspaceId) });

            // Snapshot the previous value
            const previousEquipment = queryClient.getQueryData(workspaceKeys.equipment(workspaceId));

            // Optimistically update to the new value (assuming standard page layout for now, we'll update all pages or we could just invalidate if it's too complex. For now, since it's a simple array without complex pagination in cache yet, we'll try to find and replace).
            // Note: Since we are using an envelope { data: [...], meta: {...} }, we need to handle that.
            queryClient.setQueryData(workspaceKeys.equipment(workspaceId), (old) => {
                if (!old || !old.data) return old;
                return {
                    ...old,
                    data: old.data.map(eq => String(eq.id) === String(id) ? { ...eq, ...data } : eq)
                };
            });

            // Return a context object with the snapshotted value
            return { previousEquipment };
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, newEquipment, context) => {
            if (context?.previousEquipment) {
                queryClient.setQueryData(workspaceKeys.equipment(workspaceId), context.previousEquipment);
            }
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.equipment(workspaceId) });
        },
    });

    const deleteEquipment = useMutation({
        mutationFn: (id) => workspaceService.deleteEquipment(workspaceId, id),
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: workspaceKeys.equipment(workspaceId) });
            const previousEquipment = queryClient.getQueryData(workspaceKeys.equipment(workspaceId));
            queryClient.setQueryData(workspaceKeys.equipment(workspaceId), (old) => {
                if (!old || !old.data) return old;
                return {
                    ...old,
                    data: old.data.filter(eq => String(eq.id) !== String(id))
                };
            });
            return { previousEquipment };
        },
        onError: (err, id, context) => {
            if (context?.previousEquipment) {
                queryClient.setQueryData(workspaceKeys.equipment(workspaceId), context.previousEquipment);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: workspaceKeys.equipment(workspaceId) });
        }
    });

    return {
        addEquipment,
        updateEquipment,
        deleteEquipment
    };
};
