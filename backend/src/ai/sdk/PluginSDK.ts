export interface PluginSDK {
  // Lifecycle
  register(): void;
  initialize(): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
  dispose(): Promise<void>;

  // Registry
  registerCapability(manifest: any): void;
  registerWorkflow(manifest: any): void;
  registerTool(manifest: any): void;
  registerKnowledge(manifest: any): void;
  registerPolicy(policy: any): void;
  registerEvent(event: any): void;
  registerPrompt(prompt: any): void;
  registerAdapter(adapter: any): void;
}
