export interface ObservationRecord {
    unexpectedBehavior: boolean;
    latencyMs: number;
    warnings: string[];
    sideEffects: string[];
    confidence: number;
    resultPayload: any;
}

export class CapabilitySession {
    public readonly sessionId: string;
    public toolCalls: string[] = [];
    public observations: ObservationRecord[] = [];
    public artifacts: string[] = []; // artifactIds
    public retryCount: number = 0;

    constructor(public readonly capabilityId: string, public readonly processId: string) {
        this.sessionId = `sess-${Date.now()}`;
    }

    public recordObservation(obs: ObservationRecord): void {
        this.observations.push(obs);
    }
}
