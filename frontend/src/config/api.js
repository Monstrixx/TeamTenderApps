import { ENV } from './env';

const getBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    return ENV.isDev ? 'http://localhost:8080/api/v1' : 'https://api.teamtender.id/v1';
};

export const API_CONFIG = {
    baseUrl: getBaseUrl(),
    timeout: 30000,
    endpoints: {
        auth: {
            login: '/auth/login',
            logout: '/auth/logout',
            refresh: '/auth/refresh',
        },
        tenders: {
            list: '/tenders',
            detail: (id) => `/tenders/${id}`,
            create: '/tenders',
            update: (id) => `/tenders/${id}`,
        },
        workspace: {
            summary: (tenderId) => `/workspace/${tenderId}/summary`,
            documents: (tenderId) => `/workspace/${tenderId}/documents`,
            validate: (tenderId) => `/workspace/${tenderId}/validate`,
        },
        ai: {
            scan: '/ai/scan',
            extract: '/ai/extract',
            generate: '/ai/generate',
        }
    }
};
