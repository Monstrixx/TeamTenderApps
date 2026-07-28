import { ApiError } from '../common/responses/ApiError';
import PublicCompanyRepository, { PublicCompanyProjection } from '../repositories/PublicCompanyRepository';
import { TrustProjectionRepository } from '../repositories/TrustProjectionRepository';
import { EntityType } from '@prisma/client';

export class PublicCompanyService {
  /**
   * Retrieves a public company profile by slug.
   * Auto-generates basic SEO metadata if missing.
   */
  async getCompanyBySlug(slug: string): Promise<{ company: PublicCompanyProjection; seo: any }> {
    const company = await PublicCompanyRepository.findBySlug(slug);

    if (!company) {
      throw new ApiError(404, 'Company not found or not public');
    }

    // Prepare SEO data
    const profileSeo = company.profile || {};
    const defaultTitle = `${company.name} | TeamTender`;
    const defaultDesc = company.description || `${company.name} is a ${company.businessType} company on TeamTender.`;

    const seo = {
      title: profileSeo.metaTitle || defaultTitle,
      description: profileSeo.metaDescription || defaultDesc,
      keywords: profileSeo.metaKeywords || company.businessType,
      openGraph: {
        title: profileSeo.metaTitle || defaultTitle,
        description: profileSeo.metaDescription || defaultDesc,
        image: company.logoUrl || null,
        url: `https://teamtender.id/company/${company.slug}`,
        type: 'website'
      }
    };

    return {
      company,
      seo
    };
  }

  async getCompanyTrust(slug: string) {
    const company = await PublicCompanyRepository.findBySlug(slug);
    if (!company) {
      throw new ApiError(404, 'Company not found or not public');
    }

    const trustRepo = new TrustProjectionRepository();
    const projection = await trustRepo.findByEntity('COMPANY', company.id);

    return projection || { 
      status: 'UNVERIFIED', 
      score: 0, 
      verifiedItems: [], 
      badges: [] 
    };
  }
}

export default new PublicCompanyService();
