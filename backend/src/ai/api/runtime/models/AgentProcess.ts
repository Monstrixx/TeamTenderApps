export enum AgentState {
    CREATED = "CREATED",
    INITIALIZED = "INITIALIZED",
    READY = "READY",
    PLANNING = "PLANNING",
    WAITING_APPROVAL = "WAITING_APPROVAL",
    EXECUTING = "EXECUTING",
    OBSERVING = "OBSERVING",
    REPLANNING = "REPLANNING",
    COMPLETED = "COMPLETED",
    ARCHIVED = "ARCHIVED"
}

export interface RuntimePolicy {
    maxChildAgents: number;
    maxReplanning: number;
    maxRetries: number;
    maxTokens: number;
    maxCostUsd: number;
    timeoutMs: number;
}

export interface AgentManifest {
    id: string;
    version: string;
    owner: string;
    capabilities: string[];
    permissions: string[];
    policies: RuntimePolicy;
}

export interface AgentProcess {
    processId: string;
    agentId: string;
    parentProcessId?: string;
    sessionId: string;
    goalId: string;
    workspaceId: string;
    state: AgentState;
    manifest: AgentManifest;
}
