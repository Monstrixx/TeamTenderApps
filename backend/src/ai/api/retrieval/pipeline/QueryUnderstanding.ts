import { QueryFingerprint } from "../models/RetrievalRequest";

export interface UnderstoodQuery {
    fingerprint: QueryFingerprint;
    intent: string;
    entities: string[];
    constraints: Record<string, any>;
    targetDomain: string;
}

export class QueryUnderstandingEngine {
    public async understand(fingerprint: QueryFingerprint): Promise<UnderstoodQuery> {
        // MVP: Simple keyword extraction
        const words = fingerprint.normalizedQuery.split(" ");
        return {
            fingerprint,
            intent: "INFORMATIONAL",
            entities: words.filter(w => w.length > 4),
            constraints: {},
            targetDomain: "GENERAL"
        };
    }
}

export class QueryExpansionEngine {
    public async expand(understood: UnderstoodQuery): Promise<string[]> {
        // MVP: Basic expansion mechanism
        const expansions = [...understood.entities];
        if (understood.fingerprint.normalizedQuery.includes("beton")) {
            expansions.push("Concrete", "Ready Mix", "fc20", "SNI Beton");
        }
        return expansions;
    }
}
