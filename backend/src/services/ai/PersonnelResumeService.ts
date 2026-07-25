import { LPJKTemplate } from './templates/LPJKTemplate';
import { IResumeTemplate, ResumeContext } from './templates/IResumeTemplate';
import PersonnelRepository from '../../repositories/PersonnelRepository';
import { ApiError } from '../../common/responses/ApiError';
// Placeholder for other templates like StandardTemplate, etc.

export enum ResumeTemplateMode {
  STANDARD = 'STANDARD',
  LPJK = 'LPJK',
  CUSTOM = 'CUSTOM'
}

export enum ResumeOutputFormat {
  HTML = 'HTML',
  PDF = 'PDF',
  DOCX = 'DOCX'
}

export interface ResumeGenerationOptions {
  personnelId: string;
  template: ResumeTemplateMode;
  format: ResumeOutputFormat;
  tenderId?: string; // Optional tender context for AI customization
}

export interface ResumeResult {
  fileId?: string; // Reference to Document Domain if saved
  content?: string; // HTML output or base64 raw data
  metadata: {
    generatedAt: Date;
    aiCustomized: boolean;
    format: ResumeOutputFormat;
  };
}

export class PersonnelResumeService {
  private static templates: Record<ResumeTemplateMode, IResumeTemplate> = {
    [ResumeTemplateMode.LPJK]: new LPJKTemplate(),
    [ResumeTemplateMode.STANDARD]: new LPJKTemplate(), // Fallback to LPJK for now
    [ResumeTemplateMode.CUSTOM]: new LPJKTemplate(),   // Fallback to LPJK for now
  };

  /**
   * Generates a CV for the given personnel based on template and format.
   * If tenderId is provided, AI will customize the CV for that specific tender.
   */
  public static async generateCV(options: ResumeGenerationOptions): Promise<ResumeResult> {
    const personnel = await PersonnelRepository.findProfile(options.personnelId);
    
    if (!personnel) {
      throw new ApiError(404, 'Personnel not found');
    }

    const context: ResumeContext = {
      personnel: personnel,
      education: personnel.educations || [],
      experience: personnel.experiences || [],
      skills: (personnel as any).skills || [],
      skk: personnel.skk || [],
      documents: personnel.documents || [],
      tender: options.tenderId ? { id: options.tenderId } : undefined, // Placeholder
    };

    const templateEngine = this.templates[options.template] || this.templates[ResumeTemplateMode.STANDARD];
    
    // HTML is the canonical format
    const htmlContent = await templateEngine.render(context);

    if (options.format === ResumeOutputFormat.HTML) {
      return {
        content: htmlContent,
        metadata: {
          generatedAt: new Date(),
          aiCustomized: !!options.tenderId,
          format: ResumeOutputFormat.HTML
        }
      };
    }

    // TODO: Pass htmlContent to a PDF or DOCX converter service
    // const fileId = await DocumentConversionService.convertToPdf(htmlContent);

    return {
      fileId: `mock-doc-id-${Date.now()}`,
      metadata: {
        generatedAt: new Date(),
        aiCustomized: !!options.tenderId,
        format: options.format
      }
    };
  }
}
