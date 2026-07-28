export type ManifestType = "CAPABILITY" | "TOOL" | "WORKFLOW" | "EVENT" | "POLICY";

export interface BaseManifest {
  id: string;
  version: string;
  type: ManifestType;
}

export interface CapabilityManifest extends BaseManifest {
  type: "CAPABILITY";
  domain: string;
  inputSchema: any;
  outputSchema: any;
  workflow: string;
  requiredTools: string[];
  requiredKnowledge: string[];
  requiredPolicies: string[];
}

export interface ToolManifest extends BaseManifest {
  type: "TOOL";
  permissions: string[];
  timeout: number;
  retry: number;
  healthCheck: string;
}

export interface WorkflowManifest extends BaseManifest {
  type: "WORKFLOW";
  steps: any[];
  approval: any;
  rollback: any;
  compensation: any;
  timeout: number;
}

export interface EventManifest extends BaseManifest {
  type: "EVENT";
  schema: any;
  classification: string;
  priority: string;
  retention: string;
  pii: string;
  replayable: boolean;
}

export class UnifiedManifestLoader {
  private manifests: Map<string, BaseManifest> = new Map();

  async loadFromJSON(jsonString: string): Promise<void> {
    const parsed = JSON.parse(jsonString) as BaseManifest;
    this.manifests.set(`${parsed.type}:${parsed.id}:${parsed.version}`, parsed);
  }

  getManifestsByType<T extends BaseManifest>(type: ManifestType): T[] {
    return Array.from(this.manifests.values())
      .filter((m) => m.type === type) as T[];
  }
}
