export interface ArtifactStorageAPI {
    storeArtifact(workspaceId: string, payload: any): Promise<string>; // returns artifact URI
    retrieveArtifact(workspaceId: string, artifactUri: string): Promise<any>;
}

export class PlatformArtifactStorage implements ArtifactStorageAPI {
    public async storeArtifact(workspaceId: string, payload: any): Promise<string> {
        // Platform decides storage location (e.g. S3, Local, etc.)
        return `platform-storage://${workspaceId}/${Date.now()}`;
    }

    public async retrieveArtifact(workspaceId: string, artifactUri: string): Promise<any> {
        // Retrieve artifact
        return { data: "artifact-content" };
    }
}
