import { Company, CompanyLegal, CompanyAddress } from '@prisma/client';

export interface CompanyProfileStats {
  profileCompleteness: number;
  supplierCount: number;
  equipmentCount: number;
  personnelCount: number;
  documentCount: number;
  activeTenderCount: number;
}

export class CompanyStatisticsService {
  /**
   * Calculates the profile completeness based on a weighted rule set.
   * Logo 10, Email 10, Phone 10, Website 10, Primary Address 20, NIB 20, NPWP 20 = Total 100
   */
  static calculateCompleteness(
    company: Partial<Company>,
    legal: Partial<CompanyLegal> | null,
    addresses: Partial<CompanyAddress>[]
  ): number {
    let score = 0;

    if (company.logoUrl) score += 10;
    if (company.email) score += 10;
    if (company.phone) score += 10;
    if (company.website) score += 10;

    const hasPrimaryAddress = addresses.some((a) => a.isPrimary);
    if (hasPrimaryAddress) score += 20;

    if (legal?.nib) score += 20;
    if (legal?.npwp) score += 20;

    return Math.min(score, 100);
  }

  /**
   * Generates the fixed statistics contract for a company.
   */
  static async getStatistics(
    company: Partial<Company>,
    legal: Partial<CompanyLegal> | null,
    addresses: Partial<CompanyAddress>[]
  ): Promise<CompanyProfileStats> {
    const profileCompleteness = this.calculateCompleteness(company, legal, addresses);

    return {
      profileCompleteness,
      // Future domains placeholders
      supplierCount: 0,
      equipmentCount: 0,
      personnelCount: 0,
      documentCount: 0,
      activeTenderCount: 0,
    };
  }
}
