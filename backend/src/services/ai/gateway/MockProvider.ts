import { IAIProvider, AIRequest, AIResponse } from './IAIProvider';

export class MockProvider implements IAIProvider {
  public id = 'mock';

  public async generate(request: AIRequest): Promise<AIResponse> {
    const startTime = Date.now();
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let content: any = "This is a mock response from AI.";
    
    // If output schema is provided, try to mock a valid JSON matching the schema
    if (request.outputSchema && request.outputSchema.type === 'object') {
      const mockObj: any = {};
      const props = request.outputSchema.properties || {};
      for (const key of Object.keys(props)) {
        if (props[key].type === 'string') mockObj[key] = `Mocked ${key}`;
        if (props[key].type === 'number') mockObj[key] = 42;
        if (props[key].type === 'boolean') mockObj[key] = true;
        if (props[key].type === 'array') mockObj[key] = [`Mocked item 1`, `Mocked item 2`];
      }
      content = mockObj;
    }
    
    const latencyMs = Date.now() - startTime;
    
    return {
      content,
      provider: 'MockProvider',
      model: 'mock-v1',
      promptTokens: request.userPrompt.length / 4, // rough estimate
      completionTokens: JSON.stringify(content).length / 4,
      latencyMs,
      estimatedCost: 0.0001
    };
  }
}
