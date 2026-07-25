import PersonnelRepository from '../repositories/PersonnelRepository';
import prisma from '../database/prisma';

export class PersonnelFeatureService {
  /**
   * Generates or updates the PersonnelFeatureVector based on the latest personnel data.
   * This is a structured snapshot before passing to an Embedding model.
   */
  public static async generateFeatureVector(personnelId: string) {
    const personnel = await PersonnelRepository.findById(personnelId);
    
    if (!personnel) {
      throw new Error(`Personnel not found for ID: ${personnelId}`);
    }

    // 1. Calculate features
    const projectCount = personnel.experiences?.length || 0;
    
    // Simplistic logic for highest education
    const highestEducation = personnel.educations?.[0]?.level || null;
    
    // SKK metrics
    const now = new Date();
    const activeSKK = (personnel.skk || []).filter(s => new Date(s.expiredDate) > now).length;
    const expiredSKK = (personnel.skk || []).filter(s => new Date(s.expiredDate) <= now).length;
    
    // Verified skills
    const verifiedSkills = (personnel as any).skills?.filter((s: any) => s.verified).length || 0;
    
    const totalYearsExperience = (personnel as any).skills?.reduce((acc: number, skill: any) => acc + (skill.yearsOfExperience || 0), 0) || 0;
    
    const highestProjectValue = personnel.experiences?.reduce((max, exp) => {
      const val = exp.projectValue ? Number(exp.projectValue) : 0;
      return val > max ? val : max;
    }, 0);

    const managementExperience = personnel.experiences?.some(exp => 
      exp.position.toLowerCase().includes('manager') || 
      exp.position.toLowerCase().includes('direktur') ||
      exp.position.toLowerCase().includes('lead')
    ) || false;

    // Build raw text snapshot for AI vectorization
    const rawText = JSON.stringify({
      skills: (personnel as any).skills?.map((s: any) => s.skillName),
      experiences: personnel.experiences?.map(e => e.position),
      educations: personnel.educations?.map(e => e.major)
    });

    // 2. Upsert into database
    return prisma.personnelFeatureVector.upsert({
      where: { personnelId },
      update: {
        projectCount,
        highestEducation,
        activeSKK,
        expiredSKK,
        verifiedSkills,
        totalYearsExperience,
        highestProjectValue: highestProjectValue || null,
        managementExperience,
        rawText,
        generatedAt: new Date()
      },
      create: {
        personnelId,
        projectCount,
        highestEducation,
        activeSKK,
        expiredSKK,
        verifiedSkills,
        totalYearsExperience,
        highestProjectValue: highestProjectValue || null,
        managementExperience,
        rawText,
        generatedAt: new Date()
      }
    });
  }
}
