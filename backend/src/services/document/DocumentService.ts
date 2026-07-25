import * as crypto from 'crypto';
import { Document, DocumentStatus, DocumentStorageProvider } from '@prisma/client';
import DocumentRepository from '../../repositories/DocumentRepository';
import DocumentVirusScanService from './DocumentVirusScanService';
import DocumentDuplicateService from './DocumentDuplicateService';
import DocumentStorageService from './storage/DocumentStorageService';
import DocumentOCRService from './ai/DocumentOCRService';
import DocumentAIExtractionService from './ai/DocumentAIExtractionService';
import DocumentFeatureService from './ai/DocumentFeatureService';
import { NodeEventDispatcher } from '../../common/events/NodeEventDispatcher';
import { EventNames } from '../../common/events/EventNames';
import prisma from '../../database/prisma';

export interface UploadDocumentDTO {
  workspaceId: string;
  companyId?: string;
  buffer: Buffer;
  originalFilename: string;
  mimeType: string;
  extension: string;
  displayName?: string;
}

export class DocumentService {
  constructor(private eventDispatcher = NodeEventDispatcher.getInstance()) {}

  async uploadDocument(dto: UploadDocumentDTO): Promise<Document> {
    const { buffer, originalFilename, mimeType, extension, workspaceId, companyId } = dto;
    const displayName = dto.displayName || originalFilename;
    const size = buffer.length;

    // 1. Virus Scan
    const scanResult = await DocumentVirusScanService.scanBuffer(buffer, originalFilename);
    if (!scanResult.isSafe) {
      throw new Error(`Document failed virus scan: ${scanResult.threatsFound?.join(', ')}`);
    }

    // 2. Hash
    const hash = crypto.createHash('sha256').update(buffer).digest('hex');
    this.eventDispatcher.dispatch(EventNames.DOCUMENT_HASHED, { hash, filename: originalFilename });

    // 3. Duplicate Check
    const existingDoc = await DocumentDuplicateService.findDuplicate(hash);
    if (existingDoc) {
      this.eventDispatcher.dispatch(EventNames.DOCUMENT_DUPLICATE_FOUND, { documentId: existingDoc.id, hash });
      // Depending on business logic, we could just return the existing doc, 
      // or create a new reference with the same storage key. 
      // For now, we reuse the existing document entirely.
      return existingDoc;
    }

    // 4. Storage
    const storageProvider = DocumentStorageService.getProvider();
    const storageKey = `${workspaceId}/${crypto.randomUUID()}${extension}`;
    const storageMeta = await storageProvider.upload(buffer, storageKey, mimeType);

    // 5. Database Entry (UPLOADED status)
    let document = await DocumentRepository.create({
      workspaceId,
      companyId,
      code: `DOC-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
      slug: `doc-${crypto.randomUUID().split('-')[0]}`,
      status: DocumentStatus.UPLOADED,
      mimeType,
      extension,
      size,
      sha256: hash,
      storageProvider: storageMeta.provider,
      providerVersion: storageMeta.providerVersion,
      storageKey: storageMeta.storageKey,
      originalFilename,
      displayName
    });

    this.eventDispatcher.dispatch(EventNames.DOCUMENT_UPLOADED, { documentId: document.id });

    // Async Processing Pipeline (OCR -> Extraction -> Embedding)
    // Normally this would be enqueued to a background worker (e.g. RabbitMQ / Kafka)
    // For now we simulate it asynchronously without blocking the upload response
    this.processDocumentPipeline(document.id, buffer, mimeType).catch(console.error);

    return document;
  }

  private async processDocumentPipeline(documentId: string, buffer: Buffer, mimeType: string) {
    // Note: We refetch document to ensure we have latest state
    let doc = await DocumentRepository.findById(documentId);
    if (!doc) return;

    // 6. OCR
    const ocrResult = await DocumentOCRService.extractText(buffer, mimeType);
    await DocumentRepository.update(documentId, { status: DocumentStatus.OCR_COMPLETED });
    this.eventDispatcher.dispatch(EventNames.DOCUMENT_SCANNED, { documentId });

    // 7. Entity Extraction & Classification
    const extractionResult = await DocumentAIExtractionService.extractEntitiesAndClassify(ocrResult.rawText);
    await DocumentRepository.update(documentId, { status: DocumentStatus.CLASSIFIED });
    this.eventDispatcher.dispatch(EventNames.DOCUMENT_EXTRACTION_COMPLETED, { documentId, classification: extractionResult.classification });

    // 8. Feature Vector
    await DocumentFeatureService.saveFeatureVector({
      documentId,
      classification: extractionResult.classification,
      classificationConfidence: extractionResult.confidence,
      ocrCompleteness: ocrResult.confidence,
      language: ocrResult.language,
      pageCount: ocrResult.pageCount,
      containsSignature: extractionResult.hasSignature,
      containsStamp: extractionResult.hasStamp,
      containsQRCode: extractionResult.hasQRCode,
      containsTable: extractionResult.hasTable,
      extractedEntitiesJSON: JSON.stringify(extractionResult.entities)
    });

    // 9. Embeddings (Mocked for now, handled by separate service in the future)
    await prisma.documentEmbedding.create({
      data: {
        documentId,
        provider: 'openai',
        model: 'text-embedding-3-small',
        dimension: 1536,
        version: 1
      }
    });
    this.eventDispatcher.dispatch(EventNames.DOCUMENT_EMBEDDING_CREATED, { documentId });
  }
}

export default new DocumentService();
