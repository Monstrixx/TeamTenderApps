import prisma from '../../database/prisma';
import EquipmentStatisticsService from './EquipmentStatisticsService';

export class EquipmentFeatureService {
  /**
   * Generates or updates the EquipmentFeatureVector based on current operational data.
   */
  async updateFeatureVector(equipmentId: string, generatedBy?: string): Promise<void> {
    const equipment = await prisma.equipment.findUnique({
      where: { id: equipmentId },
      include: { certifications: true }
    });

    if (!equipment) return;

    // Calculate dynamic stats
    const utilizationRate = await EquipmentStatisticsService.calculateUtilizationRate(equipmentId);
    const averageMaintenanceCost = await EquipmentStatisticsService.calculateAverageMaintenanceCost(equipmentId);
    const totalWorkingHours = await EquipmentStatisticsService.calculateTotalWorkingHours(equipmentId);
    
    // Simplifications for demonstration
    const age = equipment.year ? new Date().getFullYear() - equipment.year : 0;
    const activeCertificates = equipment.certifications.filter(c => c.verificationStatus === 'VERIFIED').length;
    
    // In a real system, you'd calculate these accurately:
    const downtimeRatio = 0.05; 
    const maintenanceFrequency = 2;
    const averageRepairInterval = 180;
    const lastMaintenanceAge = 30;
    const certificateExpiryDays = 90;
    
    // Simple heuristic risk score
    const replacementRisk = (age * 0.1) + Number(downtimeRatio) + (Number(averageMaintenanceCost) > 10000 ? 0.2 : 0);

    const existingVector = await prisma.equipmentFeatureVector.findUnique({
      where: { equipmentId }
    });

    const data = {
      age,
      utilizationRate,
      maintenanceFrequency,
      downtimeRatio,
      activeCertificates,
      replacementRisk,
      averageMaintenanceCost,
      averageRepairInterval,
      totalWorkingHours,
      lastMaintenanceAge,
      certificateExpiryDays,
      generatedBy,
      generatedAt: new Date(),
    };

    if (existingVector) {
      await prisma.equipmentFeatureVector.update({
        where: { equipmentId },
        data: {
          ...data,
          featureVersion: existingVector.featureVersion + 1
        }
      });
    } else {
      await prisma.equipmentFeatureVector.create({
        data: {
          equipmentId,
          ...data,
          featureVersion: 1
        }
      });
    }
  }
}

export default new EquipmentFeatureService();
