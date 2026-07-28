import { ResourceQuota, PermissionContext } from "../models/ResourceModel";
import { PluginManifestV2 } from "../models/PluginManifestV2";

export interface PluginWorkspace {
    tempStorage: Record<string, any>;
    cache: Record<string, any>;
}

export class PluginContainer {
    public readonly workspace: PluginWorkspace = { tempStorage: {}, cache: {} };

    constructor(
        public readonly manifest: PluginManifestV2,
        public readonly quota: ResourceQuota,
        public readonly permissions: PermissionContext
    ) {}

    public enforceQuota(actionType: string): boolean {
        // Validation logic for CPU, memory, artifacts, events limits
        return true;
    }
}
