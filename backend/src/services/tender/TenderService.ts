import TenderRepository from '../../repositories/TenderRepository';
import { Tender, Prisma } from '@prisma/client';
import { NodeEventDispatcher } from '../../common/events/NodeEventDispatcher';
import { EventNames } from '../../common/events/EventNames';
import TenderWorkflowService from './TenderWorkflowService';

export class TenderService {
  constructor(private eventDispatcher = NodeEventDispatcher.getInstance()) {}

  async createTender(data: Prisma.TenderUncheckedCreateInput): Promise<Tender> {
    const tender = await TenderRepository.create(data);
    this.eventDispatcher.dispatch(EventNames.TENDER_CREATED, { tenderId: tender.id });
    return tender;
  }

  async updateTender(id: string, data: Prisma.TenderUpdateInput, expectedVersion?: number): Promise<Tender> {
    return TenderRepository.update(id, data, expectedVersion);
  }

  async getTender(id: string): Promise<Tender | null> {
    return TenderRepository.findById(id);
  }

  async deleteTender(id: string): Promise<Tender> {
    return TenderRepository.softDelete(id);
  }

  // --- Orchestrator Pass-Throughs to Workflow ---

  async publish(tenderId: string, userId: string): Promise<void> {
    await TenderWorkflowService.publishTender(tenderId, userId);
  }

  async startEvaluation(tenderId: string, userId: string): Promise<void> {
    await TenderWorkflowService.startEvaluation(tenderId, userId);
  }

  async award(tenderId: string, supplierId: string, userId: string): Promise<void> {
    await TenderWorkflowService.awardTender(tenderId, supplierId, userId);
  }
}

export default new TenderService();
