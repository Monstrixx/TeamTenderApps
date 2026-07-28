export enum EventClassification {
  DOMAIN = "DOMAIN",
  SYSTEM = "SYSTEM",
  AUDIT = "AUDIT",
  TELEMETRY = "TELEMETRY",
  AI = "AI",
  SECURITY = "SECURITY"
}

export enum EventPriority {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  NORMAL = "NORMAL",
  LOW = "LOW"
}

export enum PIIClassification {
  NONE = "NONE",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export interface CognitiveEvent<T = any> {
  eventId: string;
  eventType: string; // e.g. "GoalCreated"
  classification: EventClassification;
  priority: EventPriority;
  pii: PIIClassification;
  
  aggregateId: string;
  aggregateType: string;
  workspaceId: string;
  timestamp: Date;
  version: number;
  payload: T;
  
  // Observability & Traceability
  correlationId: string;
  causationId: string;
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  
  metadata: any;
}

export interface RetryPolicy {
  maxRetries: number;
  initialBackoff: number;
  maxBackoff: number;
  multiplier: number;
}

export interface EventSubscriber {
  id: string;
  name: string;
  subscribeTo(): string[];
  priority(): number;
  concurrency(): number;
  retryPolicy(): RetryPolicy;
  handle(event: CognitiveEvent): Promise<void>;
}
