export interface IVectorStore {
    upsert(workspaceId: string, vectors: any[]): Promise<void>;
    similaritySearch(workspaceId: string, query: string, topK: number): Promise<any[]>;
}

export interface IGraphStore {
    queryGraph(workspaceId: string, cypher: string): Promise<any>;
}

export interface IKeywordStore {
    search(workspaceId: string, text: string): Promise<any[]>;
}
