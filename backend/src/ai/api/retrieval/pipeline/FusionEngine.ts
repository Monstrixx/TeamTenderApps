import { RawRetrievalResult } from "./ExecutionEngine";

export class FusionEngine {
    public fuse(resultsGroups: RawRetrievalResult[][]): RawRetrievalResult[] {
        // Reciprocal Rank Fusion (RRF) MVP implementation
        const scores: Map<string, number> = new Map();
        const k = 60; // RRF constant
        
        const mergedMap = new Map<string, RawRetrievalResult>();

        for (const results of resultsGroups) {
            results.forEach((res, index) => {
                const rank = index + 1;
                const rrfScore = 1.0 / (k + rank);
                
                scores.set(res.id, (scores.get(res.id) || 0) + rrfScore);
                if (!mergedMap.has(res.id)) {
                    mergedMap.set(res.id, res);
                }
            });
        }

        const sortedIds = Array.from(scores.entries())
            .sort((a, b) => b[1] - a[1])
            .map(entry => entry[0]);

        return sortedIds.map(id => {
            const doc = mergedMap.get(id)!;
            doc.score = scores.get(id)!;
            return doc;
        });
    }
}
