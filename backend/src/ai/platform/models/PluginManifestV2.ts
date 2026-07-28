export interface SignatureValidation {
    publisher: string;
    signature: string;
    checksum: string;
    buildHash: string;
}

export interface PluginManifestV2 {
    id: string;
    version: string;
    type: string; // Domain, Capability, Tool, Workflow, Knowledge, Integration, UI
    owner: string;
    description: string;
    capabilities: string[]; // references capability ids
    workflows: string[];
    permissions: string[];
    policies: string[];
    dependencies: Record<string, string>; // pluginId -> version range
    telemetry: string[];
    compatibility: Record<string, string>; // engine -> version requirement
    signature: SignatureValidation;
}
