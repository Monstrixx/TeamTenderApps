import { RetrievalPipeline } from "../../../api/retrieval/pipeline/Pipeline";
import { RetrievalRequest } from "../../../api/retrieval/models/RetrievalRequest";
import { KnowledgePackage } from "../../../api/retrieval/models/KnowledgePackage";
import { Evidence } from "../models/TenderModels";

// ── Lock 30: Knowledge Package Versioning ─────────────────────────────────────
export interface TenderKnowledgePackage {
    packageId: string;
    packageVersion: string;
    knowledgeFingerprint: string;
    evidenceSet: Evidence[];
    freshness: { retrievedAt: string; expiresAt: string; staleness: "FRESH" | "AGING" | "STALE" };
    confidence: number;
    sources: string[];
    rawPackage: KnowledgePackage;
}

// ── TenderKnowledgeSource — integrates RetrievalPipeline ─────────────────────
export class TenderKnowledgeSource {
    private pipeline: RetrievalPipeline;

    constructor(pipeline?: RetrievalPipeline) {
        this.pipeline = pipeline ?? new RetrievalPipeline();
    }

    // ── Evidence-First Query (Lock 39) ────────────────────────────────────────
    // Returns evidence set BEFORE any analysis or decision is made
    public async queryEvidence(query: string, sourceIds: string[], workspaceId: string): Promise<Evidence[]> {
        const request: RetrievalRequest = {
            query,
            workspaceId,
            filters: { sourceIds }
        } as any;
        const pkg = await this.pipeline.execute(request);
        return this.projectEvidenceSet(pkg);
    }

    // ── Full Knowledge Package Query (Lock 30) ────────────────────────────────
    public async queryPackage(query: string, sourceIds: string[], workspaceId: string): Promise<TenderKnowledgePackage> {
        const request: RetrievalRequest = {
            query,
            workspaceId,
            filters: { sourceIds }
        } as any;
        const rawPackage = await this.pipeline.execute(request);
        const evidenceSet = this.projectEvidenceSet(rawPackage);

        const now = new Date();
        const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        return {
            packageId: `tender-pkg-${Date.now()}`,
            packageVersion: `${query.slice(0, 8)}-v${Date.now()}`,
            knowledgeFingerprint: this.generateFingerprint(evidenceSet),
            evidenceSet,
            freshness: {
                retrievedAt: now.toISOString(),
                expiresAt: expiresAt.toISOString(),
                staleness: "FRESH"
            },
            confidence: evidenceSet.length > 0 ? 0.92 : 0.0,
            sources: sourceIds,
            rawPackage
        };
    }

    private projectEvidenceSet(pkg: KnowledgePackage): Evidence[] {
        const entries = (pkg as any).evidences ?? (pkg as any).items ?? [];
        return entries.map((e: any, i: number) => ({
            id: `ev-${i}-${Date.now()}`,
            sourceId: e.sourceId ?? "tender.knowledge.regulations",
            content: e.content ?? JSON.stringify(e),
            confidence: e.score ?? 0.85,
            retrievedAt: new Date().toISOString()
        }));
    }

    private generateFingerprint(evidences: Evidence[]): string {
        return `fp-${evidences.map(e => e.id).join("-").slice(0, 32)}-${Date.now()}`;
    }
}
