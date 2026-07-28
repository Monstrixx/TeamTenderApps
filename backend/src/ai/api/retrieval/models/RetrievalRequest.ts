export interface QueryFingerprint {
    hash: string;
    normalizedQuery: string;
    workspaceId: string;
}

export interface RetrievalRequest {
    query: string;
    workspaceId: string;
    goalId?: string;
    topK?: number;
    filters?: Record<string, any>;
    preferredStrategies?: string[];
}
