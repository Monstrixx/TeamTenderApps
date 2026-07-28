export interface AIRequest {
  requestId: string;
  workspaceId: string;
  conversationId?: string;
  goalId?: string;
  capability?: string;
  payload: any;
  metadata: any;
}

export interface AIResponse {
  requestId: string;
  status: string; // e.g. "SUCCESS", "FAILED", "WAITING_APPROVAL"
  result: any;
  artifacts: Array<Suggestion | Plan | Report | Document | Graph | KnowledgeSnapshot>;
  telemetry: any;
  events: any[];
  warnings: any[];
  errors: any[];
}

// Discriminant union types for artifacts to ensure strict type checking
export interface Suggestion { type: "Suggestion"; data: any; }
export interface Plan { type: "Plan"; data: any; }
export interface Report { type: "Report"; data: any; }
export interface Document { type: "Document"; data: any; }
export interface Graph { type: "Graph"; data: any; }
export interface KnowledgeSnapshot { type: "KnowledgeSnapshot"; data: any; }
