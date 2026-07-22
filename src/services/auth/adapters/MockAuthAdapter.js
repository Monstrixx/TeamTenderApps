import { FEATURES } from '../../../config/features';

let mockTokenExpiration = null;
let mockRefreshExpiration = null;

const createMockUser = () => ({
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    role: 'ADMIN',
    first_name: 'Test',
    last_name: 'User'
});

const generateToken = (type) => `mock_${type}_token_${Math.random().toString(36).substr(2)}`;

const setExpirations = () => {
    const now = Date.now();
    const tokenLifetime = FEATURES.mockAuth?.tokenLifetime || 30;
    const refreshLifetime = FEATURES.mockAuth?.refreshLifetime || 300;
    
    mockTokenExpiration = now + tokenLifetime * 1000;
    mockRefreshExpiration = now + refreshLifetime * 1000;
};

export const MockAuthAdapter = {
    login: async (credentials) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (credentials.username === 'admin' && credentials.password === 'password') {
                    setExpirations();
                    resolve({
                        access_token: generateToken('access'),
                        refresh_token: generateToken('refresh'),
                        user: createMockUser()
                    });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 500);
        });
    },

    logout: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                mockTokenExpiration = null;
                mockRefreshExpiration = null;
                resolve(true);
            }, 200);
        });
    },

    refreshToken: async (refreshToken) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const now = Date.now();
                if (!mockRefreshExpiration || now > mockRefreshExpiration) {
                    reject(new Error('Refresh token expired'));
                    return;
                }
                setExpirations();
                resolve({
                    access_token: generateToken('access'),
                    refresh_token: generateToken('refresh')
                });
            }, 500);
        });
    },

    getCurrentUser: async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const now = Date.now();
                if (!mockTokenExpiration || now > mockTokenExpiration) {
                    const error = new Error('Token expired');
                    error.status = 401; // Mock 401 response
                    reject(error);
                    return;
                }
                resolve(createMockUser());
            }, 300);
        });
    }
};
