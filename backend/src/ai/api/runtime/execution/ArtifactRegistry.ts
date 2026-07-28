export interface ArtifactRecord {
    artifactId: string;
    workspaceId: string;
    sessionId: string;
    type: string;
    uri: string;
    createdAt: Date;
}

export class ArtifactRegistry {
    private metadataStore: Map<string, ArtifactRecord> = new Map();

    public register(record: ArtifactRecord): void {
        this.metadataStore.set(record.artifactId, record);
    }
}

export class ArtifactStorage {
    // Abstraction for physical blob storage
    public async save(workspaceId: string, content: Buffer | string): Promise<string> {
        return `s3://${workspaceId}/artifacts/${Date.now()}.bin`;
    }
}
