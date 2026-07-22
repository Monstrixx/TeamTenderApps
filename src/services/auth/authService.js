import { createAuthAdapter } from './AdapterFactory';
import { mapLoginResponseDTOToModel, mapRefreshResponseDTOToModel, mapUserDTOToModel } from './authMapper';

const adapter = createAuthAdapter();

export const authService = {
    login: async (credentials) => {
        const dto = await adapter.login(credentials);
        return mapLoginResponseDTOToModel(dto);
    },

    logout: async () => {
        await adapter.logout();
    },

    refreshToken: async (refreshToken) => {
        const dto = await adapter.refreshToken(refreshToken);
        return mapRefreshResponseDTOToModel(dto);
    },

    getCurrentUser: async () => {
        const dto = await adapter.getCurrentUser();
        return mapUserDTOToModel(dto);
    }
};
