import { attachAuthHeader } from './authHeader';
import { mapAxiosError } from './errorMapper';
import { applyRetryPolicy } from './retryPolicy';
import { handleTokenRefresh } from '../auth/refreshManager';
import { SessionExpiredError } from '../../shared/errors/AppErrors';

export const setupInterceptors = (axiosInstance) => {
    // Request Interceptor
    axiosInstance.interceptors.request.use(
        (config) => {
            return attachAuthHeader(config);
        },
        (error) => Promise.reject(mapAxiosError(error))
    );

    // Response Interceptor
    axiosInstance.interceptors.response.use(
        (response) => {
            // Can extract metadata here if needed, but usually we just return data
            return response.data;
        },
        async (error) => {
            const originalRequest = error.config;

            // Handle token refresh on 401
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const newAccessToken = await handleTokenRefresh();
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(new SessionExpiredError());
                }
            }
            
            // Apply retry policy for network issues or 5xx if configured
            if (error.config?.retry && error.response?.status >= 500) {
                try {
                    return await applyRetryPolicy(error, axiosInstance);
                } catch (retryError) {
                    return Promise.reject(mapAxiosError(retryError));
                }
            }

            // Always map Axios error to standard AppError before rejecting to UI
            return Promise.reject(mapAxiosError(error));
        }
    );
};
