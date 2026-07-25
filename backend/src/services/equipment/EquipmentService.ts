import EquipmentRepository from '../../repositories/EquipmentRepository';
import { Equipment, Prisma } from '@prisma/client';
import { NodeEventDispatcher } from '../../common/events/NodeEventDispatcher';
import { EventNames } from '../../common/events/EventNames';
import EquipmentAvailabilityService from './EquipmentAvailabilityService';
import EquipmentFeatureService from './EquipmentFeatureService';

export class EquipmentService {
  constructor(private eventDispatcher = NodeEventDispatcher.getInstance()) {}

  async createEquipment(data: Prisma.EquipmentUncheckedCreateInput): Promise<Equipment> {
    const equipment = await EquipmentRepository.create(data);
    
    this.eventDispatcher.dispatch(EventNames.EQUIPMENT_CREATED, { equipmentId: equipment.id });
    
    // Initialize Feature Vector asynchronously
    EquipmentFeatureService.updateFeatureVector(equipment.id, data.companyId).catch(console.error);

    return equipment;
  }

  async updateEquipment(id: string, data: Prisma.EquipmentUpdateInput, expectedVersion?: number): Promise<Equipment> {
    const equipment = await EquipmentRepository.update(id, data, expectedVersion);
    
    this.eventDispatcher.dispatch(EventNames.EQUIPMENT_UPDATED, { equipmentId: equipment.id });
    
    // Trigger feature vector recalculation
    EquipmentFeatureService.updateFeatureVector(id).catch(console.error);

    return equipment;
  }

  async getEquipment(id: string): Promise<Equipment | null> {
    const equipment = await EquipmentRepository.findById(id);
    if (!equipment) return null;

    // Dynamically calculate status (in a real system, you might return this as part of a DTO)
    const availability = await EquipmentAvailabilityService.getAvailabilityStatus(id);
    
    return {
      ...equipment,
      status: availability // Overriding the status with dynamic calculation for the response
    } as Equipment; 
  }
}

export default new EquipmentService();
