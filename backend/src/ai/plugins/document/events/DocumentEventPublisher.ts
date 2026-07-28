import { EventBuilder, EventFactory, EventValidator } from "../../../kernel/events/EventPipeline";

export class DocumentEventPublisher {
    private eventBuilder: EventBuilder;

    constructor(eventBuilder?: EventBuilder) {
        const factory = new EventFactory();
        const validator = new EventValidator();
        this.eventBuilder = eventBuilder ?? new EventBuilder(factory, validator, { append: async () => {} } as any, { publish: async () => {} } as any);
    }

    public async publishDocumentUploaded(sha256: string, fileName: string): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type: "DocumentUploaded", sha256, fileName, timestamp: new Date().toISOString() });
    }

    public async publishDocumentValidated(sha256: string, fileName: string): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type: "DocumentValidated", sha256, fileName, status: "VALIDATED" });
    }

    public async publishOCRExtracted(sha256: string, evidenceCount: number): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type: "OCRExtracted", sha256, evidenceCount });
    }

    public async publishLayoutParsed(sha256: string, elementCount: number): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type: "LayoutParsed", sha256, elementCount });
    }

    public async publishClauseExtracted(sha256: string, citationCount: number): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type: "ClauseExtracted", sha256, citationCount });
    }

    public async publishDocumentClassified(sha256: string, classification: string): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type: "DocumentClassified", sha256, classification });
    }

    public async publishSemanticChunked(sha256: string, chunkCount: number): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type: "SemanticChunked", sha256, chunkCount });
    }

    public async publishComplianceScanned(sha256: string, score: number): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type: "ComplianceScanned", sha256, score });
    }

    public async publishDocumentKnowledgeIndexed(sha256: string, nodeCount: number): Promise<void> {
        await this.eventBuilder.buildAndPublish({ type: "DocumentKnowledgeIndexed", sha256, nodeCount, indexedAt: new Date().toISOString() });
    }
}
