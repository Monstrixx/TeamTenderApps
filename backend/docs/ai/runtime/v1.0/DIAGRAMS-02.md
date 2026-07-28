# DIAGRAMS-02: Agent Runtime Enterprise Models

## 1. PROCESS MODEL (Parent-Child Agents)
```mermaid
graph TD
    Parent[Executive Agent PID_100]
    Child1[Research Agent PID_101]
    Child2[Planner Agent PID_102]
    
    Parent -->|Spawn| Child1
    Parent -->|Spawn| Child2
    Child1 -->|Complete / Join| Parent
    Child2 -->|Complete / Join| Parent
```

## 2. STATE MODEL (Agent Lifecycle)
```mermaid
stateDiagram-v2
    [*] --> CREATED
    CREATED --> INITIALIZED
    INITIALIZED --> READY
    READY --> PLANNING
    PLANNING --> EXECUTING
    PLANNING --> WAITING_APPROVAL
    WAITING_APPROVAL --> EXECUTING
    EXECUTING --> OBSERVING
    OBSERVING --> REPLANNING
    REPLANNING --> PLANNING
    OBSERVING --> COMPLETED
    COMPLETED --> ARCHIVED
    ARCHIVED --> [*]
```

## 3. RUNTIME MODEL (Scheduler & Mailbox)
```mermaid
graph LR
    Goal -->|Msg| MB[Mailbox]
    MB --> AQ[Approval Queue]
    MB --> PQ[Priority Queue]
    PQ --> PID[Agent Process]
    PID --> Mesh[Service Mesh]
```

## 4. SECURITY MODEL (Memory Broker & Workspace)
```mermaid
graph TD
    Agent[Agent PID] -->|Query| MemBroker[Memory Broker]
    MemBroker -->|Isolate Workspace| DB[(Memory DB)]
    Agent -->|Write| ArtReg[Artifact Registry]
```

## 5. DEPLOYMENT MODEL (Era-2 Freeze Architecture)
```mermaid
graph BT
    P[Domain Plugins] --> SDK[Plugin SDK]
    SDK --> AR[Agent Runtime]
    AR --> KAL[Knowledge Access Layer]
    KAL -->|Read Only| Core[AI Core Kernel]
```
