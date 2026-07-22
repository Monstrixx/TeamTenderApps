import axios from 'axios';

// Basic retry mechanism for specific failed requests (optional, as React Query handles GET retries)
export const applyRetryPolicy = async (error, axiosInstance, maxRetries = 2) => {
    const config = error.config;
    if (!config || !config.retry) {
        return Promise.reject(error);
    }
    
    config.__retryCount = config.__retryCount || 0;
    
    if (config.__retryCount >= maxRetries) {
        return Promise.reject(error);
    }
    
    config.__retryCount += 1;
    
    // Create new promise to handle exponential backoff
    const backoff = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, config.__retryCount * 1000);
    });
    
    await backoff;
    return axiosInstance(config);
};
