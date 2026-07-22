import { ENV } from './env';

export const FEATURES = {
    enableSentry: ENV.isProd,
    enableMockData: ENV.isDev || ENV.mockMode,
    useMockApi: true, // Use mock adapters
    mockAuth: {
        tokenLifetime: 30, // seconds
        refreshLifetime: 300 // seconds
    },
    enableAI: true,
    enableSpseSync: false, // Future wave feature
    enableRealtimeCollaboration: false, // Future wave feature
};
