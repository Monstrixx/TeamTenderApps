import { CompanyProfileProjection } from "../models/TenderModels";

// ── Lock 25: Company Profile Read Model ──────────────────────────────────────
// Tender Plugin ONLY reads this projection — never calls Company Plugin directly.
// The projection is built by ProjectionBuilder from CompanyProfileUpdated events.
// ─────────────────────────────────────────────────────────────────────────────
export class CompanyProfileReadModel {
    private store: Map<string, CompanyProfileProjection> = new Map();

    // Called by ProjectionBuilder when CompanyProfileUpdated is received
    public upsert(projection: CompanyProfileProjection): void {
        this.store.set(projection.companyId, projection);
    }

    // Tender Plugin reads projections ONLY through this method
    public getProjection(companyId: string): CompanyProfileProjection | null {
        return this.store.get(companyId) ?? null;
    }

    // For audit: get all versions ever received
    public hasProjection(companyId: string): boolean {
        return this.store.has(companyId);
    }
}
