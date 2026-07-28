export interface RetrievalStrategyDef {
    id: string;
    type: string;
    estimatedLatencyMs: number;
    estimatedCost: number;
    baseConfidence: number;
}

export class CostBasedPlanner {
    private availableStrategies: RetrievalStrategyDef[] = [
        { id: "VECTOR_NATIVE", type: "VECTOR", estimatedLatencyMs: 60, estimatedCost: 0.001, baseConfidence: 0.96 },
        { id: "GRAPH_LOCAL", type: "GRAPH", estimatedLatencyMs: 20, estimatedCost: 0.0001, baseConfidence: 0.82 },
        { id: "HYBRID_FUSION", type: "HYBRID", estimatedLatencyMs: 95, estimatedCost: 0.002, baseConfidence: 0.99 }
    ];

    public plan(expansions: string[], budgetMs: number = 200): RetrievalStrategyDef[] {
        // Evaluate and pick strategies that fit within budget and give highest confidence
        // MVP: Just pick Hybrid if budget allows, else Vector.
        if (budgetMs >= 95) {
            return [this.availableStrategies.find(s => s.id === "HYBRID_FUSION")!];
        }
        return [this.availableStrategies.find(s => s.id === "VECTOR_NATIVE")!];
    }
}
