import prisma from '../../database/prisma';
import { NodeEventDispatcher } from '../../common/events/NodeEventDispatcher';
import { EventNames } from '../../common/events/EventNames';
import { TenderSupplierStatus } from '@prisma/client';

export class TenderParticipationService {
  constructor(private eventDispatcher = NodeEventDispatcher.getInstance()) {}

  async inviteSupplier(tenderId: string, supplierId: string) {
    const participation = await prisma.tenderSupplier.create({
      data: {
        tenderId,
        supplierId,
        status: TenderSupplierStatus.INVITED,
        invitedAt: new Date()
      }
    });

    this.eventDispatcher.dispatch(EventNames.TENDER_SUPPLIER_INVITED, { tenderId, supplierId });
    return participation;
  }

  async submitBid(tenderId: string, supplierId: string, bidAmount: number) {
    const participation = await prisma.tenderSupplier.updateMany({
      where: { tenderId, supplierId },
      data: {
        status: TenderSupplierStatus.BID_SUBMITTED,
        bidAmount,
        submittedAt: new Date()
      }
    });

    this.eventDispatcher.dispatch(EventNames.TENDER_BID_SUBMITTED, { tenderId, supplierId });
    return participation;
  }

  async assignPersonnelToRequirement(tenderId: string, supplierId: string, requirementId: string, personnelId: string) {
    return prisma.tenderPersonnelAssignment.create({
      data: {
        tenderId,
        supplierId,
        requirementId,
        personnelId,
        assignmentStatus: 'PROPOSED'
      }
    });
  }

  async assignEquipmentToRequirement(tenderId: string, supplierId: string, requirementId: string, equipmentId: string) {
    return prisma.tenderEquipmentAssignment.create({
      data: {
        tenderId,
        supplierId,
        requirementId,
        equipmentId,
        assignmentStatus: 'PROPOSED'
      }
    });
  }
}

export default new TenderParticipationService();
