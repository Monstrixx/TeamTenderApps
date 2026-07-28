import { KnowledgeRegistry } from './KnowledgeRegistry';
import { EmbeddingPipeline } from './EmbeddingPipeline';
import { KnowledgeAuditor } from './KnowledgeAuditor';

export class KnowledgeBuilder {
  private registry = KnowledgeRegistry.getInstance();
  private embeddingPipeline: EmbeddingPipeline;

  constructor(embeddingPipeline: EmbeddingPipeline) {
    this.embeddingPipeline = embeddingPipeline;
  }

  // Triggered by "Entity Changed" Event
  async buildKnowledge(domain: string, entityId: string, rawData: any): Promise<void> {
    const adapter = this.registry.adapters.get(domain);
    if (!adapter) throw new Error(`No adapter registered for domain: ${domain}`);

    console.log(`[KnowledgeBuilder] Starting build for ${domain} entity ${entityId}...`);
    
    // 1. Extract Nodes and Edges using Adapter
    const nodes = await adapter.extractNodes(entityId);
    const edges = await adapter.extractEdges(entityId);

    // 2. Validate Nodes and Edges
    const validator = this.registry.validators.get(domain);
    if (validator) {
      nodes.forEach(n => validator.validateNode(n));
      edges.forEach(e => validator.validateEdge(e));
    }

    // 3. Process through Embedding Pipeline
    for (const node of nodes) {
      if (node.properties?.content) {
        const refId = await this.embeddingPipeline.process(node.properties.content, { nodeId: node.id });
        node.embeddingReference = refId;
      }
    }

    // 4. Create Snapshot & Save to DB
    const snapshotId = `snapshot-${Date.now()}`;
    console.log(`[KnowledgeBuilder] Created Snapshot ${snapshotId} with ${nodes.length} nodes, ${edges.length} edges.`);
    
    // Check Integrity KPI
    KnowledgeAuditor.checkIntegrity(snapshotId);
    
    // Check Coverage KPI
    KnowledgeAuditor.logCoverage(domain, 95);

    // 5. Fire KnowledgeReady Event
    this.fireEvent('KnowledgeReady', { snapshotId, domain, entityId });
  }

  private fireEvent(eventName: string, payload: any) {
    // Integrate with Event Platform (Pub/Sub)
    console.log(`[EventPlatform] Fired ${eventName} event:`, payload);
  }
}
