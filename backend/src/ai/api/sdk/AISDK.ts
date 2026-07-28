import { RetrievalPipeline } from "../retrieval/pipeline/Pipeline";
import { RetrievalRequest } from "../retrieval/models/RetrievalRequest";
import { KnowledgePackage, Evidence } from "../retrieval/models/KnowledgePackage";
import { AgentFluentAPI } from "./AgentSDK";

export class RetrievalFluentAPI {
    private request: Partial<RetrievalRequest> = {};
    private pipeline = new RetrievalPipeline();

    constructor(query: string, workspaceId: string) {
        this.request.query = query;
        this.request.workspaceId = workspaceId;
    }

    public strategy(strategyType: string): this {
        if (!this.request.preferredStrategies) this.request.preferredStrategies = [];
        this.request.preferredStrategies.push(strategyType);
        return this;
    }

    public topK(limit: number): this {
        this.request.topK = limit;
        return this;
    }

    public async execute(): Promise<KnowledgePackage> {
        if (!this.request.query || !this.request.workspaceId) {
            throw new Error("Missing query or workspaceId in Retrieval request.");
        }
        return this.pipeline.execute(this.request as RetrievalRequest);
    }
}

export class AISDK {
    public static agents = new AgentFluentAPI();
    
    public static retrieve(query: string, workspaceId: string): RetrievalFluentAPI {
        return new RetrievalFluentAPI(query, workspaceId);
    }
}
