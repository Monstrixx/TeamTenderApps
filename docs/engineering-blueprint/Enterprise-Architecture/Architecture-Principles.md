# Architecture Principles

These principles guide all technical and architectural decisions within the TeamTender platform. 

1. **Every Capability owns one Domain**
   Business capabilities map 1:1 to Domain boundaries, ensuring clear ownership and avoiding distributed monoliths.

2. **Every Domain owns its Aggregate**
   Domains have exclusive write access to their Aggregate Roots. Other domains cannot bypass the API or Event Bus to modify data directly in another domain's database.

3. **Every Aggregate emits Events**
   When an Aggregate Root changes state, it must emit a Domain Event to the Event Bus to notify the rest of the system, enabling eventual consistency and decoupled communication.

4. **Every Event is Observable**
   All events flowing through the system must be logged and traceable via a unique Trace ID, enabling distributed tracing and easier debugging.

5. **Single Source of Truth**
   Data is never duplicated for primary processing. The domain that creates the data is the sole owner and source of truth. Read-only materialized views may exist in the analytics layer, but they are derived, not primary.

6. **Provider Independence**
   Core capabilities, especially AI and Cloud Infrastructure, must be abstracted to prevent vendor lock-in (e.g., using an LLM Gateway instead of direct API calls, and standardizing container orchestration).

7. **Human Approval for AI Decisions**
   AI agents may prepare, draft, and recommend actions, but any action that modifies core business state or interacts with external entities (e.g., sending a bid) requires explicit human approval.
