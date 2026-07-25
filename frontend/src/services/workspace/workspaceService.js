import { getWorkspaceAdapter } from './AdapterFactory';
import { mapWorkspaceToDomain } from './workspaceMapper';
import { mapCompanyProfile } from './companyMapper';
import { mapEquipmentList, mapEquipment } from './equipmentMapper';
import { mapSupplierList } from './supplierMapper';
import {
    mapPersonnelList,
    mapKsoPartnersList,
    mapUpahList,
    mapBahanList,
    mapAlatList,
    mapAhspItems,
    mapBoqList,
    mapDocValidation
} from './extendedMappers';

export const workspaceService = {
    getWorkspace: async (workspaceId) => {
        const adapter = getWorkspaceAdapter();
        const response = await adapter.getWorkspace(workspaceId);
        return mapWorkspaceToDomain(response.data);
    },
    
    getCompanyProfile: async (workspaceId) => {
        const adapter = getWorkspaceAdapter();
        const response = await adapter.getCompanyProfile(workspaceId);
        return mapCompanyProfile(response.data);
    },
    
    getEquipment: async (workspaceId, params = {}) => {
        const adapter = getWorkspaceAdapter();
        const response = await adapter.getEquipment(workspaceId, params);
        return {
            data: mapEquipmentList(response.data),
            meta: response.meta
        };
    },
    
    createEquipment: async (workspaceId, data) => {
        const adapter = getWorkspaceAdapter();
        const response = await adapter.createEquipment(workspaceId, data);
        return mapEquipment(response.data);
    },
    
    updateEquipment: async (workspaceId, equipmentId, data) => {
        const adapter = getWorkspaceAdapter();
        const response = await adapter.updateEquipment(workspaceId, equipmentId, data);
        return mapEquipment(response.data);
    },
    
    deleteEquipment: async (workspaceId, equipmentId) => {
        const adapter = getWorkspaceAdapter();
        await adapter.deleteEquipment(workspaceId, equipmentId);
        return true;
    },
    
    getSuppliers: async (workspaceId, params = {}) => {
        const adapter = getWorkspaceAdapter();
        const response = await adapter.getSuppliers(workspaceId, params);
        return {
            data: mapSupplierList(response.data),
            meta: response.meta
        };
    },
    
    getPersonnel: async (workspaceId) => {
        const adapter = getWorkspaceAdapter();
        const response = await adapter.getPersonnel(workspaceId);
        return mapPersonnelList(response.data);
    },
    
    getKsoPartners: async (workspaceId) => {
        const adapter = getWorkspaceAdapter();
        const response = await adapter.getKsoPartners(workspaceId);
        return mapKsoPartnersList(response.data);
    },
    
    getUpah: async (workspaceId) => {
        const adapter = getWorkspaceAdapter();
        const response = await adapter.getUpah(workspaceId);
        return mapUpahList(response.data);
    },
    
    getBahan: async (workspaceId) => {
        const adapter = getWorkspaceAdapter();
        const response = await adapter.getBahan(workspaceId);
        return mapBahanList(response.data);
    },
    
    getAlat: async (workspaceId) => {
        const adapter = getWorkspaceAdapter();
        const response = await adapter.getAlat(workspaceId);
        return mapAlatList(response.data);
    },
    
    getAhsp: async (workspaceId) => {
        const adapter = getWorkspaceAdapter();
        const response = await adapter.getAhsp(workspaceId);
        return mapAhspItems(response.data);
    },
    
    getBoq: async (workspaceId) => {
        const adapter = getWorkspaceAdapter();
        const response = await adapter.getBoq(workspaceId);
        return mapBoqList(response.data);
    },
    
    getDocuments: async (workspaceId) => {
        const adapter = getWorkspaceAdapter();
        const response = await adapter.getDocuments(workspaceId);
        return mapDocValidation(response.data);
    }
};
