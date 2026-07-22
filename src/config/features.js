import { ENV } from './env';

export const FEATURES = {
    enableSentry: ENV.isProd,
    enableMockData: ENV.isDev || ENV.mockMode,
    enableAI: true,
    enableSpseSync: false, // Future wave feature
    enableRealtimeCollaboration: false, // Future wave feature
};
