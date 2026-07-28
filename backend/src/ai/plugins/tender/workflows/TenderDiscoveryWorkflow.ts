import { TenderEventPublisher } from "../events/TenderEventPublisher";
import { WorkflowVersion } from "../models/TenderModels";

// ── Lock 37: Workflow Version Declaration ─────────────────────────────────────
export const DISCOVERY_WORKFLOW_VERSION: WorkflowVersion = {
    id: "tender.workflow.discovery",
    version: "1.0.0",
    deterministic: true,
    activeVersions: ["1.0.0"],
    defaultVersion: "1.0.0"
};

// ── Lock 28: Workflow Determinism ─────────────────────────────────────────────
export class TenderDiscoveryWorkflow {
    readonly version = DISCOVERY_WORKFLOW_VERSION;

    constructor(private eventPublisher: TenderEventPublisher) {}

    public async execute(tenderId: string, title: string, category: string, deadline: string): Promise<void> {
        // Step 1 — Publish discovery (deterministic order, no randomness)
        await this.eventPublisher.publishTenderPublished(tenderId, title, category, deadline);

        // Step 2 — Trigger knowledge indexing
        await this.eventPublisher.publishEvent("TenderIndexed", { tenderId, knowledgePackageId: `pkg-${tenderId}` });

        // Step 3 — Signal requirements extracted
        await this.eventPublisher.publishEvent("RequirementsExtracted", { tenderId, requirementCount: 10 });

        // Step 4 — Request knowledge refresh (OQ-3: delegated to RuntimeScheduler)
        await this.eventPublisher.publishKnowledgeRefreshRequested("tender.knowledge.regulations", "HIGH");
    }
}
