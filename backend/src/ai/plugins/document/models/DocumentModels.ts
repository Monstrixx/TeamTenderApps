// ── Document Intelligence Domain Models ──────────────────────────────────────
// Incorporates: Lock 53 (Document Lineage), Lock 54 (Multi-modal Evidence),
//               Lock 55 (Layout Preservation), Lock 56 (Confidence Propagation),
//               Lock 57 (Document Fingerprint), Lock 58 (Semantic Citation),
//               Locks 25-52 (Domain Plugin Standard v1.3)

export type CapabilityLifecycle = "ACTIVE" | "DRAFT" | "DEPRECATED" | "RETIRED";

export interface CapabilityVersion {
    semanticId: string;
    version: string;
    lifecycle: CapabilityLifecycle;
    deprecatedAt?: string;
    replacedBy?: string;
}

export interface WorkflowVersion {
    id: string;
    version: string;
    deterministic: boolean;
    activeVersions: string[];
    defaultVersion: string;
}

export type EvidenceType =
    | "OCR_TEXT"
    | "IMAGE_REGION"
    | "TABLE"
    | "SIGNATURE"
    | "QR_CODE"
    | "BARCODE"
    | "STAMP"
    | "HANDWRITING";

export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

// ── Lock 57: Document Fingerprint ─────────────────────────────────────────────
export interface DocumentFingerprint {
    sha256: string;
    version: string;
    mimeType: string;
    pageCount: number;
    language: string;
    encoding: string;
    producer: string;
    fileName: string;
    fileSizeBytes: number;
    createdAt: string;
}

// ── Lock 53: Document Lineage ────────────────────────────────────────────────
export interface DocumentLineageNode {
    nodeId: string;
    documentFingerprintSha256: string;
    pageNumber: number;
    blockId: string;
    boundingBox: BoundingBox;
    ocrEngineVersion: string;
    timestamp: string;
}

// ── Lock 54: Multi-modal Evidence ────────────────────────────────────────────
export interface MultiModalEvidence {
    id: string;
    type: EvidenceType;
    content: string;                 // Text, JSON table, or base64 URI
    confidence: number;              // Raw OCR / detector confidence
    lineage: DocumentLineageNode;    // Lock 53
    retrievedAt: string;
}

// ── Lock 55: Layout Preservation ─────────────────────────────────────────────
export interface LayoutElement {
    elementId: string;
    type: "HEADING" | "PARAGRAPH" | "TABLE" | "LIST" | "FOOTER" | "HEADER";
    headingLevel?: number;           // H1, H2, H3 hierarchy
    sectionTitle?: string;
    pageNumber: number;
    boundingBox: BoundingBox;
    content: string;
    childElementIds?: string[];
}

// ── Lock 56: Confidence Propagation ────────────────────────────────────────
export interface ConfidencePipelineRecord {
    ocrConfidence: number;           // e.g. 0.99
    tableConfidence?: number;        // e.g. 0.95
    clauseConfidence?: number;       // e.g. 0.92
    propagatedConfidence: number;    // min or weighted average across pipeline
}

// ── Lock 58: Semantic Citation ──────────────────────────────────────────────
export interface SemanticCitation {
    citationId: string;
    clauseRef: string;               // e.g. "Pasal 4 Ayat 2"
    pageNumber: number;
    boundingBox: BoundingBox;
    excerpt: string;
    confidence: number;
    lineage: DocumentLineageNode;    // Lock 53
}

// ── Document Intelligence Domain Entities ────────────────────────────────────
export interface DocumentIngestionResult {
    fingerprint: DocumentFingerprint;       // Lock 57
    layout: LayoutElement[];                // Lock 55
    evidences: MultiModalEvidence[];        // Lock 54
    confidence: ConfidencePipelineRecord;   // Lock 56
    citations: SemanticCitation[];          // Lock 58
    classification: string;                // e.g. "TenderSpecification"
    complianceScore: number;
    artifactId: string;
}

export interface DocumentDomainKPI {
    ocrAccuracy: number;                    // Target: >= 99%
    tableExtractionAccuracy: number;        // Target: >= 98%
    clauseDetectionAccuracy: number;        // Target: >= 97%
    citationAccuracy: number;               // Target: 100%
    knowledgeTraceability: number;          // Target: 100%
    duplicateDetectionRate: number;         // Target: >= 99%
    knowledgeFreshnessScore: number;        // Target: >= 99%
    humanValidationRate: number;            // Target: 100%
}
