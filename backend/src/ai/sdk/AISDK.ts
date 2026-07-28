import { AIRequest, AIResponse } from '../shared/AIContracts';

export interface AISDK {
  goal(goalId: string): this;
  capability(capabilityId: string): this;
  workflow(workflowId: string): this;
  tool(toolId: string): this;
  memory(memoryId: string): this;
  
  execute(payload?: any): Promise<AIResponse>;
  
  ask(context: any, prompt: string): Promise<AIResponse>;
  plan(goalId: string): Promise<AIResponse>;
  retrieve(query: string): Promise<AIResponse>;
}
