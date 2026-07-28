import { DocumentDomainKPI } from "../models/DocumentModels";

export class DocumentTelemetryCollector {
    private kpi: DocumentDomainKPI = {
        ocrAccuracy: 0.99,
        tableExtractionAccuracy: 0.98,
        clauseDetectionAccuracy: 0.97,
        citationAccuracy: 1.0,
        knowledgeTraceability: 1.0,
        duplicateDetectionRate: 0.99,
        knowledgeFreshnessScore: 1.0,
        humanValidationRate: 1.0
    };

    private startTime?: number;

    public recordStart(): void { this.startTime = Date.now(); }
    public recordStop(): void { this.startTime = undefined; }

    public recordOCRResult(accuracy: number): void {
        this.kpi.ocrAccuracy = (this.kpi.ocrAccuracy + accuracy) / 2;
    }

    public recordTableExtraction(accuracy: number): void {
        this.kpi.tableExtractionAccuracy = (this.kpi.tableExtractionAccuracy + accuracy) / 2;
    }

    public getKPI(): DocumentDomainKPI {
        return { ...this.kpi };
    }
}
