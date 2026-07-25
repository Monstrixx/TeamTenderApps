import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, tokenManager } from '../../../services/auth';

export const useLogoutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => authService.logout(),
        onSettled: () => {
            tokenManager.clearTokens();
            queryClient.clear(); // Clear all cached data on logout
            window.dispatchEvent(new Event('auth:logout'));
        }
    });
};
