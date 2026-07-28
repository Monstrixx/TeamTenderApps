export interface IKnowledgeCapability {
  domain: string;
  canBuildNode: boolean;
  canBuildEdge: boolean;
  canBuildEmbedding: boolean;
  canRetrieve: boolean;
}

export interface IKnowledgeAdapter {
  capability: IKnowledgeCapability;
  extractNodes(entityId: string): Promise<any[]>;
  extractEdges(entityId: string): Promise<any[]>;
}

export interface IKnowledgeBuilder {
  buildNode(nodeData: any): Promise<any>;
  buildEdge(edgeData: any): Promise<any>;
}

export interface IKnowledgeValidator {
  validateNode(nodeData: any): boolean;
  validateEdge(edgeData: any): boolean;
}

export interface IKnowledgeIndexer {
  indexNode(nodeId: string): Promise<void>;
}

export class KnowledgeRegistry {
  private static instance: KnowledgeRegistry;

  public adapters = new Map<string, IKnowledgeAdapter>();
  public builders = new Map<string, IKnowledgeBuilder>();
  public validators = new Map<string, IKnowledgeValidator>();
  public indexers = new Map<string, IKnowledgeIndexer>();

  private constructor() {}

  public static getInstance(): KnowledgeRegistry {
    if (!KnowledgeRegistry.instance) {
      KnowledgeRegistry.instance = new KnowledgeRegistry();
    }
    return KnowledgeRegistry.instance;
  }

  registerAdapter(adapter: IKnowledgeAdapter) {
    this.adapters.set(adapter.capability.domain, adapter);
  }

  registerBuilder(domain: string, builder: IKnowledgeBuilder) {
    this.builders.set(domain, builder);
  }

  registerValidator(domain: string, validator: IKnowledgeValidator) {
    this.validators.set(domain, validator);
  }

  registerIndexer(domain: string, indexer: IKnowledgeIndexer) {
    this.indexers.set(domain, indexer);
  }
}
