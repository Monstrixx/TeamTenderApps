import { TenderStatus, TenderSupplierStatus } from '@prisma/client';
import TenderRepository from '../../repositories/TenderRepository';
import TenderValidationService from './TenderValidationService';
import { NodeEventDispatcher } from '../../common/events/NodeEventDispatcher';
import { EventNames } from '../../common/events/EventNames';
import prisma from '../../database/prisma';

export class TenderWorkflowService {
  constructor(private eventDispatcher = NodeEventDispatcher.getInstance()) {}

  async publishTender(tenderId: string, publishedBy: string): Promise<void> {
    await TenderValidationService.validateForPublish(tenderId);

    const updated = await TenderRepository.update(tenderId, {
      status: TenderStatus.PUBLISHED,
      publishedAt: new Date(),
    });

    this.eventDispatcher.dispatch(EventNames.TENDER_PUBLISHED, { tenderId: updated.id, userId: publishedBy });
  }

  async startEvaluation(tenderId: string, startedBy: string): Promise<void> {
    const tender = await TenderRepository.findById(tenderId);
    if (!tender || !['CLOSED', 'BIDDING'].includes(tender.status)) {
      throw new Error('Tender must be CLOSED or BIDDING to start evaluation');
    }

    const updated = await TenderRepository.update(tenderId, {
      status: TenderStatus.EVALUATION,
      evaluationStartDate: new Date(),
    });

    this.eventDispatcher.dispatch(EventNames.TENDER_EVALUATION_STARTED, { tenderId: updated.id, userId: startedBy });
  }

  async awardTender(tenderId: string, supplierId: string, awardedBy: string): Promise<void> {
    await TenderValidationService.validateForAward(tenderId, supplierId);

    // Update Tender
    const updated = await TenderRepository.update(tenderId, {
      status: TenderStatus.AWARDED,
      awardedAt: new Date(),
    });

    // Update Winning Supplier
    await prisma.tenderSupplier.updateMany({
      where: { tenderId, supplierId },
      data: { status: TenderSupplierStatus.WINNER }
    });
    
    // Update Losing Suppliers
    await prisma.tenderSupplier.updateMany({
      where: { tenderId, supplierId: { not: supplierId }, status: { notIn: [TenderSupplierStatus.REJECTED] } },
      data: { status: TenderSupplierStatus.REJECTED } // Or another status if needed
    });

    this.eventDispatcher.dispatch(EventNames.TENDER_AWARDED, { 
      tenderId: updated.id, 
      supplierId, 
      userId: awardedBy 
    });
  }
}

export default new TenderWorkflowService();
