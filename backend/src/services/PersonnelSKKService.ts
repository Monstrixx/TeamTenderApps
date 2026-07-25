import PersonnelSKKRepository from '../repositories/PersonnelSKKRepository';
import PersonnelRepository from '../repositories/PersonnelRepository';
import { PersonnelSKKHistoryRepository } from '../repositories/PersonnelSKKHistoryRepository';
import { ApiError } from '../common/responses/ApiError';
import { Prisma, PersonnelSKK, ProviderType } from '@prisma/client';
import { getRequestContext } from '../common/context/RequestContext';
import { PersonnelCredentialVerificationService } from './verification/PersonnelCredentialVerificationService';

const historyRepo = new PersonnelSKKHistoryRepository();

export class PersonnelSKKService {
  async addSKK(personnelId: string, data: Omit<Prisma.PersonnelSKKUncheckedCreateInput, 'personnelId'>): Promise<PersonnelSKK> {
    const ctx = getRequestContext();
    const personnel = await PersonnelRepository.findById(personnelId);

    if (!personnel || personnel.workspaceId !== ctx?.workspaceId) {
      throw new ApiError(404, 'Personnel not found in this workspace');
    }

    const skk = await PersonnelSKKRepository.create({
      ...data,
      personnelId
    });

    return skk;
  }

  async updateSKK(id: string, data: Prisma.PersonnelSKKUpdateInput, changeReason?: string): Promise<PersonnelSKK> {
    const ctx = getRequestContext();
    const skk = await PersonnelSKKRepository.findById(id);

    if (!skk) {
      throw new ApiError(404, 'SKK not found');
    }

    const personnel = await PersonnelRepository.findById(skk.personnelId);
    if (!personnel || personnel.workspaceId !== ctx?.workspaceId) {
      throw new ApiError(404, 'SKK not found in this workspace');
    }

    // Create a snapshot before updating
    await historyRepo.create({
      skkId: skk.id,
      certificateNumber: skk.certificateNumber,
      qualification: skk.qualification,
      subClassification: skk.subClassification,
      level: skk.level,
      issuer: skk.issuer,
      issuedDate: skk.issuedDate,
      expiredDate: skk.expiredDate,
      documentId: skk.documentId,
      verificationStatus: skk.verificationStatus,
      verificationReference: skk.verificationReference,
      changeReason: changeReason || 'SKK Updated',
    });

    return PersonnelSKKRepository.update(id, data);
  }

  async verifySKK(id: string, provider: ProviderType = ProviderType.LPJK): Promise<PersonnelSKK> {
    const ctx = getRequestContext();
    const skk = await PersonnelSKKRepository.findById(id);

    if (!skk) {
      throw new ApiError(404, 'SKK not found');
    }

    const personnel = await PersonnelRepository.findById(skk.personnelId);
    if (!personnel || personnel.workspaceId !== ctx?.workspaceId) {
      throw new ApiError(404, 'SKK not found in this workspace');
    }

    const result = await PersonnelCredentialVerificationService.verify(provider, skk.certificateNumber);
    
    // Use updateSKK to automatically create history
    return this.updateSKK(id, {
      verificationStatus: result.status,
      verificationTime: result.verifiedAt,
      verificationReference: result.referenceNumber,
      verificationSource: result.provider
    }, 'SKK Verified');
  }
}

export default new PersonnelSKKService();
