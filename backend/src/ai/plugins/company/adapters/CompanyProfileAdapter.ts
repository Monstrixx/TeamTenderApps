export interface KnowledgeProjectionNode {
    id: string;
    label: string;
    properties: Record<string, any>;
}

export interface KnowledgeProjectionRelationship {
    sourceId: string;
    targetId: string;
    relationType: string;
}

export interface KnowledgeSnapshot {
    projectionVersion: string;
    snapshotVersion: string;
    generatedAt: string;
    expiresAt: string;
    nodes: KnowledgeProjectionNode[];
    relationships: KnowledgeProjectionRelationship[];
    embeddingReference: string;
}

export class CompanyProfileAdapter {
    public extractKnowledgeSnapshot(companyData: any): KnowledgeSnapshot {
        return {
            projectionVersion: "1.0.0",
            snapshotVersion: "1.0.0",
            generatedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 86400000).toISOString(),
            nodes: [
                { id: `company_${companyData.id || 'default'}`, label: "Company", properties: companyData }
            ],
            relationships: [],
            embeddingReference: `emb_company_${companyData.id || 'default'}`
        };
    }
}
