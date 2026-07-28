import { IAIProvider, AIRequest, AIResponse } from './IAIProvider';

export class LLMGateway {
  private provider: IAIProvider;
  
  constructor(provider: IAIProvider) {
    this.provider = provider;
  }
  
  public async execute(request: AIRequest): Promise<AIResponse> {
    // Middleware Pipeline Placeholder
    // 1. Rate Limiting Middleware
    // 2. Cache Checking Middleware
    // 3. Moderation Middleware (check for PII/toxicity in prompt)
    
    // Execute Request via Provider
    let response: AIResponse;
    try {
      response = await this.provider.generate(request);
    } catch (err) {
      // 4. Retry Middleware could catch and retry here
      throw err;
    }
    
    // 5. Telemetry / Logging Middleware (log tokens, latency, cost)
    // 6. Response Moderation Middleware
    
    return response;
  }
}
