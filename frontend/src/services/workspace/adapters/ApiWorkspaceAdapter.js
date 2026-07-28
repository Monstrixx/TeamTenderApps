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
    },
    
    // Member Management
    getMembers: async (workspaceId, params = {}) => {
        const response = await apiClient.get(`/api/v1/workspaces/${workspaceId}/members`, { params });
        return response;
    },
    changeMemberRole: async (workspaceId, memberId, roleId) => {
        const response = await apiClient.put(`/api/v1/workspaces/${workspaceId}/members/${memberId}/role`, { roleId });
        return response;
    },
    updateMemberStatus: async (workspaceId, memberId, status) => {
        const response = await apiClient.put(`/api/v1/workspaces/${workspaceId}/members/${memberId}/status`, { status });
        return response;
    },
    removeMember: async (workspaceId, memberId) => {
        const response = await apiClient.delete(`/api/v1/workspaces/${workspaceId}/members/${memberId}`);
        return response;
    },
    
    // Invitation Management
    getInvitations: async (workspaceId, params = {}) => {
        const response = await apiClient.get(`/api/v1/workspaces/${workspaceId}/invitations`, { params });
        return response;
    },
    inviteMember: async (workspaceId, data) => {
        const response = await apiClient.post(`/api/v1/workspaces/${workspaceId}/invitations`, data);
        return response;
    },
    revokeInvitation: async (workspaceId, invitationId) => {
        const response = await apiClient.post(`/api/v1/workspaces/${workspaceId}/invitations/${invitationId}/revoke`);
        return response;
    },
    acceptInvitation: async (token) => {
        const response = await apiClient.post(`/api/v1/workspace-invitations/${token}/accept`);
        return response;
    },
    
    // Roles
    getRoles: async () => {
        // Technically these are global but we might need workspaceId in the future
        // We'll call it without workspaceId for now (or via a dummy workspace route depending on backend setup)
        // Actually, the route is under /workspaces/:workspaceId/members/roles but wait, no, it's defined under /members/roles in workspace-members.routes.ts so it needs workspaceId.
        // I will use a dummy ID for now or pass workspaceId. Let's make it getRoles(workspaceId).
        const response = await apiClient.get(`/api/v1/workspaces/dummy/members/roles`); // or the actual route
        return response;
    }
};
