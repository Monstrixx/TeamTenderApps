export interface ResourceQuota {
    maxMemoryMb: number;
    maxCpuTimeMs: number;
    maxAiTokens: number;
    maxArtifacts: number;
    maxEvents: number;
    maxChildAgents: number;
}

export interface PermissionContext {
    rbacRoles: string[];
    abacAttributes: Record<string, string>;
    capabilityPolicy: string[]; // Conditions under which plugin can run
}
