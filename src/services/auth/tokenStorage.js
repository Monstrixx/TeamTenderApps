import { LocalStorageProvider } from './providers/LocalStorageProvider';

/**
 * Configure the active storage provider here.
 * In the future, this can be switched to CookieProvider.
 */
const activeProvider = new LocalStorageProvider();

const ACCESS_TOKEN_KEY = 'tt_access_token';
const REFRESH_TOKEN_KEY = 'tt_refresh_token';

export const tokenStorage = {
    getAccessToken: () => activeProvider.get(ACCESS_TOKEN_KEY),
    setAccessToken: (token) => activeProvider.set(ACCESS_TOKEN_KEY, token),
    removeAccessToken: () => activeProvider.remove(ACCESS_TOKEN_KEY),
    
    getRefreshToken: () => activeProvider.get(REFRESH_TOKEN_KEY),
    setRefreshToken: (token) => activeProvider.set(REFRESH_TOKEN_KEY, token),
    removeRefreshToken: () => activeProvider.remove(REFRESH_TOKEN_KEY),

    clearAllTokens: () => {
        activeProvider.remove(ACCESS_TOKEN_KEY);
        activeProvider.remove(REFRESH_TOKEN_KEY);
    }
};
