import prisma from '../../database/prisma';

export class EquipmentAvailabilityService {
  /**
   * Computes the availability status of an equipment dynamically.
   * Based on:
   * 1. Active maintenance -> MAINTENANCE
   * 2. Active assignments -> ASSIGNED / IN_USE
   * 3. Otherwise -> AVAILABLE
   */
  async getAvailabilityStatus(equipmentId: string): Promise<'AVAILABLE' | 'ASSIGNED' | 'MAINTENANCE'> {
    // 1. Check Maintenance
    const activeMaintenance = await prisma.equipmentMaintenance.findFirst({
      where: {
        equipmentId,
        status: { in: ['PLANNED', 'IN_PROGRESS'] }
      }
    });

    if (activeMaintenance) {
      return 'MAINTENANCE';
    }

    // 2. Check Assignments
    const activeAssignment = await prisma.equipmentAssignment.findFirst({
      where: {
        equipmentId,
        releasedAt: null
      }
    });

    if (activeAssignment) {
      return 'ASSIGNED';
    }

    return 'AVAILABLE';
  }
}

export default new EquipmentAvailabilityService();
