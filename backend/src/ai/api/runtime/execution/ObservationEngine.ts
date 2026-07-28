import { CapabilitySession, ObservationRecord } from "./CapabilitySession";

export class ObservationEngine {
    public observe(rawResult: any, latencyMs: number): ObservationRecord {
        return {
            unexpectedBehavior: rawResult?.error !== undefined,
            latencyMs,
            warnings: rawResult?.warnings || [],
            sideEffects: rawResult?.mutations || [],
            confidence: rawResult?.confidence || 0.9,
            resultPayload: rawResult
        };
    }
}

export class EvaluationEngine {
    public evaluate(session: CapabilitySession): boolean {
        // Evaluate the last observation against policy
        const lastObs = session.observations[session.observations.length - 1];
        if (!lastObs) return false;

        // If unexpected behavior or confidence is too low, we need to Replan
        if (lastObs.unexpectedBehavior || lastObs.confidence < 0.7) {
            return true; // Replan Required
        }
        return false; // Success
    }
}
