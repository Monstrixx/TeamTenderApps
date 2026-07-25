import { useQuery } from '@tanstack/react-query';
import { authService, tokenManager } from '../../../services/auth';

export const useCurrentUserQuery = (options = {}) => {
    return useQuery({
        queryKey: ['auth', 'currentUser'],
        queryFn: () => authService.getCurrentUser(),
        // Only fetch if we have an access token
        enabled: tokenManager.isAuthenticated(),
        // Retry policy can be tweaked, but usually for me endpoint we retry once
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
        ...options
    });
};
