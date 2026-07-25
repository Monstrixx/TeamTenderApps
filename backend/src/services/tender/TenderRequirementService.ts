import prisma from '../../database/prisma';
import { NodeEventDispatcher } from '../../common/events/NodeEventDispatcher';
import { EventNames } from '../../common/events/EventNames';

export class TenderRequirementService {
  constructor(private eventDispatcher = NodeEventDispatcher.getInstance()) {}

  async addPersonnelRequirement(tenderId: string, data: {
    role: string;
    quantity?: number;
    minExperienceYears?: number;
    skills?: { skillName: string; minLevel?: string }[];
    certifications?: { certificateType: string; minLevel?: string }[];
  }) {
    const requirement = await prisma.tenderPersonnelRequirement.create({
      data: {
        tenderId,
        role: data.role,
        quantity: data.quantity ?? 1,
        minExperienceYears: data.minExperienceYears,
        requiredSkills: {
          create: data.skills || []
        },
        requiredCertifications: {
          create: data.certifications || []
        }
      }
    });

    this.eventDispatcher.dispatch(EventNames.TENDER_REQUIREMENT_UPDATED, { tenderId });
    return requirement;
  }

  async addEquipmentRequirement(tenderId: string, data: {
    category: string;
    quantity?: number;
    minCapacity?: string;
    minYear?: number;
  }) {
    const requirement = await prisma.tenderEquipmentRequirement.create({
      data: {
        tenderId,
        category: data.category,
        quantity: data.quantity ?? 1,
        minCapacity: data.minCapacity,
        minYear: data.minYear
      }
    });

    this.eventDispatcher.dispatch(EventNames.TENDER_REQUIREMENT_UPDATED, { tenderId });
    return requirement;
  }
}

export default new TenderRequirementService();
