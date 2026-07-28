import { Evidence, Fact, KnowledgePackage, KnowledgePackageLifecycle, KnowledgePackageManifest, Relationship, Source, TimelineEvent } from "../models/KnowledgePackage";
import { QueryFingerprint } from "../models/RetrievalRequest";
import { createHash } from "crypto";

export class KnowledgePackageBuilder {
    public build(fingerprint: QueryFingerprint, evidence: Evidence[]): KnowledgePackage {
        const facts: Fact[] = evidence.map((e, i) => ({ id: `fact-${i}`, statement: e.content }));
        const sources: Source[] = evidence.map(e => ({
            id: e.sourceId,
            type: "DOCUMENT",
            domain: "GENERAL",
            workspace: fingerprint.workspaceId,
            authority: e.authority,
            version: "1.0",
            timestamp: new Date(),
            confidence: e.confidence
        }));
        
        const relationships: Relationship[] = [];
        const timeline: TimelineEvent[] = [{ timestamp: new Date(), description: "Knowledge Extracted" }];
        
        const avgConfidence = evidence.length > 0 ? evidence.reduce((sum, e) => sum + e.confidence, 0) / evidence.length : 0;
        
        const manifest: KnowledgePackageManifest = {
            version: "1.0.0",
            producer: "RetrievalEngine",
            planner: "CostBasedPlanner",
            strategies: ["HYBRID"],
            sources: ["SYSTEM"],
            schema: "KNOWLEDGE_PKG_V1",
            hash: ""
        };

        const now = new Date();
        const expiresAt = new Date(now.getTime() + 1000 * 60 * 60); // 1 hour TTL
        
        const pkgWithoutHash = {
            packageId: `pkg-${Date.now()}`,
            version: "1.0",
            workspaceId: fingerprint.workspaceId,
            queryFingerprint: fingerprint.hash,
            createdAt: now,
            expiresAt,
            confidence: avgConfidence,
            facts,
            evidence,
            relationships,
            sources,
            timeline,
            metadata: {},
            manifest,
            lifecycle: KnowledgePackageLifecycle.PACKAGED
        };
        
        const hash = createHash("sha256").update(JSON.stringify(pkgWithoutHash)).digest("hex");
        
        return {
            ...pkgWithoutHash,
            hash
        };
    }
}
