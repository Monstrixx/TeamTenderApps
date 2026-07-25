import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, tokenManager } from '../../../services/auth';

export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (credentials) => authService.login(credentials),
        onSuccess: (data) => {
            tokenManager.saveTokens(data.tokens.accessToken, data.tokens.refreshToken);
            // Pre-populate the query cache with the user data we got from login
            queryClient.setQueryData(['auth', 'currentUser'], data.user);
        }
    });
};
