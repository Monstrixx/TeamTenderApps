import { CognitiveEngine, ExecutionContext } from "../../../shared/CognitiveEngine";

// ── TenderEligibilityPolicy ───────────────────────────────────────────────────
// Runs through PolicyEngine in CognitivePipelineOrchestrator.
// Lock 27: Policy is pure decision logic — no DB or HTTP.
// ─────────────────────────────────────────────────────────────────────────────
export class TenderEligibilityPolicy implements CognitiveEngine<any, any> {
    async execute(input: any, context: ExecutionContext): Promise<any> {
        // Evaluate eligibility policy rules
        const trustOk = (input.trustScore ?? 0) >= 0.7;
        const expOk   = (input.experienceYears ?? 0) >= 3;
        const certOk  = (input.certifications ?? []).length > 0;
        const allowed = trustOk && expOk;
        return {
            allowed,
            policyId: "tender.policy.eligibility",
            checks: { trustOk, expOk, certOk },
            reason: allowed ? "Eligibility policy satisfied." : "Eligibility policy blocked execution."
        };
    }
}

// ── TenderCompliancePolicy ────────────────────────────────────────────────────
export class TenderCompliancePolicy implements CognitiveEngine<any, any> {
    async execute(input: any, context: ExecutionContext): Promise<any> {
        const legalDocsOk    = input.hasLegalDocs ?? true;
        const taxClearanceOk = input.hasTaxClearance ?? true;
        const allowed = legalDocsOk && taxClearanceOk;
        return {
            allowed,
            policyId: "tender.policy.compliance",
            checks: { legalDocsOk, taxClearanceOk },
            severity: allowed ? "NONE" : "BLOCKER",
            reason: allowed ? "Compliance policy satisfied." : "Compliance policy BLOCKER: missing legal/tax documents."
        };
    }
}
