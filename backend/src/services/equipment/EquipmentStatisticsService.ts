import { PrismaClient, EquipmentUsage, EquipmentMaintenance } from '@prisma/client';
import prisma from '../../database/prisma';

export class EquipmentStatisticsService {
  /**
   * Calculates total working hours from the usage log.
   */
  async calculateTotalWorkingHours(equipmentId: string): Promise<number> {
    const usages = await prisma.equipmentUsage.findMany({
      where: { equipmentId }
    });
    
    return usages.reduce((sum, usage) => sum + usage.workingHours, 0);
  }

  /**
   * Calculates utilization rate (working hours / (working + idle hours))
   * If both are 0, returns 0.
   */
  async calculateUtilizationRate(equipmentId: string): Promise<number> {
    const usages = await prisma.equipmentUsage.findMany({
      where: { equipmentId }
    });
    
    let totalWorking = 0;
    let totalIdle = 0;

    for (const usage of usages) {
      totalWorking += usage.workingHours;
      totalIdle += usage.idleHours;
    }

    const totalHours = totalWorking + totalIdle;
    if (totalHours === 0) return 0;
    
    return totalWorking / totalHours;
  }

  /**
   * Calculates average maintenance cost for completed maintenance records.
   */
  async calculateAverageMaintenanceCost(equipmentId: string): Promise<number> {
    const maintenanceRecords = await prisma.equipmentMaintenance.findMany({
      where: { 
        equipmentId,
        status: 'COMPLETED',
        totalCost: { not: null }
      }
    });

    if (maintenanceRecords.length === 0) return 0;

    const totalCost = maintenanceRecords.reduce((sum, record) => {
      return sum + Number(record.totalCost || 0);
    }, 0);

    return totalCost / maintenanceRecords.length;
  }
}

export default new EquipmentStatisticsService();
