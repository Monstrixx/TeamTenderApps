import apiClient from '../../client/apiClient';

/**
 * Real API implementation for fetching workspace details.
 * Communicates with the backend and returns the raw DTO envelope.
 */
export const ApiWorkspaceAdapter = {
    getWorkspace: async (workspaceId) => {
        const response = await apiClient.get(`/api/v1/workspaces/${workspaceId}`);
        return response; // Assumes interceptor returns response.data directly
    },
    getCompanyProfile: async (workspaceId) => {
        const response = await apiClient.get(`/api/v1/workspaces/${workspaceId}/company`);
        return response;
    },
    getEquipment: async (workspaceId, params = {}) => {
        const response = await apiClient.get(`/api/v1/workspaces/${workspaceId}/equipment`, { params });
        return response;
    },
    createEquipment: async (workspaceId, data) => {
        const response = await apiClient.post(`/api/v1/workspaces/${workspaceId}/equipment`, data);
        return response;
    },
    updateEquipment: async (workspaceId, equipmentId, data) => {
        const response = await apiClient.put(`/api/v1/workspaces/${workspaceId}/equipment/${equipmentId}`, data);
        return response;
    },
    deleteEquipment: async (workspaceId, equipmentId) => {
        const response = await apiClient.delete(`/api/v1/workspaces/${workspaceId}/equipment/${equipmentId}`);
        return response;
    },
    getSuppliers: async (workspaceId, params = {}) => {
        const response = await apiClient.get(`/api/v1/workspaces/${workspaceId}/suppliers`, { params });
        return response;
    },
    getPersonnel: async (workspaceId) => {
        const response = await apiClient.get(`/api/v1/workspaces/${workspaceId}/personnel`);
        return response;
    },
    getKsoPartners: async (workspaceId) => {
        const response = await apiClient.get(`/api/v1/workspaces/${workspaceId}/kso-partners`);
        return response;
    },
    getUpah: async (workspaceId) => {
        const response = await apiClient.get(`/api/v1/workspaces/${workspaceId}/upah`);
        return response;
    },
    getBahan: async (workspaceId) => {
        const response = await apiClient.get(`/api/v1/workspaces/${workspaceId}/bahan`);
        return response;
    },
    getAlat: async (workspaceId) => {
        const response = await apiClient.get(`/api/v1/workspaces/${workspaceId}/alat`);
        return response;
    },
    getAhsp: async (workspaceId) => {
        const response = await apiClient.get(`/api/v1/workspaces/${workspaceId}/ahsp`);
        return response;
    },
    getBoq: async (workspaceId) => {
        const response = await apiClient.get(`/api/v1/workspaces/${workspaceId}/boq`);
        return response;
    },
    getDocuments: async (workspaceId) => {
        const response = await apiClient.get(`/api/v1/workspaces/${workspaceId}/documents`);
        return response;
    }
};
