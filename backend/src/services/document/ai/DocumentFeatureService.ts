import prisma from '../../../database/prisma';
import { DocumentClassification } from '@prisma/client';

export interface DocumentFeatureData {
  documentId: string;
  classification: DocumentClassification;
  classificationConfidence: number;
  ocrCompleteness: number;
  language?: string;
  pageCount: number;
  containsSignature: boolean;
  containsStamp: boolean;
  containsQRCode: boolean;
  containsTable: boolean;
  extractedEntitiesJSON: string;
}

export class DocumentFeatureService {
  async saveFeatureVector(data: DocumentFeatureData) {
    return prisma.documentFeatureVector.upsert({
      where: { documentId: data.documentId },
      update: {
        classification: data.classification,
        classificationConfidence: data.classificationConfidence,
        ocrCompleteness: data.ocrCompleteness,
        language: data.language,
        pageCount: data.pageCount,
        containsSignature: data.containsSignature,
        containsStamp: data.containsStamp,
        containsQRCode: data.containsQRCode,
        containsTable: data.containsTable,
        extractedEntitiesJSON: data.extractedEntitiesJSON,
        generatedAt: new Date()
      },
      create: {
        documentId: data.documentId,
        classification: data.classification,
        classificationConfidence: data.classificationConfidence,
        ocrCompleteness: data.ocrCompleteness,
        language: data.language,
        pageCount: data.pageCount,
        containsSignature: data.containsSignature,
        containsStamp: data.containsStamp,
        containsQRCode: data.containsQRCode,
        containsTable: data.containsTable,
        extractedEntitiesJSON: data.extractedEntitiesJSON,
        generatedAt: new Date()
      }
    });
  }
}

export default new DocumentFeatureService();
