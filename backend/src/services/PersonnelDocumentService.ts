import PersonnelDocumentRepository from '../repositories/PersonnelDocumentRepository';
import PersonnelRepository from '../repositories/PersonnelRepository';
import { ApiError } from '../common/responses/ApiError';
import { Prisma, PersonnelDocument } from '@prisma/client';
import { getRequestContext } from '../common/context/RequestContext';

export class PersonnelDocumentService {
  async addDocument(personnelId: string, data: Omit<Prisma.PersonnelDocumentUncheckedCreateInput, 'personnelId'>): Promise<PersonnelDocument> {
    const ctx = getRequestContext();
    const personnel = await PersonnelRepository.findById(personnelId);

    if (!personnel || personnel.workspaceId !== ctx?.workspaceId) {
      throw new ApiError(404, 'Personnel not found in this workspace');
    }

    const doc = await PersonnelDocumentRepository.create({
      ...data,
      personnelId
    });

    return doc;
  }

  async removeDocument(id: string): Promise<void> {
    const ctx = getRequestContext();
    const doc = await PersonnelDocumentRepository.findById(id);

    if (!doc) {
      throw new ApiError(404, 'Document not found');
    }

    const personnel = await PersonnelRepository.findById(doc.personnelId);
    if (!personnel || personnel.workspaceId !== ctx?.workspaceId) {
      throw new ApiError(404, 'Document not found in this workspace');
    }

    await PersonnelDocumentRepository.deleteDocument(id);
  }
}

export default new PersonnelDocumentService();
