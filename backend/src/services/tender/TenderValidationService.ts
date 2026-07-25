import { Tender, TenderStatus } from '@prisma/client';
import prisma from '../../database/prisma';

export class TenderValidationService {
  /**
   * Validates if a tender is ready to be published.
   * Throws errors if validation fails.
   */
  async validateForPublish(tenderId: string): Promise<void> {
    const tender = await prisma.tender.findUnique({
      where: { id: tenderId },
      include: {
        documents: true,
        personnelRequirements: true,
        equipmentRequirements: true,
      }
    });

    if (!tender) {
      throw new Error(`Tender ${tenderId} not found`);
    }

    if (tender.status !== TenderStatus.DRAFT) {
      throw new Error(`Tender must be in DRAFT status to be published, but is ${tender.status}`);
    }

    // 1. Validate Schedule
    if (!tender.submissionDeadline || tender.submissionDeadline < new Date()) {
      throw new Error('Tender must have a valid future submission deadline');
    }

    // 2. Validate Documents (Example: At least 1 RFP document is required)
    const hasRfp = tender.documents.some(doc => doc.documentType === 'RFP');
    if (!hasRfp) {
      throw new Error('Tender must have at least one RFP document before publishing');
    }

    // 3. Validate Requirements
    // Could require at least 1 personnel or 1 equipment if it's a technical tender
    // For now, just ensure it's not completely empty
    if (tender.personnelRequirements.length === 0 && tender.equipmentRequirements.length === 0) {
      throw new Error('Tender must have at least one personnel or equipment requirement');
    }
  }

  /**
   * Validates if a tender can be awarded to a specific supplier.
   */
  async validateForAward(tenderId: string, supplierId: string): Promise<void> {
    const tender = await prisma.tender.findUnique({
      where: { id: tenderId }
    });

    if (!tender) {
      throw new Error(`Tender ${tenderId} not found`);
    }

    if (!['EVALUATION', 'NEGOTIATION'].includes(tender.status)) {
      throw new Error(`Tender must be in EVALUATION or NEGOTIATION to be awarded`);
    }

    const tenderSupplier = await prisma.tenderSupplier.findFirst({
      where: { tenderId, supplierId }
    });

    if (!tenderSupplier) {
      throw new Error(`Supplier ${supplierId} is not participating in Tender ${tenderId}`);
    }

    if (!['SHORTLISTED', 'BID_SUBMITTED'].includes(tenderSupplier.status)) {
      throw new Error(`Supplier must have submitted a bid or be shortlisted to win`);
    }
  }
}

export default new TenderValidationService();
