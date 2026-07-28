import { QueryFingerprint } from "../models/RetrievalRequest";
import { KnowledgePackage } from "../models/KnowledgePackage";

export class RetrievalCacheLayer {
    private cache: Map<string, KnowledgePackage> = new Map();

    public async get(fingerprint: QueryFingerprint): Promise<KnowledgePackage | null> {
        const pkg = this.cache.get(fingerprint.hash);
        if (pkg && pkg.expiresAt > new Date()) {
            return pkg; // Cache Hit
        }
        return null; // Cache Miss
    }

    public async set(fingerprint: QueryFingerprint, pkg: KnowledgePackage): Promise<void> {
        this.cache.set(fingerprint.hash, pkg);
    }
}
