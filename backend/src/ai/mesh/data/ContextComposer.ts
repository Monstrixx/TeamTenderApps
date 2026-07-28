import { AIRequest } from '../../shared/AIContracts';

export interface ContextPlugin {
  name: string;
  build(request: AIRequest, currentContext: any): Promise<any>;
}

export class ContextComposer {
  private plugins: ContextPlugin[] = [];

  registerPlugin(plugin: ContextPlugin) {
    this.plugins.push(plugin);
  }

  async compose(request: AIRequest): Promise<any> {
    let context = {};
    for (const plugin of this.plugins) {
      context = await plugin.build(request, context);
    }
    return context;
  }
}
