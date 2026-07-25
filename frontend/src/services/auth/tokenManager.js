import { tokenStorage } from './tokenStorage';

export const tokenManager = {
    getAccessToken: () => tokenStorage.getAccessToken(),
    getRefreshToken: () => tokenStorage.getRefreshToken(),
    
    saveTokens: (access, refresh) => {
        if (access) tokenStorage.setAccessToken(access);
        if (refresh) tokenStorage.setRefreshToken(refresh);
    },

    clearTokens: () => {
        tokenStorage.clearAllTokens();
    },

    isAuthenticated: () => {
        return !!tokenStorage.getAccessToken();
    }
};
