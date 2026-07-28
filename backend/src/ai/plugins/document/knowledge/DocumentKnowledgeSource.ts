import { RetrievalPipeline } from "../../../api/retrieval/pipeline/Pipeline";
import { DocumentIngestionResult, DocumentLineageNode, MultiModalEvidence } from "../models/DocumentModels";

export interface DocumentKnowledgePackage {
    packageId: string;
    packageVersion: string;
    fingerprintSha256: string;
    knowledgeNodes: Array<{
        nodeId: string;
        content: string;
        type: string;
        confidence: number;            // Lock 56 Propagated Confidence
        lineage: DocumentLineageNode;   // Lock 53 Document Lineage
    }>;
    citations: any[];
    freshnessScore: number;
    generatedAt: string;
}

export class DocumentKnowledgeSource {
    private pipeline: RetrievalPipeline;

    constructor(pipeline?: RetrievalPipeline) {
        this.pipeline = pipeline ?? new RetrievalPipeline();
    }

    // ── Knowledge Package Builder with Confidence Propagation (Lock 56) ──────
    public buildKnowledgePackage(ingestion: DocumentIngestionResult): DocumentKnowledgePackage {
        const knowledgeNodes = ingestion.evidences.map((ev: MultiModalEvidence, i: number) => ({
            nodeId: `knode-${i + 1}-${Date.now()}`,
            content: ev.content,
            type: ev.type,
            // Lock 56: Confidence propagates from OCR -> Extraction -> Node
            confidence: Math.min(ev.confidence, ingestion.confidence.propagatedConfidence),
            // Lock 53: Document Lineage preserved down to Bounding Box and Page Number
            lineage: ev.lineage
        }));

        return {
            packageId: `doc-pkg-${ingestion.fingerprint.sha256.slice(0, 16)}`,
            packageVersion: "1.0.0",
            fingerprintSha256: ingestion.fingerprint.sha256,
            knowledgeNodes,
            citations: ingestion.citations,
            freshnessScore: 1.0,
            generatedAt: new Date().toISOString()
        };
    }
}
