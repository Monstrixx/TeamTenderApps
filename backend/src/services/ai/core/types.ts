export interface AIPolicy {
  id: string;
  name: string;
  allowedProviders: string[]; // e.g. ["mock", "openai"]
  allowedTools: string[]; // e.g. ["search", "document_reader"]
  allowedSections: string[]; // e.g. ["identity", "experience", "seo"]
  approvalRequired: boolean;
  maxTokens: number;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  inputSchema: any; // JSON Schema
  outputSchema: any; // JSON Schema
  permission: string; // e.g. "COMPANY_READ"
  handler: (input: any, context: any) => Promise<any>;
}

export interface PromptVersion {
  version: number;
  systemPrompt: string;
  userTemplate: string;
  outputSchema: any; // JSON Schema
  temperature: number;
  tags: string[];
}

export interface AICapability {
  id: string;
  name: string;
  description: string;
  policyId: string; // Reference to AIPolicy
  promptVersions: PromptVersion[];
  activeVersion: number;
  validator?: (output: any) => boolean;
  mapper?: (output: any, context: any) => any; // Returns AISuggestion payload
}

export interface AIPlugin {
  id: string;
  name: string;
  register: (registry: any) => void;
}
