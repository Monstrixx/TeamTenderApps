import { TenderDomainKPI } from "../models/TenderModels";

// ── Lock 40: Domain Telemetry — First-Class KPI ───────────────────────────────
// Domain KPIs are completely separate from Platform Telemetry (latency/memory/routing).
// ─────────────────────────────────────────────────────────────────────────────
export class TenderTelemetryCollector {
    private kpi: TenderDomainKPI = {
        eligibilityAccuracy: 1.0,
        bidScoreAccuracy: 1.0,
        recommendationAcceptanceRate: 1.0,
        awardPredictionAccuracy: 1.0,
        workflowCompletionRate: 1.0,
        artifactGenerationTimeMs: 0,
        knowledgeFreshness: "FRESH",
        humanApprovalRate: 1.0
    };

    private startTime?: number;
    private eligibilityTotal = 0;
    private eligibilityCorrect = 0;
    private workflowsStarted = 0;
    private workflowsCompleted = 0;
    private artifactTimings: number[] = [];
    private recommendationsGenerated = 0;
    private recommendationsAccepted = 0;
    private approvalsRequested = 0;
    private approvalsGranted = 0;

    public recordStart(): void { this.startTime = Date.now(); }
    public recordStop(): void { this.startTime = undefined; }

    public recordEligibilityCheck(correct: boolean): void {
        this.eligibilityTotal++;
        if (correct) this.eligibilityCorrect++;
        this.kpi.eligibilityAccuracy = this.eligibilityTotal > 0 ? this.eligibilityCorrect / this.eligibilityTotal : 1.0;
    }

    public recordWorkflowStarted(): void { this.workflowsStarted++; this.updateWorkflowRate(); }
    public recordWorkflowCompleted(): void { this.workflowsCompleted++; this.updateWorkflowRate(); }

    public recordArtifactGeneration(ms: number): void {
        this.artifactTimings.push(ms);
        this.kpi.artifactGenerationTimeMs = this.artifactTimings.reduce((a, b) => a + b, 0) / this.artifactTimings.length;
    }

    public recordRecommendation(accepted: boolean): void {
        this.recommendationsGenerated++;
        if (accepted) this.recommendationsAccepted++;
        this.kpi.recommendationAcceptanceRate = this.recommendationsGenerated > 0 ? this.recommendationsAccepted / this.recommendationsGenerated : 1.0;
    }

    public recordApproval(granted: boolean): void {
        this.approvalsRequested++;
        if (granted) this.approvalsGranted++;
        this.kpi.humanApprovalRate = this.approvalsRequested > 0 ? this.approvalsGranted / this.approvalsRequested : 1.0;
    }

    public recordKnowledgeFreshness(staleness: "FRESH" | "AGING" | "STALE"): void {
        this.kpi.knowledgeFreshness = staleness;
    }

    public getKPI(): TenderDomainKPI { return { ...this.kpi }; }

    private updateWorkflowRate(): void {
        this.kpi.workflowCompletionRate = this.workflowsStarted > 0 ? this.workflowsCompleted / this.workflowsStarted : 1.0;
    }
}
