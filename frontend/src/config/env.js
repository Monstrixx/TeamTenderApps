export const ENV = {
    isDev: import.meta.env.MODE === 'development',
    isProd: import.meta.env.MODE === 'production',
    mode: import.meta.env.MODE,
    version: import.meta.env.VITE_APP_VERSION || '1.0.0-wave3.6',
    mockMode: import.meta.env.VITE_MOCK_API === 'true',
};
