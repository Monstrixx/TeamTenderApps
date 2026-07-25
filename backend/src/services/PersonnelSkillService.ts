import PersonnelSkillRepository from '../repositories/PersonnelSkillRepository';
import PersonnelRepository from '../repositories/PersonnelRepository';
import { ApiError } from '../common/responses/ApiError';
import { Prisma, PersonnelSkill } from '@prisma/client';
import { getRequestContext } from '../common/context/RequestContext';

export class PersonnelSkillService {
  async addSkill(personnelId: string, data: Omit<Prisma.PersonnelSkillUncheckedCreateInput, 'personnelId'>): Promise<PersonnelSkill> {
    const ctx = getRequestContext();
    const personnel = await PersonnelRepository.findById(personnelId);

    if (!personnel || personnel.workspaceId !== ctx?.workspaceId) {
      throw new ApiError(404, 'Personnel not found in this workspace');
    }

    return PersonnelSkillRepository.create({
      ...data,
      personnelId
    });
  }

  async updateSkill(id: string, data: Prisma.PersonnelSkillUpdateInput): Promise<PersonnelSkill> {
    const ctx = getRequestContext();
    const skill = await PersonnelSkillRepository.findById(id);

    if (!skill) {
      throw new ApiError(404, 'Skill not found');
    }

    const personnel = await PersonnelRepository.findById(skill.personnelId);
    if (!personnel || personnel.workspaceId !== ctx?.workspaceId) {
      throw new ApiError(404, 'Skill not found in this workspace');
    }

    return PersonnelSkillRepository.update(id, data);
  }

  async deleteSkill(id: string): Promise<PersonnelSkill> {
    const ctx = getRequestContext();
    const skill = await PersonnelSkillRepository.findById(id);

    if (!skill) {
      throw new ApiError(404, 'Skill not found');
    }

    const personnel = await PersonnelRepository.findById(skill.personnelId);
    if (!personnel || personnel.workspaceId !== ctx?.workspaceId) {
      throw new ApiError(404, 'Skill not found in this workspace');
    }

    return PersonnelSkillRepository.delete(id);
  }
}

export default new PersonnelSkillService();
