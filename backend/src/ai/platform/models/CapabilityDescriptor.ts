export interface CapabilityDescriptor {
    semanticId: string;
    aliases: string[];
    category: string;
    maturity: string; // e.g., ALPHA, BETA, STABLE
    inputSchema: Record<string, any>; // JSON Schema
    outputSchema: Record<string, any>; // JSON Schema
    estimatedCostUsd: number;
    slaMs: number;
    telemetryTags: string[];
}
