import prisma from '../../database/prisma';
import { Equipment } from '@prisma/client';

export class EquipmentSearchIndexService {
  /**
   * Generates a comprehensive search string combining structured equipment data 
   * and unstructured OCR text from linked documents (from Intelligent Document Platform).
   */
  async generateSearchKeywords(equipmentId: string): Promise<string> {
    const equipment = await prisma.equipment.findUnique({
      where: { id: equipmentId },
      include: {
        category: true,
        specifications: true,
        certifications: {
          include: {
            document: {
              include: { featureVector: true }
            }
          }
        },
        documents: {
          include: {
            document: {
              include: { featureVector: true }
            }
          }
        }
      }
    });

    if (!equipment) return '';

    const keywords: string[] = [];

    // 1. Core Fields
    keywords.push(equipment.name, equipment.brand, equipment.model);
    if (equipment.serialNumber) keywords.push(equipment.serialNumber);
    if (equipment.assetNumber) keywords.push(equipment.assetNumber);
    if (equipment.currentLocation) keywords.push(equipment.currentLocation);
    if (equipment.category) keywords.push(equipment.category.name);

    // 2. Specifications
    equipment.specifications.forEach(spec => {
      keywords.push(`${spec.key} ${spec.value} ${spec.unit || ''}`.trim());
    });

    // 3. Certifications (Metadata & Document OCR)
    equipment.certifications.forEach(cert => {
      keywords.push(cert.certificateType, cert.certificateNumber);
      if (cert.issuingAuthority) keywords.push(cert.issuingAuthority);
      
      // Extract OCR text from Intelligent Document Platform feature vector
      if (cert.document?.featureVector?.extractedEntitiesJSON) {
        try {
          const entities = JSON.parse(cert.document.featureVector.extractedEntitiesJSON);
          // Just an example of pulling indexed OCR content
          keywords.push(JSON.stringify(entities)); 
        } catch (e) {
          // Ignore parse errors
        }
      }
    });

    // 4. Equipment Documents OCR
    equipment.documents.forEach(docLink => {
      if (docLink.document?.featureVector?.extractedEntitiesJSON) {
        keywords.push(docLink.document.featureVector.extractedEntitiesJSON);
      }
    });

    return Array.from(new Set(keywords)).join(' ').toLowerCase();
  }
}

export default new EquipmentSearchIndexService();
