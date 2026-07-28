// ── Lock 26: External Adapter Isolation ──────────────────────────────────────
// All external communication MUST pass through this Provider Interface.
// No fetch(), axios(), or HTTP Client directly in any Capability.
// ─────────────────────────────────────────────────────────────────────────────

export interface TenderDocumentRef {
    url?: string;
    fileRef?: string;
    rawContent?: string;
}

export interface RawTenderDocument {
    content: string;
    format: "PDF" | "DOCX" | "HTML" | "JSON";
    pages: number;
    metadata: Record<string, any>;
}

export interface BidPackage {
    bidId: string;
    tenderId: string;
    companyId: string;
    proposalRef: string;
    financialRef: string;
}

export interface SubmissionReceipt {
    success: boolean;
    confirmationRef: string;
    submittedAt: string;
}

export interface SubmissionStatus {
    bidId: string;
    status: "RECEIVED" | "PROCESSING" | "ACCEPTED" | "REJECTED";
    receivedAt: string;
}

export interface AwardResult {
    tenderId: string;
    winnerId: string;
    awardedValue: number;
    declaredAt: string;
}

// ── Provider Interface (Lock 26 Contract) ────────────────────────────────────
export interface ITenderAuthorityProvider {
    fetchTenderDocument(ref: TenderDocumentRef): Promise<RawTenderDocument>;
    submitBid(bidPackage: BidPackage): Promise<SubmissionReceipt>;
    fetchSubmissionStatus(bidId: string): Promise<SubmissionStatus>;
    fetchAwardResults(tenderId: string): Promise<AwardResult[]>;
}

// ── Stub Provider (AI-10C — OQ-2 Decision) ───────────────────────────────────
// Future: LPSEProvider | LKKPProvider | PrivateProcurementProvider
export class TenderAuthorityStubProvider implements ITenderAuthorityProvider {
    async fetchTenderDocument(ref: TenderDocumentRef): Promise<RawTenderDocument> {
        return {
            content: `STUB: Tender Document from ${ref.url ?? "local"}`,
            format: "PDF",
            pages: 42,
            metadata: { version: "1.0", language: "id" }
        };
    }

    async submitBid(bidPackage: BidPackage): Promise<SubmissionReceipt> {
        return {
            success: true,
            confirmationRef: `STUB-CONF-${Date.now()}`,
            submittedAt: new Date().toISOString()
        };
    }

    async fetchSubmissionStatus(bidId: string): Promise<SubmissionStatus> {
        return {
            bidId,
            status: "RECEIVED",
            receivedAt: new Date().toISOString()
        };
    }

    async fetchAwardResults(tenderId: string): Promise<AwardResult[]> {
        return [{
            tenderId,
            winnerId: "STUB-WINNER-COMPANY",
            awardedValue: 0,
            declaredAt: new Date().toISOString()
        }];
    }
}

// ── TenderAuthorityAdapter (wraps Provider) ───────────────────────────────────
export class TenderAuthorityAdapter {
    constructor(private provider: ITenderAuthorityProvider = new TenderAuthorityStubProvider()) {}

    public async fetchDocument(ref: TenderDocumentRef): Promise<RawTenderDocument> {
        return this.provider.fetchTenderDocument(ref);
    }

    public async submit(pkg: BidPackage): Promise<SubmissionReceipt> {
        return this.provider.submitBid(pkg);
    }
}
