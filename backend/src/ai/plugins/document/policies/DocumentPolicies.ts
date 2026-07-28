import { CognitiveEngine, ExecutionContext } from "../../../shared/CognitiveEngine";

export class DocumentCompliancePolicy implements CognitiveEngine<any, any> {
    async execute(input: any, context: ExecutionContext): Promise<any> {
        const hasValidFingerprint = !!input.sha256;
        const confidenceOk = (input.confidence ?? 1.0) >= 0.85;
        const allowed = hasValidFingerprint && confidenceOk;
        return {
            allowed,
            policyId: "document.policy.compliance",
            checks: { hasValidFingerprint, confidenceOk },
            reason: allowed ? "Document compliance policy satisfied." : "Document compliance policy failed: confidence below threshold or missing fingerprint."
        };
    }
}
