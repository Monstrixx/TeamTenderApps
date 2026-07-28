export class AIRegistry {
  private static instance: AIRegistry;
  
  public capabilities: CapabilityRegistry;
  public prompts: PromptRegistry;
  public tools: ToolRegistry;
  public policies: PolicyRegistry;
  public plugins: PluginRegistry;

  private constructor() {
    this.capabilities = new CapabilityRegistry();
    this.prompts = new PromptRegistry();
    this.tools = new ToolRegistry();
    this.policies = new PolicyRegistry();
    this.plugins = new PluginRegistry();
  }

  public static getInstance(): AIRegistry {
    if (!AIRegistry.instance) {
      AIRegistry.instance = new AIRegistry();
    }
    return AIRegistry.instance;
  }
}

export class CapabilityRegistry {
  private capabilities = new Map<string, any>();

  register(capability: any) {
    this.capabilities.set(capability.id, capability);
  }

  get(id: string) {
    return this.capabilities.get(id);
  }
}

export class PromptRegistry {
  private prompts = new Map<string, any>();

  register(prompt: any) {
    this.prompts.set(prompt.id, prompt);
  }

  get(id: string) {
    return this.prompts.get(id);
  }
}

export class ToolRegistry {
  private tools = new Map<string, any>();

  register(tool: any) {
    this.tools.set(tool.id, tool);
  }

  get(id: string) {
    return this.tools.get(id);
  }
}

export class PolicyRegistry {
  private policies = new Map<string, any>();

  register(policy: any) {
    this.policies.set(policy.id, policy);
  }

  get(id: string) {
    return this.policies.get(id);
  }
}

export class PluginRegistry {
  private plugins = new Map<string, any>();

  register(plugin: any) {
    this.plugins.set(plugin.id, plugin);
    plugin.register(AIRegistry.getInstance());
  }

  get(id: string) {
    return this.plugins.get(id);
  }
}
