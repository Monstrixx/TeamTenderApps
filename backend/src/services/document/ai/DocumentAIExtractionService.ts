import { DocumentClassification } from '@prisma/client';

export interface EntityExtractionResult {
  classification: DocumentClassification;
  confidence: number;
  entities: Record<string, any>;
  hasSignature: boolean;
  hasStamp: boolean;
  hasQRCode: boolean;
  hasTable: boolean;
}

export class DocumentAIExtractionService {
  /**
   * Extracts structural entities and classifies the document based on raw text.
   * Mock implementation.
   */
  async extractEntitiesAndClassify(rawText: string): Promise<EntityExtractionResult> {
    // Simulate AI LLM processing time
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Simple heuristic mock
    let classification: DocumentClassification = DocumentClassification.OTHER;
    if (rawText.toLowerCase().includes('contract') || rawText.toLowerCase().includes('kontrak')) {
      classification = DocumentClassification.CONTRACT;
    } else if (rawText.toLowerCase().includes('identity') || rawText.toLowerCase().includes('ktp')) {
      classification = DocumentClassification.IDENTITY;
    }

    return {
      classification,
      confidence: 0.88,
      entities: {
        issuer: 'Mock Issuer',
        date: new Date().toISOString()
      },
      hasSignature: true,
      hasStamp: false,
      hasQRCode: false,
      hasTable: false
    };
  }
}

export default new DocumentAIExtractionService();
