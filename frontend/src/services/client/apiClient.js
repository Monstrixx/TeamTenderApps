import axios from 'axios';
import { setupInterceptors } from './interceptors';
import { API_CONFIG } from '../../config';

const apiClient = axios.create({
    baseURL: API_CONFIG.baseUrl,
    timeout: API_CONFIG.timeout || 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Apply interceptors
setupInterceptors(apiClient);

export default apiClient;
