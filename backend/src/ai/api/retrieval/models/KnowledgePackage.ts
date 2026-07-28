export enum KnowledgePackageLifecycle {
    CREATED = "CREATED",
    VALIDATED = "VALIDATED",
    PACKAGED = "PACKAGED",
    DELIVERED = "DELIVERED",
    CONSUMED = "CONSUMED",
    EXPIRED = "EXPIRED",
    ARCHIVED = "ARCHIVED"
}

export interface Fact {
    id: string;
    statement: string;
}

export interface Source {
    id: string;
    type: string;
    domain: string;
    workspace: string;
    authority: number;
    url?: string;
    document?: string;
    version: string;
    timestamp: Date;
    confidence: number;
}

export interface Evidence {
    id: string;
    content: string;
    sourceId: string;
    confidence: number;
    authority: number;
    freshness: number;
    completeness: number;
    trustScore: number;
    reputation: number;
}

export interface Relationship {
    sourceId: string;
    targetId: string;
    type: string;
}

export interface TimelineEvent {
    timestamp: Date;
    description: string;
}

export interface KnowledgePackageManifest {
    version: string;
    producer: string;
    planner: string;
    strategies: string[];
    sources: string[];
    schema: string;
    hash: string;
}

export interface KnowledgePackage {
    readonly packageId: string;
    readonly version: string;
    readonly workspaceId: string;
    readonly goalId?: string;
    readonly queryFingerprint: string;
    readonly createdAt: Date;
    readonly expiresAt: Date;
    readonly confidence: number;
    
    readonly facts: ReadonlyArray<Fact>;
    readonly evidence: ReadonlyArray<Evidence>;
    readonly relationships: ReadonlyArray<Relationship>;
    readonly sources: ReadonlyArray<Source>;
    readonly timeline: ReadonlyArray<TimelineEvent>;
    readonly metadata: Readonly<Record<string, any>>;
    
    readonly manifest: KnowledgePackageManifest;
    readonly hash: string;
    readonly lifecycle: KnowledgePackageLifecycle;
}
