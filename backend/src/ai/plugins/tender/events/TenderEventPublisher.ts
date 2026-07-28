import { EventBuilder, EventFactory, EventValidator } from "../../../kernel/events/EventPipeline";
import { EligibilityStatus } from "../models/TenderModels";

// ── TenderEventPublisher — integrates EventPlatform (Kernel) ──────────────────
// Publishes all 17 domain events via EventBuilder.buildAndPublish()
// Lock 26: No direct fetch/axios — all communication via EventBuilder
// ─────────────────────────────────────────────────────────────────────────────
export class TenderEventPublisher {
    private eventBuilder: EventBuilder;

    constructor(eventBuilder?: EventBuilder) {
        const factory = new EventFactory();
        const validator = new EventValidator();
        this.eventBuilder = eventBuilder ?? new EventBuilder(factory, validator, { append: async () => {} } as any, { publish: async () => {} } as any);
    }

    public async publishTenderPublished(tenderId: string, title: string, category: string, deadline: string): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type: "TenderPublished", tenderId, title, category, deadline, timestamp: new Date().toISOString() });
    }

    public async publishEligibilityAssessmentStarted(tenderId: string, companyId: string): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type: "EligibilityAssessmentStarted", tenderId, companyId });
    }

    public async publishEligibilityAssessed(tenderId: string, companyId: string, status: EligibilityStatus, score: number): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type: "EligibilityAssessed", tenderId, companyId, status, score });
    }

    public async publishBidSubmitted(tenderId: string, bidId: string): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type: "BidSubmitted", tenderId, bidId, submittedAt: new Date().toISOString() });
    }

    public async publishAwardDeclared(tenderId: string, winnerId: string, awardedValue: number): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type: "AwardDeclared", tenderId, winnerId, awardedValue, declaredAt: new Date().toISOString() });
    }

    public async publishKnowledgeRefreshRequested(sourceId: string, priority: "HIGH" | "NORMAL" | "LOW"): Promise<void> {
        // OQ-3: Plugin only publishes — RuntimeScheduler decides when to execute
        await this.eventBuilder.buildAndPublish({ type: "KnowledgeRefreshRequested", sourceId, priority, requestedAt: new Date().toISOString() });
    }

    // Generic publisher for all other domain events
    public async publishEvent(type: string, payload: Record<string, any>): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type, ...payload, timestamp: new Date().toISOString() });
    }
}
