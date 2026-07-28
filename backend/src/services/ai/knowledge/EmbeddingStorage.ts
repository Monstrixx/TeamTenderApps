export interface IEmbeddingStorage {
  name: string;
  store(embedding: any[], metadata: any): Promise<string>;
  delete(referenceId: string): Promise<void>;
  query(vector: any[], limit: number): Promise<any[]>;
}

export class MockStorage implements IEmbeddingStorage {
  public name = "MockStorage";
  private storeMap = new Map<string, any>();

  async store(embedding: any[], metadata: any): Promise<string> {
    const refId = `mock-emb-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    this.storeMap.set(refId, { embedding, metadata });
    return refId;
  }

  async delete(referenceId: string): Promise<void> {
    this.storeMap.delete(referenceId);
  }

  async query(vector: any[], limit: number): Promise<any[]> {
    // Return mock results
    return Array.from(this.storeMap.entries()).slice(0, limit).map(([id, data]) => ({
      id,
      score: Math.random(),
      metadata: data.metadata
    }));
  }
}
