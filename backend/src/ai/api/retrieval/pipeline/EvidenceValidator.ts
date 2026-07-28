import { RawRetrievalResult } from "./ExecutionEngine";
import { Evidence } from "../models/KnowledgePackage";

export class EvidenceValidator {
    public scoreAndValidate(results: RawRetrievalResult[], workspaceId: string): Evidence[] {
        const validEvidence: Evidence[] = [];
        
        for (const res of results) {
            // Workspace Isolation Policy Enforcer
            if (res.sourceMetadata.workspace && res.sourceMetadata.workspace !== workspaceId) {
                continue; // Sensitive Leakage prevented
            }
            
            // Score Calculation
            const authority = 0.9;
            const freshness = 1.0;
            const completeness = 0.8;
            const trustScore = 0.95;
            const semanticSimilarity = res.score;
            const reputation = 1.0;
            
            const aggregatedConfidence = (authority + freshness + completeness + trustScore + semanticSimilarity + reputation) / 6.0;
            
            if (aggregatedConfidence >= 0.7) { // Threshold
                validEvidence.push({
                    id: `ev-${res.id}`,
                    content: res.content,
                    sourceId: `src-${res.id}`,
                    confidence: aggregatedConfidence,
                    authority,
                    freshness,
                    completeness,
                    trustScore,
                    reputation
                });
            }
        }
        
        return validEvidence;
    }
}
