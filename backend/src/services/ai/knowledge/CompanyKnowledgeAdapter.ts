import { IKnowledgeAdapter, IKnowledgeCapability } from './KnowledgeRegistry';

export class CompanyKnowledgeAdapter implements IKnowledgeAdapter {
  public capability: IKnowledgeCapability = {
    domain: 'COMPANY',
    canBuildNode: true,
    canBuildEdge: true,
    canBuildEmbedding: true,
    canRetrieve: true,
  };

  async extractNodes(entityId: string): Promise<any[]> {
    console.log(`[CompanyKnowledgeAdapter] Extracting nodes for company ${entityId}`);
    
    // In a real app, query Prisma for Company, Portfolios, Products
    const companyNode = {
      id: `node-company-${entityId}`,
      entityId,
      label: "Tech Build Co.",
      nodeType: "COMPANY",
      domain: "COMPANY",
      properties: {
        content: "Tech Build Co. is a leading construction firm specializing in sustainable architecture."
      }
    };

    const portfolioNode = {
      id: `node-portfolio-101`,
      entityId: "101",
      label: "Green Bridge Project",
      nodeType: "PORTFOLIO",
      domain: "COMPANY",
      properties: {
        content: "Built a 500m green bridge in 2025 using recycled materials."
      }
    };

    return [companyNode, portfolioNode];
  }

  async extractEdges(entityId: string): Promise<any[]> {
    console.log(`[CompanyKnowledgeAdapter] Extracting edges for company ${entityId}`);
    
    return [
      {
        sourceId: `node-company-${entityId}`,
        targetId: `node-portfolio-101`,
        predicate: "COMPLETED_PROJECT",
        direction: "DIRECTED",
        confidence: 1.0,
        source: "SYSTEM",
        weight: 1.0
      }
    ];
  }
}
