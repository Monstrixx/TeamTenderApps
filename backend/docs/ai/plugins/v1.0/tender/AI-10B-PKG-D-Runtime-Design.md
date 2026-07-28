# AI-10B Package D — Runtime Design
## Tender Plugin — Sequence, State, Deployment & Telemetry Diagrams

> **Package:** D — Runtime  
> **Sprint:** AI-10B: Tender Plugin Domain Design  
> **Architecture Locks:** Lock 28 (Workflow Determinism), Lock 29 (Agent Independence), Lock 30 (Knowledge Package Versioning), Lock 31 (Decision Reproducibility)

---

## D.1 — Sequence Diagram: Full Tender Lifecycle

```mermaid
sequenceDiagram
    participant U as User
    participant TP as TenderPlugin
    participant PH as PluginHost
    participant KP as KnowledgePlatform
    participant CO as CognitiveOS
    participant AR as AgentRuntime
    participant EP as EventPlatform
    participant ADA as TenderAuthorityAdapter
    participant ART as ArtifactRegistry

    Note over U,ART: Phase 1 — Tender Discovery
    U->>TP: discoverTender(ref)
    TP->>ADA: fetchTenderDocument(ref)
    ADA-->>TP: RawTenderDocument
    TP->>KP: execute(ParseTenderQuery)
    KP-->>TP: TenderKnowledgePackage v{n}
    TP->>EP: publish(TenderPublished)
    TP->>EP: publish(RequirementsExtracted)

    Note over U,ART: Phase 2 — Eligibility Check
    TP->>KP: execute(EligibilityQuery)
    KP-->>TP: CompanyProfileProjection
    TP->>CO: runPipeline(EligibilityGoal)
    CO-->>TP: EligibilityResult { ELIGIBLE }
    TP->>ART: store(EligibilityReportArtifact)
    ART-->>TP: artifactId
    TP->>EP: publish(EligibilityAssessed)

    Note over U,ART: Phase 3 — Bid Preparation (Multi-Agent)
    TP->>AR: spawn(TenderAnalysisAgent)
    AR-->>TP: AgentProcess (pid: TA-001)
    TP->>AR: spawn(BidOptimizationAgent)
    AR-->>TP: AgentProcess (pid: BO-001)
    TP->>AR: join(TA-001, BO-001)
    EP-->>AR: TenderContextReady → BidOptimizationAgent
    TP->>AR: spawn(ComplianceReviewAgent)
    AR-->>TP: AgentProcess (pid: CR-001)
    EP-->>AR: TenderContextReady → ComplianceReviewAgent

    Note over AR: BO + CR run in parallel (Lock 29)
    AR->>EP: publish(BidOptimized)
    AR->>EP: publish(ComplianceReviewed)
    TP->>ART: store(BidStrategyArtifact)
    TP->>ART: store(ComplianceReportArtifact)
    TP->>EP: publish(BidFinalized)

    Note over U,ART: Phase 4 — Submission
    U->>TP: submitBid(bidId) [Human Approval]
    TP->>ADA: submitBid(BidPackage)
    ADA-->>TP: SubmissionReceipt
    TP->>EP: publish(BidSubmitted)
    TP->>EP: publish(SubmissionConfirmed)
```

---

## D.2 — Sequence Diagram: Cognitive Pipeline Execution (Bid Analysis)

```mermaid
sequenceDiagram
    participant BC as TenderBidCapability
    participant CO as CognitivePipelineOrchestrator
    participant PE as PolicyEngine
    participant RE as RuleEngine
    participant RSN as ReasoningEngine
    participant DE as DecisionEngine
    participant CE as ConstraintEngine
    participant PL as PlanningEngine
    participant AE as ApprovalEngine
    participant EX as ExecutionCoordinator
    participant RF as ReflectionEngine
    participant ART as ArtifactRegistry

    BC->>CO: runPipeline(BidAnalysisGoal)
    CO->>PE: execute(EligibilityPolicy)
    PE-->>CO: { allowed: true }
    CO->>RE: execute(BidValidationRules)
    RE-->>CO: RuleResult { valid: true }
    CO->>RSN: execute(MarketReasoningContext)
    RSN-->>CO: BidStrategy { competitive pricing }
    CO->>DE: execute(BidOptions)
    DE-->>CO: RankedDecision { rank: 1, confidence: 0.87 }
    CO->>CE: execute(BudgetConstraints)
    CE-->>CO: { severity: NONE }
    CO->>PL: execute(SubmissionTimeline)
    PL-->>CO: SubmissionPlan { T-3 days }
    CO->>AE: execute(BidPlan) [Human Gate]
    AE-->>CO: { approved: true, approvedBy: "user-001" }
    CO->>EX: execute(ApprovedBid)
    EX-->>CO: ExecutionResult { success }
    CO->>RF: execute(BidLessons)
    RF-->>CO: LessonsLearned { recorded }

    CO-->>BC: BidAnalysisResult + ReasoningRecord (Lock 31)
    BC->>ART: store(BidAnalysisArtifact) (Lock 32)
```

---

## D.3 — State Diagram: TenderPlugin Lifecycle

```mermaid
stateDiagram-v2
    [*] --> CREATED : PluginHost.mount()

    CREATED --> LOADED : manifest validated by PluginLoader
    LOADED --> VALIDATED : signature verified
    VALIDATED --> READY : start(context) called
    READY --> RUNNING : first capability invoked

    RUNNING --> SUSPENDED : suspend()
    SUSPENDED --> RESUMED : resume()
    RESUMED --> RUNNING : capability invoked

    RUNNING --> STOPPED : stop()
    STOPPED --> UNLOADED : PluginHost.unmount()
    UNLOADED --> [*]

    RUNNING --> DEGRADED : health check fails
    DEGRADED --> RUNNING : self-heal
    DEGRADED --> STOPPED : max retries exceeded
```

---

## D.4 — State Diagram: Knowledge Refresh (RuntimeScheduler — OQ-3)

```mermaid
stateDiagram-v2
    [*] --> IDLE

    IDLE --> REQUESTED : TenderPlugin publishes KnowledgeRefreshRequested
    REQUESTED --> SCHEDULED : RuntimeScheduler.schedule(priority)
    SCHEDULED --> FETCHING : slot allocated
    FETCHING --> VALIDATING : data received
    VALIDATING --> UPDATED : validation passed
    VALIDATING --> FAILED : validation failed
    UPDATED --> IDLE : cache updated + KnowledgeRefreshed published
    FAILED --> BACKOFF : retry policy
    BACKOFF --> SCHEDULED : retry slot
    BACKOFF --> DEAD_LETTER : max retries exceeded

    DEAD_LETTER --> [*]
```

---

## D.5 — Deployment Diagram

```mermaid
graph TB
    subgraph BACKEND["Backend (Node.js Process)"]
        subgraph KERNEL["AI Core Kernel v1.0 (FROZEN)"]
            EV["Event Pipeline"]
            MB["Memory Broker"]
        end

        subgraph RUNTIME["Runtime Layer v1.0 (FROZEN)"]
            PM["ProcessManager"]
            CS["CapabilitySession"]
            RS["RuntimeScheduler"]
        end

        subgraph PLATFORM["Plugin Platform v1.0 (FROZEN)"]
            PH["PluginHost"]
            PL["PluginLoader"]
            PR["PluginRegistry"]
        end

        subgraph TENDER["TenderPlugin Container (Sandbox)"]
            TI["TenderPlugin (index.ts)"]
            CAPS["Capabilities ×9"]
            WFS["Workflows ×6"]
            AGNTS["Agents ×3"]
            EVTS["Events ×17"]
            KNOW["Knowledge Sources ×5"]
            ADPT["Adapters ×3"]
            POL["Policies ×2"]
            UI["UI Contract"]
            TEL["Domain Telemetry"]
        end
    end

    subgraph STORAGE["Storage Layer"]
        KDB["Knowledge Cache"]
        ADB["Artifact Registry"]
        PDB["Projection Store (Read Models)"]
    end

    subgraph EXTERNAL["External (Future)"]
        LPSE["LPSE API"]
        LKPP["LKPP API"]
    end

    PH --> TENDER
    TENDER --> KERNEL
    TENDER --> RUNTIME
    PM --> AGNTS
    RS -->|schedules| KNOW
    TENDER --> KDB
    TENDER --> ADB
    TENDER --> PDB
    ADPT -.->|future| LPSE
    ADPT -.->|future| LKPP
    ADPT -->|stub| ADB
```

---

## D.6 — Domain Telemetry Diagram (Lock 34)

```mermaid
graph LR
    subgraph DOMAIN_TEL["Domain Telemetry (Lock 34)"]
        BID_WR["Bid Win Rate"]
        ELIG_ACC["Eligibility Accuracy"]
        SUB_SR["Submission Success Rate"]
        COMP_PR["Compliance Pass Rate"]
        PRED_ACC["Prediction Accuracy"]
        CYCLE["Bid Cycle Time"]
        CONF["Avg Reasoning Confidence"]
        FRESH["Knowledge Freshness"]
    end

    subgraph PLATFORM_TEL["Platform Telemetry (Kernel — Separate)"]
        LAT["Latency"]
        MEM["Memory"]
        ROUTE["Routing"]
        PROC["Process Count"]
    end

    subgraph DASHBOARDS["Dashboards"]
        OPS["Platform Ops Dashboard"]
        BIZ["Tender Business Dashboard"]
    end

    DOMAIN_TEL --> BIZ
    PLATFORM_TEL --> OPS
```

---

## D.7 — Class Diagram: Core Plugin Structure

```mermaid
classDiagram
    class TenderPlugin {
        -state: PluginHealthState
        -context: PluginContext
        -telemetry: TenderTelemetryCollector
        +start(context) Promise~void~
        +stop() Promise~void~
        +suspend() Promise~void~
        +resume() Promise~void~
        +health() PluginHealthState
        +selftest() Record~string,boolean~
    }

    class TenderEligibilityCapability {
        -policy: TenderEligibilityPolicy
        -cognitiveOS: CognitivePipelineOrchestrator
        -knowledgePipeline: RetrievalPipeline
        +execute(tenderId, companyId) EligibilityResult
    }

    class TenderBidAnalysisCapability {
        -cognitiveOS: CognitivePipelineOrchestrator
        -agentRuntime: AgentFluentAPI
        -knowledgePipeline: RetrievalPipeline
        +execute(bidId) BidAnalysisResult
    }

    class TenderAuthorityAdapter {
        -provider: ITenderAuthorityProvider
        +fetchDocument(ref) RawTenderDocument
        +submitBid(pkg) SubmissionReceipt
    }

    class ITenderAuthorityProvider {
        <<interface>>
        +fetchTenderDocument(ref)*
        +submitBid(pkg)*
        +fetchSubmissionStatus(id)*
        +fetchAwardResults(id)*
    }

    class TenderAuthorityStubProvider {
        +fetchTenderDocument(ref)
        +submitBid(pkg)
        +fetchSubmissionStatus(id)
        +fetchAwardResults(id)
    }

    class CompanyProfileProjection {
        +companyId: string
        +legalName: string
        +trustScore: float
        +certifications: string[]
        +financialCapacity: Money
        +projectionVersion: string
    }

    class TenderEventPublisher {
        -eventBuilder: EventBuilder
        +publishTenderPublished(tenderId)
        +publishEligibilityAssessed(result)
        +publishBidSubmitted(bidId)
        +publishAwardDeclared(tenderId, winnerId)
        +publishKnowledgeRefreshRequested(sourceId)
    }

    TenderPlugin --> TenderEligibilityCapability : uses
    TenderPlugin --> TenderBidAnalysisCapability : uses
    TenderPlugin --> TenderEventPublisher : uses
    TenderEligibilityCapability --> CompanyProfileProjection : reads
    TenderBidAnalysisCapability --> TenderAuthorityAdapter : uses
    TenderAuthorityAdapter --> ITenderAuthorityProvider : injects
    ITenderAuthorityProvider <|-- TenderAuthorityStubProvider : implements
    TenderPlugin ..|> IPluginRuntimeProcess : implements
```
