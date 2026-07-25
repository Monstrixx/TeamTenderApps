import { tokenManager } from './tokenManager';
import { authService } from './authService';

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (err, token) => {
    refreshSubscribers.forEach((cb) => cb(err, token));
    refreshSubscribers = [];
};

/**
 * Handles concurrent refresh requests. 
 * If multiple requests hit 401 at the same time, only one refresh API call is made.
 * The others are queued and resolved when the refresh completes.
 * 
 * @returns {Promise<string>} The new access token
 */
export const handleTokenRefresh = () => {
    return new Promise((resolve, reject) => {
        const refreshToken = tokenManager.getRefreshToken();
        
        if (!refreshToken) {
            reject(new Error('No refresh token available'));
            return;
        }

        subscribeTokenRefresh((err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });

        if (!isRefreshing) {
            isRefreshing = true;
            
            // Call authService.refreshToken (which calls adapter)
            authService.refreshToken(refreshToken)
                .then((response) => {
                    isRefreshing = false;
                    tokenManager.saveTokens(response.accessToken, response.refreshToken);
                    onRefreshed(null, response.accessToken);
                })
                .catch((error) => {
                    isRefreshing = false;
                    tokenManager.clearTokens();
                    // Let the app state clear out via event listener or AuthContext handling
                    window.dispatchEvent(new Event('auth:logout'));
                    onRefreshed(error, null);
                });
        }
    });
};
