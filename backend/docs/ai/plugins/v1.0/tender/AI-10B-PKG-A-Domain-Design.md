# AI-10B Package A — Domain Design
## Tender Plugin — Domain Architecture

> **Package:** A — Domain  
> **Sprint:** AI-10B: Tender Plugin Domain Design  
> **Status:** 🟢 APPROVED (AI-10A)  
> **Architecture Locks:** Lock 25 (Domain Read Models), Lock 28 (Workflow Determinism), Lock 32 (Tender Artifact), Lock 33 (Zero Domain Leakage)

---

## A.1 — Bounded Context Map

```mermaid
graph TB
    subgraph TENDER_BC["TENDER BOUNDED CONTEXT"]
        TDoc[TenderDocument]
        TReq[TenderRequirement]
        TElig[TenderEligibility]
        TBid[TenderBid]
        TEval[TenderEvaluation]
        TAward[TenderAward]
        TWS[TenderWorkspace]
        TTL[TenderTimeline]
        TArt[TenderArtifact]
    end

    subgraph COMPANY_BC["COMPANY BOUNDED CONTEXT (External)"]
        CPProj["CompanyProfile Projection\n(Read Model — Lock 25)"]
    end

    subgraph PLATFORM["PLATFORM LAYER (Frozen)"]
        EP["Event Platform"]
        KP["Knowledge Platform"]
        AR["Artifact Registry"]
    end

    TENDER_BC -->|publishes events| EP
    EP -->|CompanyProfileUpdated| CPProj
    CPProj -->|read-only projection| TENDER_BC
    TENDER_BC -->|stores artifacts| AR
    TENDER_BC -->|queries knowledge| KP
```

---

## A.2 — ER Diagram

```mermaid
erDiagram
    TenderDocument {
        string id PK
        string referenceNumber
        string title
        string category
        string procurementType
        string issuingAuthority
        date publishedAt
        date registrationDeadline
        date submissionDeadline
        date openingDate
        string status
        string currency
        float estimatedValue
        string region
        string fundingSource
    }

    TenderRequirement {
        string id PK
        string tenderId FK
        string type
        string description
        boolean mandatory
        string validationRule
        string unit
        float minValue
        float maxValue
    }

    TenderEligibility {
        string id PK
        string tenderId FK
        string companyId
        string status
        string[] passedCriteria
        string[] failedCriteria
        float eligibilityScore
        date assessedAt
        string assessedBy
        string artifactId FK
    }

    TenderBid {
        string id PK
        string tenderId FK
        string companyId
        string status
        float proposedValue
        string currency
        string technicalProposalRef
        string financialProposalRef
        date submittedAt
        string submissionConfirmation
        string artifactId FK
    }

    TenderEvaluation {
        string id PK
        string bidId FK
        string tenderId FK
        float technicalScore
        float financialScore
        float complianceScore
        float overallScore
        string ranking
        string[] evidenceIds
        string reasoningPath
        float confidence
        date evaluatedAt
        string artifactId FK
    }

    TenderAward {
        string id PK
        string tenderId FK
        string winnerId
        string winnerBidId FK
        float awardedValue
        string currency
        date awardedAt
        string contractRef
        string artifactId FK
    }

    TenderWorkspace {
        string id PK
        string tenderId FK
        string companyId
        string[] memberIds
        string status
        date createdAt
        date lastActivityAt
    }

    TenderTimeline {
        string id PK
        string tenderId FK
        string milestoneType
        date scheduledAt
        date completedAt
        boolean completed
        string notes
    }

    TenderArtifact {
        string id PK
        string tenderId FK
        string type
        string version
        string content
        date generatedAt
        string generatedBy
        string checksum
        float confidence
    }

    TenderDocument ||--o{ TenderRequirement : "has"
    TenderDocument ||--o{ TenderEligibility : "assessed via"
    TenderDocument ||--o{ TenderBid : "receives"
    TenderDocument ||--o{ TenderTimeline : "scheduled by"
    TenderDocument ||--o| TenderAward : "concludes with"
    TenderBid ||--o| TenderEvaluation : "evaluated as"
    TenderDocument ||--o{ TenderWorkspace : "managed in"
    TenderEligibility ||--o| TenderArtifact : "stored as"
    TenderBid ||--o| TenderArtifact : "stored as"
    TenderEvaluation ||--o| TenderArtifact : "stored as"
    TenderAward ||--o| TenderArtifact : "stored as"
```

---

## A.3 — Aggregate Design

### Aggregate: TenderDocument (Aggregate Root)
```text
TenderDocument (Aggregate Root)
    ├── id: TenderId (Value Object)
    ├── referenceNumber: ReferenceNumber (VO)
    ├── category: TenderCategory (Enum)
    ├── requirements: TenderRequirement[] (Entity List)
    ├── timeline: TenderTimeline (Entity)
    ├── eligibilityRules: EligibilityRule[] (VO List)
    └── status: TenderStatus (State Machine)
```

### Aggregate: TenderBid (Aggregate Root)
```text
TenderBid (Aggregate Root)
    ├── id: BidId (VO)
    ├── tenderId: TenderId (VO — cross-ref)
    ├── companyId: CompanyId (VO — from Read Model Projection)
    ├── proposedValue: Money (VO)
    ├── technicalProposal: ProposalRef (VO)
    ├── financialProposal: ProposalRef (VO)
    ├── status: BidStatus (State Machine)
    └── artifacts: TenderArtifact[] (Entity List)
```

### Aggregate: TenderEvaluation (Aggregate Root)
```text
TenderEvaluation (Aggregate Root)
    ├── id: EvaluationId (VO)
    ├── bidId: BidId (VO)
    ├── scores: EvaluationScore (VO)
    │   ├── technical: float
    │   ├── financial: float
    │   └── compliance: float
    ├── reasoning: ReasoningRecord (VO — Lock 31)
    │   ├── evidence: Evidence[]
    │   ├── appliedRules: Rule[]
    │   ├── appliedPolicies: Policy[]
    │   ├── constraintResults: Constraint[]
    │   ├── reasoningPath: string[]
    │   └── confidence: float
    └── artifact: TenderArtifact (Entity)
```

### Read Model: CompanyProfileProjection (Lock 25)
```text
CompanyProfileProjection (Read Model — NOT an Aggregate)
    ├── companyId: string
    ├── legalName: string
    ├── trustScore: float
    ├── certifications: string[]
    ├── financialCapacity: Money
    ├── experienceYears: number
    ├── projectCount: number
    └── projectionVersion: string     ← versioned snapshot
```

---

## A.4 — Entity Lifecycle State Diagrams

### TenderDocument Lifecycle
```mermaid
stateDiagram-v2
    [*] --> DRAFT
    DRAFT --> PUBLISHED : publish()
    PUBLISHED --> REGISTRATION_OPEN : openRegistration()
    REGISTRATION_OPEN --> SUBMISSION_OPEN : openSubmission()
    SUBMISSION_OPEN --> EVALUATION : closeSubmission()
    EVALUATION --> AWARDED : declareAward()
    AWARDED --> CLOSED : close()
    PUBLISHED --> CANCELLED : cancel()
    REGISTRATION_OPEN --> CANCELLED : cancel()
    SUBMISSION_OPEN --> CANCELLED : cancel()
    CANCELLED --> [*]
    CLOSED --> [*]
```

### TenderBid Lifecycle
```mermaid
stateDiagram-v2
    [*] --> DRAFT
    DRAFT --> ELIGIBILITY_CHECK : submitForEligibility()
    ELIGIBILITY_CHECK --> ELIGIBLE : eligibilityPassed()
    ELIGIBILITY_CHECK --> INELIGIBLE : eligibilityFailed()
    ELIGIBLE --> BID_PREPARATION : startPreparation()
    BID_PREPARATION --> COMPLIANCE_REVIEW : submitForReview()
    COMPLIANCE_REVIEW --> READY : compliancePassed()
    COMPLIANCE_REVIEW --> REVISION_REQUIRED : complianceFailed()
    REVISION_REQUIRED --> BID_PREPARATION : revise()
    READY --> SUBMITTED : submit()
    SUBMITTED --> EVALUATED : evaluate()
    EVALUATED --> AWARDED : award()
    EVALUATED --> REJECTED : reject()
    INELIGIBLE --> [*]
    AWARDED --> [*]
    REJECTED --> [*]
```

### TenderAward Lifecycle
```mermaid
stateDiagram-v2
    [*] --> PENDING_DECLARATION
    PENDING_DECLARATION --> DECLARED : declare()
    DECLARED --> CONTESTED : contest()
    DECLARED --> ACCEPTED : accept()
    CONTESTED --> REVIEWING : reviewContest()
    REVIEWING --> UPHELD : upholdContest()
    REVIEWING --> DISMISSED : dismissContest()
    UPHELD --> RE_EVALUATION : triggerReEvaluation()
    DISMISSED --> ACCEPTED : accept()
    ACCEPTED --> CONTRACT_SIGNED : signContract()
    CONTRACT_SIGNED --> [*]
