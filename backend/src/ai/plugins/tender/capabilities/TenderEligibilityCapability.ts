import { CognitivePipelineOrchestrator } from "../../../cognitive/CognitivePipelineOrchestrator";
import { CognitiveEngine, ExecutionContext } from "../../../shared/CognitiveEngine";
import { TenderKnowledgeSource } from "../knowledge/TenderKnowledgeSource";
import { CompanyProfileReadModel } from "../knowledge/CompanyProfileReadModel";
import { ArtifactLineage, DecisionRecord, EligibilityResult, EligibilityStatus, Evidence } from "../models/TenderModels";
import { CapabilityVersion } from "../models/TenderModels";

// ── Lock 36: Capability Version Declaration ───────────────────────────────────
export const ELIGIBILITY_CAPABILITY_VERSION: CapabilityVersion = {
    semanticId: "tender.eligibility.check",
    version: "1.0.0",
    lifecycle: "ACTIVE"
};

// ── Lock 27: Capability Purity — ONLY orchestration, validation, decision ─────
// Lock 39: Evidence First — evidence collected BEFORE any decision is made
// Lock 31: Decision Reproducibility — DecisionRecord stored with every result
// ─────────────────────────────────────────────────────────────────────────────
export class TenderEligibilityCapability {
    private knowledgeSource: TenderKnowledgeSource;
    private readModel: CompanyProfileReadModel;
    private pipelineOrchestrator: CognitivePipelineOrchestrator;

    constructor(
        knowledgeSource: TenderKnowledgeSource,
        readModel: CompanyProfileReadModel,
        orchestrator: CognitivePipelineOrchestrator
    ) {
        this.knowledgeSource = knowledgeSource;
        this.readModel = readModel;
        this.pipelineOrchestrator = orchestrator;
    }

    public async execute(tenderId: string, companyId: string, workspaceId: string): Promise<EligibilityResult> {
        // ── Step 1: EVIDENCE (Lock 39 — Evidence First) ──────────────────────
        const companyProjection = this.readModel.getProjection(companyId);
        if (!companyProjection) {
            throw new Error(`ERR_NO_PROJECTION: Company profile projection not available for ${companyId}`);
        }
        const evidence: Evidence[] = await this.knowledgeSource.queryEvidence(
            `eligibility requirements for tender ${tenderId}`,
            ["tender.knowledge.regulations", "tender.knowledge.company-projection"],
            workspaceId
        );
        evidence.push({
            id: `ev-projection-${companyId}`,
            sourceId: "tender.knowledge.company-projection",
            content: JSON.stringify({ trustScore: companyProjection.trustScore, certs: companyProjection.certifications }),
            confidence: 0.99,
            retrievedAt: new Date().toISOString()
        });

        // ── Step 2: ANALYSIS (Lock 39) ────────────────────────────────────────
        const passedCriteria: string[] = [];
        const failedCriteria: string[] = [];
        if (companyProjection.trustScore >= 0.7) passedCriteria.push("TrustScore >= 0.7");
        else failedCriteria.push("TrustScore < 0.7");
        if (companyProjection.experienceYears >= 3) passedCriteria.push("Experience >= 3 years");
        else failedCriteria.push("Experience < 3 years");
        if (companyProjection.certifications.length > 0) passedCriteria.push("Has certifications");
        else failedCriteria.push("No certifications");

        const score = passedCriteria.length / (passedCriteria.length + failedCriteria.length);
        const status: EligibilityStatus = failedCriteria.length === 0 ? "ELIGIBLE" : score >= 0.5 ? "ELIGIBLE" : "INELIGIBLE";

        // ── Step 3: DECISION (Lock 39 + Lock 31) ─────────────────────────────
        const decision: DecisionRecord = {
            analysisRef: {
                evidenceIds: evidence.map(e => e.id),
                summary: `Eligibility: ${passedCriteria.length} passed, ${failedCriteria.length} failed. Score: ${score.toFixed(2)}`,
                riskLevel: score >= 0.8 ? "LOW" : score >= 0.5 ? "MEDIUM" : "HIGH",
                timestamp: new Date().toISOString()
            },
            appliedPolicies: ["tender.policy.eligibility"],
            appliedRules: ["TrustScoreRule", "ExperienceRule", "CertificationRule"],
            reasoningPath: [`Evaluated ${evidence.length} evidence items`, `Score: ${score.toFixed(2)}`, `Decision: ${status}`],
            confidence: score,
            outcome: status,
            decisionVersion: "decision-v1.0.0"
        };

        // ── Step 4: ARTIFACT LINEAGE (Lock 38) ───────────────────────────────
        const knowledgePkg = await this.knowledgeSource.queryPackage(`tender ${tenderId} eligibility`, ["tender.knowledge.regulations"], workspaceId);
        const lineage: ArtifactLineage = {
            generatedByCapability: `${ELIGIBILITY_CAPABILITY_VERSION.semanticId}@${ELIGIBILITY_CAPABILITY_VERSION.version}`,
            knowledgePackageId: knowledgePkg.packageId,
            knowledgePackageVersion: knowledgePkg.packageVersion,
            evidenceIds: evidence.map(e => e.id),
            decisionVersion: decision.decisionVersion,
            generatedAt: new Date().toISOString(),
            checksum: `cs-eligibility-${tenderId}-${companyId}`
        };

        return { tenderId, companyId, status, score, passedCriteria, failedCriteria, artifactId: `art-elig-${tenderId}`, lineage, evidence, decision };
    }
}
