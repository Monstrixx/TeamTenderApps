import { RetrievalRequest } from "../models/RetrievalRequest";
import { KnowledgePackage, KnowledgePackageLifecycle } from "../models/KnowledgePackage";
import { QueryNormalizer } from "./QueryNormalizer";
import { RetrievalCacheLayer } from "./RetrievalCacheLayer";
import { QueryUnderstandingEngine, QueryExpansionEngine } from "./QueryUnderstanding";
import { CostBasedPlanner } from "./CostBasedPlanner";
import { ExecutionEngine } from "./ExecutionEngine";
import { FusionEngine } from "./FusionEngine";
import { EvidenceValidator } from "./EvidenceValidator";
import { KnowledgePackageBuilder } from "./KnowledgePackageBuilder";

export class RetrievalPipeline {
    constructor(
        private normalizer = new QueryNormalizer(),
        private cache = new RetrievalCacheLayer(),
        private understanding = new QueryUnderstandingEngine(),
        private expansion = new QueryExpansionEngine(),
        private planner = new CostBasedPlanner(),
        private executor = new ExecutionEngine(),
        private fusion = new FusionEngine(),
        private validator = new EvidenceValidator(),
        private builder = new KnowledgePackageBuilder()
    ) {}

    public async execute(request: RetrievalRequest): Promise<KnowledgePackage> {
        // 1. Normalization & Fingerprinting
        const fingerprint = this.normalizer.normalize(request);
        
        // 2. Cache Check
        const cachedPkg = await this.cache.get(fingerprint);
        if (cachedPkg) {
            return cachedPkg;
        }
        
        // 3. Query Understanding & Expansion
        const understood = await this.understanding.understand(fingerprint);
        const keywords = await this.expansion.expand(understood);
        
        // 4. Cost-Based Planner
        const strategies = this.planner.plan(keywords);
        
        // 5. Execution (Multi-strategy)
        const rawResults = await this.executor.execute(strategies, keywords);
        
        // 6. Fusion & Re-ranking
        const fusedResults = this.fusion.fuse([rawResults]);
        
        // 7. Evidence Scoring & Validation (Policy Enforcement)
        const validEvidence = this.validator.scoreAndValidate(fusedResults, request.workspaceId);
        
        // 8. Knowledge Package Construction
        const pkg = this.builder.build(fingerprint, validEvidence);
        
        // 9. Cache Store
        await this.cache.set(fingerprint, pkg);
        
        return pkg;
    }
}
