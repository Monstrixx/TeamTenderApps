export interface AIRequest {
  systemPrompt: string;
  userPrompt: string;
  outputSchema?: any;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  content: any; // Parsed JSON if outputSchema is provided, else string
  provider: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  latencyMs: number;
  estimatedCost: number;
}

export interface IAIProvider {
  id: string;
  generate(request: AIRequest): Promise<AIResponse>;
}
