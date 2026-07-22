import { tokenManager } from '../auth/tokenManager';

export const attachAuthHeader = (config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};
