import { 
  Personnel, 
  PersonnelEducation, 
  PersonnelExperience, 
  PersonnelSKK, 
  PersonnelDocument,
  PersonnelSkill
} from '@prisma/client';

export interface ResumeContext {
  personnel: Personnel;
  education: PersonnelEducation[];
  experience: PersonnelExperience[];
  skills: PersonnelSkill[];
  skk: PersonnelSKK[];
  documents: PersonnelDocument[];
  tender?: any; // To be replaced with Tender type when available
  company?: any; // To be replaced with Company type if needed
}

export interface IResumeTemplate {
  /**
   * Renders the resume into HTML string format.
   * This HTML can later be converted to PDF or DOCX.
   */
  render(context: ResumeContext): Promise<string>;
}
