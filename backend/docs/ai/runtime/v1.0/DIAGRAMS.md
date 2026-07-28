# DIAGRAMS: AI-06 Architecture Visualizations

## 1. Component Diagram
```mermaid
graph TD
    A[Plugin SDK / Client] -->|Search Request| B[AI.retrieve Fluent API]
    B --> C[Query Normalizer & Fingerprint]
    C --> D[Retrieval Cache Layer]
    D -.->|Cache Miss| E[Query Understanding & Expansion]
    E --> F[Cost-Based Planner]
    F --> G[Strategy Runner (Vector/Graph/SQL)]
    G --> H[Fusion & RRF Engine]
    H --> I[Evidence Scoring]
    I --> J[Retrieval Context Builder]
    J --> K[Immutable Knowledge Package]
    K -.->|Cache Store| D
```

## 2. Sequence Diagram (Pipeline Execution)
```mermaid
sequenceDiagram
    participant SDK as AI SDK
    participant QN as Query Normalizer
    participant Cache as Cache Layer
    participant Plan as Cost-Based Planner
    participant Exec as Strategy Runner
    participant Build as Context Builder

    SDK->>QN: send(rawQuery)
    QN->>Cache: generateFingerprint()
    alt Cache Hit
        Cache-->>SDK: return KnowledgePackage
    else Cache Miss
        Cache->>Plan: getStrategies(cost, latency)
        Plan->>Exec: execute(Strategies)
        Exec->>Build: fuse(Results)
        Build->>Build: scoreEvidence & enforcePolicy
        Build-->>Cache: store(KnowledgePackage)
        Build-->>SDK: return KnowledgePackage
    end
```

## 3. State Diagram (Knowledge Package Lifecycle)
```mermaid
stateDiagram-v2
    [*] --> CREATED: Kueri dimengerti
    CREATED --> VALIDATED: Kebijakan diizinkan
    VALIDATED --> PACKAGED: RRF & Context digabung
    PACKAGED --> DELIVERED: Menuju Agent / SDK
    DELIVERED --> CONSUMED: Agent mengekstrak Evidence
    CONSUMED --> EXPIRED: Batas TTL Cache habis
    EXPIRED --> ARCHIVED: Tersimpan ke Event Store
    ARCHIVED --> [*]
```
