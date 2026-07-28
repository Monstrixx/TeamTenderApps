import { AgentFluentAPI } from "../../../api/sdk/AgentSDK";
import { AgentManifest } from "../../../api/runtime/models/AgentProcess";
import { TenderEventPublisher } from "../events/TenderEventPublisher";

// ── Lock 29: Agent Independence ───────────────────────────────────────────────
// Agents communicate ONLY via Events or Shared Artifacts.
// No method calls between agents. Each agent is spawned via AgentFluentAPI.
// ─────────────────────────────────────────────────────────────────────────────

const ANALYSIS_AGENT_MANIFEST: AgentManifest = {
    id: "agent.tender.analysis",
    version: "1.0.0",
    capabilities: ["tender.document.parse", "tender.requirement.extract"],
    tools: ["TenderDocumentParser", "KnowledgeRetriever"],
    model: "cognitive-v1"
} as any;

const BID_OPTIMIZATION_AGENT_MANIFEST: AgentManifest = {
    id: "agent.tender.bid-optimization",
    version: "1.0.0",
    capabilities: ["tender.bid.score", "tender.bid.optimize"],
    tools: ["BidScoringTool", "MarketPricingTool"],
    model: "cognitive-v1"
} as any;

const COMPLIANCE_AGENT_MANIFEST: AgentManifest = {
    id: "agent.tender.compliance",
    version: "1.0.0",
    capabilities: ["tender.compliance.review"],
    tools: ["RegulationChecker", "ComplianceTool"],
    model: "cognitive-v1"
} as any;

export class TenderAgentOrchestrator {
    private agentAPI = new AgentFluentAPI();

    constructor(private eventPublisher: TenderEventPublisher) {}

    // ── Lock 29: Spawn agents; they communicate via events, not method calls ──
    public async runMultiAgentPipeline(tenderId: string, bidId: string, workspaceId: string): Promise<void> {
        // Spawn TenderAnalysisAgent first
        const analysisPid = await this.agentAPI.spawn(ANALYSIS_AGENT_MANIFEST, `goal-tender-analysis-${tenderId}`, workspaceId);

        // Spawn BidOptimizationAgent and link to analysis (join)
        const bidOptPid = await this.agentAPI.spawn(BID_OPTIMIZATION_AGENT_MANIFEST, `goal-bid-opt-${bidId}`, workspaceId);
        await this.agentAPI.join(analysisPid.processId, bidOptPid.processId);

        // Spawn ComplianceReviewAgent in parallel — communicates via Event only
        const compliancePid = await this.agentAPI.spawn(COMPLIANCE_AGENT_MANIFEST, `goal-compliance-${bidId}`, workspaceId);

        // Publish event so BidOptimization + Compliance agents can receive context
        // Lock 29: No direct call between agents — event is the ONLY channel
        await this.eventPublisher.publishEvent("TenderContextReady", {
            tenderId,
            bidId,
            analysisPid: analysisPid.processId,
            bidOptPid: bidOptPid.processId,
            compliancePid: compliancePid.processId
        });
    }

    public async cancelAll(pids: string[]): Promise<void> {
        for (const pid of pids) {
            await this.agentAPI.cancel(pid);
        }
    }
}
