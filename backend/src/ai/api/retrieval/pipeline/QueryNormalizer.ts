import { QueryFingerprint, RetrievalRequest } from "../models/RetrievalRequest";
import { createHash } from "crypto";

export class QueryNormalizer {
    public normalize(request: RetrievalRequest): QueryFingerprint {
        const normalized = request.query
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ');
            
        const contentToHash = `${request.workspaceId}:${normalized}`;
        const hash = createHash("sha256").update(contentToHash).digest("hex");
        
        return {
            hash,
            normalizedQuery: normalized,
            workspaceId: request.workspaceId
        };
    }
}
