import { TenderEligibilityCapability } from "../capabilities/TenderEligibilityCapability";
import { TenderEventPublisher } from "../events/TenderEventPublisher";
import { WorkflowVersion } from "../models/TenderModels";

// ── Lock 37: Workflow Version Declaration ─────────────────────────────────────
export const ELIGIBILITY_WORKFLOW_VERSION: WorkflowVersion = {
    id: "tender.workflow.eligibility",
    version: "1.0.0",
    deterministic: true,
    activeVersions: ["1.0.0"],
    defaultVersion: "1.0.0"
};

// ── Lock 28: Workflow Determinism ─────────────────────────────────────────────
// Same input → same steps → same events → same output.
// No random branching. All decisions routed through capability.
// ─────────────────────────────────────────────────────────────────────────────
export class EligibilityWorkflow {
    readonly version = ELIGIBILITY_WORKFLOW_VERSION;

    constructor(
        private eligibilityCapability: TenderEligibilityCapability,
        private eventPublisher: TenderEventPublisher
    ) {}

    // Deterministic execution (Lock 28)
    public async execute(tenderId: string, companyId: string, workspaceId: string): Promise<void> {
        // Step 1 — Signal start (deterministic order)
        await this.eventPublisher.publishEligibilityAssessmentStarted(tenderId, companyId);

        // Step 2 — Execute capability (Lock 27: pure orchestration)
        const result = await this.eligibilityCapability.execute(tenderId, companyId, workspaceId);

        // Step 3 — Publish result event (deterministic)
        await this.eventPublisher.publishEligibilityAssessed(tenderId, companyId, result.status, result.score);

        // Step 4 — Publish specific outcome (deterministic branching based on data, not random)
        if (result.status === "ELIGIBLE") {
            await this.eventPublisher.publishEvent("EligibilityPassed", { tenderId, companyId, score: result.score });
        } else {
            await this.eventPublisher.publishEvent("EligibilityFailed", { tenderId, companyId, reasons: result.failedCriteria });
        }
    }
}
