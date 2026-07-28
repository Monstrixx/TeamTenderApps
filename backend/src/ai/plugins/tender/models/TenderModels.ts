// ── Tender Plugin — Core Domain Models ───────────────────────────────────────
// Incorporates: Lock 36 (Capability Versioning), Lock 37 (Workflow Versioning),
//               Lock 38 (Artifact Lineage), Lock 39 (Evidence First),
//               Lock 40 (Domain KPI)

// ── Lock 36: Capability Versioning ───────────────────────────────────────────
export type CapabilityLifecycle = "ACTIVE" | "DRAFT" | "DEPRECATED" | "RETIRED";

export interface CapabilityVersion {
    semanticId: string;
    version: string;
    lifecycle: CapabilityLifecycle;
    deprecatedAt?: string;
    replacedBy?: string;
}

// ── Lock 37: Workflow Versioning ──────────────────────────────────────────────
export interface WorkflowVersion {
    id: string;
    version: string;
    deterministic: boolean;
    activeVersions: string[];
    defaultVersion: string;
}

// ── Lock 38: Artifact Lineage ─────────────────────────────────────────────────
export interface ArtifactLineage {
    generatedByCapability: string;       // e.g. "tender.bid.score@v1.0.0"
    generatedByWorkflow?: string;        // e.g. "tender.workflow.bid-preparation@v1.0.0"
    knowledgePackageId: string;          // Lock 30
    knowledgePackageVersion: string;
    evidenceIds: string[];
    promptVersion?: string;
    decisionVersion: string;            // Lock 31 ReasoningRecord version
    generatedAt: string;
    checksum: string;
}

// ── Lock 39: Evidence First ───────────────────────────────────────────────────
// Pattern enforced: Evidence → Analysis → Decision → Artifact
export interface Evidence {
    id: string;
    sourceId: string;
    content: string;
    confidence: number;
    retrievedAt: string;
}

export interface AnalysisResult {
    evidenceIds: string[];
    summary: string;
    riskLevel: "LOW" | "MEDIUM" | "HIGH";
    timestamp: string;
}

export interface DecisionRecord {
    analysisRef: AnalysisResult;
    appliedPolicies: string[];
    appliedRules: string[];
    reasoningPath: string[];
    confidence: number;
    outcome: string;
    decisionVersion: string;            // for reproducibility (Lock 31)
}

// ── Lock 40: Domain KPI ───────────────────────────────────────────────────────
export interface TenderDomainKPI {
    eligibilityAccuracy: number;          // correct eligibility / total
    bidScoreAccuracy: number;             // scored bids matching actual / total
    recommendationAcceptanceRate: number; // accepted recommendations / generated
    awardPredictionAccuracy: number;      // correct predictions / declared awards
    workflowCompletionRate: number;       // completed workflows / started
    artifactGenerationTimeMs: number;     // avg ms to generate artifact
    knowledgeFreshness: "FRESH" | "AGING" | "STALE";
    humanApprovalRate: number;            // approved plans / submitted for approval
}

// ── Core Tender Domain Entities ───────────────────────────────────────────────
export type TenderStatus = "DRAFT" | "PUBLISHED" | "REGISTRATION_OPEN" | "SUBMISSION_OPEN" | "EVALUATION" | "AWARDED" | "CLOSED" | "CANCELLED";
export type BidStatus = "DRAFT" | "ELIGIBILITY_CHECK" | "ELIGIBLE" | "INELIGIBLE" | "BID_PREPARATION" | "COMPLIANCE_REVIEW" | "REVISION_REQUIRED" | "READY" | "SUBMITTED" | "EVALUATED" | "AWARDED" | "REJECTED";
export type EligibilityStatus = "ELIGIBLE" | "INELIGIBLE" | "PENDING";

export interface TenderDocument {
    id: string;
    referenceNumber: string;
    title: string;
    category: string;
    procurementType: string;
    issuingAuthority: string;
    publishedAt: string;
    registrationDeadline: string;
    submissionDeadline: string;
    estimatedValue: number;
    currency: string;
    region: string;
    status: TenderStatus;
}

export interface TenderRequirement {
    id: string;
    tenderId: string;
    type: "Technical" | "Financial" | "Legal" | "Experience";
    description: string;
    mandatory: boolean;
    validationRule?: string;
}

export interface EligibilityResult {
    tenderId: string;
    companyId: string;
    status: EligibilityStatus;
    score: number;
    passedCriteria: string[];
    failedCriteria: string[];
    artifactId: string;
    lineage: ArtifactLineage;
    evidence: Evidence[];            // Lock 39
    decision: DecisionRecord;        // Lock 31
}

export interface TenderBid {
    id: string;
    tenderId: string;
    companyId: string;
    status: BidStatus;
    proposedValue: number;
    currency: string;
    submittedAt?: string;
    artifactId?: string;
    lineage?: ArtifactLineage;       // Lock 38
}

export interface ScoredBid {
    bidId: string;
    technicalScore: number;
    financialScore: number;
    complianceScore: number;
    overallScore: number;
    ranking?: number;
    confidence: number;
    lineage: ArtifactLineage;        // Lock 38
    decision: DecisionRecord;        // Lock 31 + 39
}

export interface ComplianceResult {
    bidId: string;
    passed: boolean;
    violations: string[];
    score: number;
    evidence: Evidence[];            // Lock 39
    lineage: ArtifactLineage;        // Lock 38
}

export interface Recommendation {
    tenderId: string;
    bidId: string;
    strategyId: string;
    confidence: number;
    decision: DecisionRecord;        // Lock 31 + 39
    lineage: ArtifactLineage;        // Lock 38
    artifactId: string;
}

export interface AwardPrediction {
    tenderId: string;
    probability: number;
    confidence: number;
    evidence: Evidence[];            // Lock 39
    lineage: ArtifactLineage;        // Lock 38
    artifactId: string;
}

export interface TenderWorkspace {
    id: string;
    tenderId: string;
    companyId: string;
    memberIds: string[];
    status: "ACTIVE" | "CLOSED";
    createdAt: string;
}

// ── Company Profile Projection (Lock 25 — Read Model) ─────────────────────────
export interface CompanyProfileProjection {
    companyId: string;
    legalName: string;
    trustScore: number;
    certifications: string[];
    financialCapacity: number;
    experienceYears: number;
    projectCount: number;
    projectionVersion: string;       // versioned snapshot
    projectedAt: string;
}

// ── Lock 42: Capability Observability ────────────────────────────────────
// Every capability must produce its own telemetry.
export interface CapabilityObservability {
    capabilityId: string;
    capabilityVersion: string;
    executionTimeMs: number;
    successRate: number;              // successful executions / total
    approvalRate: number;             // approved decisions / total decisions
    artifactCount: number;            // artifacts produced this session
    evidenceCount: number;            // evidence items consumed
    lastExecutedAt: string;
}

// ── Lock 43: Workflow Replayability ────────────────────────────────────
// Minimum record needed to reconstruct any workflow execution for audit.
export interface WorkflowReplayRecord {
    workflowId: string;
    workflowVersion: string;          // Lock 37
    executionId: string;
    triggeredAt: string;
    steps: Array<{
        capabilityId: string;
        capabilityVersion: string;    // Lock 36
        executionTimeMs: number;
        artifactLineageId: string;    // Lock 38
        evidencePackageId: string;    // Lock 30
        decisionId: string;           // Lock 31
    }>;
    completedAt?: string;
    status: "RUNNING" | "COMPLETED" | "FAILED" | "REPLAYING";
}

// ── Lock 44: Knowledge Freshness Contract ───────────────────────────────
// Capabilities MUST check freshness before using knowledge packages.
export interface KnowledgeFreshnessContract {
    generatedAt: string;
    sourceVersion: string;            // version of the knowledge source
    snapshotId: string;
    freshnessScore: number;           // 1.0 = FRESH, 0.0 = EXPIRED
    expirationPolicy: {
        maxAgeHours: number;
        hardExpiry: boolean;          // true = reject stale; false = warn
        gracePeriodMinutes: number;
    };
    isUsable(): boolean;              // runtime check for capability
}

// ── Lock 45: Domain SLA (declared via manifest, enforced here) ────────────
export interface DomainSLA {
    startupTimeMs: number;            // target: < 100ms
    healthCheckTimeMs: number;        // target: < 10ms
    maxMemoryMb: number;              // target: < 512MB
    maxCpuTimeMs: number;             // target: < 10000ms
    maxConcurrentAgents: number;      // target: 3
    expectedResponseTimeMs: number;   // target: < 500ms per capability
}

export const TENDER_PLUGIN_SLA: DomainSLA = {
    startupTimeMs: 100,
    healthCheckTimeMs: 10,
    maxMemoryMb: 512,
    maxCpuTimeMs: 10000,
    maxConcurrentAgents: 3,
    expectedResponseTimeMs: 500
};
