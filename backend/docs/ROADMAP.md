# TeamTender AI - Strategic Roadmap

This document captures the strategic enhancements and evolutionary milestones planned for the TeamTender platform, ensuring the system remains scalable, AI-ready, and future-proof.

## Backlog / Upcoming Enhancements (Post Wave 5)

### 1. Resume Versioning
To ensure historical accuracy and AI-context persistence, generated resumes will be stored as distinct artifacts.
- **Entity**: `PersonnelResume`
- **Fields**: `personnelId`, `template`, `version`, `generatedAt`, `generatedBy`, `tenderId`
- **Goal**: Every tender can have a differently tailored version of the CV without overwriting previous or standard versions.

### 2. Verification Cache
Reduce load on external credential providers (LPJK, BNSP) and improve system latency by caching verification results.
- **Entity/Mechanism**: `VerificationCache`
- **Fields**: `certificateNumber`, `provider`, `verifiedAt`, `ttl`
- **Goal**: Reuse valid cache data before triggering a new external verification request.

### 3. Feature Versioning
Keep track of how and when AI features were extracted to maintain algorithmic consistency.
- **Updates to `PersonnelFeatureVector`**: Add `featureVersion`, `generatedBy`, `generatedAt`.
- **Goal**: When the extraction algorithm updates, the system knows exactly which version of the features the embedding represents.

### 4. Skill Taxonomy
Move from free-text skill names to a master taxonomy tree to improve AI matching accuracy.
- **Entity**: `SkillMaster` / `Taxonomy`
- **Structure**: Hierarchical (e.g., Engineering -> Structural -> BIM)
- **Goal**: Standardize skill datasets to enable highly precise semantic searches and AI gap-analysis.

### 5. Credential Intelligence
Provide derived logic and health scoring for credentials dynamically.
- **Metric**: `CredentialHealth` (Valid, Near Expiry, Expired) combined with `Verification Confidence`.
- **Goal**: Expose a unified computed health score through the service layer so both the UI dashboards and the AI engines operate on the same logic.

### 6. Document Processing Status
Separate storage status and processing status for better pipeline monitoring.
- **`StorageStatus`**: `UPLOADED`, `STORED`, `ARCHIVED`
- **`ProcessingStatus`**: `PENDING`, `OCR_RUNNING`, `OCR_COMPLETED`, `EXTRACTION_COMPLETED`, `EMBEDDING_COMPLETED`, `FAILED`

### 7. Idempotent Processing
Ensure each AI stage can be re-run safely without producing duplicate data.
- **Flow**: OCR -> Check if OCR Exists -> Yes: Skip/Rebuild -> No: Execute.
- **Goal**: Facilitate easy re-processing when OCR or AI models are updated.

### 8. Extraction Versioning
Add metadata to track the extraction process.
- **Fields**: `ExtractionVersion`, `OCREngine`, `AIModel`, `GeneratedAt`.
- **Goal**: Ensure older extractions remain reproducible and auditable.

### 9. Search Index (`DocumentSearchIndexService`)
Maintain consistency with Supplier and Personnel domains by abstracting document indexing.
- **Indexed Fields**: Display name, document type, essential metadata, raw OCR text.

### 10. Document Lineage
Establish parent-child relationships for derived documents (e.g. signed documents, OCR text dumps).
- **Structure**: Parent Document -> Derived Document.
- **Goal**: Improve traceability of artifact origins.

### 11. Background Processing Orchestration
Document and formalize the AI pipeline as an event-driven orchestration layer.
- **Events**: `DOCUMENT_UPLOADED` -> `Virus Scan` -> `DOCUMENT_HASHED` -> `OCR Job` -> `DOCUMENT_OCR_COMPLETED` -> `Extraction Job` -> `DOCUMENT_EXTRACTION_COMPLETED` -> `Embedding Job` -> `DOCUMENT_EMBEDDING_CREATED`.
- **Goal**: Enable infinite scalability as document volume grows.

### 12. Knowledge Graph Foundation (Wave 6/7)
Transition from rigid relational structures to a graph-based entity relation model for AI processing.
- **Nodes**: Supplier, Person, Project, Equipment, Document, SKK, Experience.
- **Goal**: Unlock capabilities for Semantic Search, Relationship Discovery, AI Recommendations, Conflict Detection, and Duplicate Detection.

### 13. AI Explainability
Ensure all AI outputs provide human-readable justifications.
- **Service**: `AIExplanationService`
- **Goal**: Instead of just a "92% match", the system will state reasons (e.g., matching SKK, 12 similar projects, 9 years of experience) to build user trust.

### 14. AI Feedback Loop
Enable user feedback on AI recommendations to create learning datasets.
- **Flow**: Recommendation -> Accepted/Rejected/Edited -> Learning Dataset.
- **Goal**: Establish the foundation for continuous AI improvement natively within the platform.

### 15. AI Prompt Versioning
Store exact metadata for every generative feature executed.
- **Metadata**: `PromptTemplate`, `version`, `provider`, `model`, `temperature`, `createdAt`.
- **Goal**: Allow reproducibility and strict auditing of AI-generated content (Resumes, Tender Docs, Summaries).

### 16. Semantic Search Layer
A dedicated unification layer for vector searches across all domains.
- **Service**: `SemanticSearchService`
- **Goal**: Combine Supplier, Personnel, Equipment, Document, and Tender data through embeddings and vector searches in Wave 6.

### 17. AI Governance & Audit
Ensure AI operations meet enterprise and governmental compliance standards.
- **Entity**: `AIAudit`
- **Fields**: Prompt, Model, Input, Output, Reviewer.
- **Goal**: Support transparency and auditability for sensitive government/BUMN deployments.

### 18. Domain Event Catalog
Centralized, official registry of all domain events across the platform.
- **Fields**: Name, payload, publisher, subscriber, version.
- **Goal**: Simplify cross-module integrations as the event volume grows.

### 19. AI Capability Registry
Explicit registration of all AI contracts and capabilities.
- **Capabilities**: Resume Matching, OCR, Classification, Extraction, Recommendation, Risk Scoring.
- **Goal**: Provide clear API contracts and boundaries for all intelligence services.

### 20. AI Policy Engine
Establish a policy layer to dictate generative AI boundaries and data usage.
- **Policies**: Allowed models, PII constraints, human-approval requirements.
- **Goal**: Ensure AI output complies with legal and business rules before processing continues.

### 21. AI Evaluation Framework
Systematically measure the quality of AI outputs over time.
- **Metrics**: Accuracy, Hallucination, Citation validity, Confidence, Human review score.
- **Goal**: Facilitate confident A/B testing of different prompts or underlying models.

### 22. Feature Store
Isolate AI feature extraction into a shared service.
- **Flow**: Extracted metadata from Personnel/Supplier/Document -> Feature Store.
- **Goal**: Avoid re-extracting the same data for different models and standardize input features.

### 23. Unified Recommendation Engine
Abstract recommendation logic from individual domains into a single orchestrator.
- **Operation**: Domain returns scores -> Engine aggregates and ranks.
- **Goal**: Consistently rank cross-domain entities (Personnel, Supplier, Equipment) for Tender requirements.

### 24. Rule Engine
Separate deterministic business logic from probabilistic AI models.
- **Example**: If `SKK.isExpired()`, then automatically reject without calling the LLM.
- **Goal**: Lower inference costs, increase predictability, and simplify auditing for hard constraints.

### 25. AI Observability
Operational monitoring tailored for AI workloads.
- **Metrics**: Inference latency, OCR success rate, verification cache hits, embedding failures, token usage.
- **Goal**: Maintain platform stability and cost-efficiency as AI usage scales.

### 26. Domain Contract Registry
A formal registry for inter-domain API contracts.
- **Contracts**: Personnel API, Supplier API, Document API, Tender API.
- **Goal**: Streamline dependency management and versioning across the modular monolith.

---

## Roadmap Phases

### Wave 5 - Foundation Domains (In Progress)
Building the robust operational data layers.
- Workspace
- Company
- Supplier
- Personnel
- Document *(Completed)*
- **Tender** *(Completed)*

### Wave 6 - Operational Intelligence
Delivering business value through applied AI.

#### 1. Recommendation Orchestrator
Instead of every AI being called directly by the TenderEvaluationService, introduce a single orchestrator.
- **Flow**: Tender -> Recommendation Orchestrator -> Personnel AI -> Equipment AI -> Document AI -> Supplier Risk -> Final Recommendation.
- **Goal**: Make the AI pipeline highly modular.

#### 2. Decision Trace
Every AI recommendation should produce a decision trace.
- **Fields**: Evidence, Reason, Confidence, Model Version.
- **Goal**: Crucial for auditability and explainability.

#### 3. AI Job Queue
Run all AI processes as background jobs.
- **Flow**: Tender Published -> Queue -> Personnel Matching -> Equipment Matching -> Document Analysis -> Risk Analysis -> Recommendation Ready.
- **Goal**: Ensure the main business processes remain responsive.

#### 4. Recommendation Snapshot
Store a snapshot of recommendation results at a specific point in time.
- **Goal**: Ensure future AI model changes do not alter historical tender evaluation results.

#### Existing Features
- Resume AI
- Matching AI
- Semantic Search
- Credential Intelligence
- Document Intelligence
- Recommendation Engine

### Wave 7 - Enterprise AI
Strengthening governance, quality, and knowledge mapping.
- Knowledge Graph
- Explainability
- Feedback Loop
- Prompt Versioning
- AI Governance
- Policy Engine
- Evaluation Framework

### Wave 8 - Autonomous Platform
Moving towards continuous learning and automation.
- AI Copilot
- Continuous Learning
- Predictive Analytics
- Workflow Automation
