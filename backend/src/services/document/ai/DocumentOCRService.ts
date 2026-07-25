import { DocumentClassification } from '@prisma/client';

export interface OCRExtractionResult {
  rawText: string;
  language?: string;
  pageCount: number;
  confidence: number;
}

export class DocumentOCRService {
  /**
   * Extracts raw text from a document buffer using an OCR engine.
   * Mock implementation.
   */
  async extractText(buffer: Buffer, mimeType: string): Promise<OCRExtractionResult> {
    // Simulate OCR processing time
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      rawText: "Mock OCR text content extracted from document.",
      language: "id",
      pageCount: 1,
      confidence: 0.95
    };
  }
}

export default new DocumentOCRService();
