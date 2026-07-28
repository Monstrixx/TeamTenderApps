import { KnowledgeSnapshot } from "./CompanyProfileAdapter";

export class CompanyTrustAdapter {
    public extractTrustSnapshot(trustData: any): KnowledgeSnapshot {
        return {
            projectionVersion: "1.0.0",
            snapshotVersion: "1.0.0",
            generatedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 86400000).toISOString(),
            nodes: [
                { id: `trust_${trustData.id || 'default'}`, label: "TrustScore", properties: trustData }
            ],
            relationships: [],
            embeddingReference: `emb_trust_${trustData.id || 'default'}`
        };
    }
}
